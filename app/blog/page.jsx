import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getPosts, getCategories } from "../lib/blog/wordpress";
import { blogMetadata, BLOG_HOME_TITLE, BLOG_HOME_DESCRIPTION } from "../lib/blog/seo";
import BlogCard from "../components/Blog/BlogCard";
import FeaturedPost from "../components/Blog/FeaturedPost";
import CategoryBadge from "../components/Blog/CategoryBadge";

export const revalidate = 60; // ISR

export const metadata = blogMetadata({
  title: BLOG_HOME_TITLE,
  description: BLOG_HOME_DESCRIPTION,
  path: "",
});

export default async function BlogHome() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  const topCategories = [...categories]
    .filter((c) => c.count > 0)
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .slice(0, 10);

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7); // Show 6 recent posts

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50 to-white pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent z-10"></div>

        {/* Abstract background shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 font-medium text-sm mb-8 border border-primary-200 shadow">
              <BookOpen className="w-4 h-4" />
              <span>Accredian Education Blog</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
              Insights that drive{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">innovation</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
              Expert articles, tutorials, and career advice for all technology domains, including Data Science, Product Management, Business Analytics, and more.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/blog/articles"
                className="px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto text-center"
              >
                Read Latest Articles
              </Link>
              <Link
                href="#categories"
                className="px-8 py-3.5 bg-white text-gray-900 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow w-full sm:w-auto text-center"
              >
                Explore Topics
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 md:py-24 container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Featured Insight</h2>
          </div>
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      {/* Categories */}
      <section id="categories" className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Explore by Category</h2>
            <p className="text-gray-600">Find specialized content tailored to your career path and interests.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
            {topCategories.map((category) => (
              <CategoryBadge key={category.slug} name={category.name} slug={category.slug} count={category.count} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Latest Articles</h2>
            <p className="text-gray-600">Fresh perspectives from our industry experts.</p>
          </div>
          <Link
            href="/blog/articles"
            className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-gray-500 font-medium">No posts found. Please publish some posts in WordPress.</p>
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Link href="/blog/articles" className="inline-flex items-center gap-2 text-primary-600 font-semibold">
            View all articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
