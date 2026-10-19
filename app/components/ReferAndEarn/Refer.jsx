"use client";

import Wrapper from "../Wrapper/HomePageWrapper";
import Hero from "./Hero/Hero";
import ReferralLinks from "../Navbar/ReferralLinks/ReferralLinks";
import Process from "./Refer_process/Process";
// import Benefits from "./Benefit_table/Benefits-old";
import Refer_FAQ from "./Faq/Refer_FAQ";
import CTA_refer from "./Support/CTA_refer";
import Benefits from "./Benefit_table/Benefits";

const Refer = () => {
  return (
    <>
      <Wrapper>
        <ReferralLinks />
        <Hero />
        <Benefits />
        <Process />
        {/* <Benefits /> */}
        <Refer_FAQ />
        <CTA_refer />
      </Wrapper>
    </>
  );
};

export default Refer;

