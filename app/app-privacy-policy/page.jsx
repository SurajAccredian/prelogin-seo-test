import AppPrivacyPolicy from "../components/AppPrivacyPolicy/AppPrivacyPolicy";

export const metadata = {
  title: { absolute: "Accredian Mobile App Privacy Policy" },
  description:
    "Privacy Policy for the Accredian mobile application. Learn about what information we collect, how we use it, and your rights over your data.",
  alternates: {
    canonical: "/app-privacy-policy",
  },
};

export default function AppPrivacyPolicyPage() {
  return <AppPrivacyPolicy />;
}
