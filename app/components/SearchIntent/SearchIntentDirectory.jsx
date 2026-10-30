"use client";
import React from "react";
import SearchIntentCard from "./SearchIntentCard";
import { FiInbox, FiRotateCcw } from "react-icons/fi";

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
  if (!programs || programs.length === 0) {
    return (
      <div className="w-full bg-white rounded-2xl border border-dashed border-neutral-300 p-12 text-center my-8 font-circular">
        <div className="w-14 h-14 rounded-full bg-neutral-100 text-neutral-400 mx-auto flex items-center justify-center mb-4">
          <FiInbox className="text-2xl" />
        </div>
        <h3 className="text-lg font-bold text-neutral-800">No programs found</h3>
        <p className="text-sm text-neutral-500 mt-1 max-w-md mx-auto">
          We couldn't find any programs matching your selected search or filter criteria.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-universal text-white text-xs font-bold hover:bg-darkBlue transition-colors shadow-sm"
          >
            <FiRotateCcw className="text-xs" />
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  // Jumbled flat grid with active programs first, identical to the programs page layout
  return (
    <div className="w-full grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 py-4 my-6 font-circular justify-items-center">
      {programs.map((program, index) => (
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
  );
}
