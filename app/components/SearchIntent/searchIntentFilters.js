import PROGRAMS from "../Assets/programs.json";

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
