import React from "react";
import SearchIntentCategoryClient from "../../components/SearchIntent/SearchIntentCategoryClient";

export const metadata = {
  title: "Design Thinking and Innovation Programs for Executives",
  description:
    "Strengthen your creative problem-solving and innovation leadership through design thinking programs designed for professionals and business leaders.",
  keywords:
    "design thinking courses, design thinking certification, innovation courses, design thinking and innovation program, design thinking with AI, innovation leadership course, IIT design thinking course, design thinking for leaders, design thinking course for working professionals",
  alternates: {
    canonical: "https://accredian.com/professional-courses/design-thinking-courses",
  },
  openGraph: {
    title: "Design Thinking and Innovation Programs for Executives",
    description:
      "Strengthen your creative problem-solving and innovation leadership through design thinking programs designed for professionals and business leaders.",
    url: "https://accredian.com/professional-courses/design-thinking-courses",
    siteName: "Accredian",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/accredian-logo-image-v2.webp",
        width: 1200,
        height: 630,
        alt: "Design Thinking Programs at Accredian",
      },
    ],
  },
};

const DT_FAQS = [
  {
    question: "What is Design Thinking and why is it useful?",
    answer:
      "Design Thinking provides a structured approach to problem-solving and innovation. The programs in this category connect it with AI and strategic leadership applications.",
  },
  {
    question: "Do I need a design background to study Design Thinking?",
    answer:
      "The listed programs are positioned around innovation, AI and strategic leadership rather than a specific design profession. Any program-specific eligibility should be checked separately.",
  },
  {
    question: "What skills can I develop through Design Thinking courses?",
    answer:
      "The category focuses on design thinking, innovation, structured problem-solving and strategic applications, with programs also connecting these areas to AI and leadership.",
  },
  {
    question: "How is Design Thinking different from traditional problem-solving approaches?",
    answer:
      "Design Thinking uses a structured, innovation-focused approach to understanding problems, exploring ideas and developing solutions. The listed programs also connect Design Thinking with areas such as AI, innovation and strategic leadership.",
  },
  {
    question: "Are Design Thinking courses relevant for business leaders?",
    answer:
      "The portfolio includes an IIT Hyderabad program explicitly focused on Design Thinking & Innovation for Strategic Leadership, connecting the discipline with managerial and leadership applications.",
  },
  {
    question: "How does Design Thinking support innovation?",
    answer:
      "Design Thinking provides a structured way to understand problems, explore ideas and develop solutions, helping organisations approach innovation more systematically.",
  },
  {
    question: "Who should consider a Design Thinking course?",
    answer:
      "The listed programs connect Design Thinking with AI and strategic leadership, making the category relevant to professionals interested in innovation, problem-solving and leadership applications.",
  },
  {
    question: "Can Design Thinking be applied to business problems?",
    answer:
      "Yes. The programs position Design Thinking within innovation and strategic leadership contexts, connecting structured problem-solving with business applications.",
  },
  {
    question: "What is the relationship between Design Thinking and strategic leadership?",
    answer:
      "Design Thinking can support leaders in approaching complex problems, exploring alternatives and developing innovative solutions. The portfolio includes a program specifically connecting innovation with strategic leadership.",
  },
  {
    question: "How do I choose a Design Thinking program?",
    answer:
      "Consider whether you want stronger emphasis on AI-enabled innovation or the application of Design Thinking and innovation within strategic leadership.",
  },
];

export default function DesignThinkingProgrammesPage() {
  return (
    <SearchIntentCategoryClient
      filterKey="design-thinking"
      pageBadge="Innovation & Strategy"
      pageTitle="Design Thinking & Innovation Programs"
      pageDescription="Innovation starts with understanding problems, questioning assumptions and finding better ways to meet people’s needs. Develop your understanding of design thinking, creative problem-solving and innovation, including the role of AI in developing new solutions. Learn to approach challenges from different perspectives and turn ideas into practical outcomes. Through the design thinking and innovation Programs, professionals and business leaders can build the skills to encourage innovation, improve solutions and create greater business impact."
      breadcrumbLabel="Design Thinking & Innovation"
      faqs={DT_FAQS}
      ctaTitle="Lead Innovation with Design Thinking"
      ctaDescription="Compare Design Thinking & Innovation programs from IIT Kanpur, IIT Hyderabad, and premier institutions."
    />
  );
}
