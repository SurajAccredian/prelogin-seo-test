import AppLanding from "../components/AppLanding/AppLanding";

export const metadata = {
  title: { absolute: "Accredian Mobile App | Your IIT & IIM Program in Your Pocket" },
  description:
    "Download the Accredian mobile app. Join live faculty-led classes, access learning resources and course materials offline, and track your program progress seamlessly on your mobile device.",
  alternates: {
    canonical: "/app",
  },
};

export default function AppLandingPage() {
  return <AppLanding />;
}
