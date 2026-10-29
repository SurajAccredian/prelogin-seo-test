// Maps a path on the OLD blog host (blog.accredian.com) to its FINAL path under accredian.com/blog.
// One source of truth, used (a) to rewrite links inside post HTML and (b) by the old-host redirect proxy
// (migration/), so redirects land on the final URL with no chains. Mirrors the legacy site's own redirects,
// re-targeted at the new URL map. Structural only: it does not know which posts/categories exist; the
// redirect proxy validates the result against generated data (migration/redirect-data.json).
// Returns null when the path has no equivalent (callers keep the original link / answer 404).
import { NON_PERSON_AUTHOR_SLUGS, spotlightMap } from "./constants.js";

// insaid-spotlight leaf slugs that differ from the /spotlight key.
export const SPOTLIGHT_LEAF_KEYS = {
  "0-to-2-years-experience": "0-2-years",
  "2-to-7-years-experience": "2-7-years",
  "7-to-15-years-experience": "7-15-years",
  "15-years-experience": "15-plus-years",
  "cass-business-school-london": "cass",
  "narsee-monjee-institute-of-management-studies": "nmims",
  "indian-institute-of-foreign-trade-new-delhi": "iift",
  "shailesh-j-mehta-school-of-management": "sjmsom",
  "purdue-university": "purdue",
  "symbiosis-institute-of-business-management": "symbiosis",
  "manit-bhopal": "manit",
};

// /category/<slug> URLs that now live elsewhere.
const CATEGORY_REDIRECTS = {
  topreads: "/blog/articles",
  "success-stories": "/blog/success-stories",
  "student-testimonial": "/blog/testimonials",
  "sales-and-marketing": "/blog/spotlight/sales-and-marketing",
  "retail-e-commerce": "/blog/spotlight/retail-ecommerce",
};

// insaid-spotlight parents that have no spotlight page of their own.
const SPOTLIGHT_PARENTS = {
  "professional-background": "/blog/spotlight/background",
  "work-experience": "/blog/spotlight",
  "programmer-non-programmer": "/blog/spotlight",
};

// Single-segment paths on the old host that are not posts.
const NON_POST_SEGMENTS = new Set(["wp-content", "wp-json", "wp-admin", "feed", "sitemap.xml", "robots.txt", "favicon.ico"]);

const spotlightKey = (key) => (spotlightMap[key] ? `/blog/spotlight/${key}` : null);

export function mapLegacyBlogPath(path) {
  const segments = path.split("/").filter(Boolean);
  const [first, second, third] = segments;

  if (segments.length === 0) return "/blog"; // old home -> new blog home

  if (first === "blog") {
    // old /blog was the article listing; old /blog/<slug> is unchanged
    if (segments.length === 1) return "/blog/articles";
    return segments.length === 2 ? `/blog/${second}` : null;
  }

  if (first === "page") return "/blog/articles"; // legacy WordPress pagination

  if (first === "category") {
    if (segments.length === 1) return "/blog/articles";
    if (second === "insaid-spotlight") {
      if (segments.length === 2) return "/blog/spotlight";
      if (segments.length === 3 && SPOTLIGHT_PARENTS[third]) return SPOTLIGHT_PARENTS[third];
      if (segments.length > 4) return null;
      const leaf = segments[segments.length - 1];
      return spotlightKey(SPOTLIGHT_LEAF_KEYS[leaf] || leaf);
    }
    if (second === "insaid-pm-spotlight") return segments.length === 2 ? "/blog/spotlight/pm" : null;
    if (segments.length === 2) return CATEGORY_REDIRECTS[second] || `/blog/category/${second}`;
    return null;
  }

  if (first === "spotlight") {
    // Every segment must be a known key; the LAST key is the category (the legacy rule), and the
    // canonical URL is the short /blog/spotlight/<key> form.
    if (segments.length === 1) return "/blog/spotlight";
    const keys = segments.slice(1);
    return keys.every((key) => spotlightMap[key]) ? `/blog/spotlight/${keys[keys.length - 1]}` : null;
  }

  if (first === "success-stories") {
    if (segments.length === 1) return "/blog/success-stories";
    return segments.length === 2 && (second === "ds" || second === "pm") ? `/blog/success-stories/${second}` : null;
  }

  if (first === "author") {
    if (segments.length !== 2) return null;
    // Shared accounts have no author page: send the URL to the article listing.
    return NON_PERSON_AUTHOR_SLUGS.includes(second) ? "/blog/articles" : `/blog/author/${second}`;
  }

  if (first === "search" || first === "testimonials") return segments.length === 1 ? `/blog/${first}` : null;

  // a single unprefixed segment is a legacy root-level post permalink
  if (segments.length === 1 && !NON_POST_SEGMENTS.has(first) && !/\.[a-z0-9]{2,5}$/i.test(first)) {
    return `/blog/${first}`;
  }

  return null;
}
