/**
 * Program filter helpers for /programs catalog
 */

// Priority ordering for Area of Interest categories (Free Courses and PG Diploma at the top)
export const CATEGORY_PRIORITY = {
  "free courses": 1,
  "pg diploma": 2,
  "cxo leadership": 3,
  "senior management": 4,
  "artificial intelligence": 5,
  "strategy & leadership": 6,
  "general management": 7,
  "business management": 8,
  "project management": 9,
  "product management": 10,
  "design thinking": 11,
  "human resource": 12,
  "finance": 13,
  "microsoft": 14,
};

// Priority ordering for Institutes filter options
export const INSTITUTE_PRIORITY = {
  "iim lucknow": 1,
  "iim visakhapatnam": 2,
  "iim tiruchirappalli": 3,
  "iim ranchi": 4,
  "sp jain school of global management": 5,
  "accredian": 999,
};

export const getInstitutePriority = (name) => {
  if (!name) return 50;
  return INSTITUTE_PRIORITY[name.toLowerCase().trim()] ?? 50;
};


// Non-skill metadata tags that should not appear under Skills
export const NON_SKILL_TAGS = new Set([ "online", "instructor led", "new launch", "new", "best selling", "free course",]);

// Fixed options for Duration and Career Level
export const DURATION_OPTIONS = [
  "Upto 4 months",
  "4–6 Months",
  "6–9 Months",
  "9–12 Months",
];

export const CAREER_LEVEL_OPTIONS = [
  "0–2 years",
  "2–5 years",
  "5–8 years",
  "8+ years",
];

/**
 * Parses program duration string into a number representing months.
 * Handles "X Months", "X Hours", etc.
 */
export const parseDurationMonths = (durationStr) => {
  if (!durationStr) return 0;
  const matchMonths = durationStr.match(/(\d+(\.\d+)?)\s*month/i);
  if (matchMonths) return parseFloat(matchMonths[1]);
  const matchHours = durationStr.match(/(\d+(\.\d+)?)\s*hour/i);
  if (matchHours) return parseFloat(matchHours[1]) / (30 * 24);
  return 0;
};

/**
 * Returns required years of experience dynamically from program object.
 */
export const getProgramExperience = (program) => {
  if (!program) return 0;
  if (typeof program.required_years_experience === "number") {
    return program.required_years_experience;
  }
  return 0;
};

/**
 * Formats display labels for filter options.
 */
export const formatFilterLabel = (groupTitle, value) => {
  if (!value) return "";

  // Generic Title Case
  return value
    .split(" ")
    .map((w) => (w.length > 0 ? w.charAt(0).toUpperCase() + w.slice(1) : ""))
    .join(" ");
};

/**
 * Checks if a program matches selected Area of Interest filters.
 */
export const matchesAreaOfInterest = (program, selectedInterests) => {
  if (!selectedInterests || selectedInterests.length === 0) return true;
  const programCat = program?.category?.toLowerCase().trim() || "";
  return selectedInterests.some(
    (interest) => interest.toLowerCase().trim() === programCat
  );
};

/**
 * Checks if a program matches selected Skills filters.
 */
export const matchesSkills = (program, selectedSkills) => {
  if (!selectedSkills || selectedSkills.length === 0) return true;
  const programTags = (program?.tags || []).map((t) => t.toLowerCase().trim());
  return selectedSkills.some((skill) =>
    programTags.includes(skill.toLowerCase().trim())
  );
};

/**
 * Checks if a program matches selected Duration filters.
 *
 * Rules:
 * - "Upto 4 months": duration <= 4
 * - "4–6 Months": duration >= 4 && duration <= 6
 * - "6–9 Months": duration >= 6 && duration <= 9
 * - "9–12 Months": duration >= 9 && duration <= 12
 */
export const matchesDuration = (program, selectedDurations) => {
  if (!selectedDurations || selectedDurations.length === 0) return true;
  const months = parseDurationMonths(program?.duration);

  return selectedDurations.some((bucket) => {
    const bLower = bucket.toLowerCase();
    if (bLower.includes("upto 4") || bLower.includes("up to 4")) {
      return months <= 4;
    }
    if (bLower.includes("4–6") || bLower.includes("4-6")) {
      return months >= 4 && months <= 6;
    }
    if (bLower.includes("6–9") || bLower.includes("6-9")) {
      return months >= 6 && months <= 9;
    }
    if (bLower.includes("9–12") || bLower.includes("9-12")) {
      return months >= 9 && months <= 12;
    }
    return false;
  });
};

/**
 * Checks if a program matches selected Institute filters.
 */
export const matchesInstitute = (program, selectedInstitutes) => {
  if (!selectedInstitutes || selectedInstitutes.length === 0) return true;
  const univ = program?.university_name?.trim() || "";
  return selectedInstitutes.some(
    (institute) => institute.toLowerCase().trim() === univ.toLowerCase()
  );
};

