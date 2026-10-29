# blog.accredian.com -> accredian.com/blog redirects

Everything the **old blog deployment** (the `blog-next-js-site` repo, served at blog.accredian.com) needs so that
every old URL reaches its new page in **one hop**. Nothing here is deployed by the main site.

| Old URL | New URL |
|---|---|
| `/<slug>` and `/<slug>/` (WordPress permalink, all 1,108 posts) | `https://accredian.com/blog/<slug>` |
| `/blog/<slug>` | `https://accredian.com/blog/<slug>` |
| `/` | `/blog` |
| `/blog`, `/blog?page=N`, `/page/N` | `/blog/articles`, `/blog/articles/page/N` (N >= 2), `/blog/articles` |
| `/category/<slug>`, `?page=N` | `/blog/category/<slug>`, `/blog/category/<slug>/page/N` |
| `/sitemap.xml` | `https://accredian.com/sitemap.xml` (the blog URLs live in the main sitemap; `accredian.com/blog/sitemap.xml` is a 404) |
| `/search?q=x`, `/testimonials`, `/author/<slug>` | `/blog/search?q=x`, `/blog/testimonials`, `/blog/author/<slug>` |
| `/author/admin` | `/blog/articles` |
| `/spotlight/<key>` and nested `/spotlight/ds/<group>/<key>` | `/blog/spotlight/<key>` (`?page=N` -> `/page/N`) |
| `/spotlight/finance` (empty key) and its 2 other legacy URLs | `/blog/spotlight` |
| `/success-stories`, `/success-stories/ds|pm` | `/blog/success-stories`, `/blog/success-stories/ds|pm` |
| the old site's own ~68 literal redirects (`/category/insaid-spotlight/...`, `/category/topreads`, ...) | re-targeted, see `app/lib/blog/legacy-paths.js` |
| empty categories (10), unknown slugs, anything unmapped | **404** (not redirected) |
| nested `/category/accredian-spotlight/**` (62 real WordPress URLs) | **404 until enabled**, see "Held" |

All redirects are **301** to the **final** absolute URL (no chains, no stray query strings).

## Why a proxy and not `redirects()` rules in next.config

Measured on Next 16 in a scratch app (see `migration/` notes in the change report):

| | explicit `redirects()` | `proxy.js` + allowlist + `skipTrailingSlashRedirect` |
|---|---|---|
| `/slug` | 1 hop | 1 hop |
| `/slug/` | **2 hops** (Next's own trailing-slash redirect fires first) | 1 hop |
| `/blog?page=3` | destination gets a stray `?page=3` appended | clean `.../articles/page/3` |
| 1,108 slugs (x2 for trailing slash) + ~150 other rules | **over the platform cap**: Next docs: "on Vercel there's a limit of 1,024 redirects" | no cap (a `Set` lookup) |
| unknown slug | 404 | 404 |
| testable | no | yes: `resolve.js` is a pure function, `scripts/check-redirects.mjs` runs the whole URL list |

The old repo has no `vercel.json`, `Dockerfile` or other host config, so the hosting limits are unknown; the proxy
approach does not depend on them. It does need Next >= 16 (the old repo is on 16.1.6).

## Deploy (old repo)

1. Regenerate the data **immediately before the cutover** (the allowlist is a snapshot of the posts that exist):
   `node --no-warnings migration/generate-old-blog-redirects.mjs` (in the main repo).
2. Copy this folder's `src/proxy.js` and `src/legacy-redirects/` into the old repo's `src/`.
3. In the old repo's `next.config.ts`: delete the `redirects()` method and add `skipTrailingSlashRedirect: true`.
4. Recommended: reduce the old app to a redirector (delete `src/app` pages/components, keep a trivial layout and
   page). The proxy already answers every request for the old host, so leaving the old pages in place is harmless
   but pointless. Requests for any other host (previews, localhost) pass through untouched.
5. Verify with the checker (below) before pointing traffic at it.

## Verify

```
# redirects: exactly 1 hop to a final 200 (3,801 URLs)
node scripts/check-redirects.mjs migration/old-blog-redirects/urls/redirect-urls.txt \
     --base <old deployment> --host blog.accredian.com [--final-base <new site, for local tests>]
# old /sitemap.xml must be one 301 to https://accredian.com/sitemap.xml (and /blog/sitemap.xml a 404), live
node scripts/check-old-host-sitemap.mjs --base <old deployment> --host blog.accredian.com [--final-base <new site>]
# must 404 on the old host (33 URLs)
node scripts/check-redirects.mjs migration/old-blog-redirects/urls/gone-urls.txt \
     --base <old deployment> --host blog.accredian.com --hops 0 --expect 404
```

## Held: nested `/category/accredian-spotlight/**` (decision pending Search Console)

The real WordPress taxonomy is `/category/accredian-spotlight/<group>/<leaf>/` (70 categories). The old Next app
never served these nested URLs (its category route had a single segment), so they currently 404. The mapping to
`/blog/spotlight/<key>` is prepared in `redirect-data.json` (`heldAccredianSpotlight`, 62 entries; `held-urls.txt`)
but **off**: set `LEGACY_ENABLE_ACCREDIAN_SPOTLIGHT=1` on the old deployment to enable it. 7 leaves have no
matching spotlight key or no articles (`held-unmapped.json`) and stay 404 even when enabled. The two roots,
`/category/accredian-spotlight` and `/category/accredian-pm-spotlight`, are real pages today and redirect normally.

## Webhook (WordPress -> Next.js)

Next.js side: set `BLOG_REVALIDATE_SECRET` (server-only, a long random string) on the main site's environment.
WordPress side: install `migration/wordpress/accredian-blog-revalidate.php` and add the two `define()` lines it
documents. Until the secret is set, `POST /api/revalidate` for tag `blog` answers 503 (fail closed).
