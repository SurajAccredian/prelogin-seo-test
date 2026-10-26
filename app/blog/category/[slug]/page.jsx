import { notFound } from "next/navigation";
import { getCategories } from "../../../lib/blog/wordpress";
import { blogMetadata } from "../../../lib/blog/seo";
import CategoryListing, { findCategory } from "../../../components/Blog/CategoryListing";

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await findCategory(slug);
  if (!category) notFound();

  return blogMetadata({
    title: `${category.name} Archives | Accredian Blog`,
    description: `Browse all articles related to ${category.name} from Accredian.`,
    path: `/category/${slug}`,
  });
}

// Page 1 of a category. Pages 2+ live at /blog/category/<slug>/page/<n>.
export default async function CategoryPage({ params }) {
  const { slug } = await params;
  return <CategoryListing slug={slug} page={1} />;
}
