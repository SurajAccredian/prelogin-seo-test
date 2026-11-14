"use client";

import React from "react";
import Image from "next/image";
import { useLandingPage } from "../LandingPageContext";

export default function Certificate({ data = {} }) {
  const { scrollToForm } = useLandingPage();

  return (
    <section className="soft">
      <div className="wrap cert-grid">
        {/* Left Column: Certificate Preview Image */}
        <div>
          {data.image && (
            <Image
              className="cert-img"
              src={data.image}
              alt={data.heading || "Sample Certificate"}
              width={600}
              height={425}
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          )}
        </div>

        {/* Right Column: Copy & Checklist */}
        <div>
          {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
          {data.heading && <h2 className="h2">{data.heading}</h2>}
          {data.lead && <p className="lead">{data.lead}</p>}

          {data.checks && data.checks.length > 0 && (
            <ul className="checks">
              {data.checks.map((check, idx) => (
                <li key={idx}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#12A150"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => scrollToForm("certificate")}
          >
            {data.cta_text || "Talk to our Advisor"}
          </button>
        </div>
      </div>
    </section>
  );
}

