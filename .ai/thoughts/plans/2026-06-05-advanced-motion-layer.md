# Implementation Plan: Advanced Motion Layer

## Overview

This milestone wires four coordinated motion effects into the existing portfolio: a global one-shot scroll reveal system (`.reveal`/`.is-visible`), a quantitative counter in a new About section component, magnetic tag repulsion on the About tags, and a precision cursor glow scoped to the Projects Bento Grid. Two prerequisite bugs must be resolved first: the `@theme {}` CSS variable scoping issue that prevents the dark palette from rendering, and the stale-closure/missing-unobserve bug in `useIntersectionObserver.ts`. A full `About.tsx` component must be built (it does not exist) to host the counter and magnetic tags. The Hero `duration-600` Tailwind class bug is in-scope as a motion-related fix.

---

## Ambiguity Resolutions

The following open questions from the Research Document are resolved here and must be treated as ground truth during development:

- **About component**: Built within this milestone. No separate prerequisite.
- **`@theme {}` fix**: Treated as a prerequisite. Resolved in Phase 1 before any component work.
- **Hook strategy**: Update the existing `useIntersectionObserver` hook (not a new hook) to the one-shot pattern. Avoids duplication.
- **Hero `duration-600`**: In scope. Fixed in Phase 3.
- **Bento Grid row stagger**: Row index = `Math.floor(cardIndex / 3)` (desktop 3-col reference). `getStaggerDelay(rowIndex)` applies the same `50ms` step / `150ms` cap. Cards 0–2 → `0ms`, cards 3–5 → `50ms`, cards 6–7 → `100ms`. Acceptable on mobile/tablet where the delay chain differs slightly but remains coherent.
- **Counter values**: Derived deterministically from source data — `8` Projects Built (from `projects.ts`), `17` Technologies (count of Core Technologies tags in `copy-content.md §5`), `4` Professional Roles (from `copy-content.md §4`). Labels: "Projects Built", "Technologies", "Professional Roles".
- **Magnetic tag scope**: Both Core Technologies AND Soft Skills tags are magnetic.

---

## Design Constraint Check

- [ ] Adheres strictly to `design-system.md` (Background `#0A0A0A`, Surface `#121212`, Borders `#27272A`, `border-radius: 16px` cards / `6px` tags, `24px` grid gap).
- [ ] Adheres strictly to motion rules: `ease-out` only, no spring/bounce, `prefers-reduced-motion` suppressed at both CSS and JS layers, `hover: none` suppresses all pointer effects.
- [ ] All animated properties are GPU-composited (`transform`, `opacity`) — no `top`, `left`, `margin`, or `padding` animation.
- [ ] Zero CLS: only `transform: translateY` and `opacity` used for reveals; `translate()` for magnetic tags.
- [ ] Cursor glow uses `pointer-events: none` and `position: fixed`.

---

## Phase 1: CSS Foundation — `@theme` Fix & Reduced Motion Safety Net

*Target File:* `03_source_code/src/app/globals.css`

### Changes Required

- **File**: `03_source_code/src/app/globals.css`
  - [ ] Replace the `@theme {}` block with `:root {}`. Move all 11 custom property declarations (`--color-background-base` through `--spacing-padding`) into `:root {}`. Delete the `@theme {}` wrapper entirely. This registers the tokens in the CSS cascade so `var()` references in `:root`, `body`, and Tailwind utilities resolve correctly.
  - [ ] Remove the duplicate `color` and `background-color` declarations from the existing `:root {}` block — they will remain only in `body` (already present) to avoid redundancy.
  - [ ] Add a `@media (prefers-reduced-motion: reduce)` block after `.reveal.is-visible` that resets the `.reveal` transition to `none` and forces `opacity: 1` and `transform: none`:
    ```css
    @media (prefers-reduced-motion: reduce) {
      .reveal {
        opacity: 1;
        transform: none;
        transition: none;
      }
    }
    ```

### Success Criteria

