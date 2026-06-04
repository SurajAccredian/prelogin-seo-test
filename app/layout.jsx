
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./index.css";

import ReduxProvider from "./store/ReduxProvider";
import QueryProvider from "./store/QueryProvider";
import AnalyticsProvider from "./components/AnalyticsProvider";
import SmoothScroll from "./components/SmoothScroll";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Accredian",
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="" suppressHydrationWarning>
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
            alt="Facebook tracking pixel"
          />
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt="LinkedIn tracking pixel"
            src="https://px.ads.linkedin.com/collect/?pid=3021458&fmt=gif"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SmoothScroll />
        <ReduxProvider>
          <QueryProvider>
            <AnalyticsProvider>
              {children}
              <Toaster />
            </AnalyticsProvider>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
