# Project State — Executive Summary

Overview

- A motion-forward, modern portfolio site implemented with Next.js and TypeScript. The UI is designed for rich interactions, subtle motion, and a responsive Bento Grid layout for project discovery.

Key Implemented Features

- Bento Grid UI for project cards with hover previews and modal detail views.
- Magnetic tag repulsion interactions and tag motion inside modals and cards.
- Global custom cursor implemented via a small `GlobalCursor` client component using `requestAnimationFrame` for smooth movement.
- Infinite horizontal gallery marquee for images and interleaved videos.
- i18n translation engine with Context-based language switching (English and Portuguese entries supported via `LanguageSwitcher` and `LanguageContext`).

Architecture Highlights

- Separation of concerns: static data is kept under `03_source_code/src/data/`, UI lives in `03_source_code/src/components/`, and pages/layout live under `03_source_code/src/app/`.

Current Scope & Next Steps

- Core content sections are scaffolded: Hero, Projects, Experience, About, Gallery, and Contact.
- Next steps prioritize completing project modal media playback, finalizing design tokens, and running a performance/a11y audit prior to deployment.

4. ## Comprehensive Component & Module Directory
   This section maps the files and modules present under `03_source_code/` (only files provided in current context). Each entry covers: Purpose & Role, State & Context Dependencies, Motion UI & Interaction Layer, and i18n Compliance.

- `src/app/layout.tsx`
  - Purpose & Role: Root application layout and global wrapper. Imports global fonts and CSS (`globals.css`), inserts the film-grain overlay, mounts `GlobalCursor`, and provides language context via `LanguageProvider`. Renders the `TopBar` and wraps page `children`.
  - State & Context Dependencies: Uses `LanguageProvider` to establish translation context for child components. No internal state beyond rendering.
  - Motion UI & Interaction Layer: Hosts the fixed `grain-overlay` visual and ensures global client components like `GlobalCursor` and `TopBar` are present for page-level motion and interactions.
  - i18n Compliance: Serves as the top-level provider for translations; all UI components access translations through the provided context.

- `src/app/globals.css`
  - Purpose & Role: Tailwind base/components/utilities layering and global CSS custom properties. Defines design tokens (colors, radii, spacing), shared utility classes `.reveal`, `.line-reveal`, blob background utilities, film-grain overlay, card glow/spotlight styles, gallery marquee keyframes, and motion-reduction fallbacks.
  - State & Context Dependencies: Pure CSS; no JS state. Uses CSS custom properties that components set or read (e.g., `--mouse-x`, `--mouse-y`).
  - Motion UI & Interaction Layer: Declares foundational animation/keyframe primitives referenced by components: scroll reveal transitions (`.reveal`), blob drifting animations, radial spotlight glow on cards, gallery marquee animation, and film-grain overlay blending.
  - i18n Compliance: Not applicable (presentation only).

- `src/components/GlobalCursor.tsx`
  - Purpose & Role: Implements a lightweight, client-only custom cursor element that follows the pointer for a subtle UI accent.
  - State & Context Dependencies: No translation context. Guards against touch/no-hover environments and `prefers-reduced-motion`. Uses internal refs for DOM node and rAF-managed coordinates.
  - Motion UI & Interaction Layer: Uses `requestAnimationFrame` to smoothly interpolate (`currentX/currentY` toward `targetX/targetY`) and update `transform` on a 32px circular element. Starts invisible and fades in on first mouse movement.
  - i18n Compliance: Not applicable.

- `src/components/LanguageSwitcher.tsx` (+ `MobileLangPicker`)
  - Purpose & Role: UI to choose application language. Provides a compact flag trigger for TopBar and a small inline picker for mobile overlays.
  - State & Context Dependencies: Consumes `useLanguage()` from `LanguageContext` to read/set `language`. Maintains `isOpen` state for the dropdown and uses a close timer to make hover interactions forgiving.
  - Motion UI & Interaction Layer: Animates panel visibility with CSS transforms and opacity; uses small hover timeouts. Uses dual-render patterns (flag + optional label) and applies concise className toggles rather than template literals.
  - i18n Compliance: Directly mutates language state; callers should ensure translation dictionary entries exist for both locales when adding keys.

- `src/components/TopBar.tsx`
  - Purpose & Role: Fixed responsive header with logo and primary navigation. Manages a 3-state scroll machine (transparent, blurred with border, hidden on downward scroll) and computes the active section for in-view highlighting.
  - State & Context Dependencies: Uses `useTranslations()` to render nav labels; keeps internal state `isScrolled`, `isHidden`, and `activeSection`. Uses `navLinks` as canonical nav mapping.
  - Motion UI & Interaction Layer: Uses `requestAnimationFrame` to throttle scroll handling, toggling className transforms for show/hide; also observes section visibility via `IntersectionObserver` to set `activeSection`. Contains a small mouse-move handler to reveal bar when cursor enters top 20px.
  - i18n Compliance: All link labels are produced with `useTranslations()` using keys like `nav.projects`.

