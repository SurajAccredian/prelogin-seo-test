"use client";
import React from "react";
import "./ProgramFilters.css";

const ProgramFilter2 = ({ title, categories, onFilterChange, className, checked }) => {
  return (
    <div className={`bg-white w-full max-h-[240px] custom-scrollbar overflow-y-auto mt-4 ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div className="flex md:items-center gap-2" key={category}>
            <div className="relative flex-shrink-0 w-7 h-7 flex items-center justify-center">
              <label className="cbx">
                <div className="checkmark">
                  <input id="cbx" onChange={onFilterChange} type="checkbox" value={category} checked={checked.includes(category)} />
                  <div className="flip">
                    <div className="front"></div>
                    <div className="back">
                      <svg viewBox="0 0 16 14" height="14" width="16"><path d="M2 8.5L6 12.5L14 1.5"></path></svg>
                    </div>
                  </div>
                </div>
              </label>
            </div>
            <h1 className={`font-medium ${category.toLowerCase() === "cxo" ? "uppercase" : "capitalize"} text-neutral-700 md:text-base text-sm`}>
              {category.toLowerCase() === "cxo leadership" ? "CXO Leadership" : category.toLowerCase() === "data science & ai" ? "Data Science & AI" : category.toLowerCase() === "pg diploma" ? "PG Diploma" : category}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramFilter2;
