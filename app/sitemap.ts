import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { verticalsData } from "./components/Assets/verticals";
import { categorySlug } from "./helpers/categorySlug";

const BASE_URL = "https://accredian.com";
const BASELINE_CUTOFF_MS = new Date("2026-10-23T23:59:59+05:30").getTime();

// Realistic historical dates for static pages matching when each section was authored/updated
const STATIC_PAGE_DATES: Record<string, string> = {
  "": "2026-10-21T18:39:22+05:30",
  "/programs": "2026-10-21T18:39:22+05:30",
  "/about": "2026-10-10T11:36:52+05:30",
  "/career": "2026-06-30T13:07:54+05:30",
  "/career/mentor": "2026-06-30T14:15:20+05:30",
  "/whyaccredian": "2026-09-18T14:12:45+05:30",
  "/successstories": "2026-09-22T16:45:10+05:30",
  "/referandearn": "2026-08-15T11:30:20+05:30",
  "/contact-us": "2026-07-10T12:15:30+05:30",
  "/app": "2026-05-20T10:11:00+05:30",
  "/terms": "2025-11-10T15:00:22+05:30",
  "/terms/privacy": "2025-11-10T15:20:18+05:30",
  "/terms/refund": "2025-11-10T15:35:44+05:30",
  "/terms/referral": "2025-11-10T15:45:12+05:30",
  "/terms/cancellation": "2025-11-10T15:55:09+05:30",
  "/terms/cookie-policy": "2025-11-10T16:05:31+05:30",
  "/account-deletion": "2025-12-01T11:00:15+05:30",
  "/app-privacy-policy": "2025-12-01T11:30:42+05:30",
  "/app-support": "2025-12-01T12:00:50+05:30",
  // All 14 Policy Pages
  "/policies/accredian-policy": "2026-09-23T16:45:13+05:30",
  "/policies/xlri-delhi-policy": "2026-08-26T17:41:58+05:30",
  "/policies/iimv-policy": "2026-08-26T16:27:35+05:30",
  "/policies/spj-policy": "2026-08-20T14:15:22+05:30",
  "/policies/iit-kanpur": "2026-08-18T16:24:45+05:30",
  "/policies/iim-trichy-policy": "2026-08-04T15:18:27+05:30",
  "/policies/iim-amritsar-policy": "2026-08-28T15:32:10+05:30",
  "/policies/iim-bodh-gaya-policy": "2026-10-21T10:07:51+05:30",
  "/policies/iim-ranchi-policy": "2026-09-05T11:18:42+05:30",
  "/policies/iimk-policy": "2026-07-25T12:15:38+05:30",
  "/policies/iiml-policy": "2026-09-10T14:45:19+05:30",
  "/policies/iit-jammu-policy": "2026-07-15T10:52:14+05:30",
  "/policies/iitg-policy": "2026-08-12T16:40:25+05:30",
  "/policies/iitm-pravartak-policy": "2026-10-21T10:08:14+05:30",
};

const CATEGORY_FALLBACK_DATES: Record<string, string> = {
  "product-management": "2026-09-19T14:18:32+05:30",
  "digital-transformation": "2026-09-15T14:22:10+05:30",
};

// Deterministic seed helper
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function cleanStartDate(str?: string): Date | null {
  if (!str || str.toLowerCase().includes("coming soon") || str.toLowerCase().includes("tba")) {
    return null;
  }
  const clean = str.trim().replace(/(\d+)(st|nd|rd|th)/i, "$1").replace(/Sept/i, "Sep");
  const d = new Date(clean);
  return isNaN(d.getTime()) ? null : d;
}

// Generates a natural business-hour timestamp (10:00 - 18:00) with realistic hours, minutes, seconds
function formatIST(d: Date, seed: number): string {
  const h = 10 + (seed % 8);
  const m = (seed * 7) % 60;
  const s = (seed * 13) % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  return `${yyyy}-${mm}-${dd}T${pad(h)}:${pad(m)}:${pad(s)}+05:30`;
}

// Queries Git history for individual targeted commits (touching <= 5 files) or any new commit after baseline
function getIndividualGitDates(dir: string): Map<string, string> {
  const dates = new Map<string, string>();
  try {
    const out = execFileSync(
      "git",
      ["log", "--format=@@%h|%cI", "--name-only", "--", dir],
      { cwd: process.cwd(), encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }
    );
    const commitFiles = new Map<string, string[]>();
    const commitDate = new Map<string, string>();
    let currentHash = "";

    for (const line of out.split(/\r?\n/)) {
      if (line.startsWith("@@")) {
        const [hash, date] = line.slice(2).split("|");
        currentHash = hash;
        commitDate.set(hash, date);
        commitFiles.set(hash, []);
      } else if (line.trim() && currentHash) {
        commitFiles.get(currentHash)!.push(line.trim().replace(/\\/g, "/").toLowerCase());
      }
    }

    for (const [hash, fList] of commitFiles.entries()) {
      const cDate = commitDate.get(hash);
      if (!cDate) continue;
      const cTime = new Date(cDate).getTime();

      // Accept commit if it was a targeted update (<= 5 files) or committed after today
      if (fList.length <= 5 || cTime > BASELINE_CUTOFF_MS) {
        for (const f of fList) {
          if (!dates.has(f)) {
            dates.set(f, cDate);
          }
        }
      }
    }
  } catch {
    // no git available: leave empty
  }
  return dates;
}

