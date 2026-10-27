
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Wrapper from "../../components/Programs/wrapper";
import ProgramClientSync from "../../components/Programs/ProgramClientSync";
import { JsonLd } from "../../components/JsonLd";
import { programPageGraph, faqItemsFromSections } from "../../lib/schema";
import { generateFAQFromTemplate } from "../../helpers/faqTemplateService";
import { getPidBySlug } from "../../lib/program-pid-resolver";

function getProgramData(id) {
  try {
    const filePath = path.join(
      process.cwd(),
      "app/components/Assets/programs",
      `${id}.json`
    );

    if (!fs.existsSync(filePath)) return null;

    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = getProgramData(id);

  if (!data) notFound();

  const title = (data.seo_title || data.title || "").trim();

  const institute = data.university_name;

  const description =
    data.meta_description ||
    data.description ||
    `Explore the ${data.title} offered by ${institute || "leading institutes"} at Accredian. ${
      data.duration ? `${data.duration} online program.` : ""
    }`;

  const ogTitle = data.og_title || title;
  const keywords = data.keywords || undefined;
  const canonicalUrl = `https://accredian.com/programs/${id}`;

  const ogImage = data.university_image
    ? [data.university_image]
    : data.university_logo
      ? [data.university_logo]
      : undefined;

  return {
    title: {
      absolute: title,
    },
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
  const programsDir = path.join(
    process.cwd(),
    "app/components/Assets/programs"
  );

  if (!fs.existsSync(programsDir)) return [];

  const files = fs.readdirSync(programsDir);

  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({ id: file.replace(/\.json$/, "") }));
}

const ENABLE_BACKEND_FETCH = true;

export default async function ProgramPage({ params }) {
  const { id } = await params;
  const programData = getProgramData(id);

  if (!programData) notFound();

  // Preserve the live registration-status check from the existing page.
  const pid = programData.pid || getPidBySlug(id);

  if (pid && ENABLE_BACKEND_FETCH) {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD;

    if (backendUrl) {
      try {
        const response = await fetch(
          `${backendUrl}/program/${pid}/registration-status`,
          {
            next: {
              tags: [`program-status-${pid}`],
              revalidate: 3600,
            },
            signal: AbortSignal.timeout(2000),
          }
        );

        if (response.ok) {
          const result = await response.json();
          const liveStatus = result?.data?.registration_status;

          if (liveStatus === "active" || liveStatus === "inactive") {
            programData.registration_status = liveStatus;
            programData.enrollments = liveStatus;
          }
        }
      } catch {
        // Fall back to the registration status in the JSON file.
      }
    }
  }

  let faqs = [];
  try {
    const templateFaqs = generateFAQFromTemplate(programData);
    faqs = faqItemsFromSections(templateFaqs);
  } catch {
    // If template generation fails, fallback to programData.faq
  }

  if ((!faqs || faqs.length === 0) && Array.isArray(programData.faq)) {
    faqs = programData.faq.map((f) => ({
      question: f.question,
      answer: f.answer,
    }));
  }

  const pageTitle = (programData.seo_title || programData.title || "").trim();

  const schemaGraph = programPageGraph(programData, { faqs, pageTitle });

  return (
    <>
      <JsonLd data={schemaGraph} />
      <Wrapper data={programData} />
      <Suspense fallback={null}>
        <ProgramClientSync initialProgramData={programData} />
      </Suspense>
    </>
  );
}
