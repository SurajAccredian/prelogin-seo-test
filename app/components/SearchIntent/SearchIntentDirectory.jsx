"use client";
import React, { useState, useEffect } from "react";
import SearchIntentCard from "./SearchIntentCard";
import { FiInbox, FiRotateCcw } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function SearchIntentDirectory({
  programs = [],
  groupByInstitution = false,
  institutions = [],
  shortlistedIds = [],
  onToggleShortlist,
  onOpenBrochure,
  setOpen,
  getProgramStatus,
  onResetFilters,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Detect mobile vs desktop view (< 768px is mobile / tablet portrait)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Collapse back whenever programs list changes (e.g. filter/search change)
  useEffect(() => {
    setIsExpanded(false);
  }, [programs]);

  if (!programs || programs.length === 0) {
    return (
      <div className="w-full bg-white rounded-2xl border border-dashed border-neutral-300 p-8 sm:p-12 text-center my-6 font-circular">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-100 text-neutral-400 mx-auto flex items-center justify-center mb-4">
          <FiInbox className="text-xl sm:text-2xl" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-neutral-800">No programs found</h3>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-md mx-auto">
          We couldn't find any programs matching your selected search or filter criteria.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-4 sm:mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-universal text-white text-xs font-bold hover:bg-darkBlue transition-colors shadow-sm cursor-pointer"
          >
            <FiRotateCcw className="text-xs" />
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  // 5 programs on mobile, 6 programs on desktop
  const initialLimit = isMobile ? 5 : 6;
  const hasMore = programs.length > initialLimit;
  const visiblePrograms = isExpanded ? programs : programs.slice(0, initialLimit);
  const additionalCount = Math.max(0, programs.length - initialLimit);

  const handleShowLess = () => {
    setIsExpanded(false);
    const directoryEl = document.getElementById("program-directory");
    if (directoryEl) {
      directoryEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="program-directory" className="w-full">
      {/* Responsive grid with active programs first */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 my-4 sm:my-6 font-circular">
        {visiblePrograms.map((program, index) => (
          <SearchIntentCard
            key={`${program.id}-${index}`}
            program={program}
            isShortlisted={shortlistedIds.includes(program.id)}
            onToggleShortlist={onToggleShortlist}
            onOpenBrochure={onOpenBrochure}
            setBrotureDownloadInfo={onOpenBrochure}
            setOpen={setOpen}
            getProgramStatus={getProgramStatus}
          />
        ))}
      </div>

      {/* View More / Show Less Button */}
      {hasMore && (
        <div className="flex justify-center items-center mt-6 sm:mt-8 pb-4">
          {!isExpanded ? (
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-universal hover:bg-darkBlue text-white text-sm sm:text-base font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>View More ({additionalCount})</span>
              <IoIosArrowDown className="text-base" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleShowLess}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 text-sm font-semibold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Show Less</span>
              <IoIosArrowUp className="text-base" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
