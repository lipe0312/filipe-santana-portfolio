# Technical Standards

Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- TypeScript

Code Patterns & Practices

- Separation of concerns: Keep data (for example: `03_source_code/src/data/projects.ts`) distinct from UI components (`03_source_code/src/components/`).
- Internationalization: Use the `LanguageContext` provider and the `LanguageSwitcher` component. Store translation entries in `03_source_code/src/i18n/translations.ts` and reference keys from components.
- Motion & performance: Use `requestAnimationFrame` for continuous UI motion (see `GlobalCursor.tsx`) and throttle mouse-driven updates to avoid layout thrashing. Prefer read-then-write patterns and rAF batching for DOM updates.
- Accessibility: Keep semantic markup and keyboard handlers (Escape to close modals, focus return after modal close). Ensure interactive elements are reachable via keyboard.

Commit & PR Standards

- Use Conventional Commits for message prefixes: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`.
- Each PR must have a short description, testing steps, and at least one reviewer.

Linting & Type Safety

- Prefer TypeScript types for public data shapes. Run type checks before merging.
- Add or update unit/visual tests when behavior changes; for content-only edits, a visual smoke test is sufficient.

Branching & Releases

- Content and small fixes: branch per feature, open PR to `main` (or `master` if used) with `docs:` or `feat:` prefix.
- Major UI changes: open an RFC issue first and coordinate design assets from `02_design_assets` (design assets are not tracked in git; see top-level `.gitignore`).
