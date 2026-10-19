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

  const title = `${data.title} | Self-Paced Free Course`;
  const description =
    data.description ||
    `Explore the ${data.title} free certification course at Accredian. ${data.duration} of official self-paced content.`;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: `/free-courses/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://accredian.com/free-courses/${id}`,
      images: data.hero_image ? [data.hero_image] : [],
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const dir = path.join(
    process.cwd(),
    "app/components/Assets/free-courses"
  );
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  return files
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ id: f.replace(/\.json$/, "") }));
}

export default async function FreeCoursePage({ params }) {
  const { id } = await params;
  const data = getFreeCourseData(id);

  if (!data) {
    notFound();
  }

  return <Wrapper data={data} />;
}
