// syncLlms.js
// Generates public/llms.txt and public/llms-full.txt from the program catalogue.
const fs = require("fs");
const path = require("path");

const rootDir = process.cwd();
const BASE_URL = "https://accredian.com";
const programsFile = path.join(rootDir, "app/components/Assets/programs.json");
const programsDir = path.join(rootDir, "app/components/Assets/programs");
const faqFile = path.join(rootDir, "app/components/Assets/faq.js");
const llmsFile = path.join(rootDir, "public/llms.txt");
const llmsFullFile = path.join(rootDir, "public/llms-full.txt");

const CLOSED_STATUS = "admission closed";

// Same rules as app/helpers/categorySlug.js (that file is an ES module)
const SLUG_ALIASES = { "strategy-leadership": "strategy-and-leadership" };
const categorySlug = (name) => {
  const slug = String(name || "")
    .toLowerCase()
    .trim()
    .replace(/\s*&\s*|-&-/g, "-and-")
    .replace(/\s+/g, "-");
  return SLUG_ALIASES[slug] || slug;
};

const titleCase = (s) => s.replace(/\b[a-z]/g, (c) => c.toUpperCase()).replace(/\bCxo\b/, "CXO");

const INTRO =
  "Accredian is an executive upskilling platform in India. It offers live online executive programs, post-graduate certificates and CXO leadership tracks in AI, management, strategy, finance, HR and project management, in partnership with IIMs, IITs, XLRI, SP Jain and Microsoft.";

const NOTICE =
  "Fees, start dates and enrollment status change over time. Check the linked program page for current details before relying on anything here. For admissions questions use https://accredian.com/contact-us.";

const SITE_LINKS = [
  ["All programs", `${BASE_URL}/programs`],
  ["Frequently asked questions", `${BASE_URL}/faq`],
  ["Admission policies", `${BASE_URL}/policies/accredian-policy`],
  ["Refund policies", `${BASE_URL}/refund-policies/accredian-policy`],
  ["Why Accredian", `${BASE_URL}/whyaccredian`],
  ["Alumni success stories", `${BASE_URL}/successstories`],
  ["Career services", `${BASE_URL}/career`],
  ["Refer and earn", `${BASE_URL}/referandearn`],
  ["About Accredian", `${BASE_URL}/about`],
  ["Contact and admissions", `${BASE_URL}/contact-us`],
];

const inr = (n) => `INR ${Number(n).toLocaleString("en-IN")}`;

function readDetail(id) {
  try {
    return JSON.parse(fs.readFileSync(path.join(programsDir, `${id}.json`), "utf8"));
  } catch {
    return null;
  }
}

function programUrl(p) {
  return p.category === "free courses"
    ? `${BASE_URL}/free-courses/${p.id}`
    : `${BASE_URL}/programs/${p.id}`;
}

function feeOf(p, detail) {
  const total = detail && detail.billing && detail.billing.total;
  const fee = total || p.program_fee;
  return fee ? `${inr(fee)} + GST` : null;
}

function startOf(p) {
  const s = (p.start_date || "").trim();
  return s && !/coming soon|tba/i.test(s) ? s : "Coming soon";
}

function facts(p, detail) {
  const items = [];
  if (p.university_name) items.push(["Institution", p.university_name]);
  if (p.duration) items.push(["Duration", p.duration]);
  items.push(["Start date", startOf(p)]);
  if (p.required_years_experience !== undefined && p.required_years_experience !== null) {
    items.push(["Experience required", `${p.required_years_experience}+ years`]);
  }
  const fee = feeOf(p, detail);
  if (fee) items.push(["Fee", fee]);
  return items;
}

function fullEntry(p, detail) {
  const lines = [`#### [${p.program_name}](${programUrl(p)})`];
  for (const [k, v] of facts(p, detail)) lines.push(`- **${k}:** ${v}`);
  if (detail && detail.description) lines.push(`- **Description:** ${detail.description}`);
  const modules = detail && Array.isArray(detail.curriculum) ? detail.curriculum : [];
  const titles = modules.map((m) => m && m.title).filter(Boolean);
  if (titles.length) {
    lines.push("- **Curriculum:**");
    titles.forEach((t, i) => lines.push(`  ${i + 1}. ${t}`));
  }
  return lines.join("\n");
}

function indexEntry(p, detail) {
  const parts = [p.university_name, p.duration, feeOf(p, detail)].filter(Boolean);
  return `- [${p.program_name}](${programUrl(p)})${parts.length ? `: ${parts.join(" | ")}` : ""}`;
}

let programs;
try {
  programs = JSON.parse(fs.readFileSync(programsFile, "utf8"));
} catch (err) {
  console.error("Failed to read programs.json:", err.message);
  process.exit(1);
}
if (!Array.isArray(programs)) {
  console.error("programs.json is not an array");
  process.exit(1);
}

// Group by category slug, keeping first-seen order; open programs first, closed ones in their own section
// A program can appear under two categories in programs.json; list it once, under the first
const groups = new Map();
const seenIds = new Set();
for (const p of programs) {
  if (!p.id || !p.program_name || seenIds.has(p.id)) continue;
  seenIds.add(p.id);
  const slug = categorySlug(p.category);
  if (!groups.has(slug)) groups.set(slug, { slug, name: titleCase(p.category.replace(/\s*&\s*/g, " & ")), open: [], closed: [] });
  const g = groups.get(slug);
  (p.status === CLOSED_STATUS ? g.closed : g.open).push({ p, detail: readDetail(p.id) });
}
const allGroups = [...groups.values()];

