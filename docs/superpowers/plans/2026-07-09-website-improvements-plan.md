# Website Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve navbar external links, update packages, enhance tech/cloud card visuals, and add a Projects page with placeholder cards.

**Architecture:** Four independent improvements across existing and new files. Navbar gets conditional `target="_blank"` for external links. Tech/cloud cards get enhanced responsive grid and hover effects. New Projects page uses a static data file with a card component that renders GitHub opengraph previews.

**Tech Stack:** Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Card, Button), lucide-react icons, next-themes.

## Global Constraints

- All content must be bilingual (en/pt) using existing `useLanguage()` pattern
- Dark/light theme must work via existing `next-themes` + CSS variables
- External links use `target="_blank"` + `rel="noopener noreferrer"`
- Placeholder project data uses `TODO` descriptions
- `npm run build` and `npm run lint` must pass

---

### Task 1: External NavLinks Open in New Tab

**Files:**
- Modify: `src/components/navbar.tsx:88-94`

**Interfaces:**
- Consumes: `navLinks` from `src/lib/config.ts` (existing `MenuLink[]`)
- Produces: `<Link>` now conditionally renders `target="_blank"` and `rel="noopener noreferrer"` for external URLs

- [ ] **Step 1: Add conditional external link attributes**

Replace the `<Link>` element inside the `navLinks.map()` (lines 88-94) with:

```tsx
<Link
  className="hover:underline"
  href={lang === 'pt' ? link.ptHref || link.href || '' : link.href || ''}
  onClick={handleClick}
  {...(link.href?.startsWith('http')
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {})}
>
  {lang === 'pt' && link.ptTitle ? link.ptTitle : link.title}
</Link>
```

- [ ] **Step 2: Verify with lint**

```bash
npm run lint
```

Expected: No new errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/navbar.tsx
git commit -m "feat: open external navlinks in new tab"
```

---

### Task 2: Update Packages to Latest Stable

**Files:**
- Modify: `package.json`, `package-lock.json` (via npm update)

**Interfaces:**
- None — isolated dependency bump

- [ ] **Step 1: Run npm update**

```bash
npm update
```

- [ ] **Step 2: Run build to verify no breakage**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: No new errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: update all packages to latest stable"
```

---

### Task 3: Improved Tech & Cloud Card Visualizations

**Files:**
- Modify: `src/components/tech-cards.tsx` (entire file)

**Interfaces:**
- Consumes: `HeadingText`, `Card`/`CardTitle`, `CustomIcon`, `useLanguage` (existing)
- Produces: Same exports — `techCards`, `cloudCards` (data), `TechCards` (default component). Components `TechCard` and `DetailTags` updated internally.

- [ ] **Step 1: Replace entire `src/components/tech-cards.tsx` with enhanced version**

```tsx
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
```

- [ ] **Step 2: Verify with lint**

```bash
npm run lint
```

Expected: No errors.

- [ ] **Step 3: Verify with build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/tech-cards.tsx
git commit -m "feat: improve tech and cloud card visuals with responsive grid and hover effects"
```

---

### Task 4: Add Projects Nav Link to Config

**Files:**
- Modify: `src/lib/config.ts`

**Interfaces:**
- Consumes: `MenuLink` type from `src/types/menu-link.ts`
- Produces: `navLinks` array now includes a "Projects" entry

- [ ] **Step 1: Add Projects link to config**

Insert the Projects entry between LinkedIn and Contact in `src/lib/config.ts`:

```tsx
import { MenuLink } from '@/types/menu-link';

