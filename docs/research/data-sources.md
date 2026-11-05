# Data sources

## e-Zamówienia (BZP) public API — verified 5 Nov 2026, no key needed
```
GET https://ezamowienia.gov.pl/mo-board/api/v1/notice
  ?NoticeType=ContractNotice
  &PublicationDateFrom=2026-10-20T00:00:00
  &PublicationDateTo=2026-11-05T23:59:59     # required, 400 without it
  &CpvCode=72000000-5                         # industry filter, works
  &OrganizationProvince=PL02                  # PL02 = Lower Silesia, works
  &OrderType=Services                         # works
  &PageSize=50
```
Returns a JSON array. Useful fields: `noticeNumber`, `bzpNumber`, `orderObject`, `orderType`, `cpvCode`, `submittingOffersDate`, `organizationName`, `organizationCity`, `organizationProvince`, `tenderId`, `isTenderAmountBelowEU`, `htmlBody` (full notice; contains the link to the platform with the documents).

Past awards (for price ranges): a different `NoticeType` — to check during the sprint (e.g. `TenderResultNotice`).

## Where the documents live
Platform domains linked from 36 IT notices (CPV 72000000-5, 20 Oct – 5 Nov 2026):

| Domain | Notices |
|---|---|
| ezamowienia.gov.pl | 34 |
| platformazakupowa.pl | 20 |
| mwomp.pl | 4 |
| oneplace.marketplanet.pl | 2 |
| *.ezamawiajacy.pl | 4 |
| *.logintrade.net | 2 |
| *.eb2b.com.pl | 4 |
| drive.google.com | 2 |

This fragmentation is the core argument for Grok Bot's own browser.
