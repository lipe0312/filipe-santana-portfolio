# Implementation Plan: Project Scaffold & Design System Foundation

## Overview

This plan establishes the complete foundation for the Filipe Santana portfolio, including Next.js App Router initialization, Tailwind CSS configuration with custom design tokens, font loading, and public directory organization.

## Design Constraint Check

- [x] Adheres strictly to `design-system.md` (Colors, Typography, Bento Grid math).
- [x] Adheres strictly to `functional-specification.md` (Motion rules, Hover states).

---

## Phase 1: Next.js Project Initialization

*Target Directory:* Project root (`/`)

### Changes Required

- **Project Root (`03_source_code/`)**
  - [x] Initialize Next.js with TypeScript, Tailwind CSS, and App Router
  - [x] Select `src/` directory structure
  - [x] Install dependencies: `geist` for font loading

### Success Criteria

#### Automated/Build:

- [x] `npm install` completes without errors
- [x] `npm run dev` starts successfully at `http://localhost:3000`

#### Manual Verification:

- [ ] Verify Next.js welcome page loads correctly

---

## Phase 2: Global Styles & Tailwind Design Tokens

*Target Directory:* `src/app/` and project root

### Changes Required

- **File**: `src/app/globals.css`
  - [x] Replace default Tailwind styles with custom `@theme` directive
  - [x] Define all design tokens from `design-system.md` (colors, typography, breakpoints, spacing, border radii
  - [x] Set base styles (dark background, font families, scroll behavior)

- **File**: `tailwind.config.ts`
  - [x] Configure Tailwind to use custom tokens

### Success Criteria

#### Automated/Build:

- [x] Tailwind compiles without errors
- [x] No CSS syntax errors reported

#### Manual Verification:

- [ ] Verify CSS variables are correctly defined in browser dev tools
- [ ] Verify base styles (background color, fonts) apply correctly

---

## Phase 3: Root Layout & Font Loading

*Target Directory:* `src/app/`

### Changes Required

- **File**: `src/app/layout.tsx`
  - [x] Import Geist Sans, Geist Mono from `geist/font`
  - [x] Configure Inter font (Google Fonts)
  - [x] Set up root HTML structure with proper `lang` attribute
  - [x] Apply font variables to `<body>`
  - [x] Configure metadata (title, description)

- **File**: `src/app/page.tsx`
  - [x] Create minimal home page with basic structure

### Success Criteria

#### Automated/Build:

- [x] No TypeScript errors
- [x] No ESLint errors

#### Manual Verification:

- [ ] Verify fonts load correctly in browser
- [ ] Verify page renders without errors

---

## Phase 4: Public Directory Organization

*Target Directory:* `public/`

### Changes Required

- **Public Directory**
  - [x] Create `public/images/` directory
  - [x] Create `public/videos/` directory
  - [x] Create `public/icons/` directory
  - [ ] Organize design assets from `02_design_assets/` into appropriate directories

### Success Criteria

#### Manual Verification:

- [ ] Verify public directory structure exists
- [ ] Verify assets are accessible via browser URLs

---

## Phase 5: Handoff Generation

*Target Directory:* `.ai/thoughts/handoffs/`

### Changes Required

- **File**: `2026-06-03-project-scaffold-design-system-foundation-handoff.md`
  - [x] Create a handoff document summarizing modified files and any deviations from the original design system
  - [x] Cite all files changed according to the plan and its phases

### Success Criteria

#### Manual Verification:

- [ ] Ensure the handoff file is generated accurately to trigger the Reviewer phase

---

## Final Instruction:

Review the phase boundaries and proceed with Developer implementation.
