import React from "react";
import ProgramWrapper from "../Wrapper/ProgramWrapper";
import Hero from "./Hero";
import Steps from "./Steps";
import WhatYouWillLearn from "./WhatYouWillLearn";
import WhoShouldJoin from "./WhoShouldJoin";
import WhyThisCourse from "./WhyThisCourse";
import Curriculum from "./Curriculum";
import Instructor from "./Instructor";
import Certification from "./Certification";
import Snapshot from "./Snapshot";
import FAQ from "./FAQ";
import Related from "./Related";
import StickyPurchase from "./StickyPurchase";

const Wrapper = ({ data }) => {
  return (
    <ProgramWrapper>
      <div className="free-courses">
        <Hero data={data} />

        <div id="how-it-works" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">How it works</span>
              <h2>Learn free. Pay only to get certified.</h2>
              <p>Every step of the course content is free. Certification is a separate, optional step whenever you're ready.</p>
            </div>
            <Steps data={data} />
          </div>
        </div>

        <div id="what-you-will-learn" className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Skills</span>
              <h2>What you'll learn</h2>
              <p>Practical, job-ready skills you can apply the same day you learn them.</p>
            </div>
            <WhatYouWillLearn data={data} />
          </div>
        </div>

        <div id="who-should-join" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Fit check</span>
              <h2>Who should join</h2>
              <p>This course is built for working professionals, not developers.</p>
            </div>
            <WhoShouldJoin data={data} />
          </div>
        </div>

        <div id="why-this-course" className="section">
          <div className="container">
            <WhyThisCourse data={data} />
          </div>
        </div>

        <div id="curriculum" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Inspect before you buy</span>
              <h2>Curriculum</h2>
              <p>6 modules &middot; 25+ lessons &middot; 9 hours total &middot; 100% free to access</p>
            </div>
            <Curriculum data={data} />
          </div>
        </div>

        <div id="instructor" className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Learn from a certified expert</span>
              <h2>Meet the instructor</h2>
            </div>
            <Instructor data={data} />
          </div>
        </div>

        <div id="certification" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">What you receive</span>
              <h2>Certification</h2>
              <p>Two tracks: a free badge for completing the course, and an official certification for those who want to prove it.</p>
            </div>
            <Certification data={data} />
          </div>
        </div>

        <div id="snapshot" className="section-compact" style={{ borderTop: "1px solid var(--accredian-border)", borderBottom: "1px solid var(--accredian-border)" }}>
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">At a glance</span>
              <h2>Course snapshot</h2>
            </div>
            <Snapshot data={data} />
          </div>
        </div>

        <div id="faq" className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Questions</span>
              <h2>Frequently asked questions</h2>
            </div>
            <FAQ data={data} />
          </div>
        </div>

        {/* <div id="related" className="section section-alt" style={{ borderTop: "1px solid var(--accredian-border)" }}>
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Explore more</span>
              <h2>Related Microsoft courses</h2>
            </div>
            <Related data={data} />
          </div>
        </div> */}

        <StickyPurchase data={data} />
      </div>
    </ProgramWrapper>
  );
};

export default Wrapper;
