import React, { useState } from "react";
// import { AccordionDrop, SideForm } from '../'
import { useSelector } from "react-redux";
import AccordionDrop from "./AccordionDrop/AccordionDrop";
import SideForm from "./SideForm/SideForm";

const Curriculum = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data } = useSelector((state) => state.program);

  return (
    <div
      id="curriculum"
      className="program-accordion w-full flex justify-center py-12 xl:px-12 px-4"
    >
      <div className="w-full max-w-[85rem]">
        <div className="w-full flex items-center">
          <div className="flex-1 md:text-start text-center">
            <h4 className="text-base font-medium">
              Our <span className="text-universal">{data?.short_title}</span>{" "}
              Coursework
            </h4>
            <h1 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
              Explore our Comprehensive Program{" "}
              <span className="text-universal">Curriculum</span>
            </h1>
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
            className={`w-full ${
              data?.id === "executive-general-management-program"
                ? "mt-6"
                : 
                "mt-0"
            } flex gap-4`}
          >
            <div className="flex-1">
              <AccordionDrop
                type={data?.curriculum_type}
                curriculum={data?.curriculum}
                openAll={isExpanded}
                setOpenAll={setIsExpanded}
              />
            </div>
            <div className="flex-[0.5] hidden lg:flex justify-center px-8">
              <SideForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Curriculum;
