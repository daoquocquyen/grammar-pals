# Phase 10 — Release + Iteration (GrammarPals)

## Release goal
Publish GrammarPals MVP (**v0.1.0**) so it’s playable online with a safe, repeatable release process.

---

## Hosting (recommended)
### Recommended: Vercel (Next.js)
- Connect GitHub repo to Vercel
- Auto-deploy on push to `main`
- Preview deployments for PRs

Alternatives (optional):
- Netlify
- Cloudflare Pages

---

## Release versioning
- First release: **v0.1.0**
- Future: small incremental releases (**v0.1.1**, **v0.1.2**…) for bugfixes and tuning.

---

## Release checklist (v0.1.0)

### A) Quality gates (must pass)
- [ ] CI is green: lint + test + build + audit
- [ ] Manual smoke test passes (Phase 9 smoke script)
- [ ] 10 full mission playthroughs completed without crashes/stuck states

### B) Kid-safety & privacy review (must pass)
- [ ] No accounts/login
- [ ] No personal data collection
- [ ] No ads
- [ ] No external trackers/analytics SDKs
- [ ] Local-only progress storage
- [ ] No unsafe content

### C) UX readiness (must pass)
- [ ] Works on Windows laptop + Android phone
- [ ] Buttons are large and easy to tap
- [ ] Text is minimal; audio optional and non-blocking
- [ ] Game has a clear stopping point after 1 mission

### D) Release steps (Vercel)
1. Create Vercel project from GitHub repo.
2. Confirm build succeeds in Vercel.
3. Set production deployment from `main`.
4. Confirm live URL works on:
   - Windows laptop
   - Android phone

---

## Post-release iteration loop (no kid data)

### What to track (manual notes)
- Confusing moments (where you think “what do I tap?”)
- Boring moments (pace feels slow)
- Frustration points (wrong-answer flow, hint clarity)
- Delight moments (pet reactions, reward unlock)

### Weekly iteration routine (simple)
1. Play 2 missions (desktop + mobile).
2. Write down the top 3 issues observed.
3. Create 1–3 small tickets.
4. Ship small fixes fast.

---

## First iteration candidates (common after MVP)
- Shorten intro/explanations (tap-to-continue)
- Improve clue highlight for wrong answers
- Improve accessory unlock delight (shorter but cuter)
- Add more content variety (without adding new grammar topics)

---

## Agent Handoff (for release tasks)

### Instructions for the agent
- Prepare GrammarPals for **v0.1.0** release.
- Ensure it deploys cleanly to **Vercel** (or chosen host).
- Add a simple **“For grown-ups”** page with:
  - privacy promise (no accounts, no tracking, local-only),
  - what skill is taught (is/are),
  - contact email placeholder (parent-only).

### Acceptance criteria
- [ ] CI passes: lint/test/build/audit
- [ ] Manual smoke test script is present in repo and matches Phase 9
- [ ] App deploys successfully and runs on production URL
- [ ] “For grown-ups” page exists and is linked from Home
- [ ] No trackers/analytics are introduced

### Constraints
- No personal data collection
- No accounts
- No external trackers/analytics SDKs
- No ads
- Keep UI kid-friendly and lightweight

### Test / verification steps
1. Run locally: `npm run lint && npm run test && npm run build`
2. Deploy preview → verify the mission flow end-to-end
3. Production deploy → verify on Windows laptop + Android phone
4. Confirm “For grown-ups” page content and link
5. Confirm no analytics packages/configs were added
