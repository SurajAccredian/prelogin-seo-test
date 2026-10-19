import { notFound } from "next/navigation";
import { verticalsData } from "../../components/Assets/verticals";
import Wrapper from "../../components/Home/VerticalPage/wrapper";

function getCategoryData(category) {
  if (!category) return null;
  const raw = decodeURIComponent(category).toLowerCase().trim();

  // 1. Try direct replacement of hyphens to spaces
  const withSpaces = raw.replace(/-/g, " ").trim();
  if (verticalsData[withSpaces]) return verticalsData[withSpaces];

  // 2. Try with & replaced by "and"
  const withAnd = withSpaces.replace(/\s*&\s*/g, " and ").replace(/\s+/g, " ").trim();
  if (verticalsData[withAnd]) return verticalsData[withAnd];

  // 3. Try with "and" replaced by "&"
  const withAmp = withSpaces.replace(/\band\b/g, "&").replace(/\s+/g, " ").trim();
  if (verticalsData[withAmp]) return verticalsData[withAmp];

  return null;
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const data = getCategoryData(category);

  if (!data) {
    notFound();
  }

  const readable = decodeURIComponent(category)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const title = `${readable} Programs from IIMs, IITs & XLRI | Accredian`;
  const description =
    data.description ||
    `Explore top ${readable} certification programs at Accredian from IITs, IIMs & leading institutions. Advance your career with industry-relevant skills and expert mentorship.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/course/${category}`,
    },
    openGraph: {
      title,
      description,
      url: `https://accredian.com/course/${category}`,
    },
  };
}

import PROGRAMS from "../../components/Assets/programs.json";

function getCategorySchema(category, data) {
  const readable = decodeURIComponent(category)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const normalize = (s) =>
    String(s || "")
      .toLowerCase()
      .replace(/-/g, " ")
      .replace(/\s*&\s*/g, " and ")
      .replace(/\s+/g, " ")
      .trim();

  const targetNorm = normalize(data?.short_id || data?.vertical || data?.short_title || category);
  const matchingPrograms = PROGRAMS.filter((p) => normalize(p.category) === targetNorm);

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://accredian.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Courses",
        "item": "https://accredian.com/programs"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": readable,
        "item": `https://accredian.com/course/${category}`
      }
    ]
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${readable} Programs`,
    "description": data?.description || `Explore ${readable} programs`,
    "numberOfItems": matchingPrograms.length,
    "itemListElement": matchingPrograms.map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": p.program_name,
      "url": `https://accredian.com/programs/${p.id}`
    }))
  };

  return [breadcrumbs, itemList];
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = new Set();
  for (const k of Object.keys(verticalsData)) {
    slugs.add(k.replace(/\s*&\s*/g, "-and-").replace(/\s+/g, "-"));
    slugs.add(k.replace(/\s+/g, "-"));
  }
  return [...slugs].map((category) => ({ category }));
}

export default async function CourseCategoryPage({ params }) {
  const { category } = await params;
  const data = getCategoryData(category);

  if (!data) {
    notFound();
  }

  const schemas = getCategorySchema(category, data);

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <Wrapper data={data} />
    </>
  );
}
