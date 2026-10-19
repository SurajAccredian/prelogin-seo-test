import { readFileSync } from "fs";
import path from "path";
import { Suspense } from "react";
import FreeCourses from "../../components/FreeCourses/FreeCourses";
import SkeletonWL from "../../components/Skeleton/Withoutlogin";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const filePath = path.join(
      process.cwd(),
      "app/components/Assets/free-courses",
      `${id}.json`
    );
    const data = JSON.parse(readFileSync(filePath, "utf8"));
    const rawTitle = (
      data.seo_title ||
      `${data.title} | Self-Paced Free Course`
    )
      .replace(/\s*[-|]\s*Accredian$/i, "")
      .trim();
    const title = rawTitle;

    const description =
      data.meta_description ||
      data.description ||
      `Explore the ${data.title} free certification course at Accredian. ${data.duration} of official self-paced content.`;

    const ogTitle = data.og_title || rawTitle;
    const keywords = data.keywords || undefined;
    const canonicalUrl = `https://accredian.com/free-courses/${id}`;
    const ogImage = data.hero_image ? [data.hero_image] : [];

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
  } catch {
    return {
      title: "Self-Paced Free Course Certification",
      description:
        "Explore free self-paced professional courses and certification programs from Accredian.",
      alternates: {
        canonical: `https://accredian.com/free-courses/${id}`,
      },
    };
  }
}


export default function FreeCoursePage() {
  return (
    <Suspense fallback={<SkeletonWL />}>
      <FreeCourses />
    </Suspense>
  );
}
