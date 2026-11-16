"use client";

import React from "react";
import { useLandingPage } from "../LandingPageContext";

export default function TopBar({ data = {} }) {
  const { countdown } = useLandingPage();

  if (!data?.deadline) return null;

  const isExpired = countdown.isExpired;

  return (
    <div className="topbar" id="topbar">
      {!isExpired ? (
        <span id="tb-open">
          Admissions close <b>{data.deadline_display || "Soon"}</b>
          {countdown.text ? (
            <>
              {" "}&middot;{" "}
              <span className="cd" suppressHydrationWarning>
                {countdown.text} left
              </span>
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

