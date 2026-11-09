export interface ContactSettings {
  hermesBaseUrl: string;
  hermesApiKey: string;
  ownerEmail: string;
  turnstileSecretKey: string;
}

/**
 * The route's settings, read when a request arrives because the image is built once for every environment. These
 * stay on the server: none has the NEXT_PUBLIC_ prefix.
 *
 * @returns The settings, or null when any is missing, so an unconfigured environment falls back to showing the
 * owner's address.
 */
export function readContactSettings(): ContactSettings | null {
  const hermesBaseUrl = process.env.HERMES_BASE_URL;
  const hermesApiKey = process.env.HERMES_API_KEY;
  const ownerEmail = process.env.CONTACT_OWNER_EMAIL;
  const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!hermesBaseUrl || !hermesApiKey || !ownerEmail || !turnstileSecretKey) {
    return null;
  }

  return { hermesBaseUrl, hermesApiKey, ownerEmail, turnstileSecretKey };
}
