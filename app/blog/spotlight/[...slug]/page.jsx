import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import { SPOTLIGHT_PER_PAGE, getNonEmptySpotlightKeys, loadSpotlight, parseSpotlightPath } from "../../../lib/blog/spotlight";
import { blogMetadata, pagedTitle } from "../../../lib/blog/seo";
import { blogBreadcrumbGraph } from "../../../lib/blog/schema";
import { JsonLd } from "../../../components/JsonLd";
import BlogCard from "../../../components/Blog/BlogCard";
import Pagination from "../../../components/Blog/Pagination";

export const revalidate = 3600;

// Page 1 of every spotlight key that has articles is prerendered. The nav's nested ds/pm variants and every
// /page/<n> render on first request and are then cached (ISR); dynamicParams stays at its default (true).
export async function generateStaticParams() {
  return (await getNonEmptySpotlightKeys()).map((key) => ({ slug: [key] }));
}

export async function generateMetadata({ params }) {
  const parsed = parseSpotlightPath((await params).slug);
  if (!parsed) notFound();
  if (parsed.explicitPage && parsed.page === 1) return {}; // the page itself redirects to the base URL

  const { key, info, page } = parsed;
  const { posts } = await loadSpotlight(info);
  // A spotlight with no articles is a real 404 (and out of the index); so is a page past the end.
  if (posts.length === 0 || page > Math.ceil(posts.length / SPOTLIGHT_PER_PAGE)) notFound();

  // Canonical collapses the ds/pm path variants onto /blog/spotlight/<key>.
  return blogMetadata({
    title: pagedTitle(`${info.name} - Accredian Spotlight`, page),
    description: info.description,
    path: page > 1 ? `/spotlight/${key}/page/${page}` : `/spotlight/${key}`,
  });
}

export default async function SpotlightPage({ params }) {
  const parsed = parseSpotlightPath((await params).slug);
  if (!parsed) notFound();
  const { key, info, page, explicitPage } = parsed;
  if (explicitPage && page === 1) permanentRedirect(`/blog/spotlight/${key}`); // duplicate of the base URL

  const { categoryName, count, posts: allPosts } = await loadSpotlight(info);
  const totalPages = Math.ceil(allPosts.length / SPOTLIGHT_PER_PAGE);
  if (allPosts.length === 0 || page > totalPages) notFound();
  const currentPosts = allPosts.slice((page - 1) * SPOTLIGHT_PER_PAGE, page * SPOTLIGHT_PER_PAGE);

  return (
    <div className="py-16 md:py-24">
      <JsonLd
        data={blogBreadcrumbGraph(`/spotlight/${key}`, [
          ["Spotlight", "/spotlight"],
          [categoryName, `/spotlight/${key}`],
        ])}
      />
      <div className="container mx-auto px-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-xl mb-6">
            <Star className="w-8 h-8 text-primary-600 fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Spotlight:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">{categoryName}</span>
          </h1>
          <p className="text-lg text-gray-600 font-medium mb-2">
            {count} {count === 1 ? "article" : "articles"} found in this category.
          </p>
          <p className="text-gray-500 max-w-2xl">{info.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <Pagination currentPage={page} totalPages={totalPages} basePath={`/blog/spotlight/${key}`} />
      </div>
    </div>
  );
}
