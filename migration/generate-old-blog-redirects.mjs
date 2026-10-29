#!/usr/bin/env node
// Generates everything the OLD blog deployment (blog.accredian.com) needs to redirect to accredian.com/blog:
//   old-blog-redirects/src/legacy-redirects/redirect-data.json   allowlist built from live WordPress data
//   old-blog-redirects/src/legacy-redirects/legacy-paths.js      copy of app/lib/blog/legacy-paths.js
//   old-blog-redirects/src/legacy-redirects/constants.js         copy of app/lib/blog/constants.js
//   old-blog-redirects/urls/*.txt                                URL lists for scripts/check-redirects.mjs
// resolve.js and proxy.js are hand-written and live next to them.
//
//   node migration/generate-old-blog-redirects.mjs
//
// Re-run it immediately before the cutover: the allowlist is a snapshot of the posts that exist now.
// Environment: WORDPRESS_URL (default https://api-blog.accredian.com/graphql),
//              LEGACY_REPO (default D:\accredian-work-repos\blog-next-js-site, read-only; used only to turn the
//              old site's own redirect list into test URLs).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const libDir = path.join(root, "app", "lib", "blog");
const outDir = path.join(root, "migration", "old-blog-redirects");
const dataDir = path.join(outDir, "src", "legacy-redirects");
const urlsDir = path.join(outDir, "urls");
const lib = (file) => import(pathToFileURL(path.join(libDir, file)).href);

const wp = await lib("wordpress.js");
const { spotlightMap, NON_PERSON_AUTHOR_SLUGS } = await lib("constants.js");

const ENDPOINT = process.env.WORDPRESS_URL || "https://api-blog.accredian.com/graphql";
const PER_PAGE = 9;

