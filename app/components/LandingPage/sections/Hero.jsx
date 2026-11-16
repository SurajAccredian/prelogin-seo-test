"use client";

import React from "react";
import Image from "next/image";
import { useLandingPage } from "../LandingPageContext";
import LeadForm from "./LeadForm";

function renderFactIcon(iconType) {
  switch (iconType) {
    case "faculty":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5B300" strokeWidth="2">
          <path d="M22 10 12 5 2 10l10 5 10-5z" />
          <path d="M6 12v5c3 2 9 2 12 0v-5" />
        </svg>
      );
    case "campus":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5B300" strokeWidth="2">
          <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
        </svg>
      );
    case "alumni":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5B300" strokeWidth="2">
          <circle cx="12" cy="8" r="6" />
          <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
        </svg>
      );
    case "capstone":
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5B300" strokeWidth="2">
          <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2zM9 21h6" />
        </svg>
      );
  }
}

export default function Hero({ data = {}, formConfig = {} }) {
  const { urgency } = useLandingPage();

  return (
    <section className="hero">
      <div className="wrap hero-grid">
        {/* Left Column: Value Proposition & Details */}
        <div>
          {data.badge && (
            <div className="badge">
              <span className="dot" />
              {data.badge}
            </div>
          )}

          <h1>
            {data.title_primary}{" "}
            {data.title_accent && <span>{data.title_accent}</span>}
          </h1>

          {data.subtitle && <p className="sub">{data.subtitle}</p>}

          {data.facts && data.facts.length > 0 && (
            <div className="facts">
              {data.facts.map((fact, idx) => (
                <div className="fact" key={idx}>
                  {renderFactIcon(fact.icon)}
                  <div>
                    <b>{fact.title}</b>
                    <small>{fact.subtitle}</small>
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.key_dates && data.key_dates.length > 0 && (
            <div className="dates">
              {data.key_dates.map((item, idx) => {
                const isDeadline = item.label?.toLowerCase().includes("deadline");
                const displayVal = isDeadline && urgency?.deadline_display
                  ? urgency.deadline_display
                  : item.value;

                return (
                  <div key={idx}>
                    {item.label}
                    <b>{displayVal}</b>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Lead Form Card */}
        <div className="form-card" id="lead-form">
          {data.advisor && (
            <div className="fhead">
              {data.advisor.image && (
                <Image
                  src={data.advisor.image}
                  alt="Program Advisor"
                  width={60}
                  height={60}
                  unoptimized
                />
              )}
              <div>
                <h3>{data.advisor.heading || "Talk to our Advisor"}</h3>
                <p className="fsub">
                  {data.advisor.subheading || "Free 1:1 consultation on fit, curriculum, fees and EMI options."}
                </p>
              </div>
            </div>
          )}

          <LeadForm
            formId="iimr_smp_hero"
            formConfig={formConfig}
            isModal={false}
          />
        </div>
      </div>
    </section>
  );
}

