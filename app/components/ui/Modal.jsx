"use client";

import React, { useEffect, useCallback, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { IoIosClose } from "react-icons/io";

const emptySubscribe = () => () => {};

/**
 * Lightweight, accessible Tailwind Modal with smooth fade and zoom animation.
 * Renders via React Portal to document.body.
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
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
      setIsClosing(false);
    }, 220);
  }, [onClose]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
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

  if (!open || !isClient) return null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes modalScaleOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.95); }
        }
        .animate-modal-fade-in {
          animation: modalFadeIn 0.24s ease-out forwards;
        }
        .animate-modal-fade-out {
          animation: modalFadeOut 0.2s ease-in forwards;
        }
        .animate-modal-scale-in {
          animation: modalScaleIn 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-modal-scale-out {
          animation: modalScaleOut 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 ${isClosing ? "animate-modal-fade-out" : "animate-modal-fade-in"}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Body */}
      <div
        className={`relative z-10 w-full ${maxWidth} bg-white rounded-xl sm:rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto will-change-transform ${isClosing ? "animate-modal-scale-out" : "animate-modal-scale-in"} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={handleClose}
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

  return createPortal(modalContent, document.body);
}
