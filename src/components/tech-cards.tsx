'use client';

import HeadingText from '@/components/heading-text';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import React from 'react';
import { ContentSection } from '@/types/content-section';
import CustomIcon from '@/components/custom-icon';
import { useLanguage } from '@/components/lang-provider';

export const techCards: ContentSection = {
  header: `Technologies I work with`,
  ptHeader: `Tecnologias que utilizo`,
  subheader: `Programming languages and frameworks I have professional experience`,
  ptSubheader: `Linguagens de programação e frameworks nos quais possuo experiência profissional`,
  content: [
    {
      text: `C#`,
      subtext: `.Net | Entity Framework`,
      icon: 'csharp',
    },
    {
      text: `Java`,
      subtext: `Spring Framework | Hibernate`,
      icon: 'java',
    },
    {
      text: `JavaScript`,
      subtext: `Node | React`,
      icon: 'javascript',
    },
    {
      text: `TypeScript`,
      subtext: `Node | Angular | React`,
      icon: 'typescript',
    },
    {
      text: `Python`,
      subtext: `CLIs | Scripts`,
      icon: 'python',
    },
  ],
};

export const cloudCards: ContentSection = {
  header: `Cloud Providers I work with`,
  ptHeader: `Provedores de Nuvem com os quais trabalho`,
  subheader: `Cloud platforms I have professional experience`,
  ptSubheader: `Plataformas de nuvem nas quais possuo experiência profissional`,
  content: [
    {
      text: `AWS`,
      subtext: `ApiGateway | CloudFormation | Lambda | RDS | S3 | SNS | SQS`,
      icon: 'aws',
    },
    {
      text: `Azure`,
      subtext: `DevOps | Functions`,
      icon: 'azure',
    },
    {
      text: `Digital Ocean`,
      subtext: `Droplets | Managed Databases`,
      icon: 'digital-ocean',
    },
  ],
};

export default function TechCards() {
  const { lang } = useLanguage();

  return (
    <section>
      <div className="container space-y-8 py-12 text-center lg:py-20">
        <HeadingText
          subtext={lang === 'pt' ? techCards.ptSubheader : techCards.subheader}
        >
          {lang === 'pt' ? techCards.ptHeader : techCards.header}
        </HeadingText>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {techCards.content.map((cards) => {
            return (
              <Card
                key={cards.text}
                className="flex flex-grow flex-col items-center justify-between gap-4 p-8 dark:bg-secondary"
              >
                <div className="flex">
                  <CustomIcon icon={cards.icon} />
                </div>
                <div className="space-y-2">
                  <CardTitle>{cards.text}</CardTitle>
                  <CardDescription>{cards.subtext}</CardDescription>
                </div>
              </Card>
            );
          })}
        </div>
        <HeadingText
          subtext={lang === 'pt' ? cloudCards.ptSubheader : cloudCards.subheader}
        >
          {lang === 'pt' ? cloudCards.ptHeader : cloudCards.header}
        </HeadingText>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cloudCards.content.map((cards) => {
            return (
              <Card
                key={cards.text}
                className="flex flex-grow flex-col items-center justify-between gap-4 p-8 dark:bg-secondary"
              >
                <div className="flex">
                  <CustomIcon icon={cards.icon} />
                </div>
                <div className="space-y-2">
                  <CardTitle>{cards.text}</CardTitle>
                  <CardDescription>{cards.subtext}</CardDescription>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
