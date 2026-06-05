# Portfolio Feature Context

## 1. Feature Name & Intent

**Feature Name:** Fluid Aesthetics & Section Vitality — Ambient Background, Typography Reveal, Critical Hotfixes
**Business/UX Value:** A portfolio that only moves when the user scrolls is a portfolio that feels inert at rest. This milestone introduces ambient vitality — the page breathes, shifts, and rewards stillness, not just interaction. The fluid mesh gradient background creates the same atmospheric quality found on Linear.app and Marc Kuiper's site: a sense that the interface has its own quiet energy. The scroll-linked text reveal transforms the "Diferencial" and "Beyond Code" sections from walls of text into progressive, earned reading experiences. The critical hotfixes (purple tag colors, invisible cursor glow, mismatched CTA button) eliminate the small inconsistencies that signal an unfinished product to a trained eye. Individually, each fix is minor. Collectively, they are the gap between "impressive" and "polished."
**Priority:** High
**Explanation:** This milestone has two distinct lanes that must not interfere with each other. **Lane 1 (Hotfixes):** Surgical corrections to existing components — purple tags, glow CSS logic, CTA button styling. These must be fixed without touching any surrounding component logic. **Lane 2 (New Features):** Ambient background, typography reveal, and expanded palette tokens. These are additive — they introduce new components and CSS, they do not modify existing structural components. The implementing agent must maintain this separation to avoid triggering the build-breaking `SyntaxError` failures seen in previous iterations.

> ⚠️ **CRITICAL REACT SAFETY MANDATE — READ BEFORE TOUCHING ANY FILE:** This project has a documented history of build failures caused by malformed JSX. Before submitting any code in this milestone, the implementing agent must manually verify every single one of the following: (1) Every `.map()` call has an explicit `return` statement or uses a single-expression arrow function with parentheses `() => (...)`, never a bare block body `() => { <JSX> }` without a `return`. (2) Every template literal inside JSX uses backticks, not single or double quotes. (3) Every JSX expression containing a ternary or logical `&&` is wrapped in `{}` with no stray characters outside. (4) Every opened JSX tag has a matching closing tag or self-closes. (5) Every `useEffect`, `useState`, and `useRef` import is present in the import statement of the file that uses it. Violating any of these rules produces a silent `Uncaught SyntaxError` that renders a blank screen with no useful error message. Verify before submitting — not after.

---

## 2. Target Domains

- [ ] **Routing & Layout** (Next.js App Router, `layout.tsx`, `page.tsx`)
- [x] **Core UI Components** (React, Bento Grid, Navigation, Modals)
- [x] **Styling & Theming** (Tailwind CSS config, `globals.css` variables)
- [x] **Micro-interactions & Motion** (CSS Transitions, IntersectionObserver, Scroll logic)
- [ ] **Asset Management** (Next.js Image, Video autoplay logic, `public/` media)

---

## 3. Architectural & Design Constraints

### Lane 1 — Critical Hotfixes

- [x] **Project Tag Color Correction — `design-system.md` §1 & §3:** All tech stack tag elements inside the Projects section must be audited. Any element rendering a purple, violet, indigo, or any non-neutral color must have that color removed. The correct resting style is strictly: `bg-zinc-100 text-zinc-800` with `border: 1px solid` using the `border-subtle` token (`#E4E4E7` adapted for Light Mode), `border-radius: 6px`, and Geist Mono font. No other background or text color is permitted on these tags. The implementing agent must search the entire `03_source_code` directory for any instance of Tailwind classes containing `purple`, `violet`, `indigo`, `fuchsia`, or any hex value in the `#7C3AED` / `#6D28D9` range and remove them unconditionally.

- [x] **Precision Cursor Glow CSS Fix — `functional-specification.md` §6, Innovation §1:** The glow is currently invisible because the gradient color values from the dark-mode specification (`rgba(255,255,255,0.04)`) produce no visible effect on a light background. The fix requires adapting the gradient to the Light Mode canvas: replace the existing gradient color with `rgba(0, 0, 0, 0.035)` as the peak opacity at the center, fading to `transparent` at the `200px` radius boundary. Additionally, verify the `--x` and `--y` CSS variables are being set correctly on the glow `div`'s inline style via `element.style.setProperty()` — a common failure is setting the variables on the wrong DOM element or using `style={{ '--x': value }}` React syntax which requires TypeScript casting. The glow `div` must be `position: fixed`, `pointer-events: none`, `z-index: 0`, and scoped visually to the Bento Grid section via `clip-path` or a wrapping `overflow: hidden` container.

