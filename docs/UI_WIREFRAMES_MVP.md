# GrammarPals — MVP UI Wireframes (Text Spec)
Version: v1 (MVP)
Purpose: A clear, agent-friendly UI blueprint for a kid-safe, fun, animated web game.

This is the **UI source of truth** for MVP. Agents should implement screens and components to match this document.

---

## Global UI Principles (must follow)

### Kid-friendly
- Big tap targets (buttons/cards feel easy to tap on mobile).
- Minimal reading load; audio does the heavy lifting.
- Simple, consistent layout across screens.
- Friendly, supportive tone (never shame).

### Always-visible controls (where appropriate)
- **Mute** toggle (global)
- **Repeat** button (replay the current line of pet speech)

### Animation style (MVP-friendly)
- Lightweight, playful animations (no heavy libraries required).
- Tap feedback (micro-bounce) on buttons/cards.
- Pet is expressive (blink, bounce, happy dance).
- Short transitions between screens (slide/fade).

### Safety & privacy
- No accounts, no personal data, no trackers, no ads.
- Local-only progress (accessories + mastery status).

---

## Shared Components (reused across screens)

### 1) TopBar
**Placement:** top of screen
**Contains:**
- Left: small GrammarPals logo/title (optional)
- Right: **Mute** toggle (icon) and **Repeat** button (icon)

**Behavior:**
- Mute toggles all speech/audio.
- Repeat repeats the most recent pet spoken line for the current screen.

---

### 2) PetPanel
**Placement:** mid or bottom section depending on screen
**Contains:**
- Pet character (animated)
- Speech bubble (short text, optional—audio is primary)
- Optional mini emoji/reaction icon (⭐/❤️/😮)

**Animations:**
- Idle: blink + gentle bob
- Correct: happy dance (short)
- Wrong: gentle “thinking” face + point to clue
- Reward: big celebration pose

---

### 3) PrimaryButton
Large rounded button. One clear action.

Text examples:
- “Start Rescue”
- “Continue”
- “Play Another”
- “Equip”

---

### 4) SentenceCard (Answer option)
Large card that looks tappable (Duolingo-like).

States:
- Default
- Pressed (micro-bounce)
- Selected
- Correct (positive highlight)
- Incorrect (soft highlight, not harsh)
- Disabled (after choice is locked)

---

### 5) ProgressPill
Shows mission progress: `3/8`

Placement: near top, below TopBar.

---

### 6) ClueHighlight
When wrong on first attempt:
- Highlight the clue visually:
  - circle/pulse the animals (one vs many)
  - optionally highlight number badge (1/2/3)
- Pet says the hint.

---

## Screen 1 — Home (Start)
Route: `/`

**Goal:** A kid can start immediately; shows pet and current look.

**Layout**
- TopBar
- Center:
  - Big title: “GrammarPals”
  - PetPanel (pet idle, wearing currently equipped accessory)
- Bottom:
  - PrimaryButton: **Start Rescue**
  - Secondary button/icon: **Accessories** (opens accessory closet modal or page)
  - Small “Grown-ups” link (optional; opens a simple info modal about privacy)

**Audio**
- Pet greeting line (short, optional):
  - “Hi! Ready to rescue and learn is/are?”
- Repeat replays greeting.

**Animation**
- Pet idle animation always.
- Start button micro-bounce on tap.

---

## Screen 2 — Mission Intro (Story setup)
Route: `/mission/intro`

**Goal:** Show a mini-story: an animal needs help. Build motivation.

**Layout**
- TopBar
- Story card area (center):
  - Illustration/placeholder of sad animal
  - One short line text (optional): “Oh no! The kittens need help!”
- PetPanel:
  - Pet speaks: “Let’s help them! We’ll use is and are!”
- Buttons:
  - PrimaryButton: **Continue**
  - Small text button: **Skip**

**Audio**
- Pet reads the story + motivation (10–15s max).
- Skip immediately moves to Topic Intro.

**Animation**
- Sad animal wiggle/sigh (light).
- Pet concerned face.

---

## Screen 3 — Topic Intro (Teach the rule quickly)
Route: `/mission/topic`

**Goal:** Teach “is = one, are = many” in a playful, short way (skippable).

**Layout**
- TopBar
- Center:
  - Simple visual: one animal icon vs many animal icons
  - Tiny labels (optional): “one” and “many”
- PetPanel:
  - Pet says:
    - “Is is for one.”
    - “Are is for many.”
    - “Now you try!”
