import Image from "next/image";
import Link from "next/link";
import { fixWordPressUrls, formatPostDate } from "../../lib/blog/utils";

export default function BlogCard({ post }) {
  const imageUrl = fixWordPressUrls(post.featuredImage?.node?.sourceUrl);

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <Link href={`/blog/${post.slug}`} className="block relative h-56 w-full overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-400 font-medium">No Image Provided</span>
          </div>
        )}
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {post.categories?.nodes?.slice(0, 2).map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              className="text-xs font-semibold text-primary-700 bg-primary-50 px-3 py-1 rounded-full hover:bg-primary-100 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
        <Link href={`/blog/${post.slug}`} className="block group-hover:text-primary-600 transition-colors">
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">{post.title}</h2>
        </Link>
        <div
          className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-blue-400 flex items-center justify-center text-white text-xs font-bold shadow">
              {post.author?.node?.name?.charAt(0) || "A"}
            </div>
            <span className="text-sm font-medium text-gray-900">{post.author?.node?.name || "Author"}</span>
          </div>
          <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">{formatPostDate(post.date)}</span>
        </div>
      </div>
    </div>
  );
}
