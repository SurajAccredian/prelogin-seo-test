"use client";

import React, { useEffect, useState } from "react";
import Ordinary from "./Ordinary";
import Special from "./Special";
import { useSelector } from "react-redux";
import { ChevronDown } from "lucide-react";

export default function AccordionFilter({
  openAll,
  setOpenAll,
  curriculum = [],
  type = "modules",
  data: propData,
}) {
  const [expanded, setExpanded] = useState({});
  const reduxProgram = useSelector((state) => state.program);
  const data = propData || reduxProgram.data;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded((prevExpanded) => {
      const newExpanded = { ...prevExpanded, [panel]: isExpanded };
      const anyClosed = Object.values(newExpanded).some((exp) => !exp);
      if (anyClosed) {
        setOpenAll(false);
      }
      const allOpen = Object.values(newExpanded).every((exp) => exp);
      if (allOpen) {
        setOpenAll(true);
      }
      return newExpanded;
    });
  };

  useEffect(() => {
    const isSplit = curriculum && !Array.isArray(curriculum) && curriculum.coreModules;

    if (openAll && !isSplit) {
      const newExpanded = {};
      curriculum.forEach((curr, index) => {
        newExpanded[`panel${index}-0`] = true;
        newExpanded[`panel-special-${index}-0`] = true;
      });
      setExpanded(newExpanded);
    }

    if (openAll && isSplit) {
      const newExpanded = {};
      curriculum.coreModules.forEach((curr, index) => {
        newExpanded[`panel${index}-0`] = true;
      });

      Object.entries(curriculum)
        .slice(1)
        .forEach(([key, modules]) => {
          newExpanded[key] = true;
          modules.forEach((module, i) => {
            if (typeof module === "object") {
              newExpanded[`${key}-${i}-0`] = true;
            }
          });
        });

      setExpanded(newExpanded);
    }

    if (openAll === false && isSplit) {
      const newExpanded = {};
      curriculum.coreModules.forEach((curr, index) => {
        newExpanded[`panel${index}`] = false;
      });

      Object.entries(curriculum)
        .slice(1)
        .forEach(([key]) => {
          newExpanded[key] = false;
        });
      setExpanded(newExpanded);
    }

    if (openAll === false && !isSplit) {
      const newExpanded = {};
      curriculum.forEach((curr, index) => {
        newExpanded[`panel${index}`] = false;
      });

      setExpanded(newExpanded);
    }
  }, [openAll, curriculum]);

  const isSplit = curriculum && !Array.isArray(curriculum) && curriculum.coreModules;

  let termIndex = 1;
  let specialIndex = 1;

  return (
    <>
      {isSplit ? (
        <>
          <div className="sm:text-2xl text-xl text-universal p-4 pt-0 font-bold font-circular">
            {data?.id === "global-senior-leadership-program"
              ? "Core Modules"
              : "Curriculum"}
          </div>

          <div className="rounded-lg bg-white border border-[#dedede] shadow-sm overflow-hidden font-circular">
            {curriculum.coreModules.map((curr, index) => {
              const isLast = index === curriculum.coreModules.length - 1;
              return (
                <div key={index}>
                  {curr?.special ? (
                    <Special
                      curriculum={curr}
                      index={specialIndex++}
                      handleChange={handleChange}
                      expanded={expanded}
                      isLast={isLast}
                    />
                  ) : (
                    <Ordinary
                      curriculum={curr}
                      index={termIndex++}
                      handleChange={handleChange}
                      expanded={expanded}
                      type={type}
                      id={`panel${index}`}
                      isLast={isLast}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="sm:text-2xl text-xl text-universal p-4 pt-6 font-bold font-circular">
            {data?.id === "global-senior-leadership-program"
              ? "Specialization Modules*"
              : "Masterclasses"}
          </div>

          <div className="rounded-lg bg-white border border-[#dedede] shadow-sm overflow-hidden font-circular">
            {data?.id !== "global-senior-leadership-program" ? (
              Object.entries(curriculum)
                .slice(1)
                .map(([idx, modules]) =>
                  modules.map((point, i) => (
                    <Ordinary
                      key={i}
                      curriculum={point}
                      expanded={expanded}
                      handleChange={handleChange}
                      index={i + 1}
                      id={`${idx}-${i}`}
                      type="masterclass"
                      isLast={i === modules.length - 1}
                    />
                  ))
                )
            ) : (
              Object.entries(curriculum)
                .slice(1)
                .map(([idx, modules], catIndex, catArr) => {
                  const isItemExpanded = Boolean(expanded[idx]);
                  const isCatLast = catIndex === catArr.length - 1;
                  return (
                    <div key={idx} className="w-full bg-white">
                      <button
                        type="button"
                        onClick={(e) => handleChange(idx)(e, !isItemExpanded)}
                        className={`w-full flex items-center justify-between px-6 py-4 text-left transition select-none cursor-pointer ${
                          isItemExpanded ? "bg-[#F0F4FE]" : "bg-white hover:bg-gray-50/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm md:text-[15px] font-medium text-gray-800 capitalize">
                            {idx.split("-").join(" ")}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3">
                          <h4 className="max-md:hidden whitespace-nowrap font-circular text-sm text-gray-500">
                            {modules.length} Modules
                          </h4>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                              isItemExpanded ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </div>
                      </button>

                      {isItemExpanded && (
                        <div className="pb-4 pt-1">
                          <div className="flex flex-col space-y-3 pl-2 sm:pl-4">
                            {modules.map((point, i) => {
                              if (typeof point === "object") {
                                return (
                                  <Ordinary
                                    key={i}
                                    curriculum={point}
                                    expanded={expanded}
                                    handleChange={handleChange}
                                    index={i + 1}
                                    id={`${idx}-${i}`}
                                    type={type}
                                    isLast={i === modules.length - 1}
                                  />
                                );
                              } else {
                                return (
                                  <div key={i} className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#1A73E8] mt-1.5 flex-shrink-0" />
                                    <p className="text-sm font-medium text-gray-700">
                                      {point}
                                    </p>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                      )}
                      {!isCatLast && <div className="mx-6 border-b border-gray-200" />}
                    </div>
                  );
                })
            )}
          </div>

          {data?.id === "global-senior-leadership-program" && (
            <div>
              <p className="italic p-3 pl-0 font-medium text-sm mt-2 text-gray-500">
                *Participants will select only one elective specialization module,
                each concluding with a Capstone Project.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-lg bg-white border border-[#dedede] shadow-sm overflow-hidden font-circular">
          {curriculum.map((curr, index) => {
            const isLast = index === curriculum.length - 1;
            return (
              <div key={index}>
                {curr?.special ? (
                  <Special
                    curriculum={curr}
                    index={specialIndex++}
                    handleChange={handleChange}
                    expanded={expanded}
                    isLast={isLast}
                  />
                ) : (
                  <Ordinary
                    curriculum={curr}
                    index={termIndex++}
                    handleChange={handleChange}
                    expanded={expanded}
                    type={type}
                    id={`panel${index}`}
                    isLast={isLast}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
