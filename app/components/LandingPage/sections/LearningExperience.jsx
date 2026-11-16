"use client";

import React from "react";
import Image from "next/image";

export default function LearningExperience({ data = {} }) {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap people">
        {/* Left Column: Stacked Images */}
        <div className="people-img">
          {data.main_image && (
            <Image
              className="pi-main"
              src={data.main_image}
              alt="Senior leaders in a strategy discussion"
              width={600}
              height={450}
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          )}
          {data.sub_image && (
            <Image
              className="pi-sub"
              src={data.sub_image}
              alt="Professionals learning together"
              width={400}
              height={300}
              sizes="(max-width: 768px) 50vw, 25vw"
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
        </div>
      </div>
    </section>
  );
}

