---
date: 2026-06-05
topic: "Advanced Motion Layer — Global Scroll Reveals, Quantitative Counter, Magnetic Tags & Precision Cursor Glow"
status: complete
tags: [research, portfolio, frontend, motion, intersection-observer, raf]
---

# Research: Advanced Motion Layer — Global Scroll Reveals, Quantitative Counter, Magnetic Tags & Precision Cursor Glow

## 1. Design & External Context Summary

### Strategy Docs Evaluated

- **`0_feature_context.md`**: Four distinct motion effects to implement as one coordinated milestone: (1) global scroll reveal system wired to `.reveal`/`.is-visible` CSS classes, (2) quantitative counter in the About section, (3) magnetic tag repulsion on About section tags, (4) precision cursor glow scoped to the Bento Grid. Performance contract is non-negotiable: 60fps, zero CLS, full `prefers-reduced-motion` and `hover: none` suppression. No external animation libraries beyond Framer Motion (already installed). All effects must clean up in `useEffect` returns.

- **`design-system.md`**: Defines the visual contract — dark monochromatic palette (Background: `#0A0A0A`, Surface: `#121212`, Borders: `#27272A`). Motion must be "brief, snappy, ease-out, no bouncy/spring." Strictly no neon or exaggerated effects.

- **`functional-specification.md` §2**: Governs scroll reveal. `.reveal` and `.is-visible` CSS classes must already exist in `globals.css` (confirmed present). Observer `threshold: 0.12`. Stagger chain: eyebrow `0ms`, heading `50ms`, body `100ms`, CTA/tags `150ms`, max 4 tiers. Rows in the Bento Grid stagger as units. Hero section explicitly excluded from scroll reveals — it uses a separate on-load fade.

- **`functional-specification.md` §6, Innovation §1 — Cursor Glow**: Single `pointer-events: none`, `position: fixed` `div` with `--x`/`--y` CSS vars updated via throttled `mousemove`. `radial-gradient(200px circle at var(--x) var(--y), ...)`. Scoped visually to the Bento Grid section. **Light Mode adaptation required**: gradient color must be a soft shadow tint (`rgba(0,0,0,0.04)`–`rgba(0,0,0,0.06)`) not the dark-mode spec's `rgba(255,255,255,0.04)`. Disabled on `hover: none` and `prefers-reduced-motion`.

- **`functional-specification.md` §6, Innovation §2 — Counter**: `requestAnimationFrame` loop over `1200ms`, cubic ease-out: `easedProgress = 1 - Math.pow(1 - progress, 3)`, `currentValue = Math.round(start + (end - start) * easedProgress)`. Triggers via `IntersectionObserver`, disconnects after firing.

- **`functional-specification.md` §6, Innovation §3 — Magnetic Tags**: `mousemove` computes distance between cursor and each tag's center via `getBoundingClientRect()`. Within `60px`: shift tag via `transform: translate()` away from cursor, capped at `6px`. On `mouseleave`/exit range: CSS transition with elastic snap-back (slight `cubic-bezier` overshoot, max `1px`). Disabled on `hover: none` and `prefers-reduced-motion`.

- **`copy-content.md` §5 (About Me)**: Defines the content the About section must render: Executive Summary, Core Technologies tags (`Python`, `C`, `C++`, `JavaScript`, `Java`, `React`, `TypeScript`, `Flask`, `OpenCV`, `YOLO`, `ESP32`, `MQTT`, `Git`, `Linux`, `SQL`, `Assembly`, `TensorFlow`), Soft Skills tags, Diferencial block (target of `#diferencial` anchor from Hero CTA), Beyond Code narrative.

### External Docs Synthesized

- **MDN IntersectionObserver**: `threshold: 0.12` fires callback when 12% of the element is visible. Pattern: check `entry.isIntersecting === true` before applying `.is-visible`. Call `observer.unobserve(entry.target)` immediately inside the callback after the class is applied — prevents re-triggering and reduces memory overhead. `observer.disconnect()` when all observed elements have been handled.

- **MDN requestAnimationFrame**: rAF gate pattern uses a boolean `rafPending` flag — set to `true` when a frame is scheduled, reset inside the callback before processing. This ensures `mousemove` never queues more than one frame. Store the returned request ID to call `cancelAnimationFrame(id)` in cleanup. Ease-out formula: `progress = elapsed / duration`, `easedProgress = 1 - Math.pow(1 - progress, 3)`, `currentValue = Math.round(finalValue * easedProgress)`. Use the callback's `timestamp` argument, not `performance.now()`.

