"use client";
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import { Accordion, AccordionDetails, AccordionSummary, ThemeProvider, createTheme } from "@mui/material";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import ProgramAccordionFilters from "../../Inputs/Filters/ProgramAccordionFilters";
import { programActions } from "../../../store/reducers/program";

const theme = createTheme();

const FilterPageDrawer = ({ isOpen, onClose, categories, tags, onTagsChange, onCategoriesChange }) => {
  const dispatch = useDispatch();
  const { checkedCategories, checkedTags } = useSelector((state) => state.program);
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, newExpanded) => setExpanded(newExpanded ? panel : false);
  const handleClose = () => onClose();
  const handleClearClose = () => {
    dispatch(programActions.setCheckedCategories([]));
    dispatch(programActions.setCheckedTags([]));
    onClose();
  };

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton mx={"4px"} color={"#1A73E8"} />
        <DrawerHeader mx={"4px"} py={"1rem"}>Filter by : </DrawerHeader>
        <DrawerBody position={"relative"}>
          <div className="w-full flex flex-col relative gap-4 h-[80vh] overflow-y-auto custom-scrollbar py-6 px-1">
            <ThemeProvider theme={theme}>
              <Accordion expanded={expanded === "Verticals"} onChange={handleChange("Verticals")} className="accordion-parent">
                <AccordionSummary aria-controls="panel1d-content" className="accordion-summary">
                  <div className="w-full flex items-center justify-between text-lg lg:hidden">
                    <div className="flex items-center gap-2">
                      <h1 className="font-semibold">Verticals</h1>
                    </div>
                    <div className="text-lg">
                      <MdKeyboardArrowDown size={20} className={`${expanded === "Verticals" ? "rotate-0" : "rotate-90"} transition-all duration-150`} />
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="accordion-details max-h-[40vh] overflow-y-auto custom-scrollbar">
                  <ProgramAccordionFilters title={"Verticals"} onFilterChange={onCategoriesChange} categories={categories} checked={checkedCategories} />
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === "Skills"} onChange={handleChange("Skills")} className="accordion-parent">
                <AccordionSummary aria-controls="panel1d-content" className="accordion-summary">
                  <div className="w-full flex items-center justify-between text-lg lg:hidden">
                    <div className="flex items-center gap-2">
                      <h1 className="font-semibold">Skills</h1>
                    </div>
                    <div className="text-lg">
                      <MdKeyboardArrowDown size={20} className={`${expanded === "Skills" ? "rotate-0" : "rotate-90"} transition-all duration-150`} />
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="accordion-details max-h-[50vh] overflow-y-auto custom-scrollbar">
                  <ProgramAccordionFilters title={"Skills"} onFilterChange={onTagsChange} categories={tags} checked={checkedTags} />
                </AccordionDetails>
              </Accordion>
            </ThemeProvider>
            <div className="absolute bottom-0 left-0 right-0 w-full min-h-[100px] mt-4 flex items-center gap-2 px-4 py-2 z-20 bg-white">
              <button className="px-4 py-2 rounded-md bg-universal hover:bg-darkBlue text-white font-medium" onClick={handleClose}>Apply</button>
              <button className="px-4 py-2 rounded-md bg-slate-200/75 font-medium" onClick={handleClearClose}>Clear Filters</button>
            </div>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterPageDrawer;
