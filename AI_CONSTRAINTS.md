# AI Constraints and Rules for Automated Agents

Purpose

- This document defines binding rules for any AI agent, bot, or automated script that interacts with this repository. All agents MUST follow these rules before making edits, opening commits, or running code.

Scope

- Applies to local scripts, CI agents, and any automated pull request creators interacting with the codebase under this repository root.

MANDATORY RULES

1. The `eval()` rendering bug: NEVER use template literals with dynamic variables inside `className` props in Next.js (e.g., NO `className={`reveal ${active ? 'on' : ''}`}`). This triggers an `Uncaught SyntaxError`. You MUST use strict string concatenation or pure ternaries (e.g., `className={"reveal " + (active ? "on" : "off")}`).
2. Map Iterations: Always ensure explicit `return` statements inside `.map()` loops. Do not rely on implicit returns in multi-line callbacks; be explicit to avoid accidental `undefined` array items.

REQUIRED BEHAVIORS

- No secrets: Agents MUST NOT write API keys, secrets, tokens, or credentials into the repository. If secrets are required for testing, use environment variables and document how to set them locally.
- No direct network effects: Agents must not perform external network calls that modify third-party resources (APIs, cloud infra) without explicit human authorization recorded in the PR.
- Deterministic edits: Avoid non-deterministic code transformations. Edits must be idempotent and reversible.

CODING & SAFETY CHECKS

- Type safety: Prefer TypeScript annotations for new modules. If adding runtime code, include basic type guards where appropriate.
- Tests and linting: If an agent modifies functional code, include or update tests and fix lint errors locally before opening a PR.
- Translations: Do NOT edit or remove translation keys without adding corresponding entries into `src/i18n/translations.ts` for all supported locales. Prefer additive changes.

COMMIT & PR GUIDELINES

- Commit messages created by agents must follow Conventional Commits (e.g., `feat:`, `fix:`, `docs:`, `chore:`) and include a short description and PR link if available.
- Agents must not force-push branches owned by humans or merge PRs without an explicit human approval comment.

ENFORCEMENT

- Failure to follow these constraints is a hard stop: human maintainers should revert or block the change and update this document to close the gap.

Contact

- If an automated process needs to deviate from these rules, create an issue describing the justification and get explicit approval from the repository owner.
