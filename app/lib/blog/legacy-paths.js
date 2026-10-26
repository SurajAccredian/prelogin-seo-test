// Maps a path on the OLD blog host (blog.accredian.com) to its FINAL path under accredian.com/blog.
// One source of truth: used to rewrite links inside post HTML, and to generate the old-host redirect
// file (so redirects go straight to the final URL with no chains). Mirrors the legacy site's own
// next.config.ts redirects, re-targeted at the new URL map.
// Returns null when the path has no equivalent (callers keep the original absolute link / skip).

// insaid-spotlight leaf slugs that differ from the /spotlight key.
const SPOTLIGHT_LEAF_KEYS = {
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
  "insaid-pm-spotlight": "/blog/spotlight/pm",
};

// insaid-spotlight parents that have no spotlight page of their own.
const SPOTLIGHT_PARENTS = {
  "professional-background": "/blog/spotlight/background",
  "work-experience": "/blog/spotlight",
  "programmer-non-programmer": "/blog/spotlight",
};

// Single-segment paths on the old host that are not posts.
const NON_POST_SEGMENTS = new Set(["wp-content", "wp-json", "wp-admin", "feed", "sitemap.xml", "robots.txt"]);

const PREFIXED_SEGMENTS = new Set(["search", "testimonials", "author", "spotlight", "success-stories"]);

export function mapLegacyBlogPath(path) {
  const segments = path.split("/").filter(Boolean);
  const [first, second, third] = segments;

  if (segments.length === 0) return "/blog"; // old home -> new blog home

  if (first === "blog") {
    // old /blog was the article listing; old /blog/<slug> is unchanged
    if (segments.length === 1) return "/blog/articles";
    if (second === "in-talks-with-nikki-from-information-security-consultant") return "/blog/articles";
    return segments.length === 2 ? `/blog/${second}` : null;
  }

  if (first === "page") return "/blog/articles"; // legacy WordPress pagination

  if (first === "category") {
    if (segments.length === 1) return "/blog/articles";
    if (second === "insaid-spotlight") {
      if (segments.length === 2) return "/blog/spotlight";
      if (segments.length === 3 && SPOTLIGHT_PARENTS[third]) return SPOTLIGHT_PARENTS[third];
      const leaf = segments[segments.length - 1];
      if (segments.length <= 4) return `/blog/spotlight/${SPOTLIGHT_LEAF_KEYS[leaf] || leaf}`;
      return null;
    }
    if (segments.length === 2) return CATEGORY_REDIRECTS[second] || `/blog/category/${second}`;
    return null;
  }

  if (PREFIXED_SEGMENTS.has(first)) return `/blog/${segments.join("/")}`;

  // a single unprefixed segment is a legacy root-level post permalink
  if (segments.length === 1 && !NON_POST_SEGMENTS.has(first) && !/\.[a-z0-9]{2,5}$/i.test(first)) {
    return `/blog/${first}`;
  }

  return null;
}
