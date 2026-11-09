import type { ContactRequest } from './schema';
import type { ContactSettings } from './settings';

const ACCEPTED = 202;

/** Above what Hermes can take: up to 10 seconds for its owner alert, then 10 for the message. */
const TIMEOUT_MS = 25_000;

/**
 * Hands the message to Hermes: to the owner, with the visitor only as the reply-to, so nothing can ever be sent to
 * the address the visitor typed.
 *
 * @returns Whether Hermes accepted it. Only the outcome is logged, never the message or an address.
 */
export async function sendToHermes(
  request: ContactRequest,
  settings: ContactSettings,
): Promise<boolean> {
  try {
    const response = await fetch(`${settings.hermesBaseUrl}/api/emails`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${settings.hermesApiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        to: settings.ownerEmail,
        subject: request.subject,
        body: request.message,
        replyTo: request.email,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (response.status !== ACCEPTED) {
      console.warn(`contact: Hermes answered ${response.status}`);
    }

    return response.status === ACCEPTED;
  } catch {
    console.warn('contact: Hermes could not be reached');

    return false;
  }
}