#### Automated/Build:
- [ ] `npm run dev` compiles with no errors or warnings.
- [ ] In compiled CSS (`.next/static/css/`), `:root {}` contains `--color-background-base: #0A0A0A` and all other tokens. No `@theme {}` block appears in the output.

#### Manual Verification:
- [ ] Page background is `#0A0A0A` (deep dark) in the browser — no white background.
- [ ] All text renders in `#FAFAFA` (off-white primary text).
- [ ] In a browser with "Reduce Motion" enabled (System Preferences → Accessibility), all `.reveal` elements are immediately fully visible (opacity 1, no translateY).

---

## Phase 2: Hook Repair — `useIntersectionObserver` One-Shot Pattern

*Target File:* `03_source_code/src/hooks/useIntersectionObserver.ts`

### Changes Required

- **File**: `03_source_code/src/hooks/useIntersectionObserver.ts`
  - [ ] Change the observer callback to only act when `entry.isIntersecting === true`. Inside that branch: call `setIsVisible(true)` then immediately call `observer.unobserve(entry.target)`. Remove the branch that sets `isVisible` back to `false` — this hook is for one-shot reveals.
  - [ ] Change the `useEffect` dependency array from `[options]` to `[]` (empty). The options are frozen at mount time. Add an ESLint disable comment `// eslint-disable-line react-hooks/exhaustive-deps` on the same line if needed by the project's lint config.
  - [ ] Change the cleanup `return` to call `observer.disconnect()` instead of `observer.unobserve(element)` — `disconnect()` is safer for cleanup as it handles the case where the element has already been unobserved.

  **Final shape of the hook:**
  ```ts
  "use client";
  import { useEffect, useRef, useState } from "react";

  export function useIntersectionObserver(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const element = ref.current;
      if (!element) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.12, ...options });

      observer.observe(element);
      return () => observer.disconnect();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return { ref, isVisible };
  }
  ```

### Success Criteria

#### Automated/Build:
- [ ] `npm run dev` compiles with no TypeScript errors.

#### Manual Verification:
- [ ] After wiring scroll reveals (Phase 4+), once an element enters the viewport and receives `.is-visible`, scrolling it out of view and back does NOT cause it to fade in again — the reveal fires exactly once per element.

---

## Phase 3: Hero Transition Fix

*Target File:* `03_source_code/src/components/sections/Hero.tsx`

### Changes Required

- **File**: `03_source_code/src/components/sections/Hero.tsx`
  - [ ] Locate all uses of `duration-600` class. Replace each with `duration-500` (the nearest valid Tailwind v3 utility — `500ms` vs the intended `600ms` is an acceptable trade-off; it is far better than the current `150ms` default). Do NOT add a custom `duration-600` to the Tailwind config — that is out of scope.

### Success Criteria

#### Automated/Build:
- [ ] `npm run dev` compiles without warnings about unknown utilities.

#### Manual Verification:
- [ ] On hard refresh, the Hero section fades in with a visibly smooth ~500ms transition, not the previous imperceptible `150ms` snap.

---

## Phase 4: Scroll Reveals — Experience & Contact Sections

*Target Files:* `03_source_code/src/components/sections/Experience.tsx`, `03_source_code/src/components/sections/Contact.tsx`

### Changes Required

- **File**: `03_source_code/src/components/sections/Experience.tsx`
  - [ ] The component already imports `useIntersectionObserver` and `getStaggerDelay`. Call the hook once per Experience entry at the top of the component (4 calls total, one per entry) — each returning its own `{ ref, isVisible }` pair.
  - [ ] On the outermost `<div>` wrapper for each Experience entry (the element at the root of each rendered block): add `ref={refN}`, add `className` containing `reveal` + conditionally `is-visible` based on `isVisibleN`, and add `style={{ transitionDelay: `${getStaggerDelay(index)}ms` }}`.
  - [ ] Stagger: index 0 → `0ms`, index 1 → `50ms`, index 2 → `100ms`, index 3 → `150ms`. Matches the spec's sequential experience reveal.

