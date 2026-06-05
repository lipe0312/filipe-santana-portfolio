# Functional Specification: Filipe Santana Portfolio
> This document defines the complete interactive behavior, motion rules, responsive logic, and state management for the portfolio. All specifications are derived from and must remain consistent with `design-system.md`. This is the single source of truth for how the site *feels*.

---

## 1. Navigation & Top Bar Behavior

### Structure
The Top Bar is a fixed element (`position: fixed; top: 0; z-index: 50`) spanning the full viewport width. It contains the name logotype on the left and anchor links on the right.

### Scroll State Machine
The Top Bar operates across three distinct states driven by the `scrollY` position:

| State | Trigger | Visual |
|---|---|---|
| `idle` | `scrollY === 0` | Fully transparent background, no blur |
| `scrolled` | `scrollY > 60px` | `background: rgba(10,10,10,0.75)`, `backdrop-filter: blur(16px)`, `border-bottom: 1px solid #27272A` |
| `hidden` | Scrolling down and `scrollY > 300px` | `transform: translateY(-100%)` |
| `visible` | Scrolling up at any position | `transform: translateY(0)` |

All state transitions use `transition: transform 300ms ease-out, background 200ms ease-out`.

The scroll direction is detected by comparing the current `scrollY` value against the value stored in a `lastScrollY` ref on each scroll event. Throttle the scroll listener to fire at most once per 16ms (one animation frame) to prevent performance degradation.

### Active Link State
The link corresponding to the section currently occupying the top 40% of the viewport receives an `active` class. This triggers a color shift from `#A1A1AA` to `#FAFAFA` with `transition: color 200ms ease-out`. No underlines, no borders — color shift only.

### Smooth Scrolling
All anchor links use native `scroll-behavior: smooth` declared on the `html` element, with a programmatic override using `element.scrollIntoView({ behavior: 'smooth', block: 'start' })` for precise offset control. Apply a fixed offset of `80px` to account for the Top Bar height so section headings are never obscured on arrival.

---

## 2. Scroll Dynamics & Viewport Reveal System

### Core Principle
Every major content block enters the viewport once and settles into its resting state permanently. There are no looping animations, no re-triggering on scroll-up, and no staggered chaos. Motion is earned.

### Implementation
Use an `IntersectionObserver` with a `threshold` of `0.12` (the element is 12% visible before the animation fires). Each observed element begins in a hidden state defined by:

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
```

### Section-Level Stagger Rules
Within a section, child elements stagger with a `50ms` delay increment applied via inline `transition-delay`. Maximum stagger chain is 4 elements. Beyond 4, all remaining elements share the delay of the fourth to avoid a parade effect.

| Element Type | Delay |
|---|---|
| Section label / eyebrow text | `0ms` |
| Primary heading | `50ms` |
| Body copy or summary | `100ms` |
| CTA buttons or tag rows | `150ms` |

### Per-Section Behavior

**Hero:** No scroll reveal. The Hero section is immediately visible on load. The headline and sub-headline use a single `opacity: 0 → 1` fade over `600ms` with `ease-out`, triggered on `DOMContentLoaded`. No `translateY` on the Hero — it must feel planted and confident, not like it floated in.

**Projects (Bento Grid):** Cards reveal as a group with a unified `translateY(14px) → translateY(0)` and `opacity` fade. Cards in the same visual row share the same `transition-delay` tier. Do not stagger individual cards within a row — stagger rows.

**Experience:** Each Experience block reveals sequentially with `50ms` between entries, top to bottom.

**About:** The Executive Summary, technology tags, and Diferencial block each fire as independent reveal groups as the user scrolls through the section.

**Gallery:** Images reveal with a faster, lighter fade only (`opacity: 0 → 1` over `400ms`, no `translateY`) to preserve the horizontal rhythm of the grid.

---

## 3. Bento Grid Hover Engine

### Card Resting State
Each project card rests at `background: #121212`, `border: 1px solid #27272A`, `border-radius: 16px`. The background media layer (image or video) exists inside the card at all times but sits at `opacity: 0` and `scale: 1`.