- **MDN CSS Custom Properties**: `element.style.setProperty('--x', value)` updates a CSS var on an element's inline style — changes propagate to all CSS rules consuming that variable immediately, with zero React re-renders. Pattern: define `--x: 0px; --y: 0px` on the glow `div` in CSS, then update from the `mousemove` rAF callback via `glowRef.current.style.setProperty('--x', e.clientX + 'px')`.

- **MDN getBoundingClientRect**: Returns `DOMRect` with `left`, `top`, `width`, `height` relative to the viewport. Tag center: `centerX = rect.left + rect.width / 2`, `centerY = rect.top + rect.height / 2`. Repulsion vector (pushing tag away): `dx = mouseX - centerX`, `dy = mouseY - centerY`. Translation to apply to tag: `tx = -(dx / distance) * strength`, `ty = -(dy / distance) * strength`, clamped to `±6px`. **Layout thrash prevention**: collect all `getBoundingClientRect()` calls in one pass (read phase), then apply all `style.transform` writes in a second pass — both within the same rAF callback.

- **web.dev CLS**: Only `transform` and `opacity` are GPU-composited and CLS-free. All effects in this milestone (`translateY` for reveals, `translate()` for magnetic tags, `opacity` for glow) are already compliant. Never use `top`, `left`, `margin`, or `padding` for animation.

- **web.dev rendering-performance**: 10ms frame budget for 60fps. Read all layout properties (`getBoundingClientRect`) before writing any `style.*` values — interleaving reads and writes inside a loop forces the browser to recalculate layout on each write.

---

## 2. Current State Analysis (By Domain)

### Core UI Components

#### `src/components/sections/Projects.tsx`
- **Location**: `src/components/sections/Projects.tsx`
- **Description**: Renders the Bento Grid of 8 project cards. Currently renders all cards identically with `grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4 tablet:gap-5 desktop:gap-6`. The `featured` flag on PalmPay is declared in data but not consumed in the layout (no `col-span-2` applied).
- **Scroll Reveal State**: `useIntersectionObserver` is imported at line 5 and `getStaggerDelay` is imported at line 6. **Neither is called or used anywhere in the component.** The ProjectCard wrapping `<div>` at line 161 has no `.reveal` class. No stagger delay is applied to any card or row. The scroll reveal system for the grid is entirely unwired.
- **Key Intersection**: The cursor glow `div` must be scoped to this section. The glow will need a `ref` on the `<section id="projects">` element to detect mouse enter/leave and constrain the glow visually.

#### `src/components/sections/Experience.tsx`
- **Location**: `src/components/sections/Experience.tsx`
- **Description**: Renders 4 experience entries. `useIntersectionObserver` is imported at line 3 and `getStaggerDelay` at line 4. **Neither is called or used anywhere in the component.** No `.reveal` class is applied to any rendered element.
- **Scroll Reveal State**: Each `ExperienceItem` (the `<div>` at line 83) should be observed and receive `.reveal`/`.is-visible` with a stagger delay per the spec. Currently renders at full opacity immediately.
- **Stagger Target**: Per `functional-specification.md §2`, each Experience block reveals sequentially with `50ms` between entries.

#### `src/components/sections/Contact.tsx`
- **Location**: `src/components/sections/Contact.tsx`
- **Description**: Renders the contact section. `useIntersectionObserver` is imported at line 3 but **never called**. No `.reveal` class applied. The section renders at full opacity immediately. Also imports `lucide-react` icons which are present and functional.

#### `src/components/sections/Hero.tsx`
- **Location**: `src/components/sections/Hero.tsx`
- **Description**: Uses `opacity-0`/`opacity-100` with `transition-opacity` for the on-load fade. **Issue detected**: uses `duration-600` class which is not a standard Tailwind v3 utility (v3 has `duration-500` and `duration-700`, no `duration-600`). Compiled CSS confirms `duration-600` produces no output — the transition uses Tailwind's default `150ms` instead of the specified `600ms`. Spec requires `600ms ease-out`.
- **Scroll Reveal**: Hero is explicitly excluded from scroll reveals per `functional-specification.md §2`. Correct.

