import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, SearchIcon } from "lucide-react";
import { searchPosts } from "../../lib/blog/wordpress";
import { parsePageParam } from "../../lib/blog/utils";
import { blogMetadata } from "../../lib/blog/seo";
import BlogCard from "../../components/Blog/BlogCard";

const RESULTS_PER_PAGE = 20;
const MAX_PAGE = 50; // keeps the cursor walk bounded: at most 1,000 results are reachable
const MAX_TERM_LENGTH = 100;

export const metadata = blogMetadata({
  title: "Search | Accredian Blog",
  description: "Search articles and tutorials.",
  path: "/search",
  robots: { index: false, follow: true },
});

const searchHref = (term, page) =>
  `/blog/search?q=${encodeURIComponent(term)}${page > 1 ? `&page=${page}` : ""}`;

// Reads searchParams, so this page renders per request (and WordPress results are never cached).
export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = (params?.q || "").toString().trim().slice(0, MAX_TERM_LENGTH);
  const page = parsePageParam(params?.page);
  if (page === null || page > MAX_PAGE) notFound();

  const { posts: results, hasNext } = query ? await searchPosts(query, page, RESULTS_PER_PAGE) : { posts: [], hasNext: false };
  if (query && page > 1 && results.length === 0) notFound();

  return (
    <div className="py-16 md:py-24 min-h-[70vh]">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Search Articles</h1>

          <form className="relative" action="/blog/search" method="GET">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <SearchIcon className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              name="q"
              defaultValue={query}
              maxLength={MAX_TERM_LENGTH}
              placeholder="Search by keyword, topic, or title..."
              className="block w-full pl-12 pr-32 py-4 rounded-2xl border border-gray-200 bg-white text-gray-900 shadow focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-lg"
              autoFocus
            />
            <button
              type="submit"
              className="absolute inset-y-2 right-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all shadow-md active:scale-95"
            >
              Search
            </button>
          </form>
        </div>

        {query && (
          <div className="mb-10 text-center">
            <h2 className="text-xl font-medium text-gray-600">
              Results for <span className="font-bold text-gray-900">&quot;{query}&quot;</span>
            </h2>
          </div>
        )}

        {query && results.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            {(page > 1 || hasNext) && (
              <nav aria-label="Pagination" className="flex justify-center items-center gap-4 mt-12 w-full">
                {page > 1 ? (
                  <a
                    href={searchHref(query, page - 1)}
                    rel="prev"
                    className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" /> Previous
                  </a>
                ) : null}
                {hasNext && page < MAX_PAGE ? (
                  <a
                    href={searchHref(query, page + 1)}
                    rel="next"
                    className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all"
                  >
                    Next <ChevronRight className="w-5 h-5" />
                  </a>
                ) : null}
              </nav>
            )}
          </>
        ) : query ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">No results found</h3>
            <p className="text-gray-500 font-medium">Try different keywords or browse our categories.</p>
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 font-medium">Enter a search term above to find articles.</div>
        )}
      </div>
    </div>
  );
}
