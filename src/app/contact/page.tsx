'use client';

import HeadingText from '@/components/heading-text';
import ContactForm from '@/components/contact-form';
import { useLanguage } from '@/components/lang-provider';

export default function Contact() {
  const { lang } = useLanguage();

  return (
    <main className="container flex flex-col items-center py-8">
      <div className="flex flex-col items-center space-y-2 text-center">
        <HeadingText
          subtext={
            lang === 'pt'
              ? 'Envie uma mensagem por e-mail'
              : 'Send a message through email'
          }
        >
          {lang === 'pt' ? 'Contato' : 'Contact'}
        </HeadingText>
      </div>
      <ContactForm />
    </main>
  );
}
