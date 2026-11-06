import React from "react";
import SearchIntentCategoryClient from "../../components/SearchIntent/SearchIntentCategoryClient";

export const metadata = {
  title: "Top Upskilling Courses for Working Professionals",
  description:
    "Accelerate your career growth through top upskilling programs in leadership, AI, data and management designed for experienced working professionals.",
  keywords:
    "courses for career advancement, upskilling courses, upskilling courses for working professionals, career growth courses, professional upskilling program, online upskilling course, certificate courses for working professionals, career advancement program, courses to upskill",
  alternates: {
    canonical: "https://accredian.com/explore-programs/career-advancement-programs",
  },
  openGraph: {
    title: "Top Upskilling Courses for Working Professionals",
    description:
      "Accelerate your career growth through top upskilling programs in leadership, AI, data and management designed for experienced working professionals.",
    url: "https://accredian.com/explore-programs/career-advancement-programs",
    siteName: "Accredian",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/accredian-logo-image-v2.webp",
        width: 1200,
        height: 630,
        alt: "Career Advancement Programs at Accredian",
      },
    ],
  },
};

const CAREER_ADV_FAQS = [
  {
    question: "What are professional upskilling courses?",
    answer:
      "Professional upskilling courses help learners build additional capabilities relevant to their current or future professional responsibilities, with options across management, leadership, AI, finance and project management.",
  },
  {
    question: "Which skills can I build through career advancement courses?",
    answer:
      "The listed portfolio covers general and business management, strategy, project management, leadership, AI-enabled leadership, investment banking and capital markets.",
  },
  {
    question: "Can I upskill while continuing my current job?",
    answer:
      "The portfolio includes executive and professional programs intended for professional learners. Individual program schedules and formats should be reviewed before enrolment.",
  },
  {
    question: "How do I choose an upskilling course for career advancement?",
    answer:
      "Identify the gap between your current capabilities and intended direction, then choose the corresponding area—management, strategy, project leadership, AI, finance or broader leadership.",
  },
  {
    question: "What types of programs are available for professional upskilling?",
    answer:
      "The portfolio includes executive, professional and postgraduate certificate pathways across multiple business disciplines. The appropriate option depends on your experience, learning objective and the credential you are seeking.",
  },
  {
    question: "How are career advancement courses different from general professional courses?",
    answer:
      "Career advancement courses are selected around capabilities that can support professional development and broader responsibilities. The listed portfolio spans management, strategy, project management, leadership, AI, investment banking and capital markets, allowing professionals to choose learning aligned with their development goals.",
  },
  {
    question: "Are career advancement courses suitable for experienced professionals?",
    answer:
      "The portfolio includes executive, professional and postgraduate certificate programs relevant to professional development, although experience requirements vary by program.",
  },
  {
    question: "Can I choose an upskilling course based on my current job function?",
    answer:
      "Yes. Professionals can select learning aligned with areas such as management, project leadership, strategy, AI or finance depending on their current responsibilities and future goals.",
  },
  {
    question: "How do I identify the right skill to develop for career growth?",
    answer:
      "Start by identifying the capabilities required for the responsibilities or roles you want to pursue, then compare programs that address those gaps.",
  },
  {
    question: "What should I compare before selecting a career advancement course?",
    answer:
      "Compare the subject area, program level, curriculum, eligibility, format and how closely the learning aligns with your professional development goals.",
  },
];

export default function CareerAdvancementCoursesPage() {
  return (
    <SearchIntentCategoryClient
      filterKey="career-advancement"
      pageTitle="Career Advancement & Upskilling Programs"
      pageDescription="Staying relevant in a changing business environment means continually developing your knowledge and skills. Build expertise in business management, strategy, project management, AI and finance-related areas. Gain fresh perspectives to solve problems, adapt to new demands and identify opportunities for professional growth. Through the programs for career advancement and upskilling, professionals and managers can strengthen their capabilities, expand their career options and prepare for their next professional milestone."
      pageMobileDescription="Upskill across strategic project management, AI leadership, finance, and general management with top IIM, IIT, and XLRI programs."
      breadcrumbLabel="Career Advancement"
      faqs={CAREER_ADV_FAQS}
      ctaTitle="Accelerate Your Professional Growth"
      ctaDescription="Compare executive upskilling programs from IIM Lucknow, IIM Visakhapatnam, IIT Kanpur, XLRI, and SP Jain."
    />
  );
}
