# 002 — Deadline cut at 19:31

Locked 5 November 2026, 19:31 Europe/Warsaw. Submit at 21:00. That evening a judge said they will watch only 1 minute of video and want a good README showcasing the project. See the update below.

This replaces the timeline table in [`../product/bidroom.md`](../product/bidroom.md). That table assumed bots and Slack by 19:20. At 19:31 scout is in the repo and nothing else has run.

## What "done" means at 21:00

1. One real Bidroom group run on one public tender: Runner opens a platform that has no API, Analyst and Komisja disagree in the chat, a human approves.
2. A video of at most 1 minute, cut to the [judge script](../pitch/demo-script.md) (the 45-second cut), plus four stills in the root README. That README has to showcase the project. A judge who never presses play must still see the story.
3. Private repo, judges invited, AI session exports in `/sessions`, commit history left as-is.

## Cut for tonight

- Cloudflare Tunnel and any status page.
- Chief of Staff bot.
- A second take, unless the first take has no browser shot.
- Bot-instruction edits after 19:45.
- Slack, if it is not posting by 19:50. The human approves in the group, and the video says so.

## When to move on

Stay on the current box until the cutoff, then leave it unfinished and start the next one. Do not extend a box.

| Cutoff | Stop | Start |
|---|---|---|
| 19:45 | Creating bots, connecting Slack, tuning prompts | Paste the scout kickoff. Screen recording is already on. |
| 20:05 | Waiting for the group to move on its own | One direct message to @Runner with the document URL. Do not restart. |
| 20:15 | The live run | Edit the 45-second video and grab four stills. |
| 20:40 | Editing | README, `/sessions`, invite judges, push. |
| 20:55 | All product and video work | Freeze. Keep the video file on the laptop as well as in the repo. |

The same boxes are the checklist in [`../TODO.md`](../TODO.md).

## Update — judge, 5 November evening

A judge told the team they will watch **only 1 minute of video**, and they want a **good README showcasing the project**.

- The submitted video stays the 45-second cut. Do not ship a file longer than 60 seconds. The 60-second script is for the stage at 21:30 only.
- The showcase is the root [`README.md`](../../README.md), not a doc buried under `docs/`. When the take exists, the four stills go on the first screen. The writing has to carry the story if they never press play.
- The earlier “judges spend 30–60 seconds per repo” line was our guess. It is retired. They named the video cap and asked for the README.
