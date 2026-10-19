import React, { useState } from "react";
import { STREAMS } from "../../Assets/constants";
import {
  groupProgramsByCategory,
  sortVerticalProgramsByStatus,
} from "../../../helpers/common.helpers";
import programs from "../../Assets/programs.json";
import { Clock, MapPin } from "lucide-react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Rcta from "../../cta/request_a_call_back";
import { useProgramStatuses } from "../../../helpers/useProgramStatuses";

// Computed at module level (pure function of static JSON) so the menu links
// are part of the server-rendered HTML that crawlers read.
const MANAGEMENT_SUBCATEGORIES = [
  "senior management",
  "general management",
  "business management",
];

const CATEGORIZED_PROGRAMS = sortVerticalProgramsByStatus(
  groupProgramsByCategory(programs),
);

const MANAGEMENT_AVAILABLE = MANAGEMENT_SUBCATEGORIES.filter(
  (subcat) => CATEGORIZED_PROGRAMS[subcat]?.length > 0,
);

const SORTED_STREAMS = STREAMS.slice()
  .filter(
    (val) =>
      !MANAGEMENT_SUBCATEGORIES.includes(val.category.toLowerCase()) &&
      val.category.toLowerCase() !== "free courses",
  )
  .sort((a, b) => a.order - b.order);

// Move Microsoft to right after PG Diploma
const microsoftIndex = SORTED_STREAMS.findIndex(
  (val) => val.category.toLowerCase() === "microsoft",
);
if (microsoftIndex !== -1) {
  const [microsoftStream] = SORTED_STREAMS.splice(microsoftIndex, 1);
  const pgDiplomaIndex = SORTED_STREAMS.findIndex(
    (val) => val.category.toLowerCase() === "pg diploma",
  );
  SORTED_STREAMS.splice(pgDiplomaIndex + 1, 0, microsoftStream);
}

const VERTICALS_LIST = (() => {
  const verticals = SORTED_STREAMS.filter(
    (stream) => CATEGORIZED_PROGRAMS[stream.category.toLowerCase()]?.length > 0,
  ).map((stream) => ({
    type: "regular",
    category: stream.category,
    order: stream.order,
  }));

  // Insert management vertical at position 4 (index 3)
  if (MANAGEMENT_AVAILABLE.length > 0) {
    verticals.splice(Math.min(3, verticals.length), 0, {
      type: "management",
      category: "Management",
      subcategories: MANAGEMENT_AVAILABLE,
    });
  }
  return verticals;
})();

// One panel per category / management subcategory. All are rendered in the
// DOM (inactive ones hidden) so every program link is in the server HTML.
const PANELS = [
  ...VERTICALS_LIST.filter((v) => v.type === "regular").map((v) => ({
    key: v.category.toLowerCase(),
    programs: CATEGORIZED_PROGRAMS[v.category.toLowerCase()],
  })),
  ...MANAGEMENT_AVAILABLE.map((subcat) => ({
    key: `management:${subcat}`,
    programs: CATEGORIZED_PROGRAMS[subcat],
  })),
];

