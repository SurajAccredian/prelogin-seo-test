import CookiePolicy from "../../components/Policies/CookiePolicy";

export const metadata = {
  title: "Cookie Policy",
  description:
    "Learn how Accredian uses cookies to improve your browsing experience, personalize content, and analyze site usage.",
  alternates: {
    canonical: "/terms/cookie-policy",
  },
};

export default function CookiePolicyPage() {
  return <CookiePolicy />;
}
