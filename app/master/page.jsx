import React from "react";
import HomePageWrapper from "../components/Wrapper/HomePageWrapper";
import MasterForm from "../components/MasterLogin/MasterForm";

export const metadata = {
  title: "Admin Login",
  description: "Accredian admin portal login.",
  robots: { index: false, follow: false },
};

export default function Master() {
  return (
    <HomePageWrapper>
      <MasterForm />
    </HomePageWrapper>
  );
}
