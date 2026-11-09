"use client";

import React from "react";

export default function CompanyLogos({ data = {} }) {
  const logos = data.logos || [];
  const baseUrl = data.base_url || "";

  if (logos.length === 0) return null;

  // Duplicate the array once for seamless infinite scrolling
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="logo-band">
      {data.heading && (
        <div className="wrap">
          <p>{data.heading}</p>
        </div>
      )}
      <div className="marquee">
        <div className="track">
          {duplicatedLogos.map((logoPath, idx) => (
            <img
              key={idx}
              src={logoPath.startsWith("http") ? logoPath : `${baseUrl}${logoPath}`}
              alt=""
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

