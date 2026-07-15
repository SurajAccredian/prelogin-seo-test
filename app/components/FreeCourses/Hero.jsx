"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/user";
import ExamInterestModal from "./ExamInterestModal";
import CustomFreeCourseButton from "./CustomFreeCourseButton";

// Key used to signal "open exam modal after login"
const PENDING_KEY = "pendingExamModal";

const Hero = ({ data }) => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.user);
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const [examModalOpen, setExamModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // When the user becomes authenticated, check if we need to open the exam modal
  useEffect(() => {
    if (authenticated && localStorage.getItem(PENDING_KEY) === "true") {
      localStorage.removeItem(PENDING_KEY);
      setExamModalOpen(true);
    }
  }, [authenticated]);

  const [isInterestSubmitted, setIsInterestSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && data.program_id) {
      const submitted = localStorage.getItem("exam_interest_submitted_" + data.program_id) === "true";
      setIsInterestSubmitted(submitted);
    }
  }, [data.program_id]);

  const handleInterestClick = (e) => {
    e.preventDefault();
    if (isInterestSubmitted) return;
    setExamModalOpen(true);
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <span className="partner-badge mt-4">
            <svg viewBox="0 0 21 21" width="18" height="18">
              <rect x="1" y="1" width="9" height="9" fill="#F25022" />
              <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
              <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
              <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
            </svg>
            Microsoft Official Training Partner
          </span>
          <h1>{data.title}</h1>
          <span className="hero-code">{data.code}</span>
          <p className="hero-desc">{data.description}</p>

          <div className="meta-row">
            <div className="meta-item">
              <span className="meta-label">Duration</span>
              <span className="meta-value">{data.duration}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Level</span>
              <span className="meta-value">{data.level}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Delivery</span>
              <span className="meta-value">{data.delivery}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Instructor</span>
              <span className="meta-value">{data.instructor_short}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Language</span>
              <span className="meta-value">{data.language}</span>
            </div>
          </div>

          <div className="hero-ctas">
            <CustomFreeCourseButton
              data={data}
              text="Start Learning Free"
              subText="Earn a badge"
              className="btn btn-primary btn-twoline"
            />
            <button
              onClick={handleInterestClick}
              className={`btn btn-secondary btn-twoline`}
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
                    minHeight: "56px"
                  }
                  : {}
              }
            >
              {isInterestSubmitted ? (
                <>
                  <span className="btn-title" style={{ textTransform: "none", display: "flex", alignItems: "center", gap: "6px", fontWeight: 600 }}>
                    <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ width: "16px", height: "16px" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Interest Registered</span>
                  </span>
                  <span style={{ fontSize: "11px", color: "#15803D", fontStyle: "italic", fontWeight: 400, textTransform: "none", display: "block", marginTop: "2px" }}>
                    We'll let you know
                  </span>
                </>
              ) : (
                <>
                  <span className="btn-title" style={{ textTransform: "none" }}>
                    Interested in getting <strong className="font-bold"></strong>
                  </span>
                  <span className="btn-sub">
                    Microsoft certified?
                  </span>
                </>
              )}
            </button>
          </div>

          <p className="cta-pricing-note">
            Free to learn. Certification is a separate, optional path — pricing details below.
          </p>
        </div>

        <div className="hero-visual">
          <img
            src={data.hero_image || "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/microsoft-hero-image.webp"}
            alt="Course Visual representation"
          />
        </div>
      </div>

      <ExamInterestModal
        isOpen={examModalOpen}
        onClose={() => setExamModalOpen(false)}
        courseTitle={data.title || null}
        programId={data.program_id}
      />
    </section>
  );
};

export default Hero;
