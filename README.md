# Bidroom

<img src="docs/pitch/stills/00-title.jpg" alt="Bidroom. Your tender department, made of Grok Bots." width="640">

Track: **Multi-agent Systems.**

**Four Grok Bots and one human. Komisja is the in-house committee, there to reject the offer before the authority does. A human approves. No bot submits or signs.**

**65-second demo:** [demo/bidroom.mp4](demo/bidroom.mp4). That cut is a second tender, Straż Miejska on logintrade: GO, Writer drafts, Komisja rejects it in two rounds, then a Slack summary. The stills below are the other run.

Poland spent **PLN 587 billion** on public procurement in 2024 ([PIE](https://pie.net.pl/wp-content/uploads/2026/05/Zamowienia-publiczne-11.05.pdf)). Scout, a script on the public e-Zamówienia API, scored real notice **2026/BZP 00512450/01** at **65/100**. The buyer is the regional labour office in Wrocław. Offers are due 20 Nov 2026, 08:00. Analyst called NO-GO and told Writer not to draft. Komisja confirmed. The human wrote: **Approved. Do not submit.** Nothing was filed.

<table>
<tr>
<td width="50%">
<img src="docs/pitch/stills/01-scout-score.jpg" alt="Scout score 65 out of 100 on the Wrocław notice">
<br><b>Scout, 65/100.</b> Wojewódzki Urząd Pracy we Wrocławiu. Deadline 20 Nov 2026, 08:00.
</td>
<td width="50%">
<img src="docs/pitch/stills/02-runner-documents.jpg" alt="Runner reports ten files from platformazakupowa.pl and hands off to Analyst">
<br><b>Runner hands off to Analyst.</b> Ten files from platformazakupowa.pl, including the SWZ. No login, no captcha. The recording does not show the browser.
</td>
</tr>
<tr>
<td width="50%">
<img src="docs/pitch/stills/03-analyst-nogo.jpg" alt="Analyst says NO-GO. No ISO 27001, no ISO 20000-1, no ASP.NET team.">
<br><b>Analyst, NO-GO.</b> No ISO 27001, no ISO 20000-1, and no ASP.NET team. Writer is told not to draft. Komisja has no offer to review.
</td>
<td width="50%">
<img src="docs/pitch/stills/04-approved.jpg" alt="Human message Approved. Do not submit. Komisja and Analyst confirm.">
<br><b>Approved. Do not submit.</b> Komisja confirms the NO-GO. Analyst confirms nothing will be submitted. Slack was not connected on this run, so the summary stayed in the group. The line that says others are working is not a new draft.
</td>
</tr>
</table>

The bidder is fictional: Odra Soft, a 25-person Wrocław house on React and Node, PLN 8 m revenue, no ISO 27001. That gap, plus no ASP.NET team, is why this specification was a NO-GO.

On a GO, Writer drafts and Komisja sends blocking issues back to Writer for up to two rounds. That is the 65-second video. This Wrocław run stopped at NO-GO, before any draft.

The uncut recording of the Wrocław run is [demo/bidroom-raw-run.mp4](demo/bidroom-raw-run.mp4).

```bash
node scout/index.mjs --top 3
```

Node 22 or newer. No dependencies and no API keys. This reprints the shortlist. Paste that kickoff into the Bidroom group to start Runner, Analyst, Writer, and Komisja. Instructions and the company profile: [`docs/product/bots.md`](docs/product/bots.md), [`docs/product/bidroom.md`](docs/product/bidroom.md).
