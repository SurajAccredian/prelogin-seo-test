"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { programActions } from "../../store/reducers/program";
import GetBrochure from "../Modals/call-to-actions/get-brochure";
import EnrollNow from "../Modals/call-to-actions/enroll-now";

export default function ProgramClientSync({ initialProgramData }) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { brochureState, enrollState } = useSelector(
    (state) => state.program
  );

  const isPreviewMode = searchParams.get("preview") === "true";
  const previewId = searchParams.get("previewId");

  useEffect(() => {
    if (initialProgramData) {
      dispatch(programActions.setData(initialProgramData));
      dispatch(programActions.setState("success"));
    }
  }, [initialProgramData, dispatch]);

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
            <span style={{ fontSize: "14px", fontWeight: "500" }}>
              Preview Mode — Temporary Preview
            </span>
          </div>
        </div>
      )}
      {brochureState && <GetBrochure open={brochureState} />}
      {enrollState && <EnrollNow open={enrollState} />}
    </>
  );
}
