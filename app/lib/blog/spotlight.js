import { spotlightMap } from "./constants";
import { getCategories, getCategoryPosts } from "./wordpress";
import { parsePageNumber } from "./utils";

export const SPOTLIGHT_PER_PAGE = 9;

const normalise = (part) => (part || "").replace(/%20| /g, "-").toLowerCase();

/**
 * Parses the path after /blog/spotlight: <key> | <ds|pm>/<group>/<key>, optionally followed by /page/<n>.
 * Every segment must be a known key and the LAST key picks the category, so the nav's nested ds/pm URLs
 * show the same posts as the short URL (whose canonical they use). Returns null for anything else (404).
 *   explicitPage: the URL carried /page/<n> (n=1 is a duplicate of the base URL and gets redirected).
 */
export function parseSpotlightPath(slugParts) {
  let parts = slugParts.map(normalise);
  let page = 1;
  let explicitPage = false;

  if (parts.length >= 3 && parts[parts.length - 2] === "page") {
    page = parsePageNumber(parts[parts.length - 1]);
    if (page === null) return null;
    explicitPage = true;
    parts = parts.slice(0, -2);
  }

  if (parts.length === 0 || parts.some((p) => !spotlightMap[p])) return null;
  const key = parts[parts.length - 1];
  return { key, info: spotlightMap[key], page, explicitPage };
}

const findCategory = (categories, info) =>
  categories.find((c) => c.slug === info.slug) || categories.find((c) => c.name.toLowerCase() === info.name.toLowerCase());

// The spotlight's WordPress category and its complete post list. The key map is the validated source, so a
// mapped key without a category (or posts) still resolves; callers decide how to present an empty one.
export async function loadSpotlight(info) {
  const category = findCategory(await getCategories(), info);
  const posts = await getCategoryPosts(category?.slug || info.slug);
  return { categoryName: category?.name || info.name, count: category?.count || posts.length, posts };
}

// Keys whose category has posts (from the category counts), for the index page and the sitemap.
export async function getNonEmptySpotlightKeys() {
  const categories = await getCategories();
  return Object.keys(spotlightMap).filter((key) => findCategory(categories, spotlightMap[key])?.count > 0);
}
