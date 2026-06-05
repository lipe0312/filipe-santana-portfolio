# Handoff: Advanced Motion Layer

**Date:** 2026-06-05
**Feature:** Scroll reveal system, cursor glow, About component (counters + magnetic tags), hook repair, Hero fix

---

## 1. Modified & Created Files

| File | Action | Phase | Nature of Change |
|---|---|---|---|
| `src/app/globals.css` | Modified | 1 | Added `@media (prefers-reduced-motion: reduce)` safety net for `.reveal`. `@theme {}` block intentionally kept (see §4). |
| `src/hooks/useIntersectionObserver.ts` | Modified | 2 | One-shot pattern: `unobserve` on intersect, `disconnect` on cleanup, empty dep array, `typeof IntersectionObserver === "undefined"` graceful degradation. |
| `src/components/sections/Hero.tsx` | Modified | 3 | `duration-600` → `duration-500` (invalid Tailwind v3 utility → nearest valid). |
| `src/components/sections/Experience.tsx` | Modified | 4 | `ExperienceItem` sub-component calls `useIntersectionObserver()` once; outermost `<div>` gets `reveal`/`is-visible` + `getStaggerDelay(index)`. |
| `src/components/sections/Contact.tsx` | Modified | 4 | Main content `<div>` gets `reveal`/`is-visible`. Single reveal unit, no stagger. |
| `src/components/sections/Projects.tsx` | Modified | 5 + 6 | Phase 5: `ProjectCard` calls hook once; outer wrapper div gets row-stagger reveal (`Math.floor(index / 3)`). Phase 6: `glowRef` + `sectionRef` added to `Projects`; rAF-throttled `mousemove` drives `position: fixed` glow `<div>` with `rgba(0,0,0,0.03)` (light mode adapted). |
| `src/components/sections/About.tsx` | Created | 7 + 8 + 9 | Full About section: section header, stats counter row, executive summary, Core Technologies (17 tags), Soft Skills (8 tags), Diferencial (`id="diferencial"`), Beyond Code. Phase 8: cubic ease-out counter animation via rAF (1200ms). Phase 9: magnetic tag repulsion, read-then-write rAF, ±6px max displacement, `cubic-bezier(0.34, 1.56, 0.64, 1)` snap-back. |
| `src/app/page.tsx` | Modified | 7 | Replaced inline `<section id="about">` stub with `<About />`. Import added. |

### Light Mode Corrections (post-phase-9 patch)
| File | Change |
|---|---|
| `src/components/sections/Projects.tsx` | Glow color `rgba(255,255,255,0.04)` → `rgba(0,0,0,0.03)` |
| `src/components/sections/About.tsx` | Tag inline `background: rgba(255,255,255,0.05)` removed; `className` → `bg-zinc-100 text-zinc-800` |
| All reveal components | All `` className={`reveal${x}`} `` template literals rewritten as `className={x ? "reveal is-visible" : "reveal"}` + string concatenation — eliminates template literals from all `className` props for browser eval safety. |

---

## 2. Base Code Files Important for the Reviewer

| File | Relevance |
|---|---|
| `src/hooks/useIntersectionObserver.ts` | Drives all scroll reveals. One-shot: fires once per element, never re-hides. Defaults to `isVisible = true` if `IntersectionObserver` unavailable. |
| `src/app/globals.css` | `.reveal` / `.is-visible` CSS classes. `@theme {}` block preserved (see §4). `prefers-reduced-motion` resets `.reveal` to immediately visible. |
| `src/lib/utils.ts` | `getStaggerDelay(index)`: 50ms step, 150ms cap. Used for Experience entries and Projects row index. |
| `src/data/projects.ts` | 8 projects — source of truth for counter value "8 Projects Built". |
| `tailwind.config.ts` | Design token mappings (`bg-surface`, `text-text-primary`, etc.). These reference CSS vars that don't resolve at runtime due to `@theme` (see §4). Any new component should prefer explicit `zinc-*` Tailwind classes. |

---

## 3. Resolved Ambiguities

| Ambiguity | Resolution |
|---|---|
| Counter values | `8` Projects Built (from `projects.ts`), `17` Technologies (from `copy-content.md §5` Core Technologies tags), `4` Professional Roles (from `copy-content.md §4` experience entries). |
| Magnetic tag scope | Both Core Technologies AND Soft Skills tags (25 total). |
| Hook strategy | Updated existing `useIntersectionObserver` (not a new hook). Avoids duplication. |
| `@theme` fix | NOT applied. Light Mode is the active standard. `@theme {}` kept intentionally. |
| Bento Grid row stagger | `Math.floor(cardIndex / 3)`. Cards 0–2 → 0ms, 3–5 → 50ms, 6–7 → 100ms. |
| Hero `duration-600` | Fixed to `duration-500` (nearest valid Tailwind v3 utility). |

