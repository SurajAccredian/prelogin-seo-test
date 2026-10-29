import { spotlightMap, HIDDEN_CATEGORY_SLUGS, isBulkModified } from "./constants";
import { isNonPersonAuthor } from "./authors";
import { getAllPosts, getAuthorSlugs, getCategories } from "./wordpress";
import { blogUrl } from "./seo";

// WordPress *_gmt values have no timezone; they are UTC. Bulk-edited posts (see BULK_MODIFIED_WINDOWS) have no
// trustworthy date, so they yield undefined: no lastmod of their own, and they never feed a listing's newest date.
const toIso = (gmt) => (gmt && !isBulkModified(gmt) ? (/(Z|[+-]\d{2}:\d{2})$/.test(gmt) ? gmt : `${gmt}Z`) : undefined);

const newest = (dates) => dates.filter(Boolean).reduce((a, b) => (!a || b > a ? b : a), undefined);

/**
 * Sitemap entries for /blog: the home, the listing, every post, every category / spotlight key / author that
 * has content, and the success-stories and testimonials pages. Paginated pages (/page/N) are left out on
 * purpose: they are reachable from the listing's pagination links and are not landing pages.
 *
 * Nothing is caught here. If WordPress cannot be read the sitemap fails (the previous cached copy keeps being
 * served) instead of silently publishing a sitemap with the blog missing.
 *
 * Excluded on purpose: /blog/search (noindex), /blog/author/admin and other non-person accounts (404),
 * empty categories and empty spotlight keys (404).
 */
export async function getBlogSitemapEntries() {
  const [posts, categories, authors] = await Promise.all([getAllPosts(), getCategories(), getAuthorSlugs()]);

  // newest modification among the UNFLAGGED posts of each category / author, so listing pages get an honest lastmod
  // (omitted when every post is flagged)
  const byCategory = new Map();
  const byAuthor = new Map();
  for (const post of posts) {
    const modified = toIso(post.modifiedGmt);
    for (const c of post.categories?.nodes || []) byCategory.set(c.slug, newest([byCategory.get(c.slug), modified]));
    const authorSlug = post.author?.node?.slug;
    if (authorSlug) byAuthor.set(authorSlug, newest([byAuthor.get(authorSlug), modified]));
  }
  const latest = newest(posts.map((p) => toIso(p.modifiedGmt)));

  const entry = (path, lastModified) => ({ url: blogUrl(path), ...(lastModified ? { lastModified } : {}) });
  const liveCategories = categories.filter((c) => c.count > 0);
  const liveCategorySlugs = new Set(liveCategories.map((c) => c.slug));

  const spotlightKeys = Object.entries(spotlightMap)
    .filter(([, info]) => {
      const category = categories.find((c) => c.slug === info.slug) || categories.find((c) => c.name.toLowerCase() === info.name.toLowerCase());
      return category && category.count > 0;
    })
    .map(([key, info]) => ({ key, slug: info.slug }));

  return [
    entry("", latest),
    entry("/articles", latest),
    entry("/testimonials", byCategory.get("student-testimonial")),
    entry("/spotlight", latest),
    entry("/success-stories", latest),
    entry("/success-stories/ds", byCategory.get("ds_success_stories")),
    entry("/success-stories/pm", byCategory.get("pm_success_stories")),
    ...posts.map((p) => entry(`/${p.slug}`, toIso(p.modifiedGmt))),
    ...liveCategories.filter((c) => !HIDDEN_CATEGORY_SLUGS.includes(c.slug)).map((c) => entry(`/category/${c.slug}`, byCategory.get(c.slug))),
    ...spotlightKeys.map(({ key, slug }) => entry(`/spotlight/${key}`, liveCategorySlugs.has(slug) ? byCategory.get(slug) : undefined)),
    ...authors.filter((slug) => !isNonPersonAuthor(slug)).map((slug) => entry(`/author/${slug}`, byAuthor.get(slug))),
  ];
}
