import React from "react";
import SearchIntentCategoryClient from "../../components/SearchIntent/SearchIntentCategoryClient";

export const metadata = {
  title: "Data Science Programs for Working Professionals",
  description:
    "Build data-driven decision-making skills in data science, analytics and AI through expert-led programs designed for ambitious working professionals.",
  keywords:
    "data science courses, data analytics courses, data science certification, data science program, online data science course, data science course for working professionals, IIT data science course, post graduate certificate in data science, analytics course, data science and AI course",
  alternates: {
    canonical: "https://accredian.com/professional-courses/data-science-courses",
  },
  openGraph: {
    title: "Data Science Programs for Working Professionals",
    description:
      "Build data-driven decision-making skills in data science, analytics and AI through expert-led programs designed for ambitious working professionals.",
    url: "https://accredian.com/professional-courses/data-science-courses",
    siteName: "Accredian",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/accredian-logo-image-v2.webp",
        width: 1200,
        height: 630,
        alt: "Data Science Programs at Accredian",
      },
    ],
  },
};

const DS_FAQS = [
  {
    question: "What can I learn through Data Science and Analytics courses?",
    answer:
      "The portfolio covers data science, AI, machine learning, analytics and related business applications, with options ranging from foundation learning to more specialised programs.",
  },
  {
    question: "Do I need prior coding experience to learn Data Science?",
    answer:
      "The portfolio includes foundation and applied programs alongside more advanced options. Prerequisites and technical requirements should be checked for the individual program.",
  },
  {
    question: "What is the difference between Data Science and Business Analytics?",
    answer:
      "The listed programs include both technical Data Science pathways and Business Analytics for Managers, giving learners options depending on whether they want deeper data skills or business-oriented analytics capabilities.",
  },
  {
    question: "Who are Data Science courses suitable for?",
    answer:
      "The portfolio provides options for learners building foundational data skills as well as professionals interested in AI, analytics, product management and digital transformation applications.",
  },
  {
    question: "What career-focused specialisations can I combine with Data Science?",
    answer:
      "The current portfolio combines Data Science with areas including AI, product management, business analytics and digital transformation.",
  },
  {
    question: "What should I consider before choosing a Data Science course?",
    answer:
      "Consider your existing knowledge, learning goals and the type of Data Science expertise you want to develop. The portfolio includes foundation, postgraduate and executive options covering Data Science, AI, machine learning, business analytics and related applications.",
  },
  {
    question: "Are there Data Science courses for beginners?",
    answer:
      "The portfolio includes foundation programs as well as postgraduate and executive options. Learners should compare prerequisites before selecting a program.",
  },
  {
    question: "How are AI and machine learning connected with Data Science?",
    answer:
      "AI and machine learning form part of the broader Data Science landscape, and the portfolio includes programs that combine Data Science with AI and related analytical applications.",
  },
  {
    question: "Can managers learn Business Analytics without pursuing a full Data Science pathway?",
    answer:
      "The portfolio includes a Business Analytics for Managers program, providing an option focused on the managerial application of analytics.",
  },
  {
    question: "How do I choose between Data Science and Analytics courses?",
    answer:
      "Consider whether your goal is to build foundational or technical Data Science capabilities, develop business-oriented analytics skills, or apply Data Science in areas such as product management and digital transformation.",
  },
];

export default function DataScienceProgrammesPage() {
  return (
    <SearchIntentCategoryClient
      filterKey="data-science"
      pageBadge="Data Science & Business Analytics"
      pageTitle="Data Science & Analytics Programs"
      pageDescription="The ability to turn data into meaningful insights is increasingly valuable in business decision-making. Build your knowledge of data science, artificial intelligence, machine learning, business analytics and digital transformation. Learn to interpret data, identify patterns and use evidence to address business challenges. Through the data science and analytics Programs, data professionals and managers can strengthen analytical skills, make better-informed decisions and uncover opportunities for business growth."
      breadcrumbLabel="Data Science & Analytics"
      faqs={DS_FAQS}
      ctaTitle="Master Data Science & Business Analytics"
      ctaDescription="Explore certificate and postgraduate programs in AI, machine learning, and analytics from leading institutions."
    />
  );
}