### About Section (Target for Counter + Magnetic Tags)

#### `src/app/page.tsx` — About Stub
- **Location**: `src/app/page.tsx`, line 12–14
- **Description**: The About section is a placeholder stub:
  ```tsx
  <section id="about" className="min-h-[100vh] flex items-center justify-center p-8">
    <h2 className="text-4xl font-bold text-text-primary">About</h2>
  </section>
  ```
- **Critical Gap**: There is **no `About.tsx` component file** in `src/components/sections/`. The quantitative counter and magnetic tag repulsion effects both require a fully-built About section with real content (Executive Summary, Core Technologies tags, Soft Skills tags, Diferencial block, Beyond Code). This milestone cannot implement those two effects without the About component existing first.
- **`#diferencial` anchor**: Also missing. The Hero CTA "How can I help" targets `#diferencial` which doesn't exist in the DOM.

### Micro-interactions & Motion

#### `src/hooks/useIntersectionObserver.ts`
- **Location**: `src/hooks/useIntersectionObserver.ts`
- **Description**: Hook returns `{ ref, isVisible }`. Uses `threshold: 0.12` ✅. **Critical issue**: the hook never calls `observer.unobserve(element)` after the element becomes visible — the observer remains active indefinitely. Per spec and MDN docs, each element must be unobserved immediately after `.is-visible` is applied. The hook also has a stale-closure risk: `options` is in the `useEffect` dependency array, meaning if called with an inline object `{}`, it re-creates the observer on every render.
- **Current Usage**: Imported in `Projects.tsx`, `Experience.tsx`, and `Contact.tsx` but **not called in any of them**.

#### `src/lib/utils.ts`
- **Location**: `src/lib/utils.ts`
- **Description**: Exports `getStaggerDelay(index: number): number` — returns `Math.min(index * 50, 150)`. This matches the spec's stagger tiers exactly: index 0 → `0ms`, index 1 → `50ms`, index 2 → `100ms`, index 3+ → `150ms`. ✅ Ready to use; currently unused.

#### `src/app/globals.css`
- **Location**: `src/app/globals.css`
- **Description**: `.reveal` and `.is-visible` classes are present and correctly defined ✅:
  ```css
  .reveal { opacity: 0; transform: translateY(14px); transition: opacity 500ms ease-out, transform 500ms ease-out; }
  .reveal.is-visible { opacity: 1; transform: translateY(0); }
  ```
- **Missing**: No `@media (prefers-reduced-motion: reduce) { .reveal { ... } }` safety-net rule exists. The spec and feature context both require this as a CSS-level fallback.

### Styling & Theming — `@theme {}` Anomaly

#### `src/app/globals.css` — CSS Variable Scope Issue
- **Description**: All design token CSS custom properties are declared inside an `@theme {}` block:
  ```css
  @theme {
    --color-background-base: #0A0A0A;
    --color-surface: #121212;
    ...
  }
  ```
- **Issue**: The project uses Tailwind CSS v3.4.1. The compiled CSS output (`.next/static/css/`) confirms `@theme {}` is output **as-is** — it is not transformed into a `:root {}` block by the PostCSS pipeline. `@theme` is not a standard browser CSS at-rule; custom properties declared inside it may not be registered on the cascade root. This explains the "Light Mode" description in `0_feature_context.md` — the dark background and text color tokens (`--color-background-base: #0A0A0A`, etc.) referenced via `var()` in `:root`, `body`, and all Tailwind utilities may be resolving to empty/initial values, causing the page to render with a white background and browser-default text.
- **Impact on this milestone**: The cursor glow Light Mode adaptation (`rgba(0,0,0,0.04)–0.06`) is specified specifically because the page appears light — this is consistent with the `@theme {}` bug causing dark tokens to fail. The Planner should address this separately or note it as a prerequisite.

### Asset Management

- All media assets referenced in `projects.ts` are present in `public/` ✅. No broken asset paths.

---

## 3. Architecture & Rendering Impact

### Server vs. Client Components
All motion effects require browser APIs (`IntersectionObserver`, `requestAnimationFrame`, `window.matchMedia`, DOM event listeners). All target components are already `"use client"` ✅. The cursor glow `div` will need to be a client component or rendered inside the existing `Projects.tsx` client component — it must not be added to the server-rendered layout.

