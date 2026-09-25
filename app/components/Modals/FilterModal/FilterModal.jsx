"use client";
import React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import ProgramFilter2 from "../../Inputs/Filters/ProgramFilter2";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";

export default function FilterModal({ open, setOpen, categories, handleChange, setChecked, checked, title, setModalCategory = undefined }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    if (setModalCategory !== undefined) setModalCategory(null);
  };
  const handleClearClose = () => {
    dispatch(setChecked([]));
    setOpen(false);
  };
  const handleRemoveCategory = (category) => {
    const updatedCategories = checked.filter((c) => c !== category.toLowerCase());
    dispatch(setChecked(updatedCategories));
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", border: "none !important", outline: "none !important" }}
      >
        <Box>
          <div className="w-[90vw] md:w-[80vw] max-h-[70vh] xl:w-[60vw] bg-white rounded-lg px-4 py-4 flex flex-col justify-between">
            <div className="w-full">
              <div className="w-full flex justify-between px-3">
                <h3 className="text-3xl font-medium">Select {title}</h3>
                <button className="py-2 text-universal font-medium" onClick={handleClose}>
                  <IoCloseSharp className="text-lg" />
                </button>
              </div>
              <div className="w-full px-4 py-2">
                <div className="w-full flex md:flex-wrap items-center gap-2 mt-4 max-md:overflow-x-auto max-md:max-w-[100%] md:overflow-y-auto md:max-h-[200px] md:custom-scrollbar">
                  {checked?.map((category, index) => (
                    <button key={index} className="py-1 px-2 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium capitalize text-neutral-700 flex items-center gap-2 text-nowrap" onClick={() => handleRemoveCategory(category)}>
                      <span className="pl-1">{category}</span>
                      <IoIosClose size={20} />
                    </button>
                  ))}
                </div>
                <ProgramFilter2 className="mt-4" title={title} checked={checked} categories={categories} onFilterChange={handleChange} />
              </div>
            </div>
            <div className="w-full mt-4 flex items-center gap-2 px-4 py-2">
              <button className="px-4 py-2 rounded-md bg-universal text-white font-medium" onClick={handleClose}>Apply</button>
              <button className="px-4 py-2 rounded-md bg-slate-200/75 font-medium" onClick={handleClearClose}>Clear Filters</button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
