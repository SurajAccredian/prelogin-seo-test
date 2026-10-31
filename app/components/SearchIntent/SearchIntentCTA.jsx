"use client";
import React from "react";
import Link from "next/link";
import { FiPhoneCall, FiCompass } from "react-icons/fi";

export default function SearchIntentCTA({
  title = "Find the Right Program for Your Career",
  description = "Explore programs aligned with your experience and career goals or speak with a senior learning advisor for personalized guidance.",
  exploreTargetId = "explore",
  advisorHref = "/contact-us",
}) {
  const scrollToExplore = (e) => {
    e.preventDefault();
    const el = document.getElementById(exploreTargetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-universal to-darkBlue text-white py-10 sm:py-14 md:py-20 font-circular">
      <div className="si-wrap text-center max-w-3xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
          {title}
        </h2>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-blue-100 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-sm sm:max-w-none mx-auto">
          <a
            href={`#${exploreTargetId}`}
            onClick={scrollToExplore}
            className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-slate-100 text-universal font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <FiCompass className="text-base" />
            <span>Explore Programs</span>
          </a>
          <Link
            href={advisorHref}
            className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-all"
          >
            <FiPhoneCall className="text-base" />
            <span>Talk to an Advisor</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
