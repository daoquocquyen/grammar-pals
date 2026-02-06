# Phase 5 — Content Planning (Question Templates + Distractors)

## Decisions Made (MVP Content Plan)

### Content size (MVP)
- **Pack B (recommended): 120 questions total**
  - Enough variety for multiple sessions without feeling repetitive.
  - Generated via templates + word lists (not all hand-written).

### Noun list size (MVP)
- **Set 2 (recommended): 40 nouns**
  - Only clear, picture-friendly nouns.
  - Avoid collective/tricky nouns in MVP (e.g., “team”, “family”, “news”).

### Distractor strategy (wrong option)
- **Primary: Distractor A (recommended)**
  - Wrong choice flips **is/are** only (directly teaches the rule).
- **Gamey sprinkle (allowed)**
  - Add a light **Distractor B** only in the last 2 questions of a session:
    - small variation like capitalization/punctuation or “this/these” contrast,
    - still centered on is/are (no unrelated grammar errors).

### Sentence tone
- **Mix**, leaning playful (simple + occasional silly adjectives).

### T3 picture clue design
- **Picture A + Picture C (recommended)**
  - A: one animal vs group of the same animal
  - C: optional number badge (1 / 2 / 3) for clarity

### Audio script style (pet voice)
- **Script A (recommended, kid-friendly)**
  - “Look! That’s **many**. Many uses **are**.”
  - Avoid jargon like “plural.”

---

## MVP Templates (T2 + T3)

### Template T2 — Choose the correct sentence
**What the kid sees**
- Two sentence cards (A/B). One is correct, one is incorrect.

**Rules**
- Correct sentence matches the picture clue (one vs many).
- Wrong sentence uses the wrong verb (**is** vs **are**) but keeps everything else the same (Distractor A).

**Example**
- Picture: 2 cats
- Option A: “The cats are happy.”
- Option B: “The cats is happy.”

---

### Template T3 — Picture clue + choose the correct sentence
**What the kid sees**
- A big picture (one vs many animals) + two sentence cards.

**Rules**
- Picture is the main clue; optionally show a number badge.
- Sentences are short, concrete, and easy to read.

**Example**
- Picture: 1 dog (badge “1”)
- Option A: “The dog is fast.”
- Option B: “The dog are fast.”

---

## Word Banks (MVP)

### Nouns (40, picture-friendly) — example set
Animals:
- cat, dog, frog, duck, panda, rabbit, lion, tiger, bear, turtle
- fish, bird, monkey, fox, cow, pig, sheep, goat, horse, mouse

More critters:
- bee, bug, crab, snail, owl, penguin, dolphin, shark

Simple objects/foods (optional if easy to illustrate):
- ball, kite, cookie, cupcake, apple, banana, carrot, toy, robot, star

**MVP constraint:** avoid tricky nouns like “team”, “family”, “news”.

### Adjectives (mix: calm + silly)
Calm:
- happy, sad, big, small, fast, slow, tall, tiny, clean, messy

Silly:
- sleepy, silly, bouncy, wiggly, giggly, grumpy, sparkly, spooky

---

## Difficulty Buckets (Content Targeting)

Label each item with a difficulty bucket to match Phase 4 progression:

- **Very Easy:** picture extremely clear; may include number badge/number word
- **Easy:** clear one vs many; simple noun/adjective; no number word
- **Medium:** slightly longer sentence or visual distractions, but clue remains clear
- **Medium+:** more phrasing variety, still kid-friendly and grounded in one vs many

**MVP rule:** no confusing exceptions.

---

## “Clue → Rule” Audio Lines (Reusable Scripts)

### Topic intro (before quiz)
- “Today we learn **is** and **are**!”
- “**Is** is for **one**.”
- “**Are** is for **many**.”
- “Let’s rescue by choosing the right sentence!”

### After answer (right)
- “Yes! I see **many** — many uses **are**.”
- “Great! It’s **one** — one uses **is**.”

### After answer (wrong, first attempt)
- “Nice try! Look at the clue…”
- “Do we see **one** or **many**?”

### Recap (end of session)
- “Remember: **is = one**, **are = many**.”

---

## JSON Content Schema (for agents later)

### Schema (v1)
Each question is a single JSON object with these fields:

- id (string)
- template ("T2" or "T3")
- skill ("is_are")
- difficulty ("very_easy" | "easy" | "medium" | "medium_plus")
- scene (animal, count, numberBadge)
- prompt (text, audioKey)
- options (two options with text, isCorrect, audioKey)
- explanations (correct, wrong, hint; each with text and audioKey)

### Example: T3 (Picture clue)
```json
{
  "id": "isare_t3_0001",
  "template": "T3",
  "skill": "is_are",
  "difficulty": "very_easy",
  "scene": {
    "animal": "cat",
    "count": 2,
    "numberBadge": true
  },
  "prompt": {
    "text": "Choose the correct sentence.",
    "audioKey": "prompt_choose_correct_sentence"
  },
  "options": [
    {
      "id": "A",
      "text": "The cats are happy.",
      "isCorrect": true,
      "audioKey": "opt_isare_t3_0001_A"
    },
    {
      "id": "B",
      "text": "The cats is happy.",
      "isCorrect": false,
      "audioKey": "opt_isare_t3_0001_B"
    }
  ],
  "explanations": {
    "correct": {
      "text": "Two cats is many. Many uses are.",
      "audioKey": "exp_isare_many_are"
    },
    "wrong": {
      "text": "Nice try! Two cats is many, so we need are.",
      "audioKey": "exp_isare_wrong_many_are"
    },
    "hint": {
      "text": "Look! Many cats. Many uses are.",
      "audioKey": "hint_isare_many"
    }
  }
}
```

### Example: T2 (Choose correct sentence)
```json
{
  "id": "isare_t2_0015",
  "template": "T2",
  "skill": "is_are",
  "difficulty": "easy",
  "scene": {
    "animal": "dog",
    "count": 1,
    "numberBadge": true
  },
  "prompt": {
    "text": "Which sentence is correct?",
    "audioKey": "prompt_which_sentence_correct"
  },
  "options": [
    {
      "id": "A",
      "text": "The dog is sleepy.",
      "isCorrect": true,
      "audioKey": "opt_isare_t2_0015_A"
    },
    {
      "id": "B",
      "text": "The dog are sleepy.",
      "isCorrect": false,
      "audioKey": "opt_isare_t2_0015_B"
    }
  ],
  "explanations": {
    "correct": {
      "text": "One dog is one. One uses is.",
      "audioKey": "exp_isare_one_is"
    },
    "wrong": {
      "text": "Nice try! One dog is one, so we need is.",
      "audioKey": "exp_isare_wrong_one_is"
    },
    "hint": {
      "text": "Look! Just one dog. One uses is.",
      "audioKey": "hint_isare_one"
    }
  }
}
```

---

## Content Production Targets (MVP)
- Total questions: **120**
- Split by template:
  - **T3:** ~70 (more visual/gamey)
  - **T2:** ~50
- Split by difficulty:
  - Very Easy: 20
  - Easy: 40
  - Medium: 40
  - Medium+: 20

---

## Next Phase Checklist (Phase 6: Lean PRD)
- Convert MVP scope + game loop + learning rules into a Lean PRD (WHAT/WHY).
- Define MVP screens and success metrics (session completion, accuracy improvement).
- Define non-functional requirements (privacy, performance, accessibility).
- Confirm out-of-scope list.
