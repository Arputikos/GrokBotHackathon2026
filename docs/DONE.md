# Done

Newest first. Move items here from [`TODO.md`](TODO.md) when they land.

## 5 November 2026

- Locked the 19:31 deadline plan: one recorded bot run, a 45-second judge video, submit by 20:55. Tunnel, status page, and Chief of Staff are cut. See [`decisions/002-deadline-cut.md`](decisions/002-deadline-cut.md).
- Scout ([`../scout/`](../scout/README.md)): e-Zamówienia API → profile filter → heuristic fit score (no API key) → top N table, `scout/out/latest.json`, shortlist kickoff message (top 3) for the Bidroom group; @Analyst makes the pick.
- Documented the hosting decision: no Vercel; run locally on a teammate laptop (macOS or Windows); optional public URL via Cloudflare Tunnel without visitor login. See [`decisions/001-hosting.md`](decisions/001-hosting.md).
- Added this collaboration trio (`TODO.md`, `DONE.md`, `decisions/`) and git hooks that print doc changes on pull and push (`.githooks/`, enable with `git config core.hooksPath .githooks`).
- Wrote Bidroom concept, bot instructions, data sources, idea shortlist, strategy, 60-second demo script, and `grok-bot-cli` security review ([PR #1](https://github.com/Arputikos/GrokBotHackathon2026/pull/1)).
- Extracted organizer rules and judging rubric into [`../HACKATHON.md`](../HACKATHON.md) and [`../AGENTS.md`](../AGENTS.md); added [`../sessions/README.md`](../sessions/README.md).
- Chose **Bidroom** (multi-agent tender team) as the project; stretch goal is a Chief of Staff bot that hires the team via `gbot`.
