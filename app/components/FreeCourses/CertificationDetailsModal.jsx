"use client";

import React, { useEffect, useRef, useState } from "react";
import { decodeToken } from "react-jwt";
import { useRouter } from "next/navigation";
import { Base64 } from "js-base64";

const CertificationDetailsModal = ({ isOpen, onClose, courseTitle, programId }) => {
  const overlayRef = useRef(null);
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = decodeToken(token);
          if (decoded?.data) {
            const fname = decoded.data.firstname || "";
            const lname = decoded.data.lastname || decoded.data.userlastname || "";
            const fullName = [fname, lname].filter(Boolean).join(" ");
            setUserData({
              name: fullName,
              email: decoded.data.email || "",
              phone: decoded.data.mobile || "",
            });
          }
        } catch (err) {
          console.error("Error prefilling form details:", err);
        }
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

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

  const handleProceed = () => {
    if (!programId) return;
    const encryptedId = Base64.encode(programId.toString());
    router.push(`/course/payment/${encryptedId}`);
  };

  if (!isOpen) return null;

  return (
    <div
      className="exam-modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px"
      }}
    >
      <div className="exam-modal" style={{
        background: "#fff",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "500px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        overflow: "hidden"
      }}>
        {/* Header */}
        <div className="exam-modal-header" style={{
          padding: "24px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start"
        }}>
          <div>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "4px" }}>
              Optional Certification
            </span>
            <h2 id="exam-modal-title" style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: 0 }}>
              Certification Details
            </h2>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close modal"
            style={{
              background: "transparent",
              border: "none",
              color: "#6B7280",
              cursor: "pointer",
              padding: "4px"
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "24px", height: "24px" }}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 24px 32px 24px" }}>
          {courseTitle && (
            <div style={{ marginBottom: "20px", padding: "16px", background: "#F3F4F6", borderRadius: "8px" }}>
              <p style={{ fontSize: "14px", color: "#4B5563", marginBottom: "4px" }}>Program</p>
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#111827", margin: 0 }}>{courseTitle}</p>
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#111827", marginBottom: "12px", borderBottom: "1px solid #E5E7EB", paddingBottom: "8px" }}>Candidate Details</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "2px" }}>Name</p>
                <p style={{ fontSize: "14px", fontWeight: 500, color: "#374151", margin: 0 }}>{userData.name}</p>
              </div>
              <div>
                <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "2px" }}>Phone</p>
                <p style={{ fontSize: "14px", fontWeight: 500, color: "#374151", margin: 0 }}>{userData.phone || "N/A"}</p>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "2px" }}>Email</p>
                <p style={{ fontSize: "14px", fontWeight: 500, color: "#374151", margin: 0 }}>{userData.email}</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#111827", marginBottom: "12px", borderBottom: "1px solid #E5E7EB", paddingBottom: "8px" }}>Fee Details</h3>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "14px", color: "#4B5563" }}>Certification Fee</span>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#111827" }}>₹2,499</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "14px", color: "#4B5563" }}>GST (18%)</span>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#111827" }}>₹449.82</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", paddingTop: "12px", borderTop: "1px dashed #D1D5DB" }}>
              <span style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}>Total Amount</span>
              <span style={{ fontSize: "18px", fontWeight: 700, color: "#1D4ED8" }}>₹2,948.82</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleProceed}
              style={{
                flex: 1,
                background: "#1D4ED8",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseOver={(e) => e.target.style.background = "#1E40AF"}
              onMouseOut={(e) => e.target.style.background = "#1D4ED8"}
            >
              Proceed to Payment
            </button>
            <button
              onClick={handleClose}
              style={{
                flex: 1,
                background: "#F3F4F6",
                color: "#374151",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseOver={(e) => e.target.style.background = "#E5E7EB"}
              onMouseOut={(e) => e.target.style.background = "#F3F4F6"}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationDetailsModal;
