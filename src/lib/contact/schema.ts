import * as z from 'zod';

/** The same limits Hermes applies, so a message the form accepts is not refused later. */
export const MAX_BODY_BYTES = 64 * 1024;
export const MAX_SUBJECT_LENGTH = 200;
export const MAX_MESSAGE_LENGTH = 10_000;

export const contactRequestSchema = z.object({
  email: z.email(),
  subject: z
    .string()
    .trim()
    .min(1)
    .max(MAX_SUBJECT_LENGTH)
    .regex(/^[^\r\n]*$/),
  message: z.string().trim().min(1).max(MAX_MESSAGE_LENGTH),
  turnstileToken: z.string().min(1),
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;

/** What the route answers. The form decides what to show for each. */
export type ContactStatus = 'sent' | 'invalid' | 'too-large' | 'rejected' | 'unavailable';
