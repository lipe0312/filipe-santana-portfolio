---
date: 2026-06-04
topic: Project Modals & Hover Mechanics
status: complete
tags: [research, portfolio, frontend]
---

# Research: Project Modals & Hover Mechanics

## 1. Design & External Context Summary

### Strategy Docs Evaluated
1. **design-system.md**:
   - Color palette (monochromatic dark mode)
   - Typography (Geist/Inter, monospace for tech tags)
   - Motion guidelines (no bouncy animations, smooth easing)

2. **functional-specification.md**:
   - **Bento Grid Hover Engine**:
     - Resting state: `background: #121212`, `border: 1px solid #27272A`, `border-radius: 16px`
     - Hover state: border color to `#52525B`, card `translateY(-2px)`, media layer `opacity: 1` and `scale: 1.05`, gradient overlay `opacity: 1`
     - All transitions: `300ms ease-out`
     - Card container must have `overflow: hidden`
   - **Video Autoplay Logic**:
     - `<video>` attributes: `muted`, `loop`, `playsinline`, `preload="none"`
     - On `mouseenter`: call `video.play()`
     - On `mouseleave`: call `video.pause()`, then `video.currentTime = 0` after `300ms`
   - **Touch Devices**:
     - Media layer at static `opacity: 0.3` (detected via `@media (hover: none)`)
     - No hover lifecycle
   - **Project Detail View (Modal)**:
     - Uses `ReactDOM.createPortal` to render into `document.body`
     - Desktop expansion: capture `getBoundingClientRect()`, animate from card position to full screen (`width: 100vw`, `height: 100dvh`, `top: 0`, `left: 0`, `border-radius: 0`) over `400ms` with `cubic-bezier(0.32, 0, 0, 1)`
     - Modal content fades in at `350ms` into animation
     - Mobile fallback: slides up from bottom (`translateY(100%) → translateY(0)`) over `350ms`
     - Scroll lock: `overflow: hidden` on `document.body` while modal is open
     - Accessibility: `role="dialog"`, `aria-modal="true"`, focus trap, `Escape` key listener, focus returns to originating card on close

3. **portfolio-architecture-model.md**:
   - Modal content reads from `projects.ts` data layer
   - No content hardcoded in modal component

### External Docs Synthesized
1. **Framer Motion (layout animations & AnimatePresence)**:
   - `layoutId` prop: automatically animates shared elements between states
   - `AnimatePresence`: manages exit animations for components being removed
   - `transition` prop: customizes animation duration and easing
   - Can animate to/from full screen for modal expansion
   - High performance, uses CSS transforms under the hood
   - Automatically corrects for scale distortion on border-radius and box-shadow

2. **GSAP fromTo**:
   - Alternative for manual animation control
   - Uses `getBoundingClientRect()` to capture start position
   - Can animate from card dimensions to full screen
   - Supports `cubic-bezier(0.32, 0, 0, 1)` easing

3. **MDN - video element**:
   - `<video>` attributes: `muted`, `loop`, `playsinline`, `preload="none"` are required
   - `preload="none"` minimizes initial load by not fetching any video data until user interaction

4. **MDN - HTMLMediaElement.play()**:
   - Returns a Promise that resolves when playback starts
   - Must handle rejection (e.g., autoplay blocked by browser)
   - Rapid hover-in/out can cause AbortError, which should be silently caught

5. **MDN - getBoundingClientRect()**:
   - Returns element's position and dimensions relative to viewport
   - Includes padding and border-width
   - Values change with scroll position
   - To get position relative to document: add `window.scrollX`/`window.scrollY`

6. **MDN - @media (hover: none)**:
   - Detects if primary input mechanism cannot conveniently hover
   - Used to apply static media layer opacity on touch devices

7. **React - createPortal**:
   - Renders children into a different DOM node (e.g., `document.body`)
   - Events still bubble through React tree, not DOM tree
   - Useful for modals to escape overflow containers and stack correctly

8. **focus-trap-js/focus-trap-react**:
   - Reliable library for trapping focus inside modals
   - Manages tab/shift-tab cycling
   - Accessibility best practice

## 2. Current State Analysis (by Domain)

### Core UI Components
- **Location**:
  - `src/components/sections/Projects.tsx`: Bento grid and project cards
  - `src/data/projects.ts`: Project data layer

- **Description**:
  - Static bento grid with 8 projects
  - Project cards include: tech tags, project name, one-liner
  - Media layer (image) is hidden by default, shows on hover with scale effect
  - Basic hover effects implemented (border color, translateY, media opacity/scale)
  - No video support yet
  - No modal functionality

- **Key Intersections**:
  - Uses Next.js Image component for media
  - Uses Tailwind CSS with design tokens from `tailwind.config.ts`
  - Uses `useIntersectionObserver` for scroll reveal
  - Uses `getStaggerDelay` for row-based staggered animations

### Styling & Theming
- **Location**:
  - `src/app/globals.css`: Global styles and reveal classes
  - `tailwind.config.ts`: Tailwind configuration and design tokens

- **Description**:
  - Tailwind configured with custom design tokens
  - `@theme` block in globals.css (not applied by Tailwind v3)
  - Current UI in Light Mode (user preference)

- **Key Intersections**:
  - Uses `bg-surface`, `border-border`, `rounded-card`, `text-text-primary`, `text-text-secondary` tokens
  - `@media (hover: hover)` can be used for hover-specific styles
  - `@media (hover: none)` for touch device fallback

### Motion & Animation
- **Location**:
  - `src/hooks/useIntersectionObserver.ts`: Scroll reveal logic
  - `src/lib/utils.ts`: `getStaggerDelay` function

- **Description**:
  - Basic CSS transitions for hover effects
  - Intersection Observer for scroll reveals
  - No Framer Motion or GSAP currently installed

- **Key Intersections**:
  - Current hover effects use `transition-[border-color,transform] duration-300 ease-out`
  - Media layer uses `transition-opacity duration-300 ease-out`
  - Good foundation for adding Framer Motion

## 3. Architecture & Rendering Impact

- **React 18 / Next.js 14**:
  - `Projects.tsx` is already a client component (`"use client"` directive)
  - Perfect for adding interactive state and Framer Motion
  - `createPortal` can be used in client components

- **Data Layer**:
  - `projects.ts` already contains all required data for modal (status, date, heroMediaPath, theProblem, theSolution, externalLinks)
  - No changes needed to data layer

- **Dependencies**:
  - Need to install `framer-motion` (recommended over GSAP for shared element transitions)
  - May need to install `focus-trap-react` for accessibility

- **Accessibility**:
  - Must implement focus trap
  - Must handle `Escape` key
  - Must return focus to originating card
  - Must set proper ARIA attributes

## 4. Open Questions & Ambiguities

1. **Video Media Support**:
   - The current `projects.ts` defines `heroMediaPath` but it's for images
   - How to determine if a project uses image or video?
   - Will we need to update the `Project` interface in `projects.ts`?

2. **Design System Deviations**:
   - The current UI is in Light Mode (user preference from previous handoff)
   - Should we maintain Light Mode or switch to Dark Mode as defined in design-system.md?
   - Previous handoff mentions "no forced dark-mode color overrides"

3. **Modal Hero Media**:
   - Should the modal hero support both images and videos?
   - If video, should it autoplay in the modal?

4. **External Links Styling**:
   - The functional spec says "external text links" with "↗" prefix
   - Should these be styled with specific Tailwind classes?
   - Should they open in new tabs?

