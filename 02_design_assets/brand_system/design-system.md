# Design System: Filipe Santana Portfolio

> **Implementation Note:** The portfolio currently renders in **Light Mode**. The color tokens below represent the aspirational dark palette defined in `globals.css`. Due to a known `@theme {}` scoping issue (Tailwind v4 directive in a v3 project), these CSS variables do not resolve in the browser cascade. Until the `@theme` block is migrated to `:root {}`, all components should use explicit Tailwind `zinc-*` / `white` / `black` classes instead of design token utilities (`bg-surface`, `text-text-primary`, etc.).

---

## 1. Color Palette

### Active (Light Mode — currently rendered)

| Role | Value | Tailwind Equivalent |
|---|---|---|
| Background | White (`#FFFFFF`) | `bg-white` |
| Surface (cards) | White / browser default | `bg-white` or `bg-zinc-50` |
| Borders | Browser default | `border-zinc-200` |
| Primary Text | Black / browser default | `text-zinc-900` |
| Secondary Text | Browser default gray | `text-zinc-500` |
| Tags (About) | `#F4F4F5` background, `#27272A` text | `bg-zinc-100 text-zinc-800` |
| Tags (Project cards) | Indigo tint | `bg-indigo-50 text-indigo-700` |

### Aspirational (Dark Mode — spec only, not yet rendered)

The following tokens are defined in `src/app/globals.css` inside `@theme {}` and will activate once migrated to `:root {}`:

| Token | Value | Role |
|---|---|---|
| `--color-background-base` | `#0A0A0A` | Deep dark base — allows screen boundaries to disappear |
| `--color-surface` | `#121212` | Card elevation above background |
| `--color-border` | `#27272A` | Subtle zinc dividers |
| `--color-text-primary` | `#FAFAFA` | High-contrast off-white headings |
| `--color-text-secondary` | `#A1A1AA` | Muted zinc for hierarchy |
| `--color-accent` | `#E4E4E7` | Micro-interactions and active states |
| `--color-white` | `#FFFFFF` | Pure white at opacity for overlays |

---

## 2. Typography System

* **Headings (Display Font):** **Geist Sans** (`--font-geist-sans`). Used for large weights in Hero, section titles, card headings. Clean geometric properties with tight tracking.
* **Body Copy:** **Inter** (`--font-inter`). Functional, legible. Applied to summaries, achievement lists, all long-form copy.
* **Tech Stack & Tags:** **Geist Mono** (`--font-geist-mono`). Applied to all tag pills — Core Technologies, Soft Skills, and project tech stacks — to visually reinforce engineering authority.

**Tailwind utilities:** `font-display`, `font-sans`, `font-mono` (all configured in `tailwind.config.ts`).

---

## 3. Bento Grid Structural Rules

* **Border Radius:**
  * Cards: `16px` (`rounded-card` token / `rounded-2xl` fallback)
  * Tags: `6px` (`rounded-tag` token / `rounded-md` fallback)
* **Gaps:** `24px` between Bento items on desktop (`gap-6`)
* **Card Padding:** `32px` inside project cards (`p-8`)
* **Hover Mechanics:**
  * Cards: `translateY(-2px)` + border color shift from `#27272A` to `#52525B`
  * Media layer: `opacity-0` → `opacity-100` over `300ms` + `scale-105` on the image
  * Card boundaries remain entirely static during hover

---

## 4. Motion & Scroll Guidelines

### Principles
* All animated properties are GPU-composited: `transform` and `opacity` only. Never `top`, `left`, `margin`, or `padding`.
* Easing: `ease-out` exclusively. No spring, bounce, or elastic curves (except the About tag snap-back, which uses `cubic-bezier(0.34, 1.56, 0.64, 1)` for a single constrained overshoot).
* All effects guard against `prefers-reduced-motion: reduce` (CSS layer) and `window.matchMedia("(prefers-reduced-motion: reduce)")` (JS layer).
* Pointer effects (cursor glow, magnetic tags) guard against `window.matchMedia("(hover: none)")` for touch devices.

### Scroll Reveal System (`.reveal` / `.is-visible`)

Defined in `src/app/globals.css`. Driven by `src/hooks/useIntersectionObserver.ts`.

```css
.reveal {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 500ms ease-out, transform 500ms ease-out;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

**One-shot behavior:** Each element fires once on viewport entry. Scrolling back past never re-hides the element.

**Stagger delays** (via `src/lib/utils.ts` `getStaggerDelay`): 50ms step, 150ms cap.

| Section | Stagger |
|---|---|
| Experience entries | Sequential: 0 / 50 / 100 / 150ms |
| Projects cards | Row-based: row 0 → 0ms, row 1 → 50ms, row 2 → 100ms |
| About sub-sections | Stats 0ms, Summary 50ms, Tech/Skills 100ms, Diferencial/Beyond 150ms |
| Contact | Single unit, 0ms |

### Cursor Glow (Projects Section)

A `position: fixed` `<div>` with `pointer-events: none` tracks the mouse via `requestAnimationFrame`. Fades in when cursor enters the Projects section, fades out on exit (`transition: opacity 300ms ease-out`).

* **Color (light mode):** `radial-gradient(200px circle, rgba(0,0,0,0.03), transparent 70%)`
* **Color (dark mode, future):** `radial-gradient(200px circle, rgba(255,255,255,0.04), transparent 70%)`
* Disabled when `hover: none` or `prefers-reduced-motion`.

### Counter Animation (About Section)

Fires once when the stats row enters the viewport. Cubic ease-out over 1200ms via `requestAnimationFrame`. Values: 8 / 17 / 4. Immediately shows final values under `prefers-reduced-motion`.

### Magnetic Tag Repulsion (About Section)

Both Core Technologies and Soft Skills tags (25 total) repel the cursor within a 60px radius. Max displacement ±6px. Snap-back transition: `transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)`. Read-before-write rAF pattern prevents layout thrashing. Disabled when `hover: none` or `prefers-reduced-motion`.

---

## 5. Component Inventory

| Component | Section | File |
|---|---|---|
| `Hero` | Hero | `sections/Hero.tsx` |
| `Projects` | Projects Bento Grid | `sections/Projects.tsx` |
| `ProjectCard` | Card within grid | `sections/Projects.tsx` |
| `ProjectModal` | Detail overlay | `modals/ProjectModal.tsx` |
| `Experience` / `ExperienceItem` | Experience timeline | `sections/Experience.tsx` |
| `About` | About + Diferencial | `sections/About.tsx` |
| `Contact` | Contact links | `sections/Contact.tsx` |
| `TopBar` | Fixed navigation | `layout/TopBar.tsx` (approx.) |

---

## 6. Known Implementation Gaps

| Gap | Impact | Path to Fix |
|---|---|---|
| `@theme {}` CSS var scoping | Design tokens don't resolve; page renders white | Migrate `@theme {}` → `:root {}` in `globals.css` when dark mode is adopted |
| `.mov` video format | Hover autoplay fails on Chrome/Firefox | Convert to `.mp4` + WebM |
| `bg-surface`, `border-border`, `rounded-card` tokens | Resolve to browser defaults | Same fix as `@theme` above |
