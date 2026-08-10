# Project Group Pages — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat `/projects` grid with a hub linking to 6 group/individual detail pages, each showing an overview and a list of related repositories.

**Architecture:** 3 new source files (1 type, 2 components), 1 data file change, 1 page rewrite, 1 new dynamic route. Reuses existing `ProjectCard` component unchanged. `/projects/dotnet-libraries` remains untouched.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui

## Global Constraints

- Bilingual: en/pt via `useLanguage()` hook, `ptTitle`/`ptOverview` fallbacks
- `ProjectCard` component must not change
- `/projects/dotnet-libraries/page.tsx` must not change
- No new npm dependencies
- `params` is a `Promise` (Next.js 16 convention) — must `await` it in async server pages

---

### Task 1: Add ProjectGroup type

**Files:**
- Create: `src/types/project-group.ts`

**Interfaces:**
- Produces: `ProjectGroup` type with fields `slug`, `title`, `ptTitle?`, `overview`, `ptOverview?`, `projectRepoNames`

- [ ] **Step 1: Create the type file**

```typescript
export type ProjectGroup = {
  slug: string;
  title: string;
  ptTitle?: string;
  overview: string;
  ptOverview?: string;
  projectRepoNames: string[];
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: PASS (no errors related to the new file)

- [ ] **Step 3: Commit**

```bash
git add src/types/project-group.ts
git commit -m "feat: add ProjectGroup type"
```

---

### Task 2: Add projectGroups data and getGroupProjects helper

**Files:**
- Modify: `src/lib/projects.ts`

**Interfaces:**
- Consumes: `ProjectGroup` from `@/types/project-group`
- Produces: `projectGroups: ProjectGroup[]`, `getGroupProjects(group: ProjectGroup): Project[]`

- [ ] **Step 1: Add import and data at the end of the file**

Open `src/lib/projects.ts`. After the existing `projects` array (after line 259), append:

```typescript
import { ProjectGroup } from '@/types/project-group';

export const projectGroups: ProjectGroup[] = [
  {
    slug: 'alexandria',
    title: 'Alexandria',
    overview:
      'A personal library system that indexes, organizes, and surfaces on-disk media and documents.',
    ptOverview:
      'Um sistema de biblioteca pessoal que indexa, organiza e disponibiliza arquivos de mídia e documentos.',
    projectRepoNames: ['alexandria-api', 'alexandria-ui'],
  },
  {
    slug: 'maestro',
    title: 'Maestro',
    overview:
      'A desktop application and CLI for designing and running AI-agent workflows.',
    ptOverview:
      'Uma aplicação desktop e CLI para desenhar e executar fluxos de trabalho de agentes de IA.',
    projectRepoNames: ['maestro', 'maestro-cli'],
  },
  {
    slug: 'cli-tools',
    title: 'CLI Tools',
    ptTitle: 'Ferramentas CLI',
    overview:
      'A collection of cross-platform CLI toolkits for streamlining development workflows.',
    ptOverview:
      'Uma coleção de kits de ferramentas CLI multiplataforma para simplificar fluxos de trabalho.',
    projectRepoNames: ['cli-utils', 'dotnet-tools', 'python-dotnet-tools'],
  },
  {
    slug: 'ai-coding-skills',
    title: 'AI Coding Skills',
    overview:
      'A collection of reusable agent skills for AI coding assistants.',
    ptOverview:
      'Uma coleção de skills reutilizáveis para assistentes de programação com IA.',
    projectRepoNames: ['ai-coding-skills'],
  },
  {
    slug: 'heimdall-api',
    title: 'Heimdall API',
    overview:
      'A centralized identity management API built with ASP.NET Core (.NET 10).',
    ptOverview:
      'Uma API centralizada de gerenciamento de identidade construída com ASP.NET Core (.NET 10).',
    projectRepoNames: ['heimdall-api'],
  },
  {
    slug: 'ml-accounting-reconciliation',
    title: 'ML Accounting Reconciliation',
    ptTitle: 'Conciliação Contábil com ML',
    overview:
      'Automates financial reconciliation using supervised machine learning.',
    ptOverview:
      'Automatiza a conciliação financeira usando aprendizado de máquina supervisionado.',
    projectRepoNames: ['ml-accounting-reconciliation'],
  },
];

