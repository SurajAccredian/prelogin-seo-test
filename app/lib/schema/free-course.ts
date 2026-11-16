/**
 * Free courses (/free-courses/[slug]). These pages had no Course schema at all.
 * Maps the free-course object your page already receives.
 */
import { CURRENCY, ORG_ID, PRICES_INCLUDE_GST, SITE_URL, WEBSITE_ID } from "./config";
import { faqPageNode, makeGraph, ref } from "./nodes";
import { PROVIDERS } from "./providers";
import { cleanText, compact, durationToIso, parseAmount } from "./text";
import type { FaqItem, JsonLdGraph, JsonLdNode } from "./types";

/** The free-course object your page already receives (only the fields used here). */
export interface AccredianFreeCourse {
  id: string; // "transform-business-workflows-with-generative-ai"
  title: string;
  partner_name?: string; // "Microsoft Official Training Partner"
  hero_image?: string;
  code?: string; // "AB-730T00 · Microsoft Official Course"
  description?: string;
  duration?: string; // "9 Hours"
  level?: string; // "Beginner"
  delivery?: string; // "Self-Paced"
  instructor_short?: string; // "Prateek Kumar"
  language?: string; // "English"
  exam_amount?: string | number; // "2,499" (optional paid certification)
}

const LANGUAGE_CODES: Record<string, string> = { english: "en", hindi: "hi" };

export function freeCoursePageGraph(
  course: AccredianFreeCourse,
  options: { pageTitle?: string; faqs?: FaqItem[] } = {},
): JsonLdGraph {
  const url = `${SITE_URL}/free-courses/${course.id}`;
  const courseId = `${url}#course`;
  const name = cleanText(course.title);
  const provider: JsonLdNode | undefined = /microsoft/i.test(course.partner_name ?? "") ? PROVIDERS["Microsoft"] : undefined;
  const providerId = provider && typeof provider["@id"] === "string" ? provider["@id"] : undefined;
  const certificationPrice = parseAmount(course.exam_amount);
  const duration = durationToIso(course.duration);

  const offers: JsonLdNode[] = [
    { "@type": "Offer", name: "Course access", category: "Free", price: 0, priceCurrency: CURRENCY,
      availability: "https://schema.org/InStock", url, seller: ref(ORG_ID) },
  ];
  if (certificationPrice) {
    offers.push({
      "@type": "Offer", name: "Optional certification", category: "Paid", price: certificationPrice, priceCurrency: CURRENCY,
      priceSpecification: { "@type": "PriceSpecification", price: certificationPrice, priceCurrency: CURRENCY, valueAddedTaxIncluded: PRICES_INCLUDE_GST },
      url, seller: ref(ORG_ID),
    });
  }

  return makeGraph(
    { "@type": "ItemPage", "@id": `${url}#webpage`, url, name: options.pageTitle ?? `${name} | Accredian`,
      isPartOf: ref(WEBSITE_ID), inLanguage: "en-IN", mainEntity: ref(courseId) },
    compact({
      "@type": "Course",
      "@id": courseId,
      name,
      courseCode: cleanText((course.code ?? "").split("·")[0]) || undefined,
      description: cleanText(course.description),
      url,
      mainEntityOfPage: ref(`${url}#webpage`),
      image: course.hero_image,
      provider: providerId ? ref(providerId) : ref(ORG_ID),
      publisher: ref(ORG_ID),
      isAccessibleForFree: true,
      educationalLevel: cleanText(course.level) || undefined,
      inLanguage: LANGUAGE_CODES[cleanText(course.language).toLowerCase()] ?? "en",
      duration: cleanText(course.duration) || undefined,
      timeRequired: duration,
      hasCourseInstance: compact({
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: duration,
        duration: cleanText(course.duration) || undefined,
        instructor: course.instructor_short ? { "@type": "Person", name: cleanText(course.instructor_short) } : undefined,
      }),
      offers,
    }),
    providerId ? provider : null,
    faqPageNode(url, options.faqs, courseId),
  );
}
