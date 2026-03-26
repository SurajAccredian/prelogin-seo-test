"use client"
import React, { Suspense } from "react";
import Mentor from "../../components/MentorPage/Mentor";

export default function CareerMentorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Mentor />
    </Suspense>
  );
}
