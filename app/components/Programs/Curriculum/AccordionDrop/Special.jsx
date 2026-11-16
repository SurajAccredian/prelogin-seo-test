"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

const Special = ({
  curriculum,
  index,
  expanded,
  handleChange,
  level = 0,
  isLast = false,
}) => {
  const panelId = `panel-special-${index}-${level}`;
  const isExpanded = Boolean(expanded[panelId]);

  return (
    <div key={index} className="w-full font-circular">
      <button
        type="button"
        onClick={(e) => handleChange(panelId)(e, !isExpanded)}
        className="w-full flex items-center justify-between gap-2 py-4 px-6 text-left transition select-none cursor-pointer hover:bg-gray-50/50"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-sm md:text-base font-semibold text-gray-900">
            <span className="font-bold">Project {index}</span> : {curriculum?.title}
          </h3>
          <span className="text-xs whitespace-nowrap font-normal max-md:hidden text-gray-500">
            <span className="text-orange-500 mr-2">•</span>
            Featured
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform duration-300 flex-shrink-0 ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-4 pt-1">
            <div className="flex flex-col pl-3 sm:pl-4">
              {curriculum?.points?.map((point, pIndex) => {
                const isPointLast = pIndex === curriculum.points.length - 1;
                return (
                  <div
                    key={pIndex}
                    className="relative flex items-start gap-4 pb-5 last:pb-1"
                  >
                    {!isPointLast && (
                      <span
                        className="absolute left-[3px] top-2.5 -bottom-1 w-[1px] bg-[#bdbdbd]"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative z-10 w-[7px] h-[7px] rounded-full bg-[#1A73E8] ring-2 ring-white flex-shrink-0 mt-1.5" />
                    <p className="text-sm font-normal text-gray-600 leading-relaxed font-circular">
                      {point}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {!isLast && <div className="mx-6 border-b border-gray-200" />}
    </div>
  );
};

export default Special;
