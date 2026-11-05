# Scout

Finds open IT tenders on e-Zamówienia that fit the company profile, scores them, and prints the kickoff message for the Bidroom Grok Bot group.

```bash
node scout/index.mjs [--profile scout/profile.json] [--days 14] [--min-deadline-days 5] [--top 5]
```

Node 22+, no dependencies.

1. Fetches contract notices from the public e-Zamówienia board API for every CPV in the profile (last `--days` days), dedups by notice number, keeps tenders with a deadline at least `--min-deadline-days` away.
2. From each notice it extracts the procurement platform link (where the documents are) and a ~3000-character excerpt.
3. Scores fit 0–100 with a reason, hard blockers and a GO / MAYBE / NO-GO hint.
4. Prints the top N, writes `scout/out/latest.json`, and prints the kickoff message for #1 (paste it into the Bidroom group).

## Environment

| Variable | Effect |
|---|---|
| `XAI_API_KEY` | Score with the Grok API (structured output, 4 requests in parallel, 1 retry; a failed tender falls back to the heuristic and is marked `*`). Without it, scout runs a keyword heuristic and says so. |
| `XAI_MODEL` | Override the model (default `grok-4.7`). |

The demo profile is in [`profile.json`](profile.json): a fictional 25-person Wrocław software house.
