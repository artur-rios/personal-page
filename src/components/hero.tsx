'use client';

import { useLanguage } from '@/components/lang-provider';

export default function HeroHeader() {
  const { lang } = useLanguage();

  return (
    <section className="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-10">
      <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="space-y-4">
          {lang === 'en' && (
            <>
              <h1 className="text-4xl font-bold lg:text-6xl">Hello World</h1>
              <h2 className="text-lg font-light text-muted-foreground lg:text-3xl">
                I&apos;m Artur Rios — a passionate software developer from Brazil,
                currently working at{' '}
                <a href="https://www.ciandt.com/" className="underline">
                  CI&T
                </a>{' '}
                on a project for{' '}
                <a href="https://www.itau.com" className="underline">
                  Itaú Bank
                </a>
                . I thrive on using technology to tackle real-world challenges and turn
                complex problems into elegant solutions.
                <br />
                <br />
                Throughout my career, I&apos;ve cultivated a deep love for learning. Every
                new project is an opportunity to expand my skills, explore innovative
                approaches, and grow both professionally and personally. Whether it&apos;s
                mastering a new framework or diving into system architecture, I&apos;m
                always up for the challenge.
                <br />
                <br />
                Let&apos;s build something meaningful.
              </h2>
            </>
          )}
          {lang === 'pt' && (
            <>
              <h1 className="text-4xl font-bold lg:text-6xl" lang="pt">
                Olá Mundo
              </h1>
              <h2
                className="text-lg font-light text-muted-foreground lg:text-3xl"
                lang="pt"
              >
                Olá! Sou Artur Rios, desenvolvedor de software apaixonado pelo que faço,
                atualmente trabalhando na{' '}
                <a href="https://www.ciandt.com/" className="underline">
                  CI&T
                </a>{' '}
                em um projeto para o banco{' '}
                <a href="https://www.itau.com" className="underline">
                  Itaú
                </a>
                . Tenho prazer em usar a tecnologia para enfrentar desafios reais e
                transformar problemas complexos em soluções inteligentes.
                <br />
                <br />
                Ao longo da minha trajetória, desenvolvi uma verdadeira paixão por
                aprender. Cada novo projeto é uma chance de aprimorar minhas habilidades,
                explorar abordagens inovadoras e crescer tanto profissional quanto
                pessoalmente. Seja dominando um novo framework ou mergulhando na
                arquitetura de sistemas, estou sempre pronto para o desafio.
                <br />
                <br />
                Vamos construir algo significativo juntos?
              </h2>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
