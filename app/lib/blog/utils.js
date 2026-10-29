import { mapLegacyBlogPath } from "./legacy-paths";

export function fixWordPressUrls(content) {
  if (!content) return "";

  // Replace old blog domain with the api-blog domain for images and links.
  // Lookbehind skips URLs already on api-blog (WP now returns those), which
  // would otherwise become "api-api-blog".
  return content.replace(/(?<!api-)blog\.accredian\.com/g, "api-blog.accredian.com");
}

// Only rewrites <img src="..."> occurrences, leaving <a href="..."> links inside
// post content untouched (see rewriteBlogLinks for those).
// Also downgrades any <h1> in the body to <h2>: WordPress editors sometimes
// author in-body subheadings as "Heading 1", which would otherwise duplicate
// the page's own title <h1> and break the page's heading hierarchy.
// Also guarantees every <img> has non-empty alt text (SEO/accessibility audits
// flag missing alts): derived from the image filename, else the fallback.
export function fixWordPressContentImages(content, fallbackAlt = "") {
  if (!content) return "";

  return content
    .replace(/(src=["'])https?:\/\/blog\.accredian\.com/g, "$1https://api-blog.accredian.com")
    .replace(/<h1(\s[^>]*)?>/gi, "<h2$1>")
    .replace(/<\/h1>/gi, "</h2>")
    .replace(/<img\b[^>]*>/gi, (tag) => ensureImgAlt(tag, fallbackAlt));
}

// Rewrites absolute links to the old blog host inside post HTML into final /blog/... paths (see
// legacy-paths.js). Links with no equivalent (wp-content media, feeds, files) stay absolute.
// Only <a href> values are touched; api-blog.accredian.com URLs (images) are never matched.
export function rewriteBlogLinks(content) {
  if (!content) return "";

  return content.replace(
    /(href\s*=\s*["'])https?:\/\/(?:www\.)?blog\.accredian\.com(\/[^"'?#]*)?([?#][^"']*)?(["'])/gi,
    (match, open, path = "", suffix = "", close) => {
      const mapped = mapLegacyBlogPath(path || "/");
      return mapped ? `${open}${mapped}${suffix}${close}` : match;
    }
  );
}

// The one entry point pages use for post body HTML: image fixes, then old-host links -> /blog/... paths.
export function prepareContentHtml(content, fallbackAlt = "") {
  return rewriteBlogLinks(fixWordPressContentImages(content, fallbackAlt));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// "2025-06-18T11:35:19" -> "Jun 18, 2025" (legacy date-fns 'MMM d, yyyy'), or with long=true
// "June 18, 2025" ('MMMM d, yyyy'). Reads the date digits directly so the output never depends
// on the server's timezone.
export function formatPostDate(value, long = false) {
  const m = typeof value === "string" ? value.match(/^(\d{4})-(\d{2})-(\d{2})/) : null;
  if (!m) return "";
  const month = (long ? MONTHS_LONG : MONTHS)[Number(m[2]) - 1];
  return `${month} ${Number(m[3])}, ${m[1]}`;
}

// /page/<n> path segment: strictly a positive integer without leading zeros, else null (caller 404s).
export function parsePageNumber(value) {
  return typeof value === "string" && /^[1-9]\d{0,5}$/.test(value) ? Number(value) : null;
}

// Path-based pagination URL: page 1 is the bare base path, page n>=2 is <base>/page/<n>.
export const pagePath = (basePath, page) => (page <= 1 ? basePath : `${basePath}/page/${page}`);

// ?page=N: absent/empty/0/non-numeric -> 1 (legacy behaviour); negative or fractional -> null (caller 404s).
export function parsePageParam(value) {
  const n = Number(value) || 1;
  return Number.isInteger(n) && n >= 1 ? n : null;
}

function altFromSrc(src) {
  const file = src.split(/[?#]/)[0].split("/").pop() ?? "";
  const name = file
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/-\d+x\d+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  // Camera/hash-style names (IMG_1234, long digit runs) make poor alt text.
  return /[a-z]{3,}/i.test(name) && !/^(img|image|dsc|screenshot)\s*\d*$/i.test(name) ? name : "";
}

function ensureImgAlt(tag, fallbackAlt) {
  const altMatch = tag.match(/\salt\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
  if (altMatch && (altMatch[1] ?? altMatch[2] ?? "").trim()) return tag;

  const src = tag.match(/\ssrc\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
  const alt = (altFromSrc(src?.[1] ?? src?.[2] ?? "") || fallbackAlt)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;");
  if (!alt) return tag;

  if (altMatch) return tag.replace(altMatch[0], ` alt="${alt}"`);
  return tag.replace(/^<img\b/i, `<img alt="${alt}"`);
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function stripHtml(html) {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

function truncateAtWordBoundary(text, maxLength) {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated).trim() + "...";
}

// Prefers the WordPress excerpt; falls back to a derived snippet of the post
// content so pages without an excerpt still get a real, per-post description
// instead of the generic static string.
export function getMetaDescription(excerpt, content, maxLength = 155) {
  const fromExcerpt = excerpt ? stripHtml(excerpt) : "";
  if (fromExcerpt) return truncateAtWordBoundary(fromExcerpt, maxLength);

  const fromContent = content ? stripHtml(content) : "";
  if (fromContent) return truncateAtWordBoundary(fromContent, maxLength);

  return "Accredian blog post";
}

// WordPress post titles are often long/keyword-stuffed on their own, so the
// " | Accredian Blog" suffix is only appended when it still fits the SEO
// title-length budget; otherwise we fall back to the bare (possibly
// truncated) title rather than guarantee an overlong <title> tag.
export function getMetaTitle(title, suffix = "Accredian Blog", maxLength = 60) {
  const withSuffix = `${title} | ${suffix}`;
  if (withSuffix.length <= maxLength) return withSuffix;
  if (title.length <= maxLength) return title;

  return truncateAtWordBoundary(title, maxLength);
}
