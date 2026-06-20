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
          <span className="inline-block rounded-md border border-border/80 bg-muted/70 px-2 py-0.5 text-xs font-medium text-muted-foreground dark:bg-muted/50 dark:border-border/60">
            {tag.trim()}
          </span>
        </li>
      ))}
      {hasOverflow && (
        <li>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-block cursor-pointer rounded-md border border-border/80 bg-muted/70 px-2 py-0.5 text-xs font-medium text-primary hover:bg-muted dark:bg-muted/50 dark:border-border/60"
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
    <CardTitle className="mt-2 shrink-0 text-center text-base font-semibold sm:mt-3 sm:text-lg">
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
    <Card className="flex h-full flex-col items-center rounded-xl border bg-card p-4 shadow-sm dark:bg-secondary sm:p-5 md:p-6 lg:p-8">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center sm:h-20 sm:w-20 md:h-24 md:w-24">
        {icon && (
          <CustomIcon
            icon={icon}
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16"
          />
        )}
      </div>
      {titleNode}
      <div className="mt-2 w-full shrink-0 sm:mt-3">
        <DetailTags subtext={subtext} />
      </div>
    </Card>
  );
}

export default function TechCards() {
  const { lang } = useLanguage();

  return (
    <section>
      <div className="container space-y-10 py-12 text-center sm:space-y-12 lg:py-20 lg:space-y-14">
        <HeadingText
          subtext={lang === 'pt' ? techCards.ptSubheader : techCards.subheader}
        >
          {lang === 'pt' ? techCards.ptHeader : techCards.header}
        </HeadingText>
        <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-5 lg:gap-6">
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
        <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:gap-5 lg:grid-cols-3 lg:gap-6">
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
