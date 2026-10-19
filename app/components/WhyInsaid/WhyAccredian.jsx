import Wrapper from "../Wrapper/HomePageWrapper";
import WhyAccredianHero from "./Hero Section/Hero";
import MissionOriented from "./Mission Oriented/MissionOrientedSection";
import TestimonialsSection from "./Testimonials/Testimonials";
import USP from "./USP/USP";
import CTA from "./CTA/CTA";
import Related from "./Related/Related";
import Companies from "./Companies/Companies";
const WhyAccredian = () => {
  return (
    <>
      <Wrapper>
        <div className="font-circular">
          <WhyAccredianHero />
          <MissionOriented />
          <USP />
          <Companies />
          <TestimonialsSection />
          <Related />
          <CTA />
        </div>
      </Wrapper>
    </>
  );
};

export default WhyAccredian;
