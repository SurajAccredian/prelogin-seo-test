"use client";

import React, { useState, useEffect } from "react";
import { useLandingPage } from "../LandingPageContext";

export default function StickyMobileCTA({ urgency = {} }) {
  const { countdown, scrollToForm } = useLandingPage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let formVisible = false;
    const formElement = document.getElementById("lead-form");

    const updateVisibility = () => {
      const scrolled = window.scrollY > 500;
      setShow(scrolled && !formVisible);
    };

    let observer = null;
    if (formElement && "IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        formVisible = entries[0].isIntersecting;
        updateVisibility();
      });
      observer.observe(formElement);
    }

    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      if (observer && formElement) observer.unobserve(formElement);
    };
  }, []);

  const isExpired = countdown.isExpired;

  return (
    <div className={`mcta ${show ? "show" : ""}`} id="mcta">
      <div className="in">
        <div>
          <b>{urgency.offer_text_short || "Scholarships open"}</b>
          {!isExpired && countdown.text ? (
            <span className="mcd" suppressHydrationWarning>
              Closes in <b suppressHydrationWarning>{countdown.text}</b>
            </span>
          ) : null}
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => scrollToForm("sticky_mobile")}
        >
          Talk to our Advisor
        </button>
      </div>
    </div>
  );
}

