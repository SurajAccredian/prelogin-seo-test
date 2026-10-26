import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Linkedin } from "lucide-react";
import { getAuthorProfile, getAuthorPosts, getAuthorSlugs } from "../../../lib/blog/wordpress";
import { formatPostDate } from "../../../lib/blog/utils";
import { blogMetadata } from "../../../lib/blog/seo";
import { authorFromGraphQL } from "../../../lib/blog/schema";
import { authorPageGraph } from "../../../lib/schema";
import { JsonLd } from "../../../components/JsonLd";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAuthorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = authorFromGraphQL(await getAuthorProfile(slug));
  if (!author) notFound();

  const description =
    author.bio?.replace(/<[^>]+>/g, "").trim() || `Articles by ${author.name} on the Accredian Blog.`;

  return blogMetadata({
    title: `${author.name} | Accredian Blog`,
    description,
    path: `/author/${slug}`,
  });
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const profile = await getAuthorProfile(slug);
  const author = authorFromGraphQL(profile);
  if (!profile || !author) notFound();

  const posts = profile.databaseId ? await getAuthorPosts(profile.databaseId) : [];

  return (
    <div className="pb-24">
      <JsonLd data={authorPageGraph(author)} />
      <header className="pt-16 pb-12 md:pt-24 md:pb-16 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blog/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {author.avatar ? (
              <Image
                src={author.avatar}
                alt={author.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover shadow-md"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                {author.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
                {author.name}
              </h1>
              {author.job_title && <p className="mt-2 text-lg text-gray-600">{author.job_title}</p>}
              {author.linkedin && (
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              )}
            </div>
          </div>

          {author.bio && (
            <div className="mt-8 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: author.bio }} />
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-3xl mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Articles by {author.name}</h2>
        {posts.length > 0 ? (
          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 py-5 group"
                >
                  <span className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {p.title}
                  </span>
                  {p.dateGmt && (
                    <span className="text-sm text-gray-500 shrink-0">{formatPostDate(p.dateGmt, true)}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No articles yet.</p>
        )}
      </div>
    </div>
  );
}
