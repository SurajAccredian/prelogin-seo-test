import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { getPost, getPosts, getPostAuthorProfile, getLatestPostSlugs } from "../../lib/blog/wordpress";
import {
  fixWordPressUrls,
  prepareContentHtml,
  getMetaDescription,
  getMetaTitle,
  formatPostDate,
} from "../../lib/blog/utils";
import { blogMetadata } from "../../lib/blog/seo";
import { authorFromGraphQL, imageUrlFromGraphQL, postFromGraphQL, topicsFromGraphQL } from "../../lib/blog/schema";
import { blogPostGraph } from "../../lib/schema";
import { JsonLd } from "../../components/JsonLd";
import BlogCard from "../../components/Blog/BlogCard";

export const revalidate = 60;

// Only the 50 newest posts are prerendered at build; every other slug renders on first request
// and is then cached (ISR). dynamicParams stays at its default (true) for that reason.
export async function generateStaticParams() {
  const slugs = await getLatestPostSlugs(50);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const description = getMetaDescription(post.excerpt, post.content);
  const ogImage = post.featuredImage?.node?.sourceUrl ? [fixWordPressUrls(post.featuredImage.node.sourceUrl)] : [];
  const title = getMetaTitle(post.title);

  return blogMetadata({
    title,
    description,
    path: `/${slug}`,
    openGraph: {
      type: "article",
      title: `${post.title} | Accredian Blog`,
      publishedTime: post.date,
      authors: post.author?.node?.name ? [post.author.node.name] : undefined,
      ...(ogImage.length ? { images: ogImage } : {}),
    },
    twitter: {
      title: `${post.title} | Accredian Blog`,
      ...(ogImage.length ? { images: ogImage } : {}),
    },
  });
}

export default async function SingleBlogPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const [allPosts, authorProfile] = await Promise.all([getPosts(), getPostAuthorProfile(post.slug)]);
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const imageUrl = fixWordPressUrls(post.featuredImage?.node?.sourceUrl);
  const description = getMetaDescription(post.excerpt, post.content);
  const author = authorFromGraphQL(authorProfile);

  return (
    <article className="pb-24">
      <JsonLd
        data={blogPostGraph(postFromGraphQL(post, author), {
          imageUrl: imageUrlFromGraphQL(post),
          topics: topicsFromGraphQL(post),
          description,
        })}
      />
      {/* Blog Header */}
      <header className="pt-16 pb-12 md:pt-24 md:pb-16 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blog/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            {post.categories?.nodes?.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className="text-xs font-semibold text-primary-600 bg-primary-100 px-3 py-1.5 rounded-full hover:bg-primary-200 transition-colors uppercase tracking-wider"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-gray-200">
            <div className="flex items-center gap-4">
              {author && (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-blue-500 flex items-center justify-center text-white text-lg font-bold shadow-md">
                  {author.name.charAt(0)}
                </div>
              )}
              <div>
                {author && (
                  <Link
                    href={`/blog/author/${author.slug}`}
                    className="font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                  >
                    {author.name}
                  </Link>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatPostDate(post.date, true)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t sm:border-none border-gray-200 pt-4 sm:pt-0">
              <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share:
              </span>
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-800 transition-colors">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {imageUrl && (
        <div className="container mx-auto px-4 max-w-5xl -mt-8 relative z-10 mb-16">
          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gray-100">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`container mx-auto px-4 max-w-3xl ${!imageUrl ? "mt-16" : ""}`}>
        <div className="wp-content" dangerouslySetInnerHTML={{ __html: prepareContentHtml(post.content, post.title) }} />
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-50 py-16 md:py-24 border-t border-gray-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">More Articles to Read</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((rp) => (
                <BlogCard key={rp.slug} post={rp} />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
