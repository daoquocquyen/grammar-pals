# Phase 6 — Lean PRD (GrammarPals MVP)

## 1) Product Summary

### Product name
- **GrammarPals** (repo: `grammar-pals`)

### Primary WHY (problem + value)
**Primary: WHY C**
- Give parents a **safe, quick** tool for kids to practice English grammar with **no accounts and no tracking**.

**Secondary: WHY B**
- Make grammar practice feel like a **real game** so kids will choose it voluntarily.

### Target users
- **Kids 7–11** (mixed), designed to work especially well for younger kids via minimal reading + strong audio.
- **Parents** as gatekeepers (safety + learning value).
- **Teachers** as allies (consistency + clarity).

---

## 2) MVP Scope (WHAT we will ship)

### MVP promise
A web game with **8-question Animal Rescue missions** teaching **is/are**, where:
- A **pet coach** introduces the grammar topic before the quiz (voice).
- After every answer, the pet explains **why** using **“Clue → Rule”** (voice).
- The game feels like a real game: **animations, character reactions, mini-story progress**.
- Completing a mission unlocks **1 pet accessory** (dress-up reward) with a cute unlock skit.
- Progress is **local-only**.
- Product is kid-safe: **no personal data, no accounts, no ads, no external trackers**.

### In scope (MVP)
- Single grammar skill: **is/are** (subject–verb agreement)
- Question templates: **T3 (picture clue)** + **T2 (choose correct sentence)**
- Difficulty progression across 8 questions (Very Easy → Medium+)
- Wrong-answer flow: gentle retry + hint; max 2 attempts per question
- Audio controls: **mute** + **repeat**
- Basic home/start screen, mission flow, end screen

### Out of scope (MVP)
- Any grammar topic beyond **is/are**
- Accounts, logins, cloud sync, profiles
- Ads, external trackers, analytics requiring identifiers
- Leaderboards, streaks, notifications, social sharing
- Large world map / long campaign storyline
- Multiplayer/classroom dashboards

---

## 3) User Experience Requirements

### Session flow (Flow B)
1. Home → “Start Rescue”
2. Rescue intro scene (short animation)
3. Pet topic intro (voice, skippable) + 1 example
4. Questions 1–4 (with reactions + explanations)
5. Halfway story beat (short animation)
6. Questions 5–8
7. Recap (voice)
8. Accessory unlock + equip
9. End screen: “Play another” / “Stop”

### Kid-friendly UI rules
- Big tap targets, minimal text, clear sentence cards
- Every prompt and explanation can be read aloud
- Supportive language only (no shame)

---

## 4) Success Metrics (MVP)

Recommended metrics (initial):
- **M1: Session completion rate**
  - % of missions where the kid finishes all 8 questions
- **M2: Within-session improvement**
  - Last 3 questions correct more often than first 3 (learning during play)
- **M5: Time per mission**
  - Typical mission completes within **5–10 minutes**

---

## 5) Non-Functional Requirements (Must Not Break)

- **Privacy-by-design**
  - No personal data collection
  - No accounts
  - No external trackers
- **Accessibility**
  - Big buttons, high clarity layout
  - Mute and repeat-audio controls
  - Minimal reading load
- **Performance**
  - Fast load and smooth transitions
  - Animations kept lightweight and short
- **Mobile-friendly**
  - Works well on phones/tablets (touch-first)

(Offline support can be considered later; not required for MVP.)

---

## 6) Risks & Mitigations

### Risk: Kids skip the teaching moments (intro/explanations)
- Mitigation:
  - Keep audio short (intro 10–15s; explanations 3–6s)
  - Make intro skippable
  - Use visuals to show the clue (one vs many)

### Risk: Repetition feels boring
- Mitigation:
  - 120-question content pack from templates
  - Variety via nouns/adjectives + visual scenes
  - Strong pet reactions and story progress per question

### Risk: Mission feels slow due to audio/animations
- Mitigation:
  - Keep animations snappy
  - Allow tap-to-continue after explanation starts
  - Keep voice lines short and reusable

### Risk: Parent distrust (screen time / “is it educational?”)
- Mitigation:
  - Clear value messaging: short sessions + explanations included
  - Kid-safe design: no ads, no accounts, no tracking
  - Clean stopping point (1 reward per session)

---

## 7) Next Phase Checklist (Phase 7: Agent-Ready Project Setup)
- Define repo setup and workflows for AI agents:
  - `AGENTS.md` rules (small diffs, tests, privacy constraints)
  - ticket template + acceptance criteria style
  - basic CI plan (lint, test, build)
- Decide tech defaults for web MVP (we’ll keep it simple and safe).
