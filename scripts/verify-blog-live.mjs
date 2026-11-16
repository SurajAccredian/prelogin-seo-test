#!/usr/bin/env node
// verify-blog-live.mjs: read-only verification of the /blog migration against a running server.
// Node 18+, built-in fetch only. Sends User-Agent GPTBot, never follows redirects.
//
//   node scripts/verify-blog-live.mjs [base-url] [report-file]
//
// Default base is the dev tunnel; pass http://localhost:3000 for a local run. Exits 1 if any check fails.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const BASE = (process.argv[2] || "https://v87dw3fv-3000.inc1.devtunnels.ms").replace(/\/+$/, "");
const REPORT = process.argv[3] || "scripts/verify-blog-live.report.txt";
const SITE = "https://accredian.com";
const ORG_ID = "https://accredian.com/#organization";
const ALLOWED_OLD_HOST = "https://blog.accredian.com/#blog";
const POST = "/blog/top-10-genai-tools-dominating-2025";
const NIKKI = "/blog/in-talks-with-nikki-from-information-security-consultant";

const lines = [];
const out = (s = "") => {
  lines.push(s);
  console.log(s);
};
let pass = 0;
let fail = 0;
const failures = [];
const deviations = [];
const record = (ok, id, detail) => {
  if (ok) pass++;
  else {
    fail++;
    failures.push(`${id}: ${detail}`);
  }
  out(`${ok ? "PASS" : "FAIL"}  ${id}  ${detail}`);
};

async function get(p, { method = "GET", base = BASE, body = true } = {}) {
  const url = p.startsWith("http") ? p : base + p;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, {
        method,
        redirect: "manual",
        headers: { "User-Agent": "GPTBot" },
        signal: AbortSignal.timeout(30000),
      });
      const text = body && method === "GET" ? await res.text() : "";
      return { status: res.status, headers: res.headers, text, url };
    } catch (e) {
      if (attempt === 1) return { status: 0, headers: new Headers(), text: "", url, error: String(e.cause?.code || e.name || e.message) };
    }
  }
}

async function pool(items, fn, n = 3) {
  const results = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < items.length) {
        const k = i++;
        results[k] = await fn(items[k], k);
      }
    })
  );
  return results;
}

