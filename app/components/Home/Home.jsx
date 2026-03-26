"use client";

import React, { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Rcta from "../cta/request_a_call_back";
import Wrapper from "../Wrapper/HomePageWrapper";

import Hero from "./Hero/Hero";

import Stats from "./Stats/Stats";
import Partnership from "./Patnerships/Partnership";

const Programs = dynamic(() => import("./Programs/Programs"), { ssr: false });
const Verticals = dynamic(() => import("./Verticals/Verticals"), {
  ssr: false,
});
const Intro = dynamic(() => import("./Intro/Intro"), { ssr: false });
const PlacementSupport = dynamic(
  () => import("./PlacementSupport/PlacementSupport"),
  { ssr: false },
);
const InfoNew = dynamic(() => import("./Info/InfoNew"), { ssr: false });
const WatchStoriesV2 = dynamic(
  () => import("./watch-stories/watch-stories-v2"),
  { ssr: false },
);
const CTA = dynamic(() => import("./CTA/CTA"), { ssr: false });

/* -------------------------------------- 
   LazyComponent → only loads when visible
   ✅ IDENTICAL logic — IntersectionObserver unchanged
--------------------------------------- */


const LazyComponent = ({ children }) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let observer;

    if (ref.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
              observer.disconnect();
            }
          });
        },
        {
          threshold: 0.1,
        },
      );

      observer.observe(ref.current);
    }

    return () => observer && observer.disconnect();
  }, []);

  return <div ref={ref}>{visible ? children : null}</div>;
};

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
          {/* ✅ Suspense fallback preserved — wraps all dynamic components */}
          <Suspense fallback={<div>Loading...</div>}>
            <Stats />
            <Partnership />

            {/* <LazyComponent> */}
            {/* <UpdateNotification /> */}
            {/* </LazyComponent> */}

            <LazyComponent>
              <Programs />
            </LazyComponent>

            <LazyComponent>
              <Verticals />
            </LazyComponent>

            <LazyComponent>
              <Intro />
            </LazyComponent>

            <LazyComponent>
              <PlacementSupport />
            </LazyComponent>

            <LazyComponent>
              <InfoNew />
            </LazyComponent>

            <LazyComponent>
              <WatchStoriesV2 />
            </LazyComponent>

            <LazyComponent>
              {/* <Testimonials /> */}
              <CTA />
            </LazyComponent>
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
