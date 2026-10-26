import { ChevronLeft, ChevronRight } from "lucide-react";
import { pagePath } from "../../lib/blog/utils";

const WINDOW = 2; // pages shown either side of the current one

// Plain <a> links (no client JS, no prefetch storm across ~124 pages): crawlers and users get real URLs.
// pathBased: /base, /base/page/2, ...   otherwise: /base, /base?page=2, ... (spotlight keeps ?page=).
export default function Pagination({ currentPage, totalPages, basePath, pathBased = true }) {
  if (totalPages <= 1) return null;

  const hrefFor = (page) =>
    pathBased ? pagePath(basePath, page) : page <= 1 ? basePath : `${basePath}?page=${page}`;

  const items = [];
  for (let page = 1; page <= totalPages; page++) {
    const inWindow = Math.abs(page - currentPage) <= WINDOW;
    if (page === 1 || page === totalPages || inWindow) {
      items.push(page);
    } else if (items[items.length - 1] !== "gap") {
      items.push("gap");
    }
  }

  return (
    <nav aria-label="Pagination" className="flex justify-center items-center gap-2 mt-12 w-full flex-wrap">
      {currentPage > 1 ? (
        <a
          href={hrefFor(currentPage - 1)}
          rel="prev"
          aria-label="Previous page"
          className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </a>
      ) : (
        <span className="p-2 rounded-full border border-gray-100 text-gray-300 cursor-not-allowed" aria-hidden="true">
          <ChevronLeft className="w-5 h-5" />
        </span>
      )}

      {items.map((item, i) =>
        item === "gap" ? (
          <span key={`gap-${i}`} className="text-gray-400 px-1">
            ...
          </span>
        ) : (
          <a
            key={item}
            href={hrefFor(item)}
            aria-current={item === currentPage ? "page" : undefined}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all ${
              item === currentPage ? "bg-primary-600 text-white shadow-md shadow-primary-600/20" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item}
          </a>
        )
      )}

      {currentPage < totalPages ? (
        <a
          href={hrefFor(currentPage + 1)}
          rel="next"
          aria-label="Next page"
          className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </a>
      ) : (
        <span className="p-2 rounded-full border border-gray-100 text-gray-300 cursor-not-allowed" aria-hidden="true">
          <ChevronRight className="w-5 h-5" />
        </span>
      )}
    </nav>
  );
}
