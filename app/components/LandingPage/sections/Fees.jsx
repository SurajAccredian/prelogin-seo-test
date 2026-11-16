"use client";

import React from "react";
import { useLandingPage } from "../LandingPageContext";

export default function Fees({ data = {} }) {
  const { scrollToForm } = useLandingPage();

  return (
    <section id="fees">
      <div className="wrap">
        <div>
          {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
          {data.heading && <h2 className="h2">{data.heading}</h2>}
          {data.lead && <p className="lead">{data.lead}</p>}
        </div>

        <div className="fee-grid">
          {/* Left: EMI & Total Fee (Dark Card) */}
          <div className="fee-card dark">
            <div className="lbl">EMI starting at</div>
            <div className="big">
              {data.emi_starting}{" "}
              {data.emi_suffix && <small>{data.emi_suffix}</small>}
            </div>
            <div className="total">
              Total program fee: <b>{data.total_fee}</b>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => scrollToForm("fees")}
            >
              {data.cta_text || "Talk to our Advisor"}
            </button>

            {data.disclaimer && (
              <p style={{ fontSize: "12px", marginTop: "12px", color: "#8492B0" }}>
                {data.disclaimer}
              </p>
            )}
          </div>

          {/* Right: What's Included */}
          <div className="fee-card">
            <h4>{data.included_heading || "What's included"}</h4>
            {data.inclusions && data.inclusions.length > 0 && (
              <ul className="inc">
                {data.inclusions.map((item, idx) => (
                  <li key={idx}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1A5CFF"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

