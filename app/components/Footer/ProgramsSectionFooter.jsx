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
        className="w-full py-3 px-4 flex items-center justify-between text-left transition"
        aria-expanded={isOpen}
      >
        <div className="flex items-center flex-wrap gap-1">
          <span className="capitalize font-semibold text-sm sm:text-base">
            {category.toLowerCase() === "cxo leadership"
              ? "CXO Leadership"
              : category.toLowerCase() === "pg diploma"
                ? "PG Diploma"
                : category.replace(/(\bai\b)/gi, "AI")}
          </span>
          <span className="ml-1 text-xs text-gray-300 flex items-center gap-1">
            ( <PhoneForwarded size={12} />
            {matchingContact?.contact} )
          </span>
        </div>
        <span className="text-white ml-2 flex-shrink-0">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-1 space-y-1.5">
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
      )}
    </div>
  );
};

export default MobileProgramFooter;
