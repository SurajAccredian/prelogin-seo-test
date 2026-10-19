"use client";
import React, { useState } from "react";
import "./ProgramFilters.css";
import { formatFilterLabel } from "../../../helpers/programFilter.helpers";

const ProgramAccordionFilters = ({
  title,
  categories = [],
  onFilterChange,
  checked = [],
  initialCount = 5,
}) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const handleShowMore = () => setVisibleCount((prev) => prev + 5);

  return (
    <div className="flex flex-col gap-1 mt-2">
      {/* Checked items */}
      {categories.map((category) => (
        <div className={`${checked?.includes(category) ? "flex" : "hidden"} gap-2`} key={`checked-${category}`}>
          <div className="relative w-7 h-7 flex items-center justify-center">
            <label className="cbx">
              <div className="checkmark">
                <input onChange={onFilterChange} type="checkbox" value={category} checked={checked?.includes(category)} />
                <div className="flip">
                  <div className="front"></div>
                  <div className="back"><svg viewBox="0 0 16 14" height="14" width="16"><path d="M2 8.5L6 12.5L14 1.5"></path></svg></div>
                </div>
              </div>
            </label>
          </div>
          <p className="font-medium capitalize text-neutral-700">
            {formatFilterLabel(title, category)}
          </p>
        </div>
      ))}

      {/* Unchecked items */}
      {categories.slice(0, visibleCount).map((category) => (
        <div
          className={`${!checked?.includes(category) ? "flex" : "hidden"} gap-2`}
          key={`unchecked-${category}`}
        >
          <div className="relative w-7 h-7 flex items-center justify-center flex-shrink-0">
            <label className="cbx">
              <div className="checkmark">
                <input onChange={onFilterChange} type="checkbox" value={category} checked={checked?.includes(category)} />
                <div className="flip">
                  <div className="front"></div>
                  <div className="back"><svg viewBox="0 0 16 14" height="14" width="16"><path d="M2 8.5L6 12.5L14 1.5"></path></svg></div>
                </div>
              </div>
            </label>
          </div>
          <p className="font-medium capitalize text-neutral-700">
            {formatFilterLabel(title, category)}
          </p>
        </div>
      ))}

      {visibleCount < categories.length && (
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7 flex items-center justify-center flex-shrink-0" />
          <button
            onClick={handleShowMore}
            className="font-medium capitalize text-universal"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgramAccordionFilters;
