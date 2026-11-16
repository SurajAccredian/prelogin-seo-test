import { breadcrumbNode, makeGraph, SITE_URL } from "../schema";
import { blogUrl } from "./seo";

// WPGraphQL -> the shapes app/lib/schema/blog.ts (blogPostGraph, authorPageGraph) expects.

export function authorFromGraphQL(author) {
  if (!author?.name || !author.slug) return null;
  return {
    id: author.databaseId ?? undefined,
    name: author.name,
    slug: author.slug,
    bio: author.bio ?? undefined,
    avatar: author.avatar ?? undefined,
    job_title: author.jobTitle ?? undefined,
    linkedin: author.linkedin ?? undefined,
  };
}

export function postFromGraphQL(post, author) {
  return {
    slug: post.slug,
    title: { rendered: post.title ?? "" },
    excerpt: { rendered: post.excerpt ?? "" },
    date_gmt: post.dateGmt,
    modified_gmt: post.modifiedGmt ?? undefined,
    author_profile: authorFromGraphQL(author),
  };
}

export const imageUrlFromGraphQL = (post) => post.featuredImage?.node?.sourceUrl ?? undefined;

export const topicsFromGraphQL = (post) =>
  (post.categories?.nodes ?? []).map((n) => n?.name ?? "").filter(Boolean);

/** Home > Blog > ... trail on the canonical /blog URLs. `trail` items are [name, path under /blog]. */
export function blogBreadcrumbGraph(path, trail) {
  return makeGraph(
    breadcrumbNode(blogUrl(path), [
      ["Home", `${SITE_URL}/`],
      ["Blog", blogUrl()],
      ...trail.map(([name, p]) => [name, blogUrl(p)]),
    ]),
  );
}
