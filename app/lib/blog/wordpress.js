import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  GET_POSTS,
  GET_POSTS_PAGE,
  GET_LATEST_POST_SLUGS,
  GET_POST,
  GET_SEARCH_POSTS,
  GET_CATEGORIES_PAGE,
  GET_CATEGORY_POSTS_PAGE,
  GET_AUTHOR,
  GET_AUTHOR_POSTS,
  GET_AUTHOR_SLUGS,
} from "./queries.js";

// Server-only. WORDPRESS_URL is intentionally not NEXT_PUBLIC_*.
const WP_GRAPHQL_URL = process.env.WORDPRESS_URL || "https://api-blog.accredian.com/graphql";

// `next build` renders hundreds of pages across 7 workers, so it gets a longer per-request timeout and a
// lower per-process concurrency than the running server (which must fail fast so ISR keeps the last page).
// Worst case for one request: TIMEOUT_MS x MAX_ATTEMPTS + backoff = 20 x 3 + ~1.5 = ~61 s at build. A page makes at most
// two sequential waves of requests (metadata, then the page), ~123 s, under next.config's
// staticPageGenerationTimeout (180 s) even before queueing behind MAX_CONCURRENCY.
const IS_BUILD = process.env.NEXT_PHASE === "phase-production-build";
const TIMEOUT_MS = IS_BUILD ? 20000 : 8000;
const MAX_CONCURRENCY = IS_BUILD ? 2 : 8;
const MAX_ATTEMPTS = 3; // 1 try + 2 retries, never more
const BACKOFF_MS = 400;
const MAX_PAGES = 100; // 10k nodes; guards against a runaway cursor loop

export const REVALIDATE_POST = 3600;
export const REVALIDATE_LISTING = 3600;

// ---- request accounting ----
// `next build` runs several worker processes that are torn down without reliable exit hooks, so each process
// writes its own counters to .next/blog-wp-stats/<pid>.json every few requests (and at exit); sum the files
// for build totals. Enabled during `next build` or with BLOG_WP_STATS=1.
const stats = { requests: 0, retries: 0, dedupedCalls: 0, failures: 0, peakConcurrency: 0 };
const TRACK_STATS = IS_BUILD || process.env.BLOG_WP_STATS === "1";
let active = 0;
const waiters = [];

function flushStats() {
  if (!TRACK_STATS) return;
  try {
    const dir = join(process.cwd(), ".next", "blog-wp-stats");
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, `${process.pid}.json`), JSON.stringify({ pid: process.pid, ...stats }));
  } catch {
    // diagnostics only: never let stats I/O break a build
  }
}

if (TRACK_STATS && !globalThis.__blogWpStatsHooked) {
  globalThis.__blogWpStatsHooked = true;
  process.on("exit", () => {
    flushStats();
    if (stats.requests || stats.dedupedCalls) console.log(`[blog-wp] pid=${process.pid} ${JSON.stringify(stats)}`);
  });
}

async function acquire() {
  if (active >= MAX_CONCURRENCY) await new Promise((resolve) => waiters.push(resolve));
  active++;
  if (active > stats.peakConcurrency) stats.peakConcurrency = active;
}

function release() {
  active--;
  waiters.shift()?.();
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class WpHttpError extends Error {
  constructor(status) {
    super(`WPGraphQL HTTP ${status}`);
    this.status = status;
  }
}

const isRetryable = (error) =>
  !(error instanceof WpHttpError) || error.status === 429 || error.status >= 500;

async function attempt(body, revalidate, noStore) {
  stats.requests++;
  if (stats.requests % 10 === 0) flushStats();
  const res = await fetch(WP_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    signal: AbortSignal.timeout(TIMEOUT_MS),
    ...(noStore ? { cache: "no-store" } : { next: { revalidate, tags: ["blog"] } }),
  });
  if (!res.ok) throw new WpHttpError(res.status);
  return res.json();
}

async function request(body, revalidate, noStore) {
  let lastError;
  let n = 0;
  while (n < MAX_ATTEMPTS) {
    n++;
    await acquire();
    try {
      return await attempt(body, revalidate, noStore);
    } catch (error) {
      lastError = error;
      if (!isRetryable(error)) break;
    } finally {
      release();
    }
    if (n < MAX_ATTEMPTS) {
      stats.retries++;
      await sleep(BACKOFF_MS * 2 ** (n - 1) + Math.random() * 150);
    }
  }
  stats.failures++;
  flushStats();
  // Retries exhausted: throw. During `next build` this fails the build loudly; at runtime ISR keeps the
  // last good page and a transient outage is never cached as an empty page or a soft 404.
  throw new Error(`WordPress request failed after ${n} attempt${n === 1 ? "" : "s"}: ${lastError?.message ?? lastError}`, {
    cause: lastError,
  });
}

const inflight = new Map();

