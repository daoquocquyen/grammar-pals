---
name: release
description: Run a safe release process for GrammarPals with CI checks, smoke tests, and privacy verification. Use when preparing a demo or production release.
---

# Release checklist

## Pre-release
1. CI green (lint/test/build/audit).
2. Manual smoke test:
   - start mission,
   - answer right/wrong,
   - halfway beat,
   - end reward unlock,
   - refresh (local progress persists).
3. Verify privacy constraints (no trackers, no analytics, no user data sent).
4. Check performance on a mobile screen size.

## Release notes
- 3–6 bullets: what changed and how to verify.

## Rollback
- Revert the last PR(s) if a critical issue appears.
