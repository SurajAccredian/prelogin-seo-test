
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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://accredian.com";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    template: "%s | Accredian",
    default: "Accredian",
  },
  description:
    "Learn from top IIMs, IITs and XLRI through industry-relevant programs in AI, leadership, strategy and more. Build skills that move your career forward.",
  openGraph: {
    type: "website",
    siteName: "Accredian",
    title: "Accredian | Build Skills for What's Next",
    description:
      "Courses by top IIMs, IITs, XLRI and many more in AI, leadership, strategy and more. Find the right path to your next career move.",
    url: BASE_URL,
    images: [
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/accredian-logo-image-v2.webp",
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@accredianedu",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "EducationalOrganization"],
      "@id": "https://accredian.com/#organization",
      "name": "Accredian",
      "url": "https://accredian.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/logo.webp",
      },
      "description":
        "Online executive education company in Gurugram, India, delivering live programs with IIMs, IITs, XLRI and SP Jain.",
      "foundingDate": "2018",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "4th Floor, Plot No. 250, Udyog Vihar, Phase IV",
        "addressLocality": "Gurugram",
        "addressRegion": "Haryana",
        "postalCode": "122015",
        "addressCountry": "IN",
      },
      "sameAs": [
        "https://www.linkedin.com/company/accredianedu/",
        "https://www.youtube.com/channel/UCE0L_4ADPU2iyKnDJ0xRzyA",
        "https://www.instagram.com/accredian_edu",
        "https://twitter.com/accredianedu",
        "https://facebook.com/accredianlearn",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://accredian.com/#website",
      "url": "https://accredian.com/",
      "name": "Accredian",
      "publisher": {
        "@id": "https://accredian.com/#organization",
      },
      "inLanguage": "en-IN",
    },
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