"use client";

import React, { useState, useRef, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, MoveUpRight, ArrowUpDown } from "lucide-react";
import PROGRAMS from "../../Assets/programs.json";
import { matchesProgramSearch } from "../../../helpers/programFilter.helpers";
import "./GlobalSearch.css";
import { SUGGESTED_FALLBACK_SEARCHES, TRENDING_SEARCHES } from "../../Assets/constants";

/**
 * Returns the correct detail page URL for a given program.
 */
const getProgramHref = (program) => {
  if (!program) return "/programs";
  const cat = program.category?.toLowerCase() || "";
  const isFree =
    cat === "free courses" ||
    cat === "microsoft" ||
    program.id === "transform-business-workflows-with-generative-ai" ||
    program.id === "transform-ideas-into-impact-with-product-management";

  return isFree ? `/free-courses/${program.id}` : `/programs/${program.id}`;
};


/**
 * Generates an acronym badge code for institutes (e.g. IIM-V, IIM-T, IIT-R).
 */
const getInstituteBadge = (name) => {
  if (!name) return "";
  const n = name.trim();
  if (n.includes("Visakhapatnam")) return "IIM-V";
  if (n.includes("Trichy") || n.includes("Tiruchirappalli")) return "IIM-T";
  if (n.includes("Lucknow")) return "IIM-L";
  if (n.includes("Ranchi")) return "IIM-R";
  if (n.includes("Kashipur")) return "IIM-K";
  if (n.includes("Amritsar")) return "IIM-A";
  if (n.includes("Roorkee")) return "IIT-R";
  if (n.includes("Kanpur")) return "IIT-K";
  if (n.includes("Jammu")) return "IIT-J";
  if (n.includes("Hyderabad")) return "IIT-H";
  if (n.includes("XLRI") || n.includes("Xavier")) return "XLRI";
  if (n.includes("SP Jain") || n.includes("SPJIMR") || n.includes("SPJ"))
    return "SPJ";

  // Fallback acronym
  const words = n.replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    return words
      .map((w) => w[0].toUpperCase())
      .slice(0, 4)
      .join("");
  }
  return n.slice(0, 4).toUpperCase();
};

