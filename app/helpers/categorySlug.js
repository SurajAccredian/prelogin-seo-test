// Single source of truth for /course/<slug> URLs:
// lowercase, "&" -> "and", spaces -> "-"  (e.g. "strategy & leadership" -> "strategy-and-leadership")

// Extra keys in Assets/verticals/index.js that point at the same page as another key.
const SLUG_ALIASES = {
  "strategy-leadership": "strategy-and-leadership",
};

export const categorySlug = (name) => {
  const slug = String(name || "")
    .toLowerCase()
    .trim()
    .replace(/\s*&\s*|-&-/g, "-and-")
    .replace(/\s+/g, "-");
  return SLUG_ALIASES[slug] || slug;
};
