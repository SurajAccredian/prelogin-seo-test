/**
 * Program pages (/programs/[slug]).
 *
 * Takes the program object your page already loads from the CMS and returns one
 * connected graph: ItemPage -> Course -> provider institute, plus breadcrumbs and FAQ.
 *
 * Fixes made here, compared with the old template:
 * - name is trimmed                     (old: " Chief Executive Officer Program ...")
 * - offers.category = "Paid"/"Free"     (old: the topic, e.g. "cxo leadership")
 * - topic goes into `about`, linked to its category page
 * - courseWorkload = live hours, PT144H (old: calendar months, P11M)
 * - timeRequired = ISO 8601, P11M       (old: "11 months")
 * - credential is a real credential     (old: the program name repeated)
 * - instructors carry job title and affiliation (old: names only)
 * - availability comes from `enrollments`, and a past start date is never published as upcoming
 * - FAQ markdown is converted to plain text
 */
import { CATEGORY_SLUGS, CURRENCY, ORG_ID, PRICES_INCLUDE_GST, SITE_URL, WEBSITE_ID } from "./config";
import { breadcrumbNode, faqPageNode, makeGraph, ref } from "./nodes";
import { getProvider, providerShortName } from "./providers";
import {
  cleanText, compact, durationToIso, hoursToIso, parseHumanDate, slugify,
  splitHonorific, titleCase, todayInIndia, withArticle,
} from "./text";
import type { FaqItem, JsonLdGraph, JsonLdNode } from "./types";

/** The program object your program pages already receive (only the fields used here). */
export interface AccredianProgram {
  id: string; // slug, e.g. "chief-executive-officer-program"
  title: string;
  seo_title?: string;
  description?: string;
  /** Optional new CMS field: 2–3 factual sentences. If empty, one is generated from the data below. */
  schema_description?: string;
  /** Optional new CMS field, e.g. "A bachelor's degree in any discipline; 8 years of work experience preferred." */
  schema_prerequisites?: string;
  vertical?: string; // topic, e.g. "cxo leadership"
  university_name: string; // e.g. "IIM Visakhapatnam"
  university_image?: string;
  start_date?: string; // e.g. "25 Oct 2026"
  duration?: string; // e.g. "11 months"
  required_years_experience?: number;
  type?: string; // "online"
  enrollments?: string; // "active" | "inactive"
  timings?: string; // "weekends only"
  certificate?: string; // certificate image URL
  key_features?: Array<{ title: string; count?: number; text?: string | number }>;
  /** Points are usually strings, sometimes nested lists. */
  overview?: { content?: Array<{ title: string; points?: Array<string | string[]> }> };
  /** Usually a list of modules; some programs group modules, e.g. { coreModules: [...] }. */
  curriculum?: CurriculumEntry[] | Record<string, CurriculumEntry[] | unknown>;
  faculty?: Array<{ name: string; position?: string; organization?: string; image?: string }>;
  billing?: { total?: number };
}

export interface ProgramPageOptions {
  /**
   * The questions and answers your FAQ section actually renders on this page.
   * Do NOT pass program.faq: that field holds different questions that are not shown on the page.
   */
  faqs?: FaqItem[];
  /** The page's <title>. Defaults to "{seo_title}". */
  pageTitle?: string;
  /** Override "today" (for tests). */
  today?: Date;
}

export const programUrl = (slug: string): string => `${SITE_URL}/programs/${slug}`;

export const isOpenForEnrollment = (p: Pick<AccredianProgram, "enrollments">): boolean =>
  cleanText(p.enrollments).toLowerCase() === "active";

/** Use this to drop closed programs from lists that are both rendered and marked up (e.g. the homepage). */
export const onlyOpen = <T extends Pick<AccredianProgram, "enrollments">>(programs: T[]): T[] =>
  programs.filter(isOpenForEnrollment);

/** A curriculum point is usually text; sometimes an object with its own title and points. */
export type CurriculumPoint = string | { title?: string; points?: CurriculumPoint[] };
export interface CurriculumEntry {
  title?: string;
  points?: CurriculumPoint[];
  modules?: CurriculumPoint[];
}

const isEntry = (x: unknown): x is CurriculumEntry =>
  typeof x === "object" && x !== null && !Array.isArray(x) && cleanText((x as CurriculumEntry).title) !== "";

