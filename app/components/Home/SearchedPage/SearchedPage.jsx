"use client";
import { useEffect, useState, useMemo, useRef, useCallback, Suspense } from "react";
import PROGRAMS from "../../Assets/programs.json";
import "../Programs/Programs.css";
import Program from "./Program";
import ProgramFilters from "../../Inputs/Filters/ProgramFilters";
import HomePageWrapper from "../../Wrapper/HomePageWrapper";
import FilterModal from "../../Modals/FilterModal/FilterModal";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector, useStore } from "react-redux";
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
import Select from "react-select";

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "duration_asc", label: "Duration: Shortest to Longest" },
  { value: "duration_desc", label: "Duration: Longest to Shortest" },
];

const sortSelectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "36px",
    height: "36px",
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "#1A73E8" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(26, 115, 232, 0.2)" : "none",
    "&:hover": {
      borderColor: state.isFocused ? "#1A73E8" : "#9ca3af",
    },
    fontSize: "0.875rem",
    fontWeight: 500,
    backgroundColor: "white",
    cursor: "pointer",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 10px",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#262626",
    fontSize: "0.875rem",
    fontWeight: 500,
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    padding: "4px 8px",
    color: "#737373",
    transition: "transform 0.2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    "&:hover": {
      color: "#262626",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.5rem",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    zIndex: 50,
    overflow: "hidden",
    minWidth: "220px",
  }),
  menuList: (base) => ({
    ...base,
    padding: "4px 0",
  }),
  option: (base, state) => ({
    ...base,
    fontSize: "0.875rem",
    fontWeight: state.isSelected ? 600 : 500,
    backgroundColor: state.isSelected
      ? "#1A73E8"
      : state.isFocused
        ? "#EFF6FF"
        : "white",
    color: state.isSelected ? "white" : "#262626",
    cursor: "pointer",
    padding: "8px 12px",
    "&:active": {
      backgroundColor: "#1A73E8",
      color: "white",
    },
  }),
};


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

const serializeFilterState = ({
  categories = [],
  tags = [],
  durations = [],
  institutes = [],
  careerLevels = [],
  search = "",
  sort = "relevance",
}) => {
  const params = new URLSearchParams();
  if (categories.length > 0) params.set("interest", categories.join(","));
  if (tags.length > 0) params.set("skills", tags.join(","));
  if (durations.length > 0) params.set("duration", durations.join(","));
  if (institutes.length > 0) params.set("institute", institutes.join(","));
  if (careerLevels.length > 0) params.set("careerLevel", careerLevels.join(","));
  if (search) params.set("q", search);
  if (sort && sort !== "relevance") params.set("sort", sort);
  return params.toString();
};

function UrlParamsListener({ onUrlChange }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    onUrlChange(searchParams);
  }, [searchParams, onUrlChange]);
  return null;
}