/**
 * Checks if a program matches selected Career Level filters dynamically
 * based on the program's required_years_experience.
 *
 * Buckets:
 * - "0–2 years": 0 <= exp < 2
 * - "2–5 years": 2 <= exp < 5
 * - "5–8 years": 5 <= exp < 8
 * - "8+ years": exp >= 8
 */
export const matchesCareerLevel = (program, selectedCareerLevels) => {
  if (!selectedCareerLevels || selectedCareerLevels.length === 0) return true;
  const exp = getProgramExperience(program);

  return selectedCareerLevels.some((level) => {
    const lLower = level.toLowerCase();
    if (lLower.includes("0–2") || lLower.includes("0-2")) {
      return exp >= 0 && exp < 2;
    }
    if (lLower.includes("2–5") || lLower.includes("2-5")) {
      return exp >= 2 && exp < 5;
    }
    if (lLower.includes("5–8") || lLower.includes("5-8")) {
      return exp >= 5 && exp < 8;
    }
    if (lLower.includes("8+")) {
      return exp >= 8;
    }
    return false;
  });
};

/**
 * Checks whether a program matches a given search query against its name, university, category, tags, and id.
 */
export const matchesProgramSearch = (program, searchQuery) => {
  if (!searchQuery || !searchQuery.trim()) return true;
  const q = searchQuery.toLowerCase().trim();

  const pName = program?.program_name?.toLowerCase() || "";
  const uName = program?.university_name?.toLowerCase() || "";
  const cat = program?.category?.toLowerCase() || "";
  const pId = program?.id?.toLowerCase() || "";
  const tags = (program?.tags || []).map((t) => t.toLowerCase());

  // Direct substring match on any program field
  if (
    pName.includes(q) ||
    uName.includes(q) ||
    cat.includes(q) ||
    pId.includes(q) ||
    tags.some((t) => t.includes(q))
  ) {
    return true;
  }

  // Multi-term support (e.g. if user types words separated by space or &)
  const cleanQ = q.replace(/[&,+\-/]/g, " ").trim();
  if (cleanQ !== q) {
    const terms = cleanQ
      .split(/\s+/)
      .filter(
        (t) =>
          t.length > 1 &&
          !["and", "with", "for", "the", "in", "of"].includes(t)
      );
    if (terms.length > 0) {
      const allText = `${pName} ${uName} ${cat} ${pId} ${tags.join(" ")}`;
      return terms.some((term) => allText.includes(term));
    }
  }

  return false;
};

/**
 * Filters programs array across all 5 filter groups simultaneously.
 * (OR within each group, AND between different groups).
 */
export const filterPrograms = (programs, filters = {}) => {
  const {
    interests = [],
    skills = [],
    durations = [],
    institutes = [],
    careerLevels = [],
    searchQuery = "",
  } = filters;

  return programs.filter((program) => {
    const matchesInterest = matchesAreaOfInterest(program, interests);
    const matchesSkill = matchesSkills(program, skills);
    const matchesDur = matchesDuration(program, durations);
    const matchesInst = matchesInstitute(program, institutes);
    const matchesLevel = matchesCareerLevel(program, careerLevels);
    const matchesSearch = matchesProgramSearch(program, searchQuery);

    return (
      matchesInterest &&
      matchesSkill &&
      matchesDur &&
      matchesInst &&
      matchesLevel &&
      matchesSearch
    );
  });
};

/**
 * Extracts distinct sorted filter options from program catalog data.
 */
export const getAvailableFilterOptions = (programs) => {
  // 1. Area of Interest (sorted by priority)
  const rawCategories = [
    ...new Set(programs.map((p) => p.category?.toLowerCase().trim()).filter(Boolean)),
  ];
  const sortedCategories = [...rawCategories].sort((a, b) => {
    const orderA = CATEGORY_PRIORITY[a] !== undefined ? CATEGORY_PRIORITY[a] : 99;
    const orderB = CATEGORY_PRIORITY[b] !== undefined ? CATEGORY_PRIORITY[b] : 99;
    if (orderA !== orderB) return orderA - orderB;
    return a.localeCompare(b);
  });

  // 2. Cleaned Skills
  const allTags = [...new Set(programs.flatMap((p) => p.tags || []))];
  const cleanedSkills = allTags
    .filter((tag) => tag && !NON_SKILL_TAGS.has(tag.trim().toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  // 3. Duration Options
  const durationOptions = [...DURATION_OPTIONS];

  // 4. Institutes (sorted by priority order)
  const rawInstitutes = [
    ...new Set(programs.map((p) => p.university_name?.trim()).filter(Boolean)),
  ];
  const sortedInstitutes = [...rawInstitutes].sort((a, b) => {
    const orderA = getInstitutePriority(a);
    const orderB = getInstitutePriority(b);
    if (orderA !== orderB) return orderA - orderB;
    return a.localeCompare(b);
  });

  // 5. Career Level Options
  const careerLevelOptions = [...CAREER_LEVEL_OPTIONS];

  return {
    categories: sortedCategories,
    skills: cleanedSkills,
    durations: durationOptions,
    institutes: sortedInstitutes,
    careerLevels: careerLevelOptions,
  };
};
