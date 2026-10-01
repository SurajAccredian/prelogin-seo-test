"use client";

import { useState, useEffect } from "react";
import { getBulkProgramRegistrationStatus } from "../services/program.service";

// In-memory module-level cache for client side to prevent duplicate API requests
let globalStatuses = null;
let inFlightPromise = null;
const listeners = new Set();

/**
 * Resolves the display status and admission closed state for a program.
 *
 * Mapping rules:
 * - DB "active"   → "New Launch" (Admission Open)
 * - DB "inactive" → "Admission Closed"
 * - Fallback (No PID or DB status not found) → Preserve static program.status from JSON
 *
 * @param {Object} program - Program object from programs.json or individual JSON
 * @param {Object} [statuses] - Status dictionary { byPid, bySlug }
 * @returns {{ status: string, isAdmissionClosed: boolean, isLive: boolean }}
 */
export function resolveProgramStatus(program, statuses = globalStatuses) {
  if (!program) {
    return { status: "New Launch", isAdmissionClosed: false, isLive: false };
  }

  const liveStatus =
    (statuses?.bySlug && program.id && statuses.bySlug[program.id]) ||
    (statuses?.byPid && program.pid && statuses.byPid[program.pid]);

  if (liveStatus === "active") {
    return {
      status: "New Launch",
      isAdmissionClosed: false,
      isLive: true,
    };
  }

  if (liveStatus === "inactive") {
    return {
      status: "Admission Closed",
      isAdmissionClosed: true,
      isLive: true,
    };
  }

  // Fallback to static JSON status
  const staticStatus = program.status || "";
  const isClosed =
    staticStatus.toLowerCase() === "admission closed" ||
    staticStatus.toLowerCase() === "admissions closed";

  return {
    status: staticStatus || "New Launch",
    isAdmissionClosed: isClosed,
    isLive: false,
  };
}

/**
 * Fetches all DB program statuses in a single bulk request via program.service.
 * Deduplicates in-flight requests and caches globally in the browser.
 */async function fetchBulkStatuses() {
  if (globalStatuses) return globalStatuses;
  if (inFlightPromise) return inFlightPromise;

  inFlightPromise = (async () => {
    try {
      const response = await getBulkProgramRegistrationStatus();
      const resData = response?.data || response || {};

      const byPid = resData.byPid || {};
      const bySlug = resData.bySlug || {};

      globalStatuses = { byPid, bySlug };
    } catch (err) {
      console.warn(
        "[useProgramStatuses] Failed to fetch bulk program statuses:",
        err.message
      );
      globalStatuses = { byPid: {}, bySlug: {} };
    } finally {
      inFlightPromise = null;
      listeners.forEach((listener) => listener(globalStatuses));
    }

    return globalStatuses;
  })();

  return inFlightPromise;
}

/**
 * React hook to retrieve bulk program registration statuses.
 * Components across the page share a single cached dataset and single fetch.
 */
export function useProgramStatuses() {
  const [statuses, setStatuses] = useState(globalStatuses);
  const [loading, setLoading] = useState(!globalStatuses);

  useEffect(() => {
    let isMounted = true;

    const listener = (newStatuses) => {
      if (isMounted) {
        setStatuses(newStatuses);
        setLoading(false);
      }
    };

    listeners.add(listener);

    if (!globalStatuses) {
      fetchBulkStatuses().then((result) => {
        if (isMounted) {
          setStatuses(result);
          setLoading(false);
        }
      });
    }

    return () => {
      isMounted = false;
      listeners.delete(listener);
    };
  }, []);

  return {
    statuses,
    loading,
    getProgramStatus: (program) => resolveProgramStatus(program, statuses),
  };
}
