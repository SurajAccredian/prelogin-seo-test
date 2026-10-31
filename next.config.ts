import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      }
    ];
  },
};

export default nextConfig;