### Hover State Sequence
All transitions on the card are governed by a single CSS `transition` declaration to ensure GPU compositing handles the work:

```css
.project-card {
  transition:
    border-color 300ms ease-out,
    transform 300ms ease-out;
}

.project-card__media {
  transition:
    opacity 300ms ease-out,
    transform 300ms ease-out;
}

.project-card:hover {
  border-color: #52525B;
  transform: translateY(-2px);
}

.project-card:hover .project-card__media {
  opacity: 1;
  transform: scale(1.05);
}
```

The card container has `overflow: hidden` to clip the `scale(1.05)` of the media without expanding the card boundaries. The card itself never scales — only the internal media element does.

A dark gradient overlay (`background: linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)`) sits above the media layer at all times at `opacity: 0`, transitioning to `opacity: 1` simultaneously with the media fade-in. This ensures the card's text (name, one-liner, tags) remains legible against the background visual.

### Video Autoplay Logic
For cards with looping video as their hover media:

- The `<video>` element is rendered with `muted`, `loop`, `playsinline`, and `preload="none"` attributes.
- On `mouseenter`, call `video.play()` programmatically.
- On `mouseleave`, call `video.pause()` followed by `video.currentTime = 0` after the opacity transition completes (300ms delay via `setTimeout`).
- This ensures video memory and CPU resources are consumed only during active hover, not across all cards simultaneously.

### Touch Devices
On touch devices (`hover: none` media query), the hover state is replaced by a persistent 30% opacity media layer that gives mobile users a visual hint of the project content without requiring hover. Cards remain fully tappable.

---

## 4. Project Detail View

### Interaction Model: Fullscreen Modal
Clicking a project card opens a fullscreen modal overlay. A sliding drawer is rejected — it implies partial content and feels incomplete for the case-study depth this portfolio requires. A new route is also rejected to avoid page reload friction. The modal is the correct pattern.

### Opening Animation
The modal opens from the clicked card's position using a shared-element-style transition:

1. On click, capture the card's `getBoundingClientRect()`.
2. The modal begins at the card's exact `top`, `left`, `width`, and `height` values with `border-radius: 16px`.
3. Over `400ms` with `cubic-bezier(0.32, 0, 0, 1)`, the modal expands to `width: 100vw`, `height: 100dvh`, `top: 0`, `left: 0`, and `border-radius: 0`.
4. The modal content (copy, media, links) fades in only after the expansion animation completes, at `350ms`.

Closing is the reverse: content fades out first, then the modal collapses back to the card's original bounding box before disappearing. Total close duration: `350ms`.

### Modal Structure & Content Layout
The modal background is `#0A0A0A`. Content is constrained to a `max-width: 780px` centered column with `padding: 64px 32px` on desktop, `padding: 32px 16px` on mobile.

Content order within the modal, top to bottom:

1. **Close button** — top-right, `position: sticky`, `color: #A1A1AA`, transitions to `#FAFAFA` on hover. A plain `✕` character in Geist Mono, no icon libraries.
2. **Project status badge** — small tag in Geist Mono (e.g., `[ Proof of Concept ]` or `[ Operational ]`).
3. **Project name** — Display heading in Geist or Inter Tight, large weight.
4. **Hero media** — full-width image, GIF, or video player with native controls. `border-radius: 12px`.
5. **The Problem** — section with an eyebrow label in `#A1A1AA` followed by body copy in Inter.
6. **The Solution** — same structure. Technical architecture described in plain prose, with tech stack tags inline.
7. **External links** — minimal text buttons: `↗ View on GitHub`, `↗ Live Deploy`, `↗ LinkedIn Post`. No filled button styles inside the modal — text links only.

### Scroll Lock
When the modal is open, apply `overflow: hidden` to `document.body` to prevent background scroll. Restore on close.

