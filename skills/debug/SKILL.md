---
name: debug
description: Reproduce, isolate, and diagnose issues in GrammarPals before fixing. Use when a bug is reported or behavior differs from expected.
---

# Debugging workflow

## Steps
1. Reproduce reliably; write exact steps + expected vs actual.
2. Reduce to a minimal repro (smallest case that fails).
3. Inspect:
   - console errors,
   - state transitions (answer → feedback → next),
   - content loading/parsing (JSON shape).
4. Form a hypothesis (root cause) and confirm it.
5. Fix minimally (or create a fix ticket if large).
6. Verify original repro + nearby flows.
7. Add a test if feasible (especially for logic bugs).
