import React from "react";
import SearchIntentCategoryClient from "../../components/SearchIntent/SearchIntentCategoryClient";

export const metadata = {
  title: "Programs to Transition into Leadership Roles | Accredian",
  description:
    "Step confidently into management and senior leadership with programs designed to build strategic thinking, people leadership and business judgement.",
  keywords:
    "leadership courses, courses to become a leader, leadership development program, courses for first time managers, management courses for working professionals, transition to leadership, leadership with AI course, general management program, executive program in business management, leadership course for career growth",
  alternates: {
    canonical: "https://accredian.com/explore-programs/leadership-transition-programs",
  },
  openGraph: {
    title: "Programs to Transition into Leadership Roles | Accredian",
    description:
      "Step confidently into management and senior leadership with programs designed to build strategic thinking, people leadership and business judgement.",
    url: "https://accredian.com/explore-programs/leadership-transition-programs",
    siteName: "Accredian",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/accredian-logo-image-v2.webp",
        width: 1200,
        height: 630,
        alt: "Leadership Transition Programs at Accredian",
      },
    ],
  },
};

const TRANSITION_FAQS = [
  {
    question: "What are leadership courses designed to help professionals develop?",
    answer:
      "The listed programs focus on areas including strategy, management, decision-making, innovation and organisational or technology leadership.",
  },
  {
    question: "Who should consider taking a leadership course?",
    answer:
      "The category is relevant to professionals seeking to strengthen leadership capabilities or prepare for broader management and senior-level responsibilities.",
  },
  {
    question: "What types of leadership programs are available?",
    answer:
      "Options include Strategy & Leadership, Global Senior Leadership, Senior Management, Accelerated Senior Management and Technology Leadership & Innovation.",
  },
  {
    question: "Can leadership courses help professionals move into senior management?",
    answer:
      "The portfolio includes programs specifically focused on Senior Management, Accelerated Senior Management and Global Senior Leadership, making senior leadership progression a central theme of the category.",
  },
  {
    question: "How do I choose the right leadership course?",
    answer:
      "Choose according to the leadership capability you want to develop—strategy, broader senior management, global leadership or technology leadership—and compare the eligibility and curriculum of the relevant programs.",
  },
  {
    question: "How can leadership courses prepare professionals for greater responsibilities?",
    answer:
      "Leadership courses can strengthen capabilities in strategy, management, decision-making and organisational leadership. The listed portfolio includes pathways across Strategy & Leadership, Senior Management, Global Senior Leadership and Technology Leadership & Innovation.",
  },
  {
    question: "Are leadership courses suitable for professionals moving from individual contributors to management roles?",
    answer:
      "The category is intended for professionals seeking stronger management and leadership capabilities, although the appropriate program depends on experience and individual eligibility.",
  },
  {
    question: "What is the difference between management and leadership development?",
    answer:
      "Management development generally focuses on managing responsibilities and organisational execution, while leadership development places greater emphasis on direction, decision-making and broader organisational influence.",
  },
  {
    question: "Are there different types of leadership courses for different career stages?",
    answer:
      "Yes. The portfolio ranges from Strategy & Leadership to Senior Management, Accelerated Senior Management, Global Senior Leadership and Technology Leadership.",
  },
  {
    question: "What should I consider when choosing a course to transition into leadership?",
    answer:
      "Consider your current experience, the type of leadership responsibility you are targeting, the skills you need to strengthen and the program's eligibility and curriculum.",
  },
];

export default function LeadershipTransitionCoursesPage() {
  return (
    <SearchIntentCategoryClient
      filterKey="leadership-transition"
      pageBadge="Career Progression & Transition"
      pageTitle="Leadership Transition Programs"
      pageDescription="Moving into a leadership role means learning to guide people, make sound decisions and take responsibility for results. Build your understanding of strategy, management, organisational leadership and technology-driven change. Develop the confidence to handle new responsibilities, support team performance and contribute to wider business goals. Through these programs for transitioning into leadership roles, professionals preparing for leadership positions can strengthen their management skills, broaden their business perspective and take the next step in their careers."
      pageMobileDescription="Through these programs for transitioning into leadership roles, professionals preparing for leadership positions can strengthen their management skills, broaden their business perspective and take the next step in their careers."
      breadcrumbLabel="Leadership Transition"
      faqs={TRANSITION_FAQS}
      ctaTitle="Step Up from Manager to Enterprise Leader"
      ctaDescription="Explore leadership transition programs from IIM Ranchi, XLRI, IIM Visakhapatnam, and IITM Pravartak."
    />
  );
}
