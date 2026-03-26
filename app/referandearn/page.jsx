"use client"
import { Suspense } from "react";
import Refer from "../components/ReferAndEarn/Refer";

export default function ReferAndEarnPage() {
  return (
    <Suspense fallback={<div className="min-h-screen"></div>}>
      <Refer />
    </Suspense>
  );
}
