/** One schema.org node: an object with @type, usually an @id, and its properties. */
export type JsonLdNode = { [key: string]: unknown };

/** What a page outputs: one connected graph. Nodes point to each other with {"@id": ...}. */
export interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
}

/**
 * A question and answer exactly as the page shows them.
 * Answers may contain markdown; it is converted to plain text for schema.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

/** The FAQ shape used in your CMS data: sections -> questions -> answer paragraphs. */
export interface CmsFaqSections {
  points?: Array<{
    title?: string;
    content?: Array<{ title: string; content?: string[] }>;
  }>;
}
