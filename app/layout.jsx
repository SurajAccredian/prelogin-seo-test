
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./index.css";

import ReduxProvider from "./store/ReduxProvider";
import QueryProvider from "./store/QueryProvider";
import AnalyticsProvider from "./components/AnalyticsProvider";
import SmoothScroll from "./components/SmoothScroll";
import { Toaster } from "react-hot-toast";
import { JsonLd } from "./components/JsonLd";
import { sitewideGraph } from "./lib/schema";
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
        <JsonLd data={sitewideGraph()} />
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