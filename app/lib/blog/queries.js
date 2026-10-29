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
  author { node { name slug } }
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

// One chunk of WordPress search results (cursor pagination; see searchPosts).
export const GET_SEARCH_POSTS = `
  query SearchPosts($search: String!, $first: Int!, $after: String) {
    posts(first: $first, after: $after, where: { search: $search }) {
      pageInfo { hasNextPage endCursor }
      nodes { ${CARD_FIELDS} }
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
      author { node { databaseId name slug description avatar { url } } }
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

// One page of a category's posts (cursor pagination: 6 categories have more than 100 posts).
export const GET_CATEGORY_POSTS_PAGE = `
  query GetCategoryPostsPage($categoryName: String!, $after: String) {
    posts(where: { categoryName: $categoryName }, first: 100, after: $after) {
      pageInfo { hasNextPage endCursor }
      nodes { ${CARD_FIELDS} }
    }
  }
`;

const USER_FIELDS = "databaseId name slug description avatar { url }";

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
