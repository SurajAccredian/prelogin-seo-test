import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCategories, getCategoryPosts } from "../../../lib/blog/wordpress";
import { parsePageParam } from "../../../lib/blog/utils";
import { blogMetadata } from "../../../lib/blog/seo";
import { blogBreadcrumbGraph } from "../../../lib/blog/schema";
import { JsonLd } from "../../../components/JsonLd";
import BlogCard from "../../../components/Blog/BlogCard";
import Pagination from "../../../components/Blog/Pagination";

export const revalidate = 60;

const POSTS_PER_PAGE = 9;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const page = parsePageParam((await searchParams)?.page) ?? 1;
  const category = (await getCategories()).find((c) => c.slug === slug);
  if (!category) notFound();

  return blogMetadata({
    title: `${category.name} Archives | Accredian Blog`,
    description: `Browse all articles related to ${category.name} from Accredian.`,
    path: page > 1 ? `/category/${slug}?page=${page}` : `/category/${slug}`,
  });
}

export default async function CategoryPage({ params, searchParams }) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const page = parsePageParam(query?.page);
  if (page === null) notFound();

  // An unknown category also yields an empty post list, so the slug is checked against the
  // category list first: that is what turns a bad slug into a real 404.
  const category = (await getCategories()).find((c) => c.slug === slug);
  if (!category) notFound();

  const allCategoryPosts = await getCategoryPosts(category.slug);
  const totalPages = Math.ceil(allCategoryPosts.length / POSTS_PER_PAGE);
  if (page > Math.max(totalPages, 1)) notFound();

  const currentPosts = allCategoryPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <div className="py-16 md:py-24">
      <JsonLd data={blogBreadcrumbGraph(`/category/${slug}`, [[category.name, `/category/${slug}`]])} />
      <div className="container mx-auto px-4">
        <Link
          href="/blog/articles"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> All articles
        </Link>

        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Category:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">{category.name}</span>
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            {category.count} {category.count === 1 ? "article" : "articles"} found in this category.
          </p>
        </div>

        {currentPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            <Pagination currentPage={page} totalPages={totalPages} basePath={`/blog/category/${slug}`} />
          </>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">No posts found</h3>
            <p className="text-gray-500 font-medium">There are no articles published in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
