---
name: test
description: Add pragmatic automated tests for GrammarPals (logic + key UI flows). Use when changing learning rules, progression, content loading, or core screens.
---

# Testing guidelines (pragmatic)

## When to use
Use this skill whenever you:
- change game/learning logic (attempts, hints, mastery, rewards),
- modify content loading/validation,
- touch mission flow screens or core interactions.

---

## What must be tested

### Game logic (unit tests)
- Attempts and retry rules (max 2 attempts per question).
- Mastery rules: **6/8 AND last 3 correct**.
- Reward unlock: exactly **1 accessory per mission**.
- Local progress updates (status changes, accessory ownership).
- Content JSON validation (reject invalid shapes safely).

### Key UI flows (component tests where feasible)
- Start mission from Home.
- Answer a question (right and wrong paths).
- Halfway beat appears after question 4.
- Mission completion and reward unlock screen shows.

---

## Conventions (must follow)

### Naming
- Test names should describe behavior, not implementation.
  - Good: `updates mastery when last three answers are correct`
  - Bad: `calls setState`

### Structure
- Prefer **Arrange → Act → Assert**.
- Keep tests small and deterministic.
- Avoid flaky timing-based assertions (especially with animations/audio).
  - If animations exist, test state outcomes rather than exact timings.

### What to mock vs not mock
- Unit tests: keep them pure; no DOM needed.
- UI tests: mock audio/TTS so tests don’t depend on browser speech features.
- If content files are loaded, use a small fixture JSON file.

### Coverage (pragmatic)
- Prioritize coverage for learning rules and mission progression.
- It’s okay to skip tests for purely visual animations, but never skip tests for:
  - correctness scoring,
  - mastery,
  - reward granting,
  - content parsing/validation.

---

## “Done when” for test work
- Tests cover the logic or flow changed by the ticket.
- `npm run test` passes locally.
- Tests are readable and maintainable (no giant, brittle snapshots).
