# Phase 8 — Development via Small Tickets (MVP Build Plan)

## Approach (chosen)
**Approach A: Vertical slice first (recommended)**
Ship a playable end-to-end mission quickly, then iterate. This keeps MVP → production straightforward because we still enforce lint/tests/build and keep changes small.

---

## Ticketing rules (how we will work)
- One ticket = one branch/PR
- Small diffs only (aim: 1–8 files, minimal refactors)
- Every ticket includes:
  - Acceptance criteria
  - Edge cases
  - “Done when”
  - Test/verification steps
- Must follow: `AGENTS.md` + `skills/dev/SKILL.md` + `skills/test/SKILL.md`

---

## Ticket List (recommended order)

### Ticket 0001 — Scaffold Next.js + TypeScript app (App Router)
**Goal:** Create the Next.js project structure and confirm it runs locally.
**Acceptance criteria:**
- [ ] Next.js App Router project created and runs with `npm run dev`
- [ ] TypeScript enabled
- [ ] `README.md` includes “how to run” steps
**Constraints:** no tracking, no analytics packages
**Done when:** app loads a basic home page
**Verify:**
1. `npm install`
2. `npm run dev`
3. Open the home page

---

### Ticket 0002 — Add ESLint + Prettier + scripts (enforced)
**Goal:** Ensure consistent formatting and linting for production-ready code.
**Acceptance criteria:**
- [ ] `npm run lint` works and passes
- [ ] `npm run format` (or equivalent) works
- [ ] Prettier config present
- [ ] No lint “TODO ignore” shortcuts
**Edge cases:** none
**Done when:** CI can run lint successfully
**Verify:**
1. `npm run lint`
2. `npm run format` (or format:check)

---

### Ticket 0003 — Add test runner (Vitest) + 1 sample test
**Goal:** Set up a test foundation early.
**Acceptance criteria:**
- [ ] `npm run test` runs
- [ ] At least 1 passing sample unit test
- [ ] Testing docs in README (short)
**Constraints:** keep dependencies minimal
**Done when:** tests pass locally and in CI
**Verify:**
1. `npm run test`

---

### Ticket 0004 — Create MVP screen skeletons + routing
**Goal:** Create the core screens (even with placeholder UI) so we can build the flow.
**Screens:**
- Home (Start Rescue)
- Intro (Topic intro, skippable)
- Mission (Question screen)
- Halfway beat (after Q4)
- End (Recap + reward)
**Acceptance criteria:**
- [ ] Navigation between screens works (temporary buttons ok)
- [ ] Kid-friendly layout: big buttons, minimal text
**Done when:** you can click through the whole flow end-to-end
**Verify:** click Start → Intro → Mission → Halfway → End → back Home

---

### Ticket 0005 — Add content loading from `content/` + TypeScript types
**Goal:** Load questions from JSON files in `content/` with basic validation.
**Acceptance criteria:**
- [ ] Add `content/` folder with a small sample file (5–10 questions)
- [ ] Define TS types for Question/Option/Scene/Explanations
- [ ] Loader reads JSON and returns typed objects
- [ ] If JSON is invalid, show a safe error screen (no crash)
**Constraints:** no new deps without approval (avoid adding schema libs for now)
**Done when:** app can display one loaded question
**Verify:**
1. Run app
2. Start mission
3. First question renders from JSON

---

### Ticket 0006 — Implement mission state + progression (8 questions, halfway after Q4)
**Goal:** Implement mission flow logic (index, progress, halfway trigger).
**Acceptance criteria:**
- [ ] Mission uses exactly 8 questions (or selects 8 from content)
- [ ] After question 4 completes, show halfway beat once
- [ ] Progress indicator (simple: “3/8”)
**Edge cases:**
- Not enough questions in content → show friendly error
**Done when:** mission reliably progresses 1→8 with halfway beat
**Verify:** play mission; confirm halfway appears after Q4

---

### Ticket 0007 — Render templates T2 and T3 (sentence cards + picture clue)
**Goal:** Implement the two question templates used in MVP.
**Acceptance criteria:**
- [ ] T2 renders two sentence cards
- [ ] T3 renders picture clue (placeholder images ok) + two sentence cards
- [ ] Big tap targets; selectable states
**Constraints:** no heavy animation libs yet
**Done when:** both template types can be played without layout issues
**Verify:** include at least 1 T2 and 1 T3 in sample content; play both

---

### Ticket 0008 — Answer handling + gentle retry + “Clue → Rule” feedback
**Goal:** Implement learning flow for right/wrong.
**Rules:**
- First wrong attempt → show hint (highlight clue) and allow retry
- Max 2 attempts; if still wrong, show correct answer and continue
**Acceptance criteria:**
- [ ] Right answer triggers correct feedback
- [ ] Wrong triggers hint + retry
- [ ] After 2nd wrong, reveal correct and move on
- [ ] Feedback text matches `explanations` in content JSON
**Edge cases:** rapidly clicking answers; must not double-advance
**Done when:** behavior matches rules for multiple questions
**Verify:** intentionally answer wrong twice on a question and confirm behavior

---

### Ticket 0009 — Mastery + recap + local progress (no personal data)
**Goal:** Implement MVP mastery rules and local-only storage.
**Rules:**
- Mastery achieved if 6/8 correct AND last 3 correct
- Status: Learning → Getting it → Mastered (move up 1 step when mastery achieved)
**Acceptance criteria:**
- [ ] After mission, compute mastery result
- [ ] Show recap screen with short rule reminder
- [ ] Store only: mastery status + accessories owned/equipped (localStorage)
**Constraints:** no personal identifiers, no analytics
**Done when:** replaying mission persists progress locally
**Verify:**
1. Complete mission
2. Refresh page
3. Progress still present

---

### Ticket 0010 — Accessory reward unlock + inventory UI (20 accessories)
**Goal:** Implement reward unlock and dress-up UI.
**Acceptance criteria:**
- [ ] Completing mission unlocks exactly 1 new accessory
- [ ] Accessory unlock “cute skit” placeholder animation (simple version ok)
- [ ] Inventory shows owned accessories
- [ ] Equip accessory changes pet appearance (placeholder visuals ok)
**Edge cases:** if all accessories owned → show “You have them all!”
**Done when:** reward feels satisfying and persists locally
**Verify:** finish 2 missions → you should own 2 accessories

---

### Ticket 0011 — Audio: pet-style voice (TTS) + mute + repeat
**Goal:** Implement audio read-aloud for intro, prompts, and feedback using browser TTS (pet-like).
**Acceptance criteria:**
- [ ] Mute toggle works globally
- [ ] Repeat button replays the current line
- [ ] TTS speaks:
  - intro explanation
  - question prompt
  - feedback (correct/wrong/hint)
**Constraints:** no recording, no external voice services, no sending data out
**Edge cases:** if TTS unsupported → gracefully fall back (text-only + no crash)
**Done when:** a full mission is playable with audio on/off
**Verify:** play mission; toggle mute; use repeat on multiple screens

---

## Definition of “MVP playable” (Phase 8 goal)
- A kid can complete a full 8-question mission end-to-end
- Pet explains with “Clue → Rule” on every question
- Halfway beat occurs after question 4
- End screen shows recap + unlocks 1 accessory
- Local progress persists after refresh
- No accounts, no personal data, no trackers
- CI passes (lint/test/build/audit)

---

## Open questions (to revisit during implementation)
- Best intro length in practice (do kids skip?)
- Any performance issues with animations + TTS on mobile
- Whether 120 questions feels sufficient without repetition
