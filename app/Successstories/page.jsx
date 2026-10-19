import SuccessStories from "../components/success-stories/success-stories";
import React, { Suspense } from "react";

export const metadata = {
  title: "Success Stories",
  description:
    "Read inspiring career transformation stories from Accredian alumni. See how our programs helped professionals land roles at top companies like Google, Amazon, Microsoft and more.",
  alternates: {
    canonical: "/Successstories",
  },
};

export default function Page() {
  return <SuccessStories />;
}