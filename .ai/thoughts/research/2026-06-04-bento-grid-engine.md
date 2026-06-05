---
date: 2026-06-04
topic: "Bento Grid Engine — Structural Foundation (Data Layer, Layout & Static Cards)"
status: complete
tags: [research, portfolio, frontend]
---

# Research: Bento Grid Engine — Structural Foundation

## 1. Design & External Context Summary

### Strategy Docs Evaluated

1. **portfolio-architecture-model.md**: Defines the Project entity schema including:
   - `name`, `one-liner`, `techStack[]`, `status`, `date`, `heroMediaPath`
   - `theProblem`, `theSolution`
   - `externalLinks` (with optional `github`, `deploy`, `linkedinPost`)
   - 5 confirmed projects: Neural Pixel, VeinAuth PoC (Palm Vein Touchless), Project ARES (UAV), Smart Lock BYOD, Quantum Computing League / Financial Intelligence Dashboard

2. **design-system.md**: Defines spatial rules:
   - Border radius: `16px` for outer cards, `6px` for tags
   - Gap: `24px` (desktop), `20px` (tablet), `16px` (mobile)
   - Padding: `32px` inside project cards
   - Color scheme: `surface` (#121212), `border-subtle` (#27272A), `text-primary` (#FAFAFA), `text-secondary` (#A1A1AA), `accent` (#E4E4E7)

3. **functional-specification.md**: Defines responsiveness:
   - Grid columns: 3 (desktop, 1024px+), 2 (tablet, 768px+), 1 (mobile)
   - Featured project (Neural Pixel) spans 2 columns on desktop only
   - Breakpoint tokens available in Tailwind: `mobile`, `tablet`, `desktop`, `wide`

4. **copy-content.md**: Provides final project names, one-liners, and tech stack tags

### External Docs Synthesized

1. **Tailwind CSS Grid**: 
   - Use `grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3` with custom tokens
   - `grid-column: span 2` for featured project on desktop
   - Responsive gap values using custom tokens
   - Can use `col-span-2` shorthand for spanning multiple columns

2. **Next.js Image Component**: 
   - Use `<Image fill />` with parent container having `position: relative` and `overflow: hidden`
   - `priority` prop for featured project image (deprecated in Next.js 16, use `preload` instead)
   - `alt` text required and should be descriptive
   - `objectFit` and `objectPosition` to control media display
   - `opacity-0` for static phase, ready for hover interactions later

3. **TypeScript Objects**:
   - Use `interface` or `type` for Project entity
   - Optional properties marked with `?`
   - Union type for `status`: `'Operational' | 'Proof of Concept' | 'In Development' | 'Concluded'`
   - Strict typing with no `any` types

4. **CSS Grid Layout Basics**:
   - Grid container with `display: grid`
   - Tracks defined by `grid-template-columns`
   - Items placed in grid cells
   - Gaps between items using `gap` property
   - Featured item spans 2 columns on desktop

## 2. Current State Analysis (By Domain)

### Core UI Components
- **Location**: `03_source_code/src/components/`
- **Existing Components**: Hero, Experience, Contact, TopBar, MobileNav
- **Patterns Used**:
  - `use client` directive for components needing state/effects
  - `useIntersectionObserver` hook for scroll reveals
  - `getStaggerDelay` utility for staggered animations
  - Tailwind tokens from config (no raw values)
- **Missing**: Projects section component, projects data file

### Styling & Theming
- **Location**: `03_source_code/tailwind.config.ts` and `globals.css`
- **Available Tokens**:
  - Colors: `background-base`, `surface`, `border`, `text-primary`, `text-secondary`, `accent`
  - Border radius: `card` (16px), `tag` (6px)
  - Spacing: `gap` (24px), `padding` (32px)
  - Screens: `mobile`, `tablet`, `desktop`, `wide`
  - Fonts: `sans`, `mono`, `display`

### Data Layer
- **Location**: N/A (no projects data file yet)
- **Current State**: No data structure exists for projects

## 3. Architecture & Rendering Impact

- The grid will be implemented with CSS Grid in Tailwind
- Media layers will use Next.js `<Image>` with `fill` and `opacity-0` in the static phase
- The featured project card will use `desktop:col-span-2`
- Section root will have `id="projects"` for navigation
- We'll create `src/data/projects.ts` for the typed data layer
- We'll create `src/components/sections/Projects.tsx` for the grid component

## 4. Open Questions & Ambiguities

- Need to confirm which of the 8 projects from copy-content.md are the 5 "confirmed" ones (feature context mentions 5, copy has 8)
- Need hero media paths for all projects (not specified in docs)
- Need to verify if Neural Pixel is the featured project (feature context mentions "featured project card (the primary project, Neural Pixel)")
