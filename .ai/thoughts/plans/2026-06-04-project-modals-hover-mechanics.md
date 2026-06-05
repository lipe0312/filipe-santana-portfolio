# Implementation Plan: Project Modals & Hover Mechanics

## Overview
This plan implements the full interactive behavior for project cards (including video autoplay on hover) and the shared-element transition modal for project detail views. The plan follows a domain-isolated approach, building from dependencies and data layer up through components and final handoff.

## Design Constraint Check
- [ ] Adheres strictly to `design-system.md` (Colors, Typography, Bento Grid math).
- [ ] Adheres strictly to `functional-specification.md` (Motion rules, Hover states, Modal behavior).

---

## Phase 1: Dependencies Installation
*Target Directory:* `./` (Project root)

### Changes Required
- **File**: `package.json`
  - [x] Install `framer-motion` for shared-element transitions and animations
  - [x] Install `focus-trap-react` for accessibility

### Success Criteria
#### Automated/Build:
- [x] `npm install` completes without errors
- [x] TypeScript compiles without errors (`tsc --noEmit`)

#### Manual Verification:
- [x] Verify dependencies are listed in `package.json`

---

## Phase 2: Data Layer Updates
*Target Directory:* `src/data/`

### Changes Required
- **File**: `src/data/projects.ts`
  - [x] Update `Project` interface to support both image and video hero media (add `heroMediaType?: 'image' | 'video'` field)
  - [x] Ensure all project data from `copy-content.md` is present, including status, date, theProblem, theSolution, and externalLinks

### Success Criteria
#### Automated/Build:
- [x] TypeScript compiles without errors (`tsc --noEmit`)

#### Manual Verification:
- [x] Verify `projects.ts` has all 8 projects with complete data
- [x] Verify new TypeScript interface field is properly typed

---

## Phase 3: Project Modal Component Implementation
*Target Directory:* `src/components/`

### Changes Required
- **File**: `src/components/modals/ProjectModal.tsx` (Create new)
  - [x] Implement modal with React portal using `ReactDOM.createPortal`
  - [x] Use Framer Motion for shared-element transition from card to full screen
  - [x] Add mobile fallback slide-up animation
  - [x] Implement scroll lock on `document.body`
  - [x] Add focus trap using `focus-trap-react`
  - [x] Add `Escape` key listener
  - [x] Return focus to originating card on close
  - [x] Set proper ARIA attributes (`role="dialog"`, `aria-modal="true"`)
  - [x] Render all project data (status badge, name, hero media, problem/solution sections, external links)
  - [x] Style modal content with design tokens from `tailwind.config.ts`

### Success Criteria
#### Automated/Build:
- [x] TypeScript compiles without errors (`tsc --noEmit`)
- [x] Next.js production build succeeds (`npm run build`)

#### Manual Verification:
- [ ] Modal opens with shared-element transition from clicked card
- [ ] Modal closes back to originating card position
- [ ] Mobile modal slides up from bottom
- [ ] Scroll is locked when modal is open
- [ ] Focus is trapped inside modal
- [ ] `Escape` key closes modal
- [ ] All project content is properly rendered

---

## Phase 4: Bento Grid Hover Engine & Video Autoplay
*Target Directory:* `src/components/sections/`

### Changes Required
- **File**: `src/components/sections/Projects.tsx`
  - [x] Add state management for active modal
  - [x] Implement video autoplay logic on `mouseenter`/`mouseleave` (play, pause, reset after 300ms)
  - [x] Add proper video element attributes (`muted`, `loop`, `playsinline`, `preload="none"`)
  - [x] Update media layer to support both image and video
  - [x] Add touch device fallback (`opacity-30` on media layer for `hover: none`)
  - [x] Ensure all transitions are `300ms ease-out`
  - [x] Add click handler to open modal with shared-element layout ID

### Success Criteria
#### Automated/Build:
- [x] TypeScript compiles without errors (`tsc --noEmit`)
- [x] Next.js production build succeeds (`npm run build`)

#### Manual Verification:
- [ ] Cards elevate `translateY(-2px)` and border color shifts on hover
- [ ] Media layer fades in to `opacity: 1` and scales to `1.05` on hover
- [ ] Videos autoplay on hover and pause/reset on mouse leave
- [ ] Touch devices show persistent 30% opacity media layer
- [ ] All transitions are smooth and 300ms duration
- [ ] Clicking a card opens the modal

---

## Phase 5: Handoff Generation
*Target Directory:* `.ai/thoughts/handoffs/`

### Changes Required
- **File**: `2026-06-04-project-modals-hover-mechanics-handoff.md`
  - [ ] Create handoff document summarizing modified files
  - [ ] Cite all files changed according to the plan and its phases
  - [ ] Note any deviations from design system (if applicable)

### Success Criteria
#### Manual Verification:
- [ ] Ensure the handoff file is generated accurately to trigger the Reviewer phase

---

## Final Instruction:
Ask the user to review the phase boundaries before clearing the context and switching to the Developer prompt.