### Keyboard & Accessibility
- `Escape` key closes the modal.
- Focus is trapped inside the modal while open (Tab cycles only through modal-internal elements).
- The triggering card receives focus on modal close.
- Modal root has `role="dialog"` and `aria-modal="true"`.

---

## 5. Responsiveness & Breakpoints

### Breakpoint Scale

| Name | Min Width | Context |
|---|---|---|
| `mobile` | `0px` | Single column, full width |
| `tablet` | `768px` | Two-column layouts begin |
| `desktop` | `1024px` | Full Bento Grid, three columns |
| `wide` | `1280px` | Max content width capped, spacing increases |

All layout logic is written mobile-first. The `max-width` of the content container is `1200px`, centered with `margin: 0 auto`.

### Bento Grid Collapse

| Breakpoint | Grid Columns | Gap |
|---|---|---|
| `mobile` | 1 column | `16px` |
| `tablet` | 2 columns | `20px` |
| `desktop` | 3 columns (default) or 2+1 asymmetric | `24px` |

Featured projects (e.g., the primary project card) may span 2 columns on desktop using `grid-column: span 2`. On tablet and mobile, all cards revert to full width regardless of their desktop span.

### Typography Scale

| Element | Mobile | Tablet | Desktop |
|---|---|---|---|
| Hero Headline | `2.5rem` / `40px` | `3.5rem` / `56px` | `5rem` / `80px` |
| Section Heading | `1.75rem` / `28px` | `2.25rem` / `36px` | `2.75rem` / `44px` |
| Body Copy | `0.9375rem` / `15px` | `1rem` / `16px` | `1rem` / `16px` |
| Tags / Mono | `0.75rem` / `12px` | `0.8125rem` / `13px` | `0.8125rem` / `13px` |

Line heights: `1.15` for display headings, `1.7` for body copy.

### Navigation on Mobile
The horizontal nav links collapse into a hamburger trigger on `mobile` and `tablet` breakpoints. The menu opens as a full-screen overlay (`background: #0A0A0A`, `z-index: 100`) with nav links displayed as large, tappable vertical items. Opening and closing uses `opacity` and `translateY` transitions over `300ms`.

### Project Modal on Mobile
On `mobile`, the modal does not animate from the card position. It slides up from the bottom of the screen (`translateY(100%) → translateY(0)`) over `350ms` with `cubic-bezier(0.32, 0, 0, 1)`, functioning as a bottom sheet that expands to full screen. This is more reliable and performant on small viewports.

---

## 6. Innovation Suggestions

### 1. Precision Cursor Glow (Desktop Only)
A faint radial glow follows the cursor exclusively within the Bento Grid section. Implemented as a single `div` with `pointer-events: none`, `position: fixed`, `background: radial-gradient(200px circle at var(--x) var(--y), rgba(255,255,255,0.04), transparent)`. The `--x` and `--y` CSS variables are updated via a throttled `mousemove` listener. The glow is subtle enough to be subliminal — it makes the grid feel alive without being identifiable as an effect. Disable entirely on touch devices and on `prefers-reduced-motion: reduce`.

### 2. Typewriter Precision Counter on the About Section
Rather than a static number, key quantitative facts in the About section (e.g., number of projects, years of research) count up from zero to their final value as the section enters the viewport. The counter increments using `requestAnimationFrame` over a `1200ms` duration with an `ease-out` curve (increments are larger at the start and slow as they approach the final number). This is the Linear.app approach to data: make numbers feel earned, not static.

### 3. Magnetic Tag Repulsion on Hover
The technology tags in the About section respond to cursor proximity. When the cursor approaches within `60px` of a tag, the tag gently shifts its `transform: translate()` away from the cursor by a maximum of `6px`, then snaps back elastically on `mouseleave`. Implemented via `mousemove` distance calculations against each tag's `getBoundingClientRect()`. The effect is physically plausible, restrained, and entirely unique — it makes the skills section interactive without adding a single unnecessary visual element. Disable on touch and `prefers-reduced-motion`.