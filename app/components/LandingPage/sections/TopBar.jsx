"use client";

import React from "react";
import { useLandingPage } from "../LandingPageContext";

export default function TopBar({ data = {} }) {
  const { countdown, isClient } = useLandingPage();

  if (!data?.deadline) return null;

  const isExpired = isClient && countdown.isExpired;

  return (
    <div className="topbar" id="topbar">
      {!isExpired ? (
        <span id="tb-open">
          Admissions close <b>{data.deadline_display || "Soon"}</b>
          {isClient && countdown.text ? (
            <>
              {" "}&middot; <span className="cd">{countdown.text} left</span>
            </>
          ) : null}
        </span>
      ) : (
        <span id="tb-closed">
          Next cohort starts <b>{data.next_cohort_date || "Soon"}</b> &middot; Limited seats
        </span>
      )}
    </div>
  );
}

