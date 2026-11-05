import React from "react";
import SearchIntentCategoryClient from "../../components/SearchIntent/SearchIntentCategoryClient";

export const metadata = {
  title: "Top IIT Certificate Programs for Working Professionals",
  description:
    "Build future-ready expertise in AI, project management, and design thinking through top IIT programs designed for experienced professionals.",
  keywords:
    "IIT courses, IIT online courses, IIT certificate courses, IIT executive courses, IIT AI course, IIT data science course, IIT product management course, IIT project management course, IIT Kanpur certificate program, IIT Guwahati certificate program, IIT Hyderabad program, IIT courses for working professionals",
  alternates: {
    canonical: "https://accredian.com/explore-programs/iit-programs",
  },
  openGraph: {
    title: "Top IIT Certificate Programs for Working Professionals",
    description:
      "Build future-ready expertise in AI, data science, project management and innovation through top IIT programs designed for experienced professionals.",
    url: "https://accredian.com/explore-programs/iit-programs",
    siteName: "Accredian",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/accredian-logo-image-v2.webp",
        width: 1200,
        height: 630,
        alt: "IIT Programs at Accredian",
      },
    ],
  },
};

const IIT_FAQS = [
  {
    question: "What types of IIT programs are available for professionals?",
    answer:
      "IIT-linked programs include advanced, professional, postgraduate certificate and executive learning options across technology, management and leadership-oriented areas.",
  },
  {
    question: "What subjects can I study through IIT programs?",
    answer:
      "The portfolio covers AI, data science, product management, strategic project management, design thinking, innovation and technology leadership.",
  },
  {
    question: "Who are IIT professional programs suitable for?",
    answer:
      "The available programs span technical, managerial and leadership themes, making them relevant to professionals seeking specialised skills as well as those moving toward technology and business leadership responsibilities.",
  },
  {
    question: "Are IIT programs available for working professionals?",
    answer:
      "The portfolio includes professional, advanced and executive programs designed around professional learning. The exact delivery format and schedule should be checked on the selected program page.",
  },
  {
    question: "What certification can I earn through an IIT program?",
    answer:
      "Credentials differ across the portfolio, with program names including Advanced Certificate, Professional Certificate, Post Graduate Certificate and Executive Program formats.",
  },
  {
    question: "What is the difference between IIT professional, advanced and postgraduate certificate programs?",
    answer:
      "The portfolio includes different program formats and levels of professional learning. Their depth, eligibility, curriculum and credential vary depending on the program selected.",
  },
  {
    question: "Are IIT courses focused only on technical skills?",
    answer:
      "No. The listed portfolio combines technology-focused subjects with management and leadership areas such as project management, product management, design thinking, innovation and technology leadership.",
  },
  {
    question: "Can I study AI and Data Science through IIT programs?",
    answer:
      "Yes. The portfolio includes programs in AI for Leaders, Leadership with AI and Data Science alongside other technology and management subjects.",
  },
  {
    question: "Are there IIT courses for managers and business leaders?",
    answer:
      "Yes. Several programs connect technology with leadership and management, including AI for Leaders, Strategic Project Management, Design Thinking & Innovation and Technology Leadership.",
  },
  {
    question: "How do I choose the right IIT program?",
    answer:
      "Choose based on the capability you want to develop—AI, data science, product management, project management, innovation or technology leadership—and then compare program level, curriculum and eligibility.",
  },
];

export default function IITCoursesPage() {
  return (
    <SearchIntentCategoryClient
      filterKey="iit"
      pageTitle="IIT Certificate Programs"
      pageDescription="Technology and innovation are creating new opportunities for professionals to solve business challenges and drive growth. Develop your understanding of artificial intelligence, generative AI, strategic project management, design thinking and technology leadership. Gain practical perspectives to connect new ideas with business needs and deliver meaningful results. Through the Indian Institute of Technology Certificate Programs, professionals and technology leaders can build skills to lead projects, encourage innovation and advance their careers."
      pageMobileDescription="Earn high-impact certifications in AI leadership, project management, and design thinking from IIT Kanpur, IIT Jammu, and IITM Pravartak."
      breadcrumbLabel="IIT Programs"
      faqs={IIT_FAQS}
      ctaTitle="Find the Right IIT Program for Your Career"
      ctaDescription="Compare advanced certifications from E&ICT Academy IIT Kanpur, IIT Jammu, and IITM Pravartak."
    />
  );
}
