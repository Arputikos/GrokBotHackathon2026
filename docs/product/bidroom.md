# Bidroom

**A public-tender department made of Grok Bots.** Every day it finds tenders that fit the company, fetches the documents from procurement platforms that have no API, decides go / no-go, drafts the offer, and an adversarial "evaluation committee" bot tries to reject it before the contracting authority does. A human approves the final call.

Track: **Multi-agent Systems** (with a human approval step from Multiplayer AI).

## Problem
- Poland spent **PLN 587 bn on public procurement in 2024 (13.9% of GDP)** — [PIE report](https://pie.net.pl/wp-content/uploads/2026/05/Zamowienia-publiczne-11.05.pdf).
- Notices are in one place (BZP / e-Zamówienia, public API). The **documents are not**: in a sample of 36 IT notices from the last two weeks, the tender documents sat on ~10 different platforms (platformazakupowa.pl, mwomp.pl, marketplanet, ezamawiajacy.pl, logintrade, eb2b, even Google Drive). None has an API.
- SMEs have no tender team: they miss notices, can't read 80-page specifications in time, and lose on formal errors.

## Flow
```
scout (code, this repo)
  e-Zamówienia API → filter by company profile (CPV, region, deadline ≥ 5 days)
  → deterministic heuristic ranks fit 0–100 with reasons
  → shortlist of top 3 → kickoff message to the Grok Bot group (gbot CLI, or paste)
  → @Analyst picks one → @Runner fetches its SWZ → @Analyst MET / NOT MET + GO / NO-GO
  → @Writer drafts if GO → @Komisja tries to reject (max 2 rounds) → Slack → human approval

Grok Bot group "Bidroom"
  @Runner   opens the procurement platform, downloads SWZ + attachments, extracts requirements
  @Analyst  GO / NO-GO against the company profile, price range from past awards
  @Writer   offer draft + checklist of required documents
  @Komisja  adversarial review, sends blocking issues back to @Writer (max 2 rounds)
  → summary posted to Slack → human approves
```

## Why Grok Bot (and not just the API)
- Documents live on platforms without an API → the bot uses its own cloud browser.
- Bots hand work to each other and argue in one group chat.
- The result lands in Slack and waits for a human decision.

## Demo company profile (fictional)
Wrocław software house, 25 people, React / React Native / Node, PLN 8 m annual revenue, 3 public-sector mobile app references, no ISO 27001. CPV 72000000-5, 48000000-8. All of Poland, preference for Lower Silesia (PL02).

## Out of scope (deliberately)
- Submitting offers or qualified signatures — always stop at human approval.
- Web dashboard — Slack + the Grok Bot group are the UI. Cut for tonight by [decision 002](../decisions/002-deadline-cut.md).
- Platforms behind a login — the demo tender has public documents.
- A "Chief of Staff" bot. Cut at 19:31 by [decision 002](../decisions/002-deadline-cut.md).

## Plan B
- `gbot` fails → scout prints the kickoff message, paste it into the group by hand.
- Grok Bot unavailable → the 4 roles as a Grok API loop in code; weaker on Technical and Theme.

## Timeline (Europe/Warsaw)

Superseded at 19:31. Follow [`../decisions/002-deadline-cut.md`](../decisions/002-deadline-cut.md) and [`../TODO.md`](../TODO.md).

| Time | Goal |
|---|---|
| 19:31–19:45 | Four bots, Bidroom group, scout run, one public tender, recording on |
| 19:45–20:15 | One recorded group run. At 20:05, nudge @Runner with the document URL |
| 20:15–20:40 | 45 s judge video, four stills, README |
| 20:40–20:55 | `/sessions`, invite judges, push |
| 20:55–21:00 | Freeze |
