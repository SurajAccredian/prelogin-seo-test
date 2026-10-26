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

// Paths on the old blog host that now live under /blog. Anything else (wp-content media,
// wp-json, feeds, files with an extension) is left as an absolute link to the old host.
const PREFIXED_SEGMENTS = new Set(["search", "testimonials", "author", "spotlight", "success-stories"]);

function mapLegacyBlogPath(path) {
  const trimmed = path.replace(/\/+$/, "");
  if (trimmed === "") return "/blog";

  const segments = trimmed.split("/").slice(1);
  const [first, ...rest] = segments;

  if (first === "blog") return rest.length ? trimmed : "/blog/articles";
  if (first === "category") return rest.length ? `/blog${trimmed}` : "/blog/articles";
  if (first === "page") return "/blog/articles";
  if (PREFIXED_SEGMENTS.has(first)) return `/blog${trimmed}`;
  if (segments.length === 1 && !/\.[a-z0-9]{2,5}$/i.test(first) && !first.startsWith("wp-")) {
    return `/blog${trimmed}`; // legacy root-level post slug
  }
  return null;
}

// Rewrites absolute links to the old blog host inside post HTML into /blog/... paths.
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

// Off until the before/after samples have been reviewed.
export const REWRITE_BLOG_LINKS = process.env.BLOG_REWRITE_LINKS === "true";

// The one entry point pages use for post body HTML.
export function prepareContentHtml(content, fallbackAlt = "") {
  const html = fixWordPressContentImages(content, fallbackAlt);
  return REWRITE_BLOG_LINKS ? rewriteBlogLinks(html) : html;
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
