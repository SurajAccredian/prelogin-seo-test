"use client";
import React, { useState, useMemo } from "react";
import PROGRAMS from "../Assets/programs.json";
import HomePageWrapper from "../Wrapper/HomePageWrapper";
import SearchIntentBreadcrumb from "./SearchIntentBreadcrumb";
import SearchIntentHero from "./SearchIntentHero";
import SearchIntentFilterBar from "./SearchIntentFilterBar";
import SearchIntentDirectory from "./SearchIntentDirectory";
import SearchIntentFAQ from "./SearchIntentFAQ";
import SearchIntentCTA from "./SearchIntentCTA";
import DownloadBrochure from "../CTA_Modal/download_brochure";
import { sortPrograms } from "../../helpers/common.helpers";
import { useProgramStatuses } from "../../helpers/useProgramStatuses";
import { getProgramsByFilterKey } from "./searchIntentFilters";
import "./SearchIntent.css";
import InfoNew from "../Home/Info/InfoNew";

const EXPERIENCE_OPTIONS = ["3–5 yrs", "5–10 yrs", "10+ yrs"];

export default function SearchIntentCategoryClient({
  pageTitle,
  pageDescription,
  pageMobileDescription,
  mobileDescription,
  breadcrumbLabel,
  filterKey = null,
  filterConfig = null,
  customPrograms = null,
  allowedProgramIds = null,
  faqs = [],
  ctaTitle = "Find the Right Program for Your Career",
  ctaDescription = "Explore programs aligned with your experience and career goals or speak with a senior learning advisor for personalized guidance.",
}) {
  const { getProgramStatus } = useProgramStatuses();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [shortlistedIds, setShortlistedIds] = useState([]);

  // Brochure modal state
  const [brochureInfo, setBrochureInfo] = useState(null);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  const handleOpenBrochure = (program) => {
    setBrochureInfo(program);
    setIsBrochureOpen(true);
  };

  const handleCloseBrochure = () => {
    setIsBrochureOpen(false);
  };

  const handleToggleShortlist = (programId) => {
    setShortlistedIds((prev) =>
      prev.includes(programId)
        ? prev.filter((id) => id !== programId)
        : [...prev, programId]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedDomain("");
    setSelectedInstitute("");
    setSelectedDuration("");
    setSelectedExperience("");
  };

  // 1. Derive base category programs from master dataset using serializable filterKey/config
  const basePrograms = useMemo(() => {
    if (customPrograms && Array.isArray(customPrograms) && customPrograms.length > 0) {
      return customPrograms;
    }

    if (filterKey) {
      return getProgramsByFilterKey(filterKey);
    }

    if (filterConfig && filterConfig.key) {
      return getProgramsByFilterKey(filterConfig.key);
    }

    if (allowedProgramIds && Array.isArray(allowedProgramIds)) {
      const idSet = new Set(allowedProgramIds);
      return PROGRAMS.filter((p) => idSet.has(p.id));
    }

    return PROGRAMS;
  }, [customPrograms, filterKey, filterConfig, allowedProgramIds]);

  // 2. Derive dynamic filter options directly from the matched programs
  const institutions = useMemo(() => {
    return [...new Set(basePrograms.map((p) => p.university_name).filter(Boolean))].sort(
      (a, b) => a.localeCompare(b)
    );
  }, [basePrograms]);

  const domains = useMemo(() => {
    return [...new Set(basePrograms.map((p) => p.category).filter(Boolean))].sort();
  }, [basePrograms]);

  const durations = useMemo(() => {
    return [...new Set(basePrograms.map((p) => p.duration).filter(Boolean))];
  }, [basePrograms]);

  // 3. Filter programs based on active facets
  const filteredPrograms = useMemo(() => {
    return basePrograms.filter((p) => {
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.program_name?.toLowerCase().includes(q);
        const matchesInst = p.university_name?.toLowerCase().includes(q);
        const matchesCategory = p.category?.toLowerCase().includes(q);
        const matchesTags = p.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesInst && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      // Domain / Category Filter
      if (selectedDomain && p.category?.toLowerCase() !== selectedDomain.toLowerCase()) {
        return false;
      }

      // Institute Filter
      if (selectedInstitute && p.university_name !== selectedInstitute) {
        return false;
      }

      // Duration Filter
      if (selectedDuration && p.duration !== selectedDuration) {
        return false;
      }

      // Experience Filter
      if (selectedExperience) {
        const expMatch =
          p.experience === selectedExperience ||
          (selectedExperience === "10+ yrs" &&
            (p.category?.includes("cxo") ||
              p.category?.includes("senior") ||
              p.program_name?.toLowerCase().includes("chief") ||
              p.program_name?.toLowerCase().includes("senior"))) ||
          (selectedExperience === "5–10 yrs" &&
            (p.category?.includes("leadership") ||
              p.category?.includes("management") ||
              p.category?.includes("finance"))) ||
          (selectedExperience === "3–5 yrs" &&
            !p.category?.includes("cxo") &&
            !p.category?.includes("senior"));
        if (!expMatch) return false;
      }

      return true;
    });
  }, [basePrograms, searchQuery, selectedDomain, selectedInstitute, selectedDuration, selectedExperience]);

  // 4. Sort with active programs first from live bulk/registration status, institutes jumbled
  const sortedPrograms = useMemo(() => {
    return sortPrograms(
      [...filteredPrograms],
      getProgramStatus,
      "relevance",
      searchQuery
    );
  }, [filteredPrograms, getProgramStatus, searchQuery]);

  // ItemList Schema with nested Course entities for Google Course Carousel & GEO
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sortedPrograms.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: p.program_name,
        description: `${p.program_name} offered in collaboration with ${p.university_name}. Format: ${p.batch_type || "Live Online"}, Duration: ${p.duration || "Flexible"}.`,
        provider: {
          "@type": "Organization",
          name: p.university_name,
          sameAs: "https://accredian.com",
        },
        url: `https://accredian.com/programs/${p.id}`,
      },
    })),
  };

  return (
    <HomePageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Breadcrumb Trail */}
      <SearchIntentBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Explore Programs", href: "/programs" },
          { label: breadcrumbLabel || pageTitle },
        ]}
      />

      {/* Main Page Hero */}
      <SearchIntentHero
        title={pageTitle}
        description={pageDescription}
        mobileDescription={pageMobileDescription || mobileDescription}
      />

      {/* Explore Section */}
      <main id="explore" className="w-full bg-slate-50/70 py-8 md:py-14 font-circular">
        <div className="si-wrap">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Explore Programs
            </h2>
            <p className="mt-1 text-sm sm:text-base text-neutral-600">
              Find an executive program aligned with your experience, domain and career goals.
            </p>
          </div>

          {/* Faceted Filter Bar */}
          <SearchIntentFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedDomain={selectedDomain}
            onDomainChange={setSelectedDomain}
            domains={domains}
            selectedInstitute={selectedInstitute}
            onInstituteChange={setSelectedInstitute}
            institutes={institutions}
            selectedDuration={selectedDuration}
            onDurationChange={setSelectedDuration}
            durations={durations}
            selectedExperience={selectedExperience}
            onExperienceChange={setSelectedExperience}
            experienceLevels={EXPERIENCE_OPTIONS}
            onReset={handleResetFilters}
            totalCount={sortedPrograms.length}
            shortlistCount={shortlistedIds.length}
          />

          {/* Directory of Cards */}
          <SearchIntentDirectory
            programs={sortedPrograms}
            groupByInstitution={false}
            institutions={institutions}
            shortlistedIds={shortlistedIds}
            onToggleShortlist={handleToggleShortlist}
            onOpenBrochure={handleOpenBrochure}
            setOpen={setIsBrochureOpen}
            getProgramStatus={getProgramStatus}
            onResetFilters={handleResetFilters}
          />
        </div>
      </main>

      {/* Where Our Learners Work Marquee */}
      <InfoNew />

      {/* Structured FAQ Section */}
      {faqs && faqs.length > 0 && (
        <SearchIntentFAQ
          title="Frequently Asked Questions"
          subtitle={`Common questions regarding ${pageTitle.toLowerCase()}, eligibility, formats, and credentials.`}
          faqs={faqs}
        />
      )}

      {/* Bottom Advisory Consultation CTA */}
      <SearchIntentCTA
        title={ctaTitle}
        description={ctaDescription}
        exploreTargetId="explore"
      />

      {/* Brochure Download Modal */}
      {brochureInfo && (
        <DownloadBrochure
          open={isBrochureOpen}
          handleClose={handleCloseBrochure}
          source={brochureInfo.brochure?.source || `${brochureInfo.university_name} Brochure`}
          campaign_name={brochureInfo.brochure?.campaign_name || brochureInfo.id}
          program={brochureInfo.category || brochureInfo.program_name}
          pdf={brochureInfo.brochure?.pdf}
          image={brochureInfo.brochureHeader || brochureInfo.university_image}
        />
      )}
    </HomePageWrapper>
  );
}
