"use client";

import React from "react";
import { useLandingPage } from "../LandingPageContext";

export default function FinalCTA({ data = {} }) {
  const { scrollToForm } = useLandingPage();

  return (
    <section className="final">
      <div className="wrap">
        {data.heading && <h2 className="h2">{data.heading}</h2>}
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

