import SearchedPage from "../components/Home/SearchedPage/SearchedPage";
import PROGRAMS from "../components/Assets/programs.json";
import { JsonLd } from "../components/JsonLd";
import { programsIndexGraph } from "../lib/schema";

export const metadata = {
  title: "All Programs",
  description:
    "Browse all professional certification programs at Accredian. Courses from IITs, IIMs, XLRI & SP Jain in Data Science, AI, Product Management, Business Analytics and more.",
  alternates: {
    canonical: "/programs",
  },
};

export default function ProgramsPage() {
  const programSummaries = (PROGRAMS || []).map((p) => ({
    id: p.id,
    title: p.program_name || p.title || "",
    university_name: p.university_name || "",
    enrollments: p.status === "admission closed" ? "inactive" : "active",
  }));

  const schemaGraph = programsIndexGraph({
    pageTitle: "All Programs | Accredian",
    programs: programSummaries,
  });

  return (
    <>
      <JsonLd data={schemaGraph} />
      <SearchedPage />
    </>
  );
}
