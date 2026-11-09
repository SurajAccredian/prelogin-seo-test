"use client";

import React from "react";
import { LandingPageProvider } from "./LandingPageContext";
import Footer from "../Footer/Footer";
import TopBar from "./sections/TopBar";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Stats from "./sections/Stats";
import TargetAudience from "./sections/TargetAudience";
import LearningExperience from "./sections/LearningExperience";
import Curriculum from "./sections/Curriculum";
import SignatureExperiences from "./sections/SignatureExperiences";
import Certificate from "./sections/Certificate";
import CompanyLogos from "./sections/CompanyLogos";
import Testimonials from "./sections/Testimonials";
import Fees from "./sections/Fees";
import AdmissionProcess from "./sections/AdmissionProcess";
import FAQs from "./sections/FAQs";
import FinalCTA from "./sections/FinalCTA";
import StickyMobileCTA from "./sections/StickyMobileCTA";
import LeadModal from "./sections/LeadModal";
import "./LandingPage.css";

const SECTION_REGISTRY = {
  hero: Hero,
  stats: Stats,
  target_audience: TargetAudience,
  learning_experience: LearningExperience,
  curriculum: Curriculum,
  signature_experiences: SignatureExperiences,
  certificate: Certificate,
  company_logos: CompanyLogos,
  testimonials: Testimonials,
  fees: Fees,
  admission_process: AdmissionProcess,
  faqs: FAQs,
  final_cta: FinalCTA,
};

export default function LandingPageTemplate({ data }) {
  if (!data) return null;

  return (
    <LandingPageProvider
      urgency={data.urgency}
      formConfig={data.form_config}
      programName={data.form_config?.program_name}
    >
      <div className="landing-page-root">
        {/* Urgency Announcement Bar */}
        {data.urgency?.deadline && <TopBar data={data.urgency} />}

        {/* Landing Page Header with Co-branded Logos and Urgency Timer */}
        <Header data={data.header} urgency={data.urgency} />

        {/* Dynamic Data-Driven Content Sections */}
        <main>
          {data.sections?.map((sectionKey) => {
            const SectionComponent = SECTION_REGISTRY[sectionKey];
            if (!SectionComponent || !data[sectionKey]) return null;

            return (
              <SectionComponent
                key={sectionKey}
                data={data[sectionKey]}
                formConfig={data.form_config}
              />
            );
          })}
        </main>

        {/* Floating Overlays */}
        <StickyMobileCTA urgency={data.urgency} />
        <LeadModal formConfig={data.form_config} urgency={data.urgency} />
      </div>

      {/* Accredian Official Site Footer */}
      <Footer />
    </LandingPageProvider>
  );
}
