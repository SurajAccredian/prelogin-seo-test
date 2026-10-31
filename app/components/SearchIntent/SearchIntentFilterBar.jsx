"use client";
import React, { useState } from "react";
import { FiSearch, FiRotateCcw, FiFilter, FiX } from "react-icons/fi";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";

export default function SearchIntentFilterBar({
  searchQuery = "",
  onSearchChange,
  selectedDomain = "",
  onDomainChange,
  domains = [],
  selectedInstitute = "",
  onInstituteChange,
  institutes = [],
  selectedDuration = "",
  onDurationChange,
  durations = [],
  selectedExperience = "",
  onExperienceChange,
  experienceLevels = [],
  onReset,
  totalCount = 0,
  shortlistCount = 0,
}) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const activeFacetCount =
    (selectedDomain ? 1 : 0) +
    (selectedInstitute ? 1 : 0) +
    (selectedDuration ? 1 : 0) +
    (selectedExperience ? 1 : 0);

  const hasActiveFilters = Boolean(searchQuery || activeFacetCount > 0);

  return (
    <div className="w-full bg-white rounded-xl border border-neutral-200/90 p-3 sm:p-4 shadow-sm font-circular relative lg:sticky lg:top-[138px] z-20">
      {/* =========================================================================
          MOBILE VIEW (< lg)
         ========================================================================= */}
      <div className="lg:hidden flex flex-col gap-2.5">
        {/* Mobile Search Bar */}
        <div>
          <label htmlFor="si-search-mobile" className="sr-only">
            Search Programs
          </label>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm pointer-events-none" />
            <input
              id="si-search-mobile"
              type="search"
              placeholder="Search by topic, university, skill..."
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full h-10 pl-9 pr-8 rounded-lg border border-neutral-300 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-universal focus:ring-1 focus:ring-universal transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange && onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5"
                aria-label="Clear search"
              >
                <FiX className="text-sm" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filter Toggle & Count Row */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                isMobileFilterOpen || activeFacetCount > 0
                  ? "bg-universal/10 border-universal/30 text-universal"
                  : "bg-neutral-50 border-neutral-300 text-neutral-700 hover:bg-neutral-100"
              }`}
              aria-expanded={isMobileFilterOpen}
            >
              <FiFilter className="text-xs" />
              <span>Filters</span>
              {activeFacetCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-universal text-white text-[10px] font-bold inline-flex items-center justify-center">
                  {activeFacetCount}
                </span>
              )}
              <IoIosArrowDown
                className={`text-xs transition-transform duration-200 ${
                  isMobileFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <span className="text-xs text-neutral-600 font-medium">
              <span className="font-bold text-neutral-900">{totalCount}</span> programs
            </span>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-universal font-semibold transition-colors"
            >
              <FiRotateCcw className="text-[11px]" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Mobile Active Filter Chips */}
        {activeFacetCount > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {selectedDomain && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-universal text-[11px] font-medium border border-blue-200">
                <span className="truncate max-w-[140px]">{selectedDomain}</span>
                <button
                  type="button"
                  onClick={() => onDomainChange && onDomainChange("")}
                  aria-label="Remove domain filter"
                >
                  <IoIosClose className="text-sm hover:text-darkBlue" />
                </button>
              </span>
            )}

            {selectedInstitute && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-universal text-[11px] font-medium border border-blue-200">
                <span className="truncate max-w-[140px]">{selectedInstitute}</span>
                <button
                  type="button"
                  onClick={() => onInstituteChange && onInstituteChange("")}
                  aria-label="Remove institute filter"
                >
                  <IoIosClose className="text-sm hover:text-darkBlue" />
                </button>
              </span>
            )}

            {selectedDuration && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-universal text-[11px] font-medium border border-blue-200">
                <span>{selectedDuration}</span>
                <button
                  type="button"
                  onClick={() => onDurationChange && onDurationChange("")}
                  aria-label="Remove duration filter"
                >
                  <IoIosClose className="text-sm hover:text-darkBlue" />
                </button>
              </span>
            )}

            {selectedExperience && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-universal text-[11px] font-medium border border-blue-200">
                <span>{selectedExperience}</span>
                <button
                  type="button"
                  onClick={() => onExperienceChange && onExperienceChange("")}
                  aria-label="Remove experience filter"
                >
                  <IoIosClose className="text-sm hover:text-darkBlue" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Collapsible Mobile Dropdowns */}
        {isMobileFilterOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2.5 mt-1 border-t border-neutral-100">
            {/* Domain */}
            <div>
              <label htmlFor="si-m-domain" className="block text-[11px] font-bold text-neutral-700 mb-1">
                Domain
              </label>
              <select
                id="si-m-domain"
                value={selectedDomain}
                onChange={(e) => onDomainChange && onDomainChange(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg border border-neutral-300 text-xs text-neutral-900 bg-white focus:outline-none focus:border-universal focus:ring-1 focus:ring-universal"
              >
                <option value="">All Domains</option>
                {domains.map((dom, idx) => (
                  <option key={idx} value={dom}>
                    {dom}
                  </option>
                ))}
              </select>
            </div>

            {/* Institution */}
            {institutes.length > 0 && (
              <div>
                <label htmlFor="si-m-inst" className="block text-[11px] font-bold text-neutral-700 mb-1">
                  Institution
                </label>
                <select
                  id="si-m-inst"
                  value={selectedInstitute}
                  onChange={(e) => onInstituteChange && onInstituteChange(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-lg border border-neutral-300 text-xs text-neutral-900 bg-white focus:outline-none focus:border-universal focus:ring-1 focus:ring-universal"
                >
                  <option value="">All Institutions</option>
                  {institutes.map((inst, idx) => (
                    <option key={idx} value={inst}>
                      {inst}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Duration */}
            <div>
              <label htmlFor="si-m-duration" className="block text-[11px] font-bold text-neutral-700 mb-1">
                Duration
              </label>
              <select
                id="si-m-duration"
                value={selectedDuration}
                onChange={(e) => onDurationChange && onDurationChange(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg border border-neutral-300 text-xs text-neutral-900 bg-white focus:outline-none focus:border-universal focus:ring-1 focus:ring-universal"
              >
                <option value="">Any Duration</option>
                {durations.map((dur, idx) => (
                  <option key={idx} value={dur}>
                    {dur}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label htmlFor="si-m-exp" className="block text-[11px] font-bold text-neutral-700 mb-1">
                Experience Level
              </label>
              <select
                id="si-m-exp"
                value={selectedExperience}
                onChange={(e) => onExperienceChange && onExperienceChange(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg border border-neutral-300 text-xs text-neutral-900 bg-white focus:outline-none focus:border-universal focus:ring-1 focus:ring-universal"
              >
                <option value="">Any Level</option>
                {experienceLevels.map((exp, idx) => (
                  <option key={idx} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(false)}
              className="sm:col-span-2 w-full mt-1 py-2 rounded-lg bg-universal text-white text-xs font-semibold hover:bg-darkBlue transition-colors"
            >
              Apply & Close
            </button>
          </div>
        )}
      </div>

      {/* =========================================================================
          DESKTOP VIEW (lg:)
         ========================================================================= */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-6 gap-3 items-end">
          {/* Search Input */}
          <div className="col-span-2">
            <label htmlFor="si-search" className="block text-xs font-bold text-neutral-800 mb-1">
              Search Programs
            </label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm pointer-events-none" />
              <input
                id="si-search"
                type="search"
                placeholder="e.g. Leadership, AI, CFO, IIM Lucknow"
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="w-full h-11 pl-9 pr-3 rounded-xl border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-universal focus:ring-1 focus:ring-universal transition-all"
              />
            </div>
          </div>

          {/* Domain Select */}
          <div>
            <label htmlFor="si-domain" className="block text-xs font-bold text-neutral-800 mb-1">
              Domain
            </label>
            <select
              id="si-domain"
              value={selectedDomain}
              onChange={(e) => onDomainChange && onDomainChange(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-neutral-300 text-sm text-neutral-900 bg-white focus:outline-none focus:border-universal focus:ring-1 focus:ring-universal transition-all"
            >
              <option value="">All Domains</option>
              {domains.map((dom, idx) => (
                <option key={idx} value={dom}>
                  {dom}
                </option>
              ))}
            </select>
          </div>

          {/* Institution Select */}
          {institutes.length > 0 && (
            <div>
              <label htmlFor="si-inst" className="block text-xs font-bold text-neutral-800 mb-1">
                Institution
              </label>
              <select
                id="si-inst"
                value={selectedInstitute}
                onChange={(e) => onInstituteChange && onInstituteChange(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-neutral-300 text-sm text-neutral-900 bg-white focus:outline-none focus:border-universal focus:ring-1 focus:ring-universal transition-all"
              >
                <option value="">All Institutions</option>
                {institutes.map((inst, idx) => (
                  <option key={idx} value={inst}>
                    {inst}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Duration Select */}
          <div>
            <label htmlFor="si-duration" className="block text-xs font-bold text-neutral-800 mb-1">
              Duration
            </label>
            <select
              id="si-duration"
              value={selectedDuration}
              onChange={(e) => onDurationChange && onDurationChange(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-neutral-300 text-sm text-neutral-900 bg-white focus:outline-none focus:border-universal focus:ring-1 focus:ring-universal transition-all"
            >
              <option value="">Any Duration</option>
              {durations.map((dur, idx) => (
                <option key={idx} value={dur}>
                  {dur}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Level Select */}
          <div>
            <label htmlFor="si-exp" className="block text-xs font-bold text-neutral-800 mb-1">
              Experience Level
            </label>
            <select
              id="si-exp"
              value={selectedExperience}
              onChange={(e) => onExperienceChange && onExperienceChange(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-neutral-300 text-sm text-neutral-900 bg-white focus:outline-none focus:border-universal focus:ring-1 focus:ring-universal transition-all"
            >
              <option value="">Any Level</option>
              {experienceLevels.map((exp, idx) => (
                <option key={idx} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop Meta Bar: Counts & Reset */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-600">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-neutral-900">
              Showing <span className="text-universal font-bold">{totalCount}</span> programs
            </span>
            {shortlistCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-universal/10 text-universal font-semibold">
                {shortlistCount} Shortlisted
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 hover:border-neutral-400 text-neutral-700 font-semibold hover:text-neutral-900 transition-colors"
            >
              <FiRotateCcw className="text-xs" />
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
