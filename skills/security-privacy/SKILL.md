---
name: security-privacy
description: Enforce kid-safe privacy-by-design for GrammarPals. Use for any feature involving storage, network calls, telemetry, dependencies, or user data.
---

# Security & privacy (kid-safe)

## Non-negotiables
- No personal data collection
- No accounts/logins
- No ads
- No external trackers/analytics SDKs
- No third-party embedded widgets that track users

## Safe storage
- Store only local progress (e.g., accessories owned, mastery status).
- Do not store identifiers or anything that could identify a child.

## Dependency hygiene
- No new dependencies without approval.
- Keep `npm audit` issues addressed (especially high severity).

## Input safety
- Validate content JSON shape before use.
- Avoid HTML injection (do not use `dangerouslySetInnerHTML` for content).
