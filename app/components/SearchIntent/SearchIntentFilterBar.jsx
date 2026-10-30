"use client";
import React from "react";
import { FiSearch, FiRotateCcw, FiFilter } from "react-icons/fi";

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
  const hasActiveFilters = Boolean(
    searchQuery ||
    selectedDomain ||
    selectedInstitute ||
    selectedDuration ||
    selectedExperience
  );

  return (
    <div className="w-full bg-white rounded-md border border-neutral-200/90 p-3 shadow-md font-circular sticky top-[156px] md:top-[138px] z-20">
      {/* Filter Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
        {/* Search Input */}
        <div className="lg:col-span-2">
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

      {/* Meta Bar: Counts & Reset */}
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
  );
}
