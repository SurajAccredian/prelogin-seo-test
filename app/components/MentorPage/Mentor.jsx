"use client";

import Wrapper from "../Wrapper/HomePageWrapper";
import MentorHero from "./Hero Section/MentorHero";
import MentorOverview from "./Overview Mentor/MentorOverview";
import MentorUsp from "./Mentor USP/MentorUsp";
import MentorApplication from "./Mentor Application/MentorApplication";
import FacultyMentor from "./Mentor Faculty/FacultyMentor";
import MentorFaq from "./Mentor FAQ/MentorFaq";
import MentorCta from "./Mentor CTA/MentorCta";
import MentorInfo from "./Mentor Info/MentorInfo";
import MentorVerticals from "./Mentor Verticals/MentorVerticals";
import MentorVerticalsList from "./Mentor All Verticals/MentorVerticalsList";
const Mentor = () => {
  return (
    <>
      <Wrapper>
        <MentorHero />
        <MentorInfo />
        <MentorVerticalsList />
        <MentorVerticals />
        <MentorOverview />
        <MentorUsp />
        <MentorApplication />
        <FacultyMentor />
        <MentorFaq />
        <MentorCta />
      </Wrapper>
    </>
  );
};

export default Mentor;
