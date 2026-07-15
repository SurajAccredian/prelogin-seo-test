"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/user";
import ExamInterestModal from "./ExamInterestModal";
import CustomFreeCourseButton from "./CustomFreeCourseButton";

const PENDING_KEY = "pendingExamModal";

const Certification = ({ data }) => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.user);
  const { certification } = data;
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const [examModalOpen, setExamModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-open after login if flag is set
  useEffect(() => {
    if (authenticated && localStorage.getItem(PENDING_KEY) === "true") {
      localStorage.removeItem(PENDING_KEY);
      setExamModalOpen(true);
    }
  }, [authenticated]);

  const [isInterestSubmitted, setIsInterestSubmitted] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && data.program_id) {
      const submitted = localStorage.getItem("exam_interest_submitted_" + data.program_id) === "true";
      setIsInterestSubmitted(submitted);
    }
  }, [data.program_id]);

  useEffect(() => {
    if (authenticated) {
      try {
        const enrollments = JSON.parse(localStorage.getItem("enrollment") || "[]");
        const enrolled = enrollments.some(
          (e) => Number(e.program_id) === Number(data.program_id)
        );
        setIsEnrolled(enrolled);
      } catch (err) {
        console.error("Error parsing enrollment details:", err);
      }
    } else {
      setIsEnrolled(false);
    }
  }, [authenticated, data.program_id]);

  const handleInterestClick = (e) => {
    e.preventDefault();
    if (isInterestSubmitted) return;
    setExamModalOpen(true);
  };

  if (!certification) return null;

  return (
    <>
      <div className="cert-grid">
        {/* Free Card */}
        <div className="cert-card cert-free">
          <span className="cert-card-eyebrow">Free</span>
          <h3>Completion Badge</h3>

          <div className="cert-badge-visual">
            <img
              src={certification.free_badge.image || "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/accredian_microsoft_certification.png"}
              alt="Completion Badge Mockup"
            />
            <span className="cert-badge-caption">Reference design &mdash; final artwork to be confirmed</span>
          </div>

          <ul>
            {certification.free_badge.points?.map((pt, idx) => (
              <li key={idx}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          <CustomFreeCourseButton
            data={data}
            text="Start Learning Free"
            className="btn btn-primary btn-block"
          />
        </div>

        {/* Paid Card */}
        <div className="cert-card cert-paid">
          <span className="cert-card-eyebrow">Optional</span>
          <h3>Official Certification</h3>

          <div className="cert-badge-visual">
            <img
              src={certification.paid_cert.image || "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/official_certification.png"}
              alt="Official Certification Mockup"
            />
            <span className="cert-badge-caption">Reference design &mdash; final certificate to be confirmed</span>
          </div>

          <ul>
            {certification.paid_cert.points?.map((pt, idx) => (
              <li key={idx}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          {isEnrolled ? (
            <p className="cert-price">
              &#8377;{data.exam_amount} + GST <span style={{ fontWeight: 500, color: "var(--accredian-text-muted)", fontSize: "13px" }}>(indicative)</span>
            </p>
          ) : (
            <p className="cert-price" style={{ minHeight: "24px" }}></p>
          )}

          <button
            onClick={handleInterestClick}
            className={`btn btn-secondary btn-block`}
            disabled={isInterestSubmitted}
            data-action="open-interest-form"
            style={
              isInterestSubmitted
                ? {
                  background: "#F0FDF4",
                  borderColor: "#16A34A",
                  color: "#16A34A",
                  cursor: "not-allowed",
                  opacity: 1,
                  padding: "8px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                  minHeight: "48px"
                }
                : {}
            }
          >
            {isInterestSubmitted ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 600 }}>
                  <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ width: "16px", height: "16px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Interest Registered</span>
                </div>
                <span style={{ fontSize: "11px", color: "#15803D", fontStyle: "italic", fontWeight: 400, textTransform: "none" }}>
                  We'll let you know
                </span>
              </>
            ) : (
              <span style={{ textTransform: "none" }}>
                Interested in getting <strong className="font-bold">Microsoft certified?</strong>
              </span>
            )}
          </button>
        </div>
      </div>

      <ExamInterestModal
        isOpen={examModalOpen}
        onClose={() => setExamModalOpen(false)}
        courseTitle={data.title || null}
        programId={data.program_id}
      />
    </>
  );
};

export default Certification;
