import MasterFaq from "../components/Faq/MasterFaq";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about Accredian's programs, admission process, fees, EMI options, and career support services.",
  alternates: {
    canonical: "/Faq",
  },
};

export default function FaqPage() {
  return <MasterFaq />;
}
