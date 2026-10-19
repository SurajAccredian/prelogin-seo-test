
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Wrapper from "../../components/FreeCourses/wrapper";

function getFreeCourseData(id) {
  try {
    const filePath = path.join(
      process.cwd(),
      "app/components/Assets/free-courses",
      `${id}.json`
    );

    if (!fs.existsSync(filePath)) {
      return null;
    }

    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = getFreeCourseData(id);

  if (!data) {
    notFound();
  }

  const rawTitle =
    data.seo_title ||
    `${data.title} | Self-Paced Free Course`;

  const title = rawTitle
    .replace(/\s*[-|]\s*Accredian$/i, "")
    .trim();

  const description =
    data.meta_description ||
    data.description ||
    `Explore the ${data.title} free certification course at Accredian. ${
      data.duration
        ? `${data.duration} of official self-paced content.`
        : ""
    }`;

  const ogTitle = data.og_title || title;
  const keywords = data.keywords || undefined;
  const canonicalUrl =
    `https://accredian.com/free-courses/${id}`;

  const ogImage = data.hero_image
    ? [data.hero_image]
    : undefined;

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: ogTitle,
      description,
      url: canonicalUrl,
      siteName: "Accredian",
      images: ogImage,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      site: "@accredianedu",
      title: ogTitle,
      description,
      images: ogImage,
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const dir = path.join(
    process.cwd(),
    "app/components/Assets/free-courses"
  );

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir);

  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({
      id: file.replace(/\.json$/, ""),
    }));
}

export default async function FreeCoursePage({ params }) {
  const { id } = await params;
  const data = getFreeCourseData(id);

  if (!data) {
    notFound();
  }

  return <Wrapper data={data} />;
}
