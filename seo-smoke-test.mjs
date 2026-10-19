#!/usr/bin/env node
// seo-smoke-test.mjs: checks what a non-JavaScript crawler (GPTBot, PerplexityBot, ClaudeBot) receives.
// No dependencies (Node 18+).
//   node seo-smoke-test.mjs https://prelogin.accredian.com            key pages + infrastructure
//   node seo-smoke-test.mjs https://prelogin.accredian.com --sitemap  also checks every sitemap URL
// Exits with code 1 if any check fails, so it can gate a CI job after each Vercel deployment.

const BASE = (process.argv.find((a) => a.startsWith('http')) || 'https://prelogin.accredian.com').replace(/\/$/, '');
const CHECK_SITEMAP = process.argv.includes('--sitemap');
const IS_PRODUCTION = /^https:\/\/(www\.)?accredian\.com$/.test(BASE);
const UA = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot';

// Targets for the raw HTML. Adjust thresholds as the pages evolve.
const PAGES = [
  { path: '/', minWords: 1500, minProgramLinks: 20, mustContain: ['Popular Courses'] },
  { path: '/programs', minWords: 800, minProgramLinks: 20 },
  { path: '/programs/chief-technology-officer-programme', minWords: 1200, jsonLd: ['Course', 'BreadcrumbList', 'FAQPage'] },
  { path: '/course/cxo-leadership', minWords: 600, minProgramLinks: 5, jsonLd: ['BreadcrumbList', 'ItemList'] },
  { path: '/Faq', minWords: 800, jsonLd: ['FAQPage'] },
  { path: '/whyaccredian', minWords: 500 },
  { path: '/Successstories', minWords: 500 },
  { path: '/referandearn', minWords: 400 },
  { path: '/about', minWords: 300 },
];
const MUST_404 = ['/programs/zz-not-a-real-program', '/course/zz-not-a-real-category', '/free-courses/zz-not-a-real-course'];
const MUST_NOT_404 = ['/faq', '/career', '/successstories']; // lowercase URLs people type; should be 200 or redirect
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot'];

const results = [];
const notes = []; // extra lines printed after the report
let section = '';
const check = (name, ok, detail = '', failLevel = 'FAIL') =>
  results.push({ section, name, status: ok ? 'PASS' : failLevel, detail });

async function get(path, redirect = 'follow') {
  try {
    const res = await fetch(BASE + path, { headers: { 'User-Agent': UA }, redirect });
    return { res, body: await res.text() };
  } catch (e) {
    return { res: { status: 0, headers: new Headers() }, body: '', error: e.message };
  }
}

function visibleText(html) {
  return html
    .replace(/<(script|style|template|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}
const countWords = (t) => (t ? t.split(' ').length : 0);

// Words inside streamed Suspense blocks (<div hidden id="S:n">) that JavaScript moves into place later.
// Extractors that skip hidden elements never see this text.
function hiddenStreamWords(html) {
  const ranges = [];
  for (const m of html.matchAll(/<div hidden id="(S:\d+)">/g)) {
    const start = m.index + m[0].length;
    const end = html.indexOf(`"${m[1]}"`, start); // the $RC("B:n","S:n") call that reveals the block
    if (end > start) ranges.push([start, end]);
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged = []; // nested blocks overlap; count each character range once
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push([...r]);
  }
  return merged.reduce((n, [s, e]) => n + countWords(visibleText(html.slice(s, e))), 0);
}

function parseJsonLd(html) {
  const types = new Set();
  const questions = [];
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const walk = (x) => {
        if (Array.isArray(x)) return x.forEach(walk);
        if (x && typeof x === 'object') {
          [].concat(x['@type'] || []).forEach((t) => types.add(t));
          if (x['@type'] === 'Question' && x.name) questions.push(x.name);
          Object.values(x).forEach(walk);
        }
      };
      walk(JSON.parse(m[1]));
    } catch {
      types.add('INVALID_JSON');
    }
  }
  return { types, questions };
}

const toBase = (url) => url.replace(/^https?:\/\/[^\/]+/, '') || '/';
const attr = (html, re) => (html.match(re) || [])[1];

