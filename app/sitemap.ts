import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { verticalsData } from "./components/Assets/verticals";
import { categorySlug } from "./helpers/categorySlug";

const BASE_URL = "https://accredian.com";

// Real "last modified" dates: latest git commit date per file under `dir`.
// Returns an empty map when git history is unavailable, in which case lastModified is omitted
// (better than reporting the build time as the modification time).
function getGitDates(dir: string): Map<string, string> {
  const dates = new Map<string, string>();
  try {
    const out = execFileSync(
      "git",
      ["-c", "core.quotepath=off", "log", "--name-only", "--format=@@%cI", "--", dir],
      { cwd: process.cwd(), encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }
    );
    let current = "";
    for (const line of out.split(/\r?\n/)) {
      if (line.startsWith("@@")) current = line.slice(2);
      else if (line && current && !dates.has(line)) dates.set(line, current); // first = latest commit
    }
  } catch {
    // no git available (e.g. source-only deploy): leave empty
  }
  return dates;
}

const withDate = (date?: string) => (date ? { lastModified: date } : {});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const gitDates = getGitDates("app");
  const dateOf = (relPath: string) => gitDates.get(relPath.replace(/\\/g, "/"));

  // 1. Static Pages (date = last commit of the page file)
  const staticPaths = [
    "",
    "/programs",
    "/whyaccredian",
    "/successstories",
    "/referandearn",
    "/about",
    "/career",
    "/career/mentor",
    "/contact-us",
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
    ...withDate(dateOf(`app${p}/page.jsx`)),
    changeFrequency: p === "" ? "daily" : "weekly",
    priority: p === "" ? 1.0 : 0.8,
  }));

  // 2. Vertical Category Pages (date = latest commit of the category data file(s))
  // Categories with no programs would be empty pages, so keep them out of the sitemap.
  const populatedSlugs = new Set<string>();
  try {
    const allPrograms = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "app/components/Assets/programs.json"), "utf8")
    );
    for (const p of allPrograms) populatedSlugs.add(categorySlug(p.category));
  } catch (err) {
    console.error("Error reading programs.json for sitemap:", err);
  }

  const slugDates = new Map<string, string>();
  const categorySlugs: string[] = [];
  for (const key of Object.keys(verticalsData)) {
    const slug = categorySlug(key);
    if (populatedSlugs.size && !populatedSlugs.has(slug)) continue;
    if (!slugDates.has(slug)) categorySlugs.push(slug);
    const d = dateOf(`app/components/Assets/verticals/${key}.json`);
    if (d && (!slugDates.get(slug) || d > slugDates.get(slug))) slugDates.set(slug, d);
    else if (!slugDates.has(slug)) slugDates.set(slug, "");
  }
  const verticalEntries: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/course/${slug}`,
    ...withDate(slugDates.get(slug)),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Program Pages (closed programs stay listed with lower priority)
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
        .map((file) => ({ file, id: file.replace(/\.json$/, "") }))
        // ids that are not URL-safe (e.g. contain "&") do not resolve to a page (404), so keep them out
        .filter(({ id }) => /^[A-Za-z0-9-]+$/.test(id))
        .map(({ file, id }) => {
          let isOpen = true;
          try {
            const data = JSON.parse(fs.readFileSync(path.join(programsDir, file), "utf8"));
            isOpen = data.enrollments === "active";
          } catch {
            // unreadable file: treat as open
          }
          return {
            url: `${BASE_URL}/programs/${id}`,
            ...withDate(dateOf(`app/components/Assets/programs/${file}`)),
            changeFrequency: isOpen ? "weekly" : "monthly",
            priority: isOpen ? 0.9 : 0.3,
          } as MetadataRoute.Sitemap[number];
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
          return {
            url: `${BASE_URL}/free-courses/${id}`,
            ...withDate(dateOf(`app/components/Assets/free-courses/${file}`)),
            changeFrequency: "monthly",
            priority: 0.7,
          } as MetadataRoute.Sitemap[number];
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
