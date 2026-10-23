/**
 * Partner institutes, keyed by the exact `university_name` values used in the CMS.
 * Each node carries verified Wikipedia and Wikidata links so search engines and AI
 * tools can tell exactly which institute a program comes from.
 * When you add a new partner, add it here (the build warns if a program uses an unknown name).
 */
import type { JsonLdNode } from "./types";

export const PROVIDERS: Record<string, JsonLdNode> = {
  "IIM Visakhapatnam": {
    "@type": "CollegeOrUniversity",
    "@id": "https://accredian.com/#partner-iim-visakhapatnam",
    "name": "Indian Institute of Management Visakhapatnam",
    "alternateName": "IIM Visakhapatnam",
    "url": "https://www.iimv.ac.in",
    "sameAs": [
      "https://www.iimv.ac.in",
      "https://en.wikipedia.org/wiki/Indian_Institute_of_Management_Visakhapatnam",
      "https://www.wikidata.org/wiki/Q24911657"
    ]
  },
  "IIM Ranchi": {
    "@type": "CollegeOrUniversity",
    "@id": "https://accredian.com/#partner-iim-ranchi",
    "name": "Indian Institute of Management Ranchi",
    "alternateName": "IIM Ranchi",
    "url": "https://www.iimranchi.ac.in",
    "sameAs": [
      "https://www.iimranchi.ac.in",
      "https://en.wikipedia.org/wiki/Indian_Institute_of_Management_Ranchi",
      "https://www.wikidata.org/wiki/Q15228649"
    ]
  },
  "IIM Lucknow": {
    "@type": "CollegeOrUniversity",
    "@id": "https://accredian.com/#partner-iim-lucknow",
    "name": "Indian Institute of Management Lucknow",
    "alternateName": "IIM Lucknow",
    "url": "https://www.iiml.ac.in",
    "sameAs": [
      "https://www.iiml.ac.in",
      "https://en.wikipedia.org/wiki/Indian_Institute_of_Management_Lucknow",
      "https://www.wikidata.org/wiki/Q46023"
    ]
  },
  "IIM Sirmaur": {
    "@type": "CollegeOrUniversity",
    "@id": "https://accredian.com/#partner-iim-sirmaur",
    "name": "Indian Institute of Management Sirmaur",
    "alternateName": "IIM Sirmaur",
    "url": "https://www.iimsirmaur.ac.in",
    "sameAs": [
      "https://www.iimsirmaur.ac.in",
      "https://en.wikipedia.org/wiki/Indian_Institute_of_Management_Sirmaur",
      "https://www.wikidata.org/wiki/Q28172529"
    ]
  },
  "IIM Tiruchirappalli": {
    "@type": "CollegeOrUniversity",
    "@id": "https://accredian.com/#partner-iim-tiruchirappalli",
    "name": "Indian Institute of Management Tiruchirappalli",
    "alternateName": "IIM Tiruchirappalli",
    "url": "https://www.iimtrichy.ac.in",
    "sameAs": [
      "https://www.iimtrichy.ac.in",
      "https://en.wikipedia.org/wiki/Indian_Institute_of_Management_Tiruchirappalli",
      "https://www.wikidata.org/wiki/Q6020656"
    ]
  },
  "IIM Kashipur": {
    "@type": "CollegeOrUniversity",
    "@id": "https://accredian.com/#partner-iim-kashipur",
    "name": "Indian Institute of Management Kashipur",
    "alternateName": "IIM Kashipur",
    "url": "https://www.iimkashipur.ac.in",
    "sameAs": [
      "https://www.iimkashipur.ac.in",
      "https://en.wikipedia.org/wiki/Indian_Institute_of_Management_Kashipur",
      "https://www.wikidata.org/wiki/Q6020630"
    ]
  },
  "IIM Bodh Gaya": {
    "@type": "CollegeOrUniversity",
    "@id": "https://accredian.com/#partner-iim-bodh-gaya",
    "name": "Indian Institute of Management Bodh Gaya",
    "alternateName": "IIM Bodh Gaya",
    "url": "https://www.iimbg.ac.in",
    "sameAs": [
      "https://www.iimbg.ac.in",
      "https://en.wikipedia.org/wiki/Indian_Institute_of_Management_Bodh_Gaya",
      "https://www.wikidata.org/wiki/Q21143214"
    ]
  },
  "IIM Amritsar": {
    "@type": "CollegeOrUniversity",
    "@id": "https://accredian.com/#partner-iim-amritsar",
    "name": "Indian Institute of Management Amritsar",
    "alternateName": "IIM Amritsar",
    "url": "https://www.iimamritsar.ac.in",
    "sameAs": [
      "https://www.iimamritsar.ac.in",
      "https://en.wikipedia.org/wiki/Indian_Institute_of_Management_Amritsar",
      "https://www.wikidata.org/wiki/Q20647463"
    ]
  },
  "XLRI": {
    "@type": "CollegeOrUniversity",
    "@id": "https://accredian.com/#partner-xlri",
    "name": "XLRI – Xavier School of Management",
    "alternateName": "XLRI",
    "url": "https://www.xlri.ac.in",
    "sameAs": [
      "https://www.xlri.ac.in",
      "https://en.wikipedia.org/wiki/XLRI_%E2%80%93_Xavier_School_of_Management",
      "https://www.wikidata.org/wiki/Q8042268"
    ]
  },
  "XLRI | Delhi-NCR": {
    "@type": "CollegeOrUniversity",
    "@id": "https://accredian.com/#partner-xlri",
    "name": "XLRI – Xavier School of Management",
    "alternateName": "XLRI",
    "url": "https://www.xlri.ac.in",
    "sameAs": [
      "https://www.xlri.ac.in",
      "https://en.wikipedia.org/wiki/XLRI_%E2%80%93_Xavier_School_of_Management",
      "https://www.wikidata.org/wiki/Q8042268"
    ]
  },
  "SP Jain School of Global Management": {
    "@type": "CollegeOrUniversity",
    "@id": "https://accredian.com/#partner-sp-jain",
    "name": "S P Jain School of Global Management",
    "alternateName": "SP Jain School of Global Management",
    "url": "https://www.spjain.org",
    "sameAs": [
      "https://www.spjain.org",
      "https://en.wikipedia.org/wiki/S_P_Jain_School_of_Global_Management",
      "https://www.wikidata.org/wiki/Q12067802"
    ]
  },
  "E&ICT Academy IIT Kanpur": {
    "@type": "EducationalOrganization",
    "@id": "https://accredian.com/#partner-eict-academy-iit-kanpur",
    "name": "E&ICT Academy, IIT Kanpur",
    "url": "https://eicta.iitk.ac.in",
    "sameAs": [
      "https://eicta.iitk.ac.in"
    ],
    "parentOrganization": {
      "@type": "CollegeOrUniversity",
      "name": "Indian Institute of Technology Kanpur",
      "alternateName": "IIT Kanpur",
      "url": "https://www.iitk.ac.in",
      "sameAs": [
        "https://www.iitk.ac.in",
        "https://en.wikipedia.org/wiki/IIT_Kanpur",
        "https://www.wikidata.org/wiki/Q782682"
      ]
    }
  },
  "E&ICT Academy IIT Guwahati": {
    "@type": "EducationalOrganization",
    "@id": "https://accredian.com/#partner-eict-academy-iit-guwahati",
    "name": "E&ICT Academy, IIT Guwahati",
    "url": "https://eict.iitg.ac.in",
    "sameAs": [
      "https://eict.iitg.ac.in"
    ],
    "parentOrganization": {
      "@type": "CollegeOrUniversity",
      "name": "Indian Institute of Technology Guwahati",
      "alternateName": "IIT Guwahati",
      "url": "https://www.iitg.ac.in",
      "sameAs": [
        "https://www.iitg.ac.in",
        "https://en.wikipedia.org/wiki/IIT_Guwahati",
        "https://www.wikidata.org/wiki/Q3518863"
      ]
    }
  },
  "I3C-IIT JAMMU": {
    "@type": "EducationalOrganization",
    "@id": "https://accredian.com/#partner-i3c-iit-jammu",
    "name": "I3C, IIT Jammu",
    "url": "https://www.iitjammu.ac.in",
    "sameAs": [
      "https://www.iitjammu.ac.in"
    ],
    "parentOrganization": {
      "@type": "CollegeOrUniversity",
      "name": "Indian Institute of Technology Jammu",
      "alternateName": "IIT Jammu",
      "url": "https://www.iitjammu.ac.in",
      "sameAs": [
        "https://www.iitjammu.ac.in",
        "https://en.wikipedia.org/wiki/IIT_Jammu",
        "https://www.wikidata.org/wiki/Q24896549"
      ]
    }
  },
  "Department of Entrepreneurship and Management, IIT Hyderabad": {
    "@type": "EducationalOrganization",
    "@id": "https://accredian.com/#partner-iit-hyderabad-dem",
    "name": "Department of Entrepreneurship and Management, IIT Hyderabad",
    "url": "https://iith.ac.in",
    "sameAs": [
      "https://iith.ac.in"
    ],
    "parentOrganization": {
      "@type": "CollegeOrUniversity",
      "name": "Indian Institute of Technology Hyderabad",
      "alternateName": "IIT Hyderabad",
      "url": "https://iith.ac.in",
      "sameAs": [
        "https://iith.ac.in",
        "https://en.wikipedia.org/wiki/IIT_Hyderabad",
        "https://www.wikidata.org/wiki/Q2808676"
      ]
    }
  },
  "IITM Pravartak": {
    "@type": "Organization",
    "@id": "https://accredian.com/#partner-iitm-pravartak",
    "name": "IITM Pravartak",
    "url": "https://www.iitm.ac.in/research-park/iitm-pravartak",
    "sameAs": [
      "https://www.iitm.ac.in/research-park/iitm-pravartak"
    ],
    "parentOrganization": {
      "@type": "CollegeOrUniversity",
      "name": "Indian Institute of Technology Madras",
      "alternateName": "IIT Madras",
      "url": "https://www.iitm.ac.in",
      "sameAs": [
        "https://www.iitm.ac.in",
        "https://en.wikipedia.org/wiki/IIT_Madras",
        "https://www.wikidata.org/wiki/Q858662"
      ]
    }
  },
  "Microsoft": {
    "@type": "Corporation",
    "@id": "https://accredian.com/#partner-microsoft",
    "name": "Microsoft",
    "url": "https://www.microsoft.com",
    "sameAs": [
      "https://www.microsoft.com",
      "https://en.wikipedia.org/wiki/Microsoft",
      "https://www.wikidata.org/wiki/Q2283"
    ]
  }
};

