"use client";

import React, { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Rcta from "../cta/request_a_call_back";
import Wrapper from "../Wrapper/HomePageWrapper";

import Hero from "./Hero/Hero";

import Stats from "./Stats/Stats";
import Partnership from "./Patnerships/Partnership";

import Programs from "./Programs/Programs";
import Verticals from "./Verticals/Verticals";
import Intro from "./Intro/Intro";
import PlacementSupport from "./PlacementSupport/PlacementSupport";
import InfoNew from "./Info/InfoNew";
import WatchStoriesV2 from "./watch-stories/watch-stories-v2";
import CTA from "./CTA/CTA";

/* -------------------------------------- 
   HOME COMPONENT
--------------------------------------- */
const Home = () => {
  const [cta, setCta] = useState(false);

  //   const { variant } = useHeroAB();

  // ✅ IDENTICAL — A/B test CTA text and IDs
  //   const ctaButton =
  //     variant === "control" ? "Book Consultation" : "Download Job Report";

  //   const ctaId = variant === "control" ? "hero-consult-cta" : "hero-report-cta";

  const RcbhandleClose = () => {
    setCta(false);
  };

  return (
    <>
      <Wrapper>
        {/* {variant === "control" ? <HeroV1 /> : <HeroV2 />} */}
        <Hero />
        <div className="overflow-x-hidden">
          {/* ✅ Suspense fallback preserved — wraps sections */}
          <Suspense fallback={<div>Loading...</div>}>
            <Stats />
            <Partnership />
            <Programs />
            <Verticals />
            <Intro />
            <PlacementSupport />
            <InfoNew />
            <WatchStoriesV2 />
            <CTA />
          </Suspense>
        </div>
      </Wrapper>

      {/* ✅ Rcta modal — wraps in Suspense as established in request_a_call_back.tsx */}
      <Suspense fallback={null}>
        <Rcta open={cta} handleClose={RcbhandleClose} />
      </Suspense>
    </>
  );
};

export default Home;
