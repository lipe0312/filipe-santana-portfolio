---
date: 2026-06-04
topic: Hero & Static Content Sections (Hero, Experience Timeline, Contact)
status: complete
tags: [research, portfolio, frontend]
---

# Research: Hero & Static Content Sections

## 1. Design & External Context Summary

### Strategy Docs Evaluated
- `01_strategy/copy-content.md`: Source of truth for all copy (Hero, Experience, Contact sections)
- `02_design_assets/brand_system/design-system.md`: Defines color palette, typography, and spacing tokens
- `02_design_assets/brand_system/functional-specification.md`: Defines scroll reveal system, motion parameters, and component behavior

#### Key Design Constraints
1. **Hero Section**:
   - Exact copy: "Building systems that think: from the edge device to the interface."
   - Name: "Filipe Santana"
   - Sub-headline: "Computer Science Researcher & Software Engineer based in Salvador, BA."
   - CTAs: "View Projects" (to #projects), "How can I help" (to #diferencial)
   - Animation: Only opacity fade (0→1) over 600ms ease-out on DOMContentLoaded, NO translateY or other transforms

2. **Experience Timeline**:
   - 5 experience entries in order from most recent to oldest
   - Each entry wrapped in .reveal class
   - IntersectionObserver threshold: 0.12
   - Stagger delay: 50ms per entry, capped at 4th entry delay
   - Section id: #experience (as anchor target from Top Bar)

3. **Contact Section**:
   - Exact copy: Headline "Let's build something that matters.", Sub-headline "Open to collaborations, engineering challenges, and opportunities where the problem is genuinely interesting."
   - Links: Email (filipe.santana.0312@gmail.com), LinkedIn, GitHub with lucide-react icons
   - Uses standard .reveal scroll animation

### External Docs Synthesized
- `https://matheus-scatolin.vercel.app/`: Visual reference for Hero and Experience sections layout, spacing, and typography
- `02_design_assets/inspirations/`: Screenshots showing exact visual style for Hero and dark-mode canvas behavior

## 2. Current State Analysis (By Domain)

### Core UI Components
- **Location**: `03_source_code/src/components/TopBar.tsx`, `03_source_code/src/components/MobileNav.tsx`
- **Description**: Top navigation bar is already implemented with scroll state management, smooth scrolling with 80px offset, and active section detection. Mobile navigation is also present.
- **Key Intersections**: The nav links already include "Experience" and "Contact", but need to verify if "Experience" is ordered correctly (currently navLinks list Projects first, should be Experience first per copy-content.md).

### Styling & Theming
- **Location**: `03_source_code/src/app/globals.css`, `03_source_code/tailwind.config.ts`
- **Description**: Global reveal system is already implemented with .reveal and .is-visible classes using opacity 0→1 and translateY(14px) over 500ms ease-out. Tailwind config defines all required color, spacing, and font tokens.
- **Key Intersections**: The reveal system is in place and ready to use. Need to ensure Hero section doesn't use this system and has its own animation.

### Routing & Layout
- **Location**: `03_source_code/src/app/layout.tsx`, `03_source_code/src/app/page.tsx`
- **Description**: Root layout includes TopBar and sets up fonts. Page.tsx has placeholder sections for Projects, Experience, About, Gallery, Contact.
- **Key Intersections**: Page structure is ready to be populated with real content sections.

### Micro-interactions & Motion
- **Location**: Implicit via globals.css and existing TopBar animations
- **Description**: IntersectionObserver system is already set up in globals.css, but needs to be implemented in components to add/remove .is-visible class
- **Key Intersections**: Need to implement the IntersectionObserver logic to trigger reveal animations

## 3. Architecture & Rendering Impact

### Server vs Client Components
- **Hero Section**: Needs client component for DOMContentLoaded animation
- **Experience Section**: Needs client component for IntersectionObserver and staggered delays
- **Contact Section**: Needs client component for IntersectionObserver (or can be wrapped in a client component that handles reveal)

### Component Structure
- Will need to create new components for Hero, Experience, Contact sections
- Components will use Tailwind tokens for all styling
- No raw hex colors or pixel values allowed

## 4. Open Questions & Ambiguities

1. **Copy Consistency**: copy-content.md has slightly different CTA labels and anchors than 0_feature_context.md (e.g., "View Projects" vs "View Experience", #projects vs #experience). Should follow 0_feature_context.md as primary spec?
2. **Experience Entries**: copy-content.md has 4 experience entries, 0_feature_context.md mentions 5. Should use the 4 from copy-content.md?
3. **Lucide Icons**: Need to confirm lucide-react is installed (check package.json)
