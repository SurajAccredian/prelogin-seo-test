import Link from "next/link";
import { ChevronDown, ChevronRight, Menu, Search } from "lucide-react";
import { blogNavItems } from "../../lib/blog/nav";
import BlogNavKeys from "./BlogNavKeys";

// Port of the legacy blog Navbar navigation (same labels and dropdown tree), rendered on the server:
// every link is present in the HTML. Desktop menus open on :hover and :focus-within (keyboard / tap);
// below md the same tree is a nested <details> accordion. Class names are literal per depth so Tailwind
// can see them.
const GROUP = ["group/d0", "group/d1", "group/d2", "group/d3"];
const OPEN = [
  "group-hover/d0:block group-focus-within/d0:block",
  "group-hover/d1:block group-focus-within/d1:block",
  "group-hover/d2:block group-focus-within/d2:block",
  "group-hover/d3:block group-focus-within/d3:block",
];
const OPEN_BG = [
  "group-hover/d0:bg-primary-50 group-focus-within/d0:bg-primary-50",
  "group-hover/d1:bg-primary-50 group-focus-within/d1:bg-primary-50",
  "group-hover/d2:bg-primary-50 group-focus-within/d2:bg-primary-50",
  "group-hover/d3:bg-primary-50 group-focus-within/d3:bg-primary-50",
];
const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500";

function SubItem({ item, depth, align }) {
  if (!item.children) {
    return (
      <div className="px-1.5 w-full">
        <Link
          href={item.href}
          className={`block px-3.5 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors w-full text-left ${FOCUS}`}
        >
          {item.label}
        </Link>
      </div>
    );
  }

  return (
    <div className={`relative w-full px-1.5 ${GROUP[depth]}`}>
      <button
        type="button"
        className={`flex items-center justify-between w-full px-3.5 py-2.5 text-sm font-medium text-gray-700 rounded-lg transition-colors hover:text-primary-600 ${OPEN_BG[depth]} ${FOCUS}`}
      >
        <span>{item.label}</span>
        <ChevronRight className="w-4 h-4 opacity-50" />
      </button>
      <div className={`absolute top-[-8px] z-50 hidden ${align === "right" ? "right-full pr-2" : "left-full pl-2"} ${OPEN[depth]}`}>
        <div
          className={`bg-white border border-gray-100 shadow-2xl rounded-xl py-2 min-w-[240px] flex flex-col ${
            item.children.length > 8 ? "max-h-[420px] overflow-y-auto" : ""
          }`}
        >
          {item.children.map((child) => (
            <SubItem key={child.label} item={child} depth={depth + 1} align={align} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TopItem({ item, align }) {
  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={`text-sm font-semibold text-gray-700 hover:text-primary-600 transition-colors py-2 px-1 rounded ${FOCUS}`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className={`relative inline-block ${GROUP[0]}`}>
      <button
        type="button"
        aria-haspopup="true"
        className={`flex items-center gap-1 text-sm font-semibold text-gray-700 group-hover/d0:text-primary-600 group-focus-within/d0:text-primary-600 transition-colors py-2 px-1 rounded ${FOCUS}`}
      >
        {item.label}
        <ChevronDown className="w-4 h-4 ml-0.5 opacity-50" />
      </button>
      <div className={`absolute top-full z-40 hidden pt-2 ${align === "right" ? "right-0" : "left-0"} ${OPEN[0]}`}>
        <div className="bg-white border border-gray-100 shadow-2xl rounded-xl py-2 min-w-[240px] flex flex-col">
          {item.children.map((child) => (
            <SubItem key={child.label} item={child} depth={1} align={align} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileItem({ item }) {
  if (!item.children) {
    return (
      <Link href={item.href} className="block py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
        {item.label}
      </Link>
    );
  }

  return (
    <details className="group/m">
      <summary className="flex items-center justify-between w-full py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span>{item.label}</span>
        <ChevronDown className="w-5 h-5 opacity-50 transition-transform duration-200 group-open/m:rotate-180" />
      </summary>
      <div className="pl-4 mt-1 space-y-1 border-l-2 border-primary-100 ml-4">
        {item.children.map((child) => (
          <MobileItem key={child.label} item={child} />
        ))}
      </div>
    </details>
  );
}

export default function BlogNav() {
  const lastGroup = blogNavItems.length - 1;

  return (
    <BlogNavKeys className="sticky top-0 z-30">
      <nav aria-label="Blog" className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* md and up: dropdown bar */}
          <div className="hidden md:flex items-center justify-between h-12">
            <div className="flex items-center gap-6">
              {blogNavItems.map((item, index) => (
                <TopItem key={item.label} item={item} align={index === lastGroup ? "right" : "left"} />
              ))}
            </div>
            <Link
              href="/blog/search"
              aria-label="Search"
              className={`p-2 text-gray-500 hover:text-primary-600 bg-gray-50 hover:bg-primary-50 rounded-full transition-all ${FOCUS}`}
            >
              <Search className="w-5 h-5" />
            </Link>
          </div>

          {/* below md: compact accordion */}
          <div className="md:hidden flex items-start justify-between gap-3">
            <details className="group/menu flex-1">
              <summary className="flex items-center gap-2 h-12 cursor-pointer list-none text-sm font-semibold text-gray-700 [&::-webkit-details-marker]:hidden">
                <Menu className="w-5 h-5" /> Menu
              </summary>
              <div className="pb-4 space-y-1 max-h-[70vh] overflow-y-auto">
                {blogNavItems.map((item) => (
                  <MobileItem key={item.label} item={item} />
                ))}
              </div>
            </details>
            <Link
              href="/blog/search"
              aria-label="Search"
              className={`mt-1.5 p-2 text-gray-500 hover:text-primary-600 bg-gray-50 hover:bg-primary-50 rounded-full transition-all ${FOCUS}`}
            >
              <Search className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </nav>
    </BlogNavKeys>
  );
}
