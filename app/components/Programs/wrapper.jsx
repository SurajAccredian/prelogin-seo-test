"use client";

import ProgramWrapper from "../Wrapper/ProgramWrapper";
import Admission from "./Admission/Admission";
import Billing from "./Billing/Billing";
import CTA from "./CTA/CTA";
import Certificate from "./Certificate/Certificate";
import Companies from "./Companies/Companies";
import Curriculum from "./Curriculum/Curriculum";
import ExtraPoints from "./ExtraPoints/ExtraPoints";
import FAQ from "./FAQ/FAQ";
import Faculty from "./Faculty/Faculty";
import FraudNotificationStrip from "./FraudNotificationStrip";
import Hero from "./Hero/Hero";
import Info from "./Info/Info";
import Overview from "./Overview/Overview";
import Projects from "./Projects/Projects";
import Related from "./Related/Related";
import Tools from "./Tools/Tools";
import Transition from "./Transition/Transition";
import USP from "./USP/USP";
import Line from "./generals/line";


const Wrapper = ({ data }) => {

  const renderSection = (section) => {
    switch (section) {
      case "overview":
        return (
          <>
            <Info data={data} />
            <Line />
            <Overview data={data} />
            <Line />
          </>
        );
      case "curriculum":
        return <Curriculum data={data} />;
      case "tools":
        return (
          <>
            <Line />
            <Tools data={data} />
          </>
        );
      case "unique points":
        return <USP data={data} />;
      case "faculty":
        return <Faculty data={data} />;
      case "projects":
        return <Projects data={data} />;
      case "certificate":
        return (
          <>
            <Certificate data={data} />
            <Line />
          </>
        );
      case "top companies":
        return <Companies data={data} />;
      case "career transition":
        return <Transition data={data} />;
      case "extra achievements":
        return <ExtraPoints data={data} />;
      case "program fee":
        return (
          <>
            <Line />
            <Billing data={data} />
            <Line />
            <Admission data={data} />
            <Line />
          </>
        );
      case "FAQs":
        return <FAQ data={data} />;
      default:
        return null;
    }
  };


  return <>
    <FraudNotificationStrip />
    <ProgramWrapper>
      <div className="programs w-full min-h-screen flex justify-center flex-col items-center font-circular">
        <Hero data={data} />
        <div className="w-full">
          {data && data?.sections?.map((section, index) => (
            <div key={index}>
              {renderSection(section)}
            </div>
          ))}
          {data?.id !== "gim-hybrid-post-graduate-diploma-in-management" && (
            <>
              <Line />
              <Related data={data} />
            </>
          )}
          <CTA data={data} />
        </div>
      </div>
    </ProgramWrapper>
  </>

}

export default Wrapper