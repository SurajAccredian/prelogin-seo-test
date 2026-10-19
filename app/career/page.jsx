import Career from "../components/Career/Career";

export const metadata = {
  title: { absolute: "Careers at Accredian" },
  description:
    "Explore exciting career opportunities at Accredian. Join our team and help shape the future of professional education in India.",
  alternates: {
    canonical: "/career",
  },
};

export default function CareerPage() {
  return <Career />;
}
