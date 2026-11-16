"use client";

import React from "react";

export default function AdmissionProcess({ data = {} }) {
  return (
    <section className="soft">
      <div className="wrap">
        {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
        {data.heading && <h2 className="h2">{data.heading}</h2>}

        {data.steps && data.steps.length > 0 && (
          <div className="steps">
            {data.steps.map((step, idx) => (
              <div className="step" key={idx}>
                <div className="n">{step.step}</div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

