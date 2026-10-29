import { NextResponse } from "next/server";
import data from "./legacy-redirects/redirect-data.json";
import { resolveLegacyRedirect } from "./legacy-redirects/resolve.js";

// Next 16 "proxy" (the successor of middleware) for the OLD blog deployment. It only acts on requests for
// the old host; everything else (preview URLs, localhost) passes through untouched.
//   - old URL with a destination  -> single 301 to https://accredian.com/blog/...
//   - old URL without one         -> real 404
// Requires `skipTrailingSlashRedirect: true` in next.config so /<slug>/ is also a single hop.
const OLD_HOSTS = new Set(["blog.accredian.com"]);

// Held until Search Console has been reviewed (nested /category/accredian-spotlight/** URLs).
const ENABLE_ACCREDIAN_SPOTLIGHT = process.env.LEGACY_ENABLE_ACCREDIAN_SPOTLIGHT === "1";

// Test hook only: lets a local server answer for any Host header.
const ANY_HOST = process.env.LEGACY_REDIRECTS_ANY_HOST === "1";

export function proxy(request) {
  const host = (request.headers.get("host") || "").toLowerCase().split(":")[0];
  if (!ANY_HOST && !OLD_HOSTS.has(host)) return NextResponse.next();

  const hit = resolveLegacyRedirect(
    { pathname: request.nextUrl.pathname, searchParams: request.nextUrl.searchParams },
    data,
    { enableAccredianSpotlight: ENABLE_ACCREDIAN_SPOTLIGHT }
  );
  if (hit) return NextResponse.redirect(hit.location, hit.status);

  return new NextResponse("Not Found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
}

export const config = { matcher: ["/((?!_next/static|_next/image).*)"] };
