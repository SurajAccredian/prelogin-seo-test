"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Wrapper from "../Wrapper/HomePageWrapper";
import Stats from "../Home/Stats/Stats";
import Alumines from "./alumines/alumines";
import USP from "./usp/usp";
import Companies from "./companies";
import Hero from "./hero";
import WatchStoriesV2 from "./watch-stories/watch-stories-v2";

export default function SuccessStories() {
  useEffect(() => {
    document.title = 'Success Stories | Accredian';
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Wrapper>
        <Hero />
        <USP />
        <Stats />
        {/* <WatchStories /> */}
        <WatchStoriesV2 />
        <Companies />
        <Alumines />
        <p className="text-center text-sm py-8">
          Looking for alumni career transition articles? Read them on the{" "}
          <Link href="/blog/success-stories" className="text-universal underline">
            Accredian Blog
          </Link>
          .
        </p>
      </Wrapper>
    </>
  );
}
