'use client';

import HeadingText from '@/components/heading-text';
import { Card, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
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
      docUrl: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
    },
    {
      text: `Java`,
      subtext: `Spring Framework | Hibernate`,
      icon: 'java',
      docUrl: 'https://docs.oracle.com/en/java/',
    },
    {
      text: `JavaScript`,
      subtext: `Node | React`,
      icon: 'javascript',
      docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      text: `TypeScript`,
      subtext: `Node | Angular | React`,
      icon: 'typescript',
      docUrl: 'https://www.typescriptlang.org/docs/',
    },
    {
      text: `Python`,
      subtext: `CLIs | Scripts`,
      icon: 'python',
      docUrl: 'https://docs.python.org/3/',
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
      subtext: `ApiGateway | DynamoDB | Lambda | RDS | S3 | SNS | SQS`,
      icon: 'aws',
      docUrl: 'https://docs.aws.amazon.com/',
    },
    {
      text: `Azure`,
      subtext: `DevOps | Functions`,
      icon: 'azure',
      docUrl: 'https://learn.microsoft.com/en-us/azure/',
    },
    {
      text: `Digital Ocean`,
      subtext: `Droplets | Managed Databases`,
      icon: 'digital-ocean',
      docUrl: 'https://docs.digitalocean.com/',
    },
  ],
};

const VISIBLE_LIMIT = 3;

function DetailTags({ subtext }: { subtext: string }) {
  const tags = subtext.split(/\s*\|\s*/).filter(Boolean);
  const [expanded, setExpanded] = useState(false);

  const hasOverflow = tags.length > VISIBLE_LIMIT;
  const visibleTags = hasOverflow && !expanded ? tags.slice(0, VISIBLE_LIMIT) : tags;

  return (
    <ul className="flex min-h-[2.75rem] flex-wrap items-center justify-center gap-1.5">
      {visibleTags.map((tag, i) => (
        <li key={i}>
          <span className="inline-block rounded-full border border-border/60 bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border hover:bg-muted dark:bg-muted/40 dark:border-border/50">
            {tag.trim()}
          </span>
        </li>
      ))}
      {hasOverflow && (
        <li>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-block cursor-pointer rounded-full border border-border/60 bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-muted dark:bg-muted/40 dark:border-border/50"
          >
            {expanded ? 'show less' : `+${tags.length - VISIBLE_LIMIT} more`}
          </button>
        </li>
      )}
    </ul>
  );
}

function TechCard({
  title,
  subtext,
  icon,
  docUrl,
}: {
  title: string;
  subtext: string;
  icon?: string;
  docUrl?: string;
}) {
  const titleNode = (
    <CardTitle className="mt-3 shrink-0 text-center text-base font-semibold sm:mt-4 sm:text-lg">
      {docUrl ? (
        <a
          href={docUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground transition-colors hover:text-primary"
        >
          {title}
        </a>
      ) : (
        title
      )}
    </CardTitle>
  );

  return (
    <Card className="group flex h-full flex-col items-center rounded-xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-secondary sm:p-6 md:p-7 lg:p-8">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24 md:h-28 md:w-28">
        {icon && (
          <CustomIcon
            icon={icon}
            className="h-14 w-14 transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
        )}
      </div>
      {titleNode}
      <div className="mt-3 w-full shrink-0 sm:mt-4">
        <DetailTags subtext={subtext} />
      </div>
    </Card>
  );
}

export default function TechCards() {
  const { lang } = useLanguage();

  return (
    <section>
      <div className="container space-y-12 py-12 text-center sm:space-y-16 lg:py-24 lg:space-y-20">
        <HeadingText
          subtext={lang === 'pt' ? techCards.ptSubheader : techCards.subheader}
        >
          {lang === 'pt' ? techCards.ptHeader : techCards.header}
        </HeadingText>
        <div className="grid grid-cols-2 items-stretch gap-4 sm:grid-cols-3 sm:gap-5 md:gap-6 lg:grid-cols-5 lg:gap-6">
          {techCards.content.map((card) => (
            <TechCard
              key={card.text}
              title={card.text}
              subtext={card.subtext}
              icon={card.icon}
              docUrl={card.docUrl}
            />
          ))}
        </div>
        <HeadingText
          subtext={lang === 'pt' ? cloudCards.ptSubheader : cloudCards.subheader}
        >
          {lang === 'pt' ? cloudCards.ptHeader : cloudCards.header}
        </HeadingText>
        <div className="mx-auto grid max-w-3xl grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3 lg:gap-6">
          {cloudCards.content.map((card) => (
            <TechCard
              key={card.text}
              title={card.text}
              subtext={card.subtext}
              icon={card.icon}
              docUrl={card.docUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
