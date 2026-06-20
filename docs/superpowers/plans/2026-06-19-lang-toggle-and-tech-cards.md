# Lang Toggle & Tech Cards UI Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace flag icons in the language toggle with EN/PT text, and add a collapse/expand overflow toggle to `DetailTags` for cards with more than 3 feature tags.

**Architecture:** Two independent, self-contained edits to existing components. No new files, no new dependencies. Task 1 touches only `lang-toggle.tsx`; Task 2 touches only `tech-cards.tsx`.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui (Radix primitives)

## Global Constraints

- No new npm packages
- Follow existing Tailwind class patterns in each file
- TypeScript must compile without errors (`next build`)
- Lint must pass (`next lint`)

---

### Task 1: Language Toggle — Replace Flag Icons with Text Abbreviations

**Files:**
- Modify: `src/components/lang-toggle.tsx`

**Interfaces:**
- Consumes: `useLanguage()` hook returning `{ lang, setLang }` — unchanged
- Produces: same `LangToggle` export, same API — only visual output changes

- [ ] **Step 1: Remove flag icon imports and replace with text span**

Replace the entire file content with:

```tsx
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/lang-provider';

export function LangToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="text-sm font-bold tracking-wide">
            {lang === 'en' ? 'EN' : 'PT'}
          </span>
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLang?.('en')}>
          {lang === 'pt' ? 'Inglês' : 'English'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang?.('pt')}>
          {lang === 'pt' ? 'Português' : 'Portuguese'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd d:/Repositories/personal-page && npm run build
```

Expected: build completes with no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/lang-toggle.tsx
git commit -m "feat: replace flag icons with EN/PT text abbreviations in lang toggle"
```

---

### Task 2: DetailTags — Expand Toggle for Overflow Tags

**Files:**
- Modify: `src/components/tech-cards.tsx` — `DetailTags` component and `useState` import

**Interfaces:**
- Consumes: `subtext: string` prop (pipe-separated values) — unchanged
- Produces: same `DetailTags` function, same prop API — renders a toggle chip when `tags.length > 3`

- [ ] **Step 1: Add `useState` to the React import**

In `src/components/tech-cards.tsx`, change line 5:

```tsx
// Before
import React from 'react';

// After
import React, { useState } from 'react';
```

- [ ] **Step 2: Replace the `DetailTags` function**

Replace the existing `DetailTags` function (lines 76–89) with:

```tsx
function DetailTags({ subtext }: { subtext: string }) {
  const tags = subtext.split(/\s*\|\s*/).filter(Boolean);
  const VISIBLE_LIMIT = 3;
  const [expanded, setExpanded] = useState(false);

  const hasOverflow = tags.length > VISIBLE_LIMIT;
  const visibleTags = hasOverflow && !expanded ? tags.slice(0, VISIBLE_LIMIT) : tags;
  const hiddenCount = tags.length - VISIBLE_LIMIT;

  return (
    <ul className="flex min-h-[2.75rem] flex-wrap items-center justify-center gap-1.5">
      {visibleTags.map((tag) => (
        <li key={tag}>
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
            {expanded ? 'show less' : `+${hiddenCount} more`}
          </button>
        </li>
      )}
    </ul>
  );
}
```

- [ ] **Step 3: Verify build passes**

```bash
cd d:/Repositories/personal-page && npm run build
```

Expected: build completes with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/tech-cards.tsx
git commit -m "feat: add expand toggle to DetailTags for cards with many feature tags"
```

---

## Visual Verification Checklist (after both tasks)

Run `npm run dev` and check:

- [ ] Language toggle button shows `EN` by default; switches to `PT` after selecting Portuguese
- [ ] AWS card shows 3 tags + `+4 more` chip collapsed by default
- [ ] Clicking `+4 more` expands to show all 7 tags + `show less` chip
- [ ] Clicking `show less` collapses back
- [ ] Azure and Digital Ocean cards (2 tags each) show no toggle chip
- [ ] All cards remain visually consistent in the grid
