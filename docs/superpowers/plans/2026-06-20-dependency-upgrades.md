# Dependency Upgrades Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade all outdated npm packages (patch, minor, and major) while keeping the app visually and functionally identical.

**Architecture:** Six sequential tasks ordered by risk. Safe minor/patch updates run first. Each major upgrade runs alone so failures are isolated. Tailwind v4 is the largest task — it migrates config from `tailwind.config.ts` + `@tailwind` directives to a CSS-first `@theme inline` block and replaces the PostCSS plugin. Zod v4 and tailwind-merge v3 are last since they depend on packages upgraded earlier.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui, Zod, react-hook-form, ESLint flat config

## Global Constraints

- Working directory: `d:/Repositories/personal-page`
- `npm run build` must pass (zero TypeScript errors, zero build errors) after every task
- Visual appearance must remain identical — no colour, spacing, or layout regressions
- No new npm packages beyond what the upgrade requires
- Commit after every task with message format: `chore: upgrade <package(s)> to <version>`

---

### Task 1: Safe minor/patch package updates

**Files:**
- Modify: `package.json`

**Interfaces:**
- Consumes: nothing from prior tasks
- Produces: updated `node_modules` for all safe packages

- [ ] **Step 1: Install all safe patch/minor updates**

```bash
cd d:/Repositories/personal-page
npm install \
  react@latest react-dom@latest \
  react-hook-form@latest \
  react-icons@latest \
  next-themes@latest \
  @radix-ui/react-dropdown-menu@latest \
  @radix-ui/react-label@latest \
  @radix-ui/react-navigation-menu@latest \
  @radix-ui/react-slot@latest \
  @types/react@latest \
  @types/react-dom@latest \
  eslint-config-prettier@latest \
  eslint-plugin-prettier@latest
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: build completes, 3 static pages generated, zero TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: upgrade safe minor/patch packages to latest"
```

---

### Task 2: TypeScript 6 + @types/node 26

**Files:**
- Modify: `package.json`
- Possibly modify: any `.ts`/`.tsx` file that TypeScript 6 rejects

**Interfaces:**
- Consumes: nothing from prior tasks
- Produces: TypeScript 6 compiler available for all subsequent tasks

- [ ] **Step 1: Install TypeScript 6 and updated node types**

```bash
npm install --save-dev typescript@latest @types/node@latest
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build 2>&1
```

Expected: zero TypeScript errors. TypeScript 6 is largely backwards-compatible with strict codebases. If errors appear, fix them — common issues are:
- `moduleResolution: "bundler"` is still valid in TS6, no change needed to `tsconfig.json`
- Any `any` type errors: add explicit types
- Deprecated utility types: follow the error message

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: upgrade typescript to v6 and @types/node to v26"
```

---

### Task 3: ESLint 10 + eslint-config-next 16

**Files:**
- Modify: `package.json`
- Modify: `eslint.config.mjs` (if flat-config compatibility breaks)

**Interfaces:**
- Consumes: nothing from prior tasks
- Produces: ESLint 10 + Next.js 16 lint rules

Current `eslint.config.mjs`:
```js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

- [ ] **Step 1: Install ESLint 10 ecosystem**

```bash
npm install --save-dev \
  eslint@latest \
  eslint-config-next@latest \
  @eslint/eslintrc@latest
```

- [ ] **Step 2: Verify lint runs**

```bash
npx eslint src --ext .ts,.tsx 2>&1 | head -30
```

ESLint 10 keeps flat config as primary format. `FlatCompat` from `@eslint/eslintrc` continues to work. If you see "could not find config" or plugin-load errors, replace `eslint.config.mjs` with:

```js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

(Identical — this step confirms no change is needed, or surfaces the actual error to fix.)

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json eslint.config.mjs
git commit -m "chore: upgrade eslint to v10 and eslint-config-next to v16"
```

---

### Task 4: lucide-react v1

**Files:**
- Modify: `package.json`
- Possibly modify: `src/components/ui/dropdown-menu.tsx` and `src/components/ui/navigation-menu.tsx`

**Interfaces:**
- Consumes: nothing from prior tasks
- Produces: lucide-react v1 icons

Currently used icons (must verify these still exist in v1):
- `dropdown-menu.tsx`: `Check`, `ChevronRight`, `Circle`
- `navigation-menu.tsx`: `ChevronDown`

All four are core icons present in every lucide-react version. No import changes expected.

- [ ] **Step 1: Install lucide-react v1**

```bash
npm install lucide-react@latest
```

- [ ] **Step 2: Verify imports still resolve**

```bash
npm run build
```

