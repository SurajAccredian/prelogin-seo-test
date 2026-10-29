import Link from "next/link";
import { ArrowLeft, Quote } from "lucide-react";
import { getCategoryPosts } from "../../lib/blog/wordpress";
import { blogMetadata } from "../../lib/blog/seo";
import { blogBreadcrumbGraph } from "../../lib/blog/schema";
import { JsonLd } from "../../components/JsonLd";
import BlogCard from "../../components/Blog/BlogCard";

export const revalidate = 3600;

export const metadata = blogMetadata({
  title: "Student Testimonials | Accredian Blog",
  description: "Hear from our students about their journey with Accredian.",
  path: "/testimonials",
});

// WordPress category slugs the testimonials may live under, tried in order (as in the legacy site).
const TESTIMONIAL_SLUGS = ["student-testimonial", "student_testimonial", "student-testimonials"];

export default async function TestimonialsPage() {
  let posts = [];
  for (const slug of TESTIMONIAL_SLUGS) {
    posts = await getCategoryPosts(slug);
    if (posts.length > 0) break;
  }

  return (
    <div className="py-16 md:py-24">
      <JsonLd data={blogBreadcrumbGraph("/testimonials", [["Student Testimonials", "/testimonials"]])} />
      <div className="container mx-auto px-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-xl mb-6">
            <Quote className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Student{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Testimonials</span>
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            {posts.length} {posts.length === 1 ? "testimonial" : "testimonials"} found.
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
            <h3 className="text-2xl font-bold mb-4 text-gray-900">No testimonials found</h3>
            <p className="text-gray-500 font-medium">
              There are currently no Student Testimonial posts published yet. Please double check that your posts are assigned to a category named exactly `Student Testimonial` and check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
