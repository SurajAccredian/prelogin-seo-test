#!/usr/bin/env node
// check-old-blog-slugs.mjs: offline check of the old-host (blog.accredian.com) redirect resolver.
//   1. every post slug: /<slug>, /<slug>/, /blog/<slug>, /blog/<slug>/ must each be exactly one
//      301 to https://accredian.com/blog/<slug>
//   2. reports literal rules that override a live URL (a category / author / spotlight key / post slug whose
//      old URL does not map to its identical new URL, and post slugs that collide with a reserved first segment)
// Reads migration/old-blog-redirects/src/legacy-redirects (regenerate it first with
// node migration/generate-old-blog-redirects.mjs). No network, no dependencies. Exits 1 if check 1 fails.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dir = path.resolve("migration/old-blog-redirects/src/legacy-redirects");
const { resolveLegacyRedirect } = await import(pathToFileURL(path.join(dir, "resolve.js")).href);
const data = JSON.parse(fs.readFileSync(path.join(dir, "redirect-data.json"), "utf8"));
const NEW = "https://accredian.com";
const resolve = (p) => resolveLegacyRedirect({ pathname: p, searchParams: new URLSearchParams() }, data, {});
const show = (hit) => (hit ? `${hit.status} ${hit.location}` : "404 (no rule)");

// 1) every post slug, four URL forms
const bad = [];
for (const slug of data.postSlugs) {
  const want = `${NEW}/blog/${slug}`;
  for (const p of [`/${slug}`, `/${slug}/`, `/blog/${slug}`, `/blog/${slug}/`]) {
    const hit = resolve(p);
    if (hit?.status !== 301 || hit.location !== want) bad.push(`${p} -> ${show(hit)} (expected 301 ${want})`);
  }
}
console.log(`post slugs: ${data.postSlugs.length} x 4 URL forms, mismatches: ${bad.length}`);
bad.slice(0, 40).forEach((b) => console.log(`  FAIL ${b}`));

// 2) literal rules that override a live URL
const overrides = [];
const identity = (oldPath, newPath, kind) => {
  const hit = resolve(oldPath);
  if (hit?.location !== NEW + newPath) overrides.push(`${kind}: ${oldPath} -> ${show(hit)} (identity would be ${newPath})`);
};
for (const s of data.categorySlugs) identity(`/category/${s}`, `/blog/category/${s}`, "category");
for (const s of data.authorSlugs) identity(`/author/${s}`, `/blog/author/${s}`, "author");
for (const s of data.spotlightKeys) identity(`/spotlight/${s}`, `/blog/spotlight/${s}`, "spotlight");
const reserved = new Set(["blog", "category", "page", "author", "spotlight", "success-stories", "search", "testimonials"]);
for (const s of data.postSlugs) if (reserved.has(s)) overrides.push(`post slug "${s}" collides with a reserved first segment`);
console.log(`live URLs overridden by a literal rule: ${overrides.length}`);
overrides.forEach((o) => console.log(`  ${o}`));

process.exit(bad.length ? 1 : 0);
