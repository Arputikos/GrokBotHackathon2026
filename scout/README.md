# Scout

Finds open IT tenders on e-Zamówienia that fit the company profile, ranks them with a deterministic heuristic, and prints a shortlist kickoff message for the Bidroom Grok Bot group. The final pick and GO / NO-GO is the @Analyst bot's job, not scout's.

```bash
node scout/index.mjs [--profile scout/profile.json] [--days 14] [--min-deadline-days 5] [--top 5]
```

Node 22+, no dependencies.

1. Fetches contract notices from the public e-Zamówienia board API for every CPV in the profile (last `--days` days), dedups by notice number, keeps tenders with a deadline at least `--min-deadline-days` away.
2. From each notice it extracts the procurement platform link (where the documents are) and a ~3000-character excerpt.
3. Scores fit 0–100 with a heuristic (CPV match, Lower Silesia preference, service type, stack and profile keywords, off-profile keywords, missing ISO 27001, days to deadline), with reasons, blockers and a GO / MAYBE / NO-GO hint.
4. Prints the top N, writes `scout/out/latest.json` (with the notice excerpt for each tender), and prints the kickoff message with the top 3 (paste it into the Bidroom group).

No API keys or environment variables needed. The demo profile is in [`profile.json`](profile.json): a fictional 25-person Wrocław software house.
