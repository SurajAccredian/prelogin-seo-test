import { notFound, permanentRedirect } from "next/navigation";
import { parsePageNumber } from "../../../../../lib/blog/utils";
import { blogMetadata, pagedTitle } from "../../../../../lib/blog/seo";
import { HIDDEN_CATEGORY_SLUGS } from "../../../../../lib/blog/constants";
import CategoryListing, { findCategory, getCategoryTotalPages } from "../../../../../components/Blog/CategoryListing";

export const revalidate = 3600;

// Pages 2+ are not prerendered: they render on first request and are then cached (ISR).
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const { slug, n } = await params;
  const page = parsePageNumber(n);
  if (page === null) notFound();
  if (page === 1) return {}; // the page itself redirects to the base URL

  const category = await findCategory(slug);
  if (!category || page > (await getCategoryTotalPages(category))) notFound();

  return blogMetadata({
    title: pagedTitle(`${category.name} Archives | Accredian Blog`, page),
    description: `Browse all articles related to ${category.name} from Accredian.`,
    path: `/category/${slug}/page/${page}`,
    robots: HIDDEN_CATEGORY_SLUGS.includes(slug) ? { index: false, follow: true } : undefined,
  });
}

export default async function CategoryPageN({ params }) {
  const { slug, n } = await params;
  const page = parsePageNumber(n);
  if (page === null) notFound();
  if (page === 1) permanentRedirect(`/blog/category/${slug}`); // /page/1 duplicates the base URL

  return <CategoryListing slug={slug} page={page} />;
}
