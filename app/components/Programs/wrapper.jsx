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
            <Info />
            <Line />
            <Overview />
            <Line />
          </>
        );
      case "curriculum":
        return <Curriculum />;
      case "tools":
        return (
          <>
            <Line />
            <Tools />
          </>
        );
      case "unique points":
        return <USP />;
      case "faculty":
        return <Faculty />;
      case "projects":
        return <Projects />;
      case "certificate":
        return (
          <>
            <Certificate />
            <Line />
          </>
        );
      case "top companies":
        return <Companies />;
      case "career transition":
        return <Transition />;
      case "extra achievements":
        return <ExtraPoints />;
      case "program fee":
        return (
          <>
            <Line />
            <Billing />
            <Line />
            <Admission />
            <Line />
          </>
        );
      case "FAQs":
        return <FAQ />;
      default:
        return null;
    }
  };


  return <>
    <FraudNotificationStrip />
    <ProgramWrapper>
      <div className="programs w-full min-h-screen flex justify-center flex-col items-center font-circular">
        <Hero />
        <div className="w-full">
          {data && data?.sections?.map((section, index) => (
            <div key={index}>
              {renderSection(section)}
            </div>
          ))}
          <Line />
          <Related />
          <CTA />
        </div>
      </div>
    </ProgramWrapper>
  </>

}

export default Wrapper