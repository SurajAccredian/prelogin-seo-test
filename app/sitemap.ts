import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { verticalsData } from "./components/Assets/verticals";
import { categorySlug } from "./helpers/categorySlug";
import { REFUND_POLICIES } from "./components/Assets/refund-policies";
import { POLICIES } from "./components/Assets/admission-policies";
import baselineLastmod from "./components/Assets/sitemap-lastmod.json";
import { getBlogSitemapEntries } from "./lib/blog/sitemap-entries";

const BASE_URL = "https://accredian.com";

// The blog block reads WordPress (1 h data cache, refreshed on demand by the revalidation webhook).
export const revalidate = 3600;

// Dates in sitemap-lastmod.json are the frozen first version. Only commits after this
// cutoff move a page's lastmod, so do not change it.
const BASELINE_CUTOFF = "2026-10-23T23:59:59+05:30";

const STATIC_PATHS = [
  "",
  "/programs",
  "/about",
  "/career",
  "/career/mentor",
  "/whyaccredian",
  "/successstories",
  "/referandearn",
  "/contact-us",
  "/app",
  "/terms",
  "/terms/privacy",
  "/terms/referral",
  "/terms/cancellation",
  "/terms/cookie-policy",
  "/account-deletion",
  "/app-privacy-policy",
  "/app-support",
  "/faq",
];

const SEARCH_INTENT_PATHS = [
  "/explore-programs/iim-programs",
  "/explore-programs/iit-programs",
  "/explore-programs/xlri-programs",
  "/explore-programs/ai-genai-programs",
  "/explore-programs/ai-for-business-programs",
  "/explore-programs/iim-ai-programs",
  "/explore-programs/cxo-programs",
  "/explore-programs/c-suite-programs",
  "/explore-programs/senior-leadership-programs",
  "/explore-programs/leadership-transition-programs",
  "/explore-programs/career-advancement-programs",
  "/explore-programs/programs-for-working-professionals",
  "/explore-programs/design-thinking-programs",
  "/explore-programs/project-management-programs",
  "/explore-programs/iit-project-management-programs",
  "/explore-programs/xlri-hr-programs",
];

const baseline = baselineLastmod as Record<string, string>;

// Latest commit date per file (lowercased repo path) for commits made after the baseline cutoff
function getGitDates(dir: string): Map<string, string> {
  const dates = new Map<string, string>();
  try {
    const out = execFileSync(
      "git",
      ["log", `--since=${BASELINE_CUTOFF}`, "--format=@@%cI", "--name-only", "--", dir],
      { cwd: process.cwd(), encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }
    );
    let currentDate = "";
    // git log is newest first, so the first date seen for a file is its latest change
    for (const line of out.split(/\r?\n/)) {
      if (line.startsWith("@@")) {
        currentDate = line.slice(2);
      } else if (line.trim() && currentDate) {
        const file = line.trim().replace(/\\/g, "/").toLowerCase();
        if (!dates.has(file)) dates.set(file, currentDate);
      }
    }
  } catch {
    // no git available: pages keep their baseline dates
  }
  return dates;
}

const newest = (dates: (string | undefined)[]) =>
  dates.reduce<string | undefined>(
    (a, b) => (b && (!a || new Date(b).getTime() > new Date(a).getTime()) ? b : a),
    undefined
  );