Expected: build passes. If any icon was renamed, the build will error with "Module not found" or "does not provide an export named 'X'". Fix by using the new icon name from [lucide.dev](https://lucide.dev).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: upgrade lucide-react to v1"
```

---

### Task 5: Tailwind CSS v4 + tailwind-merge v3 migration

This is the largest task. Tailwind CSS v4 replaces the JS config file and `@tailwind` directives with a CSS-first approach. All theme values move into a `@theme inline` block in `globals.css`. The PostCSS plugin changes from `tailwindcss` to `@tailwindcss/postcss`.

**Files:**
- Modify: `package.json`
- Modify: `postcss.config.mjs` — swap PostCSS plugin
- Modify (rewrite): `src/app/globals.css` — migrate directives + theme
- Delete: `tailwind.config.ts` — all config moves into CSS
- Modify: `src/lib/utils.ts` — confirm tailwind-merge v3 API unchanged

**Interfaces:**
- Consumes: nothing from prior tasks
- Produces: Tailwind CSS v4 generating identical utility classes; `cn()` unchanged

- [ ] **Step 1: Install Tailwind CSS v4 ecosystem**

```bash
npm install tailwindcss@latest tailwind-merge@latest
npm install --save-dev @tailwindcss/postcss
```

Note: `tailwindcss-animate` stays at its current version — it works in v4 via `@plugin`.

- [ ] **Step 2: Update PostCSS config**

Replace the entire content of `postcss.config.mjs`:

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

- [ ] **Step 3: Rewrite globals.css**

Replace the entire content of `src/app/globals.css` with:

```css
@import "tailwindcss";
@plugin "tailwindcss-animate";

@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-chart-1: hsl(var(--chart-1));
  --color-chart-2: hsl(var(--chart-2));
  --color-chart-3: hsl(var(--chart-3));
  --color-chart-4: hsl(var(--chart-4));
  --color-chart-5: hsl(var(--chart-5));
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

.container {
  margin-right: auto;
  margin-left: auto;
  padding-right: 2rem;
  padding-left: 2rem;
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

Key changes vs the old file:
- `@tailwind base/components/utilities` → `@import "tailwindcss"`
- `tailwindcss-animate` plugin loaded via `@plugin "tailwindcss-animate"`
- `@custom-variant dark` replaces the JS `darkMode: ['class']` config
- `@theme inline { ... }` maps Tailwind utility names to the existing CSS variables
- `--radius-lg/md/sm` replaces the JS `borderRadius` theme extension
- The `:root` / `.dark` variable blocks and `@layer base` rules are unchanged

- [ ] **Step 4: Delete tailwind.config.ts**

All config is now in `globals.css`. The file is no longer needed.

```bash
rm d:/Repositories/personal-page/tailwind.config.ts
```

- [ ] **Step 5: Confirm tailwind-merge API is unchanged**

Open `src/lib/utils.ts` and verify it still reads:

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

No change needed — `twMerge` API is identical in v3.

- [ ] **Step 6: Verify build passes**

```bash
npm run build 2>&1
```

Expected: build completes with zero errors. If you see errors about unrecognised utilities (e.g. `bg-background` not found), check that `@theme inline` is correctly placed before `@layer base` in `globals.css`. If `tailwindcss-animate` causes issues, replace `@plugin "tailwindcss-animate"` with `@import "tailwindcss-animate"`.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json postcss.config.mjs src/app/globals.css
git rm tailwind.config.ts
git commit -m "chore: migrate to tailwind css v4 and tailwind-merge v3"
```

---

### Task 6: Zod v4 + @hookform/resolvers v5

**Files:**
- Modify: `package.json`
- Modify: `src/components/contact-form.tsx` — update error param syntax

**Interfaces:**
- Consumes: nothing from prior tasks
- Produces: zod v4 schema validation; `zodResolver` from resolvers v5

The contact form is the only file using zod. It uses `z.object`, `z.string().min()`, and `z.infer`. In zod v4, `.min(n, { message })` object-form still works via compat, but the canonical form is a plain string. This task migrates to the string form to be explicit.

- [ ] **Step 1: Install zod v4 and resolvers v5**

```bash
npm install zod@latest @hookform/resolvers@latest
```

- [ ] **Step 2: Update contact-form.tsx schema error messages**

The only change is `.min(1, { message: '...' })` → `.min(1, '...')`.

Replace the `formSchema` block in `src/components/contact-form.tsx` (lines 26–33):

```ts
const formSchema = z.object({
  subject: z.string().min(1, lang === 'pt' ? 'Digite o assunto' : 'Subject is required'),
  msg: z.string().min(1, lang === 'pt' ? 'Digite a mensagem' : 'Message is required'),
});
```

Everything else (`z.infer`, `zodResolver`, `useForm`) is unchanged.

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/components/contact-form.tsx
git commit -m "chore: upgrade zod to v4 and @hookform/resolvers to v5"
```

---

## Visual Verification Checklist (after all tasks)

Start the dev server and spot-check:

```bash
npm run dev
```

- [ ] Home page loads with correct colours in light mode
- [ ] Dark mode toggle switches colours correctly (`.dark` class applied)
- [ ] Language toggle (EN/PT) works and switches content
- [ ] Tech cards render with icons and expand/collapse tag overflow
- [ ] Contact page form validates (submit with empty fields shows errors)
- [ ] Contact form submits (opens mailto link)
- [ ] Navigation links work
