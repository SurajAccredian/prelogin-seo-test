import SearchedPage from "../components/Home/SearchedPage/SearchedPage";

export const metadata = {
  title: "All Programs",
  description:
    "Browse all professional certification programs at Accredian. Courses from IITs, IIMs, XLRI & SP Jain in Data Science, AI, Product Management, Business Analytics and more.",
  alternates: {
    canonical: "/programs",
  },
};

export default function ProgramsPage() {
  return <SearchedPage />;
}
