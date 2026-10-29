import { NON_PERSON_AUTHOR_SLUGS } from "./constants";

export const isNonPersonAuthor = (slug) => NON_PERSON_AUTHOR_SLUGS.includes(slug);

// The name to show as a post's byline, or null. Shared accounts ("admin") and posts WordPress returns
// no author for get no byline at all: we never print a generic or invented name.
export function postByline(post) {
  const author = post.author?.node;
  return author?.name && author.slug && !isNonPersonAuthor(author.slug) ? author.name : null;
}
