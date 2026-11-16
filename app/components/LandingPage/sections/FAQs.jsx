"use client";

import React from "react";

export default function FAQs({ data = {} }) {
  return (
    <section id="faq">
      <div className="wrap">
        <div className="center">
          {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
          {data.heading && <h2 className="h2">{data.heading}</h2>}
        </div>

        {data.items && data.items.length > 0 && (
          <div className="faq">
            {data.items.map((item, idx) => (
              <details key={idx}>
                <summary>
                  <span>{item.question}</span>
                  <svg
                    className="chev"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

