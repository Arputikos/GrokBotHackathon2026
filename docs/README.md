# Docs

| Folder | What's inside |
|---|---|
| [../scout/](../scout/README.md) | Scout: finds and scores tenders, prints the kickoff message |
| [TODO.md](TODO.md) | Shared open work for both teammates |
| [DONE.md](DONE.md) | What already landed |
| [decisions/](decisions/) | Lasting choices, including [hosting (001)](decisions/001-hosting.md) |
| [product/](product/) | What we build: [Bidroom concept and architecture](product/bidroom.md), [bot roles and instructions](product/bots.md) |
| [research/](research/) | [How to win](research/strategy.md), [idea shortlist](research/ideas.md), [data sources](research/data-sources.md) |
| [security/](security/) | [grok-bot-cli review](security/grok-bot-cli.md) |
| [pitch/](pitch/) | [60-second demo script](pitch/demo-script.md) |

Event rules and judging rubric: [`../HACKATHON.md`](../HACKATHON.md). Agent rules: [`../AGENTS.md`](../AGENTS.md).

## Collaboration

Two people share this repo (one on macOS, one on Windows). Treat `TODO.md`, `DONE.md`, and `decisions/` as the handoff. Update them in the same commit as the work they describe, then push so the other person sees it on pull.

On every **pull** and **push**, a git hook prints what changed in these docs (and in `AGENTS.md` / `HACKATHON.md`). Enable the hooks once per machine:

```bash
git config core.hooksPath .githooks
```

Or run `scripts/setup-hooks.sh` (macOS / Git Bash) or `scripts/setup-hooks.ps1` (PowerShell). The hook is informational: it never blocks a push or pull.
