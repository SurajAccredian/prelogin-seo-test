"use client";
import React from "react";

export default function SearchIntentHero({
  title = "IIM Programs",
  description = "",
}) {
  return (
    <header className="w-full bg-universal border-b border-neutral-200 py-6 sm:py-8 md:py-10 font-circular">
      <div className="si-wrap">
        <div className="w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug">
            {title}
          </h1>
          {description && (
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/95 leading-relaxed w-full">
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
