import React from "react";
import SearchIntentCategoryClient from "../../components/SearchIntent/SearchIntentCategoryClient";

export const metadata = {
  title: "Top IIM AI Programs for Working Executives",
  description:
    "Build AI leadership and transformation expertise through IIM Artificial Intelligence Programs designed for working executives aiming to lead the AI era.",
  keywords:
    "IIM AI courses, IIM generative AI course, IIM artificial intelligence program, IIM AI executive program, IIM agentic AI course, IIM leadership with AI, IIM AI for business leaders, IIM Ranchi generative AI, IIM Visakhapatnam AI program, IIM AI certification",
  alternates: {
    canonical: "https://accredian.com/explore-programs/iim-ai-programs",
  },
  openGraph: {
    title: "Top IIM AI Programs for Working Executives",
    description:
      "Build AI leadership and transformation expertise through IIM Artificial Intelligence Programs designed for working executives aiming to lead the AI era.",
    url: "https://accredian.com/explore-programs/iim-ai-programs",
    siteName: "Accredian",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/accredian-logo-image-v2.webp",
        width: 1200,
        height: 630,
        alt: "IIM AI Programs at Accredian",
      },
    ],
  },
};

const IIM_AI_FAQS = [
  {
    question: "What AI programs are available from IIMs?",
    answer:
      "The listed IIM portfolio includes Generative AI & Agentic AI, Leadership with AI, Generative AI for Business Leaders and digital & AI leadership programs.",
  },
  {
    question: "Who are IIM AI programs designed for?",
    answer:
      "Several programs explicitly focus on leaders and business professionals, while the Chief Digital & AI Officer pathway addresses senior digital and AI leadership.",
  },
  {
    question: "Do I need a technical background for an IIM AI course?",
    answer:
      "The program titles emphasise leadership and business applications of AI rather than only technical development. Exact prerequisites should be checked for each program.",
  },
  {
    question: "What AI topics can I learn through IIM AI courses?",
    answer:
      "IIM AI courses in the listed portfolio cover Generative AI, Agentic AI, Leadership with AI, AI applications for business leaders, and digital & AI leadership. The specific areas covered depend on the program selected.",
  },
  {
    question: "How can I choose the right IIM AI program?",
    answer:
      "Choose based on your objective—Generative and Agentic AI, broader Leadership with AI, AI for business leadership, or senior digital and AI leadership.",
  },
  {
    question: "Are IIM AI courses suitable for business professionals?",
    answer:
      "Yes. The listed programs focus strongly on AI for leaders, business applications and digital & AI leadership rather than only technical AI development.",
  },
  {
    question: "What is the difference between IIM Generative AI and Leadership with AI programs?",
    answer:
      "Generative AI programs focus more directly on emerging AI capabilities and business applications, while Leadership with AI programs connect AI with broader leadership and decision-making contexts.",
  },
  {
    question: "Do IIM AI programs cover Agentic AI?",
    answer:
      "The portfolio includes a Generative AI & Agentic AI for Leaders program alongside broader Leadership with AI and Generative AI programs.",
  },
  {
    question: "Are there IIM AI programs for senior digital leaders?",
    answer:
      "Yes. The portfolio includes a Chief Digital & AI Officer pathway alongside other AI programs for leaders and business professionals.",
  },
  {
    question: "How can I compare different IIM AI courses?",
    answer:
      "Compare their focus—Generative AI, Agentic AI, Leadership with AI or digital & AI leadership—along with program format, eligibility and learning objectives.",
  },
];

export default function IIMAICoursesPage() {
  return (
    <SearchIntentCategoryClient
      filterKey="iim-ai"
      pageTitle="IIM Artificial Intelligence Programs"
      pageDescription="Artificial intelligence is opening new possibilities for business innovation, productivity and strategic growth. Develop your understanding of Generative AI, Agentic AI and AI-enabled leadership through learning opportunities that connect technology with business priorities. Learn how to identify relevant use cases, assess opportunities and support AI adoption within organisations. Through the IIM artificial intelligence Programs, business leaders and senior professionals can build the knowledge to make informed AI decisions, improve processes and lead technology-driven change."
      pageMobileDescription="Through the IIM artificial intelligence Programs, business leaders and senior professionals can build the knowledge to make informed AI decisions, improve processes and lead technology-driven change."
      breadcrumbLabel="IIM AI Programs"
      faqs={IIM_AI_FAQS}
      ctaTitle="Lead the AI Era with IIM Certification"
      ctaDescription="Compare AI & GenAI executive programs from IIM Lucknow, IIM Ranchi, IIM Visakhapatnam, and IIM Sirmaur."
    />
  );
}
