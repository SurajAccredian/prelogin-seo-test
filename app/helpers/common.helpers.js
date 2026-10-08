// common.helpers.ts
import { parseDurationMonths } from "./programFilter.helpers.js";

export const groupProgramsByCategory = (
  programs,
) => {
  return programs.reduce((acc, program) => {
    const { category } = program;
    if (!acc[category.toLowerCase()]) {
      acc[category.toLowerCase()] = [];
    }
    acc[category.toLowerCase()].push(program);
    return acc;
  }, {});
};

export const sortVerticalProgramsByStatus = (
  programsData,
) => {
  const statusPriority = {
    "New Launch": 1,
    "Best Selling": 2,
    "admission closed": 4,
  };
  Object.values(programsData).forEach((programs) =>
    programs.sort(
      (a, b) =>
        (statusPriority[a.status] || 3) - (statusPriority[b.status] || 3),
    ),
  );
  return programsData;
};


// Calculates search match quality for relevance ranking
export const getSearchRelevanceScore = (program, searchQuery) => {
  if (!searchQuery || !searchQuery.trim()) return 0;
  const q = searchQuery.toLowerCase().trim();
  const name = program?.program_name?.toLowerCase() || "";
  const cat = program?.category?.toLowerCase() || "";
  const uni = program?.university_name?.toLowerCase() || "";
  const tags = (program?.tags || []).map((t) => t.toLowerCase());

  // Exact program name match
  if (name === q) return 100;
  if (name.startsWith(q)) return 80;

  // Word boundary match in program name (e.g. searching "HR", "AI", "MBA")
  const words = name.split(/[\s,–—\-_/:]+/);
  if (words.some((w) => w === q)) return 75;
  if (name.includes(q)) return 60;

  // Category match
  if (cat === q) return 50;
  if (cat.includes(q)) return 40;

  // Tag match
  if (tags.some((t) => t === q)) return 35;
  if (tags.some((t) => t.includes(q))) return 25;

  // University match
  if (uni.includes(q)) return 15;

  return 1;
};

export const sortPrograms = (
  programs,
  getProgramStatus,
  sortBy = "relevance",
  searchQuery = ""
) => {
  const priority = {
    "new launch": 1,
    "best selling": 2,
    "admission closed": 4,
  };

  return programs.sort((a, b) => {
    const resolvedA = getProgramStatus ? getProgramStatus(a) : null;
    const resolvedB = getProgramStatus ? getProgramStatus(b) : null;

    const statusA = (resolvedA?.status || a.status || "").toLowerCase().trim();
    const statusB = (resolvedB?.status || b.status || "").toLowerCase().trim();

    const prioA = resolvedA?.isAdmissionClosed ? 4 : (priority[statusA] || 3);
    const prioB = resolvedB?.isAdmissionClosed ? 4 : (priority[statusB] || 3);

    // Duration: Shortest to Longest
    if (sortBy === "duration_asc") {
      const durA = parseDurationMonths(a.duration);
      const durB = parseDurationMonths(b.duration);
      if (durA !== durB) {
        return durA - durB;
      }
      return prioA - prioB;
    }

    // Duration: Longest to Shortest
    if (sortBy === "duration_desc") {
      const durA = parseDurationMonths(a.duration);
      const durB = parseDurationMonths(b.duration);
      if (durA !== durB) {
        return durB - durA;
      }
      return prioA - prioB;
    }

    // Default: Relevance
    const isClosedA = resolvedA?.isAdmissionClosed || prioA === 4;
    const isClosedB = resolvedB?.isAdmissionClosed || prioB === 4;

    // Active programs first, closed programs lower down
    if (isClosedA !== isClosedB) {
      return isClosedA ? 1 : -1;
    }

    // When searching, prioritize search match quality
    if (searchQuery && searchQuery.trim()) {
      const scoreA = getSearchRelevanceScore(a, searchQuery);
      const scoreB = getSearchRelevanceScore(b, searchQuery);
      if (scoreA !== scoreB) {
        return scoreB - scoreA;
      }
    }

    // Business priority (New Launch 1 -> Best Selling 2 -> Other 3 -> Closed 4)
    if (prioA !== prioB) {
      return prioA - prioB;
    }

    return 0;
  });
};


