# Decisions

Short records of what we agreed, so both teammates (macOS and Windows) and every agent stay aligned.

## How to use

- Add a new numbered file when the team makes a lasting choice (hosting, stack, demo scope, tools).
- Do not silently reverse a decision: update the file or add a follow-up that supersedes it.
- After you finish work, move the matching item from [`../TODO.md`](../TODO.md) to [`../DONE.md`](../DONE.md).
- Git hooks print changes to these files on every **pull** and **push**. One-time setup on each machine:

```bash
git config core.hooksPath .githooks
```

On Windows the same command works in Git Bash or PowerShell. Or run `scripts/setup-hooks.sh` / `scripts/setup-hooks.ps1`.

## Log

| ID | Decision |
|---|---|
| [001](001-hosting.md) | No Vercel. Run locally on a teammate laptop. Expose a public demo URL with Cloudflare Tunnel (no visitor login). |
| [002](002-deadline-cut.md) | From 19:31, only the bot run and a 45-second judge video. Tunnel, status page, and Chief of Staff are cut. Switch at 19:45, 20:05, 20:15, 20:40, 20:55. Evening update: judges watch only 1 minute of video and want the root README to showcase the project. |
