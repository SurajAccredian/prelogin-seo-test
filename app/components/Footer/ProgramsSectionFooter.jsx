"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PhoneForwarded, Plus, Minus } from "lucide-react";

const MobileProgramFooter = ({
  categorizedPrograms,
  category,
  index,
  matchingContact,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#1d1d1d] text-white border-b border-neutral-800 font-circular">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3.5 flex items-center justify-between text-left transition select-none cursor-pointer gap-2"
        aria-expanded={isOpen}
      >
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
          <span className="capitalize font-semibold text-sm sm:text-base">
            {category.toLowerCase() === "cxo leadership"
              ? "CXO Leadership"
              : category.toLowerCase() === "pg diploma"
                ? "PG Diploma"
                : category.replace(/(\bai\b)/gi, "AI")}
          </span>
          {matchingContact?.contact && (
            <span className="whitespace-nowrap text-xs text-gray-300 inline-flex items-center gap-1 flex-shrink-0">
              ( <PhoneForwarded size={12} className="flex-shrink-0" />
              <span>{matchingContact.contact}</span> )
            </span>
          )}
        </div>
        <span className="text-white ml-2 flex-shrink-0">
          <Plus
            size={18}
            className={`transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
          />
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-4 pt-1 pl-3 space-y-1.5">
            {categorizedPrograms &&
              categorizedPrograms[category] &&
              categorizedPrograms[category].map((program, innerIndex) => (
                <Link
                  key={innerIndex}
                  href={
                    program.category?.toLowerCase() === "free courses" ||
                    program.category?.toLowerCase() === "microsoft" ||
                    program.id ===
                      "transform-business-workflows-with-generative-ai" ||
                    program.id ===
                      "transform-ideas-into-impact-with-product-management"
                      ? `/free-courses/${program.id}`
                      : `/programs/${program.id}`
                  }
                  prefetch={false}
                  className="block text-white/80 hover:text-white text-xs sm:text-[13px] py-1 transition-colors"
                >
                  {program.university_name} - {program.program_name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileProgramFooter;
