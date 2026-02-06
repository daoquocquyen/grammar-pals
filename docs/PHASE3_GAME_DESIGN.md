# Phase 3 — Game Design (Fun Loop)

## Decisions Made (MVP Game Feel)

### 1) Pet personality
- **Kind Coach + a little goofy**
  - Warm, encouraging tone with occasional silly faces/dances.
  - Goal: fun + safe, never shaming.

### 2) Per-question micro-loop (gamey option)
- Choose **Micro-loop B (more gamey)**:
  1. Pet asks the question (voice) and shows two big choices.
  2. Kid taps an answer.
  3. **Instant reaction animation** (pet + rescued animal reacts) (0.5–1s).
  4. Pet explains with **“Clue → Rule”** (voice) (3–6s).
  5. The rescued animal **visibly improves** a little each question (tiny progress beat).
  6. Next question slides in with a smooth transition.

### 3) Wrong answer experience
- Choose **Wrong style 1: Gentle retry (learning-first)**
  - Pet says: “Nice try! Let’s look at the clue…”
  - The game highlights the clue (e.g., shows “two” or shows multiple animals).
  - Kid retries by choosing again.
  - Guardrail: limit retries so sessions stay short (see constraints below).

### 4) Rescue mini-story structure
- Choose **Story format A: Single animal per mission**
  - One animal starts sad/needs help.
  - After each question, the animal improves a bit.
  - At the end, the animal is happy and rescued (big celebration moment).

### 5) Reward moment (accessory unlock)
- Choose **“Cute skit” unlock (5–7 seconds)**
  - Accessory appears.
  - Pet tries it on.
  - Pet does a short pose/dance.
  - Kid can tap “Equip” (default) or “Later”.

### 6) UI layout (Duolingo-like)
- Choose **UI 2: Sentence cards**
  - Two large sentence cards as answer options.
  - Big tap targets, high contrast, minimal text.
  - Optional icons/pictures on cards to support meaning.

---

## Core Fun Loop (What Makes It Feel Like a Game)
- **Tap → reaction → story progress → reward**
- Every answer causes:
  - a visible character reaction (pet + animal),
  - a small story change (animal gets better),
  - a clear learning moment (“Clue → Rule”).

---

## Animation Beats (MVP list)
### Must-have
1. **Rescue intro**: animal is sad/needs help (short scene).
2. **Question transitions**: slide/fade between questions.
3. **Tap feedback**: button/card press + micro-bounce.
4. **Right reaction**: pet celebrates + animal improves.
5. **Wrong reaction**: pet stays kind + points to clue + animal looks “not yet”.
6. **Halfway beat (from Phase 2 Flow B)**:
   - “You’re helping! The animal looks better!” (short scene after Q4).
7. **Mission complete**: animal fully happy + celebration.
8. **Accessory unlock skit**: pet tries on new accessory.

### Nice-to-have (only if easy)
- Small idle animations (pet blink, tail wag).
- Tiny “sparkle” effect when the animal improves.

---

## Feedback & Explanation Rules (Kid-Friendly)
- Always use **Clue → Rule**:
  - Identify the clue (one vs many).
  - State the rule simply.
  - Confirm the correct choice.
- Tone:
  - Right: “Yes! You saw the clue.”
  - Wrong: “Nice try—let’s look again.”

Examples:
- Right: “Great! It says **two cats** (many), so we use **are**.”
- Wrong: “Close! Look—there are **two cats**. Many means **are**.”

---

## Constraints / Guardrails (MVP)
- Keep the pace: target **5–10 minutes** for 8 questions including voice + animations.
- Wrong-answer retry limits:
  - Allow **1 retry** per question (max 2 attempts).
  - If still wrong, show the correct answer kindly and move on.
- Always provide:
  - **Mute** and **Repeat** buttons.
  - Minimal on-screen text (audio does the heavy lifting).

---

## Next Phase Checklist (Phase 4: Learning Design)
- Define mastery rules for **is/are** (when we consider a kid “getting it”).
- Define difficulty progression (easy clues → slightly trickier).
- Define feedback types (hint, explanation, encouragement).
- Define what data we store locally (progress only, no personal info).
