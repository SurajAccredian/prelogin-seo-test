
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./index.css";

import ReduxProvider from "./store/ReduxProvider";
import QueryProvider from "./store/QueryProvider";
import AnalyticsProvider from "./components/AnalyticsProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Accredian | Senior Management, General Management, PG Diploma, CXO Leadership, Project Management, Data Science, AI/ML, Product Management, Finance & Fintech, Business Management, and Business Analytics Programs from IITs, XLRI, SP Jain & IIMs",
  description: "India's leading career-focused education platform. Co-create your career with E&ICT IIT Kanpur, IIM Lucknow, IIM Visakhapatnam, IIM Trichy, XLRI & more. Senior Management, General Management, PG Diploma, CXO Leadership, Project Management, Data Science, AI/ML, Product Management, Finance & Fintech, Business Management, and Business Analytics programs for working professionals.",
  keywords: "data science course India, AI ML certification, AI ML courses in india, top AI ML programs, product management program IIT, IIM executive program, online data science certification, career transition data science, IIT Kanpur data science, IIM Lucknow executive program, XLRI HR program, best data science courses in India, online professional certifications, IIM certification for working professionals, IIT artificial intelligence course, management courses for senior executives, data analytics course with placement, best AI ML courses for beginners",
  openGraph: {
    type: "website",
    siteName: "Accredian",
    title: "Accredian | Programs from IITs, XLRI, SP Jain & IIMs",
    url: "https://accredian.com",
    images: ["https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/logo.webp"]
  },
  twitter: {
    card: "summary_large_image",
    site: "@accredianedu",
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gurugram",
    addressRegion: "IN",
    postalCode: "122015",
    streetAddress: "4th Floor, Plot No. 250, Udyog Vihar, Phase IV",
  },
  name: "Accredian",
  url: "https://accredian.com",
  logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/logo.webp",
  sameAs: [
    "https://facebook.com/accredianlearn",
    "https://twitter.com/accredianedu",
    "https://www.instagram.com/accredian_edu",
    "https://www.youtube.com/channel/UCE0L_4ADPU2iyKnDJ0xRzyA",
    "https://www.linkedin.com/company/accredianedu/",
    "https://accredian.com",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W2HX5GJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <noscript>
          <img
            loading="lazy"
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=181911999105692&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=3021458&fmt=gif"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ReduxProvider>
          <QueryProvider>
            <AnalyticsProvider>
              {children}
            </AnalyticsProvider>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