export function getGroupProjects(group: ProjectGroup): Project[] {
  return group.projectRepoNames
    .map((name) => projects.find((p) => p.repoName === name))
    .filter((p): p is Project => p !== undefined);
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/projects.ts
git commit -m "feat: add projectGroups data and getGroupProjects helper"
```

---

### Task 3: Create ProjectGroupCard component

**Files:**
- Create: `src/components/project-group-card.tsx`

**Interfaces:**
- Consumes: `ProjectGroup` from `@/types/project-group`, `getGroupProjects` from `@/lib/projects`, `useLanguage` from `@/components/lang-provider`
- Produces: `ProjectGroupCard` default export component receiving `{ group: ProjectGroup }` prop

- [ ] **Step 1: Create the component file**

```tsx
'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/lang-provider';
import { ArrowRight } from 'lucide-react';
import { ProjectGroup } from '@/types/project-group';
import { getGroupProjects } from '@/lib/projects';

export default function ProjectGroupCard({ group }: { group: ProjectGroup }) {
  const { lang } = useLanguage();

  const title = lang === 'pt' && group.ptTitle ? group.ptTitle : group.title;
  const overview =
    lang === 'pt' && group.ptOverview ? group.ptOverview : group.overview;

  const tagProjects = getGroupProjects(group);
  const tags = [...new Set(tagProjects.flatMap((p) => p.tech))];

  const repoCount = group.projectRepoNames.length;

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-primary sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {overview}
        </p>
        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-block rounded-full border border-border/60 bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground dark:bg-muted/40 dark:border-border/50"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {repoCount}{' '}
            {lang === 'pt'
              ? repoCount === 1
                ? 'repositório'
                : 'repositórios'
              : repoCount === 1
                ? 'repository'
                : 'repositories'}
          </span>
          <Button variant="outline" size="sm" asChild className="gap-1.5">
            <Link href={`/projects/${group.slug}`}>
              {lang === 'pt' ? 'Ver detalhes' : 'View details'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/project-group-card.tsx
git commit -m "feat: add ProjectGroupCard component"
```

---

### Task 4: Rewrite /projects hub page

**Files:**
- Modify: `src/app/projects/page.tsx`

**Interfaces:**
- Consumes: `projectGroups` from `@/lib/projects`, `ProjectGroupCard` from `@/components/project-group-card`

- [ ] **Step 1: Replace the page content**

Replace `src/app/projects/page.tsx` with:

```tsx
'use client';

import Link from 'next/link';
import HeadingText from '@/components/heading-text';
import { dotnetLibraries, projectGroups } from '@/lib/projects';
import ProjectGroupCard from '@/components/project-group-card';
import { useLanguage } from '@/components/lang-provider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
          {projectGroups.map((group) => (
            <ProjectGroupCard key={group.slug} group={group} />
          ))}
        </div>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary sm:text-2xl">
                {lang === 'pt' ? 'Bibliotecas .NET' : '.NET libraries'}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {lang === 'pt'
                  ? `Uma família de ${dotnetLibraries.length} bibliotecas open source para acelerar o desenvolvimento em .NET.`
                  : `A family of ${dotnetLibraries.length} open source libraries to speed up .NET development.`}
              </p>
            </div>
            <Button asChild className="gap-1.5 sm:shrink-0">
              <Link href="/projects/dotnet-libraries">
                {lang === 'pt' ? 'Ver bibliotecas' : 'View libraries'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles and lint passes**

Run: `npx tsc --noEmit`
Expected: PASS

Run: `npx eslint src/app/projects/page.tsx`
Expected: PASS (no errors)

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/page.tsx
git commit -m "feat: rewrite /projects as a hub page with group cards"
```

---

### Task 5: Create ProjectGroupPage component

**Files:**
- Create: `src/components/project-group-page.tsx`

**Interfaces:**
- Consumes: `ProjectGroup` from `@/types/project-group`, `Project` from `@/types/project`, `ProjectCard` from `@/components/project-card`, `useLanguage` from `@/components/lang-provider`, `ArrowLeft` from `lucide-react`
- Produces: `ProjectGroupPage` default export receiving `{ group: ProjectGroup, projects: Project[] }` prop

- [ ] **Step 1: Create the component file**

```tsx
'use client';

import Link from 'next/link';
import HeadingText from '@/components/heading-text';
import ProjectCard from '@/components/project-card';
import { useLanguage } from '@/components/lang-provider';
import { ArrowLeft } from 'lucide-react';
import { ProjectGroup } from '@/types/project-group';
import { Project } from '@/types/project';

interface ProjectGroupPageProps {
  group: ProjectGroup;
  projects: Project[];
}

export default function ProjectGroupPage({
  group,
  projects,
}: ProjectGroupPageProps) {
  const { lang } = useLanguage();

  const title = lang === 'pt' && group.ptTitle ? group.ptTitle : group.title;
  const overview =
    lang === 'pt' && group.ptOverview ? group.ptOverview : group.overview;

  return (
    <main className="container py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl space-y-10 sm:space-y-12 lg:space-y-16">
        <div className="space-y-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            {lang === 'pt' ? 'Voltar para projetos' : 'Back to projects'}
          </Link>
          <HeadingText subtext={overview}>{title}</HeadingText>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.repoName} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/project-group-page.tsx
git commit -m "feat: add ProjectGroupPage component"
```

---

### Task 6: Create /projects/[slug] dynamic route

**Files:**
- Create: `src/app/projects/[slug]/page.tsx`

**Interfaces:**
- Consumes: `projectGroups` and `getGroupProjects` from `@/lib/projects`, `ProjectGroupPage` from `@/components/project-group-page`, `notFound` from `next/navigation`
- Produces: Dynamic route with `generateStaticParams` and a server component page

- [ ] **Step 1: Create the directory and page file**

Create directory `src/app/projects/[slug]`, then create `src/app/projects/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation';
import { projectGroups, getGroupProjects } from '@/lib/projects';
import ProjectGroupPage from '@/components/project-group-page';

export function generateStaticParams() {
  return projectGroups.map((group) => ({
    slug: group.slug,
  }));
}

export default async function ProjectGroupRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const group = projectGroups.find((g) => g.slug === slug);

  if (!group) {
    notFound();
  }

  const projects = getGroupProjects(group);

  return <ProjectGroupPage group={group} projects={projects} />;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Verify build succeeds**

Run: `npx next build`
Expected: PASS — all 6 static pages generated for the slugs

- [ ] **Step 4: Commit**

```bash
git add src/app/projects/[slug]/page.tsx
git commit -m "feat: add /projects/[slug] dynamic route for group detail pages"
```

---

### Task 7: Verify end-to-end

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Verify hub page (`/projects`)**

Open `http://localhost:3000/projects`. Verify:
- 6 group cards are shown (Alexandria, Maestro, CLI Tools, AI Coding Skills, Heimdall API, ML Accounting Reconciliation)
- Each card shows title, overview excerpt, tech tags, repo count, and "View details" button
- .NET libraries card still appears at the bottom
- No individual project cards (like the old layout)

- [ ] **Step 3: Verify detail pages**

Navigate to each:
- `/projects/alexandria` — shows Alexandria overview + 2 ProjectCards (API, UI)
- `/projects/maestro` — shows Maestro overview + 2 ProjectCards (Maestro, Maestro CLI)
- `/projects/cli-tools` — shows CLI Tools overview + 3 ProjectCards
- `/projects/ai-coding-skills` — shows overview + 1 ProjectCard
- `/projects/heimdall-api` — shows overview + 1 ProjectCard
- `/projects/ml-accounting-reconciliation` — shows overview + 1 ProjectCard

For each: verify the "Back to projects" link works, GitHub links work, docs links work (if present).

- [ ] **Step 4: Verify .NET libraries page unchanged**

Open `http://localhost:3000/projects/dotnet-libraries`. Verify it still shows 12 library cards and works as before.

- [ ] **Step 5: Verify 404 for unknown slugs**

Open `http://localhost:3000/projects/nonexistent`. Verify it shows the Next.js 404 page.

- [ ] **Step 6: Verify bilingual support**

Append `?lang=pt` to each URL and verify Portuguese text renders correctly (titles, overviews, buttons, repo counts).
