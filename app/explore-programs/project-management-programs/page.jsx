import React from "react";
import SearchIntentCategoryClient from "../../components/SearchIntent/SearchIntentCategoryClient";

export const metadata = {
  title: "Top Project Management Courses for Working Professionals",
  description:
    "Master planning, delivery and strategic alignment through top project management programs designed for ambitious managers and working professionals.",
  keywords:
    "project management courses, strategic project management course, project management certification, project management program, online project management course, project management course for working professionals, project leadership course, IIT project management course, project manager certification India",
  alternates: {
    canonical: "https://accredian.com/explore-programs/project-management-programs",
  },
  openGraph: {
    title: "Top Project Management Courses for Working Professionals",
    description:
      "Master planning, delivery and strategic alignment through top project management programs designed for ambitious managers and working professionals.",
    url: "https://accredian.com/explore-programs/project-management-programs",
    siteName: "Accredian",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/accredian-logo-image-v2.webp",
        width: 1200,
        height: 630,
        alt: "Strategic Project Management Programs at Accredian",
      },
    ],
  },
};

const PM_FAQS = [
  {
    question: "What is Strategic Project Management?",
    answer:
      "Strategic Project Management connects project planning and execution with broader organisational strategy, leadership and business objectives.",
  },
  {
    question: "What skills can I develop through Project Management courses?",
    answer:
      "The programs focus on areas including project strategy, planning, execution, risk, governance and leadership.",
  },
  {
    question: "Who are Strategic Project Management programs suitable for?",
    answer:
      "The category includes executive, professional, advanced and postgraduate certificate options, providing different learning pathways depending on experience and program requirements.",
  },
  {
    question: "How is Strategic Project Management different from traditional Project Management?",
    answer:
      "Strategic Project Management goes beyond managing individual tasks and timelines by connecting project execution with leadership, governance and organisational objectives.",
  },
  {
    question: "Can Project Management courses support progression into project leadership?",
    answer:
      "The listed programs combine project management with strategy and leadership, making the category relevant to professionals seeking stronger capabilities for managing complex projects and initiatives.",
  },
  {
    question: "What are the benefits of learning Strategic Project Management?",
    answer:
      "Strategic Project Management helps professionals connect project planning and execution with broader business objectives, while strengthening capabilities in areas such as strategy, risk, governance and project leadership.",
  },
  {
    question: "Is Strategic Project Management relevant for experienced professionals?",
    answer:
      "The portfolio includes executive, professional and postgraduate certificate options, providing pathways for professionals looking to strengthen project and leadership capabilities.",
  },
  {
    question: "Why is leadership important in Project Management?",
    answer:
      "Project leadership helps connect execution with teams, stakeholders and organisational priorities. Several programs in the portfolio explicitly combine Strategic Project Management with leadership.",
  },
  {
    question: "How does Strategic Project Management connect with business strategy?",
    answer:
      "It aligns project selection, planning and execution with broader organisational priorities and business objectives rather than treating projects as isolated activities.",
  },
  {
    question: "How do I choose a Project Management program?",
    answer:
      "Compare program level, curriculum, eligibility and whether you need a stronger focus on strategic project management alone or a combination of project management and leadership.",
  },
];

export default function ProjectManagementProgrammesPage() {
  return (
    <SearchIntentCategoryClient
      filterKey="project-management"
      pageTitle="Strategic Project Management Programs"
      pageDescription="Successful projects require clear direction, effective planning and the ability to bring people together around shared goals. Develop skills in project planning, execution, resource management, risk assessment and strategic alignment. Learn to manage challenges, make informed decisions and keep projects focused on business outcomes. Through the strategic project management Programs, project managers and team leaders can improve project delivery, strengthen leadership skills and contribute more effectively to organisational goals."
      pageMobileDescription="Deliver high-impact business outcomes with accredited strategic project management credentials from IIM Lucknow and IIT Kanpur."
      breadcrumbLabel="Strategic Project Management"
      faqs={PM_FAQS}
      ctaTitle="Lead High-Impact Business Projects"
      ctaDescription="Compare project management certifications from IIT Kanpur, IIT Hyderabad, IIM Lucknow, and IIM Visakhapatnam."
    />
  );
}