- Buttons:
  - PrimaryButton: **Start Quiz**
  - Small text button: **Skip**

**Audio**
- Must be short (10–15s) and skippable.
- Repeat repeats current line (or repeats full intro sequence, simplest is fine).

**Animation**
- Pet points to the one/many visual.

---

## Screen 4 — Question (Template T3 primary)
Route: `/mission/play`

**Goal:** Kid answers quickly with big choices; game feels alive.

**Layout**
- TopBar
- ProgressPill: `X/8`
- Center: PictureClue area
  - Large image/placeholder (one vs many of same animal)
  - Optional number badge (1/2/3)
- Bottom: two SentenceCards (A/B)

**Audio**
- Pet reads prompt:
  - “Choose the correct sentence.”
- Optionally reads each option when tapped (later); MVP can skip this.

**Interaction**
- Tap a SentenceCard locks the choice for feedback phase.

**Animation**
- Card press micro-bounce.
- Subtle sparkle on picture clue.

---

## Screen 5 — Feedback (Correct/Wrong + explanation)
Route: same as play screen (overlay/state), or `/mission/feedback` (implementation choice)

**Goal:** Always explain in “Clue → Rule” format. Keep it short.

**Correct flow**
- Pet reaction: happy dance
- Animal improves (sparkles, bandage removed, smile)
- Pet says (3–6s):
  - “Two cats is many. Many uses are.”

**Wrong flow (first attempt only)**
- Pet reaction: kind thinking face
- ClueHighlight activates (circle/pulse many)
- Pet says:
  - “Nice try! Look—this is many. Many uses are.”
- Allow retry (return to question choices)

**Wrong flow (second wrong)**
- Pet gently reveals correct answer (no shame)
- Pet says:
  - “It’s many, so we need are. Let’s keep going!”
- Continue to next question

**Buttons**
- Prefer **tap anywhere to continue** (simple + fast), or a big “Continue” button.
- For wrong-first-attempt: show “Try again” (optional; automatic is fine).

---

## Screen 6 — Halfway Beat (After Q4)
Route: `/mission/halfway` (or overlay)

**Goal:** Give a small story reward mid-mission.

**Layout**
- TopBar
- Center:
  - Animal looks noticeably better
  - Short text (optional): “You’re helping!”
- PetPanel:
  - Pet says: “Wow! They’re feeling better!”
- Button:
  - PrimaryButton: **Continue**

**Animation**
- Short celebratory sparkle.

---

## Screen 7 — Mission End (Recap + result)
Route: `/mission/end`

**Goal:** Close the session with a short recap; prepare reward.

**Layout**
- TopBar
- Center:
  - “Mission Complete!”
  - Animal fully happy (celebration)
  - Short recap text (optional):
    - “Remember: is = one, are = many.”
- PetPanel:
  - Pet says recap (2–4s)
- Button:
  - PrimaryButton: **Get Reward**

**Audio**
- Recap is short.
- Repeat repeats recap line.

---

## Screen 8 — Reward Unlock (Accessory)
Route: `/reward`

**Goal:** The reward feels delightful and “gamey” (mini-skit).

**Layout**
- TopBar
- Center:
  - Accessory appears (card with icon/name)
  - Pet tries it on (visual change)
- PetPanel:
  - Pet says: “You earned a new accessory!”
- Buttons:
  - PrimaryButton: **Equip**
  - Secondary: **Later**
- After equip:
  - “Nice look!” + confetti

**Rules**
- Exactly **1 accessory unlocked per mission**.
- If all owned: show “You have them all!” + a fun celebration instead.

---

## Screen 9 — Accessories Closet (Inventory)
Route: `/closet` or modal from Home

**Goal:** Kid can browse and equip owned accessories.

**Layout**
- TopBar
- Title: “Accessories”
- Grid of accessory cards:
  - Owned: colorful
  - Locked: greyed out with lock icon
- Tap owned → Equip
- Button: Back to Home

**Animation**
- Equip shows quick pet reaction.

---

## Error States (must be friendly)

### Content load error
Message:
- “Oops! Something went wrong with this rescue.”
Button:
- “Back to Home”

No scary technical text shown to kids.

---

## Notes for implementation (agent-facing)
- Keep animations lightweight (CSS transitions/Framer Motion optional but not required).
- Prefer simple “screen state machine” for mission steps.
- All screens must be usable on mobile.
- Audio/TTS must be optional and never block progress.