- **File**: `03_source_code/src/components/sections/Contact.tsx`
  - [ ] The component already imports `useIntersectionObserver`. Call the hook once for the section's main content container.
  - [ ] On the outermost content `<div>` inside the `<section>`: add `ref`, `reveal` class, and `is-visible` conditional. No stagger needed — Contact is a single reveal unit.

### Success Criteria

#### Automated/Build:
- [ ] `npm run dev` compiles with no TypeScript errors.

#### Manual Verification:
- [ ] Scroll down to Experience: each entry fades up sequentially with `50ms` spacing between entries.
- [ ] Scroll down to Contact: the section fades up as a single unit on viewport entry.
- [ ] Neither section re-animates when scrolled out and back in (one-shot behavior from Phase 2).
- [ ] With "Reduce Motion" enabled, all Experience and Contact elements are immediately visible.

---

## Phase 5: Scroll Reveals — Projects Bento Grid (Row-Stagger)

*Target File:* `03_source_code/src/components/sections/Projects.tsx`

### Changes Required

- **File**: `03_source_code/src/components/sections/Projects.tsx`
  - [ ] The component already imports `useIntersectionObserver` and `getStaggerDelay`. Call the hook once per project card (8 calls total). Each returns `{ ref, isVisible }`.
  - [ ] Compute `rowIndex = Math.floor(cardIndex / 3)` for each card. This is the desktop 3-col row assignment.
  - [ ] On the `<div>` wrapping each `ProjectCard` (the element at line 161 in the current file): add `ref={refs[index]}`, add `reveal` class + `is-visible` conditional, and add `style={{ transitionDelay: `${getStaggerDelay(rowIndex)}ms` }}`.
  - [ ] The `featured` card (PalmPay, `col-span-2` in a 3-col layout) counts as `index 0`, `rowIndex 0`, `delay 0ms`. Do not adjust its row assignment.

### Success Criteria

#### Automated/Build:
- [ ] `npm run dev` compiles with no TypeScript errors.

#### Manual Verification:
- [ ] Scroll to Projects: cards in the first row (indices 0–2) appear simultaneously at `0ms`. Second row (3–5) at `50ms`. Third row (6–7) at `100ms`.
- [ ] On initial page load (without scroll), the cards below the fold are invisible (`opacity: 0`, slight `translateY`). Scrolling reveals them.
- [ ] Cards do not re-animate on reverse scroll.
- [ ] With "Reduce Motion" enabled, all cards are immediately visible.

---

## Phase 6: Cursor Glow — Bento Grid Section

*Target File:* `03_source_code/src/components/sections/Projects.tsx`

### Changes Required

- **File**: `03_source_code/src/components/sections/Projects.tsx`
  - [ ] At the top of the component, add a ref for the glow `div` (`glowRef`) and a ref for the `<section>` element (`sectionRef`). Add a `useEffect` that:
    1. **Guards**: Check `window.matchMedia('(hover: none)').matches` and `window.matchMedia('(prefers-reduced-motion: reduce)').matches`. If either is true, do not attach any listeners and return immediately.
    2. **State**: Declare `let rafPending = false` and `let rafId = 0` in the closure.
    3. **`mousemove` handler**: When called, if `rafPending` is true, return. Set `rafPending = true`. Schedule `requestAnimationFrame((timestamp) => { ... })`. Inside the rAF callback: reset `rafPending = false`. Get the section's `DOMRect` via `sectionRef.current.getBoundingClientRect()`. Check if `clientX` and `clientY` are within the rect bounds. If inside: set `glowRef.current.style.opacity = '1'`, set `--glow-x` = `e.clientX + 'px'`, set `--glow-y` = `e.clientY + 'px'`. If outside: set `glowRef.current.style.opacity = '0'`.
    4. Store the rAF ID in `rafId` for cleanup.
    5. Attach `mousemove` handler to `window`.
    6. Return cleanup: `window.removeEventListener('mousemove', handler)` and `cancelAnimationFrame(rafId)`.
  - [ ] Render a glow `<div>` as the **first child** of the `<section id="projects">` element. It must have:
    - `ref={glowRef}`
    - `aria-hidden="true"`
    - `pointer-events: none`, `position: fixed`, `inset: 0`
    - `opacity: 0` initial (hidden until mouse enters section)
    - `transition: opacity 300ms ease-out`
    - Background: `radial-gradient(200px circle at var(--glow-x, 0px) var(--glow-y, 0px), rgba(255, 255, 255, 0.04), transparent 70%)`
    - `z-index: 0` — sits behind all card content which should be `z-index: 1` or higher.
    - The initial CSS custom properties `--glow-x: 0px; --glow-y: 0px` set on the element via `style` prop.

