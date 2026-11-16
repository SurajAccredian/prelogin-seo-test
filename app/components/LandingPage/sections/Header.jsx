"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLandingPage } from "../LandingPageContext";

const DEFAULT_ACCREDIAN_LOGO =
  "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/logo.webp";

export default function Header({ data = {}, urgency = {} }) {
  const { countdown, scrollToForm } = useLandingPage();

  const isExpired = countdown.isExpired;

  const rawLogos = data.logos && data.logos.length > 0
    ? data.logos
    : [
        { src: DEFAULT_ACCREDIAN_LOGO, alt: "Accredian" },
        {
          src: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/IIM-Ranchi-Logo.png",
          alt: "IIM Ranchi",
        },
      ];

  const logos = rawLogos.map((logo) => {
    if (logo.src?.includes("accredainnew.webp")) {
      return { ...logo, src: DEFAULT_ACCREDIAN_LOGO };
    }
    return logo;
  });

  return (
    <header className="landing-header">
      <div className="wrap nav">
        <div className="logos">
          {logos.map((logo, idx) => {
            const isAccredian = logo.alt?.toLowerCase().includes("accredian");
            const imgElement = (
              <Image
                src={logo.src}
                alt={logo.alt || "Logo"}
                width={logo.width || 140}
                height={logo.height || 34}
                style={{ height: "34px", width: "auto", objectFit: "contain" }}
                unoptimized
                priority
              />
            );

            return (
              <React.Fragment key={idx}>
                {isAccredian ? (
                  <Link href="/" style={{ display: "inline-flex", alignItems: "center" }}>
                    {imgElement}
                  </Link>
                ) : (
                  imgElement
                )}
                {idx < logos.length - 1 && <span className="div" />}
              </React.Fragment>
            );
          })}
        </div>

        {!isExpired && (
          <div className="hurg">
            <span className="pulse" />
            <span>
              <span className="hoff">
                <span>{urgency.offer_text}</span> &middot;{" "}
              </span>
              Closes in{" "}
              <b suppressHydrationWarning>
                {countdown.text || `${countdown.days}d left`}
              </b>
            </span>
          </div>
        )}

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => scrollToForm("header")}
        >
          {data.cta_text || "Talk to our Advisor"}
        </button>
      </div>
    </header>
  );
}

