---
name: dev
description: Implement a ticket safely in GrammarPals using small diffs, clean TypeScript, and clear verification steps. Use for any feature work within ticket scope.
---

# Development workflow (GrammarPals)

## When to use
Use this skill when implementing any ticket (features, UI work, refactors within scope).

---

## Steps
1. Restate the ticket goal in 1 sentence.
2. Identify the smallest change that satisfies acceptance criteria.
3. Implement with TypeScript, clear naming, and small functions.
4. Avoid unrelated refactors.
5. Add/adjust tests when logic changes.
6. Run: lint → test → build.
7. Prepare PR summary:
   - what changed,
   - key files,
   - how to verify.

---

## Coding conventions (must follow)

### Formatting & linting (source of truth)
- Follow **ESLint + Prettier** output. Do not hand-format around it.
- Fix lint warnings when reasonable; do not ignore errors.

### TypeScript safety
- Avoid `any`. Prefer proper types or `unknown` with validation.
- Add explicit types for shared/public logic (e.g., question schema, mastery logic).
- Keep types close to the domain (Mission, Question, Option, Progress).

### Clean code (practical rules)
- Keep functions small and single-purpose.
- Use clear naming (mission/question/attempt/mastery/accessory).
- Avoid duplication: if logic repeats 3+ times, extract a helper.
- Separate **game logic** from **UI**:
  - put pure logic in a `src/lib/` or `src/domain/` style folder,
  - keep React components focused on rendering and interaction.

### Comments (only when helpful)
- Comment **why**, not what.
- Add comments for non-obvious rules (example: “mastery = 6/8 AND last 3 correct”).

### Next.js / React practices (MVP-friendly, production-safe)
- Prefer functional components.
- Keep state local where possible; avoid complex global state early.
- Keep components small; extract reusable UI components when it reduces duplication.

### Security & privacy hygiene (kid product)
- No secrets in the repo.
- No analytics/tracking SDKs.
- Do not use `dangerouslySetInnerHTML` for content.
- Validate content JSON shape before using it.
- Local-only progress storage (no identifiers).

---

## Rules
- One ticket = one branch (small diff).
- No new dependencies without explicit approval.
- Keep UI kid-friendly (big buttons, minimal text).
- Follow privacy constraints (no tracking, no accounts, local-only progress).
- Commit messages must follow Conventional Commits (see `AGENTS.md`).
