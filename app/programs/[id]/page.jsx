import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Wrapper from "../../components/Programs/wrapper";
import ProgramClientSync from "../../components/Programs/ProgramClientSync";
import { ProgramJsonLd } from "../../components/SEO/JsonLd";
import { getPidBySlug } from "../../lib/program-pid-resolver";

function getProgramData(id) {
  try {
    const filePath = path.join(
      process.cwd(),
      "app/components/Assets/programs",
      `${id}.json`
    );
    if (!fs.existsSync(filePath)) {
      return null;
    }
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = getProgramData(id);

  if (!data) {
    notFound();
  }

  // Same course name is run by several institutes, so the institute must be in the title/description to keep them unique.
  const institute = data.university_name;
  const hasInstitute = (text) =>
    !institute || text.toLowerCase().includes(institute.toLowerCase());

  const baseTitle = data.seo_title || data.title;
  const title = hasInstitute(baseTitle)
    ? data.seo_title || `${baseTitle} | Accredian`
    : `${baseTitle} | ${institute} | Accredian`;
  const baseDescription =
    data.description ||
    `Explore the ${data.title} offered by ${data.university_name} at Accredian. ${
      data.duration ? `${data.duration} online program.` : ""
    }`;
  const description = hasInstitute(baseDescription)
    ? baseDescription
    : `${data.title} by ${institute}. ${baseDescription}`;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: `/programs/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://accredian.com/programs/${id}`,
      images: data.university_image
        ? [data.university_image]
        : data.university_logo
        ? [data.university_logo]
        : [],
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const programsDir = path.join(
    process.cwd(),
    "app/components/Assets/programs"
  );
  if (!fs.existsSync(programsDir)) return [];
  const files = fs.readdirSync(programsDir);
  return files
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ id: f.replace(/\.json$/, "") }));
}

const ENABLE_BACKEND_FETCH = true;

export default async function ProgramPage({ params }) {
  const { id } = await params;
  const programData = getProgramData(id);

  if (!programData) {
    notFound();
  }

  // Live registration status check
  const pid = programData.pid || getPidBySlug(id);
  if (pid && ENABLE_BACKEND_FETCH) {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD ||
      (process.env.NODE_ENV === "production"
        ? "https://api.accredian.com"
        : "http://localhost:5000");

    try {
      const response = await fetch(`${backendUrl}/program/${pid}/registration-status`, {
        next: {
          tags: [`program-status-${pid}`],
          revalidate: 3600,
        },
        signal: AbortSignal.timeout(2000),
      });

      if (response.ok) {
        const result = await response.json();
        const liveStatus = result?.data?.registration_status;
        if (liveStatus === "active" || liveStatus === "inactive") {
          programData.registration_status = liveStatus;
          programData.enrollments = liveStatus;
        }
      }
    } catch {
      // Fallback silently to static JSON
    }
  }

  return (
    <>
      <ProgramJsonLd programData={programData} />
      <Wrapper data={programData} />
      <Suspense fallback={null}>
        <ProgramClientSync initialProgramData={programData} />
      </Suspense>
    </>
  );
}
