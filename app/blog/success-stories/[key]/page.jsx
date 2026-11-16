import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Award } from "lucide-react";
import { getCategoryPosts } from "../../../lib/blog/wordpress";
import { successStoriesMap } from "../../../lib/blog/constants";
import { blogMetadata } from "../../../lib/blog/seo";
import { blogBreadcrumbGraph } from "../../../lib/blog/schema";
import { JsonLd } from "../../../components/JsonLd";
import BlogCard from "../../../components/Blog/BlogCard";

export const revalidate = 3600;

export async function generateStaticParams() {
  return Object.keys(successStoriesMap).map((key) => ({ key }));
}

// Only ds and pm exist; every other key is a real 404 (the legacy site also served duplicate 200s for extra
// path segments). This is checked here rather than with `dynamicParams = false`, because that setting makes
// Next answer 404 for a prerendered page as soon as its cache entry is invalidated (NoFallbackError).
export async function generateMetadata({ params }) {
  const { key } = await params;
  const categoryInfo = successStoriesMap[key];
  if (!categoryInfo) notFound();

  return blogMetadata({
    title: `${categoryInfo.name} | Accredian Blog`,
    description: `Read inspiring ${categoryInfo.name} from our successful alumni.`,
    path: `/success-stories/${key}`,
  });
}

export default async function SuccessStoriesPage({ params }) {
  const { key } = await params;
  const categoryInfo = successStoriesMap[key];
  if (!categoryInfo) notFound();
  const posts = await getCategoryPosts(categoryInfo.slug);

  return (
    <div className="py-16 md:py-24">
      <JsonLd
        data={blogBreadcrumbGraph(`/success-stories/${key}`, [
          ["Alumni Career Transition Articles", "/success-stories"],
          [categoryInfo.name, `/success-stories/${key}`],
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
            <Award className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">{categoryInfo.name}</span>
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            {posts.length} {posts.length === 1 ? "story" : "stories"} found in this category.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">No stories found</h3>
            <p className="text-gray-500 font-medium">There are no success stories published in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
