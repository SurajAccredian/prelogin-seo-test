import React, { Suspense } from "react";
import Mentor from "../../components/MentorPage/Mentor";

export const metadata = {
  title: "Become a Mentor",
  description:
    "Share your expertise as an Accredian mentor. Guide aspiring professionals, earn competitive compensation, and enjoy flexible scheduling that fits your lifestyle.",
  alternates: {
    canonical: "/career/mentor",
  },
};

export default function CareerMentorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Mentor />
    </Suspense>
  );
}
