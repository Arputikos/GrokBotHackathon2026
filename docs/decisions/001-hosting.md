# 001 — Hosting for the hackathon demo

- Status: accepted
- Date: 5 November 2026 (Europe/Warsaw)
- Applies to: macOS and Windows teammates

## Decision

Do **not** host Bidroom on Vercel. Run scout and any local status page on a teammate's laptop (macOS or Windows). If judges need a public HTTPS URL, expose that local process with **Cloudflare Tunnel** (formerly Argo Tunnel) and **do not** enable Cloudflare Access, so visitors are not asked to log in.

The product UI for the demo stays the Grok Bot group chat plus Slack. Browser work already runs in Grok Bot's cloud, not on our server.

## Why not Vercel

- Vercel is fine for a static landing page or a short HTTP call (e-Zamówienia API, Grok API scoring).
- It does not fit the rest of the system: functions are short-lived and cannot wait out a multi-minute bot conversation; it does not run Docker workers; and `gbot` needs a logged-in Grok Bot desktop session (or a full session token).
- Putting that session token on Vercel would grant the deployment full account access. We will not do that.

## Why not a remote VM with Docker

- Extra setup and another failure point during a three-hour sprint.
- A remote VM does not have our Grok Bot desktop login, so `gbot` would still need to run on a laptop or we would have to ship a session token to the VM (same security problem).

## What we will do

- Run **scout** as a Python or Node script on whoever's laptop is doing the demo (Mac or Windows). Avoid OS-specific paths so either machine can run it.
- Keep the four bots (`Runner`, `Analyst`, `Writer`, `Komisja`) in a shared Grok Bot group. Both teammates join that group from their own machines.
- Post the final summary to Slack and wait for a human yes.
- Run `gbot` only on the computer where Grok Bot desktop is logged in. Do not copy session tokens between the Mac and the Windows PC.
- For an optional public URL: `cloudflared tunnel --url http://localhost:<port>` (quick tunnel, URL changes on restart) or a named tunnel if the URL must stay stable. Official `cloudflared` builds exist for both macOS and Windows.
- Do not put Cloudflare Access / Zero Trust in front of the demo URL.

## Consequences

- No production-like public app is required to demo.
- The laptop running scout and/or the tunnel must stay awake during the demo.
- A quick-tunnel URL is temporary; refresh the slide or chat message if it restarts.
- After the hackathon, a small always-on worker for scout plus a marketing page (Vercel is fine for that later) is a reasonable split. That is out of scope tonight.
