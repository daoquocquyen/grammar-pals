---
name: content
description: Create or update GrammarPals question content using the project JSON schema and consistent “Clue → Rule” explanations. Use when adding questions, distractors, or word lists.
---

# Content workflow (questions)

## Rules
- Follow the JSON schema in `docs/PHASE5_CONTENT_PLANNING.md`.
- Keep explanations in “Clue → Rule” format.
- Avoid tricky nouns/exceptions in MVP.

## Checklist
1. JSON is valid.
2. Exactly 2 options, exactly 1 correct.
3. Scene matches the correct answer (one vs many).
4. Explanations are short and kid-friendly.
5. Run tests/build after changes.
