"use client";

import React from "react";
import { Loader2 } from "lucide-react";

const BlackoutLoader = ({ open, message }) => {
  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="w-full flex flex-col items-center gap-4 font-circular text-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#1A73E8]" />
        {message && <h2 className="text-xl font-medium">{message}</h2>}
      </div>
    </div>
  );
};

export default BlackoutLoader;
