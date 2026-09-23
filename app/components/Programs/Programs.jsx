"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { programActions } from "../../store/reducers/program";
import axios from "axios";
import toast from "react-hot-toast";

import "./Programs.css";
import NotFound from "../NotFound/NotFound";
import GetBrochure from "../Modals/call-to-actions/get-brochure";
import EnrollNow from "../Modals/call-to-actions/enroll-now";
import SkeletonWL from "../Skeleton/Withoutlogin";
import Wrapper from "./wrapper";

const API_BASE_URL = "https://internal-dash.accredian.com/api/v1/automations/preview";

const PreviewHandler = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const isPreviewMode = searchParams.get("preview") === "true";
  const previewId = searchParams.get("previewId");

  useEffect(() => {
    if (isPreviewMode && previewId) {
      dispatch(programActions.setState("pending"));
      console.log("Fetching preview data for ID:", previewId);
      axios
        .get(`${API_BASE_URL}/${previewId}`)
        .then((response) => {
          const previewData = response.data.data;
          dispatch(programActions.setData(previewData));
          dispatch(programActions.setState("success"));
          toast.success("Preview loaded!", {
            position: "top-right",
            duration: 3000,
          });
        })
        .catch((error) => {
          dispatch(programActions.setData(null));
          dispatch(programActions.setState("failed"));
          const message = error.response?.data?.message || error.message;
          toast.error(message || "Failed to load preview. Please try again.", {
            position: "top-right",
            duration: 5000,
          });
        });
    }
  }, [isPreviewMode, previewId, dispatch]);

  if (!isPreviewMode) return null;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "linear-gradient(to right, #2563eb, #3b82f6)",
        padding: "8px 16px",
        textAlign: "center",
        color: "white",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <svg
          style={{ width: "20px", height: "20px" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <span style={{ fontSize: "14px", fontWeight: "500" }}>
          Preview Mode — This is a temporary preview and not the live program page
        </span>
      </div>
    </div>
  );
};

const Programs = ({ initialProgramData = null }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: reduxData, state: reduxState, brochureState, enrollState } = useSelector((state) => state.program);

  // Synchronously initialize Redux store on server or initial client render if needed
  if (initialProgramData && (!reduxData || reduxData.id !== initialProgramData.id)) {
    dispatch(programActions.setData(initialProgramData));
    dispatch(programActions.setState("success"));
  }

  const effectiveData = reduxData || initialProgramData;
  const effectiveState = reduxData ? reduxState : (initialProgramData ? "success" : reduxState);

  useEffect(() => {
    if (initialProgramData) {
      dispatch(programActions.setData(initialProgramData));
      dispatch(programActions.setState("success"));
      return;
    }

    if (!initialProgramData) {
      dispatch(programActions.setData(null));
      dispatch(programActions.setState("failed"));
    }
  }, [id, initialProgramData, dispatch]);

  const renderContent = () => {
    if (effectiveState === "pending" || !effectiveData) {
      return <SkeletonWL />;
    }

    if (effectiveState === "success" && effectiveData) {
      return (
        <>
          <Suspense fallback={null}>
            <PreviewHandler />
          </Suspense>
          <Wrapper data={effectiveData} />
        </>
      );
    }

    return <NotFound />;
  };

  return (
    <>
      {renderContent()}
      {brochureState && <GetBrochure open={brochureState} />}
      {enrollState && <EnrollNow open={enrollState} />}
    </>
  );
};

export default Programs;

