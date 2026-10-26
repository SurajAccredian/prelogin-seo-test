import Image from "next/image";
import Link from "next/link";
import { fixWordPressUrls, formatPostDate } from "../../lib/blog/utils";

export default function FeaturedPost({ post }) {
  if (!post) return null;
  const imageUrl = fixWordPressUrls(post.featuredImage?.node?.sourceUrl);

  return (
    <div className="group relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 border border-gray-800 flex flex-col md:flex-row min-h-[400px]">
      <div className="absolute inset-0 z-0 md:w-1/2">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover opacity-80 md:opacity-100 transition-transform duration-700 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-gray-800 to-gray-900" />
        )}
      </div>
      {/* Gradient overlay for text readability on mobile, fades on desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 md:bg-gradient-to-r md:from-transparent md:via-gray-900/50 md:to-gray-900 z-10" />

      <div className="relative z-20 flex flex-col justify-end md:justify-center p-8 md:p-12 md:w-1/2 md:ml-auto md:bg-gray-900/90 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-md">
            Featured
          </span>
          {post.categories?.nodes?.slice(0, 1).map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              className="text-xs font-medium text-gray-300 hover:text-white transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 line-clamp-3 leading-tight group-hover:text-primary-400 transition-colors">
            {post.title}
          </h2>
        </Link>

        <div
          className="text-gray-300 mb-8 line-clamp-3 md:line-clamp-4 text-sm md:text-base leading-relaxed hidden md:block"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
              {post.author?.node?.name?.charAt(0) || "A"}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{post.author?.node?.name || "Author"}</p>
              <p className="text-xs text-gray-400">{formatPostDate(post.date)}</p>
            </div>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="hidden md:flex items-center gap-2 text-primary-400 hover:text-white font-medium text-sm transition-colors"
          >
            Read Article &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
