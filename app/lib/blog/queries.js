// WPGraphQL queries for the blog (api-blog.accredian.com).
// WPGraphQL caps every connection at 100 nodes per request, so anything that needs a
// complete list must page with `first: 100` + `after` (see wordpress.js `fetchAllNodes`).

export const POST_SCHEMA_FIELDS = `
  slug
  title
  excerpt
  dateGmt
  modifiedGmt
  featuredImage { node { sourceUrl } }
  categories { nodes { name } }
`;

const CARD_FIELDS = `
  title
  slug
  date
  excerpt
  featuredImage { node { sourceUrl } }
  author { node { name } }
  categories { nodes { name slug } }
`;

// Listing parity with the legacy site: newest 100 posts (what `first: 1000` really returned).
export const GET_POSTS = `
  query GetPosts {
    posts(first: 100) {
      nodes { ${CARD_FIELDS} }
    }
  }
`;

// One page of the complete post list (cursor pagination). `modifiedGmt` feeds sitemap lastmod.
export const GET_POSTS_PAGE = `
  query GetPostsPage($after: String) {
    posts(first: 100, after: $after) {
      pageInfo { hasNextPage endCursor }
      nodes { ${CARD_FIELDS} modifiedGmt }
    }
  }
`;

export const GET_LATEST_POST_SLUGS = `
  query GetLatestPostSlugs($first: Int!) {
    posts(first: $first) { nodes { slug } }
  }
`;

export const GET_POST = `
  query GetPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ${POST_SCHEMA_FIELDS}
      content
      date
      author { node { name } }
      categories { nodes { name slug } }
    }
  }
`;

export const GET_CATEGORIES_PAGE = `
  query GetCategoriesPage($after: String) {
    categories(first: 100, after: $after) {
      pageInfo { hasNextPage endCursor }
      nodes { name slug count }
    }
  }
`;

export const GET_CATEGORY_POSTS = `
  query GetCategoryPosts($categoryName: String!) {
    posts(where: { categoryName: $categoryName }, first: 100) {
      nodes { ${CARD_FIELDS} }
    }
  }
`;

const USER_FIELDS = "databaseId name slug description avatar { url }";

export const GET_POST_AUTHOR = `
  query PostAuthor($slug: ID!) {
    post(id: $slug, idType: SLUG) { author { node { ${USER_FIELDS} } } }
  }
`;

export const GET_AUTHOR = `
  query AuthorUser($slug: ID!) {
    user(id: $slug, idType: SLUG) { ${USER_FIELDS} }
  }
`;

export const GET_AUTHOR_POSTS = `
  query AuthorPosts($authorId: Int!) {
    posts(first: 50, where: { author: $authorId }) { nodes { slug title dateGmt } }
  }
`;

export const GET_AUTHOR_SLUGS = `
  query AuthorSlugs($after: String) {
    users(first: 100, after: $after, where: { hasPublishedPosts: [POST] }) {
      pageInfo { hasNextPage endCursor }
      nodes { slug }
    }
  }
`;
