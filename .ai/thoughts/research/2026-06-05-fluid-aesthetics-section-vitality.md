---
date: 2026-06-05
topic: "Fluid Aesthetics & Section Vitality"
status: complete
tags: [research, portfolio, frontend]
---

# Research: Fluid Aesthetics & Section Vitality

## 1. Design & External Context Summary

- **Strategy Docs Evaluated:** The workspace contains `01_strategy/copy-content.md` and `01_strategy/portfolio-master-plan.md`. The expected `design-system.md` and `functional-specification.md` files are not present in the repository, so the primary available design guidance comes from the feature prompt itself and the copy/content strategy document.
- **External Docs Synthesized:** The referenced URLs provide the following guidance:
  - `https://www.marckuiper.com/?ref=minimal.gallery`: ambient backgrounds should be very slow, heavily blurred, soft off-white tones, low opacity, and never visually compete with foreground text. The motion should feel like breathing, not jerky or fast.
  - `https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes`: CSS keyframes must define intermediate percentage or `from`/`to` states, and `animation-direction: alternate` can be used to avoid manual reversal.
  - `https://developer.mozilla.org/en-US/docs/Web/CSS/will-change`: `will-change: transform` is the appropriate optimization hint for animated, blurred blobs, but should be used sparingly to avoid GPU memory overhead.
  - `https://developer.mozilla.org/en-US/docs/Web/CSS/filter`: `filter: blur(80px)` is a paint operation; animate only `transform` and keep the blur value static.
  - `https://tailwindcss.com/docs/adding-custom-styles`: Tailwind supports theme extension and custom CSS, making it appropriate to add the new light-mode palette tokens under `theme.extend.colors`.
  - `https://developer.mozilla.org/en-US/docs/Web/CSS/color`: `color` is transitionable and color-only transitions do not cause layout shifts.
  - `https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion`: reduced-motion CSS rules should disable blob animation and restore text color transitions to static final state when the user prefers reduced motion.

## 2. Current State Analysis (By Domain)

### Core UI Components

- **Hero**: `03_source_code/src/components/sections/Hero.tsx`
  - Renders the headline, name, subtitle, and CTA links.
  - Contains a `useEffect` to fade in content after DOM load.
  - CTA buttons currently use different Tailwind utility sets, suggesting inconsistent padding/border semantics.
  - No ambient blob background or section-level background token is present.

- **Projects**: `03_source_code/src/components/sections/Projects.tsx`
  - Renders a Bento-style project grid and a client-only modal with `next/dynamic`.
  - The hover cursor glow is implemented with a fixed `div` using CSS variables `--glow-x` and `--glow-y` and a radial gradient.
  - Current gradient color is `rgba(0,0,0,0.03)`; the prompt requires `rgba(0,0,0,0.035)` for light mode.
  - The glow `div` is currently `position: fixed` and inset to the full viewport, which is not scoped to the section content.
  - Project tech tags use `bg-indigo-50 text-indigo-700`, which violates the milestone hotfix requirement.

- **Experience**: `03_source_code/src/components/sections/Experience.tsx`
  - Uses `useIntersectionObserver` to reveal timeline cards with a staggered transition.
  - The section itself is structurally simple and currently does not implement new palette backgrounds or reveal mechanics beyond the existing `.reveal` animation.

- **About**: `03_source_code/src/components/sections/About.tsx`
  - Contains summary paragraphs, counters, core technology and soft skill tag cards, and the `diferencial` text block.
  - The `Diferencial` and `Beyond Code` content is currently plain paragraph text with no line-by-line reveal behavior.
  - Tag cards in the core technologies and soft skills grid already use neutral zinc styling, but the scroll reveal requirement is not implemented.

- **Tailwind**: `03_source_code/tailwind.config.ts`
  - Extends colors for semantic tokens, but does not yet include the requested light palette tokens `pearl`, `alabaster`, `soft-slate`, or `zinc-mist`.

- **Global CSS**: `03_source_code/src/app/globals.css`
  - Defines base colors and `.reveal` transitions.
  - Contains a legacy `@theme` block and does not yet include blob animation rules, reduced-motion safety rules for the new background, or line-reveal color transition styles.

### Routing & Layout

- **Page Composition**: `03_source_code/src/app/page.tsx`
  - Assembles `Hero`, `Projects`, `Experience`, `About`, and `Contact` inside `main.min-h-screen`.
  - Includes a static `gallery` placeholder section outside the milestone scope.
  - No layout-level background or wrapper currently supports the new section-specific token rhythm.

### Micro-interactions & Motion

- **IntersectionObserver**: present in `Experience`, `About`, and `Contact` sections.
  - Existing observer usage is coarse-grained and does not yet support the line-by-line reveal threshold of `0.8` required for the `Diferencial` / `Beyond Code` content.
  - `useIntersectionObserver` is a shared hook and can support additional line reveal elements without changing the app router structure.

- **Cursor Glow**: implemented in `Projects` with event listeners and `requestAnimationFrame` throttling.
  - The glow is visible on light backgrounds only if the gradient and scoping are corrected.
  - Touch detection is present, which is good; the glow is already disabled for hover-none environments.

## 3. Architecture & Rendering Impact

- The current page uses a mix of client-only section components (`use client`) and light server-rendered `page.tsx` composition.
- New palette tokens belong in `tailwind.config.ts`; this will affect compiled utility classes globally without changing component logic.
- Ambient blobs should be added as a presentational layer inside `Hero.tsx` or a shared global CSS helper, with `position: absolute` / `z-index: -1` to avoid interfering with the existing content.
- Line-by-line reveal can be implemented inside `About.tsx` with additional `span` wrappers and a dedicated `IntersectionObserver` setup; because the section is already a client component, this does not require app router changes.
- The cursor glow fix is contained to `Projects.tsx` and should avoid global CSS changes beyond possible scoping wrappers.
- The `prefers-reduced-motion` rules should be present in both CSS and JavaScript guard clauses to make the new motion-safe on all supported devices.

## 4. Open Questions & Ambiguities

- The prompt references `design-system.md` and `functional-specification.md`, but these files are missing from `01_strategy/`. Confirm whether `copy-content.md` is the authoritative strategy document for this milestone.
- The current `Gallery` section is present in `page.tsx`; it appears outside the milestone scope and should remain untouched unless otherwise specified.
- Clarify whether the line-by-line reveal requirement applies only to the `Diferencial` paragraphs inside `About` or also to the `Beyond Code` content in the current copy.
- Confirm whether the ambient background should use Tailwind utility classes only, or if a small amount of custom CSS in `globals.css` is acceptable for the blob animation definitions.

## Final Instruction

Relative path: `.ai/thoughts/research/2026-06-05-fluid-aesthetics-section-vitality.md`

Please verify if this research correctly captures the design constraints and current state before proceeding to the Planner phase.
