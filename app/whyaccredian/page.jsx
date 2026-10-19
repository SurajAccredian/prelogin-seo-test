import React, { Suspense } from "react";
import WhyAccredian from "../components/WhyInsaid/WhyAccredian";

export const metadata = {
  title: "Why Accredian",
  description:
    "Discover why thousands of professionals choose Accredian for career advancement. Industry-led programs from IITs, IIMs & XLRI with expert mentors, live sessions, and dedicated placement support.",
  alternates: {
    canonical: "/whyaccredian",
  },
};

export default function WhyAccredianPage() {
  return <WhyAccredian />;
}