### Success Criteria

#### Automated/Build:
- [ ] `npm run dev` compiles with no TypeScript errors.

#### Manual Verification:
- [ ] Move the cursor over the Projects section: a soft circular glow follows the cursor.
- [ ] Move the cursor outside the Projects section bounds: the glow fades to invisible within 300ms.
- [ ] The glow never causes a layout shift — Bento cards remain in their grid positions.
- [ ] On a touch-only device (or simulated `hover: none` in DevTools), the glow element is never shown.
- [ ] With "Reduce Motion" enabled, no glow appears.
- [ ] The glow does not appear over the navbar (`position: fixed` z-index consideration — the glow `z-index: 0` is below the TopBar's z-index).

---

## Phase 7: About Component — Structure & Static Copy

*Target Files:* `03_source_code/src/components/sections/About.tsx` (new), `03_source_code/src/app/page.tsx`

### Changes Required

- **File**: `03_source_code/src/components/sections/About.tsx` *(create new)*
  - [ ] `"use client"` directive at the top.
  - [ ] Build the full About section layout with these sub-sections in order:
    1. **Section header**: eyebrow label "About" + heading "The Engineer Behind the Work" (or similar that fits the tone of `copy-content.md §5`).
    2. **Counter row** (placeholder `<div id="about-stats">`): three stat blocks with labels "Projects Built", "Technologies", "Professional Roles". The numeric values start at `0` and will be animated in Phase 8 — render them as a `<span>` with a ref per counter.
    3. **Executive Summary**: full paragraph copy from `copy-content.md §5` Executive Summary (2 paragraphs).
    4. **Core Technologies block**: heading "Core Technologies" + tag grid. Each tag is a `<span>` styled with `border-radius: 6px`, `background: rgba(255,255,255,0.05)`, `font-family: Geist Mono / JetBrains Mono`, `padding: 4px 10px`. The 17 tags from `copy-content.md §5` in order: `Python`, `C`, `C++`, `JavaScript`, `Java`, `React`, `TypeScript`, `Flask`, `OpenCV`, `YOLO`, `ESP32`, `MQTT`, `Git`, `Linux`, `SQL`, `Assembly`, `TensorFlow`.
    5. **Soft Skills block**: heading "Soft Skills" + same tag styling. The 8 tags: `Technical Leadership`, `Academic Research`, `Strategic Thinking`, `Sales`, `Complex Problem Solving`, `Hardware-Software Integration`, `Cross-layer Systems Thinking`, `Adaptability`.
    6. **Diferencial block**: `id="diferencial"` on the wrapper div — this is the scroll target of the Hero CTA "How can I help". Heading "What I Actually Bring" + 4 paragraphs from `copy-content.md §5 Diferencial`.
    7. **Beyond Code block**: heading "Beyond Code" + 3 paragraphs from `copy-content.md §5 Beyond Code`.
  - [ ] Apply `.reveal` + `is-visible` conditional class + stagger delay to each major sub-section block. Sub-section stagger order: stats row `0ms`, Executive Summary `50ms`, Core Technologies `100ms`, Soft Skills `100ms` (same tier), Diferencial `150ms`, Beyond Code `150ms`.
  - [ ] The counter span refs and tag refs are defined as `useRef<HTMLSpanElement>(null)` and `useRef<HTMLSpanElement[]>` respectively — they will be populated in Phases 8 and 9.

- **File**: `03_source_code/src/app/page.tsx`
  - [ ] Import `About` from `@/components/sections/About`.
  - [ ] Replace the inline `<section id="about">` stub (lines 12–14) with `<About />`.

### Success Criteria

#### Automated/Build:
- [ ] `npm run dev` compiles with no TypeScript errors.

#### Manual Verification:
- [ ] Navigating to `/#diferencial` from the Hero "How can I help" CTA scrolls the page to the Diferencial block.
- [ ] All About sub-sections are readable and use the correct design tokens (`text-text-primary`, `text-text-secondary`, monospace tag font).
- [ ] Counter values display as `0` initially (will animate in Phase 8).
- [ ] Tags render correctly with `border-radius: 6px` and monospace font.

---

## Phase 8: About Component — Counter Animation

*Target File:* `03_source_code/src/components/sections/About.tsx`

### Changes Required

- **File**: `03_source_code/src/components/sections/About.tsx`
  - [ ] Define the counter targets as a constant array: `[{ value: 8, label: 'Projects Built' }, { value: 17, label: 'Technologies' }, { value: 4, label: 'Professional Roles' }]`.
  - [ ] Add a `useEffect` that:
    1. **Guards**: `window.matchMedia('(prefers-reduced-motion: reduce)').matches` → if true, set each counter `<span>` text directly to its final value and return. No animation needed.
    2. **IntersectionObserver**: observe the stats row container (`statsRef.current`) with `threshold: 0.12`. Inside the callback:
       - If `entry.isIntersecting === true`: trigger the animation and immediately call `observer.unobserve(entry.target)`, then `observer.disconnect()`.
    3. **rAF animation loop**: for each counter target `{ value: 8/17/4 }`, run an independent rAF loop:
       - Record `startTime` from the first rAF `timestamp`.
       - Duration: `1200ms`.
       - Each frame: `progress = Math.min((timestamp - startTime) / 1200, 1)`, `easedProgress = 1 - Math.pow(1 - progress, 3)`, `currentValue = Math.round(0 + value * easedProgress)`.
       - Update the counter `<span>` text via direct DOM mutation: `counterRef.current.textContent = String(currentValue)`.
       - If `progress < 1`, schedule next frame; otherwise set final value exactly.
    4. Store all rAF IDs. Cleanup: `cancelAnimationFrame(id)` for each.

### Success Criteria

#### Automated/Build:
- [ ] `npm run dev` compiles with no TypeScript errors.

#### Manual Verification:
- [ ] Scroll the About stats row into view: each counter animates from `0` to its target (`8`, `17`, `4`) over ~1200ms with a cubic ease-out curve (fast initial tick, decelerates into the final value).
- [ ] The counter fires exactly once — scrolling up and back down does NOT re-trigger the animation.
- [ ] With "Reduce Motion" enabled, the counters show their final values immediately without animating.

---

## Phase 9: About Component — Magnetic Tags

*Target File:* `03_source_code/src/components/sections/About.tsx`

### Changes Required

- **File**: `03_source_code/src/components/sections/About.tsx`
  - [ ] Add a `useRef<HTMLSpanElement[]>` that collects refs for **all** technology and soft skill `<span>` tags (25 total: 17 core + 8 soft skills). Use a `refCallback` pattern: `(el) => { if (el) tagRefs.current[index] = el; }`.
  - [ ] Add a `useEffect` that:
    1. **Guards**: Check `window.matchMedia('(hover: none)').matches` and `window.matchMedia('(prefers-reduced-motion: reduce)').matches`. If either is true, return immediately — no listener attached.
    2. **State**: `let rafPending = false`, `let rafId = 0`, and store last `mouseX`/`mouseY` in closure variables.
    3. **`mousemove` handler**: Store `mouseX = e.clientX`, `mouseY = e.clientY`. If `rafPending` is true, return. Set `rafPending = true`. Schedule rAF.
    4. **rAF callback**: Reset `rafPending = false`.
       - **Read phase** (collect all rects before any writes): iterate `tagRefs.current`, call `getBoundingClientRect()` on each, compute `centerX = rect.left + rect.width / 2`, `centerY = rect.top + rect.height / 2`, `dx = mouseX - centerX`, `dy = mouseY - centerY`, `distance = Math.sqrt(dx*dx + dy*dy)`. Store all results in a local array.
       - **Write phase** (apply transforms after all reads): for each tag result, if `distance < 60`: compute repulsion vector `tx = -(dx / distance) * Math.min((60 - distance) / 60 * 6, 6)` and `ty = -(dy / distance) * Math.min((60 - distance) / 60 * 6, 6)`, clamped to `±6px`; set `tag.style.transform = `translate(${tx}px, ${ty}px)``. If `distance >= 60`: set `tag.style.transform = 'translate(0px, 0px)'`.
    5. **`mouseleave` handler** on the About section: reset all tag transforms to `translate(0px, 0px)`.
    6. Attach `mousemove` to `window`, `mouseleave` to the section element.
    7. Cleanup: remove both listeners, `cancelAnimationFrame(rafId)`.
  - [ ] Add the elastic snap-back CSS transition to each tag `<span>`: `transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)`. This `cubic-bezier` produces a ~1px overshoot on snap-back as specified, then settles. The transition only fires on snap-back (not during active repulsion) because the rAF loop overrides `transform` continuously while the mouse is near.

### Success Criteria

#### Automated/Build:
- [ ] `npm run dev` compiles with no TypeScript errors.

#### Manual Verification:
- [ ] Move the cursor over the Core Technologies tag grid: nearby tags visibly shift away from the cursor. The max displacement never exceeds `6px`.
- [ ] Move the cursor over Soft Skills tags: same magnetic repulsion applies.
- [ ] Move the cursor away from a tag: the tag snaps back with a subtle elastic overshoot (~1px), then settles.
- [ ] Moving the cursor quickly over the tag grid produces smooth 60fps movement with no stutter.
- [ ] In DevTools Performance panel, the `mousemove` handler shows a single rAF per frame — no queued frames.
- [ ] On touch-only device (or simulated `hover: none`): no magnetic behavior, tags remain static.
- [ ] With "Reduce Motion" enabled: no magnetic behavior.

---

## Phase 10: Handoff Generation

*Target Directory:* `.ai/thoughts/handoffs/`

### Changes Required

- **File**: `2026-06-05-advanced-motion-layer-handoff.md`
  - [ ] Create a handoff document listing all modified and created files across Phases 1–9.
  - [ ] For each file: note the Phase it was modified in, the nature of the change, and any deviation from the original research document or design system.
  - [ ] Note the resolved ambiguities (counter values, magnetic tag scope, hook strategy, `@theme` fix).
  - [ ] Flag any outstanding issues found during implementation (e.g., if the Tailwind config required changes to support the dark palette after the `@theme` fix, document what was changed).
  - [ ] Include the `#diferencial` anchor confirmation — the Hero CTA should now link correctly.

### Success Criteria

#### Manual Verification:
- [ ] The handoff file exists at `.ai/thoughts/handoffs/2026-06-05-advanced-motion-layer-handoff.md`.
- [ ] All 9 phases are accounted for with their respective files and changes cited.
- [ ] The file is accurate enough to trigger the Reviewer phase without additional context.

---

## Final Instruction

Output the file content to `.ai/thoughts/plans/2026-06-05-advanced-motion-layer.md`.

**Review the phase boundaries before switching to the Developer prompt.** Key questions to confirm before clearing context:
1. Is the row-stagger formula `Math.floor(index / 3)` acceptable for all breakpoints, or does the responsive behavior need per-breakpoint handling?
2. Should the cursor glow use dark-mode-only color (`rgba(255,255,255,0.04)`) after the `@theme` fix makes the page dark, or implement the full light/dark adaptive logic via `matchMedia('prefers-color-scheme')`?
3. Are the counter values (`8`, `17`, `4`) confirmed as final?
