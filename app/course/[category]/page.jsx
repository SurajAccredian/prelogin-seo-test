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

export default async function CourseCategoryPage({ params }) {
  const { category } = await params;
  const data = getCategoryData(category);

  if (!data) {
    notFound();
  }

  return <Wrapper data={data} />;
}
