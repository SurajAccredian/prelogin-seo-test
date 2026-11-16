// Base64 encoding constants for modal actions
export const ENCODED_ACTIONS = {
  brochure: "YnJvY2h1cmU=",
  enroll: "ZW5yb2xs",
};

/**
 * 1. Hardened URL Action Decoder (Review Point 1)
 * Safely decodes and validates action parameters from the URL.
 * Handles malformed URI components, padded/unpadded Base64, and plain-text fallbacks.
 */
export function decodeAction(param) {
  if (!param) return null;

  try {
    const clean = decodeURIComponent(String(param)).trim();
    const lower = clean.toLowerCase();

    // Plain-text fallback
    if (lower === "brochure" || lower === "enroll") {
      return lower;
    }

    // Base64 decode with padding restoration
    let base64 = clean;
    const remainder = base64.length % 4;
    if (remainder > 0) {
      base64 += "=".repeat(4 - remainder);
    }

    const decoded = (
      typeof atob === "function"
        ? atob(base64)
        : Buffer.from(base64, "base64").toString("utf-8")
    )
      .trim()
      .toLowerCase();

    if (decoded === "brochure" || decoded === "enroll") {
      return decoded;
    }
  } catch {
    // Gracefully catch URIError, invalid Base64, or unexpected parsing errors
  }

  return null;
}

/**
 * 2. URL Preservation Helper (Review Points 2 & 3)
 * Sets or removes the modal parameter while preserving all other query parameters
 * such as preview mode (preview=true, previewId=...) and UTM tracking params.
 */
export function buildModalUrl(pathname, currentSearch, action) {
  const params = new URLSearchParams(currentSearch || "");

  if (action && ENCODED_ACTIONS[action]) {
    params.set("modal", ENCODED_ACTIONS[action]);
    params.delete("action"); // clean legacy alias if present
  } else {
    params.delete("modal");
    params.delete("action");
  }

  const query = params.toString() ? `?${params.toString()}` : "";
  return `${pathname}${query}`;
}
