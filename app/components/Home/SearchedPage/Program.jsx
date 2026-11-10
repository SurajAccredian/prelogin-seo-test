"use client";
import React, { useState, useRef, useEffect } from "react";
import { CiViewTimeline } from "react-icons/ci";
import Link from "next/link";
import { resolveProgramStatus } from "../../../helpers/useProgramStatuses";
import { NON_SKILL_TAGS } from "../../../helpers/programFilter.helpers";
import { getProgramCoverImage } from "../../Assets/constants";

// allowedIds from constants - empty array as per original
const allowedIds = [];

const Program = ({ program, setBrotureDownloadInfo, setOpen, getProgramStatus }) => {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const skillsRef = useRef(null);
  const lastHoverOpenRef = useRef(0);

  useEffect(() => {
    if (!showAllSkills) return;
    const handleClickOutside = (e) => {
      if (skillsRef.current && !skillsRef.current.contains(e.target)) {
        setShowAllSkills(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showAllSkills]);

  const resolved = getProgramStatus
    ? getProgramStatus(program)
    : resolveProgramStatus(program);

  const isClosed = Boolean(resolved?.isAdmissionClosed);

  const handleOpen = (program) => {
    if (setBrotureDownloadInfo) setBrotureDownloadInfo(program);
    if (setOpen) setOpen(true);
  };

  const programUrl =
    program.category?.toLowerCase() === "free courses" ||
      program.id === "transform-business-workflows-with-generative-ai" ||
      program.id === "transform-ideas-into-impact-with-product-management"
      ? `/free-courses/${program.id}`
      : `/programs/${program.id}`;

  // SEO-03: Filter out non-skill delivery tags (online, instructor led, new launch, etc.).
  // If a program has no genuine skills defined, render nothing rather than a blank or fallback.
  const rawSkills = Array.isArray(program.skills)
    ? program.skills
    : Array.isArray(program.tags)
      ? program.tags
      : [];

  const coreSkills = rawSkills
    .map((t) => (typeof t === "string" ? t : t?.title || ""))
    .filter((t) => t && !NON_SKILL_TAGS.has(t.trim().toLowerCase()));

  const visibleSkills = coreSkills.slice(0, 2);
  const remainingSkills = coreSkills.slice(2);

  // SEO-04: Resolve university artwork / campus background over generic placeholder images
  const coverImage = getProgramCoverImage(program);

  return (
    <div
      className={`w-full h-full lg:max-w-full rounded-2xl overflow-hidden flex flex-col relative transition-all duration-200 ${isClosed
        ? "bg-neutral-50/90 border border-neutral-200 shadow-sm"
        : "bg-white drop-shadow"
        }`}
    >
      <div
        className={`w-full h-32 flex items-center justify-center relative overflow-hidden ${isClosed ? "bg-neutral-100" : "bg-blue-50"
          }`}
      >
        {resolved.status && (
          <div className="absolute top-2 right-2 z-10">
            <div
              className={`rounded-lg px-3 py-1 text-xs font-semibold text-white shadow-md ${isClosed ? "bg-red-500" : "bg-green-500 capitalize"
                }`}
            >
              {isClosed ? "Admission Closed" : resolved.status}
            </div>
          </div>
        )}
        <img
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-200 ${isClosed ? "grayscale contrast-[0.85] opacity-70" : ""
            }`}
          src={coverImage}
          alt={`${program.title || program.program_name} - ${program.university_name || "Accredian"}`}
        />
      </div>

      <div className="w-full pt-4 pb-2 px-4">
        <div className="w-full flex items-center gap-4">
          <div
            className={`w-10 h-10 flex-shrink-0 rounded-xl overflow-hidden p-2 drop-shadow-md transition-all ${isClosed ? "bg-neutral-100 grayscale opacity-80" : "bg-white"
              }`}
          >
            <img
              loading="lazy"
              title={program.university_name}
              src={program.university_image}
              className="w-full h-full object-contain rounded-sm"
              alt={program.university_name}
            />
          </div>
          <p
            title={program.university_name}
            className={`text-center font-medium text-xs cursor-context-menu ${isClosed ? "text-neutral-400" : "text-neutral-500"
              }`}
          >
            {program.university_name}
          </p>
        </div>
        <div
          className={`w-full border-b mt-4 ${isClosed ? "border-neutral-200" : "border-neutral-300"
            }`}
        />
      </div>

      <div className="w-full flex-1 flex flex-col justify-between px-4 pt-2 pb-4 cursor-context-menu">
        <div>
          <h2
            className={`font-semibold line-clamp-2 min-h-[3rem] ${isClosed ? "text-neutral-600" : "text-neutral-900"
              }`}
          >
            <Link
              href={programUrl}
              className="hover:text-universal transition-colors"
            >
              {program.program_name}
            </Link>
          </h2>
          <div className="w-full">
            {coreSkills.length > 0 && (
              <div className="relative w-full my-4" ref={skillsRef}>
                <p className="w-full text-[14px] text-neutral-500 cursor-context-menu leading-relaxed">
                  <span className={isClosed ? "text-neutral-500 font-medium" : "text-black font-medium"}>
                    Core skills -{" "}
                  </span>
                  <span>
                    {visibleSkills.join(", ")}
                    {remainingSkills.length > 0 && ", "}
                  </span>
                  {remainingSkills.length > 0 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (Date.now() - lastHoverOpenRef.current < 400) {
                          setShowAllSkills(true);
                          return;
                        }
                        setShowAllSkills((prev) => !prev);
                      }}
                      onMouseEnter={() => {
                        if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
                          lastHoverOpenRef.current = Date.now();
                          setShowAllSkills(true);
                        }
                      }}
                      onMouseLeave={() => {
                        if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
                          setShowAllSkills(false);
                        }
                      }}
                      className="text-universal font-semibold hover:underline cursor-pointer inline-flex items-center ml-0.5 focus:outline-none"
                      aria-expanded={showAllSkills}
                      aria-label={`View ${remainingSkills.length} more skills`}
                    >
                      +{remainingSkills.length} more
                    </button>
                  )}
                </p>

                {/* Floating Popover on Hover (Desktop) / Tap (Mobile) */}
                {showAllSkills && remainingSkills.length > 0 && (
                  <div
                    onMouseEnter={() => {
                      if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
                        setShowAllSkills(true);
                      }
                    }}
                    onMouseLeave={() => {
                      if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
                        setShowAllSkills(false);
                      }
                    }}
                    className="absolute bottom-full left-0 mb-2 z-30 w-full sm:w-64 p-3 bg-white rounded-xl shadow-xl border border-neutral-200 text-xs animate-in fade-in zoom-in-95 duration-150"
                    role="tooltip"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="font-semibold text-neutral-800 mb-2 pb-1.5 border-b border-neutral-100 flex items-center justify-between">
                      <span>Additional Skills ({remainingSkills.length})</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShowAllSkills(false);
                        }}
                        className="text-neutral-400 hover:text-neutral-600 sm:hidden p-0.5"
                        aria-label="Close"
                      >
                        ✕
                      </button>
                    </div>
                    <ul className="space-y-1.5 text-neutral-600 max-h-48 overflow-y-auto pr-1">
                      {remainingSkills.map((skill, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-universal mt-1.5 flex-shrink-0" />
                          <span className="text-neutral-800 leading-snug font-medium">
                            {skill}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {/* Subtle pointer tip */}
                    <div className="absolute top-full left-6 -mt-1 w-2 h-2 bg-white border-r border-b border-neutral-200 transform rotate-45" />
                  </div>
                )}
              </div>
            )}
            <div className={`flex items-center gap-2 ${coreSkills.length === 0 ? "my-4" : ""}`}>
              <CiViewTimeline
                className={`text-2xl ${isClosed ? "text-neutral-400" : "text-universal/90"
                  }`}
                strokeWidth={0.5}
              />
              <p
                className={`text-base font-medium capitalize ${isClosed ? "text-neutral-500" : "text-neutral-800"
                  }`}
              >
                {program.duration} -{" "}
                <span title={program.batch_type}>{program.batch_type}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full gap-2 mt-4 pt-1">
          <Link
            href={programUrl}
            className={`px-2 py-2.5 flex-1 text-xs sm:text-sm font-semibold border rounded-lg text-center transition-colors whitespace-nowrap ${isClosed
              ? "border-neutral-300 text-neutral-600 bg-white/80 hover:bg-neutral-100"
              : "border-neutral-300 text-neutral-800 hover:bg-neutral-50"
              }`}
          >
            View Program
          </Link>
          <button
            onClick={() => handleOpen(program)}
            disabled={isClosed || allowedIds.includes(program?.id)}
            className="px-2 py-2.5 flex-1 disabled:bg-neutral-300 disabled:text-neutral-500 cursor-pointer disabled:cursor-not-allowed text-xs sm:text-sm font-semibold bg-universal text-white rounded-lg whitespace-nowrap"
          >
            {isClosed ? "Admission Closed" : "Get Brochure"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Program;
