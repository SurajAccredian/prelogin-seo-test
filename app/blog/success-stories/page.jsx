import Link from "next/link";
import { ArrowLeft, Award } from "lucide-react";
import { getCategoryPosts } from "../../lib/blog/wordpress";
import { successStoriesMap } from "../../lib/blog/constants";
import { blogMetadata } from "../../lib/blog/seo";
import { blogBreadcrumbGraph } from "../../lib/blog/schema";
import { JsonLd } from "../../components/JsonLd";
import BlogCard from "../../components/Blog/BlogCard";

export const revalidate = 3600;

const POSTS_PER_SECTION = 3;

// Titled differently from the main site's /successstories (video testimonials and placement outcomes):
// this page is the blog's alumni career-transition articles.
export const metadata = blogMetadata({
  title: "Alumni Career Transition Articles | Accredian Blog",
  description: "Articles on how Accredian alumni moved into data science and product management roles.",
  path: "/success-stories",
});

// Crawlable index (the legacy page was a "coming soon" placeholder): links to each child page and shows its
// newest stories.
export default async function SuccessStoriesIndex() {
  const sections = await Promise.all(
    Object.entries(successStoriesMap).map(async ([key, info]) => ({
      key,
      info,
      posts: (await getCategoryPosts(info.slug)).slice(0, POSTS_PER_SECTION),
    }))
  );

  return (
    <div className="py-16 md:py-24">
      <JsonLd data={blogBreadcrumbGraph("/success-stories", [["Alumni Career Transition Articles", "/success-stories"]])} />
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
              Alumni Career Transition Articles
            </span>
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Looking for alumni testimonials? See{" "}
            <Link href="/successstories" className="text-primary-600 underline underline-offset-4 hover:text-primary-700">
              Success Stories on Accredian
            </Link>
            .
          </p>
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
