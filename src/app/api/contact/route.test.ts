import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route';
import {
  MAX_BODY_BYTES,
  MAX_MESSAGE_LENGTH,
  MAX_SUBJECT_LENGTH,
} from '@/lib/contact/schema';

const ROUTE = 'https://www.example.com/api/contact';
const HERMES = 'http://hermes-api.test:8080';
const TURNSTILE = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const OWNER = 'owner@example.com';
const VISITOR = 'visitor@example.org';
const API_KEY = 'a-very-secret-hermes-key';
const TURNSTILE_SECRET = 'a-very-secret-turnstile-key';

const valid = {
  email: VISITOR,
  subject: 'Private subject',
  message: 'Private message',
  turnstileToken: 'token',
};

type Answer = { status?: number; body?: unknown } | Error;

let turnstileAnswer: Answer;
let hermesAnswer: Answer;
const fetchMock = vi.fn();

function callsTo(url: string): [string, RequestInit][] {
  return fetchMock.mock.calls.filter(([called]) => String(called).startsWith(url)) as [
    string,
    RequestInit,
  ][];
}

function post(
  body: string | ReadableStream,
  headers: Record<string, string> = {},
): Promise<Response> {
  return POST(
    new Request(ROUTE, {
      method: 'POST',
      body,
      headers: { 'content-type': 'application/json', ...headers },
      ...(body instanceof ReadableStream ? { duplex: 'half' } : {}),
    } as RequestInit),
  );
}

function send(overrides: Record<string, unknown> = {}): Promise<Response> {
  return post(JSON.stringify({ ...valid, ...overrides }));
}

async function statusOf(response: Response): Promise<string> {
  return ((await response.json()) as { status: string }).status;
}

function hermesBody(): Record<string, unknown> {
  return JSON.parse(String(callsTo(`${HERMES}/api/emails`)[0][1].body)) as Record<
    string,
    unknown
  >;
}

