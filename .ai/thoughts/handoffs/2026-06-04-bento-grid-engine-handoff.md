# Handoff: Bento Grid Engine — Structural Foundation
**Date:** 2026-06-04
**Feature:** Projects section — static Bento Grid with data layer

---

## 1. Modified Files

| File | Action | Phase |
|---|---|---|
| `src/data/projects.ts` | Created | Phase 1 |
| `src/components/sections/Projects.tsx` | Created | Phase 2 |
| `src/app/page.tsx` | Modified | Phase 3 |

---

## 2. Base Code Files Important for the Reviewer

| File | Relevance |
|---|---|
| `src/hooks/useIntersectionObserver.ts` | Drives all scroll reveal logic. Threshold is 0.12. Note: observer re-fires on scroll-up (no "once" flag) — re-hides cards when scrolled back past. |
| `src/lib/utils.ts` | `getStaggerDelay(index)` caps at 150ms (step=50ms, max=4 tiers). Used for row-based delay assignment. |
| `src/app/globals.css` | Defines `.reveal` / `.is-visible` CSS classes consumed by both Projects and Experience sections. Also defines CSS variables inside `@theme` block. |
| `tailwind.config.ts` | Maps design tokens to Tailwind classes: `bg-surface`, `border-border`, `rounded-card`, `rounded-tag`, `text-text-primary`, `text-text-secondary`. |
| `src/data/projects.ts` | Single source of truth for all project copy, tech stacks, statuses, and media paths. |

---

## 3. UI Shortcuts & Implementation Notes

- **Row stagger logic:** Cards are assigned a row index via `Math.floor(cardIndex / 3)` (uniform 3-col grid). `getStaggerDelay(rowIndex)` converts that to 0ms / 50ms / 100ms delays. Rows beyond index 3 share 150ms (capped by `getStaggerDelay`).
- **Single observer on grid wrapper:** Rather than one `useIntersectionObserver` per card, a single observer is placed on the `<div>` grid container. `isVisible` is passed as a prop to all `ProjectCard` children. This fires all card reveals simultaneously (with row delays) instead of triggering individually as each card enters view.
- **Gradient overlay:** The dark gradient (`rgba(10,10,10,0.85) → transparent`) is applied via inline `style` because `from-background-base/85` cannot reliably resolve opacity from a CSS variable in Tailwind v3. The inline rgba values match `--color-background-base` exactly.
- **Media layer (static phase):** `Next.js Image` is rendered at `opacity-0` with placeholder paths (`/media/projects/*.jpg`). These paths will 404 until actual assets are placed in `/public/media/projects/`. No visual regression occurs because the layer is invisible.

---

## 4. Deviations from Design System / Functional Specification

| Item | Spec | Implementation | Reason |
|---|---|---|---|
| Border token on cards | `border-border-subtle` (plan) | `border-border` (`#27272A`) | `border-border-subtle` is not defined in `tailwind.config.ts`. Only `border-border` exists. |
| Tag background color | `#FFFFFF` at 15% opacity (`bg-white/[0.15]`) | `bg-zinc-800 text-zinc-200` | `bg-white/[0.15]` is invisible on the current white rendering (CSS variables in `@theme` block are not applied by the browser in Tailwind v3). Reviewer-approved fix. |
| Featured project col-span | `desktop:col-span-2` for PalmPay | Removed — all cards are 1 column | Reviewer instruction: all projects must be treated with equal visual hierarchy. |
| CSS variable rendering | `@theme` block sets design tokens | `@theme` is a Tailwind v4 directive; Tailwind v3 passes it through as an unrecognized at-rule, causing browsers to skip it entirely | Not fixed per user preference ("i like this white mode"). Tokens like `bg-surface`, `text-text-primary` resolve to browser defaults (white/black). |
| Scroll reveal re-trigger | Spec: "no re-triggering on scroll-up" | Hook re-hides on scroll-up | `useIntersectionObserver` uses `setIsVisible(entry.isIntersecting)` — toggles on every intersection change. Not modified per "No Unprompted Refactoring" directive. |

---

## 5. Ready-for-Reviewer Checklist

- [x] TypeScript compiles without errors (`tsc --noEmit`)
- [x] Next.js production build succeeds
- [x] 8 projects from `copy-content.md` present in data layer
- [x] Grid: 1-col mobile / 2-col tablet / 3-col desktop
- [x] Tags: `font-mono`, `rounded-md` (6px), `bg-zinc-800` pill style
- [x] Scroll reveal: row-based stagger (0 / 50 / 100ms)
- [x] Media layer present and hidden (`opacity-0`)
- [x] Hover: `translateY(-2px)` + `border-zinc-600` on card; `scale-105` + `opacity-1` on media
- [ ] Manual visual verification pending
