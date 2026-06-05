# Handoff: Project Modals & Hover Engine

**Date:** 2026-06-04
**Feature:** Project card interactivity — video autoplay, hover engine, fullscreen modal

---

## 1. Modified Files

| File                                     | Action                                                            | Phase   |
| ---------------------------------------- | ----------------------------------------------------------------- | ------- |
| `package.json`                           | Modified — added `framer-motion@12`, `focus-trap-react@12`        | Phase 1 |
| `src/data/projects.ts`                   | Modified — added `heroMediaType` field; updated all 8 media paths | Phase 2 |
| `src/components/modals/ProjectModal.tsx` | Created                                                           | Phase 3 |
| `src/components/sections/Projects.tsx`   | Modified                                                          | Phase 4 |
| `public/images/palmpay-hero.png`         | Created — copied from design_assets                               | Bug Fix |
| `public/images/brainsphere-hero.png`     | Created — copied from design_assets                               | Bug Fix |
| `public/images/ufber-hero.png`           | Created — copied from design_assets                               | Bug Fix |
| `public/videos/visokey-hero.mov`         | Created — copied from design_assets                               | Bug Fix |
| `public/videos/cycletracker-hero.mov`    | Created — copied from design_assets                               | Bug Fix |
| `public/videos/osscheduler-hero.mov`     | Created — copied from design_assets                               | Bug Fix |
| `public/videos/pacman-hero.mov`          | Created — copied from design_assets                               | Bug Fix |
| `public/videos/gestureauth-hero.mov`     | Created — copied from design_assets                               | Bug Fix |

---

## 2. Base Code Files Important for the Reviewer

| File                                   | Relevance                                                                                                                                                                                                        |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/data/projects.ts`                 | Source of truth for `heroMediaPath` and `heroMediaType`. Image projects point to `/images/*.png`; video projects point to `/videos/*.mov`.                                                                       |
| `tailwind.config.ts`                   | Design tokens. `text-text-primary`, `text-text-secondary`, `bg-surface`, `border-border` are used in cards but resolve to browser defaults (CSS var bug — see §4). Modal uses explicit `zinc-*` classes instead. |
| `src/app/globals.css`                  | `.reveal` / `.is-visible` scroll-reveal classes. Still consumed by the Projects section header and card wrappers.                                                                                                |
| `src/hooks/useIntersectionObserver.ts` | Drives card reveal. Single observer on the grid wrapper; re-triggers on scroll-up (known pre-existing behaviour).                                                                                                |

---

## 3. UI Shortcuts & Implementation Notes

- **`dynamic({ ssr: false })` for modal:** `ProjectModal` is loaded via `next/dynamic` with `ssr: false`. This keeps framer-motion and focus-trap-react entirely out of the SSR pass and code-splits them into a separate chunk. Side effect: the home page First Load JS dropped from ~65 kB to ~10 kB.
- **`<img>` instead of `<Image fill>` in cards:** The card media layer uses a plain `<img>` tag with `onError → display:none`. This avoids Next.js Image Optimization returning `400 Bad Request` for any missing asset, which in dev mode caused a full React tree crash. The media layer is a decorative background — SEO optimization via `<Image>` is not needed here.
- **Rect-based modal animation:** The modal animates from the card's `getBoundingClientRect()` snapshot to fullscreen using explicit framer-motion `initial/animate/exit` values. `layoutId` was tried and removed — framer-motion v12 `motion.div` with `layoutId` causes a server-side crash in Next.js 14 App Router when the component is SSR-rendered.
- **Video autoplay per card:** Each `ProjectCard` holds its own `videoRef`. On `mouseenter`, `video.play()` is called. On `mouseleave`, `video.pause()` fires immediately and `video.currentTime = 0` fires after a 300ms `setTimeout` (aligned to the opacity-out transition so the scrubber resets off-screen).
- **Touch detection:** `window.matchMedia("(hover: none)")` runs client-side in a `useEffect`. On touch devices the media layer renders at `opacity-[0.3]` persistently instead of 0; gradient overlay is always visible. `isTouch` starts as `false` on SSR — no hydration mismatch because the classes differ only in opacity, not in DOM structure.
- **`.mov` video files:** Assets were copied as-is from `02_design_assets`. Safari plays `.mov` natively. Chrome/Firefox will silently fail on the card hover autoplay (`video.play().catch(() => {})` swallows the error). Recommend converting to `.mp4` + WebM before production.

---

## 4. Deviations from Design System / Functional Specification

| Item                              | Spec                                            | Implementation                                     | Reason                                                                                                                                                                                                                     |
| --------------------------------- | ----------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Shared-element transition (modal) | Card expands into fullscreen via shared-element | Rect snapshot `initial → animate` (not `layoutId`) | `layoutId` with framer-motion v12 crashes Next.js 14 SSR. Functional result is identical visually.                                                                                                                         |
| Modal text tokens                 | `text-text-primary`, `text-text-secondary`      | `text-zinc-50`, `text-zinc-400`                    | Design tokens don't resolve in Tailwind v3 (`@theme` bug, inherited from prior phase). On a dark (`bg-zinc-950`) modal background, un-resolved tokens produce black-on-black text. Explicit zinc values ensure legibility. |
| Card media `<Image>`              | Next.js `<Image>` with optimization             | Plain `<img>` with `onError`                       | Next.js Image Optimization returns `400` for missing files, crashing the dev render. Media layer is decorative — no optimization needed.                                                                                   |
| Video format                      | `.mp4` / WebM implied by spec                   | `.mov` (QuickTime)                                 | Assets were provided as `.mov`. Cross-browser autoplay will fail on Chrome/Firefox silently. Conversion to `.mp4` is a follow-up task.                                                                                     |

---

## 5. Ready-for-Reviewer Checklist

- [x] TypeScript compiles without errors (`tsc --noEmit`)
- [x] Next.js production build succeeds (`npm run build`)
- [x] All 8 projects have real `heroMediaPath` assets in `public/`
- [x] `heroMediaType` set correctly for all 8 projects (3 image, 5 video)
- [x] Modal: portal, scroll lock, Escape key, focus trap, focus return, ARIA attributes
- [x] Modal: rect-based open animation (card → fullscreen) and close animation (fullscreen → card)
- [x] Modal: mobile slide-up fallback
- [x] Cards: CSS hover (translateY, border-color shift), media fade + scale
- [x] Cards: video autoplay on mouseenter, pause + reset on mouseleave
- [x] Cards: touch device persistent 30% opacity media layer
- [ ] Manual visual verification pending
- [ ] Video `.mov` → `.mp4` conversion pending (cross-browser autoplay)

### 🛑 Architectural Post-Mortem: Preventing Silent Rendering Failures

**Incident Context:** During a routine UI styling update to the technology tags, the application experienced a "silent rendering failure." The TypeScript compiler and Next.js dev server reported zero errors, but the `.map()` functions for the Projects and Experience sections failed to render content to the DOM (or trapped it invisibly via animation states).

**Strict Directives for All Future AI Developer Iterations:**

1. **Immutable Rendering Logic:** When tasked purely with styling or Tailwind class updates, you MUST NOT alter the underlying React component logic. Do not modify `return` statements, `.map()` structures, or conditional rendering blocks.
2. **Animation Graceful Degradation:** Never decouple component visibility from data existence. If adjusting scroll reveals (`.reveal`, `IntersectionObserver`, or framer-motion), ensure components are never permanently trapped at `opacity: 0`. If an observer fails, the content must default to visible.
3. **Surgical String Edits:** UI polish requests mean editing the `className` string only. Treat the surrounding React/JSX logic as read-only.
