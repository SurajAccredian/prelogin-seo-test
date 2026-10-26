import Link from "next/link";

const ITEMS = [
  { label: "Home", href: "/blog" },
  { label: "Articles", href: "/blog/articles" },
  { label: "Success Stories", href: "/blog/success-stories" },
  { label: "Student Testimonial", href: "/blog/testimonials" },
  { label: "Spotlight", href: "/blog/spotlight" },
];

export default function BlogSubNav() {
  return (
    <nav aria-label="Blog" className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center gap-1 overflow-x-auto whitespace-nowrap py-2 text-sm font-medium text-gray-700">
          {ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-md px-3 py-2 hover:bg-primary-50 hover:text-primary-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/blog/search"
          className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700"
        >
          Search
        </Link>
      </div>
    </nav>
  );
}
