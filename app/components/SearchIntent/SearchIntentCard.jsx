"use client";
import React from "react";
import Program from "../Home/SearchedPage/Program";

export default function SearchIntentCard({
  program,
  isShortlisted = false,
  onToggleShortlist,
  onOpenBrochure,
  setBrotureDownloadInfo,
  setOpen,
  getProgramStatus,
  ...rest
}) {
  return (
    <Program
      program={program}
      setBrotureDownloadInfo={setBrotureDownloadInfo || onOpenBrochure}
      setOpen={setOpen}
      getProgramStatus={getProgramStatus}
    />
  );
}
