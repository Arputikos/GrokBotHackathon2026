#!/usr/bin/env node
// Bidroom scout: e-Zamówienia notices → profile filter → heuristic fit score → shortlist kickoff message.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const HERE = dirname(fileURLToPath(import.meta.url));
const BOARD = 'https://ezamowienia.gov.pl/mo-board/api/v1/notice';
const PAGE_SIZE = 100;
const DAY = 86_400_000;
const SHORTLIST = 3;

const { values: args } = parseArgs({
  options: {
    profile: { type: 'string', default: resolve(HERE, 'profile.json') },
    days: { type: 'string', default: '14' },
    'min-deadline-days': { type: 'string', default: '5' },
    top: { type: 'string', default: '5' },
  },
});
const days = Number(args.days);
const minDeadlineDays = Number(args['min-deadline-days']);
const topN = Number(args.top);
for (const [k, v] of Object.entries({ days, minDeadlineDays, topN })) {
  if (!Number.isFinite(v) || v < 0) fail(`Invalid --${k}: expected a non-negative number`);
}

function fail(msg) {
  console.error(`scout: ${msg}`);
  process.exit(1);
}

const isoDay = (d) => d.toISOString().slice(0, 10);
const cpvCode = (s) => (s || '').split(' ')[0];

async function fetchNotices(cpv, from, to) {
  const url = new URL(BOARD);
  url.search = new URLSearchParams({
    NoticeType: 'ContractNotice',
    PublicationDateFrom: `${isoDay(from)}T00:00:00`,
    PublicationDateTo: `${isoDay(to)}T23:59:59`,
    CpvCode: cpv,
    PageSize: String(PAGE_SIZE),
  });
  const res = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  if (!res.ok) throw new Error(`e-Zamówienia ${res.status} for CPV ${cpv}`);
  const list = await res.json();
  if (list.length < PAGE_SIZE) return list;
  // The board ignores paging params, so a full page means the date range must be split.
  const spanDays = Math.round((Date.parse(isoDay(to)) - Date.parse(isoDay(from))) / DAY);
  if (spanDays < 1) {
    console.warn(`! CPV ${cpv} on ${isoDay(from)}: ${list.length} notices, page limit reached`);
    return list;
  }
  const mid = new Date(Date.parse(isoDay(from)) + Math.floor(spanDays / 2) * DAY);
  const halves = await Promise.all([fetchNotices(cpv, from, mid), fetchNotices(cpv, new Date(mid.getTime() + DAY), to)]);
  return halves.flat();
}

