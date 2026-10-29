import { createHash, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// WordPress -> Next.js webhook for the blog. Every blog data fetch carries the cache tag "blog"
// (app/lib/blog/wordpress.js), so one call refreshes posts, listings, categories, spotlight and the sitemap.
export const BLOG_TAG = "blog";
const SECRET_HEADER = "x-revalidate-secret";

// SHA-256 both sides so the comparison is constant-time and independent of the secret's length.
function secretMatches(provided, configured) {
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(configured).digest();
  return timingSafeEqual(a, b);
}

/**
 * Handles POST /api/revalidate for tag "blog". Fails closed:
 *  - BLOG_REVALIDATE_SECRET is a server-only variable (never NEXT_PUBLIC_*). If it is not set, every
 *    request is refused (503), so a missing variable can never leave the endpoint open.
 *  - The secret is accepted ONLY in the x-revalidate-secret header (not the query string or body, which end
 *    up in logs), and compared in constant time.
 */
export function handleBlogRevalidation(request) {
  const configured = process.env.BLOG_REVALIDATE_SECRET;
  if (!configured || configured.trim() === "") {
    console.error("[BlogRevalidate] BLOG_REVALIDATE_SECRET is not set; refusing all blog revalidation requests.");
    return NextResponse.json({ status: "error", message: "Blog revalidation is not configured." }, { status: 503 });
  }

  const provided = request.headers.get(SECRET_HEADER);
  if (!provided || !secretMatches(provided, configured)) {
    console.warn("[BlogRevalidate] Rejected request with a missing or invalid secret.");
    return NextResponse.json({ status: "error", message: "Unauthorized." }, { status: 401 });
  }

  // "max" = stale-while-revalidate: the next visitor to each blog page still gets the cached page instantly
  // while a fresh one is built in the background. (The hard form, { expire: 0 }, makes the next request to
  // each of the ~1,500 blog pages a blocking cache miss.) Nothing is regenerated until a page is visited.
  revalidateTag(BLOG_TAG, "max");
  console.log(`[BlogRevalidate] Marked cache tag "${BLOG_TAG}" stale.`);
  return NextResponse.json({ status: "success", revalidated: true, tag: BLOG_TAG, timestamp: new Date().toISOString() });
}
