"use client";

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
  const isMicrosoftCourse =
    data?.id === "transform-business-workflows-with-generative-ai" ||
    Boolean(data?.partner_name?.toLowerCase()?.includes("microsoft")) ||
    Boolean(data?.certification?.paid_cert);

  const moduleCount = data?.modules || (data?.curriculum ? data.curriculum.length : 6);
  const lessonCount =
    data?.lessons ||
    (data?.curriculum
      ? `${data.curriculum.reduce((acc, m) => acc + (m.topics?.length || 0), 0)}+`
      : "25+");

  return (
    <ProgramWrapper>
      <div className="free-courses">
        <Hero data={data} />

        <div id="how-it-works" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">How it works</span>
              <h2>
                {isMicrosoftCourse
                  ? "Learn free. Pay only to get certified."
                  : "Learn free. Earn your certificate."}
              </h2>
              <p>
                {isMicrosoftCourse
                  ? "Every step of the course content is free. Certification is a separate, optional step whenever you're ready."
                  : "The complete course, including all modules and quizzes, is 100% free. Earn your Certificate of Completion after successfully completing the required assessments."}
              </p>
            </div>
            <Steps data={data} />
          </div>
        </div>

        <div id="what-you-will-learn" className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Skills</span>
              <h2>What you'll learn</h2>
              <p>
                 {isMicrosoftCourse
                  ? " Practical, job-ready skills you can apply the same day you learn them."
                  : "Practical Product Management skills you can apply to real-world product scenarios."}
           
               </p>
              
            </div>
            <WhatYouWillLearn data={data} />
          </div>
        </div>

        <div id="who-should-join" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Fit check</span>
              <h2>Who should join</h2>
              <p>
                 {isMicrosoftCourse
                  ? "This course is built for working professionals, not developers."
                  : "This course is designed for professionals looking to build a practical foundation in Product Management."}
           
              </p>
              
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
              <span className="eyebrow">Curriculum</span>
              <h2>Course Curriculum</h2>
              <p>
                {moduleCount} modules &middot; {lessonCount} lessons &middot;{" "}
                {data.duration || "Self-paced"} total &middot; 100% free 

                
              </p>
            </div>
            <Curriculum data={data} />
          </div>
        </div>

        {data.instructor && (
          <div id="instructor" className="section">
            <div className="container">
              <div className="section-head">
                <span className="eyebrow">Learn from a certified expert</span>
                <h2>Meet the instructor</h2>
              </div>
              <Instructor data={data} />
            </div>
          </div>
        )}

        <div id="certification" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">What you receive</span>
              <h2>Certification</h2>
              <p>
                {isMicrosoftCourse
                  ? "Two tracks: a free badge for completing the course, and an official certification for those who want to prove it."
                  : "Earn a verified Certificate of Completion from Accredian after completing all course modules and assessments."}
              </p>
            </div>
            <Certification data={data} />
          </div>
        </div>

        <div
          id="snapshot"
          className="section-compact"
          style={{
            borderTop: "1px solid var(--accredian-border)",
            borderBottom: "1px solid var(--accredian-border)",
          }}
        >
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
              <h2>Related courses</h2>
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
