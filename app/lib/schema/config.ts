/**
 * Site-wide constants for structured data.
 * The @id values are permanent identifiers: once live, never change them.
 */
export const SITE_URL = "https://accredian.com";
export const BLOG_URL = "https://blog.accredian.com";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_ID = `${SITE_URL}/#logo`;
export const BLOG_ID = `${BLOG_URL}/#blog`;

export const LOGO_URL =
  "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/logo.webp";

/** Program fees are shown as "+ GST" on the site, so schema prices exclude tax. */
export const PRICES_INCLUDE_GST = false;
export const CURRENCY = "INR";

/** Official profiles. Add your Wikidata, G2 and Crunchbase URLs here once they exist. */
export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/company/accredianedu/",
  "https://www.youtube.com/channel/UCE0L_4ADPU2iyKnDJ0xRzyA",
  "https://www.instagram.com/accredian_edu",
  "https://twitter.com/accredianedu",
  "https://facebook.com/accredianlearn",
];

/** Category pages that exist at /course/{slug}; used to link a program's topic to its category page. */
export const CATEGORY_SLUGS = [
  "artificial-intelligence",
  "business-management",
  "cxo-leadership",
  "finance",
  "general-management",
  "human-resource",
  "product-management",
  "project-management",
  "senior-management",
  "strategy-and-leadership",
];