export const navLinks: MenuLink[] = [
  {
    title: 'Blog',
    href: 'https://blog.artur-rios.tech/',
    ptHref: 'https://blog.artur-rios.tech/pt',
  },
  {
    title: 'Resume',
    ptTitle: 'Currículo',
    href: 'https://drive.google.com/file/d/1_BXPAiYVmTiGu5KFb8rGhZ-SGCQ2s0LJ/view',
    ptHref: 'https://drive.google.com/file/d/1rmV9vAzr0w1pzMKDjzqY43_nm3c8JguQ/view',
  },
  {
    title: 'GitHub',
    href: 'https://www.github.com/artur-rios',
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/artur-rios',
  },
  {
    title: 'Projects',
    ptTitle: 'Projetos',
    href: '/projects',
  },
  {
    title: 'Contact',
    ptTitle: 'Contato',
    href: '/contact',
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/config.ts
git commit -m "feat: add Projects nav link"
```

---

### Task 5: Create Project Type

**Files:**
- Create: `src/types/project.ts`

**Interfaces:**
- Produces: `Project` type consumed by `src/lib/projects.ts` and `src/components/project-card.tsx`

- [ ] **Step 1: Create the type file**

```tsx
export type Project = {
  title: string;
  ptTitle?: string;
  description: string;
  ptDescription?: string;
  websiteUrl?: string;
  githubUrl: string;
  repoOwner: string;
  repoName: string;
  tech: string[];
};
```

- [ ] **Step 2: Commit**

```bash
git add src/types/project.ts
git commit -m "feat: add Project type"
```

---

### Task 6: Create Projects Data File with Placeholders

**Files:**
- Create: `src/lib/projects.ts`

**Interfaces:**
- Consumes: `Project` from `src/types/project.ts`
- Produces: `projects: Project[]` consumed by `src/app/projects/page.tsx`

- [ ] **Step 1: Create the projects data file**

```tsx
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'Project Alpha',
    ptTitle: 'Projeto Alpha',
    description: 'TODO: Add a short description of Project Alpha and what it does.',
    ptDescription: 'TODO: Adicione uma breve descrição do Projeto Alpha e o que ele faz.',
    websiteUrl: 'https://example.com',
    githubUrl: 'https://github.com/artur-rios/project-alpha',
    repoOwner: 'artur-rios',
    repoName: 'project-alpha',
    tech: ['TypeScript', 'React', 'Node.js'],
  },
  {
    title: 'Project Beta',
    ptTitle: 'Projeto Beta',
    description: 'TODO: Add a short description of Project Beta and what it does.',
    ptDescription: 'TODO: Adicione uma breve descrição do Projeto Beta e o que ele faz.',
    githubUrl: 'https://github.com/artur-rios/project-beta',
    repoOwner: 'artur-rios',
    repoName: 'project-beta',
    tech: ['Python', 'FastAPI', 'PostgreSQL'],
  },
  {
    title: 'Project Gamma',
    ptTitle: 'Projeto Gama',
    description: 'TODO: Add a short description of Project Gamma and what it does.',
    ptDescription: 'TODO: Adicione uma breve descrição do Projeto Gama e o que ele faz.',
    websiteUrl: 'https://example.com',
    githubUrl: 'https://github.com/artur-rios/project-gamma',
    repoOwner: 'artur-rios',
    repoName: 'project-gamma',
    tech: ['C#', '.NET', 'Azure'],
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/projects.ts
git commit -m "feat: add projects data with placeholders"
```

---

### Task 7: Create ProjectCard Component

**Files:**
- Create: `src/components/project-card.tsx`

**Interfaces:**
- Consumes: `Project` from `src/types/project.ts`, `Card`/`CardTitle`/`CardDescription`/`CardFooter` from `src/components/ui/card.tsx`, `cn` from `src/lib/utils.ts`, `ExternalLink`, `Github` from `lucide-react`, `useLanguage` from `src/components/lang-provider`
- Produces: `ProjectCard` component used by `src/app/projects/page.tsx`

- [ ] **Step 1: Create the ProjectCard component**

```tsx
'use client';

import Image from 'next/image';
import { Project } from '@/types/project';
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '@/components/lang-provider';
import { Button } from '@/components/ui/button';

export default function ProjectCard({ project }: { project: Project }) {
  const { lang } = useLanguage();

  const title = lang === 'pt' && project.ptTitle ? project.ptTitle : project.title;
  const description =
    lang === 'pt' && project.ptDescription ? project.ptDescription : project.description;

  const previewUrl = `https://opengraph.githubassets.com/1/${project.repoOwner}/${project.repoName}`;

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden border-b bg-muted/30 dark:bg-muted/20">
        <Image
          src={previewUrl}
          alt={`${title} preview`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105 dark:brightness-90"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
        <CardDescription className="mt-2 line-clamp-3 text-sm leading-relaxed">
          {description}
        </CardDescription>
        {project.tech.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="inline-block rounded-full border border-border/60 bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground dark:bg-muted/40 dark:border-border/50"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-3 p-5 pt-0 sm:p-6 sm:pt-0">
        {project.websiteUrl && (
          <Button variant="outline" size="sm" asChild className="gap-1.5">
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              Website
            </a>
          </Button>
        )}
        <Button variant="outline" size="sm" asChild className="gap-1.5">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
```

- [ ] **Step 2: Verify lint**

```bash
npm run lint
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/project-card.tsx
git commit -m "feat: add ProjectCard component with GitHub preview"
```

---

### Task 8: Create Projects Page

**Files:**
- Create: `src/app/projects/page.tsx`

**Interfaces:**
- Consumes: `projects` from `src/lib/projects.ts`, `HeadingText` from `src/components/heading-text.tsx`, `ProjectCard` from `src/components/project-card.tsx`, `useLanguage` from `src/components/lang-provider`
- Produces: `/projects` route

- [ ] **Step 1: Create the page file**

First ensure the directory exists, then write the file.

```bash
New-Item -ItemType Directory -Path "src/app/projects" -Force
```

Then create `src/app/projects/page.tsx`:

```tsx
'use client';

import HeadingText from '@/components/heading-text';
import { projects } from '@/lib/projects';
import ProjectCard from '@/components/project-card';
import { useLanguage } from '@/components/lang-provider';

export default function ProjectsPage() {
  const { lang } = useLanguage();

  return (
    <main className="container py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl space-y-10 sm:space-y-12 lg:space-y-16">
        <HeadingText
          subtext={
            lang === 'pt'
              ? 'Uma seleção de projetos em que trabalhei'
              : 'A selection of projects I have worked on'
          }
        >
          {lang === 'pt' ? 'Projetos' : 'Projects'}
        </HeadingText>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Configure Next.js for remote images**

Modify `next.config.ts` to allow GitHub's opengraph domain for `next/image`:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'opengraph.githubassets.com',
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 4: Run lint**

```bash
npm run lint
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/projects/page.tsx next.config.ts
git commit -m "feat: add Projects page with placeholder cards"
```

---

### Task 9: Final Verification

**Files:**
- None (verification only)

- [ ] **Step 1: Final build check**

```bash
npm run build
```

Expected: Build succeeds with 0 errors, 0 warnings.

- [ ] **Step 2: Final lint check**

```bash
npm run lint
```

Expected: No errors.

- [ ] **Step 3: Commit any remaining changes**

```bash
git status
git add -A
git commit -m "chore: final verification, all changes complete"
```
