"use client";

import React from "react";
import Image from "next/image";

export default function CompanyLogos({ data = {} }) {
  const logos = data.logos || [];
  const baseUrl = data.base_url || "";

  if (logos.length === 0) return null;

  return (
    <div className="logo-band">
      {data.heading && (
        <div className="wrap">
          <p>{data.heading}</p>
        </div>
      )}
      <div className="marquee">
        <div className="track">
          {/* First set of logos */}
          {logos.map((logoPath, idx) => (
            <div key={`logo-set1-${idx}`} className="logo-item">
              <Image
                src={logoPath.startsWith("http") ? logoPath : `${baseUrl}${logoPath}`}
                alt="Partner company"
                width={140}
                height={32}
                className="logo-img"
                unoptimized
                priority={idx < 6}
              />
            </div>
          ))}
          {/* Duplicate second set for seamless infinite marquee loop */}
          {logos.map((logoPath, idx) => (
            <div key={`logo-set2-${idx}`} className="logo-item" aria-hidden="true">
              <Image
                src={logoPath.startsWith("http") ? logoPath : `${baseUrl}${logoPath}`}
                alt=""
                width={140}
                height={32}
                className="logo-img"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
