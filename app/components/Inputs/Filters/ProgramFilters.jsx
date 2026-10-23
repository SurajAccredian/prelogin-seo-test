"use client";
import React, { useState } from "react";
import "./ProgramFilters.css";
import { formatFilterLabel } from "../../../helpers/programFilter.helpers";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const ProgramFilters = ({
  title,
  categories = [],
  onFilterChange,
  checked = [],
  setModalOpen,
  showMoreCount = 4,
  hasShowMore = true,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const checkedItems = categories.filter((c) => checked?.includes(c));
  const uncheckedItems = categories.filter((c) => !checked?.includes(c));
  const visibleUnchecked = hasShowMore
    ? uncheckedItems.slice(0, Math.max(0, showMoreCount - checkedItems.length))
    : uncheckedItems;
  const displayList = [...checkedItems, ...visibleUnchecked];
  const hasMoreItems = hasShowMore && categories.length > showMoreCount;

  return (
    <div className="px-5 py-4 bg-white">
      {/* Section Header */}
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h3 className="font-semibold text-sm text-neutral-900">{title}</h3>
        {isOpen ? (
          <IoIosArrowUp className="text-neutral-500 text-sm" />
        ) : (
          <IoIosArrowDown className="text-neutral-500 text-sm" />
        )}
      </div>

      {/* Filter Section Content */}
      {isOpen && (
        <div className="flex flex-col gap-2.5 mt-3.5">
          {displayList.map((category) => {
            const isChecked = checked?.includes(category);
            return (
              <label
                className="flex items-center gap-2.5 cursor-pointer group"
                key={category}
              >
                <div className="relative w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <div
                    className={`cbx ${
                      isChecked ? "border-[#0b76ef] bg-[#0b76ef]" : ""
                    }`}
                  >
                    <div className="checkmark">
                      <input
                        onChange={onFilterChange}
                        type="checkbox"
                        value={category}
                        checked={isChecked}
                      />
                      <div className="flip">
                        <div className="front"></div>
                        <div className="back">
                          <svg viewBox="0 0 16 14" height="14" width="16">
                            <path d="M2 8.5L6 12.5L14 1.5"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-sm font-normal text-neutral-700 group-hover:text-neutral-900 transition-colors leading-snug">
                  {formatFilterLabel(title, category)}
                </span>
              </label>
            );
          })}

          {/* Show More */}
          {hasMoreItems && (
            <div className="pt-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (setModalOpen) {
                    setModalOpen(title);
                  }
                }}
                className="text-md font-medium flex items-center gap-1 transition-colors capitalize text-universal"
              >
                <span>Show more</span>
                <IoIosArrowDown className="text-sm text-universal" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgramFilters;

