import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "@mui/material",
      "@mui/icons-material",
      "lucide-react",
      "react-icons",
      "lodash",
    ],
  },
  // Default is 60 s. The blog prerenders every post at build and a slow WordPress response must not fail the build
  // (see TIMEOUT_MS / MAX_ATTEMPTS in app/lib/blog/wordpress.js, whose worst case stays well below this).
  staticPageGenerationTimeout: 180,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "**.accredian.com",
      },
      {
        protocol: "https",
        hostname: "api-blog.accredian.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
  },
  async redirects() {
    return [
      {
        source: "/professional-courses/:slug*",
        destination: "/explore-programs/:slug*",
        statusCode: 301,
      },
      {
        source: "/Faqs/program",
        destination: "/faq",
        statusCode: 301,
      },
      {
        source: "/Faqs/admissions",
        destination: "/faq",
        statusCode: 301,
      },
      {
        source: "/Faqs/fee-scholarships",
        destination: "/faq",
        statusCode: 301,
      },
      {
        source: "/Faqs/program-pre-requisites",
        destination: "/faq",
        statusCode: 301,
      },
      {
        source: "/terms/refund",
        destination: "/refund-policies/accredian-policy",
        statusCode: 301,
      },
      {
        source: "/explore-programs",
        destination: "/programs",
        statusCode: 301,
      },
      // T-01: 301 redirects for legacy / dead programme slugs
      {
        source: "/programs/chief-technology-officer-program",
        destination: "/programs/chief-technology-officer-programme",
        statusCode: 301,
      },
      {
        source: "/chief-technology-officer-program",
        destination: "/programs/chief-technology-officer-programme",
        statusCode: 301,
      },
      {
        source: "/programs/iiml-chief-digital-and-ai-officer-programme-the-cdaio-program",
        destination: "/programs/iiml-chief-digital-ai-officer-programme-the-cdaio-program",
        statusCode: 301,
      },
      {
        source: "/iiml-chief-digital-and-ai-officer-programme-the-cdaio-program",
        destination: "/programs/iiml-chief-digital-ai-officer-programme-the-cdaio-program",
        statusCode: 301,
      },
      {
        source: "/programs/pg-certificate-in-chief-digital-and-ai-officer-program",
        destination: "/programs/pg-certificate-program-in-chief-digital-and-ai-officer-program",
        statusCode: 301,
      },
      {
        source: "/pg-certificate-in-chief-digital-and-ai-officer-program",
        destination: "/programs/pg-certificate-program-in-chief-digital-and-ai-officer-program",
        statusCode: 301,
      },
      {
        source: "/pg-certificate-program-in-chief-digital-and-ai-officer-program",
        destination: "/programs/pg-certificate-program-in-chief-digital-and-ai-officer-program",
        statusCode: 301,
      },
      {
        source: "/programs/executive-program-strategic-hr-leadership",
        destination: "/programs/executive-program-in-strategic-hr-leadership",
        statusCode: 301,
      },
      {
        source: "/executive-program-strategic-hr-leadership",
        destination: "/programs/executive-program-in-strategic-hr-leadership",
        statusCode: 301,
      },
      {
        source: "/programs/generative-ai-for-leaders",
        destination: "/programs/executive-program-in-generative-ai-for-leaders",
        statusCode: 301,
      },
      {
        source: "/generative-ai-for-leaders",
        destination: "/programs/executive-program-in-generative-ai-for-leaders",
        statusCode: 301,
      },
      {
        source: "/programs/iimr-executive-program-in-leadership-with-ai",
        destination: "/programs/iim-ranchi-executive-program-in-leadership-with-ai",
        statusCode: 301,
      },
      {
        source: "/iimr-executive-program-in-leadership-with-ai",
        destination: "/programs/iim-ranchi-executive-program-in-leadership-with-ai",
        statusCode: 301,
      },
      {
        source: "/programs/transform-business-workflows-with-generative-ai",
        destination: "/free-courses/transform-business-workflows-with-generative-ai",
        statusCode: 301,
      },
      {
        source: "/transform-business-workflows-with-generative-ai",
        destination: "/free-courses/transform-business-workflows-with-generative-ai",
        statusCode: 301,
      },
      {
        source: "/programs/executive-program-in-strategy-leadership-innovation-in-ai-era-iimsirmaur",
        destination: "/programs/iims-executive-programme-in-strategy-leadership-and-innovation-in-ai-era",
        statusCode: 301,
      },
      {
        source: "/programs/executive-program-in-leadership-with-ai-iim-sirmaur",
        destination: "/programs/iims-executive-program-in-leadership-with-ai",
        statusCode: 301,
      },
      {
        source: "/programs/chief-marketing-growth-officer-program-inactive",
        destination: "/programs",
        statusCode: 301,
      }
    ];
  },
};

export default nextConfig;
