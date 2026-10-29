import { notFound, permanentRedirect } from "next/navigation";
import { parsePageNumber } from "../../../../lib/blog/utils";
import { blogMetadata, pagedTitle } from "../../../../lib/blog/seo";
import ArticlesListing, { ARTICLES_BASE_PATH, getArticlesTotalPages } from "../../../../components/Blog/ArticlesListing";

export const revalidate = 3600;

// Only the first few pages are prerendered; every other page renders on first request and is then
// cached (ISR). dynamicParams stays at its default (true) for that reason.
const PRERENDERED_PAGES = [2, 3, 4];

export async function generateStaticParams() {
  return PRERENDERED_PAGES.map((n) => ({ n: String(n) }));
}

export async function generateMetadata({ params }) {
  const page = parsePageNumber((await params).n);
  if (page === null) notFound();
  if (page === 1) return {}; // the page itself redirects to the base URL
  if (page > (await getArticlesTotalPages())) notFound();

  return blogMetadata({
    title: pagedTitle("All Blog Posts | Accredian", page),
    description: "Browse all articles, tutorials, and insights from Accredian.",
    path: `/articles/page/${page}`,
  });
}

export default async function BlogListingPage({ params }) {
  const page = parsePageNumber((await params).n);
  if (page === null) notFound();
  if (page === 1) permanentRedirect(ARTICLES_BASE_PATH); // /page/1 is a duplicate of the base URL

  return <ArticlesListing page={page} />;
}