- `src/components/MobileNav.tsx`
  - Purpose & Role: Full-screen mobile navigation overlay; mirrors `TopBar` navigation for small screens and hosts `MobileLangPicker`.
  - State & Context Dependencies: Uses `useTranslations()` for labels; `isOpen` local state controls overlay visibility.
  - Motion UI & Interaction Layer: Overlay opens/closes with simple conditional rendering; nav items use dual-span sliding text transforms (top→bottom) to provide motion without JS animation loops. Scrolling to sections uses computed top offsets (subtracts 80px header offset).
  - i18n Compliance: Uses translation keys for link labels.

- `src/components/modals/ProjectModal.tsx`
  - Purpose & Role: Focus-trapped project detail modal with backdrop, portal rendering, and media support (images/videos). Handles scroll lock, Escape key to close, and returns focus to the triggering element.
  - State & Context Dependencies: Accepts `project`, `cardRect`, `onClose`, and `triggerElement` props. Uses `useTranslations()` for localized field labels inside the modal.
  - Motion UI & Interaction Layer: Renders animated backdrop and exit/enter transitions via `framer-motion` (`AnimatePresence` and `motion.div` indicated). Implements magnetic tag repulsion via `requestAnimationFrame` while modal is open; rAF loop computes tag offsets and writes transforms. Scroll lock implemented by setting `document.body.style.overflow = 'hidden'` while open.
  - i18n Compliance: Modal copies use translation keys mapped through the `LanguageContext`.

- `src/components/sections/Hero.tsx`
  - Purpose & Role: Top landing section with headline, name, subtitle, and CTAs. Contains the ambient blob backgrounds and bottom fade into Projects.
  - State & Context Dependencies: Uses `useTranslations()` for `hero.headline`, `hero.subtitle.role`, and CTA labels. Tracks `isLoaded` state to fade-in content once DOM is ready.
  - Motion UI & Interaction Layer: Uses `requestAnimationFrame` for initial micro-delay loading animation; CTA buttons implement a dual-span slide technique (text sliding top→bottom or bottom→top on hover) entirely with CSS transforms. Scroll-to behavior for navigation anchors subtracts 80px offset to account for header.
  - i18n Compliance: Pulls headline, subtitle, and CTA labels from translations; adding new hero copy requires adding matching translation keys.

- `src/components/sections/Projects.tsx` and `ProjectCard`
  - Purpose & Role: Core Bento Grid engine rendering project cards and orchestrating project detail modal opening.
  - State & Context Dependencies: Uses `useTranslations()` for labels, keeps `activeProject`, `activeCardRect`, `activeTriggerEl` state, and detects touch via `window.matchMedia('(hover: none)')` to change hover behavior.
  - Motion UI & Interaction Layer: Project cards use reveal intersection observers, hover spotlight (CSS radial gradients controlled via CSS variables `--mouse-x/--mouse-y`), and video autoplay timing handled in hover enter/leave callbacks. Magnetic tag repulsion and tag transforms are computed in an rAF-throttled mousemove handler similar to the modal and About page. Cards update `--mouse-x`/`--mouse-y` on `mousemove` for local radial effects.
  - i18n Compliance: Project content titles/one-liners map to translation keys (see `translations.ts`); new project entries must be added to both the `projects.ts` data and the translations file.

- `src/components/sections/Experience.tsx`
  - Purpose & Role: Chronological experience timeline. Renders a list of `ExperienceItem` entries derived from a static `experiences` array that references translation keys.
  - State & Context Dependencies: Uses `useTranslations()` to resolve each `experience.*` translation key. Each `ExperienceItem` manages `isExpanded` local state to show/hide achievement lists and uses a `useIntersectionObserver` hook to apply `.reveal` class when visible.
  - Motion UI & Interaction Layer: Reveal transitions use CSS `.reveal` class toggles and per-item `transitionDelay` computed via a staging function (`getStaggerDelay`). The mobile-only expand indicator uses a transform rotation toggled via string concatenation (no template literal interpolation inside `className`) to avoid rendering bugs.
  - i18n Compliance: All content is key-based (`experience.roleN.*` and `experience.roleN.aX`). To add a role, add translation entries for those keys (see Maintenance guide).

