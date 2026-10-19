"use client";

import React, { useEffect, useRef, useState } from "react";
import { getExamAcknowledgement, saveExamAcknowledgement } from "../../services/auth.service";
import { decodeToken } from "react-jwt";
import toast from "react-hot-toast";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import ReCAPTCHA from "react-google-recaptcha";

/**
 * ExamInterestModal
 * A database + Google Sheets backed acknowledgement modal.
 * Shown only after the user is authenticated.
 */
const ExamInterestModal = ({ isOpen, onClose, courseTitle, programId }) => {
  const overlayRef = useRef(null);
  const [ackStatus, setAckStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    wantsCertification: true,
  });
  const [formErrors, setFormErrors] = useState({});

  const onCaptchChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  const getEnrollmentId = () => {
    try {
      const enrollments = JSON.parse(localStorage.getItem("enrollment") || "[]");
      const matched = enrollments.find(e => Number(e.program_id) === Number(programId));
      return matched ? matched.enrol_id : null;
    } catch (err) {
      console.error("Failed to parse enrollment details:", err);
      return null;
    }
  };

  // Prefill details from token and load acknowledgment status when modal opens
  useEffect(() => {
    if (isOpen && typeof window !== "undefined" && programId) {
      const token = localStorage.getItem("token");
      if (token) {
        // Decode token to prefill form fields
        try {
          const decoded = decodeToken(token);
          if (decoded?.data) {
            const fname = decoded.data.firstname || "";
            const lname = decoded.data.lastname || decoded.data.userlastname || "";
            const fullName = [fname, lname].filter(Boolean).join(" ");
            setFormData({
              name: fullName,
              email: decoded.data.email || "",
              phone: decoded.data.mobile || "",
              wantsCertification: true,
            });
          }
        } catch (err) {
          console.error("Error prefilling form details:", err);
        }

        // Fetch current database acknowledgement status
        const enrol_id = getEnrollmentId();
        if (enrol_id) {
          setLoading(true);
          getExamAcknowledgement({ enrol_id, program_id: programId })
            .then((res) => {
              setAckStatus(res?.ack || 0);
              if (res?.ack === 1) {
                localStorage.setItem("exam_interest_submitted_" + programId, "true");
              }
            })
            .catch((err) => {
              console.error("Failed to fetch acknowledgment:", err);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      }
    }
  }, [isOpen, programId]);

  const handleClose = () => {
    onClose();
    if (ackStatus === 1) {
      window.location.reload();
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, ackStatus]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone || !formData.phone.trim()) {
      errors.phone = "Mobile number is required";
    } else if (formData.phone.length < 8) {
      errors.phone = "Please enter a valid mobile number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || !captchaVerified) return;

    setLoading(true);
    try {
      // 1. Submit details to Google Sheets (using the same macro as MentorForm)
      const sheetData = new FormData();
      sheetData.append("Name", formData.name);
      sheetData.append("Email", formData.email);
      sheetData.append("Mobile", formData.phone);
      sheetData.append("Course", courseTitle || "Microsoft Course");
      sheetData.append("ProgramId", programId || "");
      sheetData.append("WantsCertification", formData.wantsCertification ? "Yes" : "No");
      sheetData.append("Source", "Exam Interest Form");

      fetch(
        "https://script.google.com/macros/s/AKfycbwhJtc3uvNKsyYOepMnlXb97q8-APp1aOcROnUqhS3Uw90jBiB-Bop33ml8b9wWbKde/exec",
        {
          method: "POST",
          body: sheetData,
        }
      ).catch((err) => console.error("Google Sheets async error:", err));

      // 2. Submit details to the backend database (only if enrolled)
      // const enrol_id = getEnrollmentId();
      // if (enrol_id) {
      //   const val = formData.wantsCertification ? 1 : 0;
      //   const res = await saveExamAcknowledgement({ enrol_id, program_id: programId, ack: val });
      //   if (res?.status === 200) {
      //     setAckStatus(val);
      //   }
      // }

      // Maintain check in local storage
      localStorage.setItem("exam_interest_submitted_" + programId, "true");

      setAckStatus(1);
      toast.success("Interest recorded!", { position: "top-right" });
    } catch (err) {
      console.error("Failed to submit exam interest:", err);
      toast.error("Failed to save. Please try again.", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="exam-modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exam-modal-title"
    >
      <div className="exam-modal">
        {/* Header */}
        <div className="exam-modal-header">
          <div>
            <span className="exam-modal-eyebrow">Optional Certification</span>
            <h2 id="exam-modal-title" className="exam-modal-title">
              {ackStatus === 1 ? "Interest Acknowledged" : "Interested in the Exam?"}
            </h2>
          </div>
          <button
            className="exam-modal-close"
            onClick={handleClose}
            aria-label="Close modal"
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="exam-modal-ack-body">
          {loading && ackStatus !== 1 ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
              <div className="spinner" style={{ border: "3px solid #f3f3f3", borderTop: "3px solid #1A73E8", borderRadius: "50%", width: "30px", height: "30px", animation: "spin 1s linear infinite" }}></div>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : ackStatus === 1 ? (
            /* Layout when ack === 1 */
            <>
              <div className="exam-modal-ack-icon" style={{ color: "#16A34A" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {courseTitle && (
                <p className="exam-modal-course-name">{courseTitle}</p>
              )}

              <p className="exam-modal-ack-text" style={{ fontSize: "15px", color: "var(--accredian-text-heading)", fontWeight: 500, textAlign: "center" }}>
                Thank you for showing your interest!<br />
                We'll notify you over your registered email address when it opens.
              </p>

              <div className="exam-modal-ack-actions" style={{ justifyContent: "center", marginTop: "24px" }}>
                <button className="btn btn-primary" onClick={handleClose}>
                  Got it, thanks!
                </button>
              </div>
            </>
          ) : (
            /* Layout when ack === 0 */
            <>
              {courseTitle && (
                <p className="exam-modal-course-name" style={{ marginBottom: "8px", fontWeight: 700 }}>{courseTitle}</p>
              )}

              <p className="exam-modal-ack-text" style={{ marginBottom: "16px", fontSize: "13.5px" }}>
                Please fill in your details to record your interest. Once available, the optional Microsoft certification exam will be offered at an indicative price of <strong>₹2,499 + GST</strong>.
              </p>

              <form onSubmit={handleSubmit} className="exam-modal-form" style={{ marginTop: "16px" }}>
                <div className="form-group" style={{ marginBottom: "14px", textAlign: "left" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--accredian-text-heading)", marginBottom: "4px" }}>Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "8px", outline: "none", fontSize: "14px" }}
                    placeholder="Enter your name"
                    disabled={loading}
                  />
                  {formErrors.name && <span style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "block" }}>{formErrors.name}</span>}
                </div>

                <div className="form-group" style={{ marginBottom: "14px", textAlign: "left" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--accredian-text-heading)", marginBottom: "4px" }}>Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "8px", outline: "none", fontSize: "14px" }}
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                  {formErrors.email && <span style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "block" }}>{formErrors.email}</span>}
                </div>

                <div className="form-group" style={{ marginBottom: "14px", textAlign: "left" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--accredian-text-heading)", marginBottom: "4px" }}>Mobile Number</label>
                  <PhoneInput
                    inputStyle={{
                      width: '100%',
                      borderRadius: 8,
                      border: formErrors.phone
                        ? '1px solid rgb(248,113,113)'
                        : '1px solid rgb(226,232,240)',
                      padding: '10px 10px 10px 52px',
                      outline: 'none',
                      fontSize: '0.875rem',
                      height: '42px',
                    }}
                    specialLabel={false}
                    enableSearch={true}
                    disabled={loading}
                    country={'in'}
                    placeholder="Enter mobile number"
                    value={formData.phone}
                    onChange={(phone) => setFormData({ ...formData, phone })}
                  />
                  {formErrors.phone && <span style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "block" }}>{formErrors.phone}</span>}
                </div>

                <div className="form-group" style={{ marginBottom: "18px", display: "flex", alignItems: "flex-start", gap: "8px", textAlign: "left" }}>
                  <input
                    type="checkbox"
                    id="wantsCertification"
                    checked={formData.wantsCertification}
                    onChange={(e) => setFormData({ ...formData, wantsCertification: e.target.checked })}
                    style={{ marginTop: "3px", cursor: "pointer" }}
                    disabled={loading}
                  />
                  <label htmlFor="wantsCertification" style={{ fontSize: "12.5px", color: "var(--accredian-text-body)", cursor: "pointer", lineHeight: "1.4" }}>
                    I want optional official certification (indicative price ₹2,499 + GST, no payment is required now).
                  </label>
                </div>

                <div className="form-group" style={{ marginBottom: "18px", display: "flex", justifyContent: "center" }}>
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ""}
                    onChange={onCaptchChange}
                  />
                </div>

                <div className="exam-modal-ack-actions" style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !captchaVerified}
                    style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                  >
                    {loading && (
                      <svg style={{ width: "16px", height: "16px", animation: "spin 1s linear infinite" }} viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }}></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" style={{ opacity: 0.75 }}></path>
                      </svg>
                    )}
                    {loading ? "Submitting..." : "Submit Interest"}
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={onClose} style={{ flex: 1 }} disabled={loading}>
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamInterestModal;
