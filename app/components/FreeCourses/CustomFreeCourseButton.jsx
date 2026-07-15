"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/user";
import { enrollFreeCourseUser, fetchThinkificUrl } from "../../services/auth.service";
import { decodeToken } from "react-jwt";
import toast from "react-hot-toast";

const CustomFreeCourseButton = ({ data, text, subText, className }) => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.user);
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleThinkificRedirect = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Session expired. Please sign in again.", { position: "top-right" });
        return;
      }
      const decoded = decodeToken(token);
      const email = decoded?.data?.email;
      const firstname = decoded?.data?.firstname;
      const lastname = decoded?.data?.userlastname || decoded?.data?.lastname || "";

      if (!email || !firstname) {
        toast.error("User profile details are missing. Please refresh the page and try again.", { position: "top-right" });
        return;
      }

      const url = await fetchThinkificUrl({ email, firstname, lastname });
      if (url) {
        window.open(url, "_blank");
        window.location.reload();
      } else {
        toast.error("Unable to generate course redirect URL. Please try again.", { position: "top-right" });
      }
    } catch (err) {
      console.error("Failed to fetch Thinkific redirect URL:", err);
      toast.error("Failed to connect to course portal. Please try again.", { position: "top-right" });
    }
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const handleClick = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (isEnrolled) {
      setLoading(true);
      await handleThinkificRedirect();
      setLoading(false);
    } else if (authenticated) {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Session expired. Please sign in again.", { position: "top-right" });
          setLoading(false);
          return;
        }

        const decoded = decodeToken(token);
        const user_id = decoded?.data?.user_id || decoded?.data?.id;
        const firstname = decoded?.data?.firstname || 'Learner';
        const lastname = decoded?.data?.userlastname || decoded?.data?.lastname || '';
        const email = decoded?.data?.email;

        if (!user_id || !email) {
          toast.error("Invalid user profile details. Please sign in again.", { position: "top-right" });
          setLoading(false);
          return;
        }

        const response = await enrollFreeCourseUser({
          user_id,
          firstname,
          lastname,
          email,
          program_id: data.program_id,
          category_id: data.category_id,
          batch_id: data.batch_id,
          course_name: data.title,
          dashboard_link: process.env.NEXT_PUBLIC_DASHBOARD_BASE_URL || "https://accredian.com",
        });

        if (response?.enrollmentDetails?.length > 0) {
          localStorage.setItem("enrollment", JSON.stringify(response.enrollmentDetails));
          localStorage.setItem("enrollmentStatus", "true");
          setIsEnrolled(true);
          toast.success("Successfully enrolled in the course!", { position: "top-right" });
          await handleThinkificRedirect();
        }
      } catch (err) {
        toast.error("Failed to enroll. Please try again.", { position: "top-right" });
      } finally {
        setLoading(false);
      }
    } else {
      // Set the free course redux flag when opening the modal/drawer
      dispatch(userActions.setLoginOpenFromFreeProgramPage({ isFreeCourse: true, program_id: data.program_id }));
      if (width <= 768) {
        dispatch(userActions.setDrawerState(true));
      } else {
        dispatch(userActions.openLoginModal("login"));
      }
    }
  };

  return (
    <button onClick={handleClick} className={className} disabled={loading} style={loading ? { opacity: 0.8, cursor: "not-allowed" } : {}}>
      <span className="btn-title" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        {loading && (
          <svg style={{ width: "16px", height: "16px", animation: "spin 1s linear infinite" }} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }}></circle>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" style={{ opacity: 0.75 }}></path>
          </svg>
        )}
        {loading ? "Processing..." : isEnrolled ? "Continue to Dashboard" : text}
      </span>
      {subText && !loading && (
        <span className="btn-sub">
          {isEnrolled ? "Go to your course" : subText}
        </span>
      )}
    </button>
  );
};

export default CustomFreeCourseButton;
