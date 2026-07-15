"use client";

import React, { useState, useEffect } from "react";
import CustomFreeCourseButton from "./CustomFreeCourseButton";

const StickyPurchase = ({ data }) => {
  const [showBottom, setShowBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBottom(true);
      } else {
        setShowBottom(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Sticky Purchase Bottom Bar */}
      <div className={`sticky-purchase-desktop-bar ${showBottom ? "show" : ""}`}>
        <div className="bar-container">
          {/* Left section: Parameters */}
          <div className="params-section">
            <div className="param-item">
              <span className="param-label">Duration</span>
              <span className="param-value">{data.duration || "9 Hours"}</span>
            </div>
            <div className="param-item border-lr">
              <span className="param-label">Delivery</span>
              <span className="param-value">{data.delivery || "Self-Paced"}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Level</span>
              <span className="param-value">{data.level || "Beginner"}</span>
            </div>
          </div>

          {/* Middle section: Badge Callout */}
          <div className="badge-callout">
            <span>✨ Earn your free Microsoft completion badge.</span>
          </div>

          {/* Right section: Partner & Button */}
          <div className="action-section">
            <div className="partner-info">
              <span className="partner-label">AUTHORIZED PARTNER</span>
              <span className="partner-value">
                <svg className="microsoft-logo" viewBox="0 0 23 23" fill="none">
                  <rect width="10.5" height="10.5" fill="#F25022"/>
                  <rect x="11.5" width="10.5" height="10.5" fill="#7FBA00"/>
                  <rect y="11.5" width="10.5" height="10.5" fill="#00A4EF"/>
                  <rect x="11.5" y="11.5" width="10.5" height="10.5" fill="#FFB900"/>
                </svg>
                Microsoft
              </span>
            </div>
            <CustomFreeCourseButton
              data={data}
              text="Start Learning Free"
              className="btn btn-primary"
            />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="sticky-purchase-mobile">
        <div className="sticky-price-block">
          <div className="price-now" style={{ fontSize: "14px" }}>
            Free to learn
          </div>
          <span className="price-label">Earn a badge</span>
        </div>
        <CustomFreeCourseButton
          data={data}
          text="Start Learning Free"
          className="btn btn-primary"
        />
      </div>
    </>
  );
};

export default StickyPurchase;
