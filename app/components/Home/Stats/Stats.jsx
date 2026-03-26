"use client";
import React, { useEffect, useRef } from "react";
import { Power0, Power2, gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { AiOutlineRise } from "react-icons/ai";
// import { SiAcclaim } from "react-icons/si";
// import { GrStatusGood } from "react-icons/gr";

const Stats = () => {
  const showStats = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cx_stats = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".start-from-zero",
          start: "top 95%",
          end: "top 20%",
          toggleActions: "play reset play reset",
        },
      });
      tl.from(".start-from-zero", {
        textContent: 50,
        duration: 5,
        ease: "power1.out",
        snap: {
          textContent: 1,
        },
        stagger: 0.3,
      });
    }, showStats);

    return () => {
      cx_stats.revert();
    };
  }, []);

  return (
    <div
      ref={showStats}
      className="w-full flex justify-center items-center font-circular px-4 py-8 md:py-16 bg-white mt-6"
    >
      <div className="max-w-6xl w-full rounded-2xl py-[54px] px-8 bg-white shadow-md border-t-2 ">
        <h1 className="text-3xl md:text-4xl font-medium text-center">
          A Legacy of{" "}
          <span className="text-universal">Excellence & Impact</span> You Can
          Count On!
        </h1>
        <div className="flex flex-col md:flex-row justify-center gap-0 mt-4 md:mt-8">
          <div className="text-center flex flex-col items-center px-4 py-6 md:py-0 md:px-8 border-b md:border-b-0 md:border-r border-blue-300">
            <div className="flex  items-center gap-2 justify-center h-12">
              {/* <AiOutlineRise className='text-4xl' /> */}
              <h2 className="text-4xl font-medium text-universal">
                <span className="start-from-zero">150</span>%
              </h2>
            </div>
            <h3 className="text-sm mt-3 font-medium">Highest Salary Hike</h3>
            <h1 className="mt-2 text-sm hidden md:block text-neutral-500 max-w-[260px]">
              Experience substantial salary growth with our competitive
              compensation packages.
            </h1>
          </div>
          <div className="text-center flex flex-col items-center px-4 py-6 md:py-0 md:px-8 border-b md:border-b-0 md:border-r border-blue-300">
            <div className="flex items-center gap-2 justify-center h-12">
              {/* <GrStatusGood className='text-3xl' /> */}
              <h2 className="text-4xl font-medium text-universal">
                <span className="start-from-zero">60</span>%
              </h2>
            </div>
            <h3 className="text-sm mt-3 font-medium">Average Salary Hike</h3>
            <h1 className="mt-2 text-sm hidden md:block text-neutral-500 max-w-[260px]">
              Unlock consistent salary growth through our rewarding career
              paths.
            </h1>
          </div>
          <div className="text-center flex flex-col items-center px-4 py-6 md:py-0 md:px-8">
            <div className="flex items-center gap-2 justify-center h-12">
              {/* <SiAcclaim className='text-3xl' /> */}
              <h2 className="text-4xl font-medium text-universal">
                <span className="start-from-zero">80</span>%
              </h2>
            </div>
            <h3 className="text-sm mt-3 font-medium">Positive Career Impact</h3>
            <h1 className="mt-2 text-sm hidden md:block text-neutral-500 max-w-[260px]">
              Elevate your career trajectory with positive, impactful
              opportunities.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
