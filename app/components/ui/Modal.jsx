"use client";

import React, { useEffect, useCallback } from "react";
import { IoIosClose } from "react-icons/io";

/**
 * Lightweight, accessible Tailwind Modal replacing @mui/material/Modal and Dialog.
 * Zero external CSS-in-JS dependencies.
 */
export default function Modal({
  open,
  onClose,
  children,
  maxWidth = "max-w-4xl",
  showCloseButton = false,
  className = "",
}) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Body */}
      <div
        className={`relative z-10 w-full ${maxWidth} bg-white rounded-xl sm:rounded-2xl shadow-2xl transition-all transform duration-300 max-h-[95vh] overflow-y-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition"
          >
            <IoIosClose className="w-6 h-6" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