const ENTITIES = { nbsp: ' ', amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' };
function htmlToText(html) {
  return (html || '')
    .replace(/<(style|script)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) =>
      e[0] === '#' ? String.fromCodePoint(parseInt(e.slice(1).replace(/^x/i, ''), /^#x/i.test(e) ? 16 : 10)) : ENTITIES[e.toLowerCase()] ?? m)
    .replace(/\s+/g, ' ')
    .trim();
}

const URL_RE = /https?:\/\/[^\s"'<>]+/gi;
const GENERIC_PATH = /\/(strona|regulamin|instrukc|rejestracja|pomoc|help|rodo)/i;
const PLATFORMS = /platformazakupowa\.pl|ezamawiajacy\.pl|logintrade\.net|eb2b\.com\.pl|marketplanet\.pl|mwomp\.pl|smartpzp\.pl|e-propublico\.pl|egospodarka\.pl|drive\.google\.com/i;
const cleanUrl = (u) => u.replace(/[.,;:)\]]+$/, '');

function platformUrl(text, tenderId) {
  const section = text.match(/3\.1\.\) Adres strony internetowej prowadzonego postępowania:? (https?:\/\/[^\s"'<>]+)/i);
  const urls = [...new Set([section?.[1], ...(text.match(URL_RE) || [])].filter(Boolean).map(cleanUrl))]
    .filter((u) => URL.canParse(u) && !u.includes('ezamowienia.gov.pl'));
  const rank = (u) => {
    const { hostname, pathname } = new URL(u);
    return (PLATFORMS.test(hostname) ? 4 : 0) + (pathname.length > 1 && !GENERIC_PATH.test(pathname) ? 2 : 0);
  };
  const best = urls.reduce((a, u) => (a === undefined || rank(u) > rank(a) ? u : a), undefined);
  return best || `https://ezamowienia.gov.pl/mp-client/search/list/${tenderId}`;
}

function excerpt(text) {
  const start = text.search(/SEKCJA IV/i);
  return (start > 0 ? text.slice(start) : text).slice(0, 3000);
}

function toTender(n) {
  const text = htmlToText(n.htmlBody);
  return {
    noticeNumber: n.noticeNumber,
    orderObject: n.orderObject,
    orderType: n.orderType,
    cpv: cpvCode(n.cpvCode),
    organizationName: n.organizationName,
    organizationCity: n.organizationCity,
    organizationProvince: n.organizationProvince,
    publicationDate: n.publicationDate,
    submittingOffersDate: n.submittingOffersDate,
    belowEU: n.isTenderAmountBelowEU,
    tenderId: n.tenderId,
    noticeUrl: `https://ezamowienia.gov.pl/mp-client/search/list/${n.tenderId}`,
    platformUrl: platformUrl(text, n.tenderId),
    excerpt: excerpt(text),
  };
}

function fitScore(t, profile, now) {
  let score = 20;
  const why = [];
  const blockers = [];
  const subject = t.orderObject.toLowerCase();
  const body = `${subject} ${t.excerpt.toLowerCase()}`;

  if (profile.cpv.includes(t.cpv)) { score += 25; why.push(`CPV ${t.cpv} match`); }
  else if (profile.cpv.some((c) => c.slice(0, 2) === t.cpv.slice(0, 2))) { score += 10; why.push(`CPV division ${t.cpv.slice(0, 2)}`); }
  if (profile.preferredProvinces.includes(t.organizationProvince)) { score += 15; why.push(`region ${t.organizationProvince}`); }
  if (t.orderType === 'Services') { score += 5; why.push('services'); }

  const strong = ['mobiln', 'react', 'aplikacj'].filter((k) => body.includes(k));
  if (strong.length) { score += 10 * strong.length; why.push(`stack: ${strong.join(', ')}`); }
  const hits = profile.keywords.filter((k) => !strong.includes(k) && subject.includes(k));
  if (hits.length) { score += Math.min(15, 5 * hits.length); why.push(`keywords: ${hits.join(', ')}`); }

  const avoid = profile.avoidKeywords.filter((k) => subject.includes(k));
  if (avoid.length) { score -= 20 * avoid.length; why.push(`off-profile: ${avoid.join(', ')}`); }
  for (const cert of profile.missingCertifications) {
    if (body.includes(cert.toLowerCase())) { score -= 15; blockers.push(`${cert} mentioned (company has none)`); }
  }
  if (!t.belowEU) { score -= 5; why.push('above EU threshold'); }
  const daysLeft = Math.floor((Date.parse(t.submittingOffersDate) - now) / DAY);
  if (daysLeft >= 10) { score += daysLeft >= 20 ? 10 : 5; why.push(`${daysLeft} days to deadline`); }

  score = Math.max(0, Math.min(100, score));
  return {
    score,
    reason: why.join('; ') || 'no strong signals',
    hard_blockers: blockers,
    hint: blockers.length ? 'NO-GO' : score >= 60 ? 'GO' : score >= 40 ? 'MAYBE' : 'NO-GO',
  };
}

const fmtDate = (iso) => new Date(iso).toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw', dateStyle: 'short', timeStyle: 'short' });
const cut = (s, n) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const host = (u) => new URL(u).hostname.replace(/^www\./, '');

function kickoff(shortlist) {
  const lines = shortlist.map((t, i) =>
    `${i + 1}. ${t.noticeNumber} — ${t.orderObject} — ${t.organizationName} (${t.organizationProvince}), deadline ${fmtDate(t.submittingOffersDate)}. ` +
    `Scout score ${t.fit.score}/100 (${t.fit.reason}${t.fit.hard_blockers.length ? `; blockers: ${t.fit.hard_blockers.join('; ')}` : ''}). ` +
    `Documents: ${t.platformUrl} | Notice: ${t.noticeUrl}`);
  return [
    `New tender shortlist from scout (${shortlist.length}):`,
    ...lines,
    `@Analyst pick the one tender that best fits the pinned company profile and give GO / NO-GO with reasons; ` +
    `@Runner download the documents (SWZ + attachments) of the tender Analyst picks and extract the requirements; ` +
    `@Komisja challenge the Analyst's pick and assessment; post the result to Slack. Do not submit anything.`,
  ].join('\n');
}

async function main() {
  const profile = JSON.parse(await readFile(args.profile, 'utf8'));
  const now = new Date();
  const from = new Date(now.getTime() - days * DAY);
  const minDeadline = now.getTime() + minDeadlineDays * DAY;

  console.log(`Scout: ${profile.name} | CPV ${profile.cpv.join(', ')} | last ${days} days | deadline ≥ ${minDeadlineDays} days`);
  const lists = await Promise.all(profile.cpv.map((c) => fetchNotices(c, from, now)));
  const byNumber = new Map(lists.flat().map((n) => [n.noticeNumber, n]));
  const open = [...byNumber.values()].filter((n) => n.submittingOffersDate && Date.parse(n.submittingOffersDate) >= minDeadline);
  console.log(`Fetched ${lists.flat().length} notices, ${byNumber.size} unique, ${open.length} with deadline ≥ ${minDeadlineDays} days`);
  if (!open.length) fail('no open tenders match — try a larger --days or smaller --min-deadline-days');

  const tenders = open.map(toTender);
  for (const t of tenders) t.fit = fitScore(t, profile, now.getTime());
  tenders.sort((a, b) => b.fit.score - a.fit.score || Date.parse(a.submittingOffersDate) - Date.parse(b.submittingOffersDate));
  const top = tenders.slice(0, topN);

  console.log('');
  console.log(['#', 'Score', 'Hint ', 'Deadline'.padEnd(17), 'Prov', 'Notice'.padEnd(22), 'Subject'.padEnd(60), 'Platform'].join('  '));
  top.forEach((t, i) => {
    console.log([
      String(i + 1).padStart(1),
      String(t.fit.score).padStart(5),
      t.fit.hint.padEnd(5),
      fmtDate(t.submittingOffersDate).padEnd(17),
      (t.organizationProvince || '').padEnd(4),
      t.noticeNumber.padEnd(22),
      cut(t.orderObject, 60).padEnd(60),
      host(t.platformUrl),
    ].join('  '));
    console.log(`   ${cut(t.fit.reason, 140)}${t.fit.hard_blockers.length ? ` | blockers: ${t.fit.hard_blockers.join('; ')}` : ''}`);
  });

  const message = kickoff(top.slice(0, SHORTLIST));
  const outDir = resolve(HERE, 'out');
  await mkdir(outDir, { recursive: true });
  await writeFile(resolve(outDir, 'latest.json'), JSON.stringify({
    generatedAt: now.toISOString(),
    params: { profile: args.profile, days, minDeadlineDays, top: topN },
    counts: { fetched: lists.flat().length, unique: byNumber.size, open: open.length },
    kickoff: message,
    top,
  }, null, 2));

  console.log('\nKickoff message for the Bidroom group (paste into Grok Bot):\n');
  console.log(message);
  console.log(`\nSaved ${resolve(outDir, 'latest.json')}`);
}

main().catch((e) => fail(e.message));