/** Short display names used in list items and breadcrumbs, e.g. "IIT Jammu (I3C)". */
const SHORT_NAMES: Record<string, string> = {
  "E&ICT Academy IIT Kanpur": "IIT Kanpur (E&ICT Academy)",
  "E&ICT Academy IIT Guwahati": "IIT Guwahati (E&ICT Academy)",
  "I3C-IIT JAMMU": "IIT Jammu (I3C)",
  "Department of Entrepreneurship and Management, IIT Hyderabad": "IIT Hyderabad",
  "XLRI | Delhi-NCR": "XLRI Delhi-NCR"
};

const normalise = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();
const BY_KEY = new Map(Object.entries(PROVIDERS).map(([k, v]) => [normalise(k), v]));

/** Returns the provider node for a CMS `university_name`, or a basic fallback (with a build warning). */
export function getProvider(universityName: string): JsonLdNode {
  const found = BY_KEY.get(normalise(universityName));
  if (found) return found;
  console.warn(`[schema] Unknown provider "${universityName}". Add it to lib/schema/providers.ts.`);
  return { "@type": "EducationalOrganization", name: universityName.trim() };
}

/** Short institute name for list items, e.g. "IIM Visakhapatnam" or "IIT Kanpur (E&ICT Academy)". */
export function providerShortName(universityName: string): string {
  const key = Object.keys(SHORT_NAMES).find((k) => normalise(k) === normalise(universityName));
  return key ? SHORT_NAMES[key] : universityName.replace(/\s+/g, " ").trim();
}
