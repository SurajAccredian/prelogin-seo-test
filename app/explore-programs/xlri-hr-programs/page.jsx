import React from "react";
import SearchIntentCategoryClient from "../../components/SearchIntent/SearchIntentCategoryClient";

export const metadata = {
  title: "XLRI HR Programs for Working Professionals",
  description:
    "Advance your expertise in strategic HR, people analytics and leadership through XLRI Programs designed for experienced HR and business professionals.",
  keywords:
    "XLRI HR courses, XLRI HR program, XLRI strategic HR leadership, XLRI digital HR leadership, XLRI people analytics, XLRI HR executive program, XLRI leadership program, HR leadership course, strategic HR course, HR analytics course, XLRI courses for HR professionals",
  alternates: {
    canonical: "https://accredian.com/explore-programs/xlri-hr-programs",
  },
  openGraph: {
    title: "XLRI HR Programs for Working Professionals",
    description:
      "Advance your expertise in strategic HR, people analytics and leadership through XLRI Programs designed for experienced HR and business professionals.",
    url: "https://accredian.com/explore-programs/xlri-hr-programs",
    siteName: "Accredian",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/accredian-logo-image-v2.webp",
        width: 1200,
        height: 630,
        alt: "XLRI HR Programs at Accredian",
      },
    ],
  },
};

const XLRI_HR_FAQS = [
  {
    question: "What HR and leadership programs are available from XLRI?",
    answer:
      "The portfolio includes Strategic HR Leadership, Digital HR Leadership & People Analytics, Strategy & Leadership, Global Senior Management and General Management.",
  },
  {
    question: "Who are XLRI HR programs suitable for?",
    answer:
      "The HR-focused programs are relevant to professionals developing strategic and digital HR capabilities, while the broader management programs provide pathways beyond the HR function.",
  },
  {
    question: "What can I learn through XLRI HR courses?",
    answer:
      "XLRI HR courses cover areas such as strategic HR leadership, digital HR and people analytics. The broader portfolio also includes strategy, general management and senior leadership programs for professionals looking to expand beyond functional HR expertise.",
  },
  {
    question: "Are XLRI leadership programs only for HR professionals?",
    answer:
      "No. While the portfolio contains dedicated HR programs, it also includes Strategy & Leadership, Global Senior Management and General Management.",
  },
  {
    question: "How do I choose between an XLRI HR and leadership program?",
    answer:
      "Choose according to your intended direction: Strategic HR or Digital HR for HR specialisation, or Strategy & Leadership, General Management and Global Senior Management for broader leadership development.",
  },
  {
    question: "What areas of HR are covered in XLRI programs?",
    answer:
      "The HR-focused portfolio covers Strategic HR Leadership, Digital HR Leadership and People Analytics, alongside broader management and leadership programs.",
  },
  {
    question: "Are XLRI HR courses relevant for experienced HR professionals?",
    answer:
      "The programs focus on strategic and digital HR leadership, making them relevant to professionals seeking to broaden their HR and organisational leadership capabilities. Individual eligibility varies.",
  },
  {
    question: "How does Digital HR differ from Strategic HR?",
    answer:
      "Digital HR focuses on technology and data-enabled approaches to the HR function, while Strategic HR connects people decisions with wider organisational priorities and leadership.",
  },
  {
    question: "Can XLRI HR courses support broader leadership development?",
    answer:
      "The portfolio extends beyond HR into Strategy & Leadership, Global Senior Management and General Management, offering pathways for professionals seeking broader management capabilities.",
  },
  {
    question: "How do I choose between Strategic HR and Digital HR learning?",
    answer:
      "Choose based on whether you want stronger emphasis on strategic people leadership or digital HR and people analytics, while considering your current responsibilities and future goals.",
  },
];

export default function XLRIHRCoursesPage() {
  return (
    <SearchIntentCategoryClient
      filterKey="xlri-hr"
      pageBadge="XLRI Executive Education"
      pageTitle="XLRI HR & Leadership Programs"
      pageDescription="Effective HR and leadership practices play a vital role in building strong teams and achieving organisational goals. Develop your understanding of human resource management, people analytics, strategic leadership and organisational development. Gain valuable perspectives on managing talent, improving team performance and aligning people strategies with business priorities. Through the XLRI HR and leadership Programs, HR professionals, managers and senior leaders can strengthen their leadership skills, make informed people decisions and drive organisational growth."
      pageMobileDescription="Through the XLRI HR and leadership Programs, HR professionals, managers and senior leaders can strengthen their leadership skills, make informed people decisions and drive organisational growth."
      breadcrumbLabel="XLRI HR & Leadership"
      faqs={XLRI_HR_FAQS}
      ctaTitle="Lead People Strategy with India's Premier HR Institution"
      ctaDescription="Explore XLRI Executive Development Programs in Strategic HR Leadership, Digital HR & People Analytics, and General Management."
    />
  );
}
