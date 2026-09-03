// syncPrograms.js (at repo root)
const fs = require("fs");
const path = require("path");

// Use process.cwd() → always resolves to repo root where package.json lives
const rootDir = process.cwd();

const srcFile = path.join(rootDir, "app/components/Assets/programs.json");
const publicFile = path.join(rootDir, "public/programs.json");

console.log("Reading from:", srcFile);
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

// Pick only selected fields
const filteredPrograms = programs.map(
  ({ university_name, university_image, program_name, category, start_date, status, id, pid, duration, program_fee }) => ({
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
  })
);

// Debug sample
console.log("Sample filtered program:", filteredPrograms[0]);

// Write filtered JSON to public
fs.writeFileSync(publicFile, JSON.stringify(filteredPrograms, null, 2));

console.log("✅ Synced filtered programs.json to public");
