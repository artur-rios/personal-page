# Design: Language Toggle Abbreviations & Tech Card Tag Overflow

**Date:** 2026-06-19

## Overview

Two independent UI improvements to the personal page:

1. Replace flag icons in the language selector with text abbreviations (`EN` / `PT`).
2. Make the `DetailTags` component smarter when a card has many feature tags — collapsing overflow behind a `+N more` toggle chip.

---

## 1. Language Toggle

**File:** `src/components/lang-toggle.tsx`

**Change:** Remove the `GiUsaFlag` and `GiBrazilFlag` imports from `react-icons/gi`. Replace each icon element with a `<span>` displaying the current language abbreviation.

- When `lang === 'en'` → `<span>EN</span>`
- When `lang === 'pt'` → `<span>PT</span>`

**Styling:** `text-sm font-bold tracking-wide` — fits within the existing `size="icon"` outline button without layout changes.

**No other changes** to the dropdown content or behaviour.

---

## 2. DetailTags — Expand Toggle

**File:** `src/components/tech-cards.tsx` — `DetailTags` component (lines 76–89)

### Behaviour

| Condition | Rendered output |
|---|---|
| `tags.length <= 3` | All tags, no toggle chip (unchanged) |
| `tags.length > 3`, collapsed (default) | First 3 tags + `+N more` chip |
| `tags.length > 3`, expanded | All tags + `show less` chip |

### State

- `const [expanded, setExpanded] = useState(false)` — local to `DetailTags`.
- `const VISIBLE_LIMIT = 3` — constant inside the component.

### Toggle chip

Reuses the existing pill class set (`rounded-md border border-border/80 bg-muted/70 px-2 py-0.5 text-xs font-medium`) with additions:

- `cursor-pointer`
- `hover:bg-muted`
- `text-primary` to distinguish it from static tags

Rendered as a `<button>` element (not a `<span>`) for accessibility, with `type="button"` and an `onClick` toggling `expanded`.

### Card height consistency

The existing `min-h-[2.75rem]` on the `<ul>` wrapper already keeps short-tag cards uniform. No additional height constraints needed.

### Scope

Applies to every `TechCard` that uses `DetailTags` — not AWS-specific. Any card whose `subtext` yields more than 3 pipe-separated values will benefit automatically.

---

## Files Changed

| File | Change |
|---|---|
| `src/components/lang-toggle.tsx` | Remove flag icons, add `EN`/`PT` text spans |
| `src/components/tech-cards.tsx` | Add expand-toggle logic to `DetailTags` |

## Out of Scope

- Changing the dropdown items or language-switching logic.
- Modifying the `subtext` data for any card.
- Any change to card layout, grid columns, or spacing.
