# Done

Newest first. Move items here from [`TODO.md`](TODO.md) when they land.

## 5 November 2026

- A ten-seat review of the root README (Grok, OpenCode, Antigravity, Local ACP) landed in the page: Scout is a script, the run is a finished NO-GO, and the captions match the crops.
- Root README now leads with tonight's run: notice 2026/BZP 00512450/01 scored 65/100, Analyst NO-GO, human "Approved. Do not submit." Four cropped stills are in [`pitch/stills/`](pitch/stills/). The recording has no browser viewport.
- Recorded a judge’s instruction: they will watch only 1 minute of video, and they want a good README showcasing the project. The 45-second cut stays. See [`decisions/002-deadline-cut.md`](decisions/002-deadline-cut.md) and the root [`README.md`](../README.md).
- Root [`README.md`](../README.md) for judges; demo script updated to the 4-bot flow ([`pitch/demo-script.md`](pitch/demo-script.md)).
- Locked the 19:31 deadline plan: one recorded bot run, a 45-second judge video, submit by 20:55. Tunnel, status page, and Chief of Staff are cut. See [`decisions/002-deadline-cut.md`](decisions/002-deadline-cut.md).
- Scout ([`../scout/`](../scout/README.md)): e-Zamówienia API → profile filter → heuristic fit score (no API key) → top N table, `scout/out/latest.json`, shortlist kickoff message (top 3) for the Bidroom group; @Analyst makes the pick.
- Documented the hosting decision: no Vercel; run locally on a teammate laptop (macOS or Windows); optional public URL via Cloudflare Tunnel without visitor login. See [`decisions/001-hosting.md`](decisions/001-hosting.md).
- Added this collaboration trio (`TODO.md`, `DONE.md`, `decisions/`) and git hooks that print doc changes on pull and push (`.githooks/`, enable with `git config core.hooksPath .githooks`).
- Wrote Bidroom concept, bot instructions, data sources, idea shortlist, strategy, 60-second demo script, and `grok-bot-cli` security review ([PR #1](https://github.com/Arputikos/GrokBotHackathon2026/pull/1)).
- Extracted organizer rules and judging rubric into [`../HACKATHON.md`](../HACKATHON.md) and [`../AGENTS.md`](../AGENTS.md); added [`../sessions/README.md`](../sessions/README.md).
- Chose **Bidroom** (multi-agent tender team) as the project; stretch goal is a Chief of Staff bot that hires the team via `gbot`.
