import { ORG_ID, SITE_URL, WEBSITE_ID } from "./config";
import { breadcrumbNode, makeGraph, ref } from "./nodes";
import { getProvider } from "./providers";
import { cleanText, compact } from "./text";
import type { JsonLdGraph, JsonLdNode } from "./types";

export interface PolicyPageOptions {
  type: "admission" | "refund";
  id: string;
  title: string;
  pageTitle?: string;
  description?: string;
}

/**
 * Structured data graph for policy pages: /policies/[id] and /refund-policies/[id].
 * Connects WebPage -> Website (global), publisher -> Accredian (global),
 * about -> Partner university (or Accredian), and BreadcrumbList.
 */
export function policyPageGraph(options: PolicyPageOptions): JsonLdGraph {
  const isAdmission = options.type === "admission";
  const pathSegment = isAdmission ? "policies" : "refund-policies";
  const url = `${SITE_URL}/${pathSegment}/${options.id}`;

  const cleanTitle = cleanText(options.title);
  const isAccredian = cleanTitle.toLowerCase() === "accredian";

  const defaultPageTitle = isAdmission
    ? `${cleanTitle} | Accredian Policies`
    : `${cleanTitle} Refund Policy | Accredian`;

  const defaultDescription = isAdmission
    ? `Read Accredian's ${cleanTitle} and eligibility requirements for our professional certification programs.`
    : `Read Accredian's ${cleanTitle} refund policy, fee terms, and cancellation guidelines for our professional certification programs.`;

  const pageTitle = cleanText(options.pageTitle) || defaultPageTitle;
  const description = cleanText(options.description) || defaultDescription;

  // Determine "about" entity: either Accredian OR a partner institute provider
  let aboutNode: JsonLdNode;
  let providerToInclude: JsonLdNode | null = null;

  if (isAccredian) {
    aboutNode = ref(ORG_ID);
  } else {
    const provider = getProvider(cleanTitle);
    if (provider["@id"]) {
      aboutNode = ref(provider["@id"] as string);
      providerToInclude = provider;
    } else {
      aboutNode = provider;
    }
  }

  const webPage = compact({
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: pageTitle,
    description,
    isPartOf: ref(WEBSITE_ID),
    inLanguage: "en-IN",
    breadcrumb: ref(`${url}#breadcrumb`),
    publisher: ref(ORG_ID),
    about: aboutNode,
  });

  const categoryName = isAdmission ? "Admission Policies" : "Refund Policies";
  const hubUrl = `${SITE_URL}/${pathSegment}/accredian-policy`;

  const trail: Array<[name: string, url: string]> = [
    ["Home", `${SITE_URL}/`],
  ];

  if (options.id === "accredian-policy") {
    trail.push([categoryName, url]);
  } else {
    trail.push([categoryName, hubUrl]);
    trail.push([cleanTitle, url]);
  }

  const breadcrumbs = breadcrumbNode(url, trail);

  return makeGraph(webPage, providerToInclude, breadcrumbs);
}
