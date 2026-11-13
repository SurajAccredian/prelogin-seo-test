"use client";
import { ChakraProvider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import ProgramAccordionFilters from "../../Inputs/Filters/ProgramAccordionFilters";
import { programActions } from "../../../store/reducers/program";

const FilterPageDrawer = ({
  isOpen,
  onClose,
  categories = [],
  skills = [],
  durations = [],
  institutes = [],
  careerLevels = [],
  onInterestsChange,
  onSkillsChange,
  onDurationsChange,
  onInstitutesChange,
  onCareerLevelsChange,
}) => {
  const dispatch = useDispatch();
  const {
    checkedCategories = [],
    checkedTags = [],
    checkedDurations = [],
    checkedInstitutes = [],
    checkedCareerLevels = [],
  } = useSelector((state) => state.program);

  const [expanded, setExpanded] = useState("Area of Interest");

  const handleToggle = (panel) => {
    setExpanded((prev) => (prev === panel ? false : panel));
  };

  const handleClose = () => onClose();

  const handleClearClose = () => {
    dispatch(programActions.clearAllFilters());
    onClose();
  };

  const sections = [
    {
      id: "Area of Interest",
      title: "Area of Interest",
      items: categories,
      checked: checkedCategories,
      onChange: onInterestsChange,
    },
    {
      id: "Skills",
      title: "Skills",
      items: skills,
      checked: checkedTags,
      onChange: onSkillsChange,
    },
    {
      id: "Duration",
      title: "Duration",
      items: durations,
      checked: checkedDurations,
      onChange: onDurationsChange,
    },
    {
      id: "Institute",
      title: "Institute",
      items: institutes,
      checked: checkedInstitutes,
      onChange: onInstitutesChange,
    },
    {
      id: "Career Level",
      title: "Career Level",
      items: careerLevels,
      checked: checkedCareerLevels,
      onChange: onCareerLevelsChange,
    },
  ];

  return (
    <ChakraProvider>
      <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton mx={"4px"} color={"#1A73E8"} />
          <DrawerHeader mx={"4px"} py={"1rem"}>
            Filter by
          </DrawerHeader>
          <DrawerBody position={"relative"} p={0}>
            <div className="w-full flex flex-col relative gap-3 h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar px-4 pt-2 pb-24">
              {sections.map((sec) => {
                const isExpanded = expanded === sec.id;
                const activeCount = sec.checked?.length || 0;
                return (
                  <div
                    key={sec.id}
                    className="rounded-xl mb-2 border border-slate-100 bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => handleToggle(sec.id)}
                      className="w-full flex items-center justify-between text-base px-3 py-2 text-left"
                    >
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-neutral-800">
                          {sec.title}
                        </p>
                        {activeCount > 0 && (
                          <span className="text-xs bg-universal text-white px-2 py-0.5 rounded-full font-medium">
                            {activeCount}
                          </span>
                        )}
                      </div>
                      <div className="text-lg text-neutral-500">
                        <MdKeyboardArrowDown
                          size={20}
                          className={`${
                            isExpanded ? "rotate-180" : "rotate-0"
                          } transition-transform duration-200`}
                        />
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="max-h-[45vh] overflow-y-auto custom-scrollbar px-3 pb-3 pt-0">
                        <ProgramAccordionFilters
                          title={sec.title}
                          onFilterChange={sec.onChange}
                          categories={sec.items}
                          checked={sec.checked}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sticky footer action buttons */}
            <div className="fixed bottom-0 left-0 right-0 w-full py-3 px-4 flex items-center gap-3 z-30 bg-white border-t border-neutral-200 shadow-lg">
              <button
                className="flex-1 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-neutral-700 font-medium text-sm transition-colors"
                onClick={handleClearClose}
              >
                Clear Filters
              </button>
              <button
                className="flex-1 py-2.5 rounded-lg bg-universal hover:bg-darkBlue text-white font-medium text-sm transition-colors"
                onClick={handleClose}
              >
                Apply
              </button>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  );
};

export default FilterPageDrawer;
