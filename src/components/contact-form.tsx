'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import TurnstileWidget from '@/components/turnstile-widget';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/components/lang-provider';
import {
  type ContactStatus,
  MAX_MESSAGE_LENGTH,
  MAX_SUBJECT_LENGTH,
} from '@/lib/contact/schema';

interface ContactFormProps {
  /** Absent until the environment is configured, when the form gives way to the owner's address. */
  siteKey?: string;
  ownerEmail: string;
}

type Outcome = ContactStatus | 'idle';

function OwnerAddress({ ownerEmail, lang }: { ownerEmail: string; lang: string }) {
  return (
    <p className="py-8 text-center" role="status">
      {lang === 'pt'
        ? 'Não foi possível enviar pelo site. Escreva para '
        : 'The message could not be sent from here. Please write to '}
      <a className="underline" href={`mailto:${ownerEmail}`}>
        {ownerEmail}
      </a>
      .
    </p>
  );
}

export default function ContactForm({ siteKey, ownerEmail }: ContactFormProps) {
  const { lang } = useLanguage();
  const [outcome, setOutcome] = useState<Outcome>('idle');
  const [token, setToken] = useState('');
  const [resetKey, setResetKey] = useState(0);

  const formSchema = z.object({
    email: z.email(
      lang === 'pt' ? 'Digite um e-mail válido' : 'Enter a valid email address',
    ),
    subject: z
      .string()
      .trim()
      .min(1, lang === 'pt' ? 'Digite o assunto' : 'Subject is required')
      .max(
        MAX_SUBJECT_LENGTH,
        lang === 'pt'
          ? `Use no máximo ${MAX_SUBJECT_LENGTH} caracteres`
          : `Use at most ${MAX_SUBJECT_LENGTH} characters`,
      ),
    msg: z
      .string()
      .trim()
      .min(1, lang === 'pt' ? 'Digite a mensagem' : 'Message is required')
      .max(
        MAX_MESSAGE_LENGTH,
        lang === 'pt'
          ? `Use no máximo ${MAX_MESSAGE_LENGTH} caracteres`
          : `Use at most ${MAX_MESSAGE_LENGTH} characters`,
      ),
    website: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      subject: '',
      msg: '',
      website: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setOutcome('idle');

    let status: ContactStatus = 'unavailable';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          subject: values.subject,
          message: values.msg,
          website: values.website,
          turnstileToken: token,
        }),
      });

      status = ((await response.json()) as { status: ContactStatus }).status;
    } catch {
      status = 'unavailable';
    }

    setOutcome(status);
    setToken('');
    setResetKey((key) => key + 1);

    if (status === 'sent') {
      form.reset();
    }
  }

  if (!siteKey) {
    return <OwnerAddress ownerEmail={ownerEmail} lang={lang} />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 py-8 sm:w-[24rem]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lang === 'pt' ? 'Seu e-mail' : 'Your email'}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder={lang === 'pt' ? 'Digite seu e-mail' : 'Enter your email'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lang === 'pt' ? 'Assunto' : 'Subject'}</FormLabel>
              <FormControl>
                <Input
                  placeholder={lang === 'pt' ? 'Digite o assunto' : 'Enter the subject'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="msg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lang === 'pt' ? 'Mensagem' : 'Message'}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={lang === 'pt' ? 'Digite a mensagem' : 'Enter your message'}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {lang === 'pt'
                  ? 'Sua mensagem será enviada por e-mail, e a resposta irá para o seu endereço'
                  : 'Your message will be sent through email, and replies will go to your address'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div aria-hidden="true" className="absolute left-[-9999px]">
          <label>
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...form.register('website')}
            />
          </label>
        </div>
        <TurnstileWidget siteKey={siteKey} onToken={setToken} resetKey={resetKey} />
        <Button
          className="mt-4 w-full"
          type="submit"
          disabled={!token || form.formState.isSubmitting}
        >
          {lang === 'pt' ? 'Enviar' : 'Submit'}
        </Button>
        {outcome === 'sent' && (
          <p className="text-center" role="status">
            {lang === 'pt'
              ? 'Sua mensagem foi enviada. Obrigado!'
              : 'Your message has been sent. Thank you!'}
          </p>
        )}
        {(outcome === 'invalid' || outcome === 'too-large') && (
          <p className="text-center text-destructive" role="alert">
            {lang === 'pt'
              ? 'Verifique os campos e tente novamente.'
              : 'Please check the fields and try again.'}
          </p>
        )}
        {outcome === 'rejected' && (
          <p className="text-center text-destructive" role="alert">
            {lang === 'pt'
              ? 'A verificação falhou. Tente novamente.'
              : 'The verification failed. Please try again.'}
          </p>
        )}
        {outcome === 'unavailable' && (
          <OwnerAddress ownerEmail={ownerEmail} lang={lang} />
        )}
      </form>
    </Form>
  );
}
