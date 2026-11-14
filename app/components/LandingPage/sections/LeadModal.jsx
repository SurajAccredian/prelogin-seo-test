"use client";

import React, { useEffect } from "react";
import { useLandingPage } from "../LandingPageContext";
import LeadForm from "./LeadForm";

export default function LeadModal({ formConfig = {}, urgency = {} }) {
  const { isModalOpen, closeModal, countdown, isClient } = useLandingPage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isModalOpen, closeModal]);

  useEffect(() => {
    if (isModalOpen && typeof document !== "undefined") {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const isExpired = isClient && countdown.isExpired;

  return (
    <div
      className="landing-page-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popTitle"
      onClick={handleBackdropClick}
    >
      <div className="pop-box">
        <div className="pop-top">
          <button
            className="pop-x"
            type="button"
            aria-label="Close"
            onClick={closeModal}
          >
            &times;
          </button>
          <span className="tag">
            {urgency.offer_text || "Scholarships open"}
          </span>
          <h3 id="popTitle">Get a free call with a program advisor</h3>
          <p>
            Check your eligibility for the {formConfig.program_name || "program"} and get fee, EMI and scholarship details.
          </p>
          {!isExpired && isClient && countdown.text ? (
            <div className="pcd">
              Admissions close in <b>{countdown.text}</b>
            </div>
          ) : null}
        </div>

        <div className="form-card">
          <LeadForm
            formId="iimr_smp_popup"
            formConfig={formConfig}
            isModal={true}
          />
        </div>
      </div>
    </div>
  );
}

