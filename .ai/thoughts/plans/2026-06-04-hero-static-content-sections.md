# Implementation Plan: Hero & Static Content Sections

## Overview
This plan implements the Hero section (with DOMContentLoaded fade animation), Experience timeline (with staggered scroll reveals), and Contact section (with social links and lucide-react icons). All components strictly follow design-system.md and functional-specification.md.

## Design Constraint Check
- [ ] Adheres strictly to `design-system.md` (Colors, Typography, Bento Grid math).
- [ ] Adheres strictly to `functional-specification.md` (Motion rules, Hover states).

---

## Phase 1: Dependency & Navigation Setup

**Target Directory**: `03_source_code/`

### Changes Required

1. **File**: `03_source_code/package.json`
   - [x] Add `lucide-react` dependency for Contact section icons

2. **File**: `03_source_code/src/components/TopBar.tsx`
   - [x] Reorder nav links to match copy-content.md: Experience → Projects → About → Gallery → Contact
   - [x] Update navLinks array accordingly

3. **File**: `03_source_code/src/components/MobileNav.tsx`
   - [x] Verify nav links match TopBar order (update if necessary)

### Success Criteria

#### Automated/Build:
- [ ] `npm install` completes without errors
- [ ] `npm run build` completes without TypeScript/Tailwind errors

#### Manual Verification:
- [ ] Navigation links display in correct order: Experience, Projects, About, Gallery, Contact
- [ ] TopBar and MobileNav function correctly

---

## Phase 2: Reveal Animation Hook & Utilities

**Target Directory**: `03_source_code/src/hooks/`

### Changes Required

1. **File**: `03_source_code/src/hooks/useIntersectionObserver.ts` (create new)
   - [x] Create reusable client hook for IntersectionObserver
   - [x] Implement threshold 0.12 as specified in functional-specification.md
   - [x] Add `.is-visible` class when element enters viewport

2. **File**: `03_source_code/src/lib/utils.ts` (create if needed)
   - [x] Create utility for staggered transition-delay calculation (0ms, 50ms, 100ms, 150ms max)

### Success Criteria

#### Automated/Build:
- [ ] No TypeScript errors
- [ ] Hook exports correctly

#### Manual Verification:
- [ ] Hook compiles without errors
- [ ] Type definitions are correct

---

## Phase 3: Hero Section Component

**Target Directory**: `03_source_code/src/components/sections/`

### Changes Required

1. **File**: `03_source_code/src/components/sections/Hero.tsx` (create new)
   - [x] Implement as client component (`"use client"`)
   - [x] Use DOMContentLoaded event for 600ms ease-out opacity fade only (NO translateY)
   - [x] Exact copy from copy-content.md:
     - Headline: "Building systems that think: from the edge device to the interface."
     - Name: "Filipe Santana"
     - Sub-headline: "Computer Science Researcher & Software Engineer based in Salvador, BA."
   - [x] CTAs: "View Projects" → #projects, "How can I help" → #diferencial
   - [x] Typography strictly following design-system.md (Geist/Inter Tight headings, Inter body)
   - [x] Colors strictly from design-system.md tokens

### Success Criteria

#### Automated/Build:
- [ ] No TypeScript errors
- [ ] Tailwind compiles without errors

#### Manual Verification:
- [ ] Hero fades in on load with only opacity transition (no vertical movement)
- [ ] All copy matches exactly
- [ ] CTAs have proper href anchors
- [ ] Typography and colors match design system

---

## Phase 4: Experience Timeline Component

**Target Directory**: `03_source_code/src/components/sections/`

### Changes Required

1. **File**: `03_source_code/src/components/sections/Experience.tsx` (create new)
   - [ ] Implement as client component (`"use client"`)
   - [ ] Use useIntersectionObserver hook for reveal animations
   - [ ] 4 experience entries from copy-content.md (ordered most recent first)
   - [ ] Each entry wrapped in `.reveal` class
   - [ ] Stagger delays: 0ms, 50ms, 100ms, 150ms
   - [ ] Section id: `#experience`
   - [ ] Typography strictly following design-system.md
   - [ ] Layout matches reference visual (Matheus Scatolin portfolio)

### Success Criteria

#### Automated/Build:
- [ ] No TypeScript errors
- [ ] Tailwind compiles without errors

#### Manual Verification:
- [ ] All 4 experience entries display correctly
- [ ] Entries stagger into view with 50ms delays as user scrolls
- [ ] Section has id="experience" for navigation
- [ ] All copy matches copy-content.md exactly

---

## Phase 5: Contact Section Component

**Target Directory**: `03_source_code/src/components/sections/`

### Changes Required

1. **File**: `03_source_code/src/components/sections/Contact.tsx` (create new)
   - [ ] Implement as client component (`"use client"`)
   - [ ] Use useIntersectionObserver hook for reveal animation
   - [ ] Exact copy from copy-content.md:
     - Headline: "Let's build something that matters."
     - Sub-headline: "Open to collaborations, engineering challenges, and opportunities where the problem is genuinely interesting."
   - [ ] Links: Email, LinkedIn, GitHub with lucide-react icons
   - [ ] Section id: `#contact`
   - [ ] Typography strictly following design-system.md

### Success Criteria

#### Automated/Build:
- [ ] No TypeScript errors
- [ ] Tailwind compiles without errors

#### Manual Verification:
- [ ] All copy matches exactly
- [ ] Icons display correctly
- [ ] Links are functional
- [ ] Section has id="contact" for navigation

---

## Phase 6: Page Integration & Layout

**Target Directory**: `03_source_code/src/app/`

### Changes Required

1. **File**: `03_source_code/src/app/page.tsx`
   - [ ] Import and add Hero component FIRST (above Projects)
   - [ ] Replace placeholder Experience section with Experience component
   - [ ] Replace placeholder Contact section with Contact component
   - [ ] Ensure proper section order: Hero → Projects → Experience → About → Gallery → Contact
   - [ ] Add proper spacing/padding following design-system.md (24px gaps)

### Success Criteria

#### Automated/Build:
- [ ] `npm run build` completes without errors
- [ ] No TypeScript errors

#### Manual Verification:
- [ ] All sections render in correct order
- [ ] Page scrolls smoothly through all sections
- [ ] Navigation links correctly scroll to respective sections
- [ ] Visual layout matches design constraints

---

## Phase 7: Handoff Generation

**Target Directory**: `.ai/thoughts/handoffs/`

### Changes Required

1. **File**: `.ai/thoughts/handoffs/2026-06-04-hero-static-content-sections-handoff.md`
   - [ ] Create handoff document summarizing modified files
   - [ ] List all new components created
   - [ ] Verify all changes follow design-system.md and functional-specification.md
   - [ ] Cite all files changed according to plan phases

### Success Criteria

#### Manual Verification:
- [ ] Handoff file exists and is complete
- [ ] All changes documented
- [ ] Ready for Reviewer phase

---

## Final Instruction:
Complete all phases in strict order. Do not proceed to next phase without verifying current phase's success criteria. After all phases complete, output handoff document and request user review before switching to Developer prompt.