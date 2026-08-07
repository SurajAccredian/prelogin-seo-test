"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/user";
import { useRouter } from "next/navigation";
import { Base64 } from "js-base64";
import CustomFreeCourseButton from "./CustomFreeCourseButton";

// Same key used in Hero.jsx
const PENDING_KEY = "pendingPaymentRedirect";

const Certification = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { authenticated } = useSelector((state) => state.user);
  const { certification } = data;
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    if (!authenticated) {
      if (width <= 768) {
        dispatch(userActions.setDrawerState(true));
      } else {
        dispatch(userActions.openLoginModal("login"));
      }
      localStorage.setItem(PENDING_KEY, data.program_id.toString());
      return;
    }
    const encryptedId = Base64.encode(data.program_id.toString());
    router.push("/course/payment/" + encryptedId);
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

          <p className="cert-price">
            &#8377;{data.exam_amount} + GST <span style={{ fontWeight: 500, color: "var(--accredian-text-muted)", fontSize: "13px" }}>(indicative)</span>
          </p>

          {isEnrolled ? (
            <button
              className="btn btn-secondary btn-block"
              disabled
              style={{
                background: "#F0FDF4",
                borderColor: "#16A34A",
                color: "#16A34A",
                cursor: "not-allowed",
                opacity: 1,
              }}
            >
              <span style={{ textTransform: "none" }}>
                Payment Received
              </span>
            </button>
          ) : (
            <button
              onClick={handleInterestClick}
              className={`btn btn-secondary btn-block`}
            >
              <span style={{ textTransform: "none" }}>
                Get Certified
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Certification;
