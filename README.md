# Portfolio Site

A motion-forward modern portfolio site built with Next.js, React, TypeScript, and Tailwind CSS.

## Overview

This project is a personal portfolio website that emphasizes rich interactions, subtle motion, and a responsive Bento Grid layout for project discovery.

The frontend is implemented in `03_source_code/` and includes:
- Hero landing section with animated CTA buttons
- Projects section with hover previews, magnetic tag motion, and modal detail views
- Experience timeline with expandable achievements
- About section with animated counters, a pixel grid highlight, and tag interactions
- Infinite gallery marquee featuring images and interleaved video content
- Contact section with animated interactive links
- Global custom cursor and language switching support

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- focus-trap-react
- lucide-react

## Key Features

- Responsive, motion-rich portfolio UI
- Bento Grid project discovery layout
- Project detail modal with focus trap and scroll lock
- Infinite horizontal gallery marquee with touch support
- Magnetic tag repulsion and custom cursor animation
- Language switching with English/Portuguese support
- Accessibility considerations for reduced motion and keyboard navigation

## Project Structure

- `03_source_code/src/app/` — root layout, global styles, page shell
- `03_source_code/src/components/` — reusable UI components and sections
- `03_source_code/src/components/sections/` — page sections such as Hero, Projects, Experience, About, Gallery, Contact
- `03_source_code/src/components/modals/` — project detail modal
- `03_source_code/src/context/` — language provider and translations
- `03_source_code/src/data/` — project data definitions
- `03_source_code/src/hooks/` — custom hooks like `useIntersectionObserver`
- `03_source_code/src/lib/` — utility helpers
- `03_source_code/public/` — static assets, images, videos, icons

## Installation

From the repository root:

```bash
cd 03_source_code
npm install
```

## Development

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the built application:

```bash
npm run start
```

Lint the project:

```bash
npm run lint
```

## Notes and Conventions

- Translation keys are defined in `03_source_code/src/i18n/translations.ts` and consumed through `LanguageContext`.
- Keep static content separate from UI rendering by storing data in `03_source_code/src/data/`.
- Motion and cursor interactions use `requestAnimationFrame` and rAF-throttled updates for performance.
- Accessibility is prioritized: reduced-motion fallbacks, keyboard interaction, Escape-to-close modal behavior, and focus return.

### Important AI / Code Constraints

This repository contains an `AI_CONSTRAINTS.md` document with project-specific rules. Two critical rules to keep in mind:

1. Avoid dynamic template literals inside `className` props in Next.js JSX. Use explicit string concatenation or pure ternaries instead.
2. When mapping arrays, include explicit `return` statements inside multi-line `.map()` callbacks.

## Documentation

Additional project documentation is available under `docs/`:

- `docs/PROJECT_STATE.md` — project state and implementation summary
- `docs/TECH_STANDARDS.md` — technical standards, code patterns, and commit guidelines

## Future Work

The current project state indicates the next priorities are:
- completing project modal media playback
- finalizing design tokens and motion polish
- running performance and accessibility audits before deployment

## License

This project is currently private.
