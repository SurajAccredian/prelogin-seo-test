import { LOGO_ID, LOGO_URL, ORG_ID, SITE_URL, SOCIAL_PROFILES, WEBSITE_ID } from "./config";
import { makeGraph, ref } from "./nodes";
import type { JsonLdGraph, JsonLdNode } from "./types";

/** The one Organization every page and blog post points to. */
export function organizationNode(): JsonLdNode {
  return {
    "@type": ["Organization", "EducationalOrganization"],
    "@id": ORG_ID,
    name: "Accredian",
    legalName: "FullStack Education Pvt Ltd",
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", "@id": LOGO_ID, url: LOGO_URL, contentUrl: LOGO_URL, caption: "Accredian logo" },
    image: ref(LOGO_ID),
    description:
      "Accredian is an online executive education company founded in 2018 and based in Gurugram, India. " +
      "A brand of FullStack Education Pvt Ltd, it delivers live online programs in partnership with institutes " +
      "including IIMs, IITs, XLRI and SP Jain School of Global Management.",
    foundingDate: "2018",
    address: {
      "@type": "PostalAddress",
      streetAddress: "4th Floor, Plot No. 250, Udyog Vihar Phase IV, Sector 18",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      postalCode: "122015",
      addressCountry: "IN",
    },
    areaServed: { "@type": "Country", name: "India" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "admissions",
        url: `${SITE_URL}/contact-us`,
        areaServed: "IN",
        availableLanguage: "English",
        // Add a company-wide admissions telephone and/or email here.
      },
    ],
    knowsAbout: [
      "Executive education", "Artificial intelligence", "Generative AI", "Leadership", "Strategy",
      "Product management", "Project management", "Human resource management", "Finance", "Data science",
    ],
    sameAs: SOCIAL_PROFILES,
  };
}

export function websiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: "Accredian",
    inLanguage: "en-IN",
    publisher: ref(ORG_ID),
  };
}

/** Output this once in the root layout of accredian.com; every page then refers to it by @id. */
export function sitewideGraph(): JsonLdGraph {
  return makeGraph(organizationNode(), websiteNode());
}

/** Short version of the Organization for the blog app (same @id, so both sites are one company). */
export function organizationStub(): JsonLdNode {
  return {
    "@type": ["Organization", "EducationalOrganization"],
    "@id": ORG_ID,
    name: "Accredian",
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: LOGO_URL },
  };
}
