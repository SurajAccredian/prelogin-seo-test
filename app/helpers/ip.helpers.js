/**
 * Helper to fetch public client IP address via ipify API.
 * Returns the public IP string, or empty string ("") on error or SSR.
 */
export async function fetchClientIp() {
  if (typeof window === "undefined") return "";
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    if (!response.ok) return "";
    const data = await response.json();
    return (data && data.ip) ? data.ip.trim() : "";
  } catch (error) {
    console.error("[ip.helpers] Error fetching client IP:", error);
    return "";
  }
}
