# INDEX_FOR_AGENTS — GrammarPals (What to read, what to obey)

## Purpose
This index tells agents which documents are **requirements** (must follow) versus **reference** (helpful context).

If a ticket conflicts with a requirement, **stop and ask** rather than guessing.

---

## Must-follow (requirements)
These are the “rules of the project.” Read these first.

1) `AGENTS.md`
- Global constraints, PR rules, and what must be included in every change.

2) `skills/dev/SKILL.md`
- Coding conventions, clean code rules, and the development workflow.

3) `skills/security-privacy/SKILL.md`
- Kid-safety and privacy-by-design (no accounts, no trackers, local-only progress).

4) `docs/PHASE6_LEAN_PRD.md`
- MVP promise and scope (what we are building and what is out of scope).

5) `docs/UI_WIREFRAMES_MVP.md`
- UI source of truth for MVP screens, shared components, and interaction patterns.

6) `docs/PHASE5_CONTENT_PLANNING.md`
- Content schema and examples for questions, explanations, and audio text.

7) `docs/PHASE9_QA_PLAYTEST_TUNING.md`
- Smoke test script and release readiness expectations.

---

## Reference docs (helpful, not mandatory unless a ticket says so)
- `PLAN.md` (milestones and high-level plan)
- `docs/PHASE7_AGENT_READY_SETUP.md` (repo setup decisions and rationale)
- `docs/PHASE10_RELEASE_ITERATION.md` (release checklist and iteration loop)

---

## How to use this index (required behavior)
- For each ticket:
  - Read **Must-follow** docs above.
  - Then read any ticket-specific docs referenced by the ticket.
- Do not introduce new scope or new dependencies without approval.
- If you are unsure, propose 2 options and pick the simplest, or ask for clarification.

---

## Quick verification checklist (before PR)
- [ ] Followed kid-safety constraints (no accounts, no tracking, no external analytics)
- [ ] UI matches `docs/UI_WIREFRAMES_MVP.md` for any UI changes
- [ ] Content follows `docs/PHASE5_CONTENT_PLANNING.md` if touched
- [ ] `npm run lint && npm run test && npm run build` pass
- [ ] PR includes summary + how-to-verify steps
