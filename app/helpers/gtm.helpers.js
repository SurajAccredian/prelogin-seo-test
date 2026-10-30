/**
 * Dispatches the brochure-lead-submit event to GTM dataLayer on the homepage.
 * Maps strictly the 17 LeadSquared attributes configured in the backend.
 */
export const trackBrochureLeadSubmit = (payload, pathname = "/") => {
  if (typeof window === "undefined") return;

  // Strict check: Only execute on the homepage
  const isHomePage = pathname === "/" || window.location.pathname === "/";
  if (!isHomePage) return;

  try {
    const newId = () =>
      typeof window.crypto?.randomUUID === "function"
        ? window.crypto.randomUUID()
        : Date.now() + "." + Math.random().toString(36).slice(2, 10);

    // Normalize phone number to E.164 (+<country_code><digits>)
    const rawDigits = String(payload.phone || "").replace(/\D/g, "");
    let formattedPhone = "";
    if (rawDigits.length === 10) {
      formattedPhone = "+91" + rawDigits;
    } else if (rawDigits.length > 10) {
      formattedPhone = "+" + rawDigits;
    } else if (payload.phone) {
      formattedPhone = String(payload.phone).trim();
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "brochure-lead-submit",
      event_id: newId(),
      FirstName: (payload.name || "").trim(),
      EmailAddress: (payload.email || "").trim().toLowerCase(),
      Phone: formattedPhone,
      mx_Interested_Course: payload.program || "",
      mx_Source_CTA: payload.page || "homepage",
      mx_lead_page: payload.source || "Download Brochure",
      mx_utm_source: payload.utm_source || "Direct",
      mx_utm_medium: payload.utm_medium || "website-organic",
      mx_Campaign_Name: payload.utm_campaign || "",
      mx_Ad_Set: payload.utm_adset || "",
      mx_Ad_Name: payload.utm_ad || "",
      mx_City: payload.city || "",
      mx_State: payload.state || "",
      mx_Country: payload.country || "",
      mx_Fbc_Facebook_click_ID: payload.fbc_field || "",
      mx_Fbp_Facebook_Browser_ID: payload.fbp_field || "",
      mx_Client_IP: payload.ip_field || "",
    });
  } catch (err) {
    // Fail silently to never interrupt user interaction
    console.error("[dataLayer] Failed to push brochure-lead-submit:", err);
  }
};

