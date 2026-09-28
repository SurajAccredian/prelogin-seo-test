/**
 * UTM / Ad Attribution Helper
 * Specification: WEBSITE CHANGES FOR META CAPI (3).docx (TAB 2)
 *
 * Parameters tracked (8 total):
 * 1. utm_source
 * 2. utm_medium
 * 3. utm_campaign
 * 4. utm_content
 * 5. utm_adset
 * 6. utm_ad
 * 7. utm_term
 * 8. utm_format
 *
 * Behavior:
 * - Captures first-touch UTM parameters from URL (window.location.search).
 * - Persists first-touch data in sessionStorage ('utm_data') for the browser session.
 * - Preserves first-touch values across client-side navigation.
 * - Applies organic / direct referrer fallback if no UTM parameters are present on initial landing.
 */

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_adset",
  "utm_ad",
  "utm_term",
  "utm_format",
];

const STORAGE_KEY = "utm_data";

/**
 * Derives fallback utm_source and utm_medium from document.referrer
 * as specified in Section 7 of the document.
 */
export function getFallbackFromReferrer() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { utm_source: "direct", utm_medium: "none" };
  }

  const ref = document.referrer ? document.referrer.toLowerCase() : "";

  if (!ref) {
    return { utm_source: "direct", utm_medium: "none" };
  }
  if (ref.indexOf("google.") !== -1) {
    return { utm_source: "google", utm_medium: "organic-search" };
  }
  if (ref.indexOf("bing.") !== -1) {
    return { utm_source: "bing", utm_medium: "organic-search" };
  }
  if (ref.indexOf("facebook.com") !== -1) {
    return { utm_source: "facebook", utm_medium: "organic-social" };
  }
  if (ref.indexOf("instagram.com") !== -1) {
    return { utm_source: "instagram", utm_medium: "organic-social" };
  }
  if (ref.indexOf("linkedin.com") !== -1) {
    return { utm_source: "linkedin", utm_medium: "organic-social" };
  }

  return { utm_source: "referral", utm_medium: "referral" };
}

/**
 * Extracts UTM parameters from window.location.search if present.
 */
export function getUTMFromURL() {
  if (typeof window === "undefined") return null;

  try {
    const params = new URLSearchParams(window.location.search);
    const found = {};
    let hasAny = false;

    UTM_KEYS.forEach((key) => {
      const val = params.get(key);
      if (val !== null && val !== undefined && val.trim() !== "") {
        found[key] = val.trim();
        hasAny = true;
      }
    });

    return hasAny ? found : null;
  } catch (err) {
    console.error("[utm.helpers] Error parsing URL UTMs:", err);
    return null;
  }
}

/**
 * Retrieves or initializes UTM data in accordance with Section 5.2 of the spec document.
 * Evaluation Order:
 * 1. getUTMFromURL() first: If URL contains UTM parameters, use them and persist to sessionStorage['utm_data'].
 * 2. sessionStorage['utm_data'] second: If URL has no UTM parameters, check existing stored session data (for internal navigation).
 * 3. getFallbackFromReferrer() third: If neither URL nor sessionStorage has data, use referrer fallback and persist.
 */
export function getInitialUTMData() {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_adset: "",
      utm_ad: "",
      utm_term: "",
      utm_format: "",
    };
  }

  try {
    // 1. getUTMFromURL() first: Check if the current URL contains UTM parameters
    const fromURL = getUTMFromURL();
    if (fromURL) {
      const urlData = {
        utm_source: fromURL.utm_source || "",
        utm_medium: fromURL.utm_medium || "",
        utm_campaign: fromURL.utm_campaign || "",
        utm_content: fromURL.utm_content || "",
        utm_adset: fromURL.utm_adset || "",
        utm_ad: fromURL.utm_ad || "",
        utm_term: fromURL.utm_term || "",
        utm_format: fromURL.utm_format || "",
      };
      // Persist to sessionStorage
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(urlData));
      return urlData;
    }

    // 2. Check existing sessionStorage['utm_data'] (e.g. after internal navigation to a page without UTM parameters)
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object") {
        return {
          utm_source: parsed.utm_source || "",
          utm_medium: parsed.utm_medium || "",
          utm_campaign: parsed.utm_campaign || "",
          utm_content: parsed.utm_content || "",
          utm_adset: parsed.utm_adset || "",
          utm_ad: parsed.utm_ad || "",
          utm_term: parsed.utm_term || "",
          utm_format: parsed.utm_format || "",
        };
      }
    }

    // 3. Fallback to documented referrer rules if neither URL nor sessionStorage exists
    const fallback = getFallbackFromReferrer();
    const fallbackData = {
      utm_source: fallback.utm_source || "direct",
      utm_medium: fallback.utm_medium || "none",
      utm_campaign: "",
      utm_content: "",
      utm_adset: "",
      utm_ad: "",
      utm_term: "",
      utm_format: "",
    };

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackData));
    return fallbackData;
  } catch (e) {
    console.error("[utm.helpers] Error in getInitialUTMData:", e);
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_adset: "",
      utm_ad: "",
      utm_term: "",
      utm_format: "",
    };
  }
}

/**
 * Returns stored UTM data (or initializes if not yet present).
 */
export function getStoredUTMData() {
  return getInitialUTMData();
}

export function getUTMData() {
  return getInitialUTMData();
}
