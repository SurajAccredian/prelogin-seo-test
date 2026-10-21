// syncPrograms.js (at repo root)
const fs = require("fs");
const path = require("path");

// Use process.cwd() → always resolves to repo root where package.json lives
const rootDir = process.cwd();

const srcFile = path.join(rootDir, "app/components/Assets/programs.json");
const individualProgramsDir = path.join(rootDir, "app/components/Assets/programs");
const publicFile = path.join(rootDir, "public/programs.json");

/**
 * Validates required_years_experience.
 * - Accepts valid non-negative integers (e.g. 0, 1, 5, 10).
 * - Converts valid numeric strings (e.g. "5", "0") to numbers.
 * - Rejects negative numbers, decimals, non-numeric strings, and other invalid values.
 */
function validateExperience(exp) {
  if (typeof exp === "number") {
    if (Number.isInteger(exp) && exp >= 0) {
      return { valid: true, value: exp };
    }
    return { valid: false, reason: "Must be a non-negative integer (no negative numbers or decimals)" };
  }
  if (typeof exp === "string") {
    const trimmed = exp.trim();
    if (/^\d+$/.test(trimmed)) {
      const num = Number(trimmed);
      if (Number.isSafeInteger(num)) {
        return { valid: true, value: num };
      }
    }
    return { valid: false, reason: "Must be a numeric string representing a non-negative integer" };
  }
  return { valid: false, reason: `Invalid type "${typeof exp}" (expected integer or numeric string)` };
}

function runSync() {
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
  const validationErrors = [];

  for (const program of programs) {
    const individualFilePath = path.join(individualProgramsDir, `${program.id}.json`);

    if (fs.existsSync(individualFilePath)) {
      try {
        const individualData = JSON.parse(fs.readFileSync(individualFilePath, "utf-8"));
        const exp = individualData.required_years_experience;

        if (exp === undefined || exp === null || (typeof exp === "string" && exp.trim() === "")) {
          validationErrors.push(
            `Program "${program.id}" in "${program.id}.json": missing "required_years_experience" (got ${JSON.stringify(exp)})`
          );
          continue;
        }

        const result = validateExperience(exp);
        if (result.valid) {
          matchedCount++;
          program.required_years_experience = result.value;
        } else {
          validationErrors.push(
            `Program "${program.id}" in "${program.id}.json": invalid "required_years_experience" value ${JSON.stringify(exp)} (${result.reason})`
          );
        }
      } catch (readErr) {
        validationErrors.push(
          `Program "${program.id}": failed to parse "${program.id}.json" (${readErr.message})`
        );
      }
    } else {
      preservedCount++;
      // Preserve existing value for programs without individual JSON (e.g. free courses)
      if (program.required_years_experience === undefined) {
        program.required_years_experience = 0;
      }
    }
  }

  if (validationErrors.length > 0) {
    console.error(`\n❌ [syncPrograms] Validation failed with ${validationErrors.length} error(s):`);
    validationErrors.forEach((err) => console.error(`  - ${err}`));
    console.error("\nAborting sync to prevent invalid data from being saved.");
    process.exit(1);
  }

  console.log(`Sync summary: ${matchedCount} matched & synced, ${preservedCount} unmatched/preserved, 0 errors.`);

  // Save updated programs.json
  fs.writeFileSync(srcFile, JSON.stringify(programs, null, 2) + "\n");
  console.log("✅ Updated app/components/Assets/programs.json with synced experience values");

  // Pick only selected fields for public/programs.json
  const filteredPrograms = programs.map(
    ({ university_name, university_image, program_name, category, start_date, status, id, pid, duration, program_fee, required_years_experience }) => {
      const isFreeCourse =
        (category && (category.toLowerCase() === "free courses" || category.toLowerCase() === "microsoft")) ||
        (id && id.startsWith("transform-"));

      const url = isFreeCourse
        ? `https://accredian.com/free-courses/${id}`
        : `https://accredian.com/programs/${id}`;

      return {
        university_name,
        university_image,
        program_name,
        category,
        start_date,
        status,
        url,
        id,
        pid,
        duration,
        program_fee,
        required_years_experience,
      };
    }
  );

  // Debug sample
  console.log("Sample filtered program:", filteredPrograms[0]);

  // Write filtered JSON to public
  fs.writeFileSync(publicFile, JSON.stringify(filteredPrograms, null, 2) + "\n");

  console.log("✅ Synced filtered programs.json to public");
}

if (require.main === module) {
  runSync();
}

module.exports = { validateExperience, runSync };
