import { generateFAQFromTemplate } from "../../helpers/faqTemplateService";

export function ProgramJsonLd({ programData }) {
  if (!programData) return null;

  const baseUrl = "https://accredian.com";
  const programUrl = `${baseUrl}/programs/${programData.id}`;

  // 1. Course Schema
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${programUrl}#course`,
    name: programData.title,
    description: programData.description,
    url: programUrl,
    provider: {
      "@type": "CollegeOrUniversity",
      name: programData.university_name || "Accredian",
      sameAs: baseUrl,
    },
    publisher: {
      "@type": "EducationalOrganization",
      "@id": `${baseUrl}/#organization`,
      name: "Accredian",
    },
    inLanguage: "en",
    educationalCredentialAwarded: programData.title,
    timeRequired: programData.duration || undefined,
    offers: {
      "@type": "Offer",
      category: programData.category || "Professional Certification",
      priceCurrency: "INR",
      price: programData.program_fee?.total_fee
        ? String(programData.program_fee.total_fee).replace(/[^0-9]/g, "")
        : undefined,
      availability:
        programData.enrollments === "active"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: programUrl,
    },
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

export function FaqJsonLd({ title, items }) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
