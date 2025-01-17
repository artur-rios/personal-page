'use client';

import { useLanguage } from '@/components/lang-provider';

export default function HeroHeader() {
  const { lang } = useLanguage();

  return (
    <section className="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-20">
      <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="space-y-4">
          {lang === 'en' && (
            <>
              <h1 className="text-4xl font-bold lg:text-6xl">Hello</h1>
              <h2 className="text-lg font-light text-muted-foreground lg:text-3xl">
                My name is Artur Rios, from Brazil. I&apos;ve been working as a Fullstack
                Software Developer since 2018. I&apos;m passionate about solving problems
                with technology and learning new things in the process.
              </h2>
              <h2 className="text-lg font-light text-muted-foreground lg:text-3xl">
                Currently, I work on a project for the{' '}
                <a href="https://www.btgpactual.com/" className="underline">
                  BTG Pactual
                </a>{' '}
                bank, employed by{' '}
                <a href="https://www.brq.com/" className="underline">
                  BRQ Digital Solutions
                </a>
                . My experience goes from startups to giant companies.
              </h2>
            </>
          )}
          {lang === 'pt' && (
            <>
              <h1 className="text-4xl font-bold lg:text-6xl" lang="pt">
                Olá
              </h1>
              <h2
                className="text-lg font-light text-muted-foreground lg:text-3xl"
                lang="pt"
              >
                Meu nome é Artur Rios. Trabalho como Desenvolvedor de Software Fullstack
                desde de 2018. Sou apaixonado por resolver problemas usando tecnologia, e
                aprender coisas novas no processo.
              </h2>
              <h2
                className="text-lg font-light text-muted-foreground lg:text-3xl"
                lang="pt"
              >
                Atualmente trabalho em um projeto para o banco{' '}
                <a href="https://www.btgpactual.com/" className="underline">
                  BTG Pactual
                </a>
                empregado pela{' '}
                <a href="https://www.brq.com/" className="underline">
                  BRQ Digital Solutions
                </a>
                . Minha experiência vai desde startups até empresas gigantes.
              </h2>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