/**
 * Error contract used by every fetcher below:
 *  - WordPress answered and the entity does not exist -> the fetcher returns null (caller notFound()s).
 *  - Network error, timeout, non-2xx (after the capped retries) or GraphQL `errors` -> THROWS.
 * Identical concurrent requests share one HTTP call.
 */
export async function fetchGraphQL(query, variables = {}, { revalidate = REVALIDATE_POST, noStore = false } = {}) {
  const body = JSON.stringify({ query, variables });
  const key = `${noStore ? "ns" : revalidate}|${body}`;

  let pending = inflight.get(key);
  if (pending) {
    stats.dedupedCalls++;
  } else {
    pending = request(body, revalidate, noStore).finally(() => inflight.delete(key));
    inflight.set(key, pending);
  }

  const json = await pending;
  if (json.errors?.length) {
    throw new Error(`WPGraphQL error: ${json.errors.map((e) => e.message).join("; ")}`);
  }
  if (!json.data) throw new Error("WPGraphQL returned no data");
  return json.data;
}

// Follows pageInfo cursors until the connection is exhausted (WPGraphQL returns at most 100 per request).
async function fetchAllNodes(query, pick, variables = {}, options) {
  const nodes = [];
  let after = null;
  for (let page = 0; page < MAX_PAGES; page++) {
    const conn = pick(await fetchGraphQL(query, { ...variables, after }, options));
    if (!conn) throw new Error("WPGraphQL connection missing from response");
    nodes.push(...(conn.nodes || []));
    if (!conn.pageInfo?.hasNextPage) return nodes;
    after = conn.pageInfo.endCursor;
  }
  throw new Error(`WPGraphQL pagination exceeded ${MAX_PAGES} pages`);
}

const LISTING = { revalidate: REVALIDATE_LISTING };

// Newest 100 posts. Home page passes the listing TTL; the post page's "related" uses the post TTL.
export async function getPosts({ revalidate = REVALIDATE_POST } = {}) {
  const data = await fetchGraphQL(GET_POSTS, {}, { revalidate });
  return data.posts?.nodes || [];
}

// The complete post list (cursor-paginated), for listings, search fallbacks, sitemap and slug checks.
export function getAllPosts() {
  return fetchAllNodes(GET_POSTS_PAGE, (d) => d.posts, {}, LISTING);
}

export async function getLatestPostSlugs(first = 50) {
  const data = await fetchGraphQL(GET_LATEST_POST_SLUGS, { first });
  return (data.posts?.nodes || []).map((p) => p.slug);
}

// null = WordPress answered, no such post.
export async function getPost(slug) {
  const data = await fetchGraphQL(GET_POST, { slug });
  return data.post || null;
}

// WordPress search (title/content/excerpt), one page of `perPage`. WPGraphQL returns no total, so we ask
// for one extra node to learn whether a next page exists. Never cached: search terms are unbounded.
export async function searchPosts(term, page = 1, perPage = 20) {
  const need = page * perPage + 1;
  const nodes = [];
  let after = null;
  while (nodes.length < need) {
    const data = await fetchGraphQL(
      GET_SEARCH_POSTS,
      { search: term, first: Math.min(100, need - nodes.length), after },
      { noStore: true }
    );
    const conn = data.posts;
    if (!conn) throw new Error("WPGraphQL connection missing from response");
    nodes.push(...(conn.nodes || []));
    if (!conn.pageInfo?.hasNextPage) break;
    after = conn.pageInfo.endCursor;
  }
  return { posts: nodes.slice((page - 1) * perPage, page * perPage), hasNext: nodes.length > page * perPage };
}

// Complete list: WPGraphQL would otherwise silently stop at the first 100 categories.
export function getCategories() {
  return fetchAllNodes(GET_CATEGORIES_PAGE, (d) => d.categories, {}, LISTING);
}

// All posts in a category (cursor-paginated). An unknown category also comes back as an empty list,
// so callers must check the slug against getCategories() before treating empty as "category exists".
export function getCategoryPosts(categorySlug) {
  return fetchAllNodes(GET_CATEGORY_POSTS_PAGE, (d) => d.posts, { categoryName: categorySlug }, LISTING);
}

export function toAuthorProfile(user) {
  if (!user?.name || !user.slug) return null;
  return {
    databaseId: user.databaseId,
    name: user.name,
    slug: user.slug,
    bio: user.description,
    avatar: user.avatar?.url,
  };
}

// null = WordPress answered, no such (public) user. Author pages are listings, so they use the listing TTL.
export async function getAuthorProfile(slug) {
  const data = await fetchGraphQL(GET_AUTHOR, { slug }, LISTING);
  return toAuthorProfile(data.user);
}

export async function getAuthorPosts(authorId) {
  const data = await fetchGraphQL(GET_AUTHOR_POSTS, { authorId }, LISTING);
  return data.posts?.nodes || [];
}

export async function getAuthorSlugs() {
  const nodes = await fetchAllNodes(GET_AUTHOR_SLUGS, (d) => d.users, {}, LISTING);
  return nodes.map((n) => n.slug).filter(Boolean);
}
