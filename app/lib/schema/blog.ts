/**
 * Blog (blog.accredian.com, headless WordPress).
 *
 * Fixes compared with the current blog markup:
 * - real author (a Person with an author page) instead of a "Person" named "Accredian"
 * - dateModified added, and dates carry a timezone (WordPress *_gmt fields + "Z")
 * - publisher is the SAME Organization @id as accredian.com, so both sites are one company
 * - optional links from a post to the programs it discusses
 *
 * Needs the WordPress snippet in wordpress/accredian-author-profile.php,
 * which adds an `author_profile` field to every post in the REST API.
 */
import { BLOG_ID, BLOG_URL, ORG_ID, SITE_URL } from "./config";
import { breadcrumbNode, makeGraph, ref } from "./nodes";
import { organizationStub } from "./sitewide";
import { cleanText, compact, stripHtml } from "./text";
import type { JsonLdGraph, JsonLdNode } from "./types";

/** Added to every post by the WordPress snippet. */
export interface WpAuthorProfile {
  id?: number;
  name: string;
  slug: string;
  bio?: string;
  avatar?: string;
  job_title?: string;
  linkedin?: string;
}

/** The WordPress REST post fields used here (GET /wp-json/wp/v2/posts?slug=...). */
export interface WpPost {
  slug: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  date_gmt: string; // "2025-06-18T11:35:19" (GMT, no timezone suffix)
  modified_gmt?: string;
  author_profile?: WpAuthorProfile | null;
}

export interface BlogPostOptions {
  /**
   * Used when the WordPress excerpt is empty (it is on many posts today).
   * Better: write a 1–2 sentence excerpt in WordPress's Excerpt box; it is used first.
   */
  description?: string;
  /** Featured image URL (from _embedded["wp:featuredmedia"][0].source_url). */
  imageUrl?: string;
  /** Topics the post is about, e.g. ["Product management", "Project management"]. */
  topics?: string[];
  /** Programs the post discusses, linked by their program slug. */
  relatedPrograms?: Array<{ slug: string; name: string }>;
}

export const blogPostUrl = (slug: string): string => `${BLOG_URL}/blog/${slug}`;
export const authorPageUrl = (slug: string): string => `${BLOG_URL}/author/${slug}`;

/** WordPress *_gmt values have no timezone; they are UTC, so add "Z". */
const withTimezone = (value?: string): string | undefined =>
  value ? (/(Z|[+-]\d{2}:\d{2})$/.test(value) ? value : `${value}Z`) : undefined;

/** A shared account named after the brand is not a real author. */
const isRealPerson = (a?: WpAuthorProfile | null): a is WpAuthorProfile =>
  Boolean(a && cleanText(a.name) && !/^(accredian|admin)$/i.test(cleanText(a.name)));

export function blogNode(): JsonLdNode {
  return { "@type": "Blog", "@id": BLOG_ID, name: "Accredian Blog", url: `${BLOG_URL}/`, publisher: ref(ORG_ID), inLanguage: "en-IN" };
}

export function authorPersonNode(author: WpAuthorProfile): JsonLdNode {
  return compact({
    "@type": "Person",
    "@id": `${authorPageUrl(author.slug)}#person`,
    name: cleanText(author.name),
    url: authorPageUrl(author.slug),
    jobTitle: cleanText(author.job_title) || undefined,
    description: author.bio ? stripHtml(author.bio) : undefined,
    image: author.avatar,
    worksFor: ref(ORG_ID),
    sameAs: author.linkedin ? [author.linkedin] : undefined,
  });
}

export function blogPostGraph(post: WpPost, options: BlogPostOptions = {}): JsonLdGraph {
  const url = blogPostUrl(post.slug);
  const headline = stripHtml(post.title.rendered);
  const author = isRealPerson(post.author_profile) ? post.author_profile : null;
  if (!author) {
    console.warn(`[schema] Blog post "${post.slug}" has no real author profile; crediting the organization instead.`);
  }

  const article = compact({
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline,
    description: stripHtml(post.excerpt?.rendered ?? "") || cleanText(options.description) || undefined,
    image: options.imageUrl,
    datePublished: withTimezone(post.date_gmt),
    dateModified: withTimezone(post.modified_gmt ?? post.date_gmt),
    author: author ? ref(`${authorPageUrl(author.slug)}#person`) : ref(ORG_ID),
    publisher: ref(ORG_ID),
    isPartOf: ref(BLOG_ID),
    mainEntityOfPage: ref(`${url}#webpage`),
    inLanguage: "en-IN",
    about: (options.topics ?? []).map((name) => ({ "@type": "Thing", name })),
    mentions: (options.relatedPrograms ?? []).map((p) => ({
      "@type": "Course",
      "@id": `${SITE_URL}/programs/${p.slug}#course`,
      name: p.name,
      url: `${SITE_URL}/programs/${p.slug}`,
    })),
  });

  return makeGraph(
    organizationStub(),
    blogNode(),
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: headline, isPartOf: ref(BLOG_ID),
      breadcrumb: ref(`${url}#breadcrumb`), inLanguage: "en-IN" },
    article,
    author ? authorPersonNode(author) : null,
    breadcrumbNode(url, [["Home", `${BLOG_URL}/`], ["Blog", `${BLOG_URL}/blog`], [headline, url]]),
  );
}

/** For the new author pages at /author/[slug]. */
export function authorPageGraph(author: WpAuthorProfile): JsonLdGraph {
  const url = authorPageUrl(author.slug);
  return makeGraph(
    organizationStub(),
    blogNode(),
    { "@type": "ProfilePage", "@id": `${url}#webpage`, url, name: `${cleanText(author.name)} – Accredian Blog`,
      isPartOf: ref(BLOG_ID), mainEntity: ref(`${url}#person`), inLanguage: "en-IN" },
    authorPersonNode(author),
  );
}