- [x] **Hero CTA Button Consistency — `copy-content.md` §2 & `design-system.md` §1:** The "How can I help" button must be visually consistent with the "View Experience" button. Both buttons must share identical: `border-radius` (sourced from the `rounded-card` or a dedicated `rounded-btn` token), `padding` (identical horizontal and vertical values), `font-family` (Inter, same weight), `font-size`, and `border: 1px solid` treatment. The only permitted visual distinction between the two buttons is background fill vs. outline treatment — one may be filled (`bg-zinc-900 text-white`) and one outlined (`bg-transparent border-zinc-900 text-zinc-900`), but their bounding box dimensions, border-radius, and typographic treatment must be pixel-identical. Hover state: both buttons must have a defined `hover:` class that transitions `background-color` and/or `color` over `200ms ease-out`. No button may lack a hover state.

### Lane 2 — New Features

- [x] **Expanded Palette Tokens — `design-system.md` §1 & `tailwind.config.ts`:** Before any new component is built, extend `tailwind.config.ts` under `theme.extend.colors` with the following new Light Mode surface tokens: `pearl: '#FCFCFC'`, `alabaster: '#F9FAFB'`, `soft-slate: '#F1F5F9'`, `zinc-mist: '#F4F4F5'`. These are the only new color values permitted in this milestone. Each section of the page must be assigned one of these tokens as its background: Hero uses `pearl`, Projects uses `alabaster`, About uses `soft-slate`, Experience uses `pearl`, Contact uses `alabaster`. This creates a barely perceptible tonal rhythm that breaks monotony without introducing color contrast. All section background assignments must use Tailwind utility classes referencing these new tokens — no raw hex values in component files.

- [x] **Fluid Ambient Background — `functional-specification.md` §4 (Motion Principles) & Marc Kuiper Reference:** The ambient background must be implemented as a CSS `@keyframes` animation on a set of 3 to 4 absolutely positioned, `blur(80px)` filtered `div` elements (SVG blobs or simple `border-radius: 50%` ellipses) placed behind the Hero section content at `z-index: -1`. Each blob animates its `transform: translate()` and `border-radius` on an independent loop duration (e.g., `18s`, `24s`, `31s`) with `animation-timing-function: ease-in-out` and `animation-iteration-count: infinite` and `animation-direction: alternate`. Colors are drawn exclusively from the expanded palette tokens: `pearl`, `alabaster`, `soft-slate` — no saturated colors, no blues, no purples. The total GPU cost must be negligible: use `will-change: transform` on each blob element and nothing else. The entire blob container must be wrapped in a `@media (prefers-reduced-motion: reduce)` check that sets `animation: none` on all blobs. The Marc Kuiper site (`https://www.marckuiper.com/?ref=minimal.gallery`) must be studied before implementation to calibrate the correct speed (very slow — full cycle should feel like breathing, approximately 15 to 30 seconds per loop), blur radius (heavy — the blobs are never identifiable as shapes), and opacity (very low — `0.4` to `0.6` maximum so the white canvas always dominates).

- [x] **Scroll-Linked Text Reveal — `functional-specification.md` §2 (Scroll Dynamics):** The "What I Actually Bring" (Diferencial) and "Beyond Code" paragraph text must be transformed into a line-by-line scroll reveal. Implementation approach: split each paragraph into individual line elements (either by sentence or by manually defined line breaks using `<span>` wrappers). Each line begins at `color: #D4D4D8` (zinc-300) and transitions to `color: #18181B` (zinc-900) as it enters the viewport. Transition is `color 400ms ease-out`. The `IntersectionObserver` for these elements uses a `threshold` of `0.8` (the line must be mostly visible before it activates) to create a tight, precise reveal synchronized with reading speed. Stagger delay between lines: `60ms` increments via inline `transition-delay`. The observer disconnects from each line after firing. On `prefers-reduced-motion: reduce`, all lines render at full `zinc-900` color immediately with no transition.

---

## 4. External Documentation / Inspirations

> ⚠️ **The implementing agent must open and read each of these URLs directly before writing any code.**

- **`https://www.marckuiper.com/?ref=minimal.gallery`:** The primary inspiration for the fluid ambient background. Open this URL, let the page fully load, and study the background motion for a minimum of 30 seconds before touching any code. Specifically observe: the speed of the movement (very slow, no urgency), the indistinguishability of individual blob shapes (total blur, no hard edges), the color range (barely off-white to very soft warm tones), and the fact that the background never draws the eye away from the foreground text. The implementation must produce this same atmospheric quality adapted to our Light Mode palette.

- **`https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes`:** Reference for the CSS `@keyframes` animation syntax used for the blob system. Study the `from` / `to` and percentage keyframe syntax, the `animation` shorthand property, and `animation-direction: alternate` which removes the need to manually reverse the motion at the end of each cycle.

- **`https://developer.mozilla.org/en-US/docs/Web/CSS/will-change`:** Reference for the `will-change: transform` optimization applied to blob elements. Understand both the benefit (promotes element to its own GPU compositing layer, eliminating paint cost on animation) and the cost (each `will-change` element consumes GPU memory). Use `will-change: transform` only on the blob elements — do not apply it speculatively to any other element in the codebase.

