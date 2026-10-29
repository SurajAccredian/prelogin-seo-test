#!/usr/bin/env node
// dump-jsonld.mjs: read-only. Saves the JSON-LD of sample /blog pages to scripts/jsonld-samples/<name>.json and
// reports (a) missing recommended BlogPosting fields, (b) any @id referenced (as {"@id": ...} only) that is not
// defined as a node in the same graph. Node 18+, no dependencies.
//
//   node scripts/dump-jsonld.mjs [base-url]
import fs from "node:fs";

const BASE = (process.argv[2] || "http://localhost:3001").replace(/\/$/, "");
const OUT = "scripts/jsonld-samples";
const SITE = "https://accredian.com";
const BLOGPOSTING_FIELDS = ["headline", "image", "datePublished", "dateModified", "author", "publisher", "mainEntityOfPage"];

const get = async (p) => (await fetch(BASE + p, { redirect: "manual", headers: { "User-Agent": "GPTBot" }, signal: AbortSignal.timeout(60000) })).text();

const sitemap = await get("/sitemap.xml");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, "&"));
const author = locs.find((u) => u.startsWith(SITE + "/blog/author/"));
const SAMPLES = {
  post: "/blog/top-10-genai-tools-dominating-2025",
  category: "/blog/category/data-science",
  author: author ? author.slice(SITE.length) : null,
  articles: "/blog/articles",
};

fs.mkdirSync(OUT, { recursive: true });
for (const [name, p] of Object.entries(SAMPLES)) {
  if (!p) {
    console.log(`\n== ${name}: no sample URL found`);
    continue;
  }
  const html = await get(p);
  const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => JSON.parse(m[1]));
  fs.writeFileSync(`${OUT}/${name}.json`, JSON.stringify({ url: SITE + p, blocks }, null, 2) + "\n");

  // flatten every node of every block (a block may be a bare node, an array, or { "@graph": [...] })
  const nodes = [];
  const collect = (n) => {
    if (Array.isArray(n)) return n.forEach(collect);
    if (n && typeof n === "object") {
      nodes.push(n);
      Object.values(n).forEach(collect);
    }
  };
  blocks.forEach(collect);

  const defined = new Set();
  const refs = new Set();
  for (const n of nodes) {
    if (!n["@id"]) continue;
    // a "definition" has more than just @id; a bare {"@id": x} is a reference
    if (Object.keys(n).length > 1) defined.add(n["@id"]);
    else refs.add(n["@id"]);
  }
  const dangling = [...refs].filter((id) => !defined.has(id));
  const types = nodes.flatMap((n) => [].concat(n["@type"] || []));

  console.log(`\n== ${name}  ${SITE + p}  blocks=${blocks.length} types=${[...new Set(types)].join(", ")}`);
  for (const bp of nodes.filter((n) => [].concat(n["@type"] || []).some((t) => /BlogPosting|Article/.test(t)))) {
    const type = [].concat(bp["@type"]).join("/");
    const missing = BLOGPOSTING_FIELDS.filter((f) => bp[f] === undefined || bp[f] === null || bp[f] === "" || (Array.isArray(bp[f]) && !bp[f].length));
    console.log(`  ${type} ${bp["@id"] || ""}: missing recommended = ${missing.length ? missing.join(", ") : "(none)"}`);
  }
  console.log(`  @id defined: ${defined.size}; referenced-only: ${refs.size}; unresolved: ${dangling.length ? dangling.join(", ") : "(none)"}`);
}
