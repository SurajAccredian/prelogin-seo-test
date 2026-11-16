"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const LandingPageContext = createContext(null);

export function getCountdownData(deadline) {
  if (!deadline) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: false,
      text: "",
    };
  }

  const targetDate = new Date(deadline).getTime();
  if (isNaN(targetDate)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: false,
      text: "",
    };
  }

  const now = Date.now();
  const distance = targetDate - now;

  if (distance <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
      text: "",
    };
  }

  const p = (n) => String(n).padStart(2, "0");
  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    days: d,
    hours: h,
    minutes: m,
    seconds: s,
    isExpired: false,
    text: `${d}d ${p(h)}h ${p(m)}m ${p(s)}s`,
  };
}

export function LandingPageProvider({ children, urgency = {}, formConfig = {}, programName = "" }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anyFormStarted, setAnyFormStarted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Countdown timer state initialized synchronously to prevent hydration layout flashes
  const [countdown, setCountdown] = useState(() => getCountdownData(urgency?.deadline));

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Live countdown timer calculation
  useEffect(() => {
    if (!urgency?.deadline) return;

    const updateTimer = () => {
      setCountdown(getCountdownData(urgency.deadline));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [urgency?.deadline]);

  // Shared CTA scroll & focus function
  const scrollToForm = useCallback((ctaLocation = "unknown") => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "cta_click",
        cta_location: ctaLocation,
      });

      const el = document.getElementById("lead-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          const input = document.getElementById("f-name");
          if (input && !sessionStorage.getItem("lead_submitted")) {
            input.focus({ preventScroll: true });
          }
        }, 600);
      }
    }
  }, []);

  // Modal handlers
  const openModal = useCallback((trigger = "click") => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("lead_submitted") === "1") return;
      setIsModalOpen(true);
      document.body.style.overflow = "hidden";
      sessionStorage.setItem("popup_shown", "1");

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "popup_view",
        popup_trigger: trigger,
      });
    }
  }, []);

  const closeModal = useCallback(() => {
    if (typeof window !== "undefined") {
      setIsModalOpen(false);
      document.body.style.overflow = "";

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "popup_close",
      });
    }
  }, []);

  // Timed popup auto-trigger (defaults to 10s if user hasn't submitted and hasn't started filling hero form)
  useEffect(() => {
    if (!isClient) return;
    const delay = urgency?.popup_delay_ms || 10000;

    const timer = setTimeout(() => {
      try {
        if (!sessionStorage.getItem("popup_shown") && !anyFormStarted && !isSubmitted) {
          openModal("timer");
        }
      } catch {
        // Ignore
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isClient, anyFormStarted, isSubmitted, urgency?.popup_delay_ms, openModal]);

  return (
    <LandingPageContext.Provider
      value={{
        isSubmitted,
        setIsSubmitted,
        isModalOpen,
        openModal,
        closeModal,
        anyFormStarted,
        setAnyFormStarted,
        scrollToForm,
        countdown,
        isClient,
        urgency,
        formConfig,
        programName,
      }}
    >
      {children}
    </LandingPageContext.Provider>
  );
}

export const useLandingPage = () => {
  const context = useContext(LandingPageContext);
  if (!context) {
    throw new Error("useLandingPage must be used within a LandingPageProvider");
  }
  return context;
};

