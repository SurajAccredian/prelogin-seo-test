"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqAccordionSection({ faqData }) {
  // Default first question of first category open, like original panel1
  const [expanded, setExpanded] = useState("about-accredian-0");

  const togglePanel = (panelId) => {
    setExpanded((prev) => (prev === panelId ? false : panelId));
  };

  return (
    <div className="pb-16 pt-4">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6">
        {/* Main Heading & Intro */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-black font-bold text-[26px] sm:text-[30px] md:text-[34px] mb-2 leading-tight">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-[#4a4a4a] text-base mb-2">
            Search for the answers to your questions below.
          </p>
        </div>

        {/* Categories & Accordions */}
        {faqData &&
          faqData.map((category) => (
            <div key={category.id} className="mb-8 md:mb-10">
              <h2 className="text-black font-bold text-[20px] sm:text-[22px] md:text-[28px] mb-4 pb-2 border-b-2 border-[#e5e7eb]">
                {category.heading}
              </h2>

              <div className="pt-2 pb-4">
                {category.questions &&
                  category.questions.map((item, qIdx) => {
                    const panelId = `${category.id}-${qIdx}`;
                    const isPanelExpanded = expanded === panelId;

                    return (
                      <div
                        key={item.id || panelId}
                        className="border border-[#e0e0e0] lg:border-x-0 lg:border-t-0 lg:border-b mb-3 lg:mb-0 rounded-lg lg:rounded-none bg-white overflow-hidden transition"
                      >
                        <button
                          type="button"
                          onClick={() => togglePanel(panelId)}
                          aria-expanded={isPanelExpanded}
                          className="w-full flex items-center justify-between text-left min-h-[64px] md:min-h-[72px] px-4 py-3 cursor-pointer select-none"
                        >
                          <h3
                            className={`font-bold text-sm md:text-lg transition-colors leading-[1.4] pr-4 ${
                              isPanelExpanded ? "text-[#1A73E8]" : "text-[#1a1a1a]"
                            }`}
                          >
                            {item.question}
                          </h3>
                          <ChevronDown
                            className={`w-5 h-5 text-[#333] flex-shrink-0 transition-transform duration-200 ${
                              isPanelExpanded ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </button>

                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            isPanelExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="px-4 pt-0 pb-5">
                              <p className="text-base text-[#4a4a4a] leading-[1.7] whitespace-pre-line">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
