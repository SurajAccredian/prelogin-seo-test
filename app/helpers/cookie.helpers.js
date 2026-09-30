/**
 * Helper to read browser cookies by name.
 * Returns the decoded cookie value or empty string ("") if not found.
 */
export function getCookie(name) {
  if (typeof document === "undefined" || !document.cookie) return "";
  const match = document.cookie.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]*)"));
  if (!match) return "";
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

/**
 * On page load: check URL for fbclid and save _fbc_fallback cookie
 * in case _fbc cookie never gets set.
 */
export function saveFbcFallback() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get("fbclid");
    if (fbclid) {
      const isAccredian = window.location.hostname.includes("accredian.com");
      const domainAttr = isAccredian ? "; domain=.accredian.com" : "";
      document.cookie = `_fbc_fallback=fb.1.${Date.now()}.${fbclid}; max-age=${90 * 86400}; path=/${domainAttr}; SameSite=Lax`;
    }
  } catch (err) {
    // Ignore in non-browser environment
  }
}

/**
 * Returns FBC:
 * 1. Existing _fbc cookie value if present.
 * 2. If _fbc is empty, _fbc_fallback cookie value.
 * 3. If neither exists, empty string ("").
 */
export function getFbc() {
  saveFbcFallback();
  const fbc = getCookie("_fbc");
  if (fbc) return fbc;
  const fbcFallback = getCookie("_fbc_fallback");
  return fbcFallback || "";
}

/**
 * Returns FBP:
 * 1. Existing _fbp cookie value if present.
 * 2. No fallback, never generated.
 * 3. If _fbp does not exist, empty string ("").
 */
export function getFbp() {
  return getCookie("_fbp") || "";
}

/**
 * Helper to retrieve both FBC (with fallback) and FBP.
 */
export function getFbCookies() {
  return {
    fbc_field: getFbc(),
    fbp_field: getFbp(),
  };
}
