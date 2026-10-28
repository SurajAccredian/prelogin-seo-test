import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
  },
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
