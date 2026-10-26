"use client";

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { programActions } from "../../store/reducers/program";
import { userActions } from "../../store/reducers/user";
import universityUrls from "../Assets/category-urls.json";
import { allowedIds } from "../Assets/constants";
import { useProgramStatuses } from "../../helpers/useProgramStatuses";
import GetBrochure from "../Modals/call-to-actions/get-brochure";
import EnrollNow from "../Modals/call-to-actions/enroll-now";

// Base64 encoding constants for the modal actions
const ENCODED_ACTIONS = {
  brochure: "YnJvY2h1cmU=",
  enroll: "ZW5yb2xs",
};

/**
 * Decodes the raw action value from URL (supporting Base64 or plain string fallback)
 */
function decodeAction(param) {
  if (!param) return null;
  const clean = decodeURIComponent(String(param)).trim();

  // Plain-text fallback
  if (clean.toLowerCase() === "brochure" || clean.toLowerCase() === "enroll") {
    return clean.toLowerCase();
  }

  // Base64 decode
  try {
    let base64 = clean;
    const remainder = base64.length % 4;
    if (remainder > 0) {
      base64 += "=".repeat(4 - remainder);
    }
    const decoded = (
      typeof atob === "function"
        ? atob(base64)
        : Buffer.from(base64, "base64").toString("utf-8")
    )
      .trim()
      .toLowerCase();

    if (decoded === "brochure" || decoded === "enroll") {
      return decoded;
    }
  } catch {
    // Ignore invalid base64
  }

  return null;
}

function ProgramClientSyncInner({ initialProgramData }) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { brochureState, enrollState } = useSelector((state) => state.program);
  const { authType, openLoginDrawerState } = useSelector((state) => state.user);

  // Live registration status from bulk/registration-status API
  const { getProgramStatus, loading: statusLoading } = useProgramStatuses();

  const isPreviewMode = searchParams.get("preview") === "true";
  const previewId = searchParams.get("previewId");

  const hasHandledInitialActionRef = useRef(false);
  const wasModalOpenRef = useRef(false);

  // 1. Initial Program Data Sync to Redux
  useEffect(() => {
    if (initialProgramData) {
      dispatch(programActions.setData(initialProgramData));
      dispatch(programActions.setState("success"));
    }
  }, [initialProgramData, dispatch]);

  // 2. Inbound Shared URL Handling (Decode Base64 action + verify live DB registration status)
  useEffect(() => {
    if (!initialProgramData || hasHandledInitialActionRef.current) {
      return;
    }

    const rawModalParam =
      searchParams?.get("modal") ||
      searchParams?.get("action") ||
      (typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("modal") ||
          new URLSearchParams(window.location.search).get("action")
        : null);

    if (!rawModalParam) return;

    const action = decodeAction(rawModalParam);
    if (!action) return;

    // Wait until live DB registration status is ready
    const hasStatus = !statusLoading || initialProgramData?.registration_status;
    if (!hasStatus) return;

    hasHandledInitialActionRef.current = true;

    // Verify live DB admission status via bulk/registration-status API
    const liveStatus = getProgramStatus(initialProgramData);
    const isAdmissionClosed =
      liveStatus?.isAdmissionClosed ||
      initialProgramData?.registration_status === "inactive" ||
      allowedIds.includes(initialProgramData?.id);

    if (isAdmissionClosed) {
      // Do not open modal if admission is closed; clean the URL
      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", window.location.pathname);
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

  // 3. Address-Bar Sync (Clicking Get Brochure or Enroll Now updates the URL; closing restores it)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentSearch = window.location.search;
    const isBrochureOpen = Boolean(brochureState);
    const isLoginOpen =
      (authType !== null && authType !== "loginsuccess") ||
      Boolean(openLoginDrawerState);

    if (isBrochureOpen) {
      wasModalOpenRef.current = true;
      const targetQuery = `?modal=${ENCODED_ACTIONS.brochure}`;
      if (currentSearch !== targetQuery) {
        window.history.pushState(
          { modal: "brochure" },
          "",
          `${window.location.pathname}${targetQuery}`
        );
      }
    } else if (isLoginOpen) {
      wasModalOpenRef.current = true;
      const targetQuery = `?modal=${ENCODED_ACTIONS.enroll}`;
      if (currentSearch !== targetQuery) {
        window.history.pushState(
          { modal: "enroll" },
          "",
          `${window.location.pathname}${targetQuery}`
        );
      }
    } else {
      // Only restore normal URL if a modal was previously open and has now closed
      if (wasModalOpenRef.current) {
        wasModalOpenRef.current = false;
        if (
          currentSearch.includes("modal=") ||
          currentSearch.includes("action=")
        ) {
          window.history.replaceState({}, "", window.location.pathname);
        }
      }
    }
  }, [brochureState, authType, openLoginDrawerState]);

  // 4. Popstate handler for Browser Back/Forward navigation
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
