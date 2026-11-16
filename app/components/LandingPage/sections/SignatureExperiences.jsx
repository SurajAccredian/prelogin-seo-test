"use client";

import React from "react";
import Image from "next/image";

function renderExpIcon(icon) {
  switch (icon) {
    case "capstone":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B88400" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 13l3 3 5-7" />
        </svg>
      );
    case "coaching":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B88400" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
        </svg>
      );
    case "simulation":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B88400" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      );
    case "career":
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B88400" strokeWidth="2">
          <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
  }
}

export default function SignatureExperiences({ data = {} }) {
  return (
    <section>
      <div className="wrap">
        <div>
          {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
          {data.heading && <h2 className="h2">{data.heading}</h2>}
        </div>

        <div className="exp-grid">
          {/* Main Immersion Feature */}
          {data.feature && (
            <div className="exp-feature">
              {data.feature.image && (
                <Image
                  src={data.feature.image}
                  alt={data.feature.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              )}
              <div className="txt">
                <h3>{data.feature.title}</h3>
                <p>{data.feature.description}</p>
              </div>
            </div>
          )}

          {/* List of 4 Experiences */}
          {data.list && data.list.length > 0 && (
            <div className="exp-list">
              {data.list.map((item, idx) => (
                <div className="exp-item" key={idx}>
                  <div className="ic">{renderExpIcon(item.icon)}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

