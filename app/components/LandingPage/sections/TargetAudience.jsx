"use client";

import React from "react";

function renderCardIcon(icon) {
  switch (icon) {
    case "executive":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5CFF" strokeWidth="2">
          <circle cx="12" cy="7" r="4" />
          <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
        </svg>
      );
    case "manager":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5CFF" strokeWidth="2">
          <path d="M3 3v18h18" />
          <path d="M7 14l4-4 4 4 5-6" />
        </svg>
      );
    case "director":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5CFF" strokeWidth="2">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 10h18M9 20V10" />
        </svg>
      );
    case "entrepreneur":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5CFF" strokeWidth="2">
          <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
        </svg>
      );
    case "division":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5CFF" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <circle cx="4" cy="6" r="2" />
          <circle cx="20" cy="6" r="2" />
          <circle cx="12" cy="21" r="2" />
          <path d="M6 7l4 3M18 7l-4 3M12 15v4" />
        </svg>
      );
    case "sector":
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A5CFF" strokeWidth="2">
          <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z" />
        </svg>
      );
  }
}

export default function TargetAudience({ data = {} }) {
  return (
    <section style={{ paddingTop: "24px" }}>
      <div className="wrap">
        {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
        {data.heading && <h2 className="h2">{data.heading}</h2>}
        {data.lead && <p className="lead">{data.lead}</p>}

        {data.cards && data.cards.length > 0 && (
          <div className="cards">
            {data.cards.map((card, idx) => (
              <div className="card" key={idx}>
                <div className="ic">{renderCardIcon(card.icon)}</div>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