const SearchedPageInner = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const {
    checkedCategories = [],
    checkedTags = [],
    checkedDurations = [],
    checkedInstitutes = [],
    checkedCareerLevels = [],
  } = useSelector((state) => state.program);

  const { getProgramStatus } = useProgramStatuses();
  const [modalCategory, setModalCategory] = useState(null);
  const isFilterModalOpen = Boolean(modalCategory);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [brotureDownloadInfo, setBrotureDownloadInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const [urlParams, setUrlParams] = useState(null);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Synchronization refs:
  // 1. Gating flag: ensures initial URL parameters are parsed BEFORE any outgoing sync can overwrite them.
  const isInitializedFromUrlRef = useRef(false);
  // 2. Track the latest pushed query string
  const lastPushedQueryRef = useRef("");
  // 3. Track in-flight pushed queries to safely handle rapid consecutive clicks and asynchronous router.replace
  const pendingPushesRef = useRef(new Set());

  // Extract available filter options dynamically
  const filterOptions = useMemo(() => getAvailableFilterOptions(PROGRAMS), []);

  const handleClose = () => setOpen(false);

  // Parse URL query parameters into Redux state
  const parseUrlParams = useCallback(
    (paramsToParse) => {
      if (!paramsToParse) return;
      const {
        categories: urlCategories,
        tags: urlTags,
        durations: urlDurations,
        institutes: urlInstitutes,
        careerLevels: urlCareerLevels,
        search: urlSearch,
        sort: urlSort,
      } = parseUrlFilterParams(paramsToParse);

      const current = store.getState().program || {};

      if (!areArraysEqual(urlCategories, current.checkedCategories)) {
        dispatch(programActions.setCheckedCategories(urlCategories));
      }
      if (!areArraysEqual(urlTags, current.checkedTags)) {
        dispatch(programActions.setCheckedTags(urlTags));
      }
      if (!areArraysEqual(urlDurations, current.checkedDurations)) {
        dispatch(programActions.setCheckedDurations(urlDurations));
      }
      if (!areArraysEqual(urlInstitutes, current.checkedInstitutes)) {
        dispatch(programActions.setCheckedInstitutes(urlInstitutes));
      }
      if (!areArraysEqual(urlCareerLevels, current.checkedCareerLevels)) {
        dispatch(programActions.setCheckedCareerLevels(urlCareerLevels));
      }
      const parsedSearch = (urlSearch || "").trim();
      const validSort = ["relevance", "duration_asc", "duration_desc"].includes(urlSort)
        ? urlSort
        : "relevance";
      queueMicrotask(() => {
        setSearchQuery((prev) => (prev !== parsedSearch ? parsedSearch : prev));
        setSortBy((prev) => (prev !== validSort ? validSort : prev));
      });
    },
    [dispatch, store]
  );

  const handleClickOpenFilterDrawer = () => onOpen();

  // Sync Redux state to URL parameters
  const updateUrlParams = useCallback(() => {
    // DO NOT allow outgoing sync until initial URL parameters have been processed
    if (!isInitializedFromUrlRef.current || !urlParams) return;

    const targetQueryString = serializeFilterState({
      categories: checkedCategories,
      tags: checkedTags,
      durations: checkedDurations,
      institutes: checkedInstitutes,
      careerLevels: checkedCareerLevels,
      search: searchQuery,
      sort: sortBy,
    });

    const currentUrlQueryString = urlParams.toString();

    // Already in sync with browser URL
    if (targetQueryString === currentUrlQueryString) {
      return;
    }

    // Register this query as an in-flight push generated by our filter state
    pendingPushesRef.current.add(targetQueryString);
    lastPushedQueryRef.current = targetQueryString;

    router.replace(`/programs${targetQueryString ? `?${targetQueryString}` : ""}`, {
      scroll: false,
    });
  }, [
    urlParams,
    router,
    checkedCategories,
    checkedTags,
    checkedDurations,
    checkedInstitutes,
    checkedCareerLevels,
    searchQuery,
    sortBy,
  ]);

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

  // Perform multi-facet filtering derived directly during render
  const filteredArray = useMemo(() => {
    const hasActiveFilters =
      checkedCategories.length > 0 ||
      checkedTags.length > 0 ||
      checkedDurations.length > 0 ||
      checkedInstitutes.length > 0 ||
      checkedCareerLevels.length > 0 ||
      Boolean(searchQuery);

    if (!hasActiveFilters) {
      return PROGRAMS;
    }

    return filterPrograms(PROGRAMS, {
      interests: checkedCategories,
      skills: checkedTags,
      durations: checkedDurations,
      institutes: checkedInstitutes,
      careerLevels: checkedCareerLevels,
      searchQuery,
    });
  }, [
    checkedCategories,
    checkedTags,
    checkedDurations,
    checkedInstitutes,
    checkedCareerLevels,
    searchQuery,
  ]);

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
    setSearchQuery("");
  };

  const handleClearClose = () => {
    dispatch(programActions.clearAllFilters());
    setSortBy("relevance");
    setSearchQuery("");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // Incoming URL Sync (Initial Load & Genuine External Navigation like Browser Back/Forward)
  useEffect(() => {
    if (!urlParams) return;

    const currentQuery = urlParams.toString();

    // 1. Initial Load: Parse URL params into Redux, mark initialized, and seed tracking
    if (!isInitializedFromUrlRef.current) {
      parseUrlParams(urlParams);
      isInitializedFromUrlRef.current = true;
      lastPushedQueryRef.current = currentQuery;
      return;
    }

    // 2. Check if this URL update was generated by our own router.replace()
    if (pendingPushesRef.current.has(currentQuery)) {
      pendingPushesRef.current.delete(currentQuery);
      // If this was an older in-flight push and a newer push is already the latest, do not dispatch!
      if (currentQuery !== lastPushedQueryRef.current) {
        return;
      }
      // Redux is already in sync with the latest push; do not re-dispatch
      return;
    }

    // 3. Genuine external navigation (Browser Back, Forward, or Navbar deep-link)
    lastPushedQueryRef.current = currentQuery;
    parseUrlParams(urlParams);
  }, [urlParams, parseUrlParams]);

  // Outgoing Redux -> URL Sync
  useEffect(() => {
    updateUrlParams();
  }, [
    updateUrlParams,
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
      handleChange: () => { },
      setChecked: () => { },
    };
  };

  const modalConfig = getModalConfig();

  return (
    <>
      <Suspense fallback={null}>
        <UrlParamsListener onUrlChange={setUrlParams} />
      </Suspense>
      <HomePageWrapper>
        <div className="search-page w-full min-h-screen pt-24 pb-8 md:py-8 flex justify-center font-circular xl:px-12 px-4">
          <div className="max-w-[85rem] w-full">
            <div className="mb-4 md:mb-6 pt-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Explore Executive Certification Programs
              </h1>
              <p className="text-neutral-600 text-sm sm:text-base mt-1.5">
                Discover world-class certification programs in AI, leadership, strategy and management from leading IIMs, IITs, XLRI & many more.
              </p>
            </div>
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
                      className="text-sm font-medium text-neutral-600 whitespace-nowrap"
                    >
                      Sort by:
                    </label>
                    <div className="w-[220px]">
                        <Select
                          id="program-sort-select"
                        instanceId="program-sort-select"
                        value={
                          SORT_OPTIONS.find((opt) => opt.value === sortBy) ||
                          SORT_OPTIONS[0]
                        }
                        onChange={(selected) => {
                          setSortBy(selected?.value || "relevance");
                        }}
                        options={SORT_OPTIONS}
                        isSearchable={false}
                        isClearable={false}
                        styles={sortSelectStyles}
                      />
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
        setOpen={(isOpen) => {
          if (!isOpen) setModalCategory(null);
        }}
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
  return <SearchedPageInner />;
}