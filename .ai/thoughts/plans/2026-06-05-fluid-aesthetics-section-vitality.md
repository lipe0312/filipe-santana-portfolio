# Implementation Plan: Fluid Aesthetics & Section Vitality

## Overview

This milestone introduces ambient background vitality, scroll-linked text reveal, and three critical hotfixes across the Hero, Projects, and About sections. Work is split into two non-interfering lanes:

- **Lane 1 (Hotfixes):** Surgical corrections to existing components — purple tags, invisible cursor glow, mismatched CTA buttons. No surrounding component logic is touched.
- **Lane 2 (New Features):** Additive — new palette tokens in config, blob background in Hero, line-by-line reveal in About. No existing structural logic is modified.

Phases 1–2 establish the CSS/config foundation. Phases 3–5 execute Lane 1 hotfixes. Phases 6–8 execute Lane 2 features. Each phase targets a single domain and must compile/render before the next begins.

## Design Constraint Check

- [ ] Adheres strictly to `design-system.md` (Colors: `zinc-100/800` tags; blob palette `pearl`/`alabaster`/`soft-slate`; no saturated colors).
- [ ] Adheres strictly to `functional-specification.md` (Motion: GPU-composited `transform`+`opacity` only; `ease-out` exclusively; `prefers-reduced-motion` guards in CSS and JS; `hover: none` guard on cursor glow).

---

## Phase 1: Styling Setup — Tailwind Config

*Target File:* `03_source_code/tailwind.config.ts`

### Changes Required

- **File**: `03_source_code/tailwind.config.ts`
  - [x] Add four new Light Mode surface tokens under `theme.extend.colors`:
    ```ts
    pearl:      '#FCFCFC',
    alabaster:  '#F9FAFB',
    'soft-slate': '#F1F5F9',
    'zinc-mist':  '#F4F4F5',
    ```
  - [x] Add blob animation keyframes under `theme.extend.keyframes`:
    - `blob-a`: translate from `(0%, 0%)` → `(12%, -18%)` → `(-8%, 10%)` using percentage steps on `transform: translate()` only.
    - `blob-b`: translate from `(0%, 0%)` → `(-14%, 12%)` → `(6%, -9%)`.
    - `blob-c`: translate from `(0%, 0%)` → `(10%, 16%)` → `(-12%, -6%)`.
  - [x] Add three animation utilities under `theme.extend.animation`:
    - `blob-slow: 'blob-a 24s ease-in-out infinite alternate'`
    - `blob-mid: 'blob-b 31s ease-in-out infinite alternate'`
    - `blob-fast: 'blob-c 18s ease-in-out infinite alternate'`

### Success Criteria

#### Automated/Build:
- [x] `npm run build` (or `npm run dev`) compiles without TypeScript or Tailwind errors.
- [ ] Classes `bg-pearl`, `bg-alabaster`, `bg-soft-slate`, `bg-zinc-mist`, `animate-blob-slow`, `animate-blob-mid`, `animate-blob-fast` are present in the compiled CSS output (confirm via DevTools).

#### Manual Verification:
- [ ] No visual change to the rendered page yet — this phase is config only.

---

## Phase 2: Styling Setup — Global CSS

*Target File:* `03_source_code/src/app/globals.css`

### Changes Required

- **File**: `03_source_code/src/app/globals.css`
  - [x] Add `.line-reveal` base rule:
    ```css
    .line-reveal {
      color: #D4D4D8;
      transition: color 400ms ease-out;
    }
    .line-reveal.is-visible {
      color: #18181B;
    }
    ```
  - [x] Add `.blob-bg` container rule:
    ```css
    .blob-bg {
      position: absolute;
      inset: 0;
      z-index: -1;
      overflow: hidden;
      pointer-events: none;
    }
    ```
  - [x] Extend the existing `@media (prefers-reduced-motion: reduce)` block to add:
    ```css
    .blob-bg * { animation: none !important; opacity: 0 !important; }
    .line-reveal { color: #18181B !important; transition: none !important; }
    ```
    These rules must live inside the existing reduced-motion block, not in a new duplicate block.

### Success Criteria

#### Automated/Build:
- [x] `npm run dev` starts with zero CSS parse errors.

#### Manual Verification:
- [ ] No visual change to the rendered page yet — CSS classes are inert until applied to components.
- [ ] In Chrome DevTools › Computed, confirming `.line-reveal` resolves to `color: #D4D4D8` when applied to a test element.

