import { readFileSync } from "fs";
import path from "path";
import { Suspense } from "react";
import Programs from "../../components/Programs/Programs";
import SkeletonWL from "../../components/Skeleton/Withoutlogin";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const filePath = path.join(
      process.cwd(),
      "app/components/Assets/programs",
      `${id}.json`
    );
    const data = JSON.parse(readFileSync(filePath, "utf8"));
    const title = `${data.title} | ${data.university_name}`;
    const description =
      data.description ||
      `Explore the ${data.title} offered by ${data.university_name} at Accredian. ${data.duration ? `${data.duration} online program.` : ""}`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: data.university_image
          ? [data.university_image]
          : data.university_logo
          ? [data.university_logo]
          : [],
      },
    };
  } catch {
    return {
      title: "Professional Certification Program",
      description:
        "Explore professional certification programs from top IITs, IIMs, and business schools at Accredian.",
    };
  }
}

export default function ProgramPage() {
  return (
    <Suspense fallback={<SkeletonWL />}>
      <Programs />
    </Suspense>
  );
}
