# To do

Shared list for both teammates. When you start something, put your name next to it. When it is finished, move it to [`DONE.md`](DONE.md) in the same commit if you can.

## Setup

- [ ] Each teammate: run `git config core.hooksPath .githooks` once (or `scripts/setup-hooks.sh` / `scripts/setup-hooks.ps1`) so pull and push print doc changes
- [ ] Create the four Grok Bots (`Runner`, `Analyst`, `Writer`, `Komisja`) from [`product/bots.md`](product/bots.md)
- [ ] Create the **Bidroom** group, add both people and the four bots, pin the company profile from [`product/bidroom.md`](product/bidroom.md)
- [ ] Connect Slack and confirm a bot can post there

## Build

- [ ] Scout script (cross-platform): e-Zamówienia API → filter by company profile → Grok fit score 0–100 → kickoff message (`gbot send`, or print to paste by hand)
- [ ] Pick a real demo tender whose documents are public (no login, no captcha)
- [ ] First full bot run on that tender (Runner → Analyst → Writer → Komisja)
- [ ] If `gbot` is used, run it only on the machine with Grok Bot desktop logged in

## Demo and submit

- [ ] Record a clean run and speed it up for the [60-second script](pitch/demo-script.md)
- [ ] Repo README for judges
- [ ] Export AI coding sessions into `/sessions`
- [ ] Submission checklist from [`../HACKATHON.md`](../HACKATHON.md): private repo, invite judges, keep commit history
- [ ] Optional: tiny local status page + Cloudflare quick tunnel if judges need a URL

## Rules of the road

- Hosting: [`decisions/001-hosting.md`](decisions/001-hosting.md) — local run, Cloudflare Tunnel if needed, no Vercel.
- Do not submit an offer or a qualified signature. Stop at human approval.
- Prefer frequent small commits so both people can pull progress.