---

## Phase 3: Lane 1 Hotfix — Project Tag Color Correction

*Target File:* `03_source_code/src/components/sections/Projects.tsx`

### Changes Required

- **File**: `03_source_code/src/components/sections/Projects.tsx`
  - [x] Search the entire `src/` directory for Tailwind classes matching any of: `indigo`, `violet`, `purple`, `fuchsia`. Record all instances before touching any file.
  - [x] In `Projects.tsx`, locate every tech tag element (the pill/badge components that display the technology stack strings on each project card).
  - [x] Replace all occurrences of `bg-indigo-50 text-indigo-700` (or any other non-neutral color on these tags) with:
    ```
    bg-zinc-100 text-zinc-800 border border-zinc-200
    ```
  - [x] Confirm no other files in `src/` retain indigo/violet/purple/fuchsia classes after this fix.
  - [x] Do NOT touch surrounding `ProjectCard` layout, `.map()` calls, modal logic, or cursor glow code in this phase.
  - **Note:** `ProjectModal.tsx` also had `bg-indigo-50 text-indigo-700` on the same tag element — patched in the same pass.

### Success Criteria

#### Automated/Build:
- [x] `grep -r "indigo\|violet\|purple\|fuchsia" 03_source_code/src/` returns zero results.
- [x] `npm run build` completes with zero TypeScript errors.

#### Manual Verification:
- [ ] On `localhost:3000`, all project tech tags render as light gray pills (`bg-zinc-100`, dark text `text-zinc-800`) with no purple, blue, or violet tint.
- [ ] No card layout, modal behavior, or cursor glow functionality is visually broken.

---

## Phase 4: Lane 1 Hotfix — Precision Cursor Glow

*Target File:* `03_source_code/src/components/sections/Projects.tsx`

### Changes Required

- **File**: `03_source_code/src/components/sections/Projects.tsx`
  - [x] Locate the cursor glow `<div>` element and its related `useEffect` / event handler logic.
  - [x] Replace the existing gradient color with Light Mode values:
    ```
    radial-gradient(200px circle at var(--glow-x) var(--glow-y), rgba(0,0,0,0.035), transparent 70%)
    ```
    (CSS vars set via `glow.style.setProperty(...)` in the existing useEffect — TS-cast approach removed from style prop.)
  - [x] Confirmed glow `<div>` is `position: fixed`, `pointer-events: none`, `z-index: 0`.
  - [x] Confirmed `hover: none` media query guard present.
  - [x] Confirmed `prefers-reduced-motion` JS guard present.
  - [x] Did NOT modify `ProjectCard` JSX, `.map()` call, or Phase 3 tech tags.

### Success Criteria

#### Automated/Build:
- [x] `npm run build` completes with zero TypeScript errors.

#### Manual Verification:
- [ ] On `localhost:3000`, moving the cursor over the Bento Grid section produces a visible, soft dark shadow radial glow centered on the cursor.
- [ ] Glow fades in on section entry and fades out on exit.
- [ ] On a touch-only device (or DevTools touch simulation), no glow is rendered.

---

## Phase 5: Lane 1 Hotfix — Hero CTA Button Consistency

*Target File:* `03_source_code/src/components/sections/Hero.tsx`

### Changes Required

- **File**: `03_source_code/src/components/sections/Hero.tsx`
  - [ ] Locate both CTA `<a>` or `<button>` elements ("View Experience" and "How can I help").
  - [ ] Audit current classes on both elements. Document current differences in padding, border-radius, font-size, font-weight before changing anything.
  - [ ] Apply a shared class set to both buttons for all structural properties:
    - `px-6 py-3 rounded-lg text-sm font-medium border transition-colors duration-200`
    - These properties must be identical on both elements.
  - [ ] Apply fill treatment to "View Experience": `bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-700 hover:border-zinc-700`
  - [ ] Apply outline treatment to "How can I help": `bg-transparent text-zinc-900 border-zinc-900 hover:bg-zinc-900 hover:text-white`
  - [ ] Both hover states must use `transition-colors duration-200` (maps to `200ms ease-out`).
  - [ ] Do NOT touch the `useEffect` fade-in logic, the headline JSX, or any other element in Hero.

### Success Criteria

#### Automated/Build:
- [ ] `npm run build` completes with zero TypeScript errors.

