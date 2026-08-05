"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/user";
import { useRouter } from "next/navigation";
import { Base64 } from "js-base64";
import CustomFreeCourseButton from "./CustomFreeCourseButton";

const PENDING_KEY = "pendingPaymentRedirect";

const StickyPurchase = ({ data }) => {
  const [showBottom, setShowBottom] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { authenticated } = useSelector((state) => state.user);
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBottom(true);
      } else {
        setShowBottom(false);
      }
    };
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (authenticated) {
      try {
        const enrollments = JSON.parse(localStorage.getItem("enrollment") || "[]");
        const enrolled = enrollments.some(
          (e) => Number(e.program_id) === Number(data.program_id)
        );
        setIsEnrolled(enrolled);
      } catch (err) {
        console.error("Error parsing enrollment details:", err);
      }
    } else {
      setIsEnrolled(false);
    }
  }, [authenticated, data.program_id]);

  const handleInterestClick = (e) => {
    e.preventDefault();
    if (!authenticated) {
      if (width <= 768) {
        dispatch(userActions.setDrawerState(true));
      } else {
        dispatch(userActions.openLoginModal("login"));
      }
      localStorage.setItem(PENDING_KEY, data.program_id.toString());
      return;
    }
    const encryptedId = Base64.encode(data.program_id.toString());
    router.push("/course/payment/" + encryptedId);
  };

  return (
    <>
      {/* Desktop Sticky Purchase Floating Card */}
      <div 
        className="sticky-purchase-floating-card" 
        style={{ 
          opacity: showBottom ? 1 : 0, 
          transition: 'opacity 0.3s ease', 
          pointerEvents: showBottom ? 'auto' : 'none' 
        }}
      >
        <h4>{data.title}</h4>
        <div>
          <div className="price-label" style={{ marginBottom: "2px" }}>Free to learn</div>
          <div className="price-now" style={{ fontSize: "16px", fontWeight: "700" }}>
            Certify for &#8377;{data.exam_amount} <span style={{ fontSize: "12px", color: "var(--accredian-text-muted)", fontWeight: "400" }}>+ GST</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <CustomFreeCourseButton
            data={data}
            text="Start Learning Free"
            className="btn btn-primary"
          />
          {isEnrolled ? (
            <button className="btn btn-secondary" disabled style={{ opacity: 0.7, cursor: "not-allowed", border: "1px solid var(--accredian-border)", background: "#fff", color: "#1f2937" }}>
              You are enrolled
            </button>
          ) : (
            <button onClick={handleInterestClick} className="btn btn-secondary" style={{ border: "1px solid var(--accredian-border)", background: "#fff", color: "#1f2937" }}>
              Get Certified
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="sticky-purchase-mobile" style={{ transform: showBottom ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s ease' }}>
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
