import { readFileSync } from "fs";
import path from "path";
import { Suspense } from "react";
import Programs from "../../components/Programs/Programs";
import SkeletonWL from "../../components/Skeleton/Withoutlogin";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const filePath = path.join(
      process.cwd(),
      "app/components/Assets/programs",
      `${id}.json`
    );
    const data = JSON.parse(readFileSync(filePath, "utf8"));
    const title = `${data.title} | ${data.university_name}`;
    const description =
      data.description ||
      `Explore the ${data.title} offered by ${data.university_name} at Accredian. ${data.duration ? `${data.duration} online program.` : ""}`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: data.university_image
          ? [data.university_image]
          : data.university_logo
          ? [data.university_logo]
          : [],
      },
    };
  } catch {
    return {
      title: "Professional Certification Program",
      description:
        "Explore professional certification programs from top IITs, IIMs, and business schools at Accredian.",
    };
  }
}

import { getPidBySlug } from "../../lib/program-pid-resolver";

// ============================================================================
// CONTROLLED A/B EXPERIMENT TOGGLE
// Set to false for Variant A (Fetch Disabled), true for Variant B (Fetch Enabled)
// ============================================================================
const ENABLE_BACKEND_FETCH = true;

let requestCounter = 0;

export default async function ProgramPage({ params }) {
  const reqId = ++requestCounter;
  const startTime = performance.now();
  const { id } = await params;

  // 1. Load baseline static JSON file
  let programData = null;
  try {
    const filePath = path.join(
      process.cwd(),
      "app/components/Assets/programs",
      `${id}.json`
    );
    programData = JSON.parse(readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error(`[ProgramPage Server #${reqId}] Error reading static JSON for slug "${id}":`, err.message);
  }

  if (!programData) {
    return (
      <Suspense fallback={<SkeletonWL />}>
        <Programs />
      </Suspense>
    );
  }

  // 2. Slug -> PID Resolution
  const pid = programData.pid || getPidBySlug(id);
  const staticEnrollments = programData.enrollments;
  let usedStaticFallback = true;

  console.log(`\n======================================================`);
  console.log(`[ProgramPage Server #${reqId}] >>> Incoming Page Request: "/programs/${id}"`);
  console.log(`[ProgramPage Server #${reqId}] Slug → PID Resolution: slug="${id}" → PID=${pid ?? "N/A"}`);
  console.log(`[ProgramPage Server #${reqId}] Static JSON Fallback 'enrollments': "${staticEnrollments}"`);
  console.log(`[ProgramPage Server #${reqId}] ENABLE_BACKEND_FETCH Flag: ${ENABLE_BACKEND_FETCH}`);

  // 3. Live registration status fetch via Next.js Data Cache (if PID exists and fetch is enabled)
  if (pid && ENABLE_BACKEND_FETCH) {
    const backendUrl =
      (process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD || "http://localhost:5000"
        : "http://localhost:5000");

    const tag = `program-status-${pid}`;
    const targetUrl = `${backendUrl}/program/${pid}/registration-status`;
    console.log(`[ProgramPage Server #${reqId}] Cache Tag Used: "${tag}"`);
    console.log(`[ProgramPage Server #${reqId}] Fetching live status from: ${targetUrl}`);

    const fetchStart = performance.now();
    try {
      const response = await fetch(targetUrl, {
        next: {
          tags: [tag],
          revalidate: 3600,
        },
        signal: AbortSignal.timeout(2500),
      });

      const fetchDuration = (performance.now() - fetchStart).toFixed(2);
      console.log(`[ProgramPage Server #${reqId}] Fetch completed in ${fetchDuration}ms with HTTP ${response.status}`);

      if (response.ok) {
        const result = await response.json();
        const liveStatus = result?.data?.registration_status;
        console.log(`[ProgramPage Server #${reqId}] Backend/Cache Response: data.registration_status="${liveStatus}"`);

        if (liveStatus === "active" || liveStatus === "inactive") {
          programData.registration_status = liveStatus;
          programData.enrollments = liveStatus;
          usedStaticFallback = false;
          console.log(`[ProgramPage Server #${reqId}] Live status OVERRODE static JSON.`);
        } else {
          console.warn(`[ProgramPage Server #${reqId}] Unexpected registration_status value: "${liveStatus}". Retaining static JSON value.`);
        }
      } else {
        console.warn(`[ProgramPage Server #${reqId}] Backend returned HTTP ${response.status}. Using static JSON fallback.`);
      }
    } catch (fetchError) {
      const fetchDuration = (performance.now() - fetchStart).toFixed(2);
      console.error(`[ProgramPage Server #${reqId}] Fetch failed after ${fetchDuration}ms: ${fetchError.message}. Using static JSON fallback.`);
    }
  } else if (pid && !ENABLE_BACKEND_FETCH) {
    console.log(`[ProgramPage Server #${reqId}] [VARIANT A] Backend fetch explicitly BYPASSED via ENABLE_BACKEND_FETCH=false`);
  } else {
    console.log(`[ProgramPage Server #${reqId}] No PID mapped for slug "${id}". Using static JSON values.`);
  }

  const totalDuration = (performance.now() - startTime).toFixed(2);
  console.log(`[ProgramPage Server #${reqId}] Static Fallback Used: ${usedStaticFallback}`);
  console.log(`[ProgramPage Server #${reqId}] Final 'enrollments' value passed to Programs: "${programData.enrollments}"`);
  console.log(`[ProgramPage Server #${reqId}] Total Server Execution Time: ${totalDuration}ms`);
  console.log(`======================================================\n`);

  return (
    <Suspense fallback={<SkeletonWL />}>
      <Programs initialProgramData={programData} />
    </Suspense>
  );
}
