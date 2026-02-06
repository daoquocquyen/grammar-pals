# Phase 7 — Agent-Ready Project Setup (Spec-Compliant Agent Skills)

## Purpose
Prepare the `grammar-pals` repo so AI coding agents can work safely and consistently:
- small, reviewable tickets,
- kid safety + privacy-by-design,
- quality gates (lint/test/build/security),
- reusable skills in the **Agent Skills** open spec format.

---

## Decisions Made

### Tech stack
- **Next.js (App Router) + TypeScript**
- Goal: modern and production-friendly, while MVP stays straightforward.

### Content location
- Game content stored in **`content/`** at repo root.

### Dependency policy
- **Ask-first**: Agents must not add new npm dependencies without explicit approval in the ticket.

### CI policy
CI runs on every PR:
- lint
- tests
- build
- security check: `npm audit --audit-level=high`

### Skills library (Agent Skills spec)
- Use spec-compliant structure:
  - `skills/<skill-name>/SKILL.md`
- Skills included:
  - dev, debug, fix, test, security-privacy, content, ui-ux, release

---

## Repo Structure (target)

- `app/` Next.js App Router pages/layouts
- `src/` shared UI/components/logic (as needed)
- `content/` question JSON packs and future curriculum content
- `public/` images/sounds/icons
- `docs/` phase documents + PRD/design specs
- `skills/` spec-compliant agent skills (folders with `SKILL.md`)
- `.github/` CI workflow + ticket template

---

## Next Phase Checklist (Phase 8: Development via small tickets)
- Create first setup tickets (scaffold app, lint/format, tests, CI).
- Then build MVP mission flow in small increments (one ticket per feature).
- Ensure each ticket includes acceptance criteria + verification steps.
