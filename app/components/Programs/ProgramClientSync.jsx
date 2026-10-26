"use client";

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { programActions } from "../../store/reducers/program";
import { userActions } from "../../store/reducers/user";
import universityUrls from "../Assets/category-urls.json";
import { useProgramStatuses } from "../../helpers/useProgramStatuses";
import GetBrochure from "../Modals/call-to-actions/get-brochure";
import EnrollNow from "../Modals/call-to-actions/enroll-now";
import {
  ENCODED_ACTIONS,
  decodeAction,
  buildModalUrl,
} from "../../helpers/modalUrl.helpers";

export { ENCODED_ACTIONS, decodeAction, buildModalUrl };

function ProgramClientSyncInner({ initialProgramData }) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { brochureState, enrollState } = useSelector((state) => state.program);
  const { authType, openLoginDrawerState } = useSelector((state) => state.user);

  // Live registration status from bulk/registration-status API
  const { getProgramStatus, loading: statusLoading } = useProgramStatuses();

  const isPreviewMode = searchParams.get("preview") === "true";
  const previewId = searchParams.get("previewId");

  const lastHandledParamRef = useRef(null);
  const wasModalOpenRef = useRef(false);

  // ─────────────────────────────────────────────────────────────
  // Phase A: Initial Program Data Sync to Redux
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (initialProgramData) {
      dispatch(programActions.setData(initialProgramData));
      dispatch(programActions.setState("success"));
    }
  }, [initialProgramData, dispatch]);

  // ─────────────────────────────────────────────────────────────
  // Phase B: Inbound Shared URL Handling (URL → Redux) (Items 4 & 5)
  // Idempotently opens modal once DB status is ready
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!initialProgramData) return;

    const rawModalParam =
      searchParams?.get("modal") ||
      searchParams?.get("action") ||
      (typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("modal") ||
          new URLSearchParams(window.location.search).get("action")
        : null);

    if (!rawModalParam) {
      lastHandledParamRef.current = null;
      return;
    }

    if (lastHandledParamRef.current === rawModalParam) {
      return; // Already processed this parameter
    }

    const action = decodeAction(rawModalParam);
    if (!action) return;

    // Gate on DB status readiness
    const hasStatus = !statusLoading || initialProgramData?.registration_status;
    if (!hasStatus) return;

    lastHandledParamRef.current = rawModalParam;

    // Verify live DB admission status via bulk/registration-status
    const liveStatus = getProgramStatus(initialProgramData);
    const isAdmissionClosed =
      liveStatus?.isAdmissionClosed ||
      initialProgramData?.registration_status === "inactive";

    if (isAdmissionClosed) {
      // If admission is closed, clean the modal parameter from the URL
      if (typeof window !== "undefined") {
        const cleanUrl = buildModalUrl(
          window.location.pathname,
          window.location.search,
          null
        );
        window.history.replaceState({}, "", cleanUrl);
      }
      return;
    }

    // Trigger relevant modal using existing Redux logic
    if (action === "brochure") {
      dispatch(programActions.setBrochureState(initialProgramData));
    } else if (action === "enroll") {
      if (initialProgramData?.external_enroll) {
        window.open(initialProgramData.external_enroll, "_blank");
      } else {
        const dataCategory = initialProgramData.category;
        const intCategory = parseInt(dataCategory, 10);
        const url = universityUrls[intCategory] || universityUrls[dataCategory];

        dispatch(userActions.setRedirectUrl(url));
        dispatch(userActions.setLoginOpenFromProgramPage(intCategory));

        const isMobile =
          typeof window !== "undefined" && window.innerWidth <= 768;
        if (isMobile) {
          dispatch(userActions.setDrawerState(true));
        } else {
          dispatch(userActions.openLoginModal("login"));
        }
      }
    }
  }, [initialProgramData, statusLoading, getProgramStatus, searchParams, dispatch]);

  // ─────────────────────────────────────────────────────────────
  // Phase C: Outbound Address-Bar Sync (Redux → URL) (Items 2, 3 & 6)
  // Preserves existing query params when updating the URL
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isBrochureOpen = Boolean(brochureState);
    const isLoginOpen =
      (authType !== null && authType !== "loginsuccess") ||
      Boolean(openLoginDrawerState);

    const activeAction = isBrochureOpen
      ? "brochure"
      : isLoginOpen
      ? "enroll"
      : null;

    if (activeAction) {
      wasModalOpenRef.current = true;
      const targetUrl = buildModalUrl(
        window.location.pathname,
        window.location.search,
        activeAction
      );
      const currentUrl = `${window.location.pathname}${window.location.search}`;

      if (targetUrl !== currentUrl) {
        window.history.pushState({ modal: activeAction }, "", targetUrl);
      }
    } else {
      // Only clean URL if a modal was previously opened and has now closed
      if (wasModalOpenRef.current) {
        wasModalOpenRef.current = false;
        const cleanUrl = buildModalUrl(
          window.location.pathname,
          window.location.search,
          null
        );
        window.history.replaceState({}, "", cleanUrl);
      }
    }
  }, [brochureState, authType, openLoginDrawerState]);

  // ─────────────────────────────────────────────────────────────
  // Phase D: Popstate Recovery (Browser Navigation → Redux)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      const search = window.location.search;
      if (!search.includes("modal=") && !search.includes("action=")) {
        dispatch(programActions.setBrochureState(null));
        dispatch(userActions.openLoginModal(null));
        dispatch(userActions.setDrawerState(false));
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [dispatch]);

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

export default function ProgramClientSync(props) {
  return (
    <React.Suspense fallback={null}>
      <ProgramClientSyncInner {...props} />
    </React.Suspense>
  );
}
