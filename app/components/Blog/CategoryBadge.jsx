import Link from "next/link";

// An empty slug links to the article listing (the legacy site linked to "/category/", which redirected there).
export default function CategoryBadge({ name, slug, count }) {
  return (
    <Link
      href={slug ? `/blog/category/${slug}` : "/blog/articles"}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 font-medium hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 transition-all shadow group"
    >
      <span>{name}</span>
      {count !== undefined && (
        <span className="bg-gray-100 text-gray-500 py-0.5 px-2 rounded-full text-xs font-bold group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
          {count}
        </span>
      )}
    </Link>
  );
}