async function graphql(query, variables = {}) {
  const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query, variables }) });
  if (!res.ok) throw new Error(`WPGraphQL HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  return json.data;
}

// ---- WordPress data (every list is cursor-paginated: WPGraphQL caps requests at 100) ----
const posts = await wp.getAllPosts();
const categories = await wp.getCategories();
const authorSlugs = (await wp.getAuthorSlugs()).filter((slug) => !NON_PERSON_AUTHOR_SLUGS.includes(slug));

const postSlugs = posts.map((p) => p.slug).sort();
if (new Set(postSlugs).size !== postSlugs.length) throw new Error("duplicate post slugs");

// A category redirects only if it has posts. `count` is WordPress's own term count; any category it reports as
// empty is double-checked against its actual post list so a category holding posts is never dropped.
const categoryPosts = new Map();
for (const c of categories) {
  if (!c.count) categoryPosts.set(c.slug, (await wp.getCategoryPosts(c.slug)).length);
}
const hasPosts = (c) => (c.count || 0) > 0 || (categoryPosts.get(c.slug) || 0) > 0;
const categorySlugs = categories.filter(hasPosts).map((c) => c.slug).sort();
const emptyCategories = categories.filter((c) => !hasPosts(c)).map((c) => c.slug).sort();
const countOf = (c) => c.count || categoryPosts.get(c.slug) || 0;

// Spotlight key -> its WordPress category (same lookup the site uses: slug first, then name).
const findCategory = (info) => categories.find((c) => c.slug === info.slug) || categories.find((c) => c.name.toLowerCase() === info.name.toLowerCase());
const spotlightKeys = [];
const emptySpotlightKeys = [];
const spotlightCount = {};
for (const [key, info] of Object.entries(spotlightMap)) {
  const category = findCategory(info);
  const n = category ? countOf(category) : 0;
  spotlightCount[key] = n;
  (n > 0 ? spotlightKeys : emptySpotlightKeys).push(key);
}

// ---- the real WordPress taxonomy: /category/accredian-spotlight/<group>/<leaf>/ (held until Search Console review) ----
const rawCategories = [];
let after = null;
for (let i = 0; i < 20; i++) {
  const data = await graphql(
    `query($a: String) { categories(first: 100, after: $a, where: { hideEmpty: false }) { pageInfo { hasNextPage endCursor } nodes { slug name uri } } }`,
    { a: after }
  );
  rawCategories.push(...data.categories.nodes);
  if (!data.categories.pageInfo.hasNextPage) break;
  after = data.categories.pageInfo.endCursor;
}
const keyFor = (cat) => Object.keys(spotlightMap).find((k) => spotlightMap[k].slug === cat.slug || spotlightMap[k].name.toLowerCase() === cat.name.toLowerCase());
const heldAccredianSpotlight = {};
const heldUnmapped = [];
for (const cat of rawCategories) {
  const uri = cat.uri.replace(/\/+$/, "");
  if (!/^\/category\/accredian(-pm)?-spotlight\//.test(uri)) continue; // nested only: the two roots redirect normally
  const depth = uri.split("/").filter(Boolean).length; // 3 = a group, 4 = a leaf
  const key = keyFor(cat);
  if (key && spotlightKeys.includes(key)) heldAccredianSpotlight[uri] = `/blog/spotlight/${key}`;
  else if (depth === 3) heldAccredianSpotlight[uri] = "/blog/spotlight"; // groups with no page of their own
  else heldUnmapped.push({ uri, reason: key ? "spotlight key has no articles" : "no matching spotlight key" });
}

const data = {
  generatedAt: new Date().toISOString(),
  source: ENDPOINT.replace(/\/graphql.*$/, ""),
  counts: {
    posts: postSlugs.length, categoriesWithPosts: categorySlugs.length, emptyCategories: emptyCategories.length,
    spotlightKeys: spotlightKeys.length, emptySpotlightKeys: emptySpotlightKeys.length, authors: authorSlugs.length,
    heldAccredianSpotlight: Object.keys(heldAccredianSpotlight).length, heldUnmapped: heldUnmapped.length,
  },
  postSlugs, categorySlugs, spotlightKeys, emptySpotlightKeys, authorSlugs, heldAccredianSpotlight,
};

fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(urlsDir, { recursive: true });
fs.writeFileSync(path.join(dataDir, "redirect-data.json"), JSON.stringify(data, null, 1) + "\n");
fs.copyFileSync(path.join(libDir, "legacy-paths.js"), path.join(dataDir, "legacy-paths.js"));
fs.copyFileSync(path.join(libDir, "constants.js"), path.join(dataDir, "constants.js"));

// ---- URL lists for scripts/check-redirects.mjs ----
const resolver = await import(pathToFileURL(path.join(dataDir, "resolve.js")).href);
const expectedFor = (urlPath, options) => {
  const u = new URL(urlPath, "http://x");
  return resolver.resolveLegacyRedirect({ pathname: u.pathname, searchParams: u.searchParams }, data, options)?.location.replace("https://accredian.com", "") ?? null;
};

const redirectUrls = new Set();
const add = (p) => redirectUrls.add(p);
for (const slug of postSlugs) { add(`/${slug}`); add(`/${slug}/`); add(`/blog/${slug}`); }
["/", "/blog", "/blog?page=1", "/blog?page=2", "/blog?page=124", "/page/2", "/page/9", "/category", "/search", "/search?q=python", "/testimonials", "/spotlight", "/success-stories", "/success-stories/ds", "/success-stories/pm", "/sitemap.xml"].forEach(add);
for (const c of categories.filter(hasPosts)) {
  add(`/category/${c.slug}`); add(`/category/${c.slug}/`);
  const pages = Math.ceil(countOf(c) / PER_PAGE);
  if (pages >= 2) { add(`/category/${c.slug}?page=2`); add(`/category/${c.slug}?page=${pages}`); }
}
for (const slug of authorSlugs) add(`/author/${slug}`);
add("/author/admin");
for (const key of spotlightKeys) {
  add(`/spotlight/${key}`);
  const pages = Math.ceil(spotlightCount[key] / PER_PAGE);
  if (pages >= 2) add(`/spotlight/${key}?page=2`);
}
["/spotlight/ds/industry/bfsi", "/spotlight/pm/top-colleges/purdue", "/spotlight/pm/industry/healthcare", "/spotlight/ds/0-2-years"].forEach(add);
// the three legacy URLs of the empty spotlight key(s) go to the spotlight index
for (const key of emptySpotlightKeys) { add(`/spotlight/${key}`); add(`/spotlight/pm/industry/${key}`); add(`/category/insaid-spotlight/${key}`); }

// the old site's own literal redirect rules, as test URLs
const legacyRepo = process.env.LEGACY_REPO || "D:\\accredian-work-repos\\blog-next-js-site";
let legacyRules = 0;
try {
  const src = fs.readFileSync(path.join(legacyRepo, "next.config.ts"), "utf8").replace(/\r\n/g, "\n");
  for (const m of src.matchAll(/source:\s*"([^"]+)"/g)) if (!m[1].includes(":")) { add(m[1]); legacyRules++; }
} catch { console.warn(`(legacy repo not found at ${legacyRepo}: skipping its literal redirect rules)`); }

const redirectLines = [];
const unexpected = [];
for (const p of [...redirectUrls].sort()) {
  const expected = expectedFor(p, {});
  if (!expected) { unexpected.push(p); continue; }
  redirectLines.push(`${p}\t${expected}`);
}

const goneUrls = [
  ...emptyCategories.flatMap((s) => [`/category/${s}`, `/category/${s}/`]),
  "/zz-not-a-real-post", "/zz-not-a-real-post/", "/blog/zz-not-a-real-post", "/category/zz-not-a-category", "/author/zz-nobody",
  "/spotlight/zz-nope", "/spotlight/ds/zz-nope/bfsi", "/success-stories/zz", "/success-stories/ds/extra",
  "/wp-content/uploads/2020/01/x.png", "/robots.txt", "/feed", "/a/b/c/d",
];

const heldLines = Object.entries(heldAccredianSpotlight).sort().map(([from, to]) => `${from}\t${to}`);

fs.writeFileSync(path.join(urlsDir, "redirect-urls.txt"), redirectLines.join("\n") + "\n");
fs.writeFileSync(path.join(urlsDir, "gone-urls.txt"), goneUrls.join("\n") + "\n");
fs.writeFileSync(path.join(urlsDir, "held-urls.txt"), heldLines.join("\n") + "\n");
fs.writeFileSync(path.join(outDir, "held-unmapped.json"), JSON.stringify(heldUnmapped, null, 1) + "\n");

console.log(JSON.stringify(data.counts, null, 1));
console.log(`redirect URLs: ${redirectLines.length} (incl. ${legacyRules} literal rules from the legacy site) | gone URLs: ${goneUrls.length} | held URLs: ${heldLines.length}`);
console.log("empty categories (404):", emptyCategories.join(", "));
console.log("empty spotlight keys (-> /blog/spotlight):", emptySpotlightKeys.join(", "));
if (unexpected.length) console.log(`WARNING: ${unexpected.length} generated URLs have no destination:`, unexpected.slice(0, 10));
if (heldUnmapped.length) console.log("held, unmapped:", heldUnmapped.length, "(see migration/old-blog-redirects/held-unmapped.json)");