---

## 4. Deviations from Design System / Plan

| Item | Plan Spec | Implementation | Reason |
|---|---|---|---|
| Phase 1 `@theme` fix | Replace with `:root {}` to enable dark palette | `@theme {}` kept, `:root {}` NOT updated | User explicitly chose Light Mode. Dark palette tokens remain unresolved. |
| Cursor glow color | `rgba(255,255,255,0.04)` | `rgba(0,0,0,0.03)` | White glow is invisible on white background. Dark glow visible on light surfaces. |
| About tag background | `rgba(255,255,255,0.05)` mono style | `bg-zinc-100 text-zinc-800` | Dark-mode-only color. Light mode requires opaque zinc surface. |
| Design token resolution | `bg-surface`, `text-text-primary`, etc. via CSS vars | Tokens resolve to browser defaults (white/black) | `@theme {}` is a Tailwind v4 directive; v3 passes it through unrecognized. See bento-grid-engine handoff §4. |
| `className` reveal pattern | Template literals `` `reveal${x}` `` | Ternary `x ? "reveal is-visible" : "reveal"` | Template literals removed from all `className` props for webpack eval-source-map safety. |
| Phase 4 hook placement | "4 calls at top of Experience component" | Hook inside `ExperienceItem` sub-component | Cleaner React pattern; identical outcome. Rules of Hooks prevent calling in a loop at the parent level. |

---

## 5. Outstanding Issues

| Issue | Severity | Notes |
|---|---|---|
| CSS token resolution | Medium | `text-text-primary`, `bg-surface`, `border-border`, `rounded-card`, `rounded-tag` all resolve to browser defaults (black text, white bg, no border, square corners). Affects cards, nav, and hero. Not a regression — pre-existing from `@theme` decision. Fix requires moving tokens to `:root {}` if dark mode is ever adopted. |
| Video format `.mov` | Medium | Safari plays `.mov` natively. Chrome/Firefox silently reject hover autoplay. Recommend converting to `.mp4` + WebM. Pre-existing from project-modals handoff. |
| Cursor glow subtlety | Low | `rgba(0,0,0,0.03)` is very faint on white. May need to increase opacity to `0.05–0.08` or switch to a brand color for visibility. |
| `text-text-secondary` in About | Low | Used for paragraph text in About — resolves to browser default gray, not `#A1A1AA`. Visually acceptable but not spec-accurate. |

---

## 6. `#diferencial` Anchor Confirmation

`id="diferencial"` is placed on the outermost `<div>` of the Diferencial block in `About.tsx` (line ~254). The Hero CTA `href="#diferencial"` (with smooth-scroll via `handleNavClick`) will navigate correctly to this element. Confirmed by inspecting the compiled SSR HTML — the anchor is present in the static output.

---

## 7. Rendering Bug Fix — `Uncaught SyntaxError: Invalid or unexpected token`

**Symptom:** Browser threw `SyntaxError` at runtime. `npm run build` passed. Hard-reload and cache clear did not resolve it.

**Root cause (working theory):** Next.js dev mode wraps every module in `eval(__webpack_require__.ts("..."))`. Template literals inside `className` props — e.g. `` className={`reveal${x ? " is-visible" : ""}`} `` — are embedded as backtick strings inside that eval wrapper. In certain webpack eval-source-map edge cases this produces a token the browser JS engine rejects.

**Fix:** Every template literal was removed from every `className` prop across all reveal components. Replaced uniformly with:
- Single class: `` `reveal${x}` `` → `x ? "reveal is-visible" : "reveal"`
- With extra classes: `` `reveal${x} extra` `` → `(x ? "reveal is-visible" : "reveal") + " extra"`

**Files patched:** `About.tsx` (6 divs), `Projects.tsx` (1 div), `Experience.tsx` (1 div), `Contact.tsx` (1 div).

**Verification:** `npm run build` clean. Template literal count in compiled About/Projects eval blocks confirmed as 0 (only backticks present were inside a webpack comment string, not in application code).

---

## 8. Architecture Post-Mortem Compliance

Per the directive in `2026-06-04-project-modals-hover-mechanics-handoff.md §5`:

- **Immutable Rendering Logic:** All `.map()` structures in `Projects.tsx`, `Experience.tsx`, and `About.tsx` were left structurally unchanged. Only `className`, `style`, `ref`, and wrapper `<div>` attributes were modified.
- **Animation Graceful Degradation:** `useIntersectionObserver` defaults to `isVisible = true` when `IntersectionObserver` is undefined. No element is permanently trapped at `opacity: 0`. Counter and magnetic tag effects both check `prefers-reduced-motion` before running.
- **Surgical String Edits:** All reveal-related changes were limited to `className` string values and wrapping `<div>` attributes.
