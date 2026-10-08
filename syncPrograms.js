// syncPrograms.js (at repo root)
const fs = require("fs");
const path = require("path");

// Use process.cwd() → always resolves to repo root where package.json lives
const rootDir = process.cwd();

const srcFile = path.join(rootDir, "app/components/Assets/programs.json");
const individualProgramsDir = path.join(rootDir, "app/components/Assets/programs");
const publicFile = path.join(rootDir, "public/programs.json");

console.log("Reading from:", srcFile);
console.log("Reading individual programs from:", individualProgramsDir);
console.log("Writing to:", publicFile);

// Load src JSON
let programs;
try {
  programs = JSON.parse(fs.readFileSync(srcFile, "utf-8"));
  console.log("Loaded programs.json successfully ✅");
} catch (err) {
  console.error("❌ Failed to parse programs.json:", err.message);
  process.exit(1);
}

// Ensure it's an array
if (!Array.isArray(programs)) {
  console.error("❌ Expected an array but got:", typeof programs, programs);
  process.exit(1);
}
console.log(`Found ${programs.length} programs in src JSON`);

// 1. Sync required_years_experience from individual JSON files
let matchedCount = 0;
let preservedCount = 0;
let missingExpCount = 0;

for (const program of programs) {
  const individualFilePath = path.join(individualProgramsDir, `${program.id}.json`);

  if (fs.existsSync(individualFilePath)) {
    try {
      const individualData = JSON.parse(fs.readFileSync(individualFilePath, "utf-8"));
      const exp = individualData.required_years_experience;

      if (exp !== undefined && exp !== null && exp !== "") {
        matchedCount++;
        const parsedExp = typeof exp === "number" ? exp : Number(exp);
        program.required_years_experience = isNaN(parsedExp) ? exp : parsedExp;
      } else {
        missingExpCount++;
        console.warn(
          `⚠️ [syncPrograms] "${program.id}.json" exists but is missing "required_years_experience". Preserving existing value (${program.required_years_experience ?? "none"}).`
        );
      }
    } catch (readErr) {
      console.error(`❌ [syncPrograms] Failed to parse "${program.id}.json":`, readErr.message);
    }
  } else {
    preservedCount++;
    // Preserve existing value for programs without individual JSON (e.g. free courses)
    if (program.required_years_experience === undefined) {
      program.required_years_experience = 0;
    }
  }
}

console.log(`Sync summary: ${matchedCount} matched & synced, ${preservedCount} unmatched/preserved, ${missingExpCount} warnings.`);

// Save updated programs.json
fs.writeFileSync(srcFile, JSON.stringify(programs, null, 2) + "\n");
console.log("✅ Updated app/components/Assets/programs.json with synced experience values");

// Pick only selected fields for public/programs.json
const filteredPrograms = programs.map(
  ({ university_name, university_image, program_name, category, start_date, status, id, pid, duration, program_fee, required_years_experience }) => ({
    university_name,
    university_image,
    program_name,
    category,
    start_date,
    status,
    url: `https://accredian.com/programs/${id}`,
    id,
    pid,
    duration,
    program_fee,
    required_years_experience,
  })
);

// Debug sample
console.log("Sample filtered program:", filteredPrograms[0]);

// Write filtered JSON to public
fs.writeFileSync(publicFile, JSON.stringify(filteredPrograms, null, 2) + "\n");

console.log("✅ Synced filtered programs.json to public");
