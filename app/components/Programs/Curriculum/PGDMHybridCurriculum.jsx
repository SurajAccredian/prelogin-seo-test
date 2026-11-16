import React, { useState, useEffect, useMemo } from "react";

const ChevronIcon = ({ className = "" }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const PGDMHybridCurriculum = ({
  curriculum,
  openAll,
  setOpenAll,
  data,
}) => {
  // Normalize curriculum to structured list of years & semesters
  const years = useMemo(() => {
    if (!curriculum) return [];

    const getSemBlocks = (sem) => {
      const blocks = [];

      if (sem.foundationCourses?.courses?.length > 0) {
        blocks.push({
          key: "foundationCourses",
          label: sem.foundationCourses.title || "Foundation Courses",
          rule: sem.foundationCourses.selectionRule || "All required",
          meta: `${sem.foundationCourses.subtotalCredits || 3} credits`,
          courses: sem.foundationCourses.courses,
        });
      }

      if (sem.coreCourses?.courses?.length > 0) {
        blocks.push({
          key: "coreCourses",
          label: sem.coreCourses.title || "Core Courses",
          rule: sem.coreCourses.selectionRule || "All required",
          meta: `${sem.coreCourses.subtotalCredits} credits`,
          courses: sem.coreCourses.courses,
        });
      }

      if (sem.openElectives?.courses?.length > 0) {
        blocks.push({
          key: "openElectives",
          label: sem.openElectives.title || "Open Electives",
          rule: sem.openElectives.selectionRule || "Choose any 1",
          meta: `Pick 1 · ${sem.openElectives.requiredCredits || 2} credits`,
          courses: sem.openElectives.courses,
        });
      }

      if (sem.limitedA?.courses?.length > 0) {
        blocks.push({
          key: "limitedA",
          label: sem.limitedA.title || "Limited Elective A",
          rule: sem.limitedA.selectionRule || "Choose either A or B",
          meta: `Pick A or B · ${sem.limitedA.subtotalCredits || 6} credits`,
          courses: sem.limitedA.courses,
        });
      }

      if (sem.limitedB?.courses?.length > 0) {
        blocks.push({
          key: "limitedB",
          label: sem.limitedB.title || "Limited Elective B",
          rule: sem.limitedB.selectionRule || "Choose either A or B",
          meta: `Pick A or B · ${sem.limitedB.subtotalCredits || 6} credits`,
          courses: sem.limitedB.courses,
        });
      }

      return blocks;
    };

    const normalizeSem = (semObj, fallbackName, sIdx) => {
      const id = semObj.id || `S${sIdx + 1}`;
      const name = semObj.name || semObj.title || fallbackName;
      const totalCredits = semObj.totalCredits || semObj.total || 0;
      const totalHours = semObj.totalHours || semObj.total_hours || semObj.totalHrs || 0;
      const blocks = getSemBlocks(semObj);
      const masterClass = semObj.masterClass || null;

      return {
        id,
        name,
        totalCredits,
        totalHours,
        blocks,
        masterClass,
        raw: semObj,
      };
    };

    if (Array.isArray(curriculum)) {
      return curriculum.map((y, yIdx) => {
        const rawSems = Array.isArray(y.semesters)
          ? y.semesters
          : Object.entries(y.semesters || {}).map(([sKey, sVal]) => ({
            ...sVal,
            name: sVal.title || sVal.name || sKey,
          }));

        return {
          id: `year-${yIdx + 1}`,
          year: y.year || `Year ${yIdx + 1}`,
          title: y.title || y.year || `Year ${yIdx + 1}`,
          subtitle: y.subtitle || "",
          totalCredits: y.totalCredits,
          semesters: rawSems.map((s, sIdx) =>
            normalizeSem(s, s.name || `Semester ${sIdx + 1}`, sIdx)
          ),
        };
      });
    }

    return Object.entries(curriculum).map(([yearKey, yVal], yIdx) => {
      const rawSems = Array.isArray(yVal.semesters)
        ? yVal.semesters
        : Object.entries(yVal.semesters || {}).map(([sKey, sVal]) => ({
          ...sVal,
          name: sVal.title || sVal.name || sKey,
        }));

      return {
        id: `year-${yIdx + 1}`,
        year: yearKey,
        title: yVal.title || yearKey,
        subtitle: yVal.subtitle || "",
        totalCredits: yVal.totalCredits,
        semesters: rawSems.map((s, sIdx) =>
          normalizeSem(s, s.name || `Semester ${sIdx + 1}`, sIdx)
        ),
      };
    });
  }, [curriculum]);

  const allSemesters = useMemo(
    () => years.flatMap((y) => y.semesters),
    [years]
  );

  // Track accordion state for semesters
  const [openSemesters, setOpenSemesters] = useState(() => {
    const initial = {};
    years.forEach((y, yIdx) => {
      y.semesters.forEach((sem, sIdx) => {
        // Open the first semester by default
        initial[sem.id] = yIdx === 0 && sIdx === 0;
      });
    });
    return initial;
  });

  // Track accordion state for inner course groups
  // First nested dropdown in each semester is open by default, others closed
  const [openGroups, setOpenGroups] = useState(() => {
    const initial = {};
    years.forEach((y) => {
      y.semesters.forEach((sem) => {
        sem.blocks.forEach((block, bIdx) => {
          initial[`${sem.id}-${block.key}`] = bIdx === 0;
        });
      });
    });
    return initial;
  });

  // Synchronize with external openAll button
  useEffect(() => {
    if (typeof openAll !== "boolean") return;

    setOpenSemesters(() => {
      const next = {};
      years.forEach((y) => {
        y.semesters.forEach((sem) => {
          next[sem.id] = openAll;
        });
      });
      return next;
    });

    setOpenGroups(() => {
      const next = {};
      years.forEach((y) => {
        y.semesters.forEach((sem) => {
          sem.blocks.forEach((block) => {
            next[`${sem.id}-${block.key}`] = openAll;
          });
        });
      });
      return next;
    });
  }, [openAll, years]);

  const toggleSemester = (semId) => {
    const willOpen = !openSemesters[semId];

    setOpenSemesters((prev) => {
      const updated = { ...prev, [semId]: willOpen };
      if (setOpenAll) {
        const values = Object.values(updated);
        if (values.every(Boolean)) setOpenAll(true);
        else if (values.every((v) => !v)) setOpenAll(false);
      }
      return updated;
    });

    // When opening a semester, reset its nested dropdowns:
    // the 1st nested dropdown is opened by default and the others are closed
    if (willOpen) {
      const sem = allSemesters.find((s) => s.id === semId);
      if (sem && sem.blocks.length > 0) {
        setOpenGroups((prev) => {
          const next = { ...prev };
          sem.blocks.forEach((block, bIdx) => {
            next[`${sem.id}-${block.key}`] = bIdx === 0;
          });
          return next;
        });
      }
    }
  };

  const toggleGroup = (semId, blockKey) => {
    const targetKey = `${semId}-${blockKey}`;
    setOpenGroups((prev) => {
      const willOpen = !prev[targetKey];
      const next = { ...prev };

      // Close all nested dropdowns in this semester
      const sem = allSemesters.find((s) => s.id === semId);
      if (sem) {
        sem.blocks.forEach((b) => {
          next[`${semId}-${b.key}`] = false;
        });
      }

      // If opening, activate target; if it was already open, it is now toggled closed
      if (willOpen) {
        next[targetKey] = true;
      }

      return next;
    });
  };

  return (
    <div className="w-full font-circular">

      {/* Curriculum Years & Semesters */}
      <div className="space-y-6">
        {years.map((y) => (
          <section
            key={y.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
            aria-label={y.title}
          >
            {/* Year Header */}
            <header className="bg-gradient-to-r from-blue-50/80 via-blue-50/30 to-white px-5 sm:px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                  {y.title}
                </h3>
                {y.subtitle && (
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                    {y.subtitle}
                  </p>
                )}
              </div>
              {y.totalCredits && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-blue-200 text-universal self-start sm:self-auto shadow-xs">
                  {y.totalCredits} Credits
                </span>
              )}
            </header>

            {/* Semesters inside Year */}
            <div className="divide-y divide-slate-200">
              {y.semesters.map((sem, semIdx) => {
                const isSemOpen = !!openSemesters[sem.id];
                const semesterNumber =
                  sem.raw?.number ||
                  sem.id.replace(/\D/g, "") ||
                  sem.name?.match(/\d+/)?.[0] ||
                  semIdx + 1;

                return (
                  <div key={sem.id} className="transition-colors">
                    {/* Semester Accordion Summary */}
                    <button
                      type="button"
                      onClick={() => toggleSemester(sem.id)}
                      className="w-full text-left flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 hover:bg-blue-50/40 transition-colors focus:outline-none"
                      aria-expanded={isSemOpen}
                    >
                      {/* Semester Number Badge (1, 2, 3, 4) */}
                      <span className="w-11 h-11 rounded-xl bg-universal text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-sm">
                        {semesterNumber}
                      </span>

                      {/* Semester Title & Module preview */}
                      <span className="flex-1 min-w-0">
                        <strong className="block text-base sm:text-lg font-semibold text-gray-900 leading-snug">
                          {sem.name}
                        </strong>
                        <span className="text-xs sm:text-sm text-gray-500 truncate block mt-0.5">
                          {sem.blocks.map((b) => b.label).join(" · ")}
                        </span>
                      </span>

                      {/* Credits Pill */}
                      <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-[#EEF5FF] text-universal border border-blue-100 shrink-0">
                        {sem.totalCredits} credits
                      </span>

                      {/* Chevron */}
                      <span
                        className={`text-gray-400 p-1 transition-transform duration-200 ${isSemOpen ? "rotate-180" : ""
                          }`}
                      >
                        <ChevronIcon className="w-4 h-4" />
                      </span>
                    </button>

                    {/* Semester Content Body */}
                    {isSemOpen && (
                      <div className="bg-slate-50/60 p-4 sm:p-5 border-t border-slate-200">
                        {/* Course Group Blocks */}
                        <div className="space-y-3.5">
                          {sem.blocks.map((block) => {
                            const groupKey = `${sem.id}-${block.key}`;
                            const isGroupOpen = !!openGroups[groupKey];

                            return (
                              <div
                                key={block.key}
                                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs"
                              >
                                <button
                                  type="button"
                                  onClick={() => toggleGroup(sem.id, block.key)}
                                  className="w-full text-left flex items-center justify-between gap-3 px-4 py-3 bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                                  aria-expanded={isGroupOpen}
                                >
                                  <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-universal block">
                                      {block.label}
                                    </span>
                                    <span className="text-xs text-gray-500 font-medium block mt-0.5">
                                      {block.rule}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-xs sm:text-sm font-semibold text-gray-600">
                                      {block.meta}
                                    </span>
                                    <span
                                      className={`text-gray-400 transition-transform duration-200 ${isGroupOpen ? "rotate-180" : ""
                                        }`}
                                    >
                                      <ChevronIcon className="w-4 h-4" />
                                    </span>
                                  </div>
                                </button>

                                {isGroupOpen && (
                                  <ol className="divide-y divide-slate-100 border-t border-slate-100 list-none m-0 p-0">
                                    {block.courses.map((course, cIdx) => (
                                      <li
                                        key={cIdx}
                                        className="flex items-center gap-3 px-4 py-2.5 sm:py-3 hover:bg-blue-50/20 transition-colors"
                                      >
                                        <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center shrink-0">
                                          {String(cIdx + 1).padStart(2, "0")}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                          <span className="text-sm sm:text-[15px] font-medium text-gray-800 block">
                                            {course.name}
                                          </span>
                                          {(course.live_hours !== undefined ||
                                            course.masterclass_hours !== undefined ||
                                            course.async_hours !== undefined) && (
                                            <span className="text-xs text-gray-500 block mt-0.5">
                                              {[
                                                course.live_hours ? `${course.live_hours} Live hrs` : null,
                                                course.masterclass_hours
                                                  ? `${course.masterclass_hours} Masterclass hr${
                                                      course.masterclass_hours > 1 ? "s" : ""
                                                    }`
                                                  : null,
                                                course.async_hours ? `${course.async_hours} Async hrs` : null,
                                              ]
                                                .filter(Boolean)
                                                .join(" · ")}
                                            </span>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                          {course.total_hours && (
                                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 hidden sm:inline-block">
                                              {course.total_hours} hrs
                                            </span>
                                          )}
                                          <span className="text-xs font-bold text-universal bg-[#EEF5FF] border border-blue-100 px-2.5 py-0.5 rounded-full shrink-0">
                                            {course.credits} credits
                                          </span>
                                        </div>
                                      </li>
                                    ))}
                                  </ol>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Master Class */}
                        {sem.masterClass && (
                          <div className="mt-3.5 px-4 py-3 rounded-xl border border-dashed border-universal/60 bg-white flex items-center justify-between text-sm sm:text-base font-semibold text-gray-900 shadow-xs">
                            <span className="flex items-center gap-2">
                              {sem.masterClass.title || "Master Class"}
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-gray-500">
                              {sem.masterClass.selectionRule || "Required"} ·{" "}
                              {sem.masterClass.credits} credits
                            </span>
                          </div>
                        )}

                        {/* Semester / Term Total */}
                        <div className="mt-3.5 flex items-center justify-end gap-3 text-sm text-gray-500">
                          {sem.totalHours ? (
                            <span>
                              Total Hours: <b className="text-gray-900 font-bold">{sem.totalHours} hrs</b>
                            </span>
                          ) : null}
                          <span>
                            {sem.name?.toLowerCase().includes("term") ? "Term" : "Semester"} total:{" "}
                            <b className="text-gray-900 font-bold text-base">
                              {sem.totalCredits} credits
                            </b>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Footnote */}
      <p className="mt-4 text-xs sm:text-sm text-gray-500 italic">
        Credits and contact hours are shown per course. Open electives and limited electives (if applicable) are
        chosen as indicated in each section.
      </p>
    </div>
  );
};

export default PGDMHybridCurriculum;

