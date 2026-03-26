import React, { Suspense } from "react";
import WhyAccredian from "../components/WhyInsaid/WhyAccredian";

export default function WhyAccredianPage() {
  return (
    <Suspense fallback={null}>
      <WhyAccredian />
    </Suspense>
  );
}
