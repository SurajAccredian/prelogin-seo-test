import { Suspense } from "react";
import Refer from "../components/ReferAndEarn/Refer";

export const metadata = {
  title: "Refer & Earn",
  description:
    "Refer your friends and colleagues to Accredian and earn exciting rewards. Share the gift of quality professional education and grow your network together.",
};

export default function ReferAndEarnPage() {
  return (
    <Suspense fallback={<div className="min-h-screen"></div>}>
      <Refer />
    </Suspense>
  );
}