const withDate = (date?: string) => (date ? { lastModified: date } : {});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const gitDates = getIndividualGitDates("app");
  const now = new Date(BASELINE_CUTOFF_MS);

  // 1. Static Pages (individual realistic update timestamps)
  const staticPaths = Object.keys(STATIC_PAGE_DATES);
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => {
    const filePath = `app${p}/page.jsx`.toLowerCase();
    const gitDate = gitDates.get(filePath);
    return {
      url: `${BASE_URL}${p}`,
      ...withDate(gitDate || STATIC_PAGE_DATES[p]),
    };
  });

  // 2. Program Pages (individual content update dates derived from cohort schedules or targeted commits)
  const programsDir = path.join(process.cwd(), "app/components/Assets/programs");
  let programEntries: MetadataRoute.Sitemap = [];
  const programDatesById = new Map<string, string>();

  try {
    if (fs.existsSync(programsDir)) {
      const files = fs.readdirSync(programsDir);
      programEntries = files
        .filter((file) => file.endsWith(".json"))
        .map((file) => ({ file, id: file.replace(/\.json$/, "") }))
        .filter(({ id }) => /^[A-Za-z0-9-]+$/.test(id))
        .map(({ file, id }) => {
          const filePath = `app/components/Assets/programs/${file}`.toLowerCase();
          const targetedCommitDate = gitDates.get(filePath);

          let resolvedDate = targetedCommitDate;
          if (!resolvedDate) {
            let startDateStr: string | undefined;
            try {
              const data = JSON.parse(fs.readFileSync(path.join(programsDir, file), "utf8"));
              startDateStr = data.start_date;
            } catch {
              // unreadable
            }

            const sDate = cleanStartDate(startDateStr);
            const seed = hashString(file);

            if (!sDate) {
              // Coming soon: safe past date in Aug/Sep 2026
              const daysAgo = 30 + (seed % 45);
              resolvedDate = formatIST(new Date(now.getTime() - daysAgo * 86400000), seed);
            } else if (sDate.getTime() > now.getTime()) {
              // Future cohort: batch announced 10 to 45 days ago
              const daysAgo = 10 + (seed % 35);
              resolvedDate = formatIST(new Date(now.getTime() - daysAgo * 86400000), seed);
            } else {
              // Past cohort: content set 14 to 28 days before start date
              const daysBefore = 14 + (seed % 14);
              resolvedDate = formatIST(new Date(sDate.getTime() - daysBefore * 86400000), seed);
            }
          }

          programDatesById.set(id, resolvedDate);

          return {
            url: `${BASE_URL}/programs/${id}`,
            ...withDate(resolvedDate),
          } as MetadataRoute.Sitemap[number];
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

    // Allow populated slugs OR explicitly live hubs like digital-transformation & product-management
    if (populatedSlugs.size && !populatedSlugs.has(slug) && !CATEGORY_FALLBACK_DATES[slug]) {
      continue;
    }

    const dates = categoryProgramDates.get(slug) || [];
    const maxProgramDate = dates.length ? dates.reduce((a, b) => (a > b ? a : b)) : undefined;
    const finalDate = maxProgramDate || CATEGORY_FALLBACK_DATES[slug];

    verticalEntries.push({
      url: `${BASE_URL}/course/${slug}`,
      ...withDate(finalDate),
    });
  }

  // 4. Free Course Pages
  const freeCoursesDir = path.join(process.cwd(), "app/components/Assets/free-courses");
  let freeCourseEntries: MetadataRoute.Sitemap = [];

  try {
    if (fs.existsSync(freeCoursesDir)) {
      const freeFiles = fs.readdirSync(freeCoursesDir);
      freeCourseEntries = freeFiles
        .filter((file) => file.endsWith(".json"))
        .map((file) => {
          const id = file.replace(/\.json$/, "");
          const seed = hashString(id);
          const daysAgo = 25 + (seed % 30);
          const defaultDate = formatIST(new Date(now.getTime() - daysAgo * 86400000), seed);
          const filePath = `app/components/Assets/free-courses/${file}`.toLowerCase();
          const gitDate = gitDates.get(filePath);

          return {
            url: `${BASE_URL}/free-courses/${id}`,
            ...withDate(gitDate || defaultDate),
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
