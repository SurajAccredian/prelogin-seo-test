"use client";
import React, { useState } from "react";
import "./ProgramFilters.css";

const ProgramAccordionFilters = ({ title, categories, onFilterChange, checked }) => {
  const [nextSet, setNextSet] = useState(5);
  const handleSetNext = () => setNextSet(nextSet + 5);

  return (
    <div className="flex flex-col gap-1 mt-4">
      {categories.map((category) => (
        <div className={`${checked?.includes(category) ? "flex" : "hidden"} gap-2`} key={`checked-${category}`}>
          <div className="relative w-7 h-7 flex items-center justify-center">
            <label className="cbx">
              <div className="checkmark">
                <input id="cbx" onChange={onFilterChange} type="checkbox" value={category} checked={checked?.includes(category)} />
                <div className="flip">
                  <div className="front"></div>
                  <div className="back"><svg viewBox="0 0 16 14" height="14" width="16"><path d="M2 8.5L6 12.5L14 1.5"></path></svg></div>
                </div>
              </div>
            </label>
          </div>
          <h1 className="font-medium capitalize text-neutral-700">{category}</h1>
        </div>
      ))}
      {categories.slice(0, nextSet).map((category) => (
        <div className={`${!checked?.includes(category) ? "flex" : "hidden"} gap-2`} key={`unchecked-${category}`}>
          <div className="relative w-7 h-7 flex items-center justify-center flex-shrink-0">
            <label className="cbx">
              <div className="checkmark">
                <input id="cbx" onChange={onFilterChange} type="checkbox" value={category} checked={checked?.includes(category)} />
                <div className="flip">
                  <div className="front"></div>
                  <div className="back"><svg viewBox="0 0 16 14" height="14" width="16"><path d="M2 8.5L6 12.5L14 1.5"></path></svg></div>
                </div>
              </div>
            </label>
          </div>
          <h1 className={`font-medium ${category.toLowerCase() === "cxo" ? "uppercase" : "capitalize"} text-neutral-700`}>
            {category.toLowerCase() === "cxo leadership" ? "CXO Leadership" : category.toLowerCase() === "data science & ai" ? "Data Science & AI" : category.toLowerCase() === "pg diploma" ? "PG Diploma" : category}
          </h1>
        </div>
      ))}
      {nextSet <= categories.length && (
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7 flex items-center justify-center" />
          <button onClick={handleSetNext} className="font-medium capitalize text-universal">Show More</button>
        </div>
      )}
    </div>
  );
};

export default ProgramAccordionFilters;
