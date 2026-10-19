/**
 * Safely merges/upserts single-course enrollment responses into the global localStorage enrollment array.
 * Matches on program_id to update existing records or append new ones without wiping other enrollments.
 */
export const mergeEnrollmentDetails = (newDetails) => {
  try {
    const existing = JSON.parse(localStorage.getItem("enrollment") || "[]");
    const existingList = Array.isArray(existing) ? existing : [];
    const incomingList = Array.isArray(newDetails) ? newDetails : (newDetails ? [newDetails] : []);

    const merged = [...existingList];
    incomingList.forEach((incoming) => {
      if (!incoming) return;
      const idx = merged.findIndex(
        (e) => Number(e.program_id) === Number(incoming.program_id)
      );
      if (idx >= 0) {
        merged[idx] = { ...merged[idx], ...incoming };
      } else {
        merged.push(incoming);
      }
    });

    localStorage.setItem("enrollment", JSON.stringify(merged));
    localStorage.setItem("enrollmentStatus", "true");
    return merged;
  } catch (err) {
    console.error("Error merging enrollment details:", err);
    if (newDetails) {
      const fallback = Array.isArray(newDetails) ? newDetails : [newDetails];
      localStorage.setItem("enrollment", JSON.stringify(fallback));
      localStorage.setItem("enrollmentStatus", "true");
      return fallback;
    }
    return [];
  }
};
