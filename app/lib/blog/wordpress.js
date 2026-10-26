import {
  GET_POSTS,
  GET_POSTS_PAGE,
  GET_LATEST_POST_SLUGS,
  GET_POST,
  GET_CATEGORIES_PAGE,
  GET_CATEGORY_POSTS,
  GET_POST_AUTHOR,
  GET_AUTHOR,
  GET_AUTHOR_POSTS,
  GET_AUTHOR_SLUGS,
} from "./queries";

// Server-only. WORDPRESS_URL is intentionally not NEXT_PUBLIC_*.
const WP_GRAPHQL_URL = process.env.WORDPRESS_URL || "https://api-blog.accredian.com/graphql";
const TIMEOUT_MS = 10000;
const MAX_PAGES = 100; // 10k nodes; guards against a runaway cursor loop

/**
 * Error contract used by every fetcher below:
 *  - WordPress answered and the entity does not exist -> the fetcher returns null (caller notFound()s).
 *  - Network error, timeout, non-2xx or GraphQL `errors` -> this function THROWS, so ISR keeps serving
 *    the last good page and a transient outage is never cached as an empty page or soft 404.
 */
export async function fetchGraphQL(query, variables = {}) {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    next: { revalidate: 60, tags: ["blog"] },
  });
  if (!res.ok) throw new Error(`WPGraphQL HTTP ${res.status}`);

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`WPGraphQL error: ${json.errors.map((e) => e.message).join("; ")}`);
  }
  if (!json.data) throw new Error("WPGraphQL returned no data");
  return json.data;
}

// Follows pageInfo cursors until the connection is exhausted.
async function fetchAllNodes(query, pick) {
  const nodes = [];
  let after = null;
  for (let page = 0; page < MAX_PAGES; page++) {
    const conn = pick(await fetchGraphQL(query, { after }));
    if (!conn) throw new Error("WPGraphQL connection missing from response");
    nodes.push(...(conn.nodes || []));
    if (!conn.pageInfo?.hasNextPage) return nodes;
    after = conn.pageInfo.endCursor;
  }
  throw new Error(`WPGraphQL pagination exceeded ${MAX_PAGES} pages`);
}

// Newest 100 posts: listing parity with the legacy site (see GET_POSTS).
export async function getPosts() {
  const data = await fetchGraphQL(GET_POSTS);
  return data.posts?.nodes || [];
}

// The complete post list (cursor-paginated), for search, sitemap and slug checks.
export function getAllPosts() {
  return fetchAllNodes(GET_POSTS_PAGE, (d) => d.posts);
}

export async function getLatestPostSlugs(first = 50) {
  const data = await fetchGraphQL(GET_LATEST_POST_SLUGS, { first });
  return (data.posts?.nodes || []).map((p) => p.slug);
}

// null = WordPress answered, no such post.
export async function getPost(slug) {
  const data = await fetchGraphQL(GET_POST, { slug });
  return data.post || null;
}

// Complete list: WPGraphQL would otherwise silently stop at the first 100 categories.
export function getCategories() {
  return fetchAllNodes(GET_CATEGORIES_PAGE, (d) => d.categories);
}

// An unknown category also comes back as an empty list, so callers must check the slug
// against getCategories() before treating an empty result as "category exists".
export async function getCategoryPosts(categorySlug) {
  const data = await fetchGraphQL(GET_CATEGORY_POSTS, { categoryName: categorySlug });
  return data.posts?.nodes || [];
}

function toAuthorProfile(user) {
  if (!user?.name || !user.slug) return null;
  return {
    databaseId: user.databaseId,
    name: user.name,
    slug: user.slug,
    bio: user.description,
    avatar: user.avatar?.url,
  };
}

export async function getPostAuthorProfile(slug) {
  const data = await fetchGraphQL(GET_POST_AUTHOR, { slug });
  return toAuthorProfile(data.post?.author?.node);
}

// null = WordPress answered, no such (public) user.
export async function getAuthorProfile(slug) {
  const data = await fetchGraphQL(GET_AUTHOR, { slug });
  return toAuthorProfile(data.user);
}

export async function getAuthorPosts(authorId) {
  const data = await fetchGraphQL(GET_AUTHOR_POSTS, { authorId });
  return data.posts?.nodes || [];
}

export async function getAuthorSlugs() {
  const nodes = await fetchAllNodes(GET_AUTHOR_SLUGS, (d) => d.users);
  return nodes.map((n) => n.slug).filter(Boolean);
}