- **`https://developer.mozilla.org/en-US/docs/Web/CSS/filter`:** Reference for the `blur()` filter function applied to blob elements. Understand that `filter: blur(80px)` is a paint operation, not a compositing operation — it is more expensive than `transform`. Applying it to a static element that is then animated via `transform` is the correct performance pattern (paint the blur once, animate only the transform). Do not animate the `blur` value itself — it must remain fixed at `80px` throughout.

- **`https://tailwindcss.com/docs/adding-custom-styles`:** Reference for adding the new palette tokens to `tailwind.config.ts` under `theme.extend.colors` and for adding custom `@keyframes` animations under `theme.extend.keyframes` and `theme.extend.animation`. The blob animation keyframes should be defined here so they are available as Tailwind utility classes (e.g., `animate-blob-slow`) rather than inline styles.

- **`https://developer.mozilla.org/en-US/docs/Web/CSS/color`:** Reference for the `color` CSS transition used in the scroll-linked text reveal. Verify that `color` is a transitionable CSS property (it is) and that transitioning between two `rgb()` or hex values produces a smooth interpolation. Note that `transition: color 400ms ease-out` does not cause layout shift — color transitions are paint-only, not layout-affecting.

- **`https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion`:** Reference for the reduced motion CSS and JavaScript checks applied to both the blob animation system and the text reveal. The CSS safety net in `globals.css` must be extended: `@media (prefers-reduced-motion: reduce) { .blob-bg * { animation: none; } .line-reveal { color: #18181B; transition: none; } }`.

- **`https://react.dev/reference/react/StrictMode`:** Reference for understanding why certain side effects appear to run twice in development (`StrictMode` double-invokes effects). This is relevant to the `IntersectionObserver` setup for the text reveal — ensure the observer is correctly cleaned up in the `useEffect` return function so that `StrictMode` double-invocation does not attach two observers to the same elements.

---

## 5. Acceptance Criteria

**Lane 1 — Hotfixes:**

- [ ] No element anywhere in the Projects section (`03_source_code`) renders a purple, violet, indigo, or fuchsia color. A visual audit of the compiled page at `localhost:3000` confirms all project tags render with `bg-zinc-100 text-zinc-800` styling. A codebase search for Tailwind classes containing `purple`, `violet`, `indigo`, or `fuchsia` returns zero results in any component file under `src/`.
- [ ] The Precision Cursor Glow is visually detectable when the cursor moves over the Bento Grid section on a light background. The gradient uses `rgba(0,0,0,0.035)` at center and fades to `transparent`. The `--x` and `--y` CSS variables update correctly with cursor position. The glow remains invisible (not broken) on touch devices.
- [ ] Both Hero CTA buttons ("View Experience" and "How can I help") render with identical `border-radius`, `padding`, `font-size`, `font-weight`, and bounding box dimensions. Both have a defined `hover:` state with a `200ms ease-out` transition. The visual difference between them is limited to fill vs. outline treatment only.

**Lane 2 — New Features:**

- [ ] `tailwind.config.ts` contains the four new tokens under `theme.extend.colors`: `pearl: '#FCFCFC'`, `alabaster: '#F9FAFB'`, `soft-slate: '#F1F5F9'`, `zinc-mist: '#F4F4F5'`. Each major section (`Hero`, `Projects`, `About`, `Experience`, `Contact`) has a background color assigned from these tokens via Tailwind utility classes — no raw hex values in component files.
- [ ] The ambient blob background renders behind the Hero section content at `z-index: -1`. It contains 3 to 4 blurred blob elements with `filter: blur(80px)`, `will-change: transform`, and `opacity` between `0.4` and `0.6`. Each blob animates on an independent CSS `@keyframes` loop of 18 to 31 seconds duration using `animation-direction: alternate` and `ease-in-out` timing. The background never obscures or visually competes with the Hero headline text.
- [ ] The ambient background animation produces no audible fan spin or measurable CPU load increase on a mid-range laptop. A browser DevTools Performance recording over 5 seconds with the page idle shows no frames dropped below 60fps attributable to the background animation.
- [ ] When `prefers-reduced-motion: reduce` is active, all blob animations are `animation: none` and all blob elements are invisible or removed. The page remains fully functional and visually complete without the background animation.
- [ ] The "Diferencial" and "Beyond Code" paragraph text implements the scroll-linked color reveal. Lines begin at `color: #D4D4D8` and transition to `color: #18181B` over `400ms ease-out` with a `60ms` stagger between lines. The `IntersectionObserver` fires at `threshold: 0.8` and disconnects from each line after activating. On `prefers-reduced-motion: reduce`, all lines render at full `#18181B` immediately.
- [ ] Every `.map()` call introduced or modified in this milestone has an explicit `return` statement or uses a parenthesized arrow function. `npm run build` completes with zero TypeScript errors and zero ESLint warnings. No `Uncaught SyntaxError` or blank screen occurs at `localhost:3000` after the changes are applied.
- [ ] A Lighthouse CLS score of `0.00` is maintained after this milestone. No new layout shift is introduced by the blob system, the text color transitions, or the expanded palette background assignments.