function GlobalSearchInner({ className = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Extract query from URL if currently on /programs page
  const urlQ = useMemo(() => {
    if (pathname === "/programs" && searchParams) {
      return (searchParams.get("q") || "").trim();
    }
    return "";
  }, [pathname, searchParams]);

  const [query, setQuery] = useState(urlQ);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Sync input value whenever URL search param changes (e.g. navigation, clear chip)
  useEffect(() => {
    setQuery(urlQ);
  }, [urlQ]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Compute matching programs and institutes dynamically from programs.json
  const { matchingPrograms, matchingInstitutes, totalMatches } = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return { matchingPrograms: [], matchingInstitutes: [], totalMatches: 0 };
    }

    // 1. Filter matching programs
    const matchedProgs = PROGRAMS.filter((program) =>
      matchesProgramSearch(program, query)
    );

    // 2. Extract distinct matching institutes
    const instituteMap = new Map();

    // First check institutes whose name directly contains the query
    PROGRAMS.forEach((program) => {
      const univ = program.university_name?.trim();
      if (univ && univ.toLowerCase().includes(trimmed)) {
        if (!instituteMap.has(univ)) {
          instituteMap.set(univ, {
            name: univ,
            badge: getInstituteBadge(univ),
          });
        }
      }
    });

    // If no direct institute matches, include institutes from matched programs
    if (instituteMap.size === 0) {
      matchedProgs.slice(0, 4).forEach((program) => {
        const univ = program.university_name?.trim();
        if (univ && !instituteMap.has(univ)) {
          instituteMap.set(univ, {
            name: univ,
            badge: getInstituteBadge(univ),
          });
        }
      });
    }

    const matchedInsts = Array.from(instituteMap.values()).slice(0, 4);

    return {
      matchingPrograms: matchedProgs.slice(0, 5), // top 5 in dropdown
      matchingInstitutes: matchedInsts,
      totalMatches: matchedProgs.length,
    };
  }, [query]);

  // Combined flat list for keyboard navigation
  const flatNavItems = useMemo(() => {
    if (!query.trim()) return [];
    const items = [];
    matchingPrograms.forEach((p) => {
      items.push({ type: "program", data: p, href: getProgramHref(p) });
    });
    matchingInstitutes.forEach((inst) => {
      items.push({
        type: "institute",
        data: inst,
        href: `/programs?institute=${encodeURIComponent(inst.name)}`,
      });
    });
    return items;
  }, [query, matchingPrograms, matchingInstitutes]);

  const handleSearchSubmit = (searchVal) => {
    const term = (searchVal !== undefined ? searchVal : query).trim();
    if (!term) return;
    setIsOpen(false);
    setActiveIndex(-1);
    router.push(`/programs?q=${encodeURIComponent(term)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
      inputRef.current?.blur();
      return;
    }

    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < flatNavItems.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : flatNavItems.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < flatNavItems.length) {
        const selected = flatNavItems[activeIndex];
        setIsOpen(false);
        setActiveIndex(-1);
        router.push(selected.href);
      } else {
        handleSearchSubmit();
      }
    }
  };

  const handleSelectTrending = (item) => {
    const searchTerm = typeof item === "object" ? item.value : item;
    setQuery(searchTerm);
    setIsOpen(false);
    setActiveIndex(-1);
    router.push(`/programs?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleSelectInstitute = (instituteName) => {
    setIsOpen(false);
    setActiveIndex(-1);
    router.push(`/programs?institute=${encodeURIComponent(instituteName)}`);
  };

  return (
    <div
      ref={containerRef}
      className={`global-search-container max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] font-circular ${className}`}
    >
      {/* Search Input Bar */}
      <div className="global-search-input-wrapper rounded-md">
        <Search className="w-4 h-4 text-neutral-400 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Tell us what you're looking to learn..."
          className="global-search-input font-circular rounded-md"
          aria-label="Search accredited programs"
          autoComplete="off"
          spellCheck="false"
        />
        {query && (
          <button
            type="button"
            onClick={() => handleSearchSubmit()}
            className="global-search-btn"
            title="Search"
            aria-label="Submit search"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="global-search-dropdown">
          {/* STATE 1: Empty Query / Trending Searches */}
          {!query.trim() ? (
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Trending searches
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map((item, index) => {
                  const label = typeof item === "object" ? item.label : item;
                  return (
                    <button
                      key={`trending-${index}`}
                      type="button"
                      onClick={() => handleSelectTrending(item)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium transition-colors cursor-pointer"
                    >
                      <MoveUpRight className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* STATE 2: Search Results */
            <div>
              {totalMatches > 0 || matchingInstitutes.length > 0 ? (
                <div>
                  <div className="max-h-[380px] overflow-y-auto global-search-scrollbar py-2">
                    {/* PROGRAMMES SECTION */}
                    {matchingPrograms.length > 0 && (
                      <div className="mb-2">
                        <div className="px-4 py-1.5">
                          <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                            Programmes
                          </h3>
                        </div>
                        <div className="flex flex-col">
                          {matchingPrograms.map((program, idx) => {
                            const isSelected = activeIndex === idx;
                            return (
                              <Link
                                key={`prog-${program.id}-${idx}`}
                                href={getProgramHref(program)}
                                onClick={() => {
                                  setIsOpen(false);
                                  setActiveIndex(-1);
                                }}
                                className={`px-4 py-2.5 transition-colors flex flex-col gap-0.5 border-b border-neutral-100/70 last:border-none group ${
                                  isSelected
                                    ? "global-search-item-active"
                                    : "hover:bg-blue-50/50"
                                }`}
                              >
                                <h4 className="text-[13px] font-semibold text-neutral-900 leading-snug group-hover:text-[#1a73e8] line-clamp-2">
                                  {program.program_name}
                                </h4>
                                <p className="text-[12px] text-neutral-500 flex items-center gap-1 font-normal">
                                  <span>{program.university_name}</span>
                                  {program.duration && (
                                    <>
                                      <span className="text-neutral-300">•</span>
                                      <span>{program.duration}</span>
                                    </>
                                  )}
                                </p>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* INSTITUTES SECTION */}
                    {matchingInstitutes.length > 0 && (
                      <div className="pt-1 pb-2">
                        <div className="px-4 py-1.5">
                          <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                            Institutes
                          </h3>
                        </div>
                        <div className="px-4 flex flex-wrap gap-2 pt-1">
                          {matchingInstitutes.map((inst, idx) => {
                            const globalInstIndex =
                              matchingPrograms.length + idx;
                            const isSelected = activeIndex === globalInstIndex;
                            return (
                              <button
                                key={`inst-${inst.name}-${idx}`}
                                type="button"
                                onClick={() => handleSelectInstitute(inst.name)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-colors cursor-pointer ${
                                  isSelected
                                    ? "bg-blue-50 border-[#1a73e8] text-[#1a73e8]"
                                    : "border-neutral-200 bg-white hover:border-blue-300 hover:bg-blue-50/40 text-neutral-800"
                                }`}
                              >
                                {inst.badge && (
                                  <span className="institute-badge">
                                    {inst.badge}
                                  </span>
                                )}
                                <span className="text-nowrap">{inst.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dropdown Footer */}
                  <div className="px-4 py-2.5 bg-neutral-50/90 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                    <button
                      type="button"
                      onClick={() => handleSearchSubmit()}
                      className="font-medium hover:text-[#1a73e8] transition-colors text-start cursor-pointer"
                    >
                      {totalMatches} result{totalMatches === 1 ? "" : "s"}  found
                      for &ldquo;{query}&rdquo;
                    </button>
                    <div className="hidden sm:flex items-center gap-1 text-neutral-400 text-[11px]">
                      <ArrowUpDown className="w-3 h-3" />
                      <span>to navigate</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* STATE 3: No Results Found */
                <div className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-9 h-9 rounded-md bg-neutral-100 flex items-center justify-center mb-2">
                    <Search className="w-4 h-4 text-neutral-400" />
                  </div>
                  <h4 className="text-sm font-semibold text-neutral-800">
                    No results found
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1 max-w-[280px]">
                    We couldn&apos;t find matches for &ldquo;{query}&rdquo;. Try
                    exploring these topics:
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                    {SUGGESTED_FALLBACK_SEARCHES.map((item, idx) => (
                      <button
                        key={`fallback-${idx}`}
                        type="button"
                        onClick={() => handleSelectTrending(item)}
                        className="px-3 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-[#1a73e8] text-xs font-medium transition-colors cursor-pointer"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function GlobalSearch(props) {
  return (
    <Suspense fallback={null}>
      <GlobalSearchInner {...props} />
    </Suspense>
  );
}

