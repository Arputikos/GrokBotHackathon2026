# Demo scripts

Judges spend 30–60 seconds. Ship the 45-second cut. Keep the 60-second script for the stage at 21:30.

## 45-second judge cut

The first 15 seconds have to land if they close the tab early.

| Time | Screen | On-screen text |
|---|---|---|
| 0–6 s | Title card | "Poland: 587 billion zł a year in public tenders. Small firms lose before they see the documents." |
| 6–15 s | Scout terminal, one score circled | "Bidroom scores every new notice against your company." |
| 15–34 s | Group chat, sped up. Runner's browser on a platform with no API. Analyst says GO or NO-GO. Komisja pushes back. | "Grok Bots fetch the documents, argue, and try to reject the offer before the authority does." |
| 34–42 s | Human reply: approved (Slack, or the group if Slack is not connected) | "You get one message. You say yes." |
| 42–45 s | Logo | "Bidroom." |

Export four stills from this cut for the README: title, scout score, Runner on the platform, the approval.

## 60-second stage script

| Time | Screen | Voice-over |
|---|---|---|
| 0–7 s | Title card | "Poland spends 587 billion złoty a year on public tenders. Small IT companies miss most of them." |
| 7–15 s | `node scout/index.mjs` → shortlist | "Bidroom scans every new notice and shortlists the ones that fit your company." |
| 15–25 s | Group chat: Analyst picks one; Runner browses the platform (no API) and downloads the SWZ | "A team of Grok Bots picks the best one and fetches the documents from a platform with no API — in its own browser." |
| 25–35 s | Analyst: MET / NOT MET table → GO | "The Analyst checks every condition against your company and says go or no-go." |
| 35–48 s | Writer posts the draft; Komisja rejects it; Writer fixes it | "The Writer drafts the offer — and a committee bot tries to reject it before the real committee does." |
| 48–55 s | Slack message, human approves | "You get one message in Slack. You just say yes." |
| 55–60 s | Logo | "Bidroom — your tender department, made of Grok Bots." |

Recording tips: record the whole run once, cut idle waits, speed bot work 5–10×, keep each chat message on screen long enough to read one line.
