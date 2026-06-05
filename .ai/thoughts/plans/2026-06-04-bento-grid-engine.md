# Implementation Plan: Bento Grid Engine - Structural Foundation

## Overview

This plan outlines the implementation of the static Bento Grid Engine for the Projects section, including the data layer, layout structure, and static cards. The featured project (PalmPay: Vascular Authentication) will span 2 columns on desktop. All design constraints from `design-system.md` and `functional-specification.md` will be strictly enforced.

## Design Constraint Check

- [ ] Adheres strictly to `design-system.md` (Colors, Typography, Bento Grid math).
- [ ] Adheres strictly to `functional-specification.md` (Motion rules, Hover states).

---

## Phase 1: Data Layer Setup

*Target Directory:* `03_source_code/src/data/`

### Changes Required

- **File**: `src/data/projects.ts`
  - [x] Create TypeScript interface for Project entity with all required fields (name, one-liner, techStack, status, date, heroMediaPath, theProblem, theSolution, externalLinks)
  - [x] Define union type for ProjectStatus with valid status values
  - [x] Create typed array of 8 projects from copy-content.md
  - [x] Mark PalmPay: Vascular Authentication as the featured project (span 2 columns on desktop)
  - [x] Use placeholder heroMediaPath values (to be replaced with actual media later)

### Success Criteria

#### Automated/Build:
- [x] TypeScript compiles without errors

#### Manual Verification:
- [ ] Project data structure is properly typed
- [ ] All 8 projects are included
- [ ] Featured project flag is correctly set

---

## Phase 2: Projects Section Component Implementation

*Target Directory:* `03_source_code/src/components/sections/`

### Changes Required

- **File**: `src/components/sections/Projects.tsx`
  - [x] Create Projects component with `id="projects"` for navigation
  - [x] Implement section header with eyebrow text and primary heading (following existing section patterns)
  - [x] Build CSS Grid container with Tailwind: `grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3`
  - [x] Apply responsive gaps: `gap-4 mobile:gap-4 tablet:gap-5 desktop:gap-6`
  - [x] Create ProjectCard component as child component
  - [x] Implement static card layout with:
    - Surface background: `bg-surface`
    - Border: `border border-border` (border-border-subtle not in Tailwind config; used border-border = #27272A)
    - Border radius: `rounded-card`
    - Padding: `p-8`
  - [x] Add media layer with Next.js Image component (opacity-0 for static phase)
  - [x] Add dark gradient overlay for text legibility
  - [x] Display project name, one-liner, and tech stack tags
  - [x] Implement `desktop:col-span-2` for featured project
  - [x] Add scroll reveal animations (row-based staggering)
  - [x] Use existing `useIntersectionObserver` hook and `getStaggerDelay` utility

### Success Criteria

#### Automated/Build:
- [x] Next.js builds without errors
- [x] TypeScript compiles without errors
- [x] Tailwind classes are valid

#### Manual Verification:
- [ ] Grid displays 3 columns on desktop, 2 on tablet, 1 on mobile
- [ ] Featured project spans 2 columns on desktop only
- [ ] Cards have correct spacing, borders, and background
- [ ] Tech stack tags display in monospace font
- [ ] Scroll reveals work correctly (rows stagger, not individual cards)
- [ ] Media layer is present but hidden (opacity-0)

---

## Phase 3: Integration with Main Page

*Target Directory:* `03_source_code/src/app/`

### Changes Required

- **File**: `src/app/page.tsx`
  - [x] Import and render Projects section after Hero section
  - [x] Ensure sections are ordered correctly: Hero → Projects → Experience → Contact

### Success Criteria

#### Automated/Build:
- [x] Next.js builds without errors

#### Manual Verification:
- [ ] Projects section appears in correct position on page
- [ ] Navigation to #projects works via anchor link

---

## Phase 4: Handoff Generation

*Target Directory:* `.ai/thoughts/handoffs/`

### Changes Required

- **File**: `2026-06-04-bento-grid-engine-handoff.md`
  - [x] Create handoff document summarizing modified files
  - [x] List all files changed according to plan phases
  - [x] Document any deviations from original design
  - [x] Cite design system references used

### Success Criteria

#### Manual Verification:
- [x] Handoff file is generated accurately
- [x] All modified files are listed
- [x] Ready for Reviewer phase

---

## Final Instruction:

Output the file content to `.ai/thoughts/plans/2026-06-04-bento-grid-engine.md`.
Ask the user to review the phase boundaries before clearing the context and switching to the Developer prompt.
