---
date: 2026-06-03
topic: "Project Scaffold & Design System Foundation"
status: complete
tags: [research, portfolio, frontend]
---

# Research: Project Scaffold & Design System Foundation

## 1. Design & External Context Summary

### Strategy Docs Evaluated
- **`01_strategy/portfolio-architecture-model.md`**: Defines the SPA architecture, Bento UI aesthetic, and entity models (Experience, Projects, About Me, Gallery) for the portfolio.
- **`02_design_assets/brand_system/design-system.md`**: Establishes the color palette (`#0A0A0A`, `#121212`, `#27272A`, `#FAFAFA`, `#A1A1AA`, `#E4E4E7`), typography system (Geist/Inter Tight for headings, Inter for body, Geist Mono for tags), Bento Grid structural rules (16px border radius, 24px gap, 32px padding), and motion guidelines.
- **`02_design_assets/brand_system/functional-specification.md`**: Details scroll dynamics (scroll reveal system with IntersectionObserver), Bento Grid hover engine, project detail modal behavior, and responsiveness with breakpoints (mobile: 0px, tablet: 768px, desktop: 1024px, wide: 1280px) and typography scale.
- **`.ai/prompts/0_feature_context.md`**: Sets the acceptance criteria for the scaffold, including Next.js App Router with TypeScript, Tailwind CSS config with custom tokens, font loading, and public directory organization.

### External Docs Synthesized
- **Next.js App Router Documentation**: 
  - Initialization with `create-next-app` using TypeScript, Tailwind, and App Router with `src/` directory
  - System requirements: Node.js 20.9+
  - `layout.tsx` as root layout with `<html>` and `<body>` tags
  - `page.tsx` as home page
  - `public/` directory for static assets
- **Tailwind CSS Configuration**:
  - Custom theme tokens defined via `@theme` directive in CSS
  - Color tokens in `--color-*` namespace
  - Typography tokens in `--font-*`, `--text-*`, etc.
  - Breakpoint tokens in `--breakpoint-*` namespace
  - `@theme inline` for referencing other variables
- **Tailwind Colors Documentation**:
  - Custom color definitions with `@theme`
  - Opacity adjustments via utility classes (e.g., `bg-black/75`)
  - Referencing colors as CSS variables
- **Geist Font Documentation**:
  - Installation via `npm i geist`
  - Integration with Next.js using `import { GeistSans } from 'geist/font/sans'`
  - Google Fonts integration also available
- **Next.js Image Component Documentation**:
  - `src` can be internal path, external URL, or static import
  - `alt` is required for accessibility
  - `width` and `height` required unless `fill` is used
  - `remotePatterns` in `next.config.js` for external images
- **Matheus Scatolin Portfolio**: Structural reference for spacing rhythm and section separations.

## 2. Current State Analysis (By Domain)

### Routing & Layout
- **Location**: N/A (no project yet)
- **Description**: No Next.js project has been initialized. No `layout.tsx`, `page.tsx`, or `src/` directory exists.
- **Key Intersections**: Will require Next.js App Router setup with `src/` structure.

### Styling & Theming
- **Location**: N/A (no project yet)
- **Description**: No Tailwind config, no `globals.css`, no design tokens defined.
- **Key Intersections**: Will need to define custom Tailwind tokens mapping 1:1 to `design-system.md` values.

### Asset Management
- **Location**: `02_design_assets/`
- **Description**: Existing design assets and inspirations in `02_design_assets/brand_system/` and `02_design_assets/mockup_and_images/`, but no `public/` directory for Next.js assets yet.
- **Key Intersections**: Will need to organize assets into `public/images/`, `public/videos/`, and `public/icons/`.

## 3. Architecture & Rendering Impact

This milestone lays the structural foundation for the entire portfolio:
- **Next.js App Router**: Will use server components by default, with client components only where necessary (e.g., scroll handlers, interactive modals).
- **Tailwind Design Tokens**: All styling will use utility classes derived from the custom config, eliminating hardcoded values.
- **Font Loading**: Geist, Inter, and Geist Mono will be loaded via `next/font` and exposed as CSS variables.

## 4. Open Questions & Ambiguities

None identified at this stage. All design constraints and requirements are clearly defined in the provided documents.

