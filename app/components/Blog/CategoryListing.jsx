import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCategories, getCategoryPosts } from "../../lib/blog/wordpress";
import { blogBreadcrumbGraph } from "../../lib/blog/schema";
import { JsonLd } from "../JsonLd";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";

export const CATEGORY_POSTS_PER_PAGE = 9;

// The category, or null when the slug is unknown OR the category has no posts (both are a real 404).
// An unknown slug also yields an empty post list, so the slug is checked against the category list first.
export async function findCategory(slug) {
  const category = (await getCategories()).find((c) => c.slug === slug);
  if (!category) return null;
  return (await getCategoryPosts(slug)).length > 0 ? category : null;
}

export async function getCategoryTotalPages(category) {
  return Math.ceil((await getCategoryPosts(category.slug)).length / CATEGORY_POSTS_PER_PAGE);
}

// Page n of a category (9 per page, complete cursor-paginated post list). Out-of-range -> 404.
export default async function CategoryListing({ slug, page }) {
  const category = await findCategory(slug);
  if (!category) notFound();

  const allCategoryPosts = await getCategoryPosts(category.slug);
  const totalPages = Math.ceil(allCategoryPosts.length / CATEGORY_POSTS_PER_PAGE);
  if (page > Math.max(totalPages, 1)) notFound();

  const currentPosts = allCategoryPosts.slice((page - 1) * CATEGORY_POSTS_PER_PAGE, page * CATEGORY_POSTS_PER_PAGE);

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
