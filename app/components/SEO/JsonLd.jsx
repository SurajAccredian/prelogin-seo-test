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
  const rawFaqs = programData.faqs || programData.faq || [];
  const faqSchema =
    Array.isArray(rawFaqs) && rawFaqs.length > 0
      ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: rawFaqs
          .filter((f) => f.question || f.title)
          .map((f) => ({
            "@type": "Question",
            name: f.question || f.title,
            acceptedAnswer: {
              "@type": "Answer",
              text: typeof f.answer === "string" ? f.answer : f.description || "",
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