#### Manual Verification:
- [ ] On `localhost:3000`, both Hero CTA buttons have the exact same padding, border-radius, font size, and bounding box dimensions.
- [ ] Hovering each button produces the correct visual transition within 200ms.
- [ ] The only visual difference between the two buttons is fill vs. outline.

---

## Phase 6: Lane 2 — Section Background Token Assignments

*Target Files:* `Hero.tsx`, `Projects.tsx`, `About.tsx`, `Experience.tsx`, `Contact.tsx`

### Changes Required

Each section component receives a single background color change on its outermost wrapper `<section>` element. No other classes, logic, or JSX is touched in this phase.

- **`03_source_code/src/components/sections/Hero.tsx`**
  - [ ] Add `bg-pearl` to the outermost `<section>` or root wrapper element.

- **`03_source_code/src/components/sections/Projects.tsx`**
  - [ ] Add `bg-alabaster` to the outermost `<section>` element.

- **`03_source_code/src/components/sections/About.tsx`**
  - [ ] Add `bg-soft-slate` to the outermost `<section>` element.

- **`03_source_code/src/components/sections/Experience.tsx`**
  - [ ] Add `bg-pearl` to the outermost `<section>` element.

- **`03_source_code/src/components/sections/Contact.tsx`**
  - [ ] Add `bg-alabaster` to the outermost `<section>` element.

- No raw hex values (`#FCFCFC`, `#F9FAFB`, etc.) may appear in any component file.

### Success Criteria

#### Automated/Build:
- [ ] `npm run build` completes with zero TypeScript errors.
- [ ] `grep -r "#FCFCFC\|#F9FAFB\|#F1F5F9\|#F4F4F5" 03_source_code/src/` returns zero results.

#### Manual Verification:
- [ ] On `localhost:3000`, scrolling through the page reveals a barely perceptible tonal rhythm between sections — Hero is the lightest, Projects is slightly warmer, About has the softest slate hue, etc.
- [ ] No section's background creates a high-contrast jump that draws the eye away from content.

---

## Phase 7: Lane 2 — Ambient Blob Background (Hero)

*Target File:* `03_source_code/src/components/sections/Hero.tsx`

### Changes Required

- **File**: `03_source_code/src/components/sections/Hero.tsx`
  - [ ] Ensure the Hero `<section>` has `position: relative` (add `relative` Tailwind class if not present) to serve as the positioning context for the absolute blob container.
  - [ ] Add the blob container `<div>` as the **first child** inside the Hero `<section>`, before all text/CTA content:
    ```tsx
    <div className="blob-bg" aria-hidden="true">
      <div className="absolute w-96 h-96 rounded-full bg-pearl opacity-50 blur-[80px] will-change-transform animate-blob-slow top-[-10%] left-[-5%]" />
      <div className="absolute w-80 h-80 rounded-full bg-alabaster opacity-50 blur-[80px] will-change-transform animate-blob-mid top-[20%] right-[-8%]" />
      <div className="absolute w-72 h-72 rounded-full bg-soft-slate opacity-40 blur-[80px] will-change-transform animate-blob-fast bottom-[-5%] left-[30%]" />
    </div>
    ```
  - [ ] Blob colors must be drawn exclusively from `pearl`, `alabaster`, `soft-slate` — no saturated colors, no hex values in the component.
  - [ ] Each blob `div` must have `aria-hidden="true"` on the container (the blobs are decorative).
  - [ ] `will-change-transform` must appear only on the blob elements — not on any other element.
  - [ ] Do NOT move, reorder, or modify any existing JSX in Hero outside of adding the blob container and `relative` positioning.
  - [ ] Verify every existing `.map()` call in Hero (if any) still has an explicit `return` or parenthesized arrow function after this change.

### Success Criteria

#### Automated/Build:
- [ ] `npm run build` completes with zero TypeScript errors and zero ESLint warnings.

#### Manual Verification:
- [ ] On `localhost:3000`, the Hero section has a subtly animated background — slow, soft, blurred shapes that drift like breathing. No blob shape is ever identifiable (fully blurred).
- [ ] Hero headline text is fully legible with no overlap or visual interference from the blobs.
- [ ] With Chrome DevTools Rendering › Emulate CSS `prefers-reduced-motion: reduce` enabled, the blobs are invisible (opacity: 0, no animation).
- [ ] DevTools Performance recording (5s, idle page) shows ≥60fps with no new frames dropped.

