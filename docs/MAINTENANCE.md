# Maintenance Guide

This guide explains how to safely make non-breaking content updates to the portfolio site. All content edits should be limited to data and translation files; UI or behavior changes require a code review.

1. Adding a Project

- File to edit: `03_source_code/src/data/projects.ts`.
- Steps:
  1. Open `03_source_code/src/data/projects.ts` and inspect the existing project objects to match shape and fields.
  2. Add a new object to the exported projects array. Keep property names and types consistent with existing entries.
  3. If the project uses text content shown in the UI, add translation keys to `03_source_code/src/i18n/translations.ts`. Use a descriptive key namespace such as `projects.<slug>.<field>` (for example: `projects.palmvein.title`).
  4. If the project includes external media (images/videos), place files in `03_source_code/public/images/` or `03_source_code/public/videos/` and reference the relative path from the project data.
  5. Run the app locally and verify the project card appears and the modal (if applicable) opens without layout shifts.

2. Adding an Experience (Job Role)

- File to reference: `03_source_code/src/components/sections/Experience.tsx` and `03_source_code/src/i18n/translations.ts`.
- Steps:
  1. Do NOT edit the Experience component unless adding behavior. To add a role, create a new translation block in `03_source_code/src/i18n/translations.ts` with keys following the existing pattern (`experience.roleN.role`, `experience.roleN.company`, `experience.roleN.location`, `experience.roleN.timeline`, `experience.roleN.summary`, and `experience.roleN.a1`, `a2`, ... for achievements).
  2. Increase the `experiences` array only if that array is maintained in a data file; otherwise, the component maps the available translation keys. Follow the pattern used in the current code.
  3. Preview locally and ensure the new entry respects responsive layout and reveal animations.

3. Adding a Gallery Photo

- Location: `03_source_code/public/images/_gallery/`.
- Steps:
  1. Add the image file to `03_source_code/public/images/_gallery/` with a descriptive filename (use lowercase, hyphens, and no spaces).
  2. Do NOT constrain the image with fixed pixel dimensions. The gallery uses a loose photos layout — the UI will arrange images responsively.
  3. If using Next.js `<Image />` for a new component, set `unoptimized={true}` to preserve EXIF orientation when required. If the existing gallery uses plain `<img>` tags, just place the file and update the `GALLERY_ITEMS` array in `03_source_code/src/components/sections/Gallery.tsx` if needed.
  4. Verify the marquee loop renders the image and that layout remains fluid across viewport sizes.

General Notes

- Always open a branch for content edits and follow the repository's PR process.
- Run a local build and a quick visual check across desktop and mobile widths before merging.