/** Flattens every curriculum shape found in the CMS into one list of titled modules. */
export function curriculumEntries(curriculum: AccredianProgram["curriculum"]): CurriculumEntry[] {
  if (Array.isArray(curriculum)) return curriculum.filter(isEntry);
  if (curriculum && typeof curriculum === "object") {
    return Object.values(curriculum).flatMap((group) => (Array.isArray(group) ? group.filter(isEntry) : []));
  }
  return [];
}

const pointText = (pt: CurriculumPoint): string => (typeof pt === "string" ? cleanText(pt) : cleanText(pt?.title));

export function courseModeOf(type?: string): "Online" | "Blended" | "Onsite" {
  const t = cleanText(type).toLowerCase();
  if (/hybrid|blended/.test(t)) return "Blended";
  if (/offline|onsite|on-site|campus|classroom/.test(t)) return "Onsite";
  return "Online";
}

/** Live hours from key_features: { title: "hours", count: 144 }, { title: "hours", text: "144+" } or { title: "class hours", text: "126" }. */
function liveHours(p: AccredianProgram): number | undefined {
  const f = (p.key_features ?? []).find((k) => /\bhours?\b/i.test(cleanText(k.title)));
  const n = typeof f?.count === "number" ? f.count : parseFloat(cleanText(f?.text).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

/** Uses schema_description if present; otherwise builds a factual one from the program data. */
export function describeProgram(p: AccredianProgram): string {
  const custom = cleanText(p.schema_description);
  if (custom) return custom;

  const months = cleanText(p.duration).match(/(\d+(?:\.\d+)?)\s*month/i)?.[1];
  const mode = courseModeOf(p.type).toLowerCase();
  const opening = withArticle(`${months ? `${months}-month ` : ""}${mode} program`);
  const weekends = /weekend/i.test(p.timings ?? "");
  const hours = liveHours(p);
  const classes = hours
    ? `, with ${hours}+ hours of live classes${weekends ? " on weekends" : ""}`
    : weekends ? ", with live classes on weekends" : "";
  const modules = curriculumEntries(p.curriculum).map((m) => cleanText(m.title)).slice(0, 4);

  let text = `${opening.charAt(0).toUpperCase()}${opening.slice(1)} from ${providerShortName(p.university_name)}${classes}.`;
  if (modules.length) text += ` Modules include ${modules.join("; ")}.`;
  if (text.split(" ").length < 25 && cleanText(p.description)) text += ` ${cleanText(p.description)}`;
  return text;
}

export function programPageGraph(program: AccredianProgram, options: ProgramPageOptions = {}): JsonLdGraph {
  const url = programUrl(program.id);
  const courseId = `${url}#course`;
  const name = cleanText(program.title);

  // Provider: a full institute node with Wikipedia/Wikidata links, referenced by @id.
  const provider = getProvider(program.university_name);
  const providerId = typeof provider["@id"] === "string" ? provider["@id"] : undefined;
  const providerRef = providerId ? ref(providerId) : provider;
  const providerShort = providerShortName(program.university_name);

  // Availability and dates: never publish a past date as an upcoming start.
  const today = todayInIndia(options.today);
  const open = isOpenForEnrollment(program);
  const startDate = parseHumanDate(program.start_date);
  const startHasPassed = startDate !== undefined && startDate < today;
  if (open && (!startDate || startHasPassed)) {
    console.warn(
      `[schema] ${program.id}: enrollments are "active" but start_date is "${program.start_date ?? "missing"}". ` +
        "Update the next batch date in the CMS.",
    );
  }
  const publishedStartDate = startDate && !(open && startHasPassed) ? startDate : undefined;

  // Price: the fee shown on the page ("₹ 3,49,000 + GST").
  const price = typeof program.billing?.total === "number" ? program.billing.total : undefined;
  const offer = compact({
    "@type": "Offer",
    ...(price !== undefined
      ? {
          category: price > 0 ? "Paid" : "Free",
          price,
          priceCurrency: CURRENCY,
          priceSpecification: {
            "@type": "PriceSpecification",
            price,
            priceCurrency: CURRENCY,
            valueAddedTaxIncluded: PRICES_INCLUDE_GST,
          },
        }
      : {}),
    availability: open ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    url,
    seller: ref(ORG_ID),
  });

  // Topic -> `about`, linked to its category page when one exists.
  const topicSlug = program.vertical ? slugify(program.vertical) : "";
  const about = program.vertical
    ? compact({
        "@type": "Thing",
        name: titleCase(program.vertical),
        url: CATEGORY_SLUGS.includes(topicSlug) ? `${SITE_URL}/course/${topicSlug}` : undefined,
      })
    : undefined;

  // Audience from the "who should join" points, e.g. "Senior Executives (CXO, SVP): ..." -> "Senior Executives (CXO, SVP)".
  const whoShouldJoin = (program.overview?.content ?? []).find((c) => /who should join/i.test(c.title ?? ""))?.points ?? [];
  const audienceTypes = whoShouldJoin
    .flat()
    .filter((pt): pt is string => typeof pt === "string")
    .map((pt) => cleanText(pt.split(":")[0]))
    .filter(Boolean);

  const instructors = (program.faculty ?? []).map((f) => {
    const { prefix, name: personName } = splitHonorific(f.name);
    const org = cleanText(f.organization);
    const sameInstitute = org && org.toLowerCase() === cleanText(program.university_name).toLowerCase();
    return compact({
      "@type": "Person",
      honorificPrefix: prefix,
      name: personName,
      jobTitle: cleanText(f.position) || undefined,
      affiliation: sameInstitute ? providerRef : org ? { "@type": "Organization", name: org } : undefined,
      image: f.image,
    });
  });

  const years = program.required_years_experience;
  const prerequisites =
    cleanText(program.schema_prerequisites) ||
    (typeof years === "number" && years > 0 ? `Recommended work experience: ${years} years.` : undefined);

  const credentialCategory = /diploma/i.test(name) ? "Diploma" : "Certificate";

  const course = compact({
    "@type": "Course",
    "@id": courseId,
    name,
    description: describeProgram(program),
    url,
    mainEntityOfPage: ref(`${url}#webpage`),
    image: program.university_image,
    inLanguage: "en",
    provider: providerRef,
    publisher: ref(ORG_ID),
    about,
    syllabusSections: curriculumEntries(program.curriculum).map((m, i) =>
      compact({
        "@type": "Syllabus",
        position: i + 1,
        name: cleanText(m.title),
        description: [...(m.points ?? []), ...(m.modules ?? [])].map(pointText).filter(Boolean).join("; ") || undefined,
      }),
    ),
    coursePrerequisites: prerequisites,
    audience: audienceTypes.length
      ? { "@type": "EducationalAudience", educationalRole: "professional", audienceType: audienceTypes.join("; ") }
      : undefined,
    duration: cleanText(program.duration) || undefined,
    timeRequired: durationToIso(program.duration),
    educationalCredentialAwarded: compact({
      "@type": "EducationalOccupationalCredential",
      name: `${credentialCategory} from ${providerShort}`,
      credentialCategory,
      recognizedBy: providerRef,
      image: program.certificate,
    }),
    hasCourseInstance: compact({
      "@type": "CourseInstance",
      courseMode: courseModeOf(program.type),
      startDate: publishedStartDate,
      courseWorkload: hoursToIso(liveHours(program)),
      duration: cleanText(program.duration) || undefined,
      courseSchedule: /weekend/i.test(program.timings ?? "")
        ? {
            "@type": "Schedule",
            repeatFrequency: "Weekly",
            byDay: ["https://schema.org/Saturday", "https://schema.org/Sunday"],
          }
        : undefined,
      instructor: instructors,
    }),
    offers: offer,
  });

  const pageTitle = options.pageTitle ?? (cleanText(program.seo_title) || name);
  const webPage = compact({
    "@type": "ItemPage",
    "@id": `${url}#webpage`,
    url,
    name: pageTitle,
    isPartOf: ref(WEBSITE_ID),
    inLanguage: "en-IN",
    breadcrumb: ref(`${url}#breadcrumb`),
    mainEntity: ref(courseId),
    primaryImageOfPage: program.university_image ? { "@type": "ImageObject", url: program.university_image } : undefined,
  });

  return makeGraph(
    webPage,
    course,
    providerId ? (provider as JsonLdNode) : null,
    breadcrumbNode(url, [
      ["Home", `${SITE_URL}/`],
      ["Programs", `${SITE_URL}/programs`],
      [`${name} – ${providerShort}`, url],
    ]),
    faqPageNode(url, options.faqs, courseId),
  );
}
