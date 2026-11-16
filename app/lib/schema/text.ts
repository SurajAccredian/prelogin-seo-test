/**
 * Small, dependency-free helpers that turn CMS values into clean schema values.
 * Each one fixes a problem found on the live site (stray spaces, markdown in
 * FAQ answers, "25 Oct 2026" dates, "11 months" durations).
 */
import type { JsonLdNode } from "./types";

const MONTHS: Record<string, string> = {
  jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
  jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12",
};

const ACRONYMS: Record<string, string> = { cxo: "CXO", ai: "AI", hr: "HR", pg: "PG", ml: "ML", it: "IT" };

const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…",
  ndash: "–", mdash: "—", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
};

/** Trims and collapses whitespace. Fixes titles like " Chief Executive Officer Program". */
export function cleanText(value: string | number | null | undefined): string {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

/** Decodes HTML entities such as &#8217; and &hellip; (WordPress titles and excerpts use them). */
export function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code.startsWith("#")) {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : match;
    }
    return ENTITIES[code.toLowerCase()] ?? match;
  });
}

/** Removes HTML tags and WordPress's trailing "[…]" from excerpts. */
export function stripHtml(html: string): string {
  return cleanText(decodeEntities(html.replace(/<[^>]*>/g, " ")))
    .replace(/\s*\[(…|\.\.\.)\]\s*$/, "")
    .trim();
}

/**
 * Converts the markdown used in FAQ answers into readable plain text.
 * "- **Duration:** 11 months - **Format:** Online" becomes "Duration: 11 months. Format: Online."
 */
export function markdownToText(markdown: string): string {
  let text = markdown
    .replace(/\r\n?/g, "\n")
    .replace(/\s+-\s+(?=\*\*)/g, "\n- ") // inline bullets written as " - **Label:**"
    .replace(/([.!?])\s+-\s+/g, "$1\n- "); // inline bullets after a sentence
  // Bullets flattened onto one line ("network - Invitations - Learning"): split only when it is clearly a list.
  if ((text.match(/[ \t]-[ \t]+(?=[A-Z0-9"“])/g) ?? []).length >= 2) {
    text = text.replace(/[ \t]+-[ \t]+(?=[A-Z0-9"“])/g, "\n- ");
  }
  const lines = text.split("\n");

  return lines
    .map((line) =>
      cleanText(
        line
          .replace(/^\s*(?:[-*+•]|\d+[.)])\s+/, "") // bullet or number markers
          .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // [text](url) and images
          .replace(/(\*\*|__)(.+?)\1/g, "$2") // **bold**
          .replace(/(^|[\s(])[*_]([^*_\n]+)[*_](?=[\s).,!?:;]|$)/g, "$1$2") // *italic*
          .replace(/`([^`]+)`/g, "$1") // `code`
          .replace(/^#{1,6}\s+/, ""), // headings
      ),
    )
    .filter(Boolean)
    .map((sentence) => (/[.!?:;]$/.test(sentence) ? sentence : `${sentence}.`))
    .join(" ");
}

/** "25 Oct 2026" -> "2026-10-25". Also accepts ISO dates. Returns undefined if it can't parse. */
export function parseHumanDate(text: string | null | undefined): string | undefined {
  const t = cleanText(text);
  if (/^\d{4}-\d{2}-\d{2}/.test(t)) return t.slice(0, 10);
  const m = t.match(/^(\d{1,2})(?:st|nd|rd|th)?\s+([a-z]{3,9})\.?,?\s+(\d{4})$/i);
  if (!m) return undefined;
  const month = MONTHS[m[2].slice(0, 3).toLowerCase()];
  return month ? `${m[3]}-${month}-${m[1].padStart(2, "0")}` : undefined;
}

/** Today's date in India as YYYY-MM-DD, used to detect start dates that have passed. */
export function todayInIndia(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(now);
}

/** 144 -> "PT144H", 2.5 -> "PT2H30M" (ISO 8601 durations). */
export function hoursToIso(hours: number | null | undefined): string | undefined {
  if (typeof hours !== "number" || !Number.isFinite(hours) || hours <= 0) return undefined;
  const whole = Math.floor(hours);
  const minutes = Math.round((hours - whole) * 60);
  return `PT${whole ? `${whole}H` : ""}${minutes ? `${minutes}M` : ""}`;
}

/** "11 months" -> "P11M", "1 year" -> "P1Y", "9 Hours" -> "PT9H", "2.5 Hours" -> "PT2H30M". */
export function durationToIso(text: string | null | undefined): string | undefined {
  const m = cleanText(text).toLowerCase().match(/(\d+(?:\.\d+)?)\s*(year|yr|month|mo|week|wk|day|hour|hr|minute|min)s?\b/);
  if (!m) return undefined;
  const n = Number(m[1]);
  const unit = m[2];
  if (unit === "year" || unit === "yr") return `P${n}Y`;
  if (unit === "month" || unit === "mo") return `P${n}M`;
  if (unit === "week" || unit === "wk") return `P${n}W`;
  if (unit === "day") return `P${n}D`;
  if (unit === "hour" || unit === "hr") return hoursToIso(n);
  return `PT${n}M`;
}

/** "cxo leadership" -> "CXO Leadership", "strategy & leadership" -> "Strategy & Leadership". */
export function titleCase(text: string): string {
  return cleanText(text)
    .toLowerCase()
    .split(" ")
    .map((w) => ACRONYMS[w] ?? (w === "&" || w === "and" ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

/** "strategy & leadership" -> "strategy-and-leadership". */
export function slugify(text: string): string {
  return cleanText(text).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/** Adds "a" or "an": "11-month online program" -> "an 11-month online program". */
export function withArticle(phrase: string): string {
  const an = /^(8|11|18)(\D|$)|^8\d|^[aeio]/i.test(phrase);
  return `${an ? "an" : "a"} ${phrase}`;
}

/** Splits "Dr. Amit Shankar" into { prefix: "Dr.", name: "Amit Shankar" }. */
export function splitHonorific(fullName: string): { prefix?: string; name: string } {
  const name = cleanText(fullName);
  const m = name.match(/^(Dr\.?|Prof\.?|Mr\.?|Ms\.?|Mrs\.?)\s+(.+)$/i);
  return m ? { prefix: m[1], name: m[2] } : { name };
}

/** Parses "2,499" or 2499 into 2499. */
export function parseAmount(value: string | number | null | undefined): number | undefined {
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
  const n = Number(cleanText(value).replace(/[^\d.]/g, ""));
  return cleanText(value) && Number.isFinite(n) ? n : undefined;
}

/** Drops undefined, null, empty strings and empty arrays so the output stays clean. */
export function compact<T extends JsonLdNode>(node: T): T {
  return Object.fromEntries(
    Object.entries(node).filter(
      ([, v]) => v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0),
    ),
  ) as T;
}

/** Escapes "<" so a value can never close the <script> tag early (recommended by Next.js). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
