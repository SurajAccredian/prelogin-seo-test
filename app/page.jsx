import Home from "./components/Home/Home";
import PROGRAMS from "./components/Assets/programs.json";
import { JsonLd } from "./components/JsonLd";
import { homepageGraph, BRAND_FAQS, onlyOpen } from "./lib/schema";

export const metadata = {
  title: "Accredian | India’s Leading Upskilling & Learning Platform",
  description:
    "Learn from top IIMs, IITs and XLRI through industry-relevant programs in AI, leadership, strategy and more. Build skills that move your career forward.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  const openPrograms = onlyOpen(
    (PROGRAMS || []).map((p) => ({
      id: p.id,
      title: p.program_name || p.title || "",
      university_name: p.university_name || "",
      enrollments: p.status === "admission closed" ? "inactive" : "active",
    }))
  ).slice(0, 10);

  const schemaGraph = homepageGraph({
    pageTitle: "Accredian | India’s Leading Upskilling & Learning Platform",
    featured: openPrograms,
    faqs: BRAND_FAQS,
  });

  return (
    <>
      <JsonLd data={schemaGraph} />
      <Home />
    </>
  );
}
