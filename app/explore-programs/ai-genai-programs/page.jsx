import React from "react";
import SearchIntentCategoryClient from "../../components/SearchIntent/SearchIntentCategoryClient";

export const metadata = {
  title: "Top Generative AI Programs for Working Executives",
  description:
    "Build practical expertise in Generative AI, Agentic AI and AI strategy through Programs designed to turn emerging technology into business impact.",
  keywords:
    "generative AI courses, AI courses, AI certification courses, GenAI courses, agentic AI course, AI for leaders, AI for business leaders, AI leadership program, generative AI for business, AI course for managers, AI course for non-technical professionals, AI executive program",
  alternates: {
    canonical: "https://accredian.com/explore-programs/ai-genai-programs",
  },
  openGraph: {
    title: "Top Generative AI Programs for Working Executives",
    description:
      "Build practical expertise in Generative AI, Agentic AI and AI strategy through Programs designed to turn emerging technology into business impact.",
    url: "https://accredian.com/explore-programs/ai-genai-programs",
    siteName: "Accredian",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/accredian-logo-image-v2.webp",
        width: 1200,
        height: 630,
        alt: "AI & GenAI Programs at Accredian",
      },
    ],
  },
};

const AI_FAQS = [
  {
    question: "What can I learn through AI and Generative AI courses?",
    answer:
      "The available programs cover areas such as Generative AI, Agentic AI, AI leadership, business applications of AI and AI-led business transformation.",
  },
  {
    question: "Do I need a technical background to study AI for business?",
    answer:
      "The portfolio includes several programs explicitly designed for leaders and business professionals, such as AI for Leaders and Generative AI for Business Leaders. Individual eligibility requirements should still be checked before applying.",
  },
  {
    question: "What is the difference between Generative AI and Agentic AI courses?",
    answer:
      "The portfolio includes programs focused specifically on Generative AI and Agentic AI as well as broader AI-for-leadership programs. The depth and specific curriculum depend on the selected program.",
  },
  {
    question: "Are AI courses useful for managers and business leaders?",
    answer:
      "Several listed programs explicitly connect AI with leadership, business transformation and strategic applications, making the category relevant to professionals interested in applying AI within business contexts.",
  },
  {
    question: "What types of AI programs can professionals choose from?",
    answer:
      "Options include executive, professional and advanced certificate programs covering AI for Leaders, Leadership with AI, Generative AI for Business Transformation and Generative AI & Agentic AI for Leaders.",
  },
  {
    question: "What is Generative AI and how is it used in business?",
    answer:
      "Generative AI focuses on creating new content and outputs using AI models. The programs listed connect Generative AI with leadership, business transformation and organisational applications.",
  },
  {
    question: "What is Agentic AI?",
    answer:
      "Agentic AI refers to AI systems designed to perform tasks and pursue objectives with greater autonomy. The portfolio includes programs that introduce Generative AI and Agentic AI in a leadership and business context.",
  },
  {
    question: "Can non-technical professionals learn AI?",
    answer:
      "The portfolio includes programs specifically positioned for leaders and business professionals, indicating options beyond purely technical AI learning. Individual prerequisites vary by program.",
  },
  {
    question: "What is the difference between AI for Leaders and technical AI courses?",
    answer:
      "AI-for-leadership programs emphasise understanding and applying AI in business, strategy and leadership contexts rather than focusing only on technical development.",
  },
  {
    question: "How do I choose the right AI course?",
    answer:
      "Consider whether you want to focus on Generative and Agentic AI, broader AI leadership, business transformation or applying AI within leadership and decision-making contexts.",
  },
];

export default function AIGenAICoursesPage() {
  return (
    <SearchIntentCategoryClient
      filterKey="ai-genai"
      pageTitle="Generative AI & Agentic AI Programs"
      pageDescription="Artificial intelligence is reshaping how organisations innovate, make decisions and create value. Build your understanding of Generative AI, Agentic AI and the role of AI in business strategy and leadership. Learn to identify opportunities where AI can improve processes, support decisions and solve business problems. Through the Generative AI and artificial intelligence Programs, business leaders and managers can develop the confidence to apply AI effectively and drive meaningful change within their organisations."
      pageMobileDescription="Through the Generative AI and artificial intelligence Programs, business leaders and managers can develop the confidence to apply AI effectively and drive meaningful change within their organisations."
      breadcrumbLabel="AI & GenAI Programs"
      faqs={AI_FAQS}
      ctaTitle="Find the Right AI Program for Your Career"
      ctaDescription="Compare AI & GenAI executive programs from IIT Kanpur, IIM Ranchi, IIM Visakhapatnam, and SP Jain."
    />
  );
}
