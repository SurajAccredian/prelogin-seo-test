import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import LandingPageTemplate from "../../../components/LandingPage/LandingPageTemplate";

function getLandingPageData(institute, program) {
  try {
    const filePath = path.join(
      process.cwd(),
      "app/components/Assets/landing-programs",
      institute,
      `${program}.json`
    );

    if (!fs.existsSync(filePath)) return null;

    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { institute, program } = await params;
  const data = getLandingPageData(institute, program);

  if (!data) notFound();

  return {
    title: data.meta?.title,
    description: data.meta?.description,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: data.meta?.og_title || data.meta?.title,
      description: data.meta?.og_description || data.meta?.description,
      images: data.meta?.og_image ? [data.meta?.og_image] : undefined,
    },
    alternates: {
      canonical: `https://accredian.com/${institute}/lp/${program}`,
    },
  };
}

export async function generateStaticParams() {
  const baseDir = path.join(
    process.cwd(),
    "app/components/Assets/landing-programs"
  );

  if (!fs.existsSync(baseDir)) return [];

  const institutes = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  const paramsList = [];

  for (const inst of institutes) {
    const files = fs
      .readdirSync(path.join(baseDir, inst.name))
      .filter((f) => f.endsWith(".json"));

    for (const file of files) {
      paramsList.push({
        institute: inst.name,
        program: file.replace(/\.json$/, ""),
      });
    }
  }

  return paramsList;
}

export default async function UniversityLandingPage({ params }) {
  const { institute, program } = await params;
  const data = getLandingPageData(institute, program);

  if (!data) notFound();

  return <LandingPageTemplate data={data} />;
}

