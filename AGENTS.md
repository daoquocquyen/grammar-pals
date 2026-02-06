# AGENTS.md — How to Work on GrammarPals (Rules for AI Coding Agents)

## Project mission
Build **GrammarPals**, a kid-safe web game that teaches English grammar through short, animated rescue missions with a pet coach and voice prompts.

## Required reading (source of truth)
Before starting any ticket, read:
- `docs/INDEX_FOR_AGENTS.md`
Treat the “Must-follow (requirements)” documents in that index as requirements.
If a ticket conflicts with a requirement, stop and ask for clarification rather than guessing.

## Non-negotiable constraints (kid safety + privacy)
- **No accounts, no login**
- **No personal data collection** (no names, emails, ages, voice recordings, identifiers)
- **No ads**
- **No external trackers/analytics SDKs**
- Store progress **locally only** (e.g., localStorage)
- Keep all content kid-safe and age-appropriate

## How to work (small, reviewable changes)
- **One ticket = one branch** (small diff)
- Make the smallest change that satisfies the ticket
- Avoid unrelated refactors
- Prefer TypeScript and type safety
- Keep functions small; separate UI and logic where reasonable

## Dependency policy
- **Do not add new npm dependencies** unless the ticket explicitly approves it.
- If a dependency seems necessary, propose:
  - why it’s needed,
  - alternatives,
  - security/maintenance considerations.

## Required checks before marking “Done”
- `npm run lint` passes
- `npm run test` passes
- `npm run build` passes
- Provide “How to verify” steps in the PR description
- Add/update tests when changing logic or core flows

## Testing expectations (pragmatic)
- Unit tests for game logic (attempts, mastery, progression, rewards)
- Component tests for key screens/flows where feasible
- Minimal smoke coverage for mission completion

## Accessibility & kid UX rules
- Big buttons / sentence cards, minimal text
- Audio controls: **mute** and **repeat**
- Supportive feedback only (no shame, no guilt)
- Animations should be lightweight and should not block progress

## Skills (Agent Skills spec)
Use the skills in `skills/<name>/SKILL.md`:

- Development: `skills/dev/SKILL.md`
- Debugging: `skills/debug/SKILL.md`
- Fix protocol: `skills/fix/SKILL.md`
- Testing: `skills/test/SKILL.md`
- Security & privacy: `skills/security-privacy/SKILL.md`
- Content changes: `skills/content/SKILL.md`
- UI/UX game feel: `skills/ui-ux/SKILL.md`
- Release process: `skills/release/SKILL.md`

## PR / change summary format (required)
Include in every PR:
- Summary of changes (2–5 bullets)
- Key files changed
- How to verify (step-by-step)
- Screenshots/GIFs for UI changes (if possible)
