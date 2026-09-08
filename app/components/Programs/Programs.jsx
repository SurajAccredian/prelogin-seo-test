"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
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

const Programs = ({ initialProgramData = null }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const { data, state, brochureState, enrollState } = useSelector((state) => state.program);

  const isPreviewMode = searchParams.get("preview") === "true";
  const previewId = searchParams.get("previewId");

  console.log(`[Programs] RENDER — state="${state}", hasData=${Boolean(data)}`);

  useEffect(() => {
    console.log(
      `[Programs] EFFECT ENTER: id="${id}", isPreviewMode=${isPreviewMode}, previewId="${previewId || 'none'}", hasInitialData=${Boolean(initialProgramData)}, reduxState="${state}", hasData=${Boolean(data)}`
    );

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

          const status = error.response?.status;
          const message = error.response?.data?.message || error.message;

          if (status === 410) {
            toast.error("Preview has expired. Please generate a new preview.", {
              position: "top-right",
              duration: 5000,
            });
          } else if (status === 404) {
            toast.error("Preview not found. This preview may have been deleted.", {
              position: "top-right",
              duration: 5000,
            });
          } else {
            toast.error(message || "Failed to load preview. Please try again.", {
              position: "top-right",
              duration: 5000,
            });
          }
        });

      console.log(`[Programs] EFFECT EXIT — preview`);
      return;
    }

    if (initialProgramData) {
      console.log(
        `[Programs Client] Initializing Redux store with server program data: slug="${initialProgramData.id}", enrollments="${initialProgramData.enrollments}", registration_status="${initialProgramData.registration_status || 'N/A'}"`
      );
      dispatch(programActions.setData(initialProgramData));
      dispatch(programActions.setState("success"));
      console.log(`[Programs] EFFECT EXIT — initialProgramData`);
      return;
    }

    // Invalid slug or missing data outside preview mode -> trigger NotFound
    dispatch(programActions.setData(null));
    dispatch(programActions.setState("failed"));
    console.log(`[Programs] EFFECT EXIT — invalid/no data`);
  }, [id, isPreviewMode, previewId, initialProgramData, dispatch]);

  const renderContent = () => {
    if (state === "pending" || !data) {
      console.log(`[Programs] RENDERING Skeleton (state="${state}", hasData=${Boolean(data)})`);
      return <SkeletonWL />;
    }

    if (state === "success" && data) {
      console.log(`[Programs] RENDERING Wrapper (slug="${data.id}", enrollments="${data.enrollments}")`);
      return (
        <>
          {isPreviewMode && (
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
          )}
          <Wrapper data={data} />
        </>
      );
    }

    console.log(`[Programs] RENDERING NotFound (state="${state}", hasData=${Boolean(data)})`);
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
