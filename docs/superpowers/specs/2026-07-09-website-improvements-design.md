# Website Improvements — Design Spec

**Date**: 2026-07-09  
**Status**: Approved

## Overview

Four independent improvements to the personal page website.

---

## 1. External NavLinks Open in New Tab

**Scope**: `src/components/navbar.tsx`

- Detect external links by checking if `href` starts with `http`.
- For external links, add `target="_blank"` and `rel="noopener noreferrer"` attributes.
- Internal links (`/contact`) remain unchanged.

**Implementation**: In the `<Link>` rendering inside the `navLinks.map()`, conditionally spread `{ target: '_blank', rel: 'noopener noreferrer' }` when `link.href?.startsWith('http')`.

---

## 2. Update Packages to Latest Stable

**Scope**: `package.json`, `package-lock.json`

- Run `npm update` to bump all dependencies to their latest semver-compatible versions.
- Run `npm run build` to verify no breakage.
- If any packages require major version bumps with breaking changes, evaluate individually.

---

## 3. Improved Tech & Cloud Visualizations

**Scope**: `src/components/tech-cards.tsx`

- **Responsive grid**: Improve column distribution across breakpoints:
  - Tech: 2 cols (sm), 3 cols (md), 5 cols (lg)
  - Cloud: 1 col (sm), 2 cols (md), 3 cols (lg)
- **Hover effects**: Subtle card lift (`scale` + `shadow`) on hover, smooth transitions.
- **Larger icons**: Increase icon size within cards for better visual presence.
- **Tag display**: Enhance `DetailTags` with pill/badge styling per tag.
- **Section spacing**: More vertical space between tech and cloud sections.
- **Container**: Ensure consistent max-width via existing patterns (`lg:max-w-7xl`).

---

## 4. Projects Page

**New files**:

### `src/lib/projects.ts`
Static data file exporting `projects: Project[]`:
```ts
type Project = {
  title: string;
  ptTitle?: string;
  description: string;
  ptDescription?: string;
  websiteUrl?: string;
  githubUrl: string;         // e.g. "https://github.com/owner/repo"
  repoOwner: string;
  repoName: string;
  tech: string[];
};
```
Placeholder entries (3 projects) with `TODO` descriptions.

### `src/app/projects/page.tsx`
- Uses `HeadingText` for bilingual header/subheader.
- Responsive grid: 1 col (sm), 2 cols (md), 3 cols (lg).
- Each card rendered by `ProjectCard`.

### `src/components/project-card.tsx`
- **Thumbnail**: GitHub opengraph preview image via `https://opengraph.githubassets.com/1/{owner}/{repo}` using `next/image` with proper `unoptimized` or allowed remote pattern.
- **Title**: Project name.
- **Description**: Short text.
- **Tech tags**: Pill-styled labels.
- **Links**: "Website" (external link icon) and "GitHub" (external link icon), both `target="_blank"`.
- **Dark/light**: Uses existing card background/foreground CSS variables, thumbnail adapts via brightness/invert classes.
- **Responsive**: Full-width on mobile, consistent card sizing.

### Navbar integration
- Add `{ title: 'Projects', ptTitle: 'Projetos', href: '/projects' }` to `navLinks` in `src/lib/config.ts`.

---

## Non-Goals

- No CMS/database integration (projects are static data).
- No filtering or search on projects page.
- No changes to contact form, hero, footer, or language system.
- No routing changes beyond adding `/projects`.

---

## Verification

- `npm run build` succeeds with no errors.
- `npm run lint` passes.
- Dark/light mode works on all affected pages.
- Responsive layout verified at 375px, 768px, 1024px, 1440px widths.
- External links open in new tab; internal links do not.
