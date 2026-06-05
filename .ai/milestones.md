# Master Implementation Milestones: Filipe Santana Portfolio

> **Governing Documents:** `design-system.md` · `functional-specification.md` · `copy-content.md`
> **Workflow:** Feed each Milestone into `0_feature_context.md` and let the Planner Agent break them down into isolated implementation phases.

---

- [ ] **Milestone 1: Project Scaffold & Design System**
  - **Scope:** Next.js App Router setup, Tailwind configuration using exact tokens from `design-system.md`, global typography (Geist/Inter), and asset organization.

- [ ] **Milestone 2: Core Layout & Dynamic Navigation**
  - **Scope:** Root layout, smooth scrolling setup, and the Top Bar component with its 3-state scroll machine and mobile overlay.

- [ ] **Milestone 3: Hero & Static Content Sections**
  - **Scope:** Building the Hero section (with load animations), the chronological Experience timeline, and the Contact section based on `copy-content.md`.

- [ ] **Milestone 4: The Bento Grid Engine (Core)**
  - **Scope:** The `projects.ts` data layer, the CSS Grid structural layout (responsive), and the static Project Cards. (Exclude complex hover media and modals for now).

- [ ] **Milestone 5: Project Modals & Hover Mechanics**
  - **Scope:** The video autoplay logic on hover, gradient overlays, and the Fullscreen Modal architecture (shared-element expansion and scroll locking).

- [ ] **Milestone 6: Advanced Motion (The Linear.app Touch)**
  - **Scope:** The global `IntersectionObserver` scroll reveals, the About Section quantitative counter, the Magnetic Tag repulsion, and the Precision Cursor Glow.

- [ ] **Milestone 7: Audit & Vercel Deployment**
  - **Scope:** Lighthouse performance audit (enforcing the 30-second rule), image/video optimization checks, responsive QA, and Vercel production deploy.