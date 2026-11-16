"use client";

import React, { useEffect, useCallback, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const emptySubscribe = () => () => {};

/**
 * Lightweight, accessible Tailwind slide-over Drawer with smooth slide animation.
 * Renders via React Portal to document.body to avoid stacking context clipping.
 * Supports anchor="left" | "right" | "top" | "bottom".
 */
export default function Drawer({
  open,
  onClose,
  children,
  anchor = "left",
  className = "",
}) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(
    (e) => {
      e?.stopPropagation?.();
      setIsClosing(true);
      setTimeout(() => {
        onClose?.(e);
        setIsClosing(false);
      }, 260);
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        handleClose(e);
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

  const anchorClasses = {
    left: "inset-y-0 left-0 h-full",
    right: "inset-y-0 right-0 h-full",
    top: "inset-x-0 top-0 w-full",
    bottom: "inset-x-0 bottom-0 w-full",
  };

  const getAnimationClass = () => {
    if (anchor === "left") {
      return isClosing ? "animate-drawer-slide-out-left" : "animate-drawer-slide-in-left";
    }
    if (anchor === "right") {
      return isClosing ? "animate-drawer-slide-out-right" : "animate-drawer-slide-in-right";
    }
    if (anchor === "top") {
      return isClosing ? "animate-drawer-slide-out-top" : "animate-drawer-slide-in-top";
    }
    if (anchor === "bottom") {
      return isClosing ? "animate-drawer-slide-out-bottom" : "animate-drawer-slide-in-bottom";
    }
    return isClosing ? "animate-drawer-slide-out-left" : "animate-drawer-slide-in-left";
  };

  const drawerContent = (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] overflow-hidden"
    >
      <style>{`
        @keyframes drawerFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes drawerFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes drawerSlideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes drawerSlideOutLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        @keyframes drawerSlideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes drawerSlideOutRight {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        @keyframes drawerSlideInTop {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        @keyframes drawerSlideOutTop {
          from { transform: translateY(0); }
          to { transform: translateY(-100%); }
        }
        @keyframes drawerSlideInBottom {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes drawerSlideOutBottom {
          from { transform: translateY(0); }
          to { transform: translateY(100%); }
        }
        .animate-drawer-fade-in {
          animation: drawerFadeIn 0.28s ease-out forwards;
        }
        .animate-drawer-fade-out {
          animation: drawerFadeOut 0.26s ease-in forwards;
        }
        .animate-drawer-slide-in-left {
          animation: drawerSlideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-drawer-slide-out-left {
          animation: drawerSlideOutLeft 0.26s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-drawer-slide-in-right {
          animation: drawerSlideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-drawer-slide-out-right {
          animation: drawerSlideOutRight 0.26s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-drawer-slide-in-top {
          animation: drawerSlideInTop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-drawer-slide-out-top {
          animation: drawerSlideOutTop 0.26s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-drawer-slide-in-bottom {
          animation: drawerSlideInBottom 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-drawer-slide-out-bottom {
          animation: drawerSlideOutBottom 0.26s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      {/* Backdrop overlay with fade animation */}
      <div
        className={`fixed inset-0 bg-black/60 ${isClosing ? "animate-drawer-fade-out" : "animate-drawer-fade-in"}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Slide-over panel with smooth cubic-bezier slide animation */}
      <div
        className={`fixed ${anchorClasses[anchor] || anchorClasses.left} z-[10000] bg-white shadow-2xl flex flex-col will-change-transform ${getAnimationClass()} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
}
