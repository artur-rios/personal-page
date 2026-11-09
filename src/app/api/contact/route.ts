import { sendToHermes } from '@/lib/contact/hermes';
import {
  type ContactStatus,
  contactRequestSchema,
  MAX_BODY_BYTES,
} from '@/lib/contact/schema';
import { readContactSettings } from '@/lib/contact/settings';
import { verifyTurnstile } from '@/lib/contact/turnstile';

// Reads its settings when a request arrives, and every request is different.
export const dynamic = 'force-dynamic';

function answer(status: ContactStatus, httpStatus: number): Response {
  return Response.json({ status }, { status: httpStatus });
}

/** @returns The body as text, or null when it is over the limit, whether or not it declared its length. */
async function readBody(request: Request): Promise<string | null> {
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
    return null;
  }

  if (!request.body) {
    return '';
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let total = 0;
  let text = '';

  for (;;) {
    const { done, value } = await reader.read();

    if (done) {
      return text + decoder.decode();
    }

    total += value.byteLength;

    if (total > MAX_BODY_BYTES) {
      await reader.cancel();

      return null;
    }

    text += decoder.decode(value, { stream: true });
  }
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

function isHoneypotFilled(body: unknown): boolean {
  if (typeof body !== 'object' || body === null || !('website' in body)) {
    return false;
  }

  return Boolean(body.website);
}

/**
 * The public side of the contact form. Traefik limits it per source before it arrives. The checks run cheapest first,
 * and Hermes is only called for a message that passed them all.
 */
export async function POST(request: Request): Promise<Response> {
  const text = await readBody(request);

  if (text === null) {
    return answer('too-large', 413);
  }

  const body = parseJson(text);

  if (isHoneypotFilled(body)) {
    return answer('sent', 200);
  }

  const parsed = contactRequestSchema.safeParse(body);

  if (!parsed.success) {
    return answer('invalid', 400);
  }

  const settings = readContactSettings();

  if (!settings) {
    console.warn('contact: the contact settings are not configured');

    return answer('unavailable', 502);
  }

  const turnstile = await verifyTurnstile(
    parsed.data.turnstileToken,
    settings.turnstileSecretKey,
  );

  if (turnstile === 'failed') {
    return answer('rejected', 403);
  }

  if (turnstile === 'unavailable') {
    return answer('unavailable', 502);
  }

  return (await sendToHermes(parsed.data, settings))
    ? answer('sent', 200)
    : answer('unavailable', 502);
}
