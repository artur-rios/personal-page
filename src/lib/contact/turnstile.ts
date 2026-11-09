const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const TIMEOUT_MS = 5_000;

/** Codes that say the problem is on this side or Cloudflare's, not the visitor's. */
const NOT_THE_VISITOR = new Set([
  'missing-input-secret',
  'invalid-input-secret',
  'internal-error',
]);

/**
 * passed: a human. failed: Turnstile refused this visitor's token. unavailable: nothing could be decided, so the
 * visitor should be given another way to write rather than told to try again.
 */
export type TurnstileResult = 'passed' | 'failed' | 'unavailable';

/** Verifies a Turnstile token on the server. Only a clear success passes. */
export async function verifyTurnstile(
  token: string,
  secretKey: string,
): Promise<TurnstileResult> {
  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: secretKey, response: token }).toString(),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    const result = (await response.json()) as {
      success?: unknown;
      'error-codes'?: unknown;
    };

    if (result.success === true) {
      return 'passed';
    }

    const codes = Array.isArray(result['error-codes'])
      ? result['error-codes'].filter((code): code is string => typeof code === 'string')
      : [];

    console.warn(`contact: Turnstile answered ${codes.join(', ') || 'no error code'}`);

    return codes.length > 0 && !codes.some((code) => NOT_THE_VISITOR.has(code))
      ? 'failed'
      : 'unavailable';
  } catch {
    console.warn('contact: Turnstile could not be verified');

    return 'unavailable';
  }
}
