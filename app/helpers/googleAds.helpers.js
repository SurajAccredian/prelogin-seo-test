/**
 * Dispatches Google Ads conversion event on successful lead form submission.
 * Conversion action: Accredian-Lead-Form-Submit
 * Uses existing dataLayer without creating duplicate or competing tracking scripts.
 */
export const trackGoogleAdsLeadConversion = () => {
  if (typeof window === "undefined") return;

  try {
    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];

    // Standard gtag stub ensuring calls push into dataLayer
    if (typeof window.gtag !== "function") {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }

    // Google Ads conversion event: fire once per successful submission
    window.gtag("event", "conversion", {
      send_to: "AW-842235274/4h0TCI3ZhasdEIr7zZED",
      value: 1.0,
      currency: "INR",
    });

    console.log("[Google Ads] Conversion event successfully dispatched to dataLayer:", {
      send_to: "AW-842235274/4h0TCI3ZhasdEIr7zZED",
      value: 1.0,
      currency: "INR",
    });
  } catch (err) {
    console.error("[Google Ads] Failed to dispatch lead conversion:", err);
  }
};
