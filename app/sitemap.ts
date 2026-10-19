import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { verticalsData } from "./components/Assets/verticals";

const BASE_URL = "https://accredian.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // 1. Static Pages
  const staticPaths = [
    "",
    "/programs",
    "/whyaccredian",
    "/Successstories",
    "/referandearn",
    "/about",
    "/Career",
    "/Career/mentor",
    "/contact-us",
    "/Faq",
    "/app",
    "/terms",
    "/terms/privacy",
    "/terms/refund",
    "/terms/referral",
    "/terms/cancellation",
    "/terms/cookie-policy",
    "/account-deletion",
    "/app-privacy-policy",
    "/app-support",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${BASE_URL}${p}`,
    lastModified: currentDate,
    changeFrequency: p === "" ? "daily" : "weekly",
    priority: p === "" ? 1.0 : 0.8,
  }));

  // 2. Vertical Category Pages
  const verticalEntries: MetadataRoute.Sitemap = Object.keys(verticalsData).map(
    (key) => {
      const slug = key.replace(/&/g, "and").replace(/\s+/g, "-");
      return {
        url: `${BASE_URL}/course/${slug}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.9,
      };
    }
  );

  // 3. Program Pages
  const programsDir = path.join(
    process.cwd(),
    "app/components/Assets/programs"
  );
  let programEntries: MetadataRoute.Sitemap = [];

  try {
    if (fs.existsSync(programsDir)) {
      const files = fs.readdirSync(programsDir);
      programEntries = files
        .filter((file) => file.endsWith(".json"))
        .map((file) => {
          const id = file.replace(/\.json$/, "");
          const filePath = path.join(programsDir, file);
          const stats = fs.statSync(filePath);
          return {
            url: `${BASE_URL}/programs/${id}`.replace(/&/g, "&amp;"),
            lastModified: stats.mtime.toISOString(),
            changeFrequency: "weekly",
            priority: 0.9,
          };
        });
    }
  } catch (err) {
    console.error("Error reading programs for sitemap:", err);
  }

  // 4. Free Course Pages
  const freeCoursesDir = path.join(
    process.cwd(),
    "app/components/Assets/free-courses"
  );
  let freeCourseEntries: MetadataRoute.Sitemap = [];

  try {
    if (fs.existsSync(freeCoursesDir)) {
      const freeFiles = fs.readdirSync(freeCoursesDir);
      freeCourseEntries = freeFiles
        .filter((file) => file.endsWith(".json"))
        .map((file) => {
          const id = file.replace(/\.json$/, "");
          const filePath = path.join(freeCoursesDir, file);
          const stats = fs.statSync(filePath);
          return {
            url: `${BASE_URL}/free-courses/${id}`,
            lastModified: stats.mtime.toISOString(),
            changeFrequency: "monthly",
            priority: 0.7,
          };
        });
    }
  } catch (err) {
    console.error("Error reading free courses for sitemap:", err);
  }

  return [
    ...staticEntries,
    ...verticalEntries,
    ...programEntries,
    ...freeCourseEntries,
  ];
}
