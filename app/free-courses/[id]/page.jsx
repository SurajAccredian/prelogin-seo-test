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
    const title = `${data.title} | Self-Paced Free Course`;
    const description =
      data.description ||
      `Explore the ${data.title} free certification course at Accredian. ${data.duration} of official self-paced content.`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [],
      },
    };
  } catch {
    return {
      title: "Self-Paced Free Course Certification",
      description:
        "Explore free self-paced professional courses and certification programs from Accredian.",
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
