"use client";
import React, { useEffect } from "react";
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
      </Wrapper>
    </>
  );
}
