"use client";

import React, { useEffect, useState, useRef } from "react";
import { Calendar, Clock, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import "./Programs.css";
import { STREAMS } from "../../Assets/constants";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { programActions } from "../../../store/reducers/program";
import PROGRAMS from "../../Assets/programs.json";
import Brochure from "../../CTA_Modal/download_brochure";
import { useProgramStatuses } from "../../../helpers/useProgramStatuses";
// import { useScrollBoundary } from "../../../helpers/useScrollBoundary";
// import { useConditionalScrollPrevention } from "../../../helpers/useConditionalScrollPrevention";
import { TrendingUp } from "lucide-react"; // Icon for Popular Courses

// University Background Image Mapping
const UNIVERSITY_BACKGROUNDS = {
  "IIM Visakhapatnam":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iimv-bg-v2.webp",
  "IIM Tiruchirappalli":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/IIMT-bg.webp",
  XLRI: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/xlri-cover-v1.webp",
  "IIM Lucknow":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/IIML-University-Image.webp",
  "SP Jain School of Global Management":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/sp-jain-cover-v1.webp",
  "E&ICT Academy IIT Kanpur":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iit-kanpur-cover.webp",
};

// Popular program IDs
const POPULAR_PROGRAM_IDS = [
  "transform-business-workflows-with-generative-ai",
  "executive-program-in-generative-ai-for-leaders",
  "professional-certificate-in-applied-generative-ai",
  "iimv-executive-program-in-leadership-with-ai",
  "sp-jain-executive-program-in-leadership-with-ai",
  "global-senior-leadership-program",
  "senior-management-program",
  "iim-ranchi-senior-management-program",
];

const Programs = () => {
  // const scrollBoundaryRef = useScrollBoundary();
  // const { containerRef, hasOverflow } = useConditionalScrollPrevention();
  const dispatch = useDispatch();
  const { checkedCategories } = useSelector((state) => state.program);
  const { getProgramStatus } = useProgramStatuses();
  const [selectedVertical, setSelectedVertical] = useState("popular");
  const [expandedMobileCategory, setExpandedMobileCategory] =
    useState("popular");
  const [brotureDownloadInfo, setBrotureDownloadInfo] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleOpen = (program) => {
    setBrotureDownloadInfo(program);
    setOpen(true);
  };

  // Create Popular Courses category
  const popularCategory = {
    category: "popular",
    name: "Popular Courses",
    icon: TrendingUp,
    order: 0,
  };

  const getPopularPrograms = () => {
    const filtered = PROGRAMS.filter((program) =>
      POPULAR_PROGRAM_IDS.includes(program.id),
    );

    // Deduplicate by ID
    const unique = Array.from(
      new Map(filtered.map((program) => [program.id, program])).values(),
    );

    // Sort by order of POPULAR_PROGRAM_IDS
    unique.sort((a, b) => POPULAR_PROGRAM_IDS.indexOf(a.id) - POPULAR_PROGRAM_IDS.indexOf(b.id));

    return unique;
  };


  // Get sorted streams WITH popular courses at the top
  const sortedStreams = [
    popularCategory,
    ...STREAMS.sort((a, b) => a.order - b.order),
  ].filter((vertical) => {
    if (vertical.category === "popular") {
      return getPopularPrograms().length > 0;
    }
    return PROGRAMS.some(
      (program) =>
        program.category.toLowerCase() === vertical.category.toLowerCase()
    );
  });

  // Get popular programs by IDs


  // Get programs for selected vertical
  const getDisplayedPrograms = () => {
    if (selectedVertical === "popular") {
      return getPopularPrograms();
    }
    return PROGRAMS.filter(
      (program) =>
        program.category.toLowerCase() === selectedVertical.toLowerCase(),
    );
  };

  // Get programs by category for mobile accordion
  const getProgramsByCategory = (category) => {
    if (category === "popular") {
      return getPopularPrograms();
    }
    return PROGRAMS.filter(
      (program) => program.category.toLowerCase() === category.toLowerCase(),
    );
  };

  const displayedPrograms = getDisplayedPrograms();

  const handleVerticalSelect = (category) => {
    setSelectedVertical(category);
    if (checkedCategories.length > 0) {
      dispatch(programActions.setCheckedCategories([]));
    }
  };

  const toggleMobileCategory = (category) => {
    setExpandedMobileCategory(
      expandedMobileCategory === category ? "" : category,
    );
  };

  // Get current vertical display name
  const getCurrentVerticalName = () => {
    const currentVertical = sortedStreams.find(
      (v) => v.category === selectedVertical,
    );
    return currentVertical?.name || currentVertical?.category || "";
  };

  return (
    <div
      id="courses"
      className="w-full h-full lg:min-h-screen flex justify-center mt-12 sm:mt-16 font-circular px-4 sm:px-6 xl:px-12"
    >
      <div className="w-full max-w-[86rem] h-full flex flex-col gap-4">
        {/* Header Section */}
        <div className="w-full flex md:flex-row flex-col justify-normal md:justify-between px-0 sm:px-[10px] lg:gap-8 gap-4 items-start md:items-end">
          <div className="w-full">
            <h4 className="text-sm sm:text-base text-darkBlue font-medium max-sm:max-w-[300px] capitalize tracking-wide">
              Checkout our courses
            </h4>
            <h2 className="text-2xl sm:text-3xl lg:text-[44px] mt-1 sm:mt-2 font-medium leading-tight">
              Unlock Your Potential with{" "}
              <span className="text-universal">World-Class</span> Programs
            </h2>
          </div>
          <Link
            href="/programs"
            className="flex items-center gap-1.5 sm:gap-2 font-medium capitalize text-base sm:text-lg text-nowrap px-3 sm:px-4 py-2 bg-universal/10 text-universal rounded-md cursor-pointer hover:bg-universal/20 transition-colors"
          >
            Show all
          </Link>
        </div>

        {/* Desktop Layout: Sidebar + Cards Grid with Aligned Headers */}
        <div className="hidden md:flex w-full gap-4 sm:gap-6 mt-4 sm:mt-8 md:h-[calc(100vh-700px)] lg:h-[calc(100vh)]">
          {/* Sidebar - Desktop Only */}
          <div className="w-[260px] xl:w-[340px] flex-shrink-0 flex flex-col">
            {/* "Course Catalog" Header - Aligned */}
            <div className="flex-shrink-0 mb-6">
              <h3 className="text-base xl:text-lg font-bold text-gray-900">
                Course Catalogue
              </h3>
            </div>

            {/* Sidebar Content */}
            <SidebarDesktop
              sortedStreams={sortedStreams}
              selectedVertical={selectedVertical}
              onVerticalSelect={handleVerticalSelect}
            />
          </div>

          {/* Cards Grid Container with Scroll */}
          <div className="flex-1 min-w-0 flex flex-col h-full">
            {/* Vertical Name Header with Line - Aligned with "Course Catalog" */}
            <div className="flex items-center gap-4 mb-6 flex-shrink-0">
              <h2 className="text-base xl:text-lg font-bold text-gray-900 uppercase tracking-wide whitespace-nowrap">
                {getCurrentVerticalName()}
              </h2>
              <div className="flex-1 h-[2px] bg-gray-900"></div>
            </div>

            {/* Scrollable Cards Area */}
            <div
              // ref={containerRef}
              className="flex-1 overflow-y-auto pr-2 custom-scrollbar"
              style={{
                // overscrollBehavior: hasOverflow ? "none" : "auto",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {displayedPrograms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-5 lg:gap-6 pb-6">
                  {displayedPrograms.map((program, index) => (
                    <ProgramCard
                      key={program.id || index}
                      program={program}
                      handleOpen={handleOpen}
                      getProgramStatus={getProgramStatus}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout: Accordion with Horizontal Scroll */}
        <div className="md:hidden w-full mt-4 sm:mt-6 space-y-1">
          {sortedStreams.map((vertical, index) => {
            const categoryPrograms = getProgramsByCategory(vertical.category);
            return (
              <MobileCategoryItem
                key={index}
                vertical={vertical}
                isExpanded={expandedMobileCategory === vertical.category}
                onToggle={() => toggleMobileCategory(vertical.category)}
                programs={categoryPrograms}
                handleOpen={handleOpen}
                getProgramStatus={getProgramStatus}
              />
            );
          })}
        </div>
      </div>

      {brotureDownloadInfo && (
        <Brochure
          open={open}
          handleClose={handleClose}
          source={brotureDownloadInfo.brochure?.source || "Explore Programs"}
          program={brotureDownloadInfo.category}
          campaign_name={brotureDownloadInfo.brochure?.campaign_name || "Program brochure"}
          pdf={brotureDownloadInfo.brochure?.pdf}
          image={brotureDownloadInfo.brochureHeader}
        />
      )}

      <style jsx>{`
        /* Prevent Lenis from interfering with native scroll */
        .prevent-lenis-scroll {
          overscroll-behavior: none;
          -webkit-overflow-scrolling: touch;
        }

        /* Enhanced touch scrolling for mobile */
        .scrollbar-hide {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-x: none;
          overscroll-behavior-y: none;
          scroll-behavior: auto;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Custom Scrollbar - Optimized */
        .custom-scrollbar {
          overflow-y: auto;
          overscroll-behavior: none;
          will-change: scroll-position;
          scroll-behavior: auto;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 0.4rem;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 211, 211, 0.75);
          border-radius: 1rem;
          transition: background 0.2s;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d4d3d3;
        }

        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(212, 211, 211, 0.75) transparent;
        }

        /* Hardware acceleration */
        .custom-scrollbar > * {
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

// Sidebar Desktop Component
const SidebarDesktop = ({
  sortedStreams,
  selectedVertical,
  onVerticalSelect,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md flex-1 overflow-hidden">
      {/* Scrollable Content */}
      <div className="overflow-y-auto h-full p-4 xl:p-6 space-y-2 custom-scrollbar">
        {sortedStreams.map((vertical, index) => {
          const IconComponent = vertical.icon;
          const isSelected = selectedVertical === vertical.category;

          return (
            <button
              key={index}
              onClick={() => onVerticalSelect(vertical.category)}
              className={`w-full text-left px-3 xl:px-4 py-2.5 xl:py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 group relative overflow-hidden ${isSelected
                ? "bg-universal text-white shadow-md"
                : "hover:bg-gray-50 text-gray-700"
                }`}
            >
              {/* Sliding border bottom animation - ONLY for non-selected items */}
              {!isSelected && (
                <span className="absolute bottom-0 left-0 h-0.5 bg-universal transition-all duration-300 w-0 group-hover:w-full" />
              )}

              {/* Icon */}
              <span className="flex-shrink-0 w-5 h-5">
                {IconComponent ? <IconComponent className="w-5 h-5" /> : null}
              </span>

              {/* Category Name */}
              <span className="text-sm capitalize flex-1">
                {vertical.name || vertical.category}
              </span>

              {/* Arrow Icon */}
              <ArrowRight
                className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isSelected
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Program Card Component
export const ProgramCard = ({ program, handleOpen, getProgramStatus }) => {
  const hookStatus = useProgramStatuses();
  const statusResolver = getProgramStatus || hookStatus.getProgramStatus;
  const resolved = statusResolver
    ? statusResolver(program)
    : { status: program.status, isAdmissionClosed: program.status?.toLowerCase() === "admission closed" };

  const backgroundImage =
    UNIVERSITY_BACKGROUNDS[program.university_name] || program.cover_image;

  return (
    <div
      className="group relative w-full h-[350px] sm:h-[380px] overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-500"
      style={{
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      {/* Fixed Height Background Image */}
      <div
        className="relative h-[80px] md:h-[120px] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-universal/60 to-universal/30" />
      </div>

      {(resolved.status || POPULAR_PROGRAM_IDS.includes(program.id)) && (
        <span
          className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-10 text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 sm:px-3 rounded-md ${
            resolved.isAdmissionClosed
              ? "bg-red-500 capitalize"
              : "bg-green-500"
          } ${POPULAR_PROGRAM_IDS.includes(program.id) ? "normal-case" : "capitalize"}`}
        >
          {POPULAR_PROGRAM_IDS.includes(program.id) ? "Best selling" : resolved.status}
        </span>
      )}

      {/* Content Container with proper spacing */}
      <div className="relative bg-white px-4 sm:px-6 pb-4 sm:pb-6 h-[220px] sm:h-[270px] flex flex-col">
        {/* University Logo - Half overlapping using negative margin */}
        <div className="relative -mt-[25px] sm:-mt-[30px] mb-2 sm:mb-3 z-10">
          <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-lg bg-white shadow-lg p-1.5 sm:p-2 transition-transform duration-500 group-hover:scale-105">
            <img
              src={program.university_image}
              alt={program.university_name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* University Name */}
        <h3 className="text-xs sm:text-sm font-semibold text-gray-700 transition-colors duration-300 group-hover:text-universal capitalize tracking-wide whitespace-normal sm:whitespace-nowrap sm:truncate mb-2 sm:mb-3">
          {program.university_name}
        </h3>

        {/* Program Name - Fixed height with 3-4 lines max */}
        <h4 className="text-[14px] md:text-[16px] font-semibold text-gray-900 mb-3 sm:mb-4 leading-tight min-h-[60px] sm:min-h-[68px] line-clamp-4">
          {program.program_name}
        </h4>

        {/* Duration and Batch Info */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-5">
          <span className="flex items-center gap-1 sm:gap-1.5">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {program.duration}
          </span>
          <span className="flex items-center gap-1 sm:gap-1.5">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {program.batch_type}
          </span>
        </div>

        {/* Buttons - pushed to bottom */}
        <div className="flex flex-col md:flex-row gap-2 sm:gap-3 mt-auto">
          <button
            onClick={() => {
              const isFreeCourse =
                program.category?.toLowerCase() === "free courses" ||
                program.category?.toLowerCase() === "microsoft" ||
                program.id === "transform-business-workflows-with-generative-ai" ||
                program.id === "transform-ideas-into-impact-with-product-management";
              const path = isFreeCourse ? "free-courses" : "programs";
              window.open(`http://accredian.com/${path}/${program.id}`);
            }}
            className="flex-1 bg-universal hover:bg-darkBlue text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all group/btn uppercase tracking-wide"
          >
            <span className="text-[12px]">Explore</span>
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button>

          {program.brochure?.pdf && (
            <button
              onClick={() => handleOpen(program)}
              className="flex-1 border-2 border-gray-300 hover:border-universal hover:bg-universal/5 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg transition-all flex items-center justify-center gap-1.5 font-semibold sm:text-base text-gray-700 hover:text-universal uppercase tracking-wide"
            >
              <span className="text-[12px]">Brochure</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Mobile Category Item with Horizontal Scroll
const MobileCategoryItem = ({
  vertical,
  isExpanded,
  onToggle,
  programs,
  handleOpen,
  getProgramStatus,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef(null);
  const categoryRef = useRef(null);
  const IconComponent = vertical.icon;

  useEffect(() => {
    if (isExpanded && categoryRef.current) {
      setTimeout(() => {
        const yOffset = -150;
        const y =
          categoryRef.current.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }, 150);
    }
  }, [isExpanded]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const cardWidth = containerWidth * 0.85;
      const newSlide = Math.round(scrollLeft / cardWidth);
      setCurrentSlide(newSlide);
    }
  };

  const scrollToSlide = (index) => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const cardWidth = containerWidth * 0.85;
      scrollContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={categoryRef} className="bg-white overflow-hidden">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-2 transition-all duration-300 ${isExpanded
          ? "bg-universal text-white border-white/30"
          : " text-gray-900 "
          }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isExpanded ? "text-white" : "text-universal"
              }`}
          >
            {IconComponent ? <IconComponent className="w-5 h-5" /> : null}
          </div>
          <div className="flex flex-col items-start">
            <span
              className={`font-medium text-sm capitalize ${isExpanded ? "text-white" : "text-gray-900"
                }`}
            >
              {vertical.name || vertical.category}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${isExpanded ? "rotate-180 text-white" : "text-gray-500"
            }`}
        />
      </button>

      {isExpanded && programs.length > 0 && (
        <div className="pb-6 bg-white">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-4 pt-4 pb-2"
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            style={{
              scrollBehavior: "auto",
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
              scrollbarWidth: "none",
            }}
          >
            {programs.map((program, index) => (
              <div
                key={program.id || index}
                className="flex-shrink-0 w-[85%] snap-start"
              >
                <ProgramCard
                  program={program}
                  handleOpen={handleOpen}
                  getProgramStatus={getProgramStatus}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Empty State Component (unchanged)
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-gray-500">
    <svg
      className="w-16 h-16 mb-4 text-gray-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
    <p className="text-xl font-medium">No programs found</p>
    <p className="text-sm mt-1">Try selecting a different category</p>
  </div>
);

export default Programs;