// ---------------------------------------------------------------- key pages
const home = await get('/');
const deployment = attr(home.body, /(dpl_[A-Za-z0-9]+)/) || 'unknown';

for (const p of PAGES) {
  section = p.path;
  const { res, body, error } = await get(p.path);
  check('responds 200', res.status === 200, error || (res.status !== 200 ? `got ${res.status}` : ''));
  if (res.status !== 200) continue;

  const text = visibleText(body);
  const words = countWords(text);
  check(`raw HTML has ≥ ${p.minWords} visible words`, words >= p.minWords, `${words} words`);
  const hidden = hiddenStreamWords(body);
  check('most text is not inside hidden streamed blocks', !words || hidden / words <= 0.5,
    `${Math.min(100, Math.round((100 * hidden) / Math.max(words, 1)))}% hidden`);

  const bailouts = (body.match(/BAILOUT_TO_CLIENT_SIDE_RENDERING/g) || []).length;
  check('at most 2 client-only (CSR bail-out) sections', bailouts <= 2, `${bailouts} found`);
  check('no "Loading..." placeholder in HTML', !/>\s*Loading\.\.\.\s*</.test(body));

  const h1 = (body.match(/<h1[\s>]/gi) || []).length;
  check('exactly one H1', h1 === 1, `${h1} found`);

  const canonical = attr(body, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i);
  check('has a canonical tag', !!canonical, canonical || 'missing');
  if (canonical) {
    const target = await get(toBase(canonical));
    check('canonical target returns 200', target.res.status === 200, `${canonical} → ${target.res.status}`);
  }

  const robotsMeta = attr(body, /<meta[^>]*name="robots"[^>]*content="([^"]*)"/i) || '';
  check('no noindex meta tag', !/noindex/i.test(robotsMeta), robotsMeta);
  const xRobots = res.headers.get('x-robots-tag') || '';
  check('no noindex X-Robots-Tag header', !/noindex/i.test(xRobots), xRobots, IS_PRODUCTION ? 'FAIL' : 'WARN');

  for (const s of p.mustContain || []) check(`raw HTML contains "${s}"`, text.includes(s));

  if (p.minProgramLinks) {
    const links = new Set([...body.matchAll(/<a\b[^>]*\bhref="([^"]*)"/gi)].map((m) => m[1])
      .filter((h) => /\/(programs|course)\//.test(h)));
    check(`≥ ${p.minProgramLinks} crawlable <a href> links to programs/categories`, links.size >= p.minProgramLinks,
      `${links.size} found`);
  }

  const { types, questions } = parseJsonLd(body);
  check('JSON-LD is valid', !types.has('INVALID_JSON'));
  const shown = [...types].filter((x) => !['ListItem', 'ImageObject', 'PostalAddress'].includes(x)).join(', ');
  for (const t of p.jsonLd || []) check(`JSON-LD includes ${t}`, types.has(t), types.has(t) ? '' : `found: ${shown}`);
  if (questions.length) {
    const missing = questions.filter((q) => !text.includes(q.trim()));
    check('every FAQPage question is also visible in the HTML', missing.length === 0,
      missing.length ? `missing: ${missing.slice(0, 2).join(' | ')}` : `${questions.length} questions`);
  }

  const alts = [...body.matchAll(/<img\b[^>]*\balt="([^"]*)"/gi)].map((m) => m[1].trim());
  const generic = alts.filter((a) => /^(|image|img|logo|vertical|cover images?|(university|company) \d+|[a-z0-9]+(-[a-z0-9]+)*)$/.test(a));
  check('image alt text is descriptive', generic.length === 0,
    generic.length ? `${generic.length} generic: ${[...new Set(generic)].slice(0, 5).join(', ')}` : '', 'WARN');
}

// ---------------------------------------------------------------- URL handling
section = 'URL handling';
for (const p of MUST_404) {
  const { res } = await get(p);
  check(`${p} returns a real 404`, res.status === 404, `got ${res.status}`);
}
for (const p of MUST_NOT_404) {
  const { res } = await get(p);
  check(`${p} resolves (lowercase URL)`, res.status === 200, `got ${res.status}`);
}

// ---------------------------------------------------------------- build hygiene
section = 'Build';
const chunks = [...new Set([...home.body.matchAll(/\/_next\/static\/chunks\/[\w.~-]+\.js/g)].map((m) => m[0]))];
const localhostHits = [];
for (let i = 0; i < chunks.length; i += 5) {
  const batch = chunks.slice(i, i + 5);
  await Promise.all(batch.map(async (c) => {
    const { body } = await get(c);
    if (/https?:\/\/localhost:\d+/.test(body)) localhostHits.push(c);
  }));
}
const htmlCleaned = BASE.includes('localhost') ? home.body.replaceAll(BASE, '') : home.body;
check('no localhost URLs in the HTML', !/https?:\/\/localhost:\d+/.test(htmlCleaned));
check(`no localhost URLs in ${chunks.length} JavaScript chunks`, localhostHits.length === 0, localhostHits.slice(0, 3).join(', '));

// ---------------------------------------------------------------- robots.txt and sitemap
section = 'robots.txt / sitemap.xml';
const robots = await get('/robots.txt');
check('robots.txt returns 200', robots.res.status === 200, robots.res.status !== 200 ? `got ${robots.res.status}` : '');
for (const bot of AI_BOTS) check(`robots.txt names ${bot}`, robots.body.includes(bot), '', 'WARN');
check('robots.txt declares a sitemap', /^sitemap:/im.test(robots.body));

const sm = await get('/sitemap.xml');
const locs = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));
check('sitemap.xml returns 200', sm.res.status === 200, `${locs.length} URLs`);
check('sitemap.xml has no unescaped "&"', !/&(?!amp;|lt;|gt;|quot;|apos;)/.test(sm.body));
const minutes = new Set([...sm.body.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1].slice(0, 16)));
check('lastmod values are real dates, not the build time', minutes.size > 10, `${minutes.size} distinct minute(s)`, 'WARN');
const odd = locs.filter((u) => /[A-Z&]/.test(new URL(u).pathname));
check('sitemap URLs are lowercase with no "&"', odd.length === 0, `${odd.length}: ${odd.slice(0, 3).map(toBase).join(', ')}`, 'WARN');

