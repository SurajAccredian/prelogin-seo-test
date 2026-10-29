#!/usr/bin/env node
// check-old-host-sitemap.mjs: against a LIVE old-host server (not the resolver), old /sitemap.xml must be exactly
// one 301 to https://accredian.com/sitemap.xml (blog URLs live in the main sitemap), and /blog/sitemap.xml
// must stay a 404. No dependencies (Node 18+). Exits 1 on failure.
//
//   node scripts/check-old-host-sitemap.mjs --base <old origin> [--host blog.accredian.com] [--final-base <main origin>]
//
// --host sets the Host header (use it when --base is localhost); --final-base is where the redirect target is
// fetched instead of https://accredian.com (e.g. a local build), to check it returns 200 XML.
import http from "node:http";
import https from "node:https";

const args = process.argv.slice(2);
const flag = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const base = flag("--base");
if (!base) {
  console.error("usage: node scripts/check-old-host-sitemap.mjs --base <origin> [--host h] [--final-base o]");
  process.exit(2);
}
const host = flag("--host");
const finalBase = flag("--final-base");
const TARGET = "https://accredian.com/sitemap.xml";

function request(url, hostHeader) {
  const target = new URL(url);
  const client = target.protocol === "https:" ? https : http;
  return new Promise((resolve, reject) => {
    const req = client.request(
      { hostname: target.hostname, port: target.port || undefined, path: target.pathname + target.search, method: "GET", headers: { host: hostHeader || target.host, "user-agent": "check-old-host-sitemap/1.0", connection: "close" }, timeout: 60000 },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve({ status: res.statusCode, location: res.headers.location || null, type: res.headers["content-type"] || "", body: Buffer.concat(chunks).toString("utf8", 0, 2000) }));
      }
    );
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", reject);
    req.end();
  });
}

let failed = 0;
const check = (ok, label, detail) => {
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}  ${detail}`);
};

const first = await request(new URL("/sitemap.xml", base).href, host);
check(first.status === 301, "old-host /sitemap.xml status", `${first.status}`);
check(first.location === TARGET, "old-host /sitemap.xml Location", `${first.location} (expected ${TARGET})`);

if (first.location) {
  const follow = finalBase ? finalBase.replace(/\/$/, "") + new URL(first.location).pathname : first.location;
  const final = await request(follow);
  check(final.status === 200 && /xml/i.test(final.type) && /<(urlset|sitemapindex)\b/.test(final.body), "redirect target", `${follow} -> ${final.status} ${final.type}`);
}

const nested = await request(new URL("/blog/sitemap.xml", base).href, host);
check(nested.status === 404, "old-host /blog/sitemap.xml", `${nested.status} (expected 404)`);

process.exit(failed ? 1 : 0);
