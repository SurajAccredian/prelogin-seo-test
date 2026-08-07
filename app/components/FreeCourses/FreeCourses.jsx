"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { freeCourseActions } from "../../store/reducers/freeCourse";
import { userActions } from "../../store/reducers/user";
import { checkFreeCourseEnrollment } from "../../services/auth.service";
import { decodeToken } from "react-jwt";

import "./FreeCourses.css";
import NotFound from "../NotFound/NotFound";
import SkeletonWL from "../Skeleton/Withoutlogin";
import Wrapper from "./wrapper";

const FreeCourses = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, state } = useSelector((state) => state.freeCourse);

  // Step 1: Load JSON course data + store metadata in sessionStorage
  useEffect(() => {
    console.log("Free Course ID:", id);
    const fetchFileData = async () => {
      try {
        dispatch(freeCourseActions.setState("pending"));
        const { default: file } = await import(`./../Assets/free-courses/${id}.json`);

        // Store course metadata for registration/enroll use
        if (typeof window !== "undefined") {
          localStorage.setItem("freeCourseCategory", file.category_id);
          localStorage.setItem("freeCourseProgram", file.program_id);
          localStorage.setItem("freeCourseBatch", file.batch_id);
          localStorage.setItem("freeCourseTitle", file.title);
        }

        dispatch(freeCourseActions.setData(file));
        dispatch(freeCourseActions.setState("success"));
      } catch (error) {
        console.error("Error loading free course file:", error);
        dispatch(freeCourseActions.setData(null));
        dispatch(freeCourseActions.setState("failed"));
      }
    };

    fetchFileData();
  }, [id, dispatch]);

  // Step 2: If the user is already logged in, check their enrollment status only.
  // We do NOT create any enrollment records on simple page view.
  useEffect(() => {
    if (!data) return; // wait for course data to load first

    const checkStatus = async () => {
      const cookieToken =
        typeof document !== "undefined"
          ? document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1")
          : "";
      const token =
        cookieToken || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
      if (!token) return; // not logged in — nothing to do here

      if (typeof window !== "undefined" && !localStorage.getItem("token")) {
        localStorage.setItem("token", token); // keep localStorage in sync for other code paths
      }

      try {
        // Mark as authenticated in Redux so Hero/Cert/Sticky checks are ready
        dispatch(userActions.setAuthenticatedState(true));

        const decoded = decodeToken(token);
        const user_id = decoded?.data?.user_id || decoded?.data?.id;
        if (!user_id) return;

        const response = await checkFreeCourseEnrollment({
          user_id,
          program_id: data.program_id,
        });

        if (response?.enrolled && response?.enrollmentDetails?.length > 0) {
          // Write to localStorage — this triggers the isEnrolled useEffects in all three CTAs
          localStorage.setItem("enrollment", JSON.stringify(response.enrollmentDetails));
          localStorage.setItem("enrollmentStatus", "true");

          // Re-dispatch authenticated so the isEnrolled useEffects re-run with fresh localStorage
          dispatch(userActions.setAuthenticatedState(true));
        }
      } catch (err) {
        console.warn("[FreeCourses] enrollment check failed:", err?.message);
      }
    };

    checkStatus();
  }, [data, dispatch]);

  return (
    <>
      {state === "pending" ? (
        <SkeletonWL />
      ) : state === "success" && data ? (
        <Wrapper data={data} />
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default FreeCourses;
