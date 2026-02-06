# Phase 9 — QA + Playtesting + Tuning

## Goals
- Catch bugs early and avoid regressions.
- Validate the game is fun and understandable.
- Tune pacing and difficulty to fit 5–10 minute sessions.

---

## Test Devices (MVP)
Primary devices for manual QA:
- **Windows laptop**
- **Android phone**

---

## QA Layers (MVP)

### Layer A — Every PR (required)
- CI is green:
  - lint
  - tests
  - build
  - `npm audit --audit-level=high`
- Manual smoke test (2–3 minutes) when the PR touches gameplay/UI/audio.

### Layer B — Regular self-playtesting (recommended)
- Play 1 full mission on:
  - Windows laptop (desktop)
  - Android phone (mobile)
- Check: pacing, clarity, delight, no crashes.

### Layer C — Kid playtesting
- **Not planned for MVP** (decision: no).

---

## Smoke Test Script (MVP)
Run this before merging any major gameplay change and before release:

1. Start mission from Home.
2. Hear intro OR skip intro (both should work).
3. Answer 1 question correctly → see positive feedback.
4. Answer 1 question incorrectly twice:
   - first wrong → hint + retry
   - second wrong → show correct + continue
5. Confirm halfway beat happens after question 4 and only once.
6. Finish mission (8 questions) → see recap.
7. Unlock accessory → equip it.
8. Refresh the page → progress persists (local-only).
9. If audio exists:
   - toggle mute
   - use repeat on intro and feedback

Pass/Fail rule:
- Any crash or stuck state = FAIL.

---

## Tuning Knobs (What we adjust)
- Intro length (10–15s; keep skippable)
- Explanation length (3–6s; allow tap-to-continue)
- Difficulty ramp (Very Easy → Medium+)
- Hint clarity (visual highlight strength)
- Reward pacing (1 accessory per mission; check delight)

---

## Release Readiness Checklist (MVP)
- [ ] 10 full missions played without crashes or stuck states
- [ ] Mission end-to-end works (Flow B: halfway after Q4)
- [ ] Windows laptop + Android phone UI usable (big buttons, minimal text)
- [ ] Audio does not block gameplay (mute/repeat work if included)
- [ ] Local progress persists on refresh (when storage available)
- [ ] Kid safety verified: no accounts, no personal data, no trackers
