import { BLOG_URL } from "../schema/config";

export const BLOG_SITE_NAME = "Accredian Blog";
export const BLOG_OG_IMAGE =
  "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/logo.webp";
export const BLOG_HOME_TITLE = "Accredian Blog | Empowering Professionals Across All Tech Domains";
export const BLOG_HOME_DESCRIPTION =
  "Expert insights, career advice, and tutorials for Data Science, Product Management, General Management, Business Analytics, and more.";

/** Absolute URL on the canonical origin, e.g. blogUrl("/articles") -> https://accredian.com/blog/articles */
export const blogUrl = (path = "") => `${BLOG_URL}${path}`;

/**
 * Metadata for a /blog page. The root layout's openGraph/twitter belong to the main site (and carry
 * its URL), so every blog page states its own. `title` is used verbatim (title.absolute), because the
 * root layout's "%s | Accredian" template would otherwise be appended to the legacy blog titles.
 */
export function blogMetadata({ title, description, path, robots, openGraph = {}, twitter = {} }) {
  const url = blogUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    ...(robots ? { robots } : {}),
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: BLOG_SITE_NAME,
      images: [{ url: BLOG_OG_IMAGE, width: 1200, height: 630, alt: "Accredian Blog Logo" }],
      locale: "en_US",
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [BLOG_OG_IMAGE],
      creator: "@accredianedu",
      ...twitter,
    },
  };
}