const header = (title) => `# ${title}\n\n> ${INTRO}\n\n${NOTICE}\n`;
const linkList = SITE_LINKS.map(([t, u]) => `- [${t}](${u})`).join("\n");
const categoryLink = (g) => (g.slug === "free-courses" ? `${BASE_URL}/programs` : `${BASE_URL}/course/${g.slug}`);

let mainFaq = [];
try {
  ({ mainFaq = [] } = require(faqFile));
} catch (err) {
  console.warn("Failed to load faq.js:", err.message);
}

// llms.txt: short index
const indexSections = [];
for (const g of allGroups) {
  if (g.open.length) {
    indexSections.push(`## [${g.name}](${categoryLink(g)})\n\n${g.open.map((e) => indexEntry(e.p, e.detail)).join("\n")}`);
  }
}
const closedIndex = allGroups.flatMap((g) => g.closed).map((e) => `- [${e.p.program_name}](${programUrl(e.p)})${e.p.university_name ? `: ${e.p.university_name}` : ""}`);
if (closedIndex.length) {
  indexSections.push(`## Closed for new admissions\n\n${closedIndex.join("\n")}`);
}

// Top 8 curated FAQs for llms.txt (replaces redundant certification question with university partners)
const LLMS_TXT_FAQ_IDS = [
  "about-1",     // What is Accredian?
  "about-2",     // Who are Accredian programs designed for?
  "about-3",     // How do Accredian programs differ from traditional online courses?
  "academic-2",  // Who are Accredian's university partners?
  "about-5",     // What is the professional background and industry diversity of Accredian cohorts?
  "about-6",     // Are international candidates and non-resident professionals eligible to join Accredian programs?
  "about-7",     // Are Accredian executive certificates recognized by employers globally, and are they UGC/AICTE degree programs?
  "academic-1",  // What programs does Accredian offer?
];

let topFaqBlock = "";
if (Array.isArray(mainFaq) && mainFaq.length) {
  const allQuestionsMap = new Map(
    mainFaq.flatMap((cat) => cat.questions || []).map((q) => [q.id, q])
  );
  const top8 = LLMS_TXT_FAQ_IDS.map((id) => allQuestionsMap.get(id)).filter(Boolean);
  if (top8.length) {
    const items = top8.map((q) => `### ${q.question.trim()}\n\n${q.answer.trim()}`);
    topFaqBlock = `## [Frequently asked questions](${BASE_URL}/faq)\n\n${items.join("\n\n")}`;
  }
}

const llms = [
  header("Accredian (accredian.com)").trim(),
  "## Site\n\n" + linkList,
  topFaqBlock,
  indexSections.join("\n\n"),
  `## Optional\n\n- [Full catalogue with curriculum](${BASE_URL}/llms-full.txt)`,
]
  .filter(Boolean)
  .join("\n\n") + "\n";

// llms-full.txt: expanded catalogue

const institutions = [...new Set(programs.map((p) => p.university_name).filter(Boolean))];
const fullSections = [];
for (const g of allGroups) {
  if (g.open.length) {
    fullSections.push(`### [${g.name}](${categoryLink(g)})\n\n${g.open.map((e) => fullEntry(e.p, e.detail)).join("\n\n")}`);
  }
}

// FAQs sourced from the /faq page route (app/components/Assets/faq.js)
let faqBlock = "";
if (Array.isArray(mainFaq) && mainFaq.length) {
  const faqSections = [];
  for (const cat of mainFaq) {
    if (!cat.questions || !cat.questions.length) continue;
    const qas = cat.questions.map((q) => `#### ${q.question.trim()}\n\n${q.answer.trim()}`);
    faqSections.push(`### ${cat.heading}\n\n${qas.join("\n\n")}`);
  }
  if (faqSections.length) {
    faqBlock = `## [Frequently asked questions](${BASE_URL}/faq)\n\n${faqSections.join("\n\n")}`;
  }
}

const closedFull = allGroups.flatMap((g) => g.closed);
const closedBlock = closedFull.length
  ? `## Closed for new admissions\n\nThese programs are not taking new registrations. Their pages remain available for reference.\n\n${closedFull.map((e) => fullEntry(e.p, e.detail)).join("\n\n")}`
  : "";

const llmsFull = [
  header("Accredian: Program Catalogue").trim(),
  "## Site\n\n" + linkList,
  "## Partner institutions\n\n" + institutions.map((i) => `- ${i}`).join("\n"),
  faqBlock,
  "## Programs open for admission\n\n" + fullSections.join("\n\n"),
  closedBlock,
]
  .filter(Boolean)
  .join("\n\n") + "\n";

fs.writeFileSync(llmsFile, llms, "utf8");
fs.writeFileSync(llmsFullFile, llmsFull, "utf8");
console.log(`Wrote ${llmsFile} (${llms.length} chars)`);
console.log(`Wrote ${llmsFullFile} (${llmsFull.length} chars)`);
