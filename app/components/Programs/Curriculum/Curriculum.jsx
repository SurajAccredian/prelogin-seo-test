import React, { useState } from "react";
// import { AccordionDrop, SideForm } from '../'
import { useSelector } from "react-redux";
import AccordionDrop from "./AccordionDrop/AccordionDrop";
import SideForm from "./SideForm/SideForm";
import PGDMHybridCurriculum from "./PGDMHybridCurriculum";

const Curriculum = ({ data: propData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const reduxProgram = useSelector((state) => state.program);
  const data = propData || reduxProgram.data;

  if (!data?.curriculum) {
    return (
      <div id="curriculum" className="program-accordion w-full flex justify-center py-12 xl:px-12 px-4">
        <div className="w-full max-w-[85rem] animate-pulse">
          <div className="h-4 w-48 bg-slate-200 rounded mb-3" />
          <div className="h-8 w-96 bg-slate-200 rounded mb-8" />
          <div className="w-full h-64 bg-slate-100 rounded-xl border border-slate-200" />
        </div>
      </div>
    );
  }

  const isCustomCurriculum =
    data?.id === "gim-hybrid-post-graduate-diploma-in-management" ||
    data?.id === "iim-kashipur-executive-post-graduate-diploma-program-in-business-management" ||
    data?.id === "iim-kashipur-executive-post-graduate-diploma-program-in-business-management-program" ||
    (data?.curriculum && !Array.isArray(data.curriculum) && !data.curriculum.coreModules);

  const courseworkTitle =
    data?.id === "gim-hybrid-post-graduate-diploma-in-management"
      ? "2 Year Hybrid PGDM"
      : data?.short_title?.trim() || "Program";

  return (
    <div
      id="curriculum"
      className="program-accordion w-full flex justify-center py-12 xl:px-12 px-4"
    >
      <div className="w-full max-w-[85rem]">
        <div className="w-full flex items-center">
          <div className="flex-1 md:text-start text-center">
            <h4 className="text-base font-medium">
              Our <span className="text-universal">{courseworkTitle}</span>{" "}
              Coursework
            </h4>
            <h2 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
              Explore our Comprehensive Program{" "}
              <span className="text-universal">Curriculum</span>
            </h2>
          </div>
        </div>

        {/* ✅ Show expand/collapse only if NOT general management */}
        {data?.id !== "executive-general-management-program" && (
          <div className="flex gap-4">
            <div className="flex-1 flex justify-end items-center gap-4 py-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-lg font-medium text-universal"
              >
                {isExpanded ? "Collapse" : "Expand"} all sections
              </button>
            </div>
            <div className="px-8 flex-[0.5] xl:block hidden" />
          </div>
        )}

        {data && (
          <div
            className={`w-full ${data?.id === "executive-general-management-program"
                ? "mt-6"
                :
                "mt-0"
              } flex gap-4`}
          >
            <div className="flex-1 min-w-0">
              {isCustomCurriculum ? (
                <PGDMHybridCurriculum
                  data={data}
                  curriculum={data?.curriculum}
                  openAll={isExpanded}
                  setOpenAll={setIsExpanded}
                />
              ) : (
                <AccordionDrop
                  data={data}
                  type={data?.curriculum_type}
                  curriculum={data?.curriculum}
                  openAll={isExpanded}
                  setOpenAll={setIsExpanded}
                />
              )}
            </div>
            <div className="flex-[0.5] hidden lg:flex justify-center px-8">
              <SideForm data={data} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Curriculum;
