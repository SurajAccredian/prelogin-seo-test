"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { groupProgramsByCategory, sortVerticalProgramsByStatus } from "../../../helpers/common.helpers";
import programs from "../../Assets/programs.json";
import Drawer from "../../ui/Drawer";
import { Clock, MapPin, X, ChevronDown } from "lucide-react";
import { STREAMS } from "../../Assets/constants";
import { useProgramStatuses } from "../../../helpers/useProgramStatuses";

// Define management subcategories
const MANAGEMENT_SUBCATEGORIES = [
  "senior management",
  "general management",
  "business management",
];

const sortedStreams = (() => {
  const list = STREAMS.slice()
    .filter((val) => val.category.toLowerCase() !== "free courses")
    .sort((a, b) => a.order - b.order);

  const microsoftIndex = list.findIndex(
    (val) => val.category.toLowerCase() === "microsoft"
  );
  if (microsoftIndex !== -1) {
    const [microsoftStream] = list.splice(microsoftIndex, 1);
    const pgDiplomaIndex = list.findIndex(
      (val) => val.category.toLowerCase() === "pg diploma"
    );
    list.splice(pgDiplomaIndex + 1, 0, microsoftStream);
  }
  return list;
})();

const ExploreDrawer = ({ isOpen, onClose }) => {
  const { getProgramStatus } = useProgramStatuses();
  const [openAccordion, setOpenAccordion] = useState(false);
  const categorizedPrograms = useMemo(() => {
    const fetchPrograms = groupProgramsByCategory(programs);
    return sortVerticalProgramsByStatus(fetchPrograms) || {};
  }, []);

  const managementSubcategories = useMemo(() => {
    return MANAGEMENT_SUBCATEGORIES.filter((subcat) => {
      const progs = categorizedPrograms[subcat.toLowerCase()];
      return progs && progs.length > 0;
    });
  }, [categorizedPrograms]);

  const [userSelectedSubcategory, setUserSelectedSubcategory] = useState("");
  const activeManagementSubcategory =
    userSelectedSubcategory && managementSubcategories.includes(userSelectedSubcategory)
      ? userSelectedSubcategory
      : managementSubcategories[0] || "";

  // Check if there are any management programs at all
  const hasManagementPrograms = managementSubcategories.length > 0;

  // SORT categories based on stream order and prepare for management insertion
  const getVerticalsList = () => {
    const verticals = [];

    sortedStreams.forEach((stream) => {
      // Skip management subcategories in main list
      if (MANAGEMENT_SUBCATEGORIES.includes(stream.category.toLowerCase())) {
        return;
      }

      const key = stream.category.toLowerCase();
      const items = categorizedPrograms[key] || [];

      if (items.length > 0) {
        verticals.push({
          type: "regular",
          category: stream.category,
          items: items,
          order: stream.order,
        });
      }
    });

    // Insert management vertical at position 4 (index 3)
    if (hasManagementPrograms) {
      const insertPosition = Math.min(3, verticals.length);

      verticals.splice(insertPosition, 0, {
        type: "management",
        category: "Management",
        subcategories: managementSubcategories,
        items: [], // Items handled dynamically via state
      });
    }

    return verticals;
  };

  const sortedCategories = getVerticalsList();

  const toggleAccordion = (category) => {
    setOpenAccordion(openAccordion === category ? null : category);
  };

  const handleClose = () => {
    onClose();
    setOpenAccordion(null);
  };

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={handleClose}
      className="w-full max-w-[420px] h-screen p-5 overflow-y-auto custom-scrollbar"
    >
      <div className="flex justify-between items-center mb-4">
        {/* Header */}
        <h2 className="text-lg font-semibold text-gray-900">
          Courses
        </h2>
        <button
          onClick={handleClose}
          type="button"
          aria-label="Close drawer"
          className="p-1 hover:bg-gray-100 rounded-full transition"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Domains */}
      <h3 className="text-2xl font-semibold text-black mb-3">
        Domains
      </h3>

      {/* Accordions */}
      <div className="divide-y divide-[#e5e5e5]">
        {sortedCategories.map(({ category, items, type, subcategories }) => {
          const isActive = openAccordion === category;

          return (
            <div key={category} className="bg-white">
              <button
                type="button"
                onClick={() => toggleAccordion(category)}
                className="w-full py-3 flex items-center justify-between text-left transition"
              >
                <span className="text-[16px] font-medium text-[#222] capitalize">
                  {category}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                    isActive ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pl-1.5 pr-0 pb-4">
                    {/* Section title */}
                    <h4 className="text-[12px] font-bold text-[#444] mt-2 mb-2 uppercase tracking-wide">
                      {category} PROGRAMS
                    </h4>

                    {/* Management Tabs */}
                    {type === "management" && (
                      <div className="flex items-center gap-3 mb-4 overflow-x-auto custom-scrollbar pb-2">
                        {subcategories.map((subcat) => (
                          <button
                            key={subcat}
                            type="button"
                            onClick={() => setUserSelectedSubcategory(subcat)}
                            className={`capitalize px-3 py-1 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
                              activeManagementSubcategory === subcat
                                ? "bg-[#1a73e8] text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {subcat}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Program list */}
                    {(type === "management"
                      ? categorizedPrograms[activeManagementSubcategory?.toLowerCase()] || []
                      : items
                    ).map((item, index) => {
                      const val = item;
                      return (
                        <a
                          href={
                            val.category?.toLowerCase() === "free courses" ||
                            val.category?.toLowerCase() === "microsoft" ||
                            val.id === "transform-business-workflows-with-generative-ai" ||
                            val.id === "transform-ideas-into-impact-with-product-management"
                              ? `/free-courses/${val.id}`
                              : `/programs/${val.id}`
                          }
                          className="w-full block"
                          key={index}
                        >
                          <div className="relative flex mb-4 flex-col px-2 py-2 h-full min-h-[120px] transition-all duration-300 cursor-pointer overflow-hidden group bg-card rounded hover:bg-accent/5 hover:bg-blue-500/5 shadow-sm border border-transparent hover:border-gray-100">
                            {/* Blue Line */}
                            <div className="absolute top-0 left-0 h-[3px] bg-[#1a73e8] w-0 transition-all duration-300 ease-out group-hover:w-full"></div>
                            {/* TOP SECTION */}
                            <div>
                              <div className="mb-3">
                                <div className="flex ml-1 items-center gap-3">
                                  {val.university_image && (
                                    <Image
                                      src={val.university_image}
                                      alt={val.university_name || "University logo"}
                                      width={24}
                                      height={24}
                                      quality={75}
                                      className="w-6 h-6 object-contain flex-shrink-0"
                                    />
                                  )}
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
                                  <div className="flex items-center gap-0.5 whitespace-nowrap">
                                    <Clock className="w-4 h-4" />
                                    <span>{val.duration}</span>
                                  </div>
                                )}
                                {val.batch_type && (
                                  <div className="flex items-center gap-0.5 whitespace-nowrap">
                                    <MapPin className="w-4 h-4" />
                                    <span>{val.batch_type}</span>
                                  </div>
                                )}
                              </div>
                              {(() => {
                                const resolved = getProgramStatus
                                  ? getProgramStatus(val)
                                  : {
                                      status: val.status,
                                      isAdmissionClosed:
                                        val.status?.toLowerCase() === "admission closed",
                                    };
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Drawer>
  );
};

export default ExploreDrawer;