const attr = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`, "i"))?.[1];
const countOf = (s, sub) => s.split(sub).length - 1;

function parsePage(html) {
  const canonical = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]).find((t) => attr(t, "rel") === "canonical");
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
  const ogUrl = metas.find((t) => attr(t, "property") === "og:url");
  const robots = metas.filter((t) => attr(t, "name") === "robots").map((t) => attr(t, "content") || "");
  const ld = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  const types = new Set();
  const orgIds = [];
  const walk = (n) => {
    if (Array.isArray(n)) return n.forEach(walk);
    if (n && typeof n === "object") {
      const t = n["@type"];
      [].concat(t || []).forEach((x) => types.add(x));
      if ([].concat(t || []).includes("Organization") && n["@id"]) orgIds.push(n["@id"]);
      Object.values(n).forEach(walk);
    }
  };
  let ldBad = 0;
  for (const block of ld) {
    try {
      walk(JSON.parse(block));
    } catch {
      ldBad++;
    }
  }
  return {
    canonical: canonical ? attr(canonical, "href") : undefined,
    ogUrl: ogUrl ? attr(ogUrl, "content") : undefined,
    noindex: robots.some((r) => /noindex/i.test(r)),
    oldHostTotal: countOf(html.replace(/api-blog.accredian.com/g, ""), "blog.accredian.com"),
    oldHostDisallowed: countOf(html.replace(/api-blog.accredian.com/g, ""), "blog.accredian.com") - countOf(html, ALLOWED_OLD_HOST),
    ldCount: ld.length,
    ldBad,
    types: [...types],
    orgIds,
  };
}

out(`verify-blog-live  BASE=${BASE}  ${new Date().toISOString()}`);
out("");

// 1) PAGE CHECKS
out("== 1) PAGE CHECKS ==");
const PAGES = [
  "/blog", "/blog/articles", "/blog/articles/page/2", POST, "/blog/category/data-science",
  "/blog/category/data-science/page/2", "/blog/spotlight", "/blog/spotlight/bfsi", "/blog/spotlight/consultation",
  "/blog/success-stories", "/blog/success-stories/ds", "/blog/success-stories/pm", "/blog/testimonials",
  "/blog/search?q=ai", "/blog/author/tushar-baug",
];
const pageRes = await pool(PAGES, async (p) => ({ p, r: await get(p) }));
const pageHtml = {};
for (const { p, r } of pageRes) {
  pageHtml[p] = r.text;
  if (r.status !== 200) {
    record(false, p, `status=${r.status}${r.error ? " " + r.error : ""}`);
    continue;
  }
  const d = parsePage(r.text);
  const pathOnly = p.split("?")[0];
  const paginated = /\/page\/\d+$/.test(pathOnly);
  const isSearch = pathOnly === "/blog/search";
  const problems = [];
  if (!d.canonical?.startsWith(SITE + "/blog")) problems.push("canonical not absolute https://accredian.com/blog/...");
  if (paginated) {
    if (d.canonical !== SITE + pathOnly) problems.push(`pagination canonical not self (${d.canonical})`);
  } else {
    if (!d.ogUrl?.startsWith(SITE + "/blog")) problems.push("og:url not absolute https://accredian.com/blog/...");
    if (d.canonical !== d.ogUrl) problems.push("canonical != og:url");
  }
  if (d.oldHostDisallowed > 0) problems.push(`old host x${d.oldHostDisallowed} outside BLOG_ID`);
  if (d.noindex !== isSearch) problems.push(isSearch ? "noindex missing on search" : "unexpected noindex");
  if (d.ldCount < 1) problems.push("no JSON-LD");
  if (d.ldBad) problems.push(`${d.ldBad} unparsable JSON-LD`);
  if (d.orgIds.some((id) => id !== ORG_ID)) problems.push(`Organization @id ${d.orgIds.filter((i) => i !== ORG_ID)}`);
  record(
    problems.length === 0,
    p,
    `status=200 canonical=${d.canonical} og:url=${d.ogUrl} noindex=${d.noindex} oldHost=${d.oldHostTotal} (bad ${d.oldHostDisallowed}) ld=${d.ldCount} @type=[${d.types.join(",")}]${problems.length ? "  !! " + problems.join("; ") : ""}`
  );
}

// 2) EXPECT 404
out("");
out("== 2) EXPECT 404 ==");
const GONE = [
  "/blog/author/admin", "/blog/category/chatgpt", "/blog/spotlight/finance", "/blog/x-does-not-exist",
  "/blog/articles/page/9999", "/blog/articles/page/0", "/blog/articles/page/abc", "/blog/success-stories/xx",
];
for (const { p, r } of await pool(GONE, async (p) => ({ p, r: await get(p) }))) record(r.status === 404, p, `status=${r.status}${r.error ? " " + r.error : ""}`);

// 3) EXPECT 308
out("");
out("== 3) EXPECT 308 ==");
const REDIR = [
  ["/blog/articles/page/1", "/blog/articles"],
  ["/blog/category/data-science/page/1", "/blog/category/data-science"],
  ["/blog/spotlight/bfsi/page/1", "/blog/spotlight/bfsi"],
];
for (const [from, to] of await Promise.all(REDIR)) {
  const r = await get(from, { body: false });
  const rawLoc = r.headers.get("location") || "";
  // Next 16 prod sends Location twice on the first (x-nextjs-cache: MISS) response of an ISR redirect; the values match.
  const loc = rawLoc.split(", ")[0];
  if (rawLoc !== loc) deviations.push(`${from}: Location header sent twice on a cache MISS ("${rawLoc}"), framework behaviour`);
  let locPath = "";
  try {
    locPath = new URL(loc, BASE).pathname;
  } catch {}
  record(r.status === 308 && locPath === to, from, `status=${r.status} location=${loc || "(none)"} expected path ${to}`);
}

// 4) HEADERS
out("");
out("== 4) HEADERS ==");
const HDR = [["/blog", /s-maxage=3600/], ["/blog/articles", /s-maxage=3600/], [POST, /s-maxage=3600/], ["/blog/search?q=ai", /no-store/]];
for (const [p, re] of HDR) {
  const r = await get(p, { body: false });
  const cc = r.headers.get("cache-control") || "(none)";
  record(re.test(cc), p, `Cache-Control=${cc}  X-Robots-Tag=${r.headers.get("x-robots-tag") || "(none)"}  expect ${re}`);
}

// 5) SITEMAP AND ROBOTS
out("");
out("== 5) SITEMAP AND ROBOTS ==");
const locs = (xml) => [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1]);
const toBase = (u) => u.replace(/^https?:\/\/[^/]+/, BASE);
const allBlog = new Set();
async function sitemap(p, depth = 0) {
  const r = await get(p);
  const l = r.status === 200 ? locs(r.text) : [];
  const blog = l.filter((u) => u.startsWith(SITE + "/blog/") || u === SITE + "/blog");
  const bad = l.filter((u) => /blog\.accredian\.com|\/blog\/search|\/blog\/author\/admin|devtunnels|localhost|staging/i.test(u));
  out(`  ${p}: status=${r.status} <loc>=${l.length} under ${SITE}/blog/=${blog.length} suspicious=${bad.length}${bad.length ? " e.g. " + bad.slice(0, 3).join(" ") : ""}`);
  blog.forEach((u) => allBlog.add(u));
  const children = l.filter((u) => /\.xml(\?|$)/.test(u));
  if (children.length && depth < 2) for (const c of children) await sitemap(toBase(c), depth + 1);
  return { status: r.status, total: l.length, blog: blog.length, bad };
}
const sm1 = await sitemap("/sitemap.xml");
const sm2 = await sitemap("/blog/sitemap.xml");
record(sm1.status === 200 && sm1.bad.length === 0, "/sitemap.xml", `status=${sm1.status} entries=${sm1.total} blog=${sm1.blog} suspicious=${sm1.bad.length}`);
record(sm2.status === 200 ? sm2.bad.length === 0 : true, "/blog/sitemap.xml", `status=${sm2.status} entries=${sm2.total} blog=${sm2.blog} (a 404 here is only informational)`);
out(`  blog URLs live in: ${[sm1.blog > 0 ? "/sitemap.xml" : "", sm2.blog > 0 ? "/blog/sitemap.xml" : ""].filter(Boolean).join(" and ") || "NEITHER"}`);
if (sm1.blog === 0 && sm2.blog === 0) record(false, "sitemap blog URLs", "no blog URLs found in either sitemap");
const sample = [...allBlog].sort(() => Math.random() - 0.5).slice(0, 25);
const sres = await pool(sample, async (u) => ({ u, r: await get(toBase(u), { body: false }) }));
const notOk = sres.filter((x) => x.r.status !== 200);
record(sample.length > 0 && notOk.length === 0, "sitemap sample", `${sample.length} random blog <loc> checked, non-200: ${notOk.length}${notOk.length ? " " + notOk.map((x) => `${x.r.status} ${x.u}`).join(", ") : ""}`);
const rb = await get("/robots.txt");
const disallows = [...rb.text.matchAll(/^\s*disallow:\s*(\S*)/gim)].map((m) => m[1]);
const sitemapLines = [...rb.text.matchAll(/^\s*sitemap:\s*(\S+)/gim)].map((m) => m[1]);
const searchBlocked = disallows.some((d) => d && "/blog/search".startsWith(d.replace(/\*.*$/, "")) && d.startsWith("/blog"));
record(rb.status === 200 && searchBlocked, "/robots.txt", `status=${rb.status} /blog/search disallowed=${searchBlocked} Sitemap lines=[${sitemapLines.join(", ")}]`);

// 6) CONTENT CHECKS on /blog
out("");
out("== 6) CONTENT CHECKS on /blog ==");
const html = pageHtml["/blog"] || "";
const OLD_STRIP = {
  "Accredian Spotlight": 280, "Data Science": 279, "Product Management": 207, "Accredian DS Spotlight": 109, AI: 98,
  "Non-Programmer": 91, "Programmer/Non-Programmer": 80, "Professional Background": 74, Industry: 71, "7 to 15 Years": 59,
};
const stripStart = html.indexOf("Explore by Category");
const stripHtml = stripStart >= 0 ? html.slice(stripStart, stripStart + 12000) : "";
const strip = [...stripHtml.matchAll(/<a\b[^>]*href="\/blog\/category\/[^"]*"[^>]*><span>([^<]*)<\/span><span[^>]*>(\d+)<\/span><\/a>/g)].map((m) => [m[1].replace(/&amp;/g, "&").replace(/^Artificial Intelligence$/i, "AI"), Number(m[2])]); // same category, renamed
out("  Explore by Category strip (new build):");
strip.forEach(([n, c]) => out(`    ${n} ${c}${n in OLD_STRIP ? (OLD_STRIP[n] === c ? "  (same as old)" : `  (old ${OLD_STRIP[n]})`) : "  (not in old strip)"}`));
const newNames = new Set(strip.map((s) => s[0]));
const missing = Object.keys(OLD_STRIP).filter((n) => !newNames.has(n));
const added = strip.filter(([n]) => !(n in OLD_STRIP));
out(`  in old strip but not new: ${missing.join(", ") || "none"}`);
out(`  in new strip but not old: ${added.map(([n, c]) => `${n} ${c}`).join(", ") || "none"}`);
out("  Note: the cause (100-category cap fix) cannot be proven from HTML alone; see the summary for the reasoning.");
record(strip.length > 0, "strip parsed", `${strip.length} categories`);
const nav = await get("/blog");
const ssIdx = html.indexOf("Alumni Career Articles");
const oldLabelIdx = html.indexOf("Success Stories");
out(`  success-stories group label "Alumni Career Articles" present=${ssIdx >= 0}`);
const childLinks = [...html.matchAll(/<a\b[^>]*href="(\/blog\/success-stories\/[^"]*)"[^>]*>([^<]*)<\/a>/g)].map((m) => `${m[2]} -> ${m[1]}`);
out(`  success-stories child links: ${[...new Set(childLinks)].join(" | ") || "none"}`);
void nav;
void oldLabelIdx;
record(ssIdx >= 0, "sub-nav label", `"Alumni Career Articles" present=${ssIdx >= 0}`);
const headers = countOf(html, 'id="site-header"');
const footers = countOf(html, 'class="footer MuiBox-root');
const footerTags = countOf(html, "<footer");
const headerTags = countOf(html, "<header");
record(headers === 1 && footers + footerTags === 1, "header/footer once", `id="site-header"=${headers} <header>=${headerTags} .footer(MUI)=${footers} <footer>=${footerTags}`);

// 7) NIKKI POST
out("");
out("== 7) NIKKI POST ==");
const nk = await get(NIKKI, { body: false });
record(nk.status === 200, NIKKI, `status=${nk.status}`);
try {
  const dir = path.resolve("migration/old-blog-redirects/src/legacy-redirects");
  const { resolveLegacyRedirect } = await import(pathToFileURL(path.join(dir, "resolve.js")).href);
  const data = JSON.parse(fs.readFileSync(path.join(dir, "redirect-data.json"), "utf8"));
  const want = SITE + NIKKI;
  for (const p of ["/in-talks-with-nikki-from-information-security-consultant", NIKKI]) {
    const hit = resolveLegacyRedirect({ pathname: p, searchParams: new URLSearchParams() }, data, {});
    record(hit?.location === want && hit.status === 301, `old-host ${p}`, `-> ${hit ? `${hit.status} ${hit.location}` : "NO RULE (404 on old host)"}  expected ${want}`);
  }
} catch (e) {
  record(false, "old-host resolver", `could not run resolver: ${e.message}`);
}

// 8) BRANCH DRIFT
out("");
out("== 8) BRANCH DRIFT (footer Refund Policy) ==");
const rendered = [...html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>(?:(?!<\/a>)[\s\S])*?Refund Policy/g)].map((m) => m[1]);
const src = fs.readFileSync("app/components/Footer/Footer.jsx", "utf8");
const srcHref = src.match(/href=\{?"([^"]+)"\}?[^>]*?(?:\s[^>]*)?>\s*<Typography[^>]*>[\s\S]{0,400}?Refund Policy/)?.[1];
out(`  rendered on BASE: ${rendered.join(", ") || "(not found)"}`);
out(`  source Footer.jsx: ${srcHref || "(not found)"}`);
out("  production expected: /terms/refund");
if (rendered[0] !== "/terms/refund") deviations.push(`footer Refund Policy href is ${rendered[0] || "not found"}, production uses /terms/refund (app/components/Footer/Footer.jsx)`);

// 9) HIDDEN CATEGORIES (topreads, trendingnow): reachable but noindex, and out of strips and sitemap
out("");
out("== 9) HIDDEN CATEGORIES ==");
for (const slug of ["topreads", "trendingnow"]) {
  const page = `/blog/category/${slug}`;
  const r = await get(page);
  const d = r.status === 200 ? parsePage(r.text) : null;
  record(r.status === 200 && d.noindex && d.canonical === SITE + page, page, `status=${r.status} noindex=${d?.noindex} canonical=${d?.canonical}`);
  const inHome = html.includes(`href="${page}"`) && stripHtml.includes(`href="${page}"`);
  const inArticles = (pageHtml["/blog/articles"] || "").includes(`href="${page}"`);
  const inSitemap = [...allBlog].some((u) => u === SITE + page || u.startsWith(SITE + page + "/"));
  record(!inHome && !inArticles && !inSitemap, `${page} excluded`, `home strip=${inHome} articles strip=${inArticles} sitemap=${inSitemap}`);
}

// 10) RAW HTML (no JS): content that crawlers must see without running scripts
out("");
out("== 10) RAW HTML CONTENT ==");
// visible text only: <script> (incl. the RSC payload) and tags removed, common entities decoded
const visibleText = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#8217;|&#x2019;|&rsquo;/g, "’")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
const POST_SENTENCE = "GPT-5 Turbo delivers faster, cheaper, and more contextually aware outputs than anything before it.";
const rawPost = await get(POST);
record(rawPost.status === 200 && visibleText(rawPost.text).includes(POST_SENTENCE), `${POST} body sentence`, `status=${rawPost.status} "${POST_SENTENCE.slice(0, 40)}..." in raw HTML=${visibleText(rawPost.text).includes(POST_SENTENCE)}`);
const CATEGORY = { path: "/blog/category/data-science", title: "Data Science Archives | Accredian Blog", heading: "Category: Data Science" };
const rawCat = await get(CATEGORY.path);
const catTitle = rawCat.text.match(/<title>([^<]*)<\/title>/i)?.[1];
record(rawCat.status === 200 && catTitle === CATEGORY.title, `${CATEGORY.path} <title>`, `status=${rawCat.status} title="${catTitle}"`);
record(rawCat.status === 200 && visibleText(rawCat.text).includes(CATEGORY.heading), `${CATEGORY.path} heading`, `"${CATEGORY.heading}" in raw HTML=${visibleText(rawCat.text).includes(CATEGORY.heading)}`);

// SUMMARY
out("");
out("== SUMMARY ==");
out(`PASS=${pass} FAIL=${fail}`);
failures.forEach((f) => out(`  FAIL ${f}`));
deviations.forEach((d) => out(`  DEVIATION ${d}`));
fs.writeFileSync(REPORT, lines.join("\n") + "\n");
process.exit(fail ? 1 : 0);
