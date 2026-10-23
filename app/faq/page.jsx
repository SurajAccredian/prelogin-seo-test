import HomePageWrapper from "../components/Wrapper/HomePageWrapper";
import FaqAccordionSection from "../components/Faq/FaqAccordionSection";
import { mainFaq } from "../components/Assets/faq";
import { JsonLd } from "../components/JsonLd";
import { makeGraph, breadcrumbNode, faqPageNode } from "../lib/schema";

const PAGE_URL = "https://accredian.com/faq";

export const metadata = {
  title: "Frequently Asked Questions (FAQ)",
  description:
    "Find answers to frequently asked questions about Accredian's executive programs, university partnerships, admissions, live learning format, fees, and career support.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions (FAQ) | Accredian",
    description:
      "Find answers to frequently asked questions about Accredian's executive programs, university partnerships, admissions, live learning format, fees, and career support.",
    url: PAGE_URL,
  },
};

export default function FaqPage() {
  // Flatten questions for FAQPage schema matching the visible content
  const allFaqs = mainFaq.flatMap((category) =>
    category.questions.map((q) => ({
      question: q.question,
      answer: q.answer,
    }))
  );

  const breadcrumbs = breadcrumbNode(PAGE_URL, [
    ["Home", "https://accredian.com/"],
    ["FAQ", PAGE_URL],
  ]);

  const faqSchema = faqPageNode(PAGE_URL, allFaqs);
  const graph = makeGraph(breadcrumbs, faqSchema);

  return (
    <HomePageWrapper>
      <JsonLd data={graph} />
      <FaqAccordionSection faqData={mainFaq} />
    </HomePageWrapper>
  );
}
