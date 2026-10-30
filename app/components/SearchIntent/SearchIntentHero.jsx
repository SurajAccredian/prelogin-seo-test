"use client";
import React from "react";

export default function SearchIntentHero({
  title = "IIM Programs",
  description = "",
}) {
  return (
    <header className="w-full bg-universal border-b border-neutral-200 py-10 font-circular">
      <div className="si-wrap">
        <div className="w-full ">
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-[1.15]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 text-base md:text-lg text-white justify-normal leading-relaxed w-full">
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
