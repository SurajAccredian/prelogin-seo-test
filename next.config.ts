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
};

export default nextConfig;
