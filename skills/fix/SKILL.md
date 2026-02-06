---
name: fix
description: Apply minimal, safe bug fixes in GrammarPals and prevent regressions. Use after root cause is identified.
---

# Fix protocol

## Steps
1. Confirm repro and root cause (see `skills/debug/SKILL.md`).
2. Make the smallest safe change.
3. Add/adjust tests when possible.
4. Verify locally: lint/test/build + manual check.
5. Document:
   - what was wrong,
   - why the fix works,
   - how to verify.
