/**
 * @deprecated Use `JsonLd` from `@/components/JsonLd` and `programPageGraph` from `@/lib/schema` instead.
 */
import { generateFAQFromTemplate } from "../../helpers/faqTemplateService";
import { getInstitute } from "../Assets/institutes";

// "26 Oct 2025" -> "2025-10-26"; undefined for values like "Coming Soon"
function toIsoDate(value) {
  const d = new Date(`${value} UTC`);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

// "10 Months" -> "P10M"
function toIsoDuration(value) {
  const months = /(\d+)\s*months?/i.exec(value || "");
  return months ? `P${months[1]}M` : undefined;
}

export function ProgramJsonLd({ programData }) {
  if (!programData) return null;

  const baseUrl = "https://accredian.com";
  const programUrl = `${baseUrl}/programs/${programData.id}`;

  // 1. Course Schema
  const institute = getInstitute(programData.university_name);
  // Fee lives in billing.total (integer INR); omit offers entirely when it is missing
  const price =
    Number(programData.billing?.total) > 0
      ? String(Math.round(Number(programData.billing.total)))
      : undefined;

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${programUrl}#course`,
    name: programData.title,
    description: programData.description,
    url: programUrl,
    provider: {
      "@type": institute?.type || "EducationalOrganization",
      name: programData.university_name || "Accredian",
      ...(institute?.url ? { url: institute.url, sameAs: institute.url } : {}),
    },
    publisher: {
      "@type": "EducationalOrganization",
      "@id": `${baseUrl}/#organization`,
      name: "Accredian",
    },
    inLanguage: "en",
    educationalCredentialAwarded: programData.title,
    timeRequired: programData.duration || undefined,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      startDate: toIsoDate(programData.start_date),
      courseWorkload: toIsoDuration(programData.duration),
      ...(Array.isArray(programData.faculty) && programData.faculty.some((f) => f?.name)
        ? {
            instructor: programData.faculty
              .filter((f) => f?.name)
              .map((f) => ({ "@type": "Person", name: f.name })),
          }
        : {}),
    },
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            category: programData.vertical || "Professional Certification",
            priceCurrency: "INR",
            price,
            availability:
              programData.enrollments === "active"
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            url: programUrl,
            seller: { "@id": `${baseUrl}/#organization` },
          },
        }
      : {}),
    image: programData.university_image || programData.university_logo || undefined,
  };

  // 2. FAQPage Schema
  let faqsList = [];
  const usesTemplate =
    programData?.short_university_name === "iimv" ||
    programData?.short_university_name === "iitk" ||
    programData?.short_university_name === "xlri" ||
    programData?.short_university_name === "iiml" ||
    programData?.short_university_name === "iim-trichy" ||
    programData?.short_university_name === "iim-amritsar" ||
    programData?.short_university_name === "iim-kashipur" ||
    programData?.short_university_name === "iim-ranchi" ||
    programData?.short_university_name === "iit-jammu" ||
    programData?.short_university_name === "iim-sirmaur" ||
    programData?.short_university_name === "iimbg" ||
    programData?.id === "executive-program-in-strategic-hr-leadership" ||
    programData?.id === "executive-program-in-strategic-project-management-and-leadership" ||
    programData?.id === "executive-program-in-generative-ai-for-leaders" ||
    programData?.id === "professional-certificate-in-applied-generative-ai" ||
    programData?.id === "professional-certificate-in-ai-for-leaders" ||
    programData?.id === "sp-jain-executive-program-in-leadership-with-ai" ||
    programData?.id === "executive-development-programme-for-emerging-chief-technology-officers-the-cto-programme" ||
    programData?.id === "iith-professional-certificate-program-in-strategic-project-management" ||
    programData?.id === "iith-executive-program-in-design-thinking-and-innovation-for-strategic-leadership" ||
    programData?.id === "iiml-executive-program-in-strategic-project-management-leadership" ||
    programData?.id === "iiml-chief-digital-ai-officer-programme-the-cdaio-program";

  if (usesTemplate) {
    try {
      const generated = generateFAQFromTemplate(programData);
      const points = generated?.points || generated?.sections || [];
      points.forEach((cat) => {
        const items = cat.content || cat.questions || [];
        if (Array.isArray(items)) {
          items.forEach((q) => {
            const questionTitle = q.title || q.question;
            if (questionTitle) {
              const ans = Array.isArray(q.content)
                ? q.content.join(" ")
                : String(q.content || q.answer || "");
              faqsList.push({ name: questionTitle, text: ans });
            }
          });
        }
      });
    } catch {
      // fallback
    }
  }

  if (faqsList.length === 0) {
    const rawFaqs = programData.faqs || programData.faq || [];
    if (Array.isArray(rawFaqs) && rawFaqs.length > 0) {
      faqsList = rawFaqs.filter((f) => f.question || f.title).map((f) => ({
        name: f.question || f.title,
        text: typeof f.answer === "string" ? f.answer : f.description || "",
      }));
    } else if (rawFaqs && typeof rawFaqs === "object" && Array.isArray(rawFaqs.points)) {
      rawFaqs.points.forEach((cat) => {
        const items = cat.content || cat.questions || [];
        if (Array.isArray(items)) {
          items.forEach((q) => {
            const questionTitle = q.title || q.question;
            if (questionTitle) {
              const ans = Array.isArray(q.content)
                ? q.content.join(" ")
                : String(q.content || q.answer || "");
              faqsList.push({ name: questionTitle, text: ans });
            }
          });
        }
      });
    }
  }

  const faqSchema =
    faqsList.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqsList.slice(0, 10).map((f) => ({
            "@type": "Question",
            name: f.name,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.text,
            },
          })),
        }
      : null;

  // 3. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Programs",
        item: `${baseUrl}/programs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${programData.title} - ${programData.university_name || "Accredian"}`,
        item: programUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema).replace(/</g, "\\u003c"),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
