"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

const Ordinary = ({
  curriculum,
  index,
  handleChange,
  expanded,
  type,
  id,
  level = 0,
  isLast = false,
}) => {
  const hasPoints =
    Array.isArray(curriculum?.points) && curriculum.points.length > 0;

  if (!hasPoints || type === "masterclass") {
    // Render just the header layout if no points or if it's a masterclass
    return (
      <div key={index} className="w-full font-circular">
        <div
          className="w-full flex flex-col justify-center gap-1 py-4"
          style={{ paddingLeft: level === 0 ? "1.5rem" : "0.5rem", paddingRight: "1.5rem" }}
        >
          <div className="flex items-center gap-2">
            <h3 className="text-sm md:text-base font-semibold text-gray-900">
              {curriculum?.title}
            </h3>
            {curriculum?.week && (
              <span className="text-xs font-normal max-md:hidden whitespace-nowrap text-gray-500">
                <span className="text-green-500 mr-2">•</span>
                {curriculum?.week}
              </span>
            )}
          </div>
        </div>
        {!isLast && <div className="mx-6 border-b border-gray-200" />}
      </div>
    );
  }

  const panelId = id ? `${id}-${level}` : `panel${index}-${level}`;
  const isExpanded = Boolean(expanded[panelId]);

  const titlePrefixMatch =
    level === 0 &&
    type !== "masterclass" &&
    curriculum?.title?.match(
      /^((?:Module|Term|Pillar)\s+\d+(?:\s*[:\-–]\s*|\s+))(.*)$/i
    );

  return (
    <div key={index} className="w-full font-circular">
      <button
        type="button"
        onClick={(e) => handleChange(panelId)(e, !isExpanded)}
        className="w-full flex items-center justify-between gap-2 py-4 text-left transition select-none cursor-pointer hover:bg-gray-50/50"
        style={{ paddingLeft: level === 0 ? "1.5rem" : "2rem", paddingRight: "1.5rem" }}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-sm md:text-base font-semibold text-gray-900">
            {titlePrefixMatch ? (
              <>
                <span className="font-bold">{titlePrefixMatch[1]}</span>
                {titlePrefixMatch[2]}
              </>
            ) : (
              <>
                {level === 0 && type !== "masterclass" && (
                  <span className="font-bold">
                    {type === "term"
                      ? "Term"
                      : type === "pillar"
                      ? "Pillar"
                      : "Module"}{" "}
                    {index} :{" "}
                  </span>
                )}
                {curriculum?.title}
              </>
            )}
          </h3>
          {curriculum?.week && (
            <span className="text-xs font-normal max-md:hidden whitespace-nowrap text-gray-500">
              <span className="text-green-500 mr-2">•</span>
              {curriculum?.week}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {curriculum?.points && level === 0 && (
            <h4 className="max-md:hidden whitespace-nowrap text-sm text-gray-500 font-normal">
              {curriculum?.points.length}{" "}
              {type === "term"
                ? "Modules"
                : type === "pillar"
                ? "Modules"
                : "Topics"}
            </h4>
          )}
          <ChevronDown
            className={`w-5 h-5 text-gray-600 transition-transform duration-300 flex-shrink-0 ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </button>

      {/* Expandable Stepper Content with smooth transition */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-4 pt-1">
            <div className="flex flex-col pl-3 sm:pl-4">
              {curriculum?.points.map((point, i) => {
                if (typeof point === "object") {
                  return (
                    <Ordinary
                      key={i}
                      curriculum={point}
                      expanded={expanded}
                      handleChange={handleChange}
                      index={i + 1}
                      level={level + 1}
                      id={id}
                      isLast={i === curriculum.points.length - 1}
                    />
                  );
                } else {
                  const isPointLast = i === curriculum.points.length - 1;
                  return (
                    <div
                      key={i}
                      className="relative flex items-start gap-4 pb-5 last:pb-1"
                    >
                      {/* Vertical connector line connecting steps */}
                      {!isPointLast && (
                        <span
                          className="absolute left-[3px] top-2.5 -bottom-1 w-[1px] bg-[#bdbdbd]"
                          aria-hidden="true"
                        />
                      )}
                      {/* Stepper Bullet - delicate 7px dot */}
                      <div className="relative z-10 w-[7px] h-[7px] rounded-full bg-[#1A73E8] ring-2 ring-white flex-shrink-0 mt-1.5" />
                      {/* Step Text */}
                      <p className="text-sm font-normal text-gray-600 leading-relaxed font-circular">
                        {point}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Inset Divider Line */}
      {!isLast && <div className="mx-6 border-b border-gray-200" />}
    </div>
  );
};

export default Ordinary;
