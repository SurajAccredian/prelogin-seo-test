"use client";

import ProgramWrapper from "../../Wrapper/ProgramWrapper";
import CTA from "./CTA/CTA";
import program from "./Programs.css";
import FAQ from "./FAQ/FAQ";
import Hero from "./Hero/Hero";
import VerticalDetail from "./Related/VerticalDetail";
import WhyAccredian from "./Why Accredian/WhyAccredian";
import CarrerOutComes from "./Carrer Outcomes Section/CarrerOutComes";
import Line from "./generals/line";
import Stats from "./stats section/Stats";
import Partners from "./Patrners Section/PatnersSection";

const Wrapper = ({ data }) => {
  const renderSection = (section) => {
    switch (section) {
      case "stats":
        return (
          <>
            {/* <Line /> */}
            <Stats data={data} />
            {/* <Line /> */}
            <Partners data={data} />
            <Line />
            <VerticalDetail data={data} />
            <Line />
          </>
        );
      case "why accredian":
        return (
          <>
            <WhyAccredian data={data} />
          </>
        );
      case "unique points":
        return <CarrerOutComes data={data} />;

      case "FAQs":
        return <FAQ data={data} />;
      default:
        return null;
    }
  };

  return (
    <ProgramWrapper>
      <Hero data={data} />
      <div className="programs w-full min-h-screen flex justify-center flex-col items-center font-circular">
        <div className="w-full">
          {data &&
            data?.sections?.map((section, index) => (
              <div key={index}>{renderSection(section)}</div>
            ))}
          <Line />
          <CTA />
        </div>
      </div>
    </ProgramWrapper>
  );
};

export default Wrapper;