beforeEach(() => {
  turnstileAnswer = { status: 200, body: { success: true } };
  hermesAnswer = { status: 202, body: { success: true } };

  fetchMock.mockReset();
  fetchMock.mockImplementation(async (url: string) => {
    const answer = String(url).startsWith(TURNSTILE) ? turnstileAnswer : hermesAnswer;

    if (answer instanceof Error) {
      throw answer;
    }

    return new Response(JSON.stringify(answer.body ?? {}), {
      status: answer.status ?? 200,
    });
  });

  vi.stubGlobal('fetch', fetchMock);
  vi.stubEnv('HERMES_BASE_URL', HERMES);
  vi.stubEnv('HERMES_API_KEY', API_KEY);
  vi.stubEnv('CONTACT_OWNER_EMAIL', OWNER);
  vi.stubEnv('TURNSTILE_SECRET_KEY', TURNSTILE_SECRET);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('POST /api/contact', () => {
  it('given the specification, when reading the limits, then they are the ones Hermes applies', () => {
    expect(MAX_BODY_BYTES).toBe(65_536);
    expect(MAX_SUBJECT_LENGTH).toBe(200);
    expect(MAX_MESSAGE_LENGTH).toBe(10_000);
  });

  describe('main flow', () => {
    it('given a valid message, when submitted, then tells the visitor it was accepted', async () => {
      const response = await send();

      expect(response.status).toBe(200);
      expect(await statusOf(response)).toBe('sent');
    });

    it('given a valid message, when submitted, then calls Hermes at its alias with its key', async () => {
      await send();

      const [url, init] = callsTo(`${HERMES}/api/emails`)[0];
      expect(url).toBe(`${HERMES}/api/emails`);
      expect(init.method).toBe('POST');
      expect(new Headers(init.headers).get('authorization')).toBe(`Bearer ${API_KEY}`);
    });

    it('given a valid message, when submitted, then it goes to the owner with the visitor as reply-to', async () => {
      await send();

      expect(hermesBody()).toEqual({
        to: OWNER,
        subject: valid.subject,
        body: valid.message,
        replyTo: VISITOR,
      });
    });

    it('given a visitor address, when submitted, then nothing is ever sent to it', async () => {
      await send();

      expect(callsTo(`${HERMES}/api/emails`)).toHaveLength(1);
      expect(hermesBody().to).not.toBe(VISITOR);
    });

    it('given a valid message, when submitted, then Turnstile is verified with the secret on the server', async () => {
      await send();

      const [, init] = callsTo(TURNSTILE)[0];
      const form = new URLSearchParams(String(init.body));
      expect(form.get('secret')).toBe(TURNSTILE_SECRET);
      expect(form.get('response')).toBe('token');
    });

    it('given the calls out, when submitted, then each has a time limit', async () => {
      await send();

      expect(callsTo(TURNSTILE)[0][1].signal).toBeInstanceOf(AbortSignal);
      expect(callsTo(`${HERMES}/api/emails`)[0][1].signal).toBeInstanceOf(AbortSignal);
    });
  });

  describe('AF-02: the body is larger than 64 KB', () => {
    it('given a declared length over the limit, when submitted, then it is rejected without any call', async () => {
      const response = await post('{}', { 'content-length': String(MAX_BODY_BYTES + 1) });

      expect(response.status).toBe(413);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('given a stream over the limit with no declared length, when submitted, then it is rejected', async () => {
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array(MAX_BODY_BYTES + 1));
          controller.close();
        },
      });

      const response = await post(stream);

      expect(response.status).toBe(413);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('given a body exactly at the limit, when submitted, then it is not rejected for its size', async () => {
      const response = await post(' '.repeat(MAX_BODY_BYTES));

      expect(response.status).not.toBe(413);
    });
  });

  describe('AF-03: a field is missing or invalid', () => {
    it.each([
      ['a missing email', { email: undefined }],
      ['an invalid email', { email: 'not-an-address' }],
      ['two emails', { email: 'a@example.com, b@example.com' }],
      ['a missing subject', { subject: undefined }],
      ['a blank subject', { subject: '   ' }],
      ['a subject over the limit', { subject: 's'.repeat(MAX_SUBJECT_LENGTH + 1) }],
      ['a subject with a line break', { subject: 'First\nBcc: x@example.com' }],
      ['a missing message', { message: undefined }],
      ['a blank message', { message: '   ' }],
      ['a message over the limit', { message: 'm'.repeat(MAX_MESSAGE_LENGTH + 1) }],
      ['a missing Turnstile token', { turnstileToken: undefined }],
    ])(
      'given %s, when submitted, then it is rejected without any call',
      async (_name, overrides) => {
        const response = await send(overrides);

        expect(response.status).toBe(400);
        expect(await statusOf(response)).toBe('invalid');
        expect(fetchMock).not.toHaveBeenCalled();
      },
    );

    it.each([
      ['a subject at the limit', { subject: 's'.repeat(MAX_SUBJECT_LENGTH) }],
      ['a message at the limit', { message: 'm'.repeat(MAX_MESSAGE_LENGTH) }],
    ])('given %s, when submitted, then it is accepted', async (_name, overrides) => {
      const response = await send(overrides);

      expect(response.status).toBe(200);
    });

    it.each(['{ not json', 'null', '[]', '"text"'])(
      'given the body %s, when submitted, then it is rejected without any call',
      async (body) => {
        const response = await post(body);

        expect(response.status).toBe(400);
        expect(fetchMock).not.toHaveBeenCalled();
      },
    );
  });

  describe('AF-04: the honeypot is filled in', () => {
    it('given a filled honeypot, when submitted, then it answers success without any call', async () => {
      const response = await send({ website: 'https://spam.example.com' });

      expect(response.status).toBe(200);
      expect(await statusOf(response)).toBe('sent');
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('given a filled honeypot and invalid fields, when submitted, then it still answers success', async () => {
      const response = await post(JSON.stringify({ website: 'x' }));

      expect(response.status).toBe(200);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('given an empty honeypot, when submitted, then the message goes out', async () => {
      await send({ website: '' });

      expect(callsTo(`${HERMES}/api/emails`)).toHaveLength(1);
    });
  });

  describe('AF-05: Turnstile verification fails', () => {
    it.each(['invalid-input-response', 'timeout-or-duplicate', 'bad-request'])(
      'given Turnstile refuses the token with %s, when submitted, then it is rejected without calling Hermes',
      async (code) => {
        turnstileAnswer = {
          status: 200,
          body: { success: false, 'error-codes': [code] },
        };

        const response = await send();

        expect(response.status).toBe(403);
        expect(await statusOf(response)).toBe('rejected');
        expect(callsTo(`${HERMES}/api/emails`)).toHaveLength(0);
      },
    );

    it.each(['invalid-input-secret', 'missing-input-secret', 'internal-error'])(
      'given Turnstile answers %s, when submitted, then the page shows the address without calling Hermes',
      async (code) => {
        turnstileAnswer = {
          status: 200,
          body: { success: false, 'error-codes': [code] },
        };

        const response = await send();

        expect(response.status).toBe(502);
        expect(await statusOf(response)).toBe('unavailable');
        expect(callsTo(`${HERMES}/api/emails`)).toHaveLength(0);
      },
    );

    it('given a refusal, when it is logged, then its code is there to diagnose it', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      turnstileAnswer = {
        status: 200,
        body: { success: false, 'error-codes': ['invalid-input-secret'] },
      };

      await send();

      expect(warn.mock.calls.flat().join(' ')).toContain('invalid-input-secret');
    });

    it('given Turnstile cannot be reached, when submitted, then the page shows the address without calling Hermes', async () => {
      turnstileAnswer = new Error('unreachable');

      const response = await send();

      expect(response.status).toBe(502);
      expect(await statusOf(response)).toBe('unavailable');
      expect(callsTo(`${HERMES}/api/emails`)).toHaveLength(0);
    });

    it('given Turnstile answers something unreadable, when submitted, then Hermes is not called', async () => {
      fetchMock.mockImplementationOnce(
        async () => new Response('not json', { status: 200 }),
      );

      const response = await send();

      expect(response.status).toBe(502);
      expect(callsTo(`${HERMES}/api/emails`)).toHaveLength(0);
    });

    it('given Turnstile answers without saying it succeeded, when submitted, then Hermes is not called', async () => {
      turnstileAnswer = { status: 200, body: {} };

      await send();

      expect(callsTo(`${HERMES}/api/emails`)).toHaveLength(0);
    });
  });

  describe('AF-06 to AF-08: Hermes does not accept the message', () => {
    it.each([
      ['a limit has been reached', 429],
      ['delivery failed', 502],
      ['it succeeded without accepting', 200],
      ['the recipient is refused', 403],
      ['the key is refused', 401],
      ['the request is refused', 400],
    ])(
      'given Hermes answers that %s, when submitted, then the site is told to show the address',
      async (_name, status) => {
        hermesAnswer = { status };

        const response = await send();

        expect(response.status).toBe(502);
        expect(await statusOf(response)).toBe('unavailable');
      },
    );

    it('given Hermes cannot be reached, when submitted, then the site is told to show the address', async () => {
      hermesAnswer = new Error('unreachable');

      const response = await send();

      expect(response.status).toBe(502);
      expect(await statusOf(response)).toBe('unavailable');
    });
  });

  describe('settings', () => {
    it.each([
      'HERMES_BASE_URL',
      'HERMES_API_KEY',
      'CONTACT_OWNER_EMAIL',
      'TURNSTILE_SECRET_KEY',
    ])(
      'given %s is not set, when submitted, then the site is told to show the address without any call',
      async (name) => {
        vi.stubEnv(name, '');

        const response = await send();

        expect(response.status).toBe(502);
        expect(await statusOf(response)).toBe('unavailable');
        expect(fetchMock).not.toHaveBeenCalled();
      },
    );
  });

  describe('what leaves the server', () => {
    it.each([
      ['accepted', { status: 202 }],
      ['refused', { status: 502 }],
      ['unreachable', new Error('unreachable')],
    ])(
      'given a message that is %s, when answered, then the response holds no secret',
      async (_name, answer) => {
        hermesAnswer = answer;

        const response = await send();

        const text = await response.text();
        expect(text).not.toContain(API_KEY);
        expect(text).not.toContain(TURNSTILE_SECRET);
        expect(text).not.toContain(OWNER);
      },
    );

    it('given a failure, when it is logged, then no message content or address appears', async () => {
      const logged: unknown[] = [];
      for (const method of ['log', 'info', 'warn', 'error'] as const) {
        vi.spyOn(console, method).mockImplementation(
          (...args: unknown[]) => void logged.push(...args),
        );
      }
      hermesAnswer = new Error(`failed for ${VISITOR}: ${valid.subject}`);

      await send();

      const text = JSON.stringify(logged.map(String));
      expect(text).not.toContain(VISITOR);
      expect(text).not.toContain(valid.subject);
      expect(text).not.toContain(valid.message);
      expect(text).not.toContain(API_KEY);
    });
  });
});