if (CHECK_SITEMAP) {
  section = 'Every sitemap URL';
  const problems = [];
  const queue = [...locs];
  await Promise.all(Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const url = queue.shift();
      const { res, body } = await get(encodeURI(toBase(url)));
      const robotsMeta = attr(body, /<meta[^>]*name="robots"[^>]*content="([^"]*)"/i) || '';
      const canonical = attr(body, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i) || '';
      const norm = (u) => decodeURIComponent(u).replace(/&amp;/g, '&').replace(/\/$/, '');
      const issues = [];
      if (res.status !== 200) issues.push(`status ${res.status}`);
      if (/noindex/i.test(robotsMeta)) issues.push('noindex');
      if (res.status === 200 && norm(canonical) !== norm(url)) issues.push(`canonical → ${canonical || 'none'}`);
      if (issues.length) problems.push(`${toBase(url)}: ${issues.join(', ')}`);
    }
  }));
  check(`all ${locs.length} sitemap URLs are 200, indexable and self-canonical`, problems.length === 0,
    `${problems.length} problem URL(s)`);
  if (problems.length) notes.push('Sitemap URLs with problems:', ...problems.sort().slice(0, 15).map((p) => `   · ${p}`));
}

// ---------------------------------------------------------------- report
const icon = { PASS: '✔', WARN: '!', FAIL: '✘' };
console.log(`\nSEO smoke test for ${BASE}  (deployment ${deployment}, user-agent GPTBot)\n`);
let last = '';
for (const r of results) {
  if (r.section !== last) { console.log(`\n${r.section}`); last = r.section; }
  console.log(`  ${icon[r.status]} ${r.status.padEnd(4)} ${r.name}${r.detail ? `  [${r.detail}]` : ''}`);
}
if (notes.length) console.log(`\n${notes.join('\n')}`);
const n = (s) => results.filter((r) => r.status === s).length;
console.log(`\n${n('PASS')} passed · ${n('WARN')} warnings · ${n('FAIL')} failed`);
process.exit(n('FAIL') ? 1 : 0);