---

## Phase 8: Lane 2 — Scroll-Linked Text Reveal (About Section)

*Target File:* `03_source_code/src/components/sections/About.tsx`

### Changes Required

- **File**: `03_source_code/src/components/sections/About.tsx`
  - [ ] Locate the "What I Actually Bring" (Diferencial) and "Beyond Code" paragraph blocks.
  - [ ] Split each paragraph into individual line/sentence elements using `<span>` wrappers. Each `<span>` must be `display: block` (add Tailwind `block` class). Apply the following classes to each span:
    ```
    line-reveal block
    ```
  - [ ] Apply staggered `transition-delay` via inline `style={{ transitionDelay: `${index * 60}ms` }}` on each span, where `index` starts at 0.
  - [ ] Add a `useEffect` (separate from any existing effects) that:
    1. Guards: `if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)` → immediately add `is-visible` class to all `.line-reveal` elements and return without creating an observer.
    2. Creates an `IntersectionObserver` with `{ threshold: 0.8 }`.
    3. For each observed `.line-reveal` element: adds `is-visible` class on intersection, then disconnects the observer from that specific element (`observer.unobserve(entry.target)`).
    4. Cleanup: `return () => observer.disconnect()` in the `useEffect` return function (required for React StrictMode safety).
  - [ ] All new `useEffect`, `useRef` references must be added to the import statement at the top of the file.
  - [ ] Verify every existing `.map()` call in `About.tsx` retains its explicit `return` or parenthesized arrow function after this change.
  - [ ] Do NOT modify the counter animation, the magnetic tag repulsion logic, the stats grid, or any other section of `About.tsx`.

### Success Criteria

#### Automated/Build:
- [ ] `npm run build` completes with zero TypeScript errors and zero ESLint warnings.
- [ ] `npm run dev` starts without a blank screen or `Uncaught SyntaxError` in the browser console.

#### Manual Verification:
- [ ] On `localhost:3000`, scrolling to the Diferencial / Beyond Code sections shows lines starting as light zinc (`#D4D4D8`) and transitioning to near-black (`#18181B`) as they enter the viewport, with a visible stagger between lines.
- [ ] The `IntersectionObserver` threshold of `0.8` produces a tight, synchronized reveal — lines activate only when mostly visible, not prematurely at the section edge.
- [ ] With `prefers-reduced-motion: reduce` active, all Diferencial/Beyond Code lines render immediately at full `#18181B` with no transition.
- [ ] Lighthouse CLS score remains `0.00` — the color transition introduces no layout shift.

---

## Phase 9: Handoff Generation

*Target Directory:* `.ai/thoughts/handoffs/`

### Changes Required

- **File**: `.ai/thoughts/handoffs/2026-06-05-fluid-aesthetics-section-vitality-handoff.md`
  - [ ] Create the handoff document summarizing all modified files across phases 1–8.
  - [ ] For each modified file, list: the phase it was modified in, the specific change made, and whether the change was additive (new code) or corrective (replacing existing code).
  - [ ] Document any deviations from the design system or feature context (e.g., if blob sizes or animation durations were adjusted for performance).
  - [ ] Include the full list of new Tailwind utility classes introduced (`bg-pearl`, `bg-alabaster`, `bg-soft-slate`, `bg-zinc-mist`, `animate-blob-slow`, `animate-blob-mid`, `animate-blob-fast`).
  - [ ] Include a checklist of all Acceptance Criteria from `0_feature_context.md §5` with pass/fail status.
  - [ ] Note any open questions or follow-on work discovered during implementation.

### Success Criteria

#### Manual Verification:
- [ ] The handoff file is present at `.ai/thoughts/handoffs/2026-06-05-fluid-aesthetics-section-vitality-handoff.md`.
- [ ] A reviewer reading the handoff can identify every file changed, every class added, and every deviation from the original spec without referring to git diff.

---

## Final Instruction

Output the file content to `.ai/thoughts/plans/2026-06-05-fluid-aesthetics-section-vitality.md`.

**Please review the phase boundaries before clearing context and switching to the Developer prompt.** Specifically confirm:
1. Phases 1–2 (config/CSS) are fully validated before any component work begins in Phases 3–8.
2. Lane 1 hotfixes (Phases 3–5) never touch the same JSX regions as Lane 2 features (Phases 6–8).
3. Each phase in Phases 3–8 targets exactly one component file.
