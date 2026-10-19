"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/user";
import { decodeToken } from "react-jwt";
import { useRouter } from "next/navigation";
import { Base64 } from "js-base64";
import CustomFreeCourseButton from "./CustomFreeCourseButton";

// Key used to signal "redirect to payment after login"
const PENDING_KEY = "pendingPaymentRedirect";

const Hero = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { authenticated } = useSelector((state) => state.user);
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const isMicrosoftCourse =
    data?.id === "transform-business-workflows-with-generative-ai" ||
    Boolean(data?.partner_name?.toLowerCase()?.includes("microsoft")) ||
    Boolean(data?.certification?.paid_cert);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // When the user becomes authenticated, check if we need to redirect to payment (Microsoft paid certification only)
  useEffect(() => {
    if (
      isMicrosoftCourse &&
      authenticated &&
      localStorage.getItem(PENDING_KEY) === data?.program_id?.toString()
    ) {
      localStorage.removeItem(PENDING_KEY);
      const encryptedId = Base64.encode(data.program_id.toString());
      router.push("/course/payment/" + encryptedId);
    }
  }, [authenticated, data?.program_id, isMicrosoftCourse, router]);

  // Check if user is already enrolled in paid certification (Microsoft only)
  useEffect(() => {
    if (isMicrosoftCourse && authenticated) {
      const token = localStorage.getItem("token");
      if (token && data?.program_id) {
        try {
          const decoded = decodeToken(token);
          if (decoded?.data?.user_id) {
            const BACKEND_URL =
              process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD ||
              (process.env.NODE_ENV === "production"
                ? "https://accredian-backend-v1-image-7dra35jwyq-uc.a.run.app"
                : "http://localhost:5001");
            fetch(
              `${BACKEND_URL}/api/certification-payment/check-enrollment?user_id=${decoded.data.user_id}&program_id=${data.program_id}`
            )
              .then((res) => res.json())
              .then((resData) => {
                if (resData.success && resData.isEnrolled) {
                  setIsEnrolled(true);
                }
              })
              .catch((err) => console.error("Error checking enrollment", err));
          }
        } catch (e) {
          console.error("Token decode error", e);
        }
      }
    }
  }, [authenticated, data?.program_id, isMicrosoftCourse]);

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
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <span className="partner-badge mt-4">
            {isMicrosoftCourse ? (
              <>
                <svg viewBox="0 0 21 21" width="18" height="18">
                  <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                  <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                  <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                  <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
                </svg>
                {data.partner_name || "Microsoft Official Training Partner"}
              </>
            ) : (
              data.partner_name || "By Accredian"
            )}
          </span>
          <h1>{data.title}</h1>
          {data.code ? <span className="hero-code">{data.code}</span> : null}
          <p className="hero-desc">{data.description}</p>

          <div className="meta-row">
            <div className="meta-item">
              <span className="meta-label">Duration</span>
              <span className="meta-value">{data.duration}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Level</span>
              <span className="meta-value">{data.level}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Delivery</span>
              <span className="meta-value">{data.delivery}</span>
            </div>
            {isMicrosoftCourse || data.instructor_short ? (
              <div className="meta-item">
                <span className="meta-label">Instructor</span>
                <span className="meta-value">{data.instructor_short}</span>
              </div>
            ) : (
              <>
                <div className="meta-item">
                  <span className="meta-label">Modules</span>
                  <span className="meta-value">
                    {data.modules || (data.curriculum ? `${data.curriculum.length}` : "6")}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Lessons</span>
                  <span className="meta-value">{data.lessons || "17"}</span>
                </div>
              </>
            )}
            <div className="meta-item">
              <span className="meta-label">Language</span>
              <span className="meta-value">{data.language}</span>
            </div>
          </div>

          <div className="hero-ctas">
            <CustomFreeCourseButton
              data={data}
              text="Start Learning for Free"
              subText={isMicrosoftCourse ? "Earn a badge" : "Earn a certificate"}
              className="btn btn-primary btn-twoline"
            />
            {isMicrosoftCourse && (
              isEnrolled ? (
                <button
                  className="btn btn-secondary btn-twoline"
                  disabled
                  style={{
                    background: "#F0FDF4",
                    borderColor: "#16A34A",
                    color: "#16A34A",
                    cursor: "not-allowed",
                    opacity: 1,
                  }}
                >
                  <span className="btn-title">Payment Received</span>
                  <span className="btn-sub">&#8377;{data.exam_amount} + GST</span>
                </button>
              ) : (
                <button
                  onClick={handleInterestClick}
                  className="btn btn-secondary btn-twoline"
                >
                  <span className="btn-title">Get Certified</span>
                  <span className="btn-sub">&#8377;{data.exam_amount} + GST</span>
                </button>
              )
            )}
          </div>

          <p className="cta-pricing-note">
            {isMicrosoftCourse
              ? "Free to learn. Certification is a separate, optional path — pricing details below."
              : "Certificate included on successful course completion"}
          </p>
        </div>

        <div className="hero-visual">
          <img
            src={
              data.hero_image ||
              "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/microsoft-hero-image-v3.jpg"
            }
            alt="Course Visual representation"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
