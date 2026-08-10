# Project Group Pages — Design

## Overview

Replace the current flat `/projects` grid of external-link-only project cards with a hub-and-detail architecture. The `/projects` page becomes a hub linking to group/individual pages. Each detail page shows an overview and a list of related repositories.

.NET libraries sub-page (`/projects/dotnet-libraries`) remains unchanged.

## Route Structure

| Route | Purpose |
|---|---|
| `/projects` | Hub: grid of group cards linking to detail pages |
| `/projects/alexandria` | Alexandria API + Alexandria UI |
| `/projects/maestro` | Maestro + Maestro CLI |
| `/projects/cli-tools` | CLI Utils + Dotnet Tools + Python Dotnet Tools |
| `/projects/ai-coding-skills` | AI Coding Skills |
| `/projects/heimdall-api` | Heimdall API |
| `/projects/ml-accounting-reconciliation` | ML Accounting Reconciliation |
| `/projects/dotnet-libraries` | Unchanged — existing grid of .NET library cards |

All 6 new routes share one `[slug]` dynamic route that uses `generateStaticParams`.

## Data Layer (`src/lib/projects.ts`)

Add a `ProjectGroup` type and a `projectGroups` array. Projects that belong to a group link via `projectRepoNames` matching the existing `projects` array. Standalone projects are groups of 1.

```typescript
type ProjectGroup = {
  slug: string;
  title: string;
  ptTitle?: string;
  overview: string;
  ptOverview?: string;
  projectRepoNames: string[];
};
```

Groups:
- `alexandria` — "Alexandria" — 2 repos: `alexandria-api`, `alexandria-ui`
- `maestro` — "Maestro" — 2 repos: `maestro`, `maestro-cli`
- `cli-tools` — "CLI Tools" — 3 repos: `cli-utils`, `dotnet-tools`, `python-dotnet-tools`
- `ai-coding-skills` — "AI Coding Skills" — 1 repo: `ai-coding-skills`
- `heimdall-api` — "Heimdall API" — 1 repo: `heimdall-api`
- `ml-accounting-reconciliation` — "ML Accounting Reconciliation" / "Conciliação Contábil com ML" — 1 repo: `ml-accounting-reconciliation`

## Components

### `ProjectGroupCard` (new)

Used on the hub page. Simpler than `ProjectCard`:
- Group title (bilingual)
- Overview excerpt (first sentence or first ~120 chars)
- Tech tags aggregated from member repos (deduplicated)
- "View details" / "Ver detalhes" button linking to `/projects/[slug]`

### `ProjectGroupPage` (new)

Used by the `[slug]` route. Receives a `ProjectGroup` and the resolved `Project[]` array.
- "Back to projects" / "Voltar para projetos" link at top
- Heading: group title (bilingual)
- Overview paragraph (bilingual)
- Grid of `ProjectCard` components for each repo in the group

### Modified files

| File | Change |
|---|---|
| `src/lib/projects.ts` | Add `ProjectGroup` type, `projectGroups` array, helper to resolve a group's projects |
| `src/app/projects/page.tsx` | Replace grid of `ProjectCard` with grid of `ProjectGroupCard`, remove dotnet-libraries featured card |
| `src/app/projects/[slug]/page.tsx` | New dynamic route using `generateStaticParams` and `ProjectGroupPage` |
| `src/components/project-group-card.tsx` | New component |
| `src/components/project-group-page.tsx` | New component |
| `src/components/project-card.tsx` | No changes |

## Data Flow

```
projectGroups (static array)
  │
  ├─→ /projects page: maps to ProjectGroupCard[]
  │
  └─→ /projects/[slug] page:
        generateStaticParams produces all 6 slugs
        page looks up group by slug
        resolves projectRepoNames → Project[]
        passes to ProjectGroupPage
```

## Bilingual Support

All group titles, overviews, and button labels use the existing `useLanguage()` pattern: check `lang === 'pt'` for Portuguese, default to English.

## Edge Cases

- **Unknown slug**: `[slug]/page.tsx` calls `notFound()` if the slug doesn't match any group
- **Missing repos**: if a `projectRepoName` doesn't match any entry in `projects`, filter it out silently
- **Long overviews**: `ProjectGroupCard` truncates overview to ~120 characters with an ellipsis

## What Does Not Change

- `ProjectCard` component stays as-is
- `/projects/dotnet-libraries` page and its data source stay as-is
- Navbar, footer, theme, language system — all unchanged
- No new dependencies
