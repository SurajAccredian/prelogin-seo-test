import React from "react";
import SearchIntentCategoryClient from "../../components/SearchIntent/SearchIntentCategoryClient";

export const metadata = {
  title: "IIM Online Programs for Working Executives | Accredian",
  description:
    "Build leadership, management, AI and business expertise through IIM executive and certificate programs designed for ambitious working professionals.",
  keywords:
    "IIM courses, IIM certificate courses, IIM executive courses, IIM Programs, IIM executive education, IIM leadership program, IIM CEO program, IIM CFO program, IIM CTO program, IIM AI program, IIM senior management program, IIM courses for working professionals",
  alternates: {
    canonical: "https://accredian.com/explore-programs/iim-programs",
  },
  openGraph: {
    title: "IIM Online Programs for Working Executives | Accredian",
    description:
      "Build leadership, management, AI and business expertise through IIM executive and certificate programs designed for ambitious working professionals.",
    url: "https://accredian.com/explore-programs/iim-programs",
    siteName: "Accredian",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/accredian-logo-image-v2.webp",
        width: 1200,
        height: 630,
        alt: "IIM Programs at Accredian",
      },
    ],
  },
};

const IIM_FAQS = [
  {
    question: "What types of IIM programs are available for working professionals?",
    answer:
      "IIM programs span executive leadership, business management, AI, finance, HR, strategy and senior management. The available options range from specialised functional programs to broader management and leadership pathways.",
  },
  {
    question: "Who are IIM programs suitable for?",
    answer:
      "The portfolio includes programs relevant to professionals across different career stages—from those building management and functional expertise to experienced professionals exploring senior management and CXO-focused learning.",
  },
  {
    question: "What subjects can I study through IIM programs?",
    answer:
      "Available areas include leadership, business management, AI, strategy, finance, investment banking, FinTech, HR and senior management, along with specialised CEO, CFO, CTO, CHRO and digital & AI leadership pathways.",
  },
  {
    question: "Can I pursue an IIM program while working full-time?",
    answer:
      "Yes, all executive IIM programs in this catalog are delivered in convenient live online weekend formats specifically structured around working professionals' schedules.",
  },
  {
    question: "Do I receive a certificate after completing an IIM program?",
    answer:
      "Yes, completing participants receive official executive certification and alumni credentials directly from the respective Indian Institute of Management (IIM) upon satisfying attendance and evaluation criteria.",
  },
  {
    question: "What is the difference between IIM executive and certificate programs?",
    answer:
      "IIM executive programs generally focus on holistic leadership and cross-functional decision-making, while certificate programs provide targeted deep-dives into specific functional domains such as AI, FinTech, or Investment Banking.",
  },
  {
    question: "What management areas are covered in IIM courses?",
    answer:
      "IIM courses in the listed portfolio span business management, strategy, leadership, finance, HR, AI, FinTech and investment banking, alongside senior and executive leadership pathways.",
  },
  {
    question: "Are IIM programs available across different management specialisations?",
    answer:
      "Yes. The portfolio spans business management, strategy, leadership, finance, FinTech, investment banking, HR and AI, allowing professionals to explore learning aligned with different functional interests.",
  },
  {
    question: "How do I choose an IIM program based on my career goals?",
    answer:
      "Consider the capabilities you want to strengthen and the roles you are aiming for. Compare broader management and senior leadership programs with specialized functional pathways, or speak with an Accredian learning advisor.",
  },
  {
    question: "Are there IIM programs for senior and executive leadership development?",
    answer:
      "Yes. The portfolio includes Senior Management, Global Senior Leadership, and dedicated C-suite pathways for CEO, CFO, CTO, CHRO, and Chief Digital & AI Officers.",
  },
];

export default function IIMCoursesPage() {
  return (
    <SearchIntentCategoryClient
      filterKey="iim"
      pageTitle="IIM Executive & Certificate Programs"
      pageDescription="Build your knowledge across management, strategy, finance, human resources and emerging business technologies. Gain broader business perspectives to approach challenges with confidence and make informed decisions. A strong understanding of management principles, strategic decision-making and core business functions is essential for effective leadership. Through the IIM certificate Programs, senior managers and business leaders can strengthen their leadership capabilities, improve business performance and prepare for greater responsibilities."
      pageMobileDescription="Through the IIM certificate Programs, senior managers and business leaders can strengthen their leadership capabilities, improve business performance and prepare for greater responsibilities."
      breadcrumbLabel="IIM Programs"
      faqs={IIM_FAQS}
      ctaTitle="Find the Right IIM Program for Your Career"
      ctaDescription="Explore programs aligned with your experience and career goals or speak with an advisor for personalized guidance."
    />
  );
}
