import React from "react";
import SearchIntentCategoryClient from "../../components/SearchIntent/SearchIntentCategoryClient";

export const metadata = {
  title: "XLRI Executive Development Programs | Accredian",
  description:
    "Advance your expertise in leadership, strategy, HR and people management through top XLRI executive programs designed for experienced professionals.",
  keywords:
    "XLRI courses, XLRI executive courses, XLRI online courses, XLRI certificate courses, XLRI executive development program, XLRI HR course, XLRI general management program, XLRI CTO program, XLRI CMO program, XLRI global senior management program, XLRI courses for working professionals",
  alternates: {
    canonical: "https://accredian.com/explore-programs/xlri-programs",
  },
  openGraph: {
    title: "XLRI Executive Development Programs | Accredian",
    description:
      "Advance your expertise in leadership, strategy, HR and people management through top XLRI executive programs designed for experienced professionals.",
    url: "https://accredian.com/explore-programs/xlri-programs",
    siteName: "Accredian",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/accredian-logo-image-v2.webp",
        width: 1200,
        height: 630,
        alt: "XLRI Programs at Accredian",
      },
    ],
  },
};

const XLRI_FAQS = [
  {
    question: "What types of XLRI programs are available for professionals?",
    answer:
      "XLRI programs cover executive development across HR, technology, marketing, general management, strategy and senior leadership.",
  },
  {
    question: "What subjects can I study through XLRI programs?",
    answer:
      "Professionals can explore strategic HR, digital HR, people analytics, general management, strategy, technology leadership, sales and marketing, and global senior management.",
  },
  {
    question: "Who are XLRI executive programs suitable for?",
    answer:
      "The portfolio includes options for professionals developing functional expertise as well as experienced managers preparing for broader strategic and senior leadership responsibilities.",
  },
  {
    question: "Are XLRI courses suitable for working professionals?",
    answer:
      "Yes. XLRI executive programs are designed for professionals looking to strengthen their expertise across areas such as leadership, strategy, HR, management, technology, and sales & marketing. Program requirements and learning formats may vary depending on the course selected.",
  },
  {
    question: "How do I choose the right XLRI program?",
    answer:
      "Start with your career objective. Professionals can choose among HR, technology, marketing and broader management pathways depending on whether they want functional specialisation or wider strategy and leadership development.",
  },
  {
    question: "What skills can I develop through XLRI executive programs?",
    answer:
      "The portfolio supports development across strategy, leadership, HR, people analytics, general management, technology leadership, sales and marketing.",
  },
  {
    question: "Are XLRI programs focused only on HR?",
    answer:
      "No. While XLRI offers programs in strategic and digital HR, the listed portfolio also includes general management, strategy, technology, marketing and senior management pathways.",
  },
  {
    question: "Are there XLRI programs for senior leadership development?",
    answer:
      "Yes. The portfolio includes Global Senior Management, Strategy & Leadership and specialised executive development pathways alongside functional programs.",
  },
  {
    question: "What is an XLRI executive development program?",
    answer:
      "XLRI executive development programs are professional learning pathways focused on strengthening capabilities across areas such as management, strategy, leadership, HR, technology and marketing. The specific focus and learning objectives vary by program.",
  },
  {
    question: "How do XLRI programs support different professional goals?",
    answer:
      "The portfolio provides both functional and broader management pathways, allowing professionals to select learning aligned with areas such as HR, technology, marketing, strategy or senior leadership.",
  },
];

export default function XLRICoursesPage() {
  return (
    <SearchIntentCategoryClient
      filterKey="xlri"
      pageBadge="XLRI Executive Education"
      pageTitle="XLRI Executive Development Programs"
      pageDescription="Effective leadership begins with understanding people, strengthening business decisions and responding well to change. Build your knowledge of human resources, people analytics, general management, technology leadership, sales and marketing. Gain fresh perspectives to improve team performance and align people with business goals. Through the XLRI executive development programs, managers, HR professionals and senior leaders can develop the skills to lead teams effectively and contribute to organisational growth."
      pageMobileDescription="Through the XLRI executive development programs, managers, HR professionals and senior leaders can develop the skills to lead teams effectively and contribute to organisational growth."
      breadcrumbLabel="XLRI Programs"
      faqs={XLRI_FAQS}
      ctaTitle="Find the Right XLRI Program for Your Career"
      ctaDescription="Explore Executive Development Programs from XLRI in General Management, Strategic HR, People Analytics, and Global Senior Management."
    />
  );
}