### IntersectionObserver Pattern for Scroll Reveals
The current `useIntersectionObserver` hook is designed around a single element and a binary `isVisible` state. For the Projects grid row-stagger and Experience sequential reveal, the implementation likely needs to work differently:
- **Option A**: Use the existing hook per-element (one hook call per card/item), passing the stagger delay as an inline `transition-delay` style. This keeps each element self-contained.
- **Option B**: Create a new hook or utility that observes an array of elements and applies stagger delays declaratively. More complex but matches the spec's "rows stagger as units" requirement for the Bento Grid.

The Planner will need to choose between these approaches. Key constraint: per the spec and MDN guidance, each element's observer must call `unobserve()` immediately after the element becomes visible — the current hook does not do this.

### Cursor Glow Scope Constraint
The glow must be visually scoped to the Projects section. Two implementation strategies:
- **CSS `clip-path` or `overflow: hidden`** on the Projects section container to clip the glow div. Problem: a `position: fixed` element is not clipped by `overflow: hidden` on a non-positioned ancestor.
- **JavaScript bounds check**: Detect when the cursor is inside the Projects section's `getBoundingClientRect()` on `mousemove` and conditionally show/hide the glow div. Simpler and more reliable.

### About Component Dependency
The quantitative counter and magnetic tag effects depend on an About section component that does not yet exist. The Planner must decide: (a) build the About component as part of this milestone, (b) scope this milestone to only scroll reveals + cursor glow and defer counter/tags, or (c) require the About component as a prerequisite milestone.

### CSS Custom Property Update Pattern (Cursor Glow)
Per MDN: `element.style.setProperty('--x', clientX + 'px')` updates the glow position without React re-renders. The glow `div` ref must be accessed directly in the `mousemove` rAF callback. This is a direct DOM mutation pattern — correct and intentional for performance.

---

## 4. Open Questions & Ambiguities

1. **About component prerequisite**: The quantitative counter and magnetic tag repulsion both require a fully-built About section (`src/components/sections/About.tsx`) with real copy from `copy-content.md §5`. Does the About component need to be built within this milestone, or is it a prerequisite? If the latter, what quantitative values should the counter animate toward (the spec references "key quantitative facts" but `copy-content.md §5` contains narrative text, not numerical stats)?

2. **`@theme {}` CSS variable scope**: Should fixing the `@theme → :root` conversion be treated as a prerequisite for this milestone, or is the current "Light Mode" state intentional? The cursor glow color spec is Light Mode-specific, suggesting the author may intend the current state to remain light. The Planner should clarify.

3. **`useIntersectionObserver` hook rewrite vs. replace**: The existing hook does not call `unobserve()` after firing. Should the hook be updated to support the one-shot reveal pattern, or should a new dedicated `useScrollReveal` hook be created alongside the existing general-purpose hook?

4. **Hero `duration-600` fix scope**: `Hero.tsx` uses a non-existent Tailwind `duration-600` class, causing the fade-in to use `150ms` instead of `600ms`. This is a pre-existing bug. Should fixing it be in scope for this milestone (it touches Hero but is motion-related)?

5. **Bento Grid row stagger**: The spec says "Cards in the same visual row share the same `transition-delay` tier. Do not stagger individual cards within a row — stagger rows." With a 3-col grid, row index = `Math.floor(cardIndex / 3)`. Cards 0–2 get `0ms`, cards 3–5 get `50ms`, cards 6–7 get `100ms`. But `getStaggerDelay` uses a `50ms` step and `150ms` cap. Is the row-based stagger also capped at `150ms` per the same `getStaggerDelay` function, or does it have a different delay chain?

6. **Counter target values**: The feature context references the About section counter animating to "key quantitative facts" (e.g., number of projects, years of research). With 8 projects in `projects.ts` and timeline `2024–2026` from `copy-content.md`, the suggested values are deterministic. But `copy-content.md §5` doesn't explicitly state numeric stats. The Planner should specify the exact numbers and labels for the counter before the Developer phase.

7. **Magnetic tag target**: The spec says "technology tags in the About section." But `copy-content.md §5` lists both Core Technologies and Soft Skills as tags. Should both sets be magnetic, or only Core Technologies?

---

## Final Instruction

Research document created at: `.ai/thoughts/research/2026-06-05-advanced-motion-layer.md`

Please verify if this research correctly captures the design constraints and current state before proceeding to the Planner phase.
