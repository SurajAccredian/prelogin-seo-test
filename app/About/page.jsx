import About from "../components/About/About";

export const metadata = {
  title: "About Accredian",
  description:
    "Learn about Accredian's mission to deliver world-class professional education. We partner with IITs, IIMs, XLRI & SP Jain to offer career-transforming certification programs for working professionals.",
  alternates: {
    canonical: "/About",
  },
};

export default function AboutPage() {
  return <About />;
}
