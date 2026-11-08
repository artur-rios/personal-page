import type { Metadata } from 'next';
import { FaGithub, FaInstagram, FaLinkedin, FaRedditAlien } from 'react-icons/fa';
import { SiLetterboxd, SiX } from 'react-icons/si';
import HeadingText from '@/components/heading-text';
import ContactForm from '@/components/contact-form';
import Localized from '@/components/localized';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Contact',
};

const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' };

const linkSections = [
  {
    heading: { en: 'Professional links', pt: 'Links profissionais' },
    links: [
      { title: 'GitHub', href: 'https://www.github.com/artur-rios', Icon: FaGithub },
      {
        title: 'LinkedIn',
        href: 'https://www.linkedin.com/in/artur-rios',
        Icon: FaLinkedin,
      },
    ],
  },
  {
    heading: { en: 'Other social media', pt: 'Outras redes sociais' },
    links: [
      {
        title: 'Reddit',
        href: 'https://www.reddit.com/user/artur-dev/',
        Icon: FaRedditAlien,
      },
      { title: 'X', href: 'https://x.com/artur_rios_dev', Icon: SiX },
      {
        title: 'Instagram',
        href: 'https://www.instagram.com/artur.rios.dev/',
        Icon: FaInstagram,
      },
      {
        title: 'Letterboxd',
        href: 'https://letterboxd.com/artur_rios/',
        Icon: SiLetterboxd,
      },
    ],
  },
];

export default function Contact() {
  return (
    <main className="container flex flex-col items-center py-8">
      <div className="flex flex-col items-center space-y-2 text-center">
        <HeadingText>
          <Localized en="Contact" pt="Contato" />
        </HeadingText>
      </div>

      <div className="mt-8 flex w-full max-w-2xl flex-col items-center space-y-8 border-b pb-8 text-center">
        {linkSections.map(({ heading, links }) => (
          <section key={heading.en} className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold text-primary">
              <Localized {...heading} />
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {links.map(({ title, href, Icon }) => (
                <Button key={title} variant="outline" asChild className="gap-1.5">
                  <a href={href} {...externalLinkProps}>
                    <Icon className="h-4 w-4" />
                    {title}
                  </a>
                </Button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <ContactForm />
    </main>
  );
}
