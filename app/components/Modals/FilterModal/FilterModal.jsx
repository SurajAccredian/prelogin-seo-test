"use client";
import React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import ProgramFilter2 from "../../Inputs/Filters/ProgramFilter2";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { formatFilterLabel } from "../../../helpers/programFilter.helpers";

export default function FilterModal({
  open,
  setOpen,
  categories = [],
  handleChange,
  setChecked,
  checked = [],
  title = "Filters",
  setModalCategory = undefined,
}) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    if (setModalCategory !== undefined) setModalCategory(null);
  };

  const handleClearClose = () => {
    if (setChecked) {
      dispatch(setChecked([]));
    }
    setOpen(false);
  };

  const handleRemoveCategory = (category) => {
    if (setChecked) {
      const updatedCategories = checked.filter(
        (c) => c.toLowerCase() !== category.toLowerCase()
      );
      dispatch(setChecked(updatedCategories));
    }
  };

  return (
    <Modal
      aria-labelledby="filter-modal-title"
      aria-describedby="filter-modal-description"
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none !important",
        outline: "none !important",
        p: 2,
      }}
    >
      <Box sx={{ outline: "none !important" }}>
        <div className="w-[92vw] sm:w-[85vw] md:w-[75vw] lg:w-[65vw] max-w-[850px] max-h-[85vh] bg-white rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-2xl">
          <div className="w-full flex-1 overflow-hidden flex flex-col">
            <div className="w-full flex justify-between items-center pb-2 border-b border-neutral-200">
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                Select {title}
              </h3>
              <button
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-colors"
                onClick={handleClose}
                aria-label="Close modal"
              >
                <IoCloseSharp className="text-2xl" />
              </button>
            </div>

            {/* Active Selected Chips */}
            {checked && checked.length > 0 && (
              <div className="w-full flex flex-wrap items-center gap-2 mt-4 max-h-[110px] overflow-y-auto custom-scrollbar">
                {checked.map((category, index) => (
                  <button
                    key={index}
                    className="py-1 px-2.5 rounded-full bg-slate-100 border border-slate-200 text-xs sm:text-sm font-medium text-neutral-700 flex items-center gap-1.5 hover:bg-slate-200 transition-colors"
                    onClick={() => handleRemoveCategory(category)}
                  >
                    <span>{formatFilterLabel(title, category)}</span>
                    <IoIosClose size={18} className="text-neutral-500" />
                  </button>
                ))}
              </div>
            )}

            {/* Filter checkboxes grid */}
            <div className="w-full flex-1 overflow-y-auto custom-scrollbar pr-1">
              <ProgramFilter2
                className="mt-2"
                title={title}
                checked={checked}
                categories={categories}
                onFilterChange={handleChange}
              />
            </div>
          </div>

          <div className="w-full mt-4 pt-3 border-t border-neutral-200 flex items-center justify-end gap-3">
            <button
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-neutral-700 text-sm font-medium transition-colors"
              onClick={handleClearClose}
            >
              Clear Filters
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-universal hover:bg-universal/90 text-white text-sm font-medium transition-colors"
              onClick={handleClose}
            >
              Apply
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
