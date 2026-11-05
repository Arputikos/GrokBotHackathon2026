# To do

Shared list for both teammates. When you start something, put your name next to it. When it is finished, move it to [`DONE.md`](DONE.md) in the same commit if you can.

**Clock: Europe/Warsaw, 5 Nov 2026. Plan locked at 19:31. Submit at 21:00.** When a cutoff hits, stop the current box and start the next one, even if the current box is unfinished. Rule: [`decisions/002-deadline-cut.md`](decisions/002-deadline-cut.md).

## Now → 19:45 — bots and one tender

- [ ] Create the four Grok Bots (`Runner`, `Analyst`, `Writer`, `Komisja`) from [`product/bots.md`](product/bots.md). Paste the instructions. Do not rewrite them.
- [ ] Create the **Bidroom** group, add both people and the four bots, pin the company profile from [`product/bidroom.md`](product/bidroom.md)
- [ ] Run `node scout/index.mjs`. Pick the highest-scoring tender whose documents open with no login and no captcha. Prefer platformazakupowa.pl. Save the terminal output.
- [ ] Start screen recording before the kickoff is pasted.
- [ ] Connect Slack only if a test post lands inside this window.

**19:45 — move on.** Paste the kickoff with however many bots exist. Stop editing instructions. Leave Slack if it is not connected.

## 19:45 → 20:15 — one recorded run

- [ ] Paste the scout kickoff into the group (or `gbot send` from the machine where Grok Bot desktop is logged in).
- [ ] Keep recording. The take needs three shots: Runner's browser on the document platform, Analyst and Komisja in the same chat, a human reply that says approved.
- [ ] **20:05 — move on from waiting.** If Runner has not opened the platform, send one message that contains the document URL. Do not start a new run.

**20:15 — move on.** Stop the bots. No second take unless the browser shot is missing.

## 20:15 → 20:40 — judge video

- [ ] Cut the [45-second judge video](pitch/demo-script.md). The first 15 seconds must show the 587 bn line and the scout score.
- [ ] Export four stills: title, scout score, Runner on the platform, the approval.
- [ ] README for judges, with those stills on the first screen.

**20:40 — move on.** Stop editing. A short video in the repo beats a longer one that is still in the editor.

## 20:40 → 20:55 — submit

- [ ] Export AI coding sessions into `/sessions`
- [ ] Submission checklist from [`../HACKATHON.md`](../HACKATHON.md): private repo, invite judges, push. Do not squash or rebase.

**20:55 — freeze.** Copy the video onto the laptop. No more commits unless a judge cannot open the repo.

## Dropped tonight

- Cloudflare Tunnel, local status page, Chief of Staff bot. See [decision 002](decisions/002-deadline-cut.md).

## Setup

- [ ] Hooks on each machine: any agent that opens this repo should run `git config core.hooksPath .githooks` itself (see `AGENTS.md`); or run `scripts/setup-hooks.sh` / `scripts/setup-hooks.ps1`

## Rules of the road

- Hosting: [`decisions/001-hosting.md`](decisions/001-hosting.md) — local run, no Vercel. The tunnel is cut for tonight by [decision 002](decisions/002-deadline-cut.md).
- Do not submit an offer or a qualified signature. Stop at human approval.
- Prefer frequent small commits so both people can pull progress.
