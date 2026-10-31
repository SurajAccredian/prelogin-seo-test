import React from "react";
import SearchIntentCategoryClient from "../../components/SearchIntent/SearchIntentCategoryClient";

export const metadata = {
  title: "Best Executive Programs for Working Professionals | Accredian",
  description:
    "Upskill without pausing your career through executive Programs in leadership, management, AI and technology designed for busy working professionals.",
  keywords:
    "executive Programs for working professionals, executive education courses, online executive Programs, executive courses for working professionals, executive certificate program, executive management program, working professional courses, part-time executive program, executive education India",
  alternates: {
    canonical: "https://accredian.com/explore-programs/programs-for-working-professionals",
  },
  openGraph: {
    title: "Best Executive Programs for Working Professionals | Accredian",
    description:
      "Upskill without pausing your career through executive Programs in leadership, management, AI and technology designed for busy working professionals.",
    url: "https://accredian.com/explore-programs/programs-for-working-professionals",
    siteName: "Accredian",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/accredian-logo-image-v2.webp",
        width: 1200,
        height: 630,
        alt: "Executive Programs for Working Professionals at Accredian",
      },
    ],
  },
};

const WORKING_PROF_FAQS = [
  {
    question: "What are executive courses for working professionals?",
    answer:
      "Executive courses are professional learning programs focused on areas such as management, strategy, leadership, project management and AI while addressing the development needs of working professionals.",
  },
  {
    question: "Can I pursue an executive course while working full-time?",
    answer:
      "The programs in this category are positioned for working professionals. Individual schedules and delivery formats should be checked before enrolment.",
  },
  {
    question: "What subjects can working professionals study through executive programs?",
    answer:
      "The listed portfolio includes general management, strategy & leadership, strategic project management, business management and Leadership with AI.",
  },
  {
    question: "How do I choose the right executive course for my career?",
    answer:
      "Start with the capability you want to develop—general management, strategy, project leadership, business management or AI-enabled leadership—and then compare the relevant programs.",
  },
  {
    question: "Are executive courses suitable for career growth without taking a career break?",
    answer:
      "The category is specifically organised around working professionals, with programs focused on building management, strategic and leadership capabilities alongside professional careers.",
  },
  {
    question: "What skills can working professionals build through executive courses?",
    answer:
      "The listed programs cover management, strategy, project leadership, business management and AI-enabled leadership.",
  },
  {
    question: "What types of executive courses are available for working professionals?",
    answer:
      "The portfolio includes executive and executive-development programs across general management, strategy, project management, business management and Leadership with AI.",
  },
  {
    question: "Are executive courses suitable for professionals from different functions?",
    answer:
      "The range of management, strategy, project and AI-related programs provides learning options for professionals with different functional and leadership goals.",
  },
  {
    question: "How are executive courses different from general academic programs?",
    answer:
      "The programs listed are positioned around professional and executive development, with subject areas connected to management, strategy and workplace leadership.",
  },
  {
    question: "What should I consider before choosing an executive course?",
    answer:
      "Consider your experience, career objective, subject area, program eligibility, curriculum, format and how the learning aligns with the capabilities you want to build.",
  },
];

export default function CoursesForWorkingProfessionalsPage() {
  return (
    <SearchIntentCategoryClient
      filterKey="courses-for-working-professionals"
      pageTitle="Executive Programs for Professionals"
      pageDescription="Career growth often comes from broadening your business knowledge and learning to manage new challenges. Strengthen your understanding of management, strategy, leadership, project management and the growing role of AI in business. Gain perspectives that help you connect everyday decisions with wider organisational goals. Through the executive Programs for working professionals, managers and professionals can build relevant skills, take on broader responsibilities and move towards their career aspirations."
      pageMobileDescription="Through the executive Programs for working professionals, managers and professionals can build relevant skills, take on broader responsibilities and move towards their career aspirations."
      breadcrumbLabel="For Working Professionals"
      faqs={WORKING_PROF_FAQS}
      ctaTitle="Upskill While Working Full-Time"
      ctaDescription="Compare flexible weekend executive programs from top IIMs, IITs, and XLRI designed to fit your busy schedule."
    />
  );
}
