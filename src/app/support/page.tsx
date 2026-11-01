import type { Metadata } from 'next';
import { Coffee, Heart } from 'lucide-react';
import HeadingText from '@/components/heading-text';
import Localized from '@/components/localized';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Support the free and open source software built and maintained by Artur Rios, with no ads.',
};

const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' };

const sponsorOptions = [
  {
    title: 'Buy Me a Coffee',
    description: { en: 'A one-off thank you.', pt: 'Um agradecimento pontual.' },
    action: { en: 'Buy me a coffee', pt: 'Me pague um café' },
    href: 'https://buymeacoffee.com/artur.rios',
    Icon: Coffee,
  },
  {
    title: 'GitHub Sponsors',
    description: {
      en: 'One-time or monthly, through GitHub.',
      pt: 'Pontual ou mensal, pelo GitHub.',
    },
    action: { en: 'Sponsor on GitHub', pt: 'Patrocine no GitHub' },
    href: 'https://github.com/sponsors/artur-rios',
    Icon: Heart,
  },
];

const profiles = [
  { title: 'GitHub', href: 'https://www.github.com/artur-rios' },
  { title: 'LinkedIn', href: 'https://www.linkedin.com/in/artur-rios' },
];

export default function Support() {
  return (
    <main className="container flex flex-col items-center py-8">
      <div className="flex max-w-2xl flex-col items-center space-y-4 text-center">
        <HeadingText>
          <Localized en="Support" pt="Apoie" />
        </HeadingText>
        <p className="leading-relaxed text-muted-foreground">
          <Localized
            en="I build and maintain everything here on my own, in my free time, and I pay for all of its infrastructure myself. Your support helps keep the software free and without ads."
            pt="Desenvolvo e mantenho tudo aqui sozinho, no meu tempo livre, e pago por toda a infraestrutura do meu bolso. Seu apoio ajuda a manter os softwares gratuitos e sem anúncios."
          />
        </p>
        <p className="leading-relaxed text-muted-foreground">
          <Localized
            en="It will always be free and open source. Support is appreciated, but never expected."
            pt="Eles sempre serão gratuitos e de código aberto. O apoio é muito bem-vindo, mas nunca esperado."
          />
        </p>
      </div>

      <div className="mt-8 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        {sponsorOptions.map(({ title, description, action, href, Icon }) => (
          <Card key={title}>
            <CardContent className="flex h-full flex-col p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-primary sm:text-xl">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                <Localized {...description} />
              </p>
              <Button asChild className="mt-4 gap-1.5 self-start">
                <a href={href} {...externalLinkProps}>
                  <Icon className="h-4 w-4" />
                  <Localized {...action} />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex w-full max-w-2xl flex-col items-center space-y-4 border-t pt-8 text-center">
        <h2 className="text-2xl font-bold text-primary">
          <Localized en="Other ways to help" pt="Outras formas de ajudar" />
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          <Localized
            en="Mentioning my GitHub or LinkedIn profile costs nothing and helps a lot."
            pt="Indicar meu perfil no GitHub ou no LinkedIn não custa nada e ajuda muito."
          />
        </p>
        <div className="flex gap-2">
          {profiles.map(({ title, href }) => (
            <Button key={title} variant="outline" asChild>
              <a href={href} {...externalLinkProps}>
                {title}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </main>
  );
}
