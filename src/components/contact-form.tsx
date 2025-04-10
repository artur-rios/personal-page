'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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

const email = 'arturdev@duck.com';

export default function ContactForm() {
  const { lang } = useLanguage();

  const formSchema = z.object({
    subject: z.string().min(1, {
      message: lang === 'pt' ? 'Digite o assunto' : 'Subject is required',
    }),
    msg: z.string().min(1, {
      message: lang === 'pt' ? 'Digite a mensagem' : 'Message is required',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
      msg: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    window.location.href = `mailto:${email}?subject=${values.subject}&body=${values.msg}`;
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 py-8 sm:w-[24rem]"
      >
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
                  ? 'Sua mensagem será enviada por e-mail'
                  : 'Your message will be sent through email'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div />
        <Button className="w-full" type="submit">
          {lang === 'pt' ? 'Enviar' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
