"use client";
import { useEffect } from "react";

// Slides the main site header off-screen once the reader scrolls, so only the sticky blog nav remains.
// The header is translated (not removed) so layout height is unchanged and scrolling doesn't jump.
// Hide/show thresholds differ to avoid flicker near the boundary.
export default function HideMainHeader() {
  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 80) root.setAttribute("data-blog-scrolled", "");
      else if (y < 20) root.removeAttribute("data-blog-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      root.removeAttribute("data-blog-scrolled");
    };
  }, []);

  return null;
}