const ExpTail = ({ isDropdownOpen, setIsDropdownOpen }) => {
  const { getProgramStatus } = useProgramStatuses();
  const [sideTab, setSideTab] = useState("pg diploma");
  const [cta, setCta] = useState(false);
  const [selectedManagementSubcategory, setSelectedManagementSubcategory] =
    useState(MANAGEMENT_AVAILABLE[0] || "");

  const handleClickOpenRcb = () => {
    setCta(true);
  };

  const RcbhandleClose = () => {
    setCta(false);
  };

  const isManagementView = sideTab.toLowerCase() === "management";
  const activePanelKey = isManagementView
    ? `management:${selectedManagementSubcategory}`
    : sideTab.toLowerCase();

  const currentProgramsCount =
    PANELS.find((panel) => panel.key === activePanelKey)?.programs.length || 0;
  const showImage = currentProgramsCount <= 2;

  const verticalsList = VERTICALS_LIST;
  const managementSubcategories = MANAGEMENT_AVAILABLE;

  return (
    <>
      {/* Opens via CSS group-hover so it works before hydration; state keeps it in sync after. */}
      <div
        className={`absolute top-[100%] left-0 right-0 w-full h-screen flex justify-center items-start bg-black/60 pointer-events-none ${
          isDropdownOpen ? "visible opacity-100" : "invisible opacity-0"
        } group-hover/courses:visible group-hover/courses:opacity-100 transition-all duration-150 px-4 xl:px-12`}
      >
        <div
          className="max-w-[85rem] border-t h-[70vh] max-h-[470px] px-2 rounded-b-md overflow-visible bg-white w-full flex relative pointer-events-auto"
          onMouseEnter={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(true);
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(false);
          }}
        >
          {/* Left Sidebar */}
          <div className="w-fit h-full bg-white">
            <div className="w-full flex flex-col gap-1 max-h-[470px] h-[70vh] overflow-y-auto custom-scrollbar py-4 px-3">
              {verticalsList.map((vertical, index) => {
                if (vertical.type === "regular") {
                  const isActive =
                    sideTab.toLowerCase() === vertical.category.toLowerCase();
                  return (
                    <div
                      key={index}
                      className={`
                        w-[250px] flex items-center justify-between 
                        px-2.5 py-4 cursor-pointer transition-all 
                        rounded-md
                        border-b 
                        ${isActive ? "text-universal font-bold" : "text-gray-600"}
                      `}
                      onMouseEnter={() => setSideTab(vertical.category)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] capitalize leading-none">
                          {vertical.category}
                        </span>
                      </div>
                      <div className="w-6 h-6 flex-shrink-0 p-1 flex items-center justify-center">
                        <HiOutlineArrowNarrowRight className="w-full h-full" />
                      </div>
                    </div>
                  );
                } else if (vertical.type === "management") {
                  const isActive = isManagementView;
                  return (
                    <div
                      key={index}
                      className={`
                        w-[250px] flex items-center justify-between 
                        px-2.5 py-4 cursor-pointer transition-all 
                        rounded-md
                        border-b 
                        ${isActive ? "text-universal font-bold" : "text-gray-600"}
                      `}
                      onMouseEnter={() => setSideTab("Management")}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] capitalize leading-none">
                          Management
                        </span>
                      </div>
                      <div className="w-6 h-6 flex-shrink-0 p-1 flex items-center justify-center">
                        <HiOutlineArrowNarrowRight className="w-full h-full" />
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 py-[26px] flex gap-4 overflow-hidden">
            {/* Programs Grid */}
            <div className="w-full">
              <div className="flex flex-col gap-2 mx-2">
                <h2 className="font-bold text-xl capitalize leading-none">
                  {sideTab === "cxo leadership"
                    ? "CXO Leadership"
                    : sideTab === "pg diploma"
                      ? "PG Diploma"
                      : sideTab}
                </h2>

                {isManagementView && (
                  <div className="flex items-center gap-4 mt-2 border-b border-gray-200">
                    {managementSubcategories.map((subcat) => (
                      <button
                        key={subcat}
                        onClick={() => setSelectedManagementSubcategory(subcat)}
                        className={`capitalize pb-2 text-sm font-medium transition-all ${
                          selectedManagementSubcategory === subcat
                            ? "text-universal border-b-2 border-universal"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {subcat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {PANELS.map((panel) => (
              <div
                key={panel.key}
                className={`${panel.key === activePanelKey ? "grid" : "hidden"} w-full grid-cols-1 lg:grid-cols-3 gap-y-8 gap-x-6 mt-4 px-2 py-2 max-h-[380px] h-[55vh] overflow-y-auto custom-scrollbar items-start`}
              >
                {panel.programs.map((item, index) => {
                  // Render program card
                  const val = item;
                  return (
                    <a
                      href={val.category?.toLowerCase() === "free courses" || val.category?.toLowerCase() === "microsoft" || val.id === "transform-business-workflows-with-generative-ai" || val.id === "transform-ideas-into-impact-with-product-management" ? `/free-courses/${val.id}` : `/programs/${val.id}`}
                      className="w-[95%]"
                      key={index}
                      type="div"
                    >
                      <div className="relative flex flex-col px-2 py-2 min-h-[120px] transition-all duration-300 cursor-pointer overflow-hidden group bg-card rounded hover:bg-accent/5 hover:bg-blue-500/5">
                        {/* Blue Line */}
                        <div className="absolute top-0 left-0 h-[3px] bg-[#1a73e8] w-0 transition-all duration-300 ease-out group-hover:w-full"></div>
                        {/* TOP SECTION */}
                        <div>
                          <div className="mb-3">
                            <div className="flex ml-1 items-center gap-3">
                              <img
                                src={val.university_image}
                                alt={val.university_name}
                                className="w-6 h-6 object-contain flex-shrink-0"
                                loading="lazy"
                                decoding="async"
                              />
                              <p className="text-[13px] font-medium text-gray-700">
                                {val.university_name}
                              </p>
                            </div>
                            <h3 className="font-semibold ml-1 text-[14px] max-w-[90%] w-full leading-tight mt-1">
                              {val.program_name}
                            </h3>
                          </div>
                        </div>
                        {/* BOTTOM SECTION */}
                        <div className="border-t border-gray-100 pt-2 ml-1 max-w-[96%] w-full flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            {val.duration && (
                              <div className="flex items-center gap-0.5 text-nowrap">
                                <Clock className="w-4 h-4" />
                                <span>{val.duration}</span>
                              </div>
                            )}
                            {val.batch_type && (
                              <div className="flex items-center gap-0.5 text-nowrap">
                                <MapPin className="w-4 h-4" />
                                <span>{val.batch_type}</span>
                              </div>
                            )}
                          </div>
                          {(() => {
                            const resolved = getProgramStatus ? getProgramStatus(val) : { status: val.status, isAdmissionClosed: val.status?.toLowerCase() === "admission closed" };
                            return (
                              <span
                                className={`px-3 py-1 rounded-full text-xs ${
                                  resolved.isAdmissionClosed
                                    ? "bg-red-100 text-red-500"
                                    : "text-[#3366ff] bg-[#e8f0ff]"
                                } whitespace-nowrap capitalize`}
                              >
                                {resolved.status}
                              </span>
                            );
                          })()}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
              ))}
            </div>
          </div>

          {/* Custom CTA Component - Bottom Right Corner - Desktop Only (xl and above) */}
          {showImage && (
            <div className="hidden xl:block absolute bottom-0 right-0 z-50">
              <div className="flex rounded-l-2xl overflow-hidden shadow-lg bg-white w-[400px] h-[180px]">
                {/* Left side - Content section */}
                <div className="relative flex flex-col items-center justify-center gap-2 pl-4 flex-1 bg-universal/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-50" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-lg text-gray-600 font-medium">
                        Need Help?
                      </span>
                    </div>

                    <h3 className="text-[22px] font-semibold text-gray-900 mb-4">
                      Get Course Advice
                    </h3>

                    <button
                      onClick={handleClickOpenRcb}
                      className="bg-universal text-white text-[16px] font-medium px-4 py-1 rounded-full transition-all duration-200 hover:scale-[1.02] w-fit"
                    >
                      Talk to Program Expert
                    </button>
                  </div>
                </div>

                {/* Right side - Image section */}
                <div className="relative w-40 bg-universal/5">
                  <img
                    src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/customer-care-indian-hero-section-image-removebg-preview.webp"
                    alt="Expert counselor"
                    className="h-full w-full object-cover object-top"
                    lazyload="true"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Rcta open={cta} handleClose={RcbhandleClose} />
    </>
  );
};

export default ExpTail;
