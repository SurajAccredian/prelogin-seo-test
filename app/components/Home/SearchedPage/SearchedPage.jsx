"use client";
import { useEffect, useState, useMemo, useRef, Suspense } from "react";
import PROGRAMS from "../../Assets/programs.json";
import "../Programs/Programs.css";
import Program from "./Program";
import ProgramFilters from "../../Inputs/Filters/ProgramFilters";
import HomePageWrapper from "../../Wrapper/HomePageWrapper";
import FilterModal from "../../Modals/FilterModal/FilterModal";
import { IoIosClose, IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { programActions } from "../../../store/reducers/program";
import { VscListFilter } from "react-icons/vsc";
import { useDisclosure } from "@chakra-ui/react";
import FilterPageDrawer from "../../Drawers/FilterPageDrawer/FilterPageDrawer";
import DownloadBrochure from "../../CTA_Modal/download_brochure";
import { useSearchParams, useRouter } from "next/navigation";
import { sortPrograms } from "../../../helpers/common.helpers";
import { useProgramStatuses } from "../../../helpers/useProgramStatuses";
import {
  getAvailableFilterOptions,
  filterPrograms,
  formatFilterLabel,
} from "../../../helpers/programFilter.helpers";


const areArraysEqual = (arr1 = [], arr2 = []) => {
  if (arr1.length !== arr2.length) return false;
  const set1 = new Set(arr1);
  return arr2.every((val) => set1.has(val));
};

const parseUrlFilterParams = (searchParams) => {
  if (!searchParams) {
    return {
      categories: [],
      tags: [],
      durations: [],
      institutes: [],
      careerLevels: [],
      search: "",
      sort: "relevance",
    };
  }

  const categories =
    (searchParams.get("interest") || searchParams.get("verticals"))?.split(",").filter(Boolean) || [];
  const tags =
    (searchParams.get("skills") || searchParams.get("tags"))?.split(",").filter(Boolean) || [];
  const durations =
    searchParams.get("duration")?.split(",").filter(Boolean) || [];
  const institutes =
    searchParams.get("institute")?.split(",").filter(Boolean) || [];
  const careerLevels =
    (searchParams.get("careerLevel") || searchParams.get("level"))?.split(",").filter(Boolean) || [];
  const search = (searchParams.get("q") || "").trim();
  const sort = searchParams.get("sort") || "relevance";

  return {
    categories,
    tags,
    durations,
    institutes,
    careerLevels,
    search,
    sort,
  };
};

const SearchedPageInner = () => {
  const dispatch = useDispatch();
  const {
    checkedCategories = [],
    checkedTags = [],
    checkedDurations = [],
    checkedInstitutes = [],
    checkedCareerLevels = [],
  } = useSelector((state) => state.program);

  const { getProgramStatus } = useProgramStatuses();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [brotureDownloadInfo, setBrotureDownloadInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [filteredArray, setFilteredArray] = useState(PROGRAMS);
  const [sortBy, setSortBy] = useState("relevance");

  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = (searchParams.get("q") || "").trim();
  const isSyncingFromUrlRef = useRef(false);

  // Extract available filter options dynamically
  const filterOptions = useMemo(() => getAvailableFilterOptions(PROGRAMS), []);

  const handleClose = () => setOpen(false);

  // Parse URL query parameters into Redux state
  const parseUrlParams = () => {
    isSyncingFromUrlRef.current = true;
    const {
      categories: urlCategories,
      tags: urlTags,
      durations: urlDurations,
      institutes: urlInstitutes,
      careerLevels: urlCareerLevels,
      sort: urlSort,
    } = parseUrlFilterParams(searchParams);

    if (!areArraysEqual(urlCategories, checkedCategories)) {
      dispatch(programActions.setCheckedCategories(urlCategories));
    }
    if (!areArraysEqual(urlTags, checkedTags)) {
      dispatch(programActions.setCheckedTags(urlTags));
    }
    if (!areArraysEqual(urlDurations, checkedDurations)) {
      dispatch(programActions.setCheckedDurations(urlDurations));
    }
    if (!areArraysEqual(urlInstitutes, checkedInstitutes)) {
      dispatch(programActions.setCheckedInstitutes(urlInstitutes));
    }
    if (!areArraysEqual(urlCareerLevels, checkedCareerLevels)) {
      dispatch(programActions.setCheckedCareerLevels(urlCareerLevels));
    }

    if (urlSort && ["relevance", "duration_asc", "duration_desc"].includes(urlSort)) {
      setSortBy(urlSort);
    } else {
      setSortBy("relevance");
    }
  };

  const handleClickOpenFilterDrawer = () => onOpen();

  // Sync state to URL parameters
  const updateUrlParams = () => {
    if (isSyncingFromUrlRef.current) {
      isSyncingFromUrlRef.current = false;
      return;
    }

    const {
      categories: urlCategories,
      tags: urlTags,
      durations: urlDurations,
      institutes: urlInstitutes,
      careerLevels: urlCareerLevels,
      search: urlSearch,
      sort: urlSort,
    } = parseUrlFilterParams(searchParams);

    const isAlreadyInSync =
      areArraysEqual(urlCategories, checkedCategories) &&
      areArraysEqual(urlTags, checkedTags) &&
      areArraysEqual(urlDurations, checkedDurations) &&
      areArraysEqual(urlInstitutes, checkedInstitutes) &&
      areArraysEqual(urlCareerLevels, checkedCareerLevels) &&
      urlSearch === searchQuery &&
      urlSort === sortBy;

    if (isAlreadyInSync) {
      return;
    }

    const params = new URLSearchParams();
    if (checkedCategories.length > 0)
      params.set("interest", checkedCategories.join(","));
    if (checkedTags.length > 0)
      params.set("skills", checkedTags.join(","));
    if (checkedDurations.length > 0)
      params.set("duration", checkedDurations.join(","));
    if (checkedInstitutes.length > 0)
      params.set("institute", checkedInstitutes.join(","));
    if (checkedCareerLevels.length > 0)
      params.set("careerLevel", checkedCareerLevels.join(","));
    if (searchQuery)
      params.set("q", searchQuery);
    if (sortBy && sortBy !== "relevance")
      params.set("sort", sortBy);

    const newQueryString = params.toString();
    router.replace(`/programs${newQueryString ? `?${newQueryString}` : ""}`, {
      scroll: false,
    });
  };

  // Filter change handlers
  const handleCategoryChange = (event) => {
    const val = event.target.value;
    const isChecked = event.target.checked;
    dispatch(
      programActions.setCheckedCategories(
        isChecked
          ? [...checkedCategories, val]
          : checkedCategories.filter((c) => c !== val)
      )
    );
  };

  const handleTagChange = (event) => {
    const val = event.target.value;
    const isChecked = event.target.checked;
    dispatch(
      programActions.setCheckedTags(
        isChecked ? [...checkedTags, val] : checkedTags.filter((t) => t !== val)
      )
    );
  };

  const handleDurationChange = (event) => {
    const val = event.target.value;
    const isChecked = event.target.checked;
    dispatch(
      programActions.setCheckedDurations(
        isChecked
          ? [...checkedDurations, val]
          : checkedDurations.filter((d) => d !== val)
      )
    );
  };

  const handleInstituteChange = (event) => {
    const val = event.target.value;
    const isChecked = event.target.checked;
    dispatch(
      programActions.setCheckedInstitutes(
        isChecked
          ? [...checkedInstitutes, val]
          : checkedInstitutes.filter((i) => i !== val)
      )
    );
  };

  const handleCareerLevelChange = (event) => {
    const val = event.target.value;
    const isChecked = event.target.checked;
    dispatch(
      programActions.setCheckedCareerLevels(
        isChecked
          ? [...checkedCareerLevels, val]
          : checkedCareerLevels.filter((l) => l !== val)
      )
    );
  };

  // Perform multi-facet filtering
  useEffect(() => {
    const hasActiveFilters =
      checkedCategories.length > 0 ||
      checkedTags.length > 0 ||
      checkedDurations.length > 0 ||
      checkedInstitutes.length > 0 ||
      checkedCareerLevels.length > 0 ||
      Boolean(searchQuery);

    if (!hasActiveFilters) {
      setFilteredArray(PROGRAMS);
      return;
    }

    const results = filterPrograms(PROGRAMS, {
      interests: checkedCategories,
      skills: checkedTags,
      durations: checkedDurations,
      institutes: checkedInstitutes,
      careerLevels: checkedCareerLevels,
      searchQuery,
    });

    setFilteredArray(results);
  }, [
    checkedCategories,
    checkedTags,
    checkedDurations,
    checkedInstitutes,
    checkedCareerLevels,
    searchQuery,
  ]);

  // Open modal when modalCategory is set
  useEffect(() => {
    if (modalCategory) setIsFilterModalOpen(true);
  }, [modalCategory]);

  // Individual chip removal
  const handleRemoveCategory = (category) =>
    dispatch(
      programActions.setCheckedCategories(
        checkedCategories.filter((c) => c !== category)
      )
    );
  const handleRemoveTag = (tag) =>
    dispatch(
      programActions.setCheckedTags(checkedTags.filter((t) => t !== tag))
    );
  const handleRemoveDuration = (duration) =>
    dispatch(
      programActions.setCheckedDurations(
        checkedDurations.filter((d) => d !== duration)
      )
    );
  const handleRemoveInstitute = (institute) =>
    dispatch(
      programActions.setCheckedInstitutes(
        checkedInstitutes.filter((i) => i !== institute)
      )
    );
  const handleRemoveCareerLevel = (level) =>
    dispatch(
      programActions.setCheckedCareerLevels(
        checkedCareerLevels.filter((l) => l !== level)
      )
    );

  const handleRemoveSearchQuery = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    const newQueryString = params.toString();
    router.replace(`/programs${newQueryString ? `?${newQueryString}` : ""}`, {
      scroll: false,
    });
  };

  const handleClearClose = () => {
    dispatch(programActions.clearAllFilters());
    setSortBy("relevance");
    if (searchQuery) {
      router.replace("/programs", { scroll: false });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    parseUrlParams();
  }, [searchParams]);

  useEffect(() => {
    updateUrlParams();
  }, [
    checkedCategories,
    checkedTags,
    checkedDurations,
    checkedInstitutes,
    checkedCareerLevels,
    searchQuery,
    sortBy,
  ]);

  const totalActiveFilterCount =
    checkedCategories.length +
    checkedTags.length +
    checkedDurations.length +
    checkedInstitutes.length +
    checkedCareerLevels.length +
    (searchQuery ? 1 : 0);

  const sortedPrograms = sortPrograms(
    [...filteredArray],
    getProgramStatus,
    sortBy,
    searchQuery
  );

  // Determine modal props based on which group opened "Show More"
  const getModalConfig = () => {
    if (modalCategory === "Area of Interest") {
      return {
        title: "Area of Interest",
        categories: filterOptions.categories,
        checked: checkedCategories,
        handleChange: handleCategoryChange,
        setChecked: programActions.setCheckedCategories,
      };
    }
    if (modalCategory === "Skills") {
      return {
        title: "Skills",
        categories: filterOptions.skills,
        checked: checkedTags,
        handleChange: handleTagChange,
        setChecked: programActions.setCheckedTags,
      };
    }
    if (modalCategory === "Institute") {
      return {
        title: "Institute",
        categories: filterOptions.institutes,
        checked: checkedInstitutes,
        handleChange: handleInstituteChange,
        setChecked: programActions.setCheckedInstitutes,
      };
    }
    return {
      title: "Filters",
      categories: [],
      checked: [],
      handleChange: () => {},
      setChecked: () => {},
    };
  };

  const modalConfig = getModalConfig();

  return (
    <>
      <HomePageWrapper>
        <div className="search-page w-full min-h-screen pt-24 pb-8 md:py-8 flex justify-center font-circular xl:px-12 px-4">
          <div className="max-w-[85rem] w-full">
            <div className="w-full flex gap-6">
              {/* Desktop Left Sidebar: Single bordered/rounded card with clear dividers */}
              <div className="flex-[0.3] min-w-[260px] max-w-[320px] py-4 hidden lg:block">
                <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden divide-y divide-neutral-200">
                  {/* All Filters Top Header */}
                  <div className="px-5 py-4 flex items-center gap-2.5 bg-white">
                    <VscListFilter size={18} className="text-neutral-700" />
                    <span className="font-semibold text-neutral-800 text-[15px]">
                      Filter by
                    </span>
                  </div>

                  {/* 1. Area of Interest */}
                  <ProgramFilters
                    checked={checkedCategories}
                    title="Area of Interest"
                    categories={filterOptions.categories}
                    onFilterChange={handleCategoryChange}
                    setModalOpen={setModalCategory}
                    hasShowMore={true}
                    showMoreCount={4}
                  />

                  {/* 2. Skills */}
                  <ProgramFilters
                    checked={checkedTags}
                    title="Skills"
                    categories={filterOptions.skills}
                    onFilterChange={handleTagChange}
                    setModalOpen={setModalCategory}
                    hasShowMore={true}
                    showMoreCount={4}
                  />

                  {/* 3. Institute */}
                  <ProgramFilters
                    checked={checkedInstitutes}
                    title="Institute"
                    categories={filterOptions.institutes}
                    onFilterChange={handleInstituteChange}
                    setModalOpen={setModalCategory}
                    hasShowMore={true}
                    showMoreCount={4}
                  />

                  {/* 4. Duration */}
                  <ProgramFilters
                    checked={checkedDurations}
                    title="Duration"
                    categories={filterOptions.durations}
                    onFilterChange={handleDurationChange}
                    hasShowMore={false}
                  />

                  {/* 5. Career Level */}
                  <ProgramFilters
                    checked={checkedCareerLevels}
                    title="Career Level"
                    categories={filterOptions.careerLevels}
                    onFilterChange={handleCareerLevelChange}
                    hasShowMore={false}
                  />
                </div>
              </div>

              {/* Right Content Area */}
              <div className="flex-1">
                
                {/* Results text & Sort by controls row */}
                <div className="w-full flex items-center justify-between flex-wrap gap-3 mt-4 mb-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleClickOpenFilterDrawer}
                      className="px-3.5 py-1.5 text-nowrap bg-universal/10 text-universal font-medium text-sm rounded-lg lg:hidden flex items-center gap-1.5 hover:bg-universal/15 transition-colors"
                    >
                      <VscListFilter size={18} />
                      Filters{" "}
                      {totalActiveFilterCount > 0 && `(${totalActiveFilterCount})`}
                    </button>

                    <div>
                      {searchQuery ? (
                        <h2 className="text-xl md:text-2xl text-neutral-800 font-medium">
                          <span>
                            {sortedPrograms.length} result{sortedPrograms.length === 1 ? "" : "s"} for{" "}
                            <span className="text-black font-semibold">&ldquo;{searchQuery}&rdquo;</span>
                          </span>
                        </h2>
                      ) : (
                        <span className="text-sm text-neutral-500 font-medium">
                          Showing {sortedPrograms.length} program{sortedPrograms.length === 1 ? "" : "s"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <label
                      htmlFor="program-sort-select"
                      className="text-sm font-medium text-neutral-600"
                    >
                      Sort by:
                    </label>
                    <div className="relative inline-block">
                      <select
                        id="program-sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-white border border-neutral-300 rounded-lg px-3.5 py-1.5 pr-8 text-sm font-medium text-neutral-800 cursor-pointer hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-universal/20 focus:border-universal transition-all shadow-sm"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="duration_asc">Duration: Shortest to Longest</option>
                        <option value="duration_desc">Duration: Longest to Shortest</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-neutral-500">
                        <IoIosArrowDown className="text-sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Filter Chips */}
                {totalActiveFilterCount > 0 && (
                  <div className="w-full hidden lg:flex md:flex-wrap items-center gap-2 mt-4 md:overflow-y-auto md:max-h-[200px] md:custom-scrollbar">
                    {/* Area of Interest chips */}
                    {checkedCategories.map((category, index) => (
                      <button
                        key={`interest-${index}`}
                        className="py-1 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-sm font-medium text-neutral-700 flex items-center gap-1 text-nowrap hover:bg-slate-100 transition-colors"
                        onClick={() => handleRemoveCategory(category)}
                      >
                        <span className="pl-1">
                          {formatFilterLabel("Area of Interest", category)}
                        </span>
                        <IoIosClose size={20} className="text-neutral-500" />
                      </button>
                    ))}

                    {/* Skills chips */}
                    {checkedTags.map((tag, index) => (
                      <button
                        key={`skill-${index}`}
                        className="py-1 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-sm font-medium text-neutral-700 flex items-center gap-1 text-nowrap hover:bg-slate-100 transition-colors"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <span className="pl-1">
                          {formatFilterLabel("Skills", tag)}
                        </span>
                        <IoIosClose size={20} className="text-neutral-500" />
                      </button>
                    ))}

                    {/* Duration chips */}
                    {checkedDurations.map((duration, index) => (
                      <button
                        key={`duration-${index}`}
                        className="py-1 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-sm font-medium text-neutral-700 flex items-center gap-1 text-nowrap hover:bg-slate-100 transition-colors"
                        onClick={() => handleRemoveDuration(duration)}
                      >
                        <span className="pl-1">{duration}</span>
                        <IoIosClose size={20} className="text-neutral-500" />
                      </button>
                    ))}

                    {/* Institute chips */}
                    {checkedInstitutes.map((institute, index) => (
                      <button
                        key={`institute-${index}`}
                        className="py-1 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-sm font-medium text-neutral-700 flex items-center gap-1 text-nowrap hover:bg-slate-100 transition-colors"
                        onClick={() => handleRemoveInstitute(institute)}
                      >
                        <span className="pl-1">{institute}</span>
                        <IoIosClose size={20} className="text-neutral-500" />
                      </button>
                    ))}

                    {/* Career Level chips */}
                    {checkedCareerLevels.map((level, index) => (
                      <button
                        key={`level-${index}`}
                        className="py-1 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-sm font-medium text-neutral-700 flex items-center gap-1 text-nowrap hover:bg-slate-100 transition-colors"
                        onClick={() => handleRemoveCareerLevel(level)}
                      >
                        <span className="pl-1">{level}</span>
                        <IoIosClose size={20} className="text-neutral-500" />
                      </button>
                    ))}

                    {/* Search Query chip */}
                    {searchQuery && (
                      <button
                        className="py-1 px-2.5 rounded-md bg-blue-50 border border-blue-200 text-sm font-medium text-universal flex items-center gap-1 text-nowrap hover:bg-blue-100 transition-colors"
                        onClick={handleRemoveSearchQuery}
                      >
                        <span className="pl-1">Search: &ldquo;{searchQuery}&rdquo;</span>
                        <IoIosClose size={20} className="text-universal" />
                      </button>
                    )}

                    {/* Clear All button */}
                    <button
                      className="py-1 px-2.5 rounded-md bg-slate-50 border border-universal text-sm font-medium text-universal flex items-center gap-1 text-nowrap hover:bg-universal/5 transition-colors"
                      onClick={handleClearClose}
                    >
                      <span className="pl-1">Clear all</span>
                      <IoIosClose size={20} className="text-universal" />
                    </button>
                  </div>
                )}

                {/* Program Cards Grid */}
                {sortedPrograms.length > 0 ? (
                  <div className="w-full grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4 py-4">
                    {sortedPrograms.map((program, index) => (
                      <Program
                        program={program}
                        key={`${program.id}-${index}`}
                        setBrotureDownloadInfo={setBrotureDownloadInfo}
                        setOpen={setOpen}
                        getProgramStatus={getProgramStatus}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full py-20 flex flex-col items-center justify-center text-center">
                    <p className="text-lg font-medium text-neutral-600">
                      No programs match your selected filters.
                    </p>
                    <p className="text-sm text-neutral-400 mt-1">
                      Try clearing some filters to explore more programs.
                    </p>
                    <button
                      onClick={handleClearClose}
                      className="mt-4 px-5 py-2.5 bg-universal text-white font-medium text-sm rounded-lg hover:bg-universal/90 transition-colors"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </HomePageWrapper>

      {/* Show More Modal */}
      <FilterModal
        open={isFilterModalOpen}
        setOpen={setIsFilterModalOpen}
        title={modalConfig.title}
        categories={modalConfig.categories}
        checked={modalConfig.checked}
        handleChange={modalConfig.handleChange}
        setChecked={modalConfig.setChecked}
        setModalCategory={setModalCategory}
      />

      {/* Mobile Filters Drawer */}
      <FilterPageDrawer
        isOpen={isOpen}
        onClose={onClose}
        categories={filterOptions.categories}
        skills={filterOptions.skills}
        durations={filterOptions.durations}
        institutes={filterOptions.institutes}
        careerLevels={filterOptions.careerLevels}
        onInterestsChange={handleCategoryChange}
        onSkillsChange={handleTagChange}
        onDurationsChange={handleDurationChange}
        onInstitutesChange={handleInstituteChange}
        onCareerLevelsChange={handleCareerLevelChange}
      />

      {/* Brochure Modal */}
      {brotureDownloadInfo && (
        <DownloadBrochure
          open={open}
          handleClose={handleClose}
          source={brotureDownloadInfo.brochure?.source}
          campaign_name={brotureDownloadInfo.brochure?.campaign_name}
          program={brotureDownloadInfo.category}
          pdf={brotureDownloadInfo.brochure?.pdf}
          image={brotureDownloadInfo.brochureHeader}
        />
      )}
    </>
  );
};

export default function SearchedPage() {
  return (
    <Suspense fallback={null}>
      <SearchedPageInner />
    </Suspense>
  );
}