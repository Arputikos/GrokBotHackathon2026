# Bidroom

<img src="docs/pitch/stills/00-title.jpg" alt="Bidroom. Your tender department, made of Grok Bots." width="720">

**Four Grok Bots and one human. Komisja's job is to reject the offer. Tonight the human wrote: Approved. Do not submit.**

**▶ Demo video (65 s): [demo/bidroom.mp4](demo/bidroom.mp4)** — a second run (Straż Miejska tender on logintrade: GO, Writer draft, Komisja rejects in two rounds, Slack summary) · [unedited recording](demo/bidroom-raw-run.mp4)

Poland spent **PLN 587 billion** on public procurement in 2024 ([PIE](https://pie.net.pl/wp-content/uploads/2026/05/Zamowienia-publiczne-11.05.pdf)). Tonight Scout scored real notice **2026/BZP 00512450/01** at **65/100**. Wojewódzki Urząd Pracy we Wrocławiu, deadline 20 Nov 2026, 08:00. The team stopped. Nothing was filed.

<table>
<tr>
<td width="50%">
<img src="docs/pitch/stills/01-scout-score.jpg" alt="Scout score 65 out of 100 on the Wrocław notice">
<br><b>Scout, 65/100.</b> The only Lower Silesia notice in the top three. Two Warsaw notices scored 60.
</td>
<td width="50%">
<img src="docs/pitch/stills/02-runner-documents.jpg" alt="Runner reports ten files from platformazakupowa.pl, no login or captcha">
<br><b>Runner, in the chat.</b> Ten files from platformazakupowa.pl, including the SWZ. No login, no captcha. This recording has no browser viewport.
</td>
</tr>
<tr>
<td width="50%">
<img src="docs/pitch/stills/03-analyst-nogo.jpg" alt="Analyst says NO-GO and tells Writer not to draft. Komisja has no offer to review.">
<br><b>Analyst, NO-GO.</b> No ISO 27001. No ASP.NET team. Writer does not draft. Komisja has nothing to attack.
</td>
<td width="50%">
<img src="docs/pitch/stills/04-approved.jpg" alt="Human message Approved. Do not submit. Komisja and Analyst confirm nothing will be submitted.">
<br><b>20:24. Approved. Do not submit.</b> Komisja and Analyst both close it. Slack was not connected, so the approval stayed in the group.
</td>
</tr>
</table>

The bidder is fictional: Odra Soft, a 25-person Wrocław house on React and Node, PLN 8 m revenue, no ISO 27001. That gap is why the real specification was a NO-GO.

On a GO, Writer would draft and Komisja would try to reject the draft, up to two rounds. Tonight never got there. No bot submits or signs.

The full unedited run is 6 minutes: [demo/bidroom-raw-run.mp4](demo/bidroom-raw-run.mp4). The one-minute read is the four stills above.

```bash
node scout/index.mjs --top 3
```

Node 22 or newer. No dependencies and no API keys. This prints a kickoff for the group. It does not drive the four bots. Instructions and the company profile: [`docs/product/bots.md`](docs/product/bots.md), [`docs/product/bidroom.md`](docs/product/bidroom.md).
