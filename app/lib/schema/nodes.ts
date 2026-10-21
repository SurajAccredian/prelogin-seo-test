import type { CmsFaqSections, FaqItem, JsonLdGraph, JsonLdNode } from "./types";
import { cleanText, markdownToText } from "./text";

/** A pointer to another node: {"@id": "..."}. This is how nodes get connected. */
export const ref = (id: string): JsonLdNode => ({ "@id": id });

/** Wraps nodes into one graph, skipping any that are null/undefined/false. */
export function makeGraph(...nodes: Array<JsonLdNode | null | undefined | false>): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter((n): n is JsonLdNode => Boolean(n)),
  };
}

/** Breadcrumb trail, e.g. [["Home", "https://accredian.com/"], ["Programs", ".../programs"], ...]. */
export function breadcrumbNode(pageUrl: string, trail: Array<[name: string, url: string]>): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: trail.map(([name, url], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: cleanText(name),
      item: url,
    })),
  };
}

/**
 * FAQPage built from the SAME questions and answers the page shows.
 * Markdown is converted to plain text; empty items are dropped; returns null if nothing is left.
 */
export function faqPageNode(pageUrl: string, faqs: FaqItem[] | undefined, aboutId?: string): JsonLdNode | null {
  const items = (faqs ?? [])
    .map((f) => ({ question: cleanText(f.question), answer: markdownToText(f.answer ?? "") }))
    .filter((f) => f.question && f.answer);
  if (items.length === 0) return null;
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    isPartOf: ref(`${pageUrl}#webpage`),
    ...(aboutId ? { about: ref(aboutId) } : {}),
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

/** Flattens your CMS FAQ shape (sections -> questions -> paragraphs) into a simple list. */
export function faqItemsFromSections(faq: CmsFaqSections | null | undefined): FaqItem[] {
  return (faq?.points ?? []).flatMap((section) =>
    (section.content ?? []).map((item) => ({
      question: item.title,
      answer: (item.content ?? []).join("\n"),
    })),
  );
}
