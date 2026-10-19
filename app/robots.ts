import type { MetadataRoute } from "next";

const PRIVATE_ROUTES = ["/api/", "/admin/", "/resource-callback", "/cdn-cgi/"];

const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_ROUTES,
      },
      {
        userAgent: AI_AGENTS,
        allow: "/",
        disallow: PRIVATE_ROUTES,
      },
    ],
    sitemap: "https://accredian.com/sitemap.xml",
  };
}
