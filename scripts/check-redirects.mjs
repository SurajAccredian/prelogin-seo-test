#!/usr/bin/env node
// check-redirects.mjs: for a list of OLD URLs, checks that each one reaches its final page in exactly one hop.
// No dependencies (Node 18+). Exits 1 if any URL fails, so it can gate a deploy.
//
//   node scripts/check-redirects.mjs <urls.txt> --base <origin> [options]
//
//   <urls.txt>        one URL path per line ("/slug", "/blog?page=2"); an optional second TAB-separated column is
//                     the exact path the first redirect must point to. Blank lines and "#" comments are skipped.
//   --base <origin>   server that answers for the old URLs (e.g. https://blog.accredian.com, or a local test server)
//   --host <name>     send this Host header on the FIRST request (e.g. blog.accredian.com when --base is localhost)
//   --final-base <o>  redirects point at https://accredian.com/...; with this, the follow-up request goes to <o>
//                     instead (e.g. http://localhost:3000), so the final status is checked on a local build
//   --hops <n>        expected number of redirects before the final response (default 1; use 0 for "must 404")
//   --expect <code>   expected final status (default 200 when hops >= 1, else 404)
//   --concurrency <n> parallel requests (default 8)
//   --limit <n>       only check the first n URLs
//   --verbose         print every URL, not just failures
//
// Examples
//   node scripts/check-redirects.mjs migration/old-blog-redirects/urls/redirect-urls.txt \
//        --base http://localhost:3181 --host blog.accredian.com --final-base http://localhost:3180
//   node scripts/check-redirects.mjs migration/old-blog-redirects/urls/gone-urls.txt \
//        --base http://localhost:3181 --host blog.accredian.com --hops 0 --expect 404
import fs from "node:fs";
import http from "node:http";
import https from "node:https";

const args = process.argv.slice(2);
const flag = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const file = args.find((a, i) => !a.startsWith("--") && !(i > 0 && args[i - 1].startsWith("--") && args[i - 1] !== "--verbose"));
const base = flag("--base");
if (!file || !base) {
  console.error("usage: node scripts/check-redirects.mjs <urls.txt> --base <origin> [--host h] [--final-base o] [--hops n] [--expect code] [--concurrency n] [--limit n] [--verbose]");
  process.exit(2);
}

const hostHeader = flag("--host");
const finalBase = flag("--final-base");
const expectedHops = Number(flag("--hops") ?? 1);
const expectedStatus = Number(flag("--expect") ?? (expectedHops >= 1 ? 200 : 404));
const concurrency = Number(flag("--concurrency") ?? 8);
const limit = flag("--limit") ? Number(flag("--limit")) : Infinity;
const verbose = args.includes("--verbose");
const NEW_ORIGIN = "https://accredian.com";
const MAX_HOPS = 5;

const lines = fs
  .readFileSync(file, "utf8")
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith("#"))
  .slice(0, limit)
  .map((l) => {
    const [path, expected] = l.split("\t");
    return { path, expected: expected || null };
  });

function request(url, host) {
  const target = new URL(url);
  const client = target.protocol === "https:" ? https : http;
  return new Promise((resolve, reject) => {
    const req = client.request(
      {
        hostname: target.hostname,
        port: target.port || undefined,
        path: target.pathname + target.search,
        method: "GET",
        headers: { host: host || target.host, "user-agent": "check-redirects/1.0", accept: "text/html", connection: "close" },
        timeout: 60000,
      },
      (res) => {
        res.resume();
        resolve({ status: res.statusCode, location: res.headers.location || null });
      }
    );
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", reject);
    req.end();
  });
}

async function check({ path, expected }) {
  const chain = [];
  let url = new URL(path, base).href;
  let host = hostHeader;
  let firstLocation = null;
  let result;
  try {
    for (let hop = 0; hop <= MAX_HOPS; hop++) {
      result = await request(url, host);
      if (![301, 302, 303, 307, 308].includes(result.status) || !result.location) break;
      const absolute = new URL(result.location, url);
      chain.push(`${result.status} ${absolute.href}`);
      firstLocation ??= absolute.href;
      // follow-up requests are not for the old host
      host = undefined;
      url = finalBase && absolute.origin === NEW_ORIGIN ? finalBase.replace(/\/$/, "") + absolute.pathname + absolute.search : absolute.href;
    }
  } catch (error) {
    return { path, ok: false, problems: [`request failed: ${error.message}`], chain };
  }

  const problems = [];
  if (chain.length !== expectedHops) problems.push(`hops = ${chain.length}, expected ${expectedHops}`);
  if (result.status !== expectedStatus) problems.push(`final status ${result.status}, expected ${expectedStatus}`);
  if (expectedHops >= 1) {
    // /sitemap.xml is the one old-host URL that leaves /blog: the blog URLs live in the main sitemap.
    if (firstLocation && !firstLocation.startsWith(`${NEW_ORIGIN}/blog`) && firstLocation !== `${NEW_ORIGIN}/sitemap.xml`) problems.push(`first Location is not under ${NEW_ORIGIN}/blog`);
    if (expected && firstLocation !== NEW_ORIGIN + expected) problems.push(`Location ${firstLocation} != expected ${NEW_ORIGIN + expected}`);
  }
  return { path, ok: problems.length === 0, problems, chain, status: result.status };
}

const started = Date.now();
const results = new Array(lines.length);
let next = 0;
await Promise.all(
  Array.from({ length: Math.min(concurrency, lines.length) }, async () => {
    while (next < lines.length) {
      const i = next++;
      results[i] = await check(lines[i]);
      if (verbose) console.log(`${results[i].ok ? "ok  " : "FAIL"} ${results[i].path} ${results[i].chain.join(" | ")} [${results[i].status ?? "-"}]`);
    }
  })
);

const failed = results.filter((r) => !r.ok);
console.log(`\n${file}`);
console.log(`checked ${results.length} URLs in ${((Date.now() - started) / 1000).toFixed(1)}s | expected: ${expectedHops} hop(s), final ${expectedStatus} | passed ${results.length - failed.length} | failed ${failed.length}`);
for (const r of failed.slice(0, 25)) console.log(`  FAIL ${r.path}\n       ${r.problems.join("; ")}${r.chain.length ? `\n       chain: ${r.chain.join(" -> ")}` : ""}`);
if (failed.length > 25) console.log(`  ... and ${failed.length - 25} more`);
process.exit(failed.length ? 1 : 0);
