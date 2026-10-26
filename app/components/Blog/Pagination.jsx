import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, basePath = "/blog/articles" }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12 w-full">
      {currentPage > 1 ? (
        <Link
          href={currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`}
          aria-label="Previous page"
          className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      ) : (
        <div className="p-2 rounded-full border border-gray-100 text-gray-300 cursor-not-allowed">
          <ChevronLeft className="w-5 h-5" />
        </div>
      )}

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;

        if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
          return (
            <Link
              key={page}
              href={page === 1 ? basePath : `${basePath}?page=${page}`}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all ${
                isActive ? "bg-primary-600 text-white shadow-md shadow-primary-600/20" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </Link>
          );
        }

        if (page === currentPage - 2 || page === currentPage + 2) {
          return (
            <span key={page} className="text-gray-400 px-1">
              ...
            </span>
          );
        }

        return null;
      })}

      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          aria-label="Next page"
          className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      ) : (
        <div className="p-2 rounded-full border border-gray-100 text-gray-300 cursor-not-allowed">
          <ChevronRight className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
