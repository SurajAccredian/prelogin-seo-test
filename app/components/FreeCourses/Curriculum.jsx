"use client";

import React, { useState } from "react";

const Curriculum = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(0); // Open first module by default

  const toggleModule = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div id="curriculum" className="curriculum-list">
      {data.curriculum?.map((module, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className={`module ${isOpen ? "open" : ""}`}>
            <button
              onClick={() => toggleModule(idx)}
              className="module-summary-btn"
              aria-expanded={isOpen}
            >
              <span className="module-summary-title">{module.title}</span>
              <span className="module-meta">{module.duration}</span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isOpen && (
              <div className="topics">
                {module.topics?.map((topic, topicIdx) => {
                  const hasPreview = topic.includes("[Preview]");
                  const cleanTopic = topic.replace("[Preview]", "").trim();
                  return (
                    <div key={topicIdx} className="topic">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="10" cy="10" r="8" />
                        <path d="M8 10l1.5 1.5L13 8" />
                      </svg>
                      <span>{cleanTopic}</span>
                      {hasPreview && <span className="preview-tag">Preview</span>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Curriculum;
