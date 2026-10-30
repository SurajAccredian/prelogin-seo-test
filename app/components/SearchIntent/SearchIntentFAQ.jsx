"use client";
import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function SearchIntentFAQ({
  title = "Frequently Asked Questions",
  subtitle = "Clear answers about admissions, program formats, credentials, and career outcomes.",
  faqs = [],
}) {
  const [openIndices, setOpenIndices] = useState([0]); // First item open by default

  const toggleIndex = (index) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="w-full bg-slate-50 border-t border-neutral-200/80 py-14 md:py-20 font-circular">
        <div className="si-wrap max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleIndex(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 font-bold text-neutral-900 text-sm sm:text-base hover:text-universal transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="w-8 h-8 rounded-lg bg-slate-50 text-universal flex items-center justify-center flex-shrink-0">
                      {isOpen ? <FiMinus className="text-sm" /> : <FiPlus className="text-sm" />}
                    </span>
                  </button>

                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    className={`px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 ${
                      isOpen ? "block" : "hidden"
                    }`}
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
