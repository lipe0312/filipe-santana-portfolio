
---
date: 2026-06-03
topic: "Core Layout & Dynamic Navigation"
status: complete
tags: [research, portfolio, frontend]
---

# Research: Core Layout & Dynamic Navigation

## 1. Design & External Context Summary

### Strategy Docs Evaluated
- **`02_design_assets/brand_system/functional-specification.md`**: Defines the complete interactive behavior including scroll state machine (idle, scrolled, hidden, visible) with thresholds at 60px (scrolled) and 300px (hidden), active link detection with IntersectionObserver using top 40% of viewport, and mobile navigation with full-screen overlay.
- **`02_design_assets/brand_system/design-system.md`**: Defines the color palette (#0A0A0A background, #FAFAFA primary text, #A1A1AA secondary text), typography (Geist, Inter, Geist Mono), and spacing system.
- **`01_strategy/copy-content.md`**: Provides the exact nav links (Experience, Projects, About, Contact, Gallery) and logotype text (Filipe Santana).

### External Docs Synthesized
- **Next.js Layouts & Pages**: Confirmed root layout should contain persistent Top Bar component to avoid remounting on route changes.
- **`Element.scrollIntoView()`**: To be used with `{ behavior: 'smooth', block: 'start' }` and proper scroll offset to account for fixed Top Bar (80px height).
- **Intersection Observer API**: To be used for active link detection with appropriate thresholds.
- **Window.scrollY**: For tracking scroll position to determine Top Bar state transitions.
- **Tailwind Backdrop Blur**: `backdrop-blur-lg` provides 16px blur which matches the spec.
- **Matheus Scatolin Portfolio**: Reference for spatial discipline, typographic weight, and navigation structure.

## 2. Current State Analysis (By Domain)

### Core UI Components
- **Location**: `03_source_code/src/components/` (currently no components exist)
- **Description**: The Top Bar and Mobile Navigation components need to be created from scratch.

### Routing & Layout
- **Location**: `03_source_code/src/app/layout.tsx`
- **Description**: Currently renders a basic root layout with no Top Bar. It sets up the Geist and Inter fonts correctly.
- **Key Intersections**: Will be modified to include the Top Bar component as a persistent fixed element.

### Styling & Theming
- **Location**: `03_source_code/tailwind.config.ts`, `03_source_code/src/app/globals.css`
- **Description**: Tailwind config has correct colors, spacing, and breakpoints (mobile/tablet/desktop/wide). Global CSS includes scroll-behavior: smooth and reveal animation classes.
- **Key Intersections**: Will need to add custom CSS for scroll transitions and backdrop blur.

## 3. Architecture & Rendering Impact

- The Top Bar must be a **Client Component** since it uses useState, useEffect, and scroll event listeners.
- IntersectionObserver will be used for active link detection.
- Scroll listener will be throttled to 16ms (one animation frame) for performance.
- Mobile navigation will use a full-screen overlay with opacity and translateY transitions over 300ms.

## 4. Open Questions & Ambiguities

- No open questions at this time. All requirements are clearly defined in the specifications.

