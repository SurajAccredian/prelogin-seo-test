"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLandingPage } from "../LandingPageContext";
import { getStoredUTMData } from "../../../helpers/utm.helpers";
import { getFbc, getFbp } from "../../../helpers/cookie.helpers";
import { fetchClientIp } from "../../../helpers/ip.helpers";
import { trackGoogleAdsLeadConversion } from "../../../helpers/googleAds.helpers";
import { getCta } from "../../../services/program.service";

const VALIDATION_RULES = {
  full_name: (v) => typeof v === "string" && v.trim().length >= 2,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v || "").trim()),
  phone: (v) => /^[6-9]\d{9}$/.test((v || "").trim()),
  work_experience: (v) => Boolean(v && v.trim() !== ""),
  company: (v) => typeof v === "string" && v.trim().length >= 2,
  designation: (v) => typeof v === "string" && v.trim().length >= 2,
};

export default function LeadForm({ formId = "iimr_smp_hero", formConfig = {}, isModal = false }) {
  const { isSubmitted, setIsSubmitted, setAnyFormStarted } = useLandingPage();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    work_experience: "",
    company: "",
    designation: "",
    consent: true,
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formStartedRef = useRef(false);

  // Auto-fill UTM and tracking params
  const [trackingParams, setTrackingParams] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const utms = getStoredUTMData() || {};
      const qs = new URLSearchParams(window.location.search);

      const fbc = getFbc() || qs.get("fbclid") || "";
      const gclid = qs.get("gclid") || "";
      const liFatId = qs.get("li_fat_id") || "";
      const param1 = qs.get("param1") || "";
      const param2 = qs.get("param2") || "";

      fetchClientIp().then((ip) => {
        setTrackingParams({
          ...utms,
          utm_source: utms.utm_source || qs.get("utm_source") || "Direct",
          utm_medium: utms.utm_medium || qs.get("utm_medium") || "website-organic",
          utm_campaign: utms.utm_campaign || qs.get("utm_campaign") || "",
          utm_content: utms.utm_content || qs.get("utm_content") || "",
          utm_term: utms.utm_term || qs.get("utm_term") || "",
          param1,
          param2,
          fbclid: fbc,
          gclid,
          li_fat_id: liFatId,
          fbc_field: fbc,
          fbp_field: getFbp() || "",
          ip_field: ip || "",
          landing_page: window.location.href,
          referrer: document.referrer || "",
        });
      });
    }
  }, []);

  const handleFocus = () => {
    setAnyFormStarted(true);
    if (!formStartedRef.current && typeof window !== "undefined") {
      formStartedRef.current = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_start",
        form_id: formId,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = type === "checkbox" ? checked : value;

    if (name === "phone") {
      finalValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    // Immediate error removal on valid input
    if (VALIDATION_RULES[name] && VALIDATION_RULES[name](finalValue)) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (VALIDATION_RULES[name] && !VALIDATION_RULES[name](formData[name])) {
      setErrors((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Validate all fields
    const newErrors = {};
    Object.keys(VALIDATION_RULES).forEach((key) => {
      if (!VALIDATION_RULES[key](formData[key])) {
        newErrors[key] = true;
      }
    });

    if (!formData.consent) {
      setSubmitError("Please agree to be contacted so our advisor can reach you.");
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(
        Object.keys(VALIDATION_RULES).reduce((acc, k) => ({ ...acc, [k]: true }), {})
      );
      return;
    }

    setIsSubmitting(true);

    const submissionPayload = {
      phone: "+91" + formData.phone,
      name: formData.full_name,
      email: formData.email,
      work_experience: formData.work_experience,
      company: formData.company,
      designation: formData.designation,
      program: formConfig.program_name || "IIM Ranchi Senior Management Program",
      form_id: formId,
      source: isModal ? "Landing Page Popup" : "Landing Page Hero",
      type: "CTA",
      ...trackingParams,
    };

    try {
      if (formConfig.form_endpoint) {
        const res = await fetch(formConfig.form_endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionPayload),
        });
        if (!res.ok) throw new Error("Submission endpoint error");
      } else {
        // Submit via existing Accredian commonPublish backend service
        await getCta(submissionPayload);
      }

      // Track GTM & Google Ads conversions
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "lead_submit",
          form_id: formId,
          program: submissionPayload.program,
          work_experience: submissionPayload.work_experience,
          designation: submissionPayload.designation,
          utm_source: submissionPayload.utm_source || "",
          utm_campaign: submissionPayload.utm_campaign || "",
        });

        try {
          sessionStorage.setItem("lead_submitted", "1");
        } catch {
          // Ignore
        }
      }

      trackGoogleAdsLeadConversion();
      setIsSubmitted(true);
    } catch {
      // If error occurs, notify user & push error event
      setSubmitError("Something went wrong. Please try again.");
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "lead_submit_error",
          form_id: formId,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const idPrefix = isModal ? "p-" : "f-";

  if (isSubmitted) {
    return (
      <div className="success">
        <div className="tick">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#12A150" strokeWidth="3">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <h3>Thank you!</h3>
        <p>An Accredian program advisor will call you shortly to discuss the {formConfig.program_name || "program"}.</p>
      </div>
    );
  }

  return (
    <form id={formId} onSubmit={handleSubmit} noValidate>
      {submitError && (
        <div className="form-error" style={{ display: "block" }}>
          {submitError}
        </div>
      )}

      {/* Full Name */}
      <div className={`field ${touched.full_name && errors.full_name ? "invalid" : ""}`}>
        <label htmlFor={`${idPrefix}name`}>Full name</label>
        <input
          id={`${idPrefix}name`}
          name="full_name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          value={formData.full_name}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <div className="err">Please enter your name</div>
      </div>

      {/* Email */}
      <div className={`field ${touched.email && errors.email ? "invalid" : ""}`}>
        <label htmlFor={`${idPrefix}email`}>Email</label>
        <input
          id={`${idPrefix}email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={formData.email}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <div className="err">Please enter a valid email</div>
      </div>

      {/* Mobile Number */}
      <div className={`field ${touched.phone && errors.phone ? "invalid" : ""}`}>
        <label htmlFor={`${idPrefix}phone`}>Mobile number</label>
        <div className="phone">
          <span>+91</span>
          <input
            id={`${idPrefix}phone`}
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            autoComplete="tel-national"
            placeholder="10-digit mobile"
            value={formData.phone}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </div>
        <div className="err">Please enter a valid 10-digit mobile number</div>
      </div>

      {/* Work Experience */}
      <div className={`field ${touched.work_experience && errors.work_experience ? "invalid" : ""}`}>
        <label htmlFor={`${idPrefix}exp`}>Work experience</label>
        <select
          id={`${idPrefix}exp`}
          name="work_experience"
          value={formData.work_experience}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        >
          <option value="">Select years of experience</option>
          {formConfig.experience_options?.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="err">Please select your experience</div>
      </div>

      {/* Company & Designation */}
      <div className="row2">
        <div className={`field ${touched.company && errors.company ? "invalid" : ""}`}>
          <label htmlFor={`${idPrefix}company`}>Company</label>
          <input
            id={`${idPrefix}company`}
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Current company"
            value={formData.company}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <div className="err">Please enter your company</div>
        </div>

        <div className={`field ${touched.designation && errors.designation ? "invalid" : ""}`}>
          <label htmlFor={`${idPrefix}desig`}>Designation</label>
          <input
            id={`${idPrefix}desig`}
            name="designation"
            type="text"
            autoComplete="organization-title"
            placeholder="e.g. Senior Manager"
            value={formData.designation}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <div className="err">Please enter your designation</div>
        </div>
      </div>

      {/* Consent Checkbox */}
      <label className="consent">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
        />
        <span>{formConfig.consent_text || "I agree to be contacted by Accredian via call, WhatsApp, SMS and email about this program."}</span>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Submitting..."
          : isModal
            ? formConfig.button_popup_text || "Get a Callback"
            : formConfig.button_text || "Talk to our Advisor"}
      </button>

      {/* Security note */}
      <div className="form-note">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        <span>Your details are safe. No spam.</span>
      </div>
    </form>
  );
}

