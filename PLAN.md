# PLAN — GrammarPals (MVP)

## MVP goal
Ship a kid-safe web game mission that teaches **is/are** with:
- pet coach intro + “clue → rule” explanations (voice),
- animated rescue story beats,
- 8-question mission (Flow B),
- 1 accessory unlock per completed mission,
- local-only progress.

## Milestone 1 — Repo + quality gates
- Next.js App Router + TypeScript scaffold
- ESLint + Prettier
- Test runner setup
- CI workflow (lint/test/build/audit)
- Basic pages load

## Milestone 2 — Core mission flow (no polish)
- Home screen → Start mission
- Topic intro (skippable)
- Question screen for T2/T3
- Answer feedback + hint retry rules (max 2 attempts)
- End screen + local reward unlock

## Milestone 3 — Game feel + accessibility
- Animations: reactions + progress + halfway beat + unlock skit
- Audio read-aloud integration (pet-style voice via TTS)
- Mute + repeat controls

## Milestone 4 — Content pack + tuning
- Load questions from `content/`
- 120 questions (T3 ~70, T2 ~50) with difficulty buckets
- Tune pacing to keep sessions 5–10 minutes

## Definition of done (MVP)
- Mission completes end-to-end reliably
- Explanations always present and kid-friendly
- No personal data collected; no trackers; no accounts
- CI green (lint/test/build/audit)
