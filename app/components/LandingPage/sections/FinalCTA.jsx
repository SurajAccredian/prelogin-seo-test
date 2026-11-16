"use client";

import React from "react";
import { useLandingPage } from "../LandingPageContext";

export default function FinalCTA({ data = {} }) {
  const { scrollToForm, urgency } = useLandingPage();

  const headingText = data.heading
    ? (urgency?.deadline_display
        ? data.heading.replace(/\d{1,2}\s+[A-Za-z]{3}\s+\d{4}/, urgency.deadline_display)
        : data.heading)
    : "";

  return (
    <section className="final">
      <div className="wrap">
        {headingText && <h2 className="h2">{headingText}</h2>}
        {data.lead && <p className="lead" style={{ margin: "0 auto" }}>{data.lead}</p>}


        <div className="btns">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => scrollToForm("final")}
          >
            {data.button_text || "Talk to our Advisor"}
          </button>
        </div>
      </div>
    </section>
  );
}

