import type { MetadataRoute } from "next";

// /blog/search is also noindex; it is blocked here so crawlers don't spend budget on endless queries.
// Filter parameter URLs on explore-programs are disallowed to avoid duplicate-URL bloat (SEO-12).
const PRIVATE_ROUTES = [
  "/api/",
  "/admin/",
  "/resource-callback",
  "/cdn-cgi/",
  "/blog/search",
  "/explore-programs/*?*",
];

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