- `src/components/sections/About.tsx`
  - Purpose & Role: Executive summary with counters, technology tags, soft-skill tags, and descriptive paragraphs that reveal on scroll.
  - State & Context Dependencies: Uses `useTranslations()` for section strings and `useIntersectionObserver()` multiple times for staggered reveals (`statsRevealRef`, `summaryRef`, `techRef`, `diferencialRef`, `beyondRef`). Holds `counterRefs`, `tagRefs`, and `gridContainerRef` for DOM interactions.
  - Motion UI & Interaction Layer: Implements a one-shot counter animation that increments numeric values when the stats row intersects the viewport (rAF-managed); magnetic tag repulsion computed with rAF similar to `ProjectModal` and `ProjectCard`; pixel grid highlight that tracks mouse position via CSS variables and masks; and a line-reveal observer to animate paragraph lines.
  - i18n Compliance: Counters and descriptive paragraphs use translation keys (e.g., `about.counter.*`, `about.summary.p1`, `about.diferencial.*`). Add translation entries when modifying copy.

- `src/components/sections/Gallery.tsx`
  - Purpose & Role: Infinite horizontal gallery / marquee for photos and occasional videos; responsive behavior provides a mobile snap-scroll alternative.
  - State & Context Dependencies: Uses `useTranslations()` for the section label and a `useIntersectionObserver()` reference to lazy-start or pause animations based on visibility. Maintains refs for desktop container (`desktopRef`), mobile container (`mobileContainerRef`), item refs, and `isPausedRef` to coordinate auto-scroll.
  - Motion UI & Interaction Layer: Implements an auto-scroll loop using `requestAnimationFrame` that increments `scrollLeft` at `SCROLL_SPEED`. Normalizes scroll position to keep values within the doubled-marker seam. Pauses on hover/interaction and resumes with a delayed timer. Mobile uses snap/center detection via scroll events and touch handlers.
  - i18n Compliance: Section heading/labels should be added to translations when changing copy. Media items are referenced with relative `public/` paths.

- `src/components/sections/Contact.tsx`
  - Purpose & Role: Contact utility section with actionable links (email, LinkedIn, GitHub) presented as dual-span sliding buttons.
  - State & Context Dependencies: Uses `useTranslations()` and `useIntersectionObserver()` for reveal behavior.
  - Motion UI & Interaction Layer: Each contact link renders three text spans that slide on hover to create a vertical text slide effect. Buttons use CSS transitions and group-hover transforms — no rAF loops.
  - i18n Compliance: Uses translation keys `contact.heading` and `contact.subheading`.

- `src/data/projects.ts`
  - Purpose & Role: Project data schema and exported project records. Includes a `ProjectStatus` discriminated union and `Project` interface describing media, short descriptions, statuses and external links.
  - State & Context Dependencies: No runtime state; consumed by `Projects.tsx` and `ProjectModal.tsx`.
  - Motion UI & Interaction Layer: Not applicable; provides data that drives UI components with hover/video timings and media paths.
  - i18n Compliance: Project UI texts often rely on translation keys in `translations.ts`; project data should contain references or slugs that map to those keys.

- `src/i18n/translations.ts`
  - Purpose & Role: Central TypeScript-typed translation key union and `getTranslations(lang)` function to map localized strings. Defines keys for nav, hero, projects, modal fields, status labels, experience entries, about counters and paragraphs, and contact headings.
  - State & Context Dependencies: Used by `LanguageContext` and `useTranslations()` to resolve strings for components.
  - Motion UI & Interaction Layer: Not applicable.
  - i18n Compliance: This is the authoritative list of translation keys; when adding UI text or new content, add keys here and provide language mapping in `getTranslations`.

- Infrastructure / Utilities (present but implementation not included in provided files)
  - `src/hooks/useIntersectionObserver.ts` — Hook used widely across sections to detect visibility and apply `.reveal` classes. Expected to provide `{ ref, isVisible }` tuple.
  - `src/context/LanguageContext.tsx` — Provides `LanguageProvider`, `useLanguage`, and `useTranslations()` to localize UI. `layout.tsx` imports and uses `LanguageProvider`.
  - `src/lib/utils.ts` — Utility helpers (stagger mathematics, small DOM helpers) referenced across UI modules.
  - Notes: Implementations of the three files above were not included in the review set; their interfaces and usage patterns are inferred from the components that consume them. Confirm exact exported signatures before making instrumented changes.

5. Minimal Roadmap & Operational Notes

- Preserve the existing `className` string concatenation patterns in `Experience.tsx` and other components: avoid template literals that interpolate dynamic variables inside JSX `className` props to prevent the known rendering bug. See `AI_CONSTRAINTS.md` for the formal rule.
- When adding new translation keys, update `src/i18n/translations.ts` and the `getTranslations` mapping to avoid runtime missing-key errors.
- Motion-heavy features (cursor, gallery marquee, magnetic tags) use `requestAnimationFrame` and rAF-throttled handlers — ensure `prefers-reduced-motion` and `(hover: none)` paths are respected for accessibility.

This file documents the current implementation surface as provided. If you want, I can next:

- Expand the `src/i18n/translations.ts` `getTranslations` entries for a new locale, or
- Run a focused static check (TypeScript type-check / ESLint) for the changed docs and constraints.
