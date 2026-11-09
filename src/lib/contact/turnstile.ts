const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const TIMEOUT_MS = 5_000;

/** Verifies a Turnstile token on the server. Anything but a clear success counts as a failure. */
export async function verifyTurnstile(
  token: string,
  secretKey: string,
): Promise<boolean> {
  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: secretKey, response: token }).toString(),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    const result = (await response.json()) as { success?: unknown };

    return result.success === true;
  } catch {
    console.warn('contact: Turnstile could not be verified');

    return false;
  }
}
