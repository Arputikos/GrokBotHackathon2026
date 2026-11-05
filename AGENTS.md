# Agent instructions

These instructions apply to every agent running in this repository, in every harness that reads `AGENTS.md` or is pointed here. Read [`HACKATHON.md`](HACKATHON.md) before you plan or write code. If a default habit conflicts with this file or `HACKATHON.md`, follow the hackathon rules.

Project docs (concept, bots, data sources, pitch) live in [`docs/`](docs/README.md). Shared handoff for both teammates lives in [`docs/TODO.md`](docs/TODO.md), [`docs/DONE.md`](docs/DONE.md), and [`docs/decisions/`](docs/decisions/README.md). Update those whenever you start, finish, or decide something. Hosting: run locally, optional Cloudflare Tunnel, no Vercel — [`docs/decisions/001-hosting.md`](docs/decisions/001-hosting.md).

## First action after opening this repo

Before any other work, check `git config --get core.hooksPath` in this repository. If the value is not `.githooks`, run this yourself immediately — do not ask the user and do not skip it:

```bash
git config core.hooksPath .githooks
```

The same command works on macOS, in Git Bash, and in PowerShell with Git for Windows. It only sets local repo config so every **pull** and **push** prints changes to `docs/TODO.md`, `docs/DONE.md`, and `docs/decisions/`. Then continue with the user's request.

`HACKATHON.md` is the extracted text of the organizer presentation (slides plus speaker notes). It is the source for the rules, tracks, submission requirements, and judging rubric below.

## Event

- Grok Bot Hackathon in Wrocław, 5 November 2026
- Sprint: 18:00–21:00 Europe/Warsaw — three hours to build
- 21:00–21:30 networking and submission review
- 21:30–22:00 live demos of the top teams
- 22:00–23:00 results and prize handover

## What to build

Pick one track and ship a working demo with your own take:

1. **Multiplayer AI** — people and AI working together. Create a shared experience where humans and AI collaborate, play, or solve a problem. Starting examples: shared workspaces, collaborative tools, games with AI players.
2. **Multi-agent Systems** — a team of agents with one shared goal. Build agents that split tasks, exchange ideas, and review one another’s work. Starting examples: research teams, coding crews, coordinated agent swarms.

Grok Bot and/or SpaceXAI APIs are required. Theme alignment means people + AI, or multiple agents, working together toward a shared goal.

## Hard rules

- Project implementation must happen during the 18:00–21:00 sprint. No prebuilt project code.
- Ideas may be prepared before the event.
- Commercially permitted libraries and open-source forks are allowed.
- Keep git history intact. Judges will review commits and session exports to check when the work was done. Do not squash, rebase, or rewrite history in a way that hides timing.
- Participant subscription benefits do not include API credits.

## Submission

1. A repository with the project code. Organizers asked for a **private** repository, with judges invited.
2. Commit the team’s AI coding session exports to [`/sessions`](sessions/) at the repository root.
3. Preserve build history so implementation during the sprint is visible.

## Judging

Each criterion is scored 1–5. No weighting or tie-break rule was supplied. Optimize the project for a high score on all five.

### Working Prototype

The submission must run end-to-end and demonstrate the agent’s core functionality.

1. Code does not run at all.
2. Major crashes or missing core features.
3. Partial functionality, major bugs remain.
4. Mostly stable with minor bugs.
5. Fully functional, polished, and ready for demo.

### Technical Complexity & Integration

Depth of Grok Bot / SpaceXAI API use, tools, and collaborative workflows. Depth of Grok Bot usage, tool-use APIs, and integration supporting collaboration between people and AI or across multiple agents.

1. Simple static mock-up.
2. Basic AI interaction without meaningful integration.
3. Functional integration supporting human-AI or agent-to-agent collaboration.
4. Sophisticated collaboration using tools, shared context, or coordinated tasks.
5. Advanced collaborative workflows with robust error handling and real-world data integration.

### Innovation & Creativity

An original agent concept, clever problem framing, and solution design.

1. Replicates an existing demo.
2. Minor tweak of a known idea.
3. Useful but not surprising.
4. Creative twist or new application of known tech.
5. Groundbreaking agent that opens a new use-case or paradigm.

### Real-World Impact

A tangible problem, clear user value, and potential to scale or deploy.

1. Purely academic or toy example.
2. Interesting but limited user relevance.
3. Solves a niche need.
4. Addresses a clear market or social need.
5. Demonstrates life-changing or large-scale impact potential (for example accessibility or productivity gains).

### Theme Alignment

How well the project embodies Multiplayer AI or Multi-agent Systems built with Grok Bot.

1. Barely related to either track.
2. Superficial connection without a functional collaborative demo.
3. Demonstrates basic human-AI or agent-to-agent collaboration.
4. Clear implementation where collaboration is central to the project.
5. Exemplifies either track, with people and AI or multiple agents working together cohesively toward a shared goal.

## How to work

- Prioritize a polished end-to-end demo over unfinished extra features.
- Make collaboration central to the product, not an add-on.
- Use Grok Bot tools, shared context, and coordinated tasks. Avoid a static mock-up or a thin wrapper around a single prompt.
- Prefer a real problem with clear user value over a toy demo.
- After meaningful coding sessions, save session exports into `/sessions`.
- If you help prepare a live demo, start with a wow moment; show two agents talking to each other (for example a research agent working with a design agent); show teaching Grok Bot a task by example (for example live LinkedIn sourcing); show completing a task and posting it to Slack; and show navigating an app without a connector, MCP, or API (for example WhatsApp).

## Product context from the briefing

Grok Bot can create bots for different jobs, be messaged like a teammate, be shared, and run automations and routines. It is available across platforms, can control a computer when needed, and has first-party coding-agent integration. Useful patterns from the briefing: treat bots like interns that can study and learn by chatting; automate repeated human unblocking rather than doing it by hand; and close the loop so a bot can observe and receive signals about work being done.
