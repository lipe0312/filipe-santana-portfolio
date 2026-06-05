# Implementation Plan: Core Layout & Dynamic Navigation

## Overview

This plan establishes the core layout and dynamic navigation system for the Filipe Santana portfolio, including the Top Bar with scroll state machine, active link detection via IntersectionObserver, and mobile navigation with full-screen overlay.

## Design Constraint Check

- [ ] Adheres strictly to `design-system.md` (Colors, Typography, Bento Grid math).
- [ ] Adheres strictly to `functional-specification.md` (Motion rules, Hover states, scroll behavior).

---

## Phase 1: Top Bar Component Implementation

_Target Directory:_ `03_source_code/src/components/`

### Changes Required

- **File**: `03_source_code/src/components/TopBar.tsx` (Create new)
  - [x] Implement Top Bar as Client Component with scroll state machine (idle, scrolled, hidden, visible)
  - [x] Add logotype on left using Geist font
  - [x] Add navigation links on right using Inter font
  - [x] Implement scroll listener with 16ms throttling
  - [x] Add backdrop blur and border-bottom when scrolled > 60px
  - [x] Hide Top Bar when scrolling down > 300px, show when scrolling up
  - [x] Add transitions (transform 300ms ease-out, background 200ms ease-out)

### Success Criteria

#### Automated/Build:

- [ ] No TypeScript errors
- [ ] No ESLint errors

#### Manual Verification:

- [ ] Top Bar is fixed at top on page load
- [ ] Top Bar becomes semi-transparent with backdrop blur when scrolling > 60px
- [ ] Top Bar hides when scrolling down > 300px
- [ ] Top Bar reappears immediately when scrolling up
- [ ] All transitions are smooth and performant

---

## Phase 2: Active Link Detection with IntersectionObserver

_Target Directory:_ `03_source_code/src/components/`

### Changes Required

- **File**: `03_source_code/src/components/TopBar.tsx` (Modify)
  - [x] Implement IntersectionObserver to track section visibility
  - [x] Use top 40% of viewport as active section threshold
  - [x] Add active class to corresponding nav link (color shift from #A1A1AA to #FAFAFA)
  - [x] Add transition: color 200ms ease-out

### Success Criteria

#### Manual Verification:

- [ ] Correct nav link becomes active as section enters top 40% of viewport
- [ ] Color transition is smooth
- [ ] No visual jitter or flicker

---

## Phase 3: Smooth Scrolling with Offset

_Target Directory:_ `03_source_code/src/components/`

### Changes Required

- **File**: `03_source_code/src/components/TopBar.tsx` (Modify)
  - [x] Implement scrollIntoView with { behavior: 'smooth', block: 'start' }
  - [x] Add 80px scroll offset to account for fixed Top Bar height
  - [x] Ensure scroll-behavior: smooth is set on html element (already in globals.css)

### Success Criteria

#### Manual Verification:

- [ ] Clicking nav links scrolls to correct section
- [ ] Section headings are not obscured by Top Bar
- [ ] Scrolling is smooth

---

## Phase 4: Mobile Navigation Component

_Target Directory:_ `03_source_code/src/components/`

### Changes Required

- **File**: `03_source_code/src/components/MobileNav.tsx` (Create new)
  - [x] Implement hamburger trigger for mobile/tablet breakpoints
  - [x] Create full-screen overlay (background: #0A0A0A, z-index: 100)
  - [x] Display nav links as large, tappable vertical items
  - [x] Add opacity and translateY transitions over 300ms

### Success Criteria

#### Manual Verification:

- [ ] Hamburger trigger appears on mobile/tablet (< 1024px)
- [ ] Menu opens with smooth animation
- [ ] Menu closes with smooth animation
- [ ] Nav links are easily tappable
- [ ] Overlay covers entire screen

---

## Phase 5: Integrate Components into Root Layout

_Target Directory:_ `03_source_code/src/app/`

### Changes Required

- **File**: `03_source_code/src/app/layout.tsx` (Modify)
  - [x] Import and render TopBar component
  - [x] Ensure TopBar is persistent across route changes

### Success Criteria

#### Automated/Build:

- [ ] No TypeScript errors
- [ ] No ESLint errors

#### Manual Verification:

- [ ] Top Bar is visible on all pages
- [ ] Top Bar does not remount on route changes
- [ ] Page content is correctly offset below Top Bar

---

## Phase 6: Handoff Generation

_Target Directory:_ `.ai/thoughts/handoffs/`

### Changes Required

- **File**: `2026-06-03-core-layout-dynamic-navigation-handoff.md`
  - [x] Create a handoff document summarizing modified files and any deviations from the original design system
  - [x] Cite all files changed according to the plan and its phases

### Success Criteria

#### Manual Verification:

- [ ] Ensure the handoff file is generated accurately to trigger the Reviewer phase

---

## Final Instruction:

Output the file content to `.ai/thoughts/plans/...`.
Ask the user to review the phase boundaries before clearing the context and switching to the Developer prompt.
