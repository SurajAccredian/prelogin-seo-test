import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Award } from "lucide-react";
import { getCategoryPosts } from "../../../lib/blog/wordpress";
import { successStoriesMap } from "../../../lib/blog/constants";
import { blogMetadata } from "../../../lib/blog/seo";
import { blogBreadcrumbGraph } from "../../../lib/blog/schema";
import { JsonLd } from "../../../components/JsonLd";
import BlogCard from "../../../components/Blog/BlogCard";

export const revalidate = 60;

const INDEX_POSTS_PER_SECTION = 3;

// /blog/success-stories, or /blog/success-stories/<ds|pm>. Anything deeper or unknown is a real 404
// (the legacy site ignored extra segments and served duplicate 200s).
function resolve(slugParts) {
  if (slugParts.length === 0) return { key: null };
  if (slugParts.length === 1 && successStoriesMap[slugParts[0]]) return { key: slugParts[0] };
  return null;
}

export async function generateMetadata({ params }) {
  const resolved = resolve((await params).slug || []);
  if (!resolved) notFound();

  if (resolved.key) {
    const { name } = successStoriesMap[resolved.key];
    return blogMetadata({
      title: `${name} | Accredian Blog`,
      description: `Read inspiring ${name} from our successful alumni.`,
      path: `/success-stories/${resolved.key}`,
    });
  }

  return blogMetadata({
    title: "Success Stories | Accredian Blog",
    description: "Read about the amazing success stories of our alumni.",
    path: "/success-stories",
  });
}

export default async function SuccessStoriesPage({ params }) {
  const resolved = resolve((await params).slug || []);
  if (!resolved) notFound();

  if (!resolved.key) return <SuccessStoriesIndex />;

  const categoryInfo = successStoriesMap[resolved.key];
  const posts = await getCategoryPosts(categoryInfo.slug);

  return (
    <div className="py-16 md:py-24">
      <JsonLd
        data={blogBreadcrumbGraph(`/success-stories/${resolved.key}`, [
          ["Success Stories", "/success-stories"],
          [categoryInfo.name, `/success-stories/${resolved.key}`],
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

// Crawlable index (the legacy page was a "coming soon" placeholder): links to each child page and
// shows its newest stories.
async function SuccessStoriesIndex() {
  const sections = await Promise.all(
    Object.entries(successStoriesMap).map(async ([key, info]) => ({
      key,
      info,
      posts: (await getCategoryPosts(info.slug)).slice(0, INDEX_POSTS_PER_SECTION),
    }))
  );

  return (
    <div className="py-16 md:py-24">
      <JsonLd data={blogBreadcrumbGraph("/success-stories", [["Success Stories", "/success-stories"]])} />
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
            Success{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Stories</span>
          </h1>
        </div>

        <div className="space-y-16">
          {sections.map(({ key, info, posts }) => (
            <section key={key}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  <Link href={`/blog/success-stories/${key}`} className="hover:text-primary-600 transition-colors">
                    {info.name}
                  </Link>
                </h2>
                <Link
                  href={`/blog/success-stories/${key}`}
                  className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  View all &rarr;
                </Link>
              </div>
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 font-medium">There are no success stories published in this category yet. Check back soon!</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