const withDate = (date?: string) => (date ? { lastModified: date } : {});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const gitDates = getGitDates("app");
  const gitDateOf = (...files: string[]) => newest(files.map((f) => gitDates.get(f.toLowerCase())));
  // Latest post-baseline commit to the source file(s), else the frozen first-version date
  const lastmodOf = (url: string, ...files: string[]) =>
    gitDateOf(...files) || baseline[url.replace(BASE_URL, "") || "/"];

  // 1. Static Pages
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((p) => {
    const url = `${BASE_URL}${p}`;
    return { url, ...withDate(lastmodOf(url, `app${p}/page.jsx`)) };
  });

  // 2. Program Pages
  const programsDir = path.join(process.cwd(), "app/components/Assets/programs");
  let programEntries: MetadataRoute.Sitemap = [];
  const programDatesById = new Map<string, string>();

  try {
    if (fs.existsSync(programsDir)) {
      programEntries = fs
        .readdirSync(programsDir)
        .filter((file) => file.endsWith(".json"))
        .map((file) => ({ file, id: file.replace(/\.json$/, "") }))
        .filter(({ id }) => /^[A-Za-z0-9-]+$/.test(id))
        .map(({ file, id }) => {
          const url = `${BASE_URL}/programs/${id}`;
          const date = lastmodOf(url, `app/components/Assets/programs/${file}`);
          if (date) programDatesById.set(id, date);
          return { url, ...withDate(date) } as MetadataRoute.Sitemap[number];
        });
    }
  } catch (err) {
    console.error("Error reading programs for sitemap:", err);
  }

  // 3. Vertical Category Pages (date = latest modified date among its constituent programs)
  const populatedSlugs = new Set<string>();
  const categoryProgramDates = new Map<string, string[]>();

  try {
    const allPrograms = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "app/components/Assets/programs.json"), "utf8")
    );
    for (const p of allPrograms) {
      const slug = categorySlug(p.category);
      populatedSlugs.add(slug);
      const pDate = programDatesById.get(p.id);
      if (pDate) {
        if (!categoryProgramDates.has(slug)) categoryProgramDates.set(slug, []);
        categoryProgramDates.get(slug)!.push(pDate);
      }
    }
  } catch (err) {
    console.error("Error reading programs.json for sitemap:", err);
  }

  const verticalEntries: MetadataRoute.Sitemap = [];
  const seenSlugs = new Set<string>();
  for (const key of Object.keys(verticalsData)) {
    const slug = categorySlug(key);
    if (seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);

    // Allow populated slugs OR hubs that already had a date in the first version
    const url = `${BASE_URL}/course/${slug}`;
    if (populatedSlugs.size && !populatedSlugs.has(slug) && !baseline[`/course/${slug}`]) {
      continue;
    }

    const finalDate = newest(categoryProgramDates.get(slug) || []) || baseline[`/course/${slug}`];
    verticalEntries.push({ url, ...withDate(finalDate) });
  }

  // 4. Free Course Pages
  const freeCoursesDir = path.join(process.cwd(), "app/components/Assets/free-courses");
  let freeCourseEntries: MetadataRoute.Sitemap = [];

  try {
    if (fs.existsSync(freeCoursesDir)) {
      freeCourseEntries = fs
        .readdirSync(freeCoursesDir)
        .filter((file) => file.endsWith(".json"))
        .map((file) => {
          const url = `${BASE_URL}/free-courses/${file.replace(/\.json$/, "")}`;
          const date = lastmodOf(url, `app/components/Assets/free-courses/${file}`);
          return { url, ...withDate(date) } as MetadataRoute.Sitemap[number];
        });
    }
  } catch (err) {
    console.error("Error reading free courses for sitemap:", err);
  }

  // 5. Admission Policy Pages
  const policyEntries: MetadataRoute.Sitemap = POLICIES.map((p) => {
    const url = `${BASE_URL}/policies/${p.tab}`;
    return {
      url,
      ...withDate(
        lastmodOf(url, "app/policies/[id]/page.jsx", "app/components/Assets/admission-policies.js")
      ),
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  // 6. Refund Policy Pages
  const refundPolicyEntries: MetadataRoute.Sitemap = REFUND_POLICIES.map((p) => {
    const url = `${BASE_URL}/refund-policies/${p.tab}`;
    return {
      url,
      ...withDate(
        lastmodOf(url, "app/refund-policies/[id]/page.jsx", "app/components/Assets/refund-policies.js")
      ),
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  // 7. Blog (accredian.com/blog). Deliberately not wrapped in try/catch: a WordPress failure must fail the
  // sitemap, not silently drop the blog from it.
  const blogEntries = await getBlogSitemapEntries();
  // 1b. Search Intent Category Pages
  const searchIntentEntries: MetadataRoute.Sitemap = SEARCH_INTENT_PATHS.map((p) => {
    const url = `${BASE_URL}${p}`;
    return {
      url,
      ...withDate(lastmodOf(url, `app${p}/page.jsx`)),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  return [
    ...staticEntries,
    ...searchIntentEntries,
    ...verticalEntries,
    ...programEntries,
    ...freeCourseEntries,
    ...policyEntries,
    ...refundPolicyEntries,
    ...blogEntries,
  ];
}
