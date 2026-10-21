/**
 * Listing pages: category pages (/course/[slug]), the /programs catalog and the homepage.
 * These carry an ItemList, which is what makes you eligible for Google's Course list carousel
 * (at least 3 courses; every list item must have its own URL and match what the page shows).
 */
import { ORG_ID, SITE_URL, WEBSITE_ID } from "./config";
import { breadcrumbNode, faqPageNode, makeGraph, ref } from "./nodes";
import { programUrl, type AccredianProgram } from "./program";
import { providerShortName } from "./providers";
import { cleanText, compact } from "./text";
import type { FaqItem, JsonLdGraph, JsonLdNode } from "./types";

/** The fields a program card needs. Pass the same array the page uses to render its cards. */
export type ProgramSummary = Pick<AccredianProgram, "id" | "title" | "university_name" | "enrollments">;

/**
 * ItemList of programs. Each name includes the institute, so five programs called
 * "Executive Program in Leadership with AI" stay distinguishable. Returns null for an empty list.
 */
export function programListNode(listId: string, name: string, programs: ProgramSummary[]): JsonLdNode | null {
  if (programs.length === 0) return null;
  return {
    "@type": "ItemList",
    "@id": listId,
    name,
    numberOfItems: programs.length,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: programs.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: programUrl(p.id),
      name: `${cleanText(p.title)} – ${providerShortName(p.university_name)}`,
    })),
  };
}

export interface CategoryPageInput {
  slug: string; // "artificial-intelligence"
  name: string; // "Artificial Intelligence"
  pageTitle: string; // the page's <title>
  programs: ProgramSummary[]; // the programs shown on the page, in display order
  faqs?: FaqItem[]; // the FAQ shown on the page (must be in the HTML, not loaded on click)
}

export function categoryPageGraph(input: CategoryPageInput): JsonLdGraph {
  const url = `${SITE_URL}/course/${input.slug}`;
  const list = programListNode(`${url}#programs`, `${input.name} Programs`, input.programs);
  return makeGraph(
    compact({
      "@type": "CollectionPage",
      "@id": `${url}#webpage`,
      url,
      name: input.pageTitle,
      isPartOf: ref(WEBSITE_ID),
      inLanguage: "en-IN",
      breadcrumb: ref(`${url}#breadcrumb`),
      mainEntity: list ? ref(`${url}#programs`) : undefined,
      about: { "@type": "Thing", name: input.name },
    }),
    list,
    breadcrumbNode(url, [["Home", `${SITE_URL}/`], ["Programs", `${SITE_URL}/programs`], [input.name, url]]),
    faqPageNode(url, input.faqs),
  );
}

/** The /programs catalog page, which currently has no list at all. */
export function programsIndexGraph(input: { pageTitle: string; programs: ProgramSummary[] }): JsonLdGraph {
  const url = `${SITE_URL}/programs`;
  const list = programListNode(`${url}#programs`, "All programs", input.programs);
  return makeGraph(
    compact({
      "@type": "CollectionPage",
      "@id": `${url}#webpage`,
      url,
      name: input.pageTitle,
      isPartOf: ref(WEBSITE_ID),
      inLanguage: "en-IN",
      breadcrumb: ref(`${url}#breadcrumb`),
      mainEntity: list ? ref(`${url}#programs`) : undefined,
    }),
    list,
    breadcrumbNode(url, [["Home", `${SITE_URL}/`], ["Programs", url]]),
  );
}

/**
 * Homepage FAQ. Render these same items as a visible FAQ section on the homepage,
 * then pass them to homepageGraph(), so the page and the schema always match.
 * Update the partner list when partners change.
 */
export const BRAND_FAQS: FaqItem[] = [
  {
    question: "What is Accredian?",
    answer:
      "Accredian is an online executive education company founded in 2018 and based in Gurugram, India. It is a brand of FullStack Education Pvt Ltd and delivers live online programs in partnership with institutes such as IIM Visakhapatnam, IIM Ranchi, IIM Lucknow, XLRI, IIT Kanpur's E&ICT Academy, IIT Jammu and SP Jain School of Global Management.",
  },
  {
    question: "Which institutes does Accredian partner with?",
    answer:
      "Programs currently open for enrollment are offered with IIM Visakhapatnam, IIM Ranchi, IIM Lucknow, IIM Kashipur, IIM Sirmaur, IIM Tiruchirappalli, IIM Bodh Gaya, XLRI, IIT Kanpur's E&ICT Academy, IIT Jammu, IITM Pravartak and SP Jain School of Global Management. Accredian also offers a free Microsoft Official Course on Microsoft 365 Copilot and generative AI.",
  },
  {
    question: "How are Accredian programs delivered?",
    answer:
      "Almost all programs are taught through live online classes on weekends, with session recordings and study materials available afterwards. Some programs include an on-campus immersion at the partner institute, and free courses are self-paced.",
  },
  {
    question: "Who issues the certificate?",
    answer:
      "Each program page states who issues the certificate and what is required to earn it. For example, IIM Visakhapatnam's Chief Executive Officer Program awards a Completion Certificate from IIM Visakhapatnam to participants with at least 70% attendance and a 50% score in the overall assessment.",
  },
  {
    question: "How can I verify that a message or payment request is really from Accredian?",
    answer:
      "Official communication from Accredian comes only from email addresses ending in @accredian.com. Ignore payment requests sent over WhatsApp or other unofficial channels, and apply and pay only through the Enroll Now process on accredian.com.",
  },
];

export interface HomepageInput {
  pageTitle: string;
  /** Every program card the homepage shows, in display order (use onlyOpen() so closed programs aren't featured). */
  featured: ProgramSummary[];
  faqs?: FaqItem[];
}

export function homepageGraph(input: HomepageInput): JsonLdGraph {
  const url = `${SITE_URL}/`;
  return makeGraph(
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: input.pageTitle,
      isPartOf: ref(WEBSITE_ID),
      about: ref(ORG_ID),
      inLanguage: "en-IN",
    },
    programListNode(`${url}#featured-programs`, "Featured programs", input.featured),
    faqPageNode(url, input.faqs, ORG_ID),
  );
}
