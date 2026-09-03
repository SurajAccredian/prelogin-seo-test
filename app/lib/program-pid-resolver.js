import fs from "fs";
import path from "path";

let cachedSlugToPidMap = null;
let cachedPidToSlugMap = null;

/**
 * Initializes and caches the mapping between program slugs (file names / IDs) and their DB PIDs.
 * This runs entirely on the server without modifying programs.json.
 */
function initProgramPidMaps() {
  if (cachedSlugToPidMap && cachedPidToSlugMap) {
    return { slugToPidMap: cachedSlugToPidMap, pidToSlugMap: cachedPidToSlugMap };
  }

  const slugToPidMap = {};
  const pidToSlugMap = {};

  try {
    const programsDir = path.join(process.cwd(), "app/components/Assets/programs");
    if (fs.existsSync(programsDir)) {
      const files = fs.readdirSync(programsDir);
      for (const file of files) {
        if (!file.endsWith(".json")) continue;
        const slug = file.replace(/\.json$/, "");
        const filePath = path.join(programsDir, file);
        try {
          const content = fs.readFileSync(filePath, "utf-8");
          const parsed = JSON.parse(content);
          if (parsed && parsed.pid && !isNaN(parseInt(parsed.pid, 10))) {
            const pid = parseInt(parsed.pid, 10);
            slugToPidMap[slug] = pid;
            pidToSlugMap[pid] = slug;
          }
        } catch (err) {
          console.warn(`[ProgramPidResolver] Failed to parse ${file}:`, err.message);
        }
      }
    }
  } catch (dirErr) {
    console.error("[ProgramPidResolver] Error scanning programs directory:", dirErr.message);
  }

  cachedSlugToPidMap = slugToPidMap;
  cachedPidToSlugMap = pidToSlugMap;

  console.log(
    `[ProgramPidResolver] Initialized PID mappings: ${Object.keys(slugToPidMap).length} programs mapped with PIDs.`
  );

  return { slugToPidMap, pidToSlugMap };
}

/**
 * Returns the PID for a given program slug, or null if unmapped.
 * @param {string} slug
 * @returns {number|null}
 */
export function getPidBySlug(slug) {
  if (!slug) return null;
  const { slugToPidMap } = initProgramPidMaps();
  return slugToPidMap[slug] || null;
}

/**
 * Returns the program slug for a given PID, or null if unmapped.
 * @param {number|string} pid
 * @returns {string|null}
 */
export function getSlugByPid(pid) {
  if (!pid) return null;
  const { pidToSlugMap } = initProgramPidMaps();
  return pidToSlugMap[pid] || null;
}

/**
 * Returns an array of all unique PIDs resolved from individual program JSON files.
 * @returns {number[]}
 */
export function getAllProgramPids() {
  const { slugToPidMap } = initProgramPidMaps();
  const pids = Object.values(slugToPidMap).filter((pid) => pid && !isNaN(pid));
  return [...new Set(pids)];
}

/**
 * Returns complete slug-to-pid and pid-to-slug mapping dictionaries.
 * @returns {{ slugToPid: Record<string, number>, pidToSlug: Record<number, string> }}
 */
export function getAllProgramMappings() {
  const { slugToPidMap, pidToSlugMap } = initProgramPidMaps();
  return {
    slugToPid: { ...slugToPidMap },
    pidToSlug: { ...pidToSlugMap },
  };
}
