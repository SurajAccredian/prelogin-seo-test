"use client"
import { useState, useRef, useEffect } from "react";
import ChatWidget from "./ChatWidget";

export default function FloatingChatWidget({ isOpen = false, setIsChatBotOpen }) {
  const chatRef = useRef(null);
  const containerRef = useRef(null);

  /* 🔥 CLOSE ON OUTSIDE CLICK */
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsChatBotOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsChatBotOpen]);

  /* 🔥 BODY SCROLL LOCK ON MOBILE */
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [isOpen]);

  /* 🔥 MOBILE KEYBOARD HEIGHT FIX (VISUAL VIEWPORT) */
  useEffect(() => {
    if (isOpen && window.visualViewport && window.innerWidth < 640) {
      const handleResize = () => {
        if (containerRef.current) {
          containerRef.current.style.height = `${window.visualViewport.height}px`;
          containerRef.current.style.top = `${window.visualViewport.offsetTop}px`;
          containerRef.current.style.left = `${window.visualViewport.offsetLeft}px`;
        }
      };

      window.visualViewport.addEventListener("resize", handleResize);
      window.visualViewport.addEventListener("scroll", handleResize);
      handleResize(); // Initial call

      return () => {
        window.visualViewport.removeEventListener("resize", handleResize);
        window.visualViewport.removeEventListener("scroll", handleResize);
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Action Button */}
      {/* {!open && (
        <button
          onMouseDown={(e) => {
            e.stopPropagation(); // 🔑 prevents instant close
            setOpen(true);
          }}
          aria-label="Open chat"
          className="fixed bottom-6 right-6 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white border-none text-[26px] cursor-pointer shadow-[0_10px_25px_rgba(37,99,235,0.45)] z-[9999] hover:scale-105 transition-transform"
        >
          💬
        </button> */}
      {/* )} */}

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={containerRef}
          onMouseDown={(e) => e.stopPropagation()}
          className="fixed z-[99999999] inset-0 h-[100dvh] bg-white flex flex-col overflow-hidden sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[70vh] sm:rounded-[14px] shadow-2xl"
        >
          {/* HEADER */}
          <div style={styles.header}>
            <div style={styles.headerContent}>
              {/* Logo */}
              <div style={styles.logoContainer}>
                <img
                  src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/logo.webp"
                  alt="Accredian"
                  style={styles.logo}
                />
              </div>

              {/* Title and Subtitle */}
              <div style={styles.headerText}>
                <div style={styles.title}>Accredian</div>
                <div style={styles.subtitle}>
                  We are here to help you!
                </div>
              </div>
            </div>

            <div style={styles.headerActions}>
              {/* 🔁 Refresh Chat */}
              <button
                style={styles.iconBtn}
                title="Refresh chat"
                onClick={() => chatRef.current?.resetChat()}
              >
                ↻
              </button>

              {/* ❌ Close Chat */}
              <button
                style={styles.iconBtn}
                title="Close chat"
                onClick={() => setIsChatBotOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>

          {/* CHAT BODY */}
          <ChatWidget ref={chatRef} />
        </div>
      )}
    </>
  );
}

/* ================= STYLES ================= */

const styles = {
  header: {
    background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
    color: "#fff",
    padding: "16px 18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 0,
  },

  headerContent: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flex: 1,
  },

  logoContainer: {
    width: "40px",
    height: "40px",
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px",
    flexShrink: 0,
  },

  logo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.3,
    marginBottom: "4px",
  },

  subtitle: {
    fontSize: 12,
    opacity: 0.9,
    lineHeight: 1.4,
    fontWeight: 400,
  },

  headerActions: {
    display: "flex",
    gap: 8,
  },

  iconBtn: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    color: "#fff",
    width: 30,
    height: 30,
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
