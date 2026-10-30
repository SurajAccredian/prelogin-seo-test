import PROGRAMS from "../Assets/programs.json";
import dsAi from "../Assets/programs/pg-certificate-program-in-data-science-ai.json";
import dsBasic from "../Assets/programs/pg-certificate-program-in-data-science.json";
import baManagers from "../Assets/programs/professional-certificate-program-in-business-analytics-for-managers.json";
import dsDt from "../Assets/programs/executive-program-in-ds-and-dt.json";
import dsPm from "../Assets/programs/executive-program-in-dspm.json";
import peopleAnalytics from "../Assets/programs/executive-development-program-in-digital-hr-leadership-and-people-analytics.json";

function transformProgram(raw) {
  return {
    id: raw.id,
    program_name: raw.title || raw.program_name,
    university_name: raw.university_name,
    university_image:
      raw.university_logo ||
      raw.university_image ||
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iitg.webp",
    cover_image:
      raw.cover_image ||
      raw.university_image ||
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/frontend-card-images/img-20.webp",
    brochureHeader: raw.brochureHeader || raw.university_logo || raw.university_image,
    duration: raw.duration || "9 Months",
    batch_type: raw.type ? raw.type.charAt(0).toUpperCase() + raw.type.slice(1) : "Online",
    category: "data science",
    status: raw.enrollments === "inactive" ? "Admission Closed" : (raw.status || "New Launch"),
    tags: Array.isArray(raw.tags)
      ? raw.tags.map((t) => (typeof t === "string" ? t : t.title))
      : ["Data Science", "Analytics"],
    brochure: {
      pdf: raw.brochure?.pdf || "",
      source: raw.brochure?.source || `${raw.title} Brochure`,
      campaign_name: raw.id,
    },
    program_fee: raw.program_fee,
    required_years_experience: raw.required_years_experience,
    url: `/programs/${raw.id}`,
  };
}

export const DATA_SCIENCE_PROGRAMS = [
  transformProgram(dsAi),
  transformProgram(dsBasic),
  transformProgram(baManagers),
  transformProgram(dsDt),
  transformProgram(dsPm),
  transformProgram(peopleAnalytics),
];

export const CATEGORY_PREDICATES = {
  "iim": (p) => {
    return (
      p.university_name?.toLowerCase().includes("iim") ||
      p.id?.toLowerCase().startsWith("iim") ||
      p.program_name?.toLowerCase().includes("iim")
    );
  },
  "iit": (p) => {
    return (
      p.university_name?.toLowerCase().includes("iit") ||
      p.id?.toLowerCase().startsWith("iit") ||
      p.program_name?.toLowerCase().includes("iit")
    );
  },
  "xlri": (p) => {
    return (
      p.university_name?.toLowerCase().includes("xlri") ||
      p.id?.toLowerCase().startsWith("xlri") ||
      p.program_name?.toLowerCase().includes("xlri")
    );
  },
  "ai-genai": (p) => {
    const cat = p.category?.toLowerCase() || "";
    return (
      cat.includes("artificial intelligence") ||
      /\bai\b/i.test(p.program_name)
    );
  },
  "cxo": (p) => {
    const cat = p.category?.toLowerCase() || "";
    return (
      cat.includes("cxo") ||
      cat.includes("senior management") ||
      cat.includes("strategy & leadership") 
    );
  },
  "project-management": (p) => {
    const cat = p.category?.toLowerCase() || "";
    const name = p.program_name?.toLowerCase() || "";
    return cat.includes("project management") || name.includes("project management");
  },
  "design-thinking": (p) => {
    const cat = p.category?.toLowerCase() || "";
    const name = p.program_name?.toLowerCase() || "";
    return (
      cat.includes("design thinking") ||
      name.includes("design thinking")
    );
  },
  "iim-ai": (p) => {
    const isIIM = p.university_name?.toLowerCase().includes("iim");
    const isAI =
      p.category?.toLowerCase().includes("artificial intelligence") ||
      /\bai\b/i.test(p.program_name);
    return isIIM && isAI;
  },
  "iit-project-management": (p) => {
    const isIIT = p.university_name?.toLowerCase().includes("iit");
    const isPM =
      p.category?.toLowerCase().includes("project management") ||
      p.program_name?.toLowerCase().includes("project management");
    return isIIT && isPM;
  },
  "xlri-hr": (p) => {
    const isXLRI = p.university_name?.toLowerCase().includes("xlri");
    const isHrOrLeadership =
      p.category?.toLowerCase().includes("human resource") ||
      p.category?.toLowerCase().includes("strategy & leadership") ||
      p.category?.toLowerCase().includes("general management") ||
      p.category?.toLowerCase().includes("senior management");
    return isXLRI && isHrOrLeadership;
  },
  "courses-for-working-professionals": (p) => {
    const name = p.program_name?.toLowerCase() || "";
    return (
      name.includes("executive") 
    );
  },
  "senior-leadership": (p) => {
    const name = p.program_name?.toLowerCase() || "";
    const cat = p.category?.toLowerCase() || "";
    return (
      cat.includes("senior management") ||
      name.includes("senior management") ||
      name.includes("global senior leadership") ||
      name.includes("accelerated senior management")
    );
  },
  "c-suite": (p) => {
    return /\b(chief|ceo|cfo|cto|chro|coo|cdaio)\b/i.test(p.program_name);
  },
  "leadership-transition": (p) => {
    const cat = p.category?.toLowerCase() || "";
    return (
      cat.includes("strategy & leadership") ||
      cat.includes("senior management")
    );
  },
  "ai-for-business": (p) => {
    const isAI =
      p.category?.toLowerCase().includes("artificial intelligence") ||
      /\bai\b/i.test(p.program_name);
    const name = p.program_name?.toLowerCase() || "";
    return (
      isAI &&
      (
        name.includes("business") ||
        name.includes("leader") ||
        name.includes("manager") ||
        name.includes("professional") ||
        name.includes("advanced") ||
        name.includes("transformation") ||
        name.includes("generative ai")
      )
    );
  },
  
  "career-advancement": (p) => {
    const cat = p.category?.toLowerCase() || "";
    const name = p.program_name?.toLowerCase() || "";
    return (
      cat.includes("general management") ||
      cat.includes("business management") ||
      cat.includes("project management") ||
      cat.includes("finance") ||
      cat.includes("strategy & leadership") ||
      name.includes("leadership with ai") ||
      name.includes("investment banking")
    );
  },
};

export function getProgramsByFilterKey(filterKey) {
  if (filterKey === "data-science") {
    return DATA_SCIENCE_PROGRAMS;
  }
  const predicate = CATEGORY_PREDICATES[filterKey];
  if (!predicate) {
    return PROGRAMS;
  }
  const seen = new Set();
  return PROGRAMS.filter((p) => {
    if (seen.has(p.id)) return false;
    if (predicate(p)) {
      seen.add(p.id);
      return true;
    }
    return false;
  });
}
