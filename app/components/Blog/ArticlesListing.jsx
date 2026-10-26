import { notFound } from "next/navigation";
import { getAllPosts, getCategories } from "../../lib/blog/wordpress";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import CategoryBadge from "./CategoryBadge";

export const ARTICLES_PER_PAGE = 9;
export const ARTICLES_BASE_PATH = "/blog/articles";

export async function getArticlesTotalPages() {
  return Math.ceil((await getAllPosts()).length / ARTICLES_PER_PAGE);
}

// The full article listing, 9 per page, page n of the complete (cursor-paginated) post list.
// Out-of-range pages are a real 404, not a 200 with "No posts found".
export default async function ArticlesListing({ page }) {
  const [allPosts, categories] = await Promise.all([getAllPosts(), getCategories()]);
  const topCategories = [...categories]
    .filter((c) => c.count > 0)
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .slice(0, 15);

  const totalPages = Math.ceil(allPosts.length / ARTICLES_PER_PAGE);
  if (page > Math.max(totalPages, 1)) notFound();

  const currentPosts = allPosts.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Explore All Articles</h1>
          <p className="text-lg text-gray-600">
            Discover insights, tutorials, and expert advice to accelerate your career in tech and product.
          </p>
        </div>

        {/* Categories strip */}
        <div className="flex flex-wrap pb-4 mb-12 gap-3 justify-center">
          <CategoryBadge name="All Posts" slug="" />
          {topCategories.map((cat) => (
            <CategoryBadge key={cat.slug} name={cat.name} slug={cat.slug} />
          ))}
        </div>

        {currentPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            <Pagination currentPage={page} totalPages={totalPages} basePath={ARTICLES_BASE_PATH} />
          </>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">No posts found</h3>
            <p className="text-gray-500 font-medium">There are no articles available to display.</p>
          </div>
        )}
      </div>
    </div>
  );
}
