#!/usr/bin/env node
// check-blog-sitemap.mjs: read-only. Fetches /sitemap.xml from BASE, then requests EVERY https://accredian.com/blog
// <loc> (path on BASE, redirect: manual, GPTBot, concurrency 3, retry once). Each must be 200 with no redirect, a
// canonical equal to its own <loc>, and no noindex. Exits 1 on any failure. Node 18+, no dependencies.
//
//   node scripts/check-blog-sitemap.mjs [base-url] [report-file]
import fs from "node:fs";

const BASE = (process.argv[2] || "http://localhost:3001").replace(/\/$/, "");
const REPORT = process.argv[3] || "scripts/check-blog-sitemap.report.txt";
const SITE = "https://accredian.com";

async function get(url) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, { redirect: "manual", headers: { "User-Agent": "GPTBot" }, signal: AbortSignal.timeout(30000) });
      return { status: res.status, location: res.headers.get("location"), text: await res.text() };
    } catch (e) {
      if (attempt === 1) return { status: 0, error: String(e.cause?.code || e.name || e.message), text: "" };
    }
  }
}

const attr = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`, "i"))?.[1];
const decode = (s) => s.replace(/&amp;/g, "&");

const sm = await get(BASE + "/sitemap.xml");
if (sm.status !== 200) {
  console.error(`/sitemap.xml -> ${sm.status} ${sm.error || ""}`);
  process.exit(1);
}
const locs = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
const blog = locs.filter((u) => u === SITE + "/blog" || u.startsWith(SITE + "/blog/"));
const lines = [`check-blog-sitemap BASE=${BASE} ${new Date().toISOString()}`, `sitemap <loc> total=${locs.length} blog=${blog.length} duplicates=${blog.length - new Set(blog).size}`];

const failures = [];
let i = 0;
await Promise.all(
  Array.from({ length: 3 }, async () => {
    while (i < blog.length) {
      const url = blog[i++];
      const r = await get(BASE + url.slice(SITE.length));
      const problems = [];
      if (r.status !== 200) problems.push(`status ${r.status}${r.location ? ` -> ${r.location}` : ""}${r.error ? ` (${r.error})` : ""}`);
      else {
        const links = [...r.text.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]).filter((t) => attr(t, "rel") === "canonical");
        const canon = links.map((t) => attr(t, "href"));
        if (canon.length !== 1 || canon[0] !== url) problems.push(`canonical ${JSON.stringify(canon)} != ${url}`);
        const robots = [...r.text.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]).filter((t) => attr(t, "name") === "robots").map((t) => attr(t, "content") || "");
        if (robots.some((c) => /noindex/i.test(c))) problems.push(`noindex (${robots.join(" | ")})`);
      }
      if (problems.length) failures.push(`${url}  ${problems.join("; ")}`);
    }
  })
);

lines.push(`checked=${blog.length} passed=${blog.length - failures.length} failed=${failures.length}`);
failures.forEach((f) => lines.push(`FAIL ${f}`));
fs.writeFileSync(REPORT, lines.join("\n") + "\n");
console.log(lines.join("\n"));
process.exit(failures.length ? 1 : 0);
