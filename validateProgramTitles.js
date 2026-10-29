// validateProgramTitles.js
const fs = require("fs");
const path = require("path");

const rootDir = process.cwd();
const srcProgramsJson = path.join(rootDir, "app/components/Assets/programs.json");
const individualProgramsDir = path.join(rootDir, "app/components/Assets/programs");

// Standard minor words in Title Case that may be in lowercase (unless first or last word)
const MINOR_WORDS = new Set([
  "a", "and", "&", "for", "from", "in", "into", "with",
]);

/**
 * Validates whether a single word in a title follows Title Case.
 * @param {string} rawWord - The word token (e.g. "Program", "in", "AI", "Post-Graduate")
 * @param {boolean} isFirst - Is this the first word of the title or clause
 * @param {boolean} isLast - Is this the last word of the title
 * @returns {null | string} - Reason for failure, or null if valid
 */
function validateWord(rawWord, isFirst, isLast) {
  // Strip outer punctuation like quotes, parentheses, brackets, colons, commas
  const cleaned = rawWord.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
  if (!cleaned) return null; // Only punctuation/symbols (e.g. "&", "–", "-")

  // If it's a number (e.g. "10", "3"), ignore
  if (/^\d+$/.test(cleaned)) return null;

  // If hyphenated or slashed (e.g. "Data-Driven", "AI/ML", "E&ICT"), check each sub-part
  if (cleaned.includes("-") || cleaned.includes("/")) {
    const subParts = cleaned.split(/[-/]/);
    for (let i = 0; i < subParts.length; i++) {
      const part = subParts[i];
      if (!part || /^\d+$/.test(part)) continue;
      const partIsFirst = isFirst && i === 0;
      const partIsLast = isLast && i === subParts.length - 1;
      const subErr = validateWord(part, partIsFirst, partIsLast);
      if (subErr) return subErr;
    }
    return null;
  }

  const lower = cleaned.toLowerCase();

  // First and last words must ALWAYS start with an uppercase letter
  if (isFirst || isLast) {
    if (!/^[A-Z]/.test(cleaned)) {
      return `Word "${cleaned}" must start with a capital letter (position: ${isFirst ? "first word" : "last word"})`;
    }
    return null;
  }

  // If it's an allowed minor word, it can be lowercase OR capitalized
  if (MINOR_WORDS.has(lower)) {
    return null;
  }

  // Major word: MUST start with an uppercase letter
  if (!/^[A-Z]/.test(cleaned)) {
    return `Major word "${cleaned}" must start with a capital letter`;
  }

  return null;
}

/**
 * Validates an entire title string for Title Case.
 * Returns an array of issue descriptions (empty if valid).
 */
function validateTitle(title) {
  const issues = [];

  if (typeof title !== "string") {
    issues.push(`Expected a string but received ${typeof title} (${JSON.stringify(title)})`);
    return issues;
  }

  // Check for leading or trailing whitespace
  if (title !== title.trim()) {
    issues.push(`Title has leading or trailing whitespace: "${title}"`);
  }

  const trimmed = title.trim();
  if (trimmed.length === 0) {
    issues.push("Title is empty");
    return issues;
  }

  // Check for multiple consecutive spaces
  if (/\s{2,}/.test(trimmed)) {
    issues.push(`Title contains multiple consecutive spaces: "${trimmed}"`);
  }

  // Check if title is entirely ALL CAPS (excluding purely acronym titles under 6 chars)
  const lettersOnly = trimmed.replace(/[^a-zA-Z]/g, "");
  if (lettersOnly.length > 5 && lettersOnly === lettersOnly.toUpperCase()) {
    issues.push(`Title is entirely in ALL CAPS: "${trimmed}"`);
    return issues;
  }

  // Check if title is entirely all lowercase
  if (lettersOnly.length > 0 && lettersOnly === lettersOnly.toLowerCase()) {
    issues.push(`Title is entirely in lowercase: "${trimmed}"`);
    return issues;
  }

  // Tokenize into words by whitespace while preserving punctuation boundaries
  // Note: Parentheses or em-dashes often start new sub-clauses, e.g. "Program (The CDAIO Program)" or "Leadership – The CMO Program"
  const rawWords = trimmed.split(/\s+/);
  const wordCount = rawWords.length;

  for (let idx = 0; idx < wordCount; idx++) {
    const rawWord = rawWords[idx];

    // Determine if this word acts as the beginning of a clause:
    // e.g. first word of title, or starts with '(', '[', '"', or immediately follows '–' or '-' or ':'
    const isFirstInTitle = idx === 0;
    const startsWithOpeningPunct = /^[\(\[\"“]/.test(rawWord);
    const prevWord = idx > 0 ? rawWords[idx - 1] : "";
    const followsDelimiter = /^[–—\-\:]$/.test(prevWord) || /[\:\–—\-]$/.test(prevWord);

    const isFirst = isFirstInTitle || startsWithOpeningPunct || followsDelimiter;
    const isLast = idx === wordCount - 1;

    const wordErr = validateWord(rawWord, isFirst, isLast);
    if (wordErr) {
      issues.push(wordErr);
    }
  }

  return issues;
}

/**
 * Validates all program titles across:
 * 1. app/components/Assets/programs.json ("program_name")
 * 2. app/components/Assets/programs/*.json ("title")
 *
 * Exits with code 1 if any non-compliant title is found, code 0 otherwise.
 */
function runCheck() {
  console.log("🔍 Checking program titles for Title Case compliance...\n");

  const errors = [];
  let checkedCount = 0;

  // 1. Check app/components/Assets/programs.json
  if (fs.existsSync(srcProgramsJson)) {
    try {
      const programs = JSON.parse(fs.readFileSync(srcProgramsJson, "utf-8"));
      if (Array.isArray(programs)) {
        programs.forEach((prog, index) => {
          checkedCount++;
          const name = prog.program_name !== undefined ? prog.program_name : prog.title;
          const progId = prog.id || `index_${index}`;

          if (name === undefined || name === null) {
            errors.push({
              source: "app/components/Assets/programs.json",
              id: progId,
              title: String(name),
              issues: ["Missing 'program_name' field"]
            });
            return;
          }

          const issues = validateTitle(name);
          if (issues.length > 0) {
            errors.push({
              source: "app/components/Assets/programs.json",
              id: progId,
              title: name,
              issues
            });
          }
        });
      } else {
        errors.push({
          source: "app/components/Assets/programs.json",
          id: "N/A",
          title: "N/A",
          issues: ["Root of programs.json is not an array"]
        });
      }
    } catch (err) {
      errors.push({
        source: "app/components/Assets/programs.json",
        id: "N/A",
        title: "N/A",
        issues: [`Failed to parse JSON: ${err.message}`]
      });
    }
  } else {
    console.warn(`⚠️ Warning: ${srcProgramsJson} not found.`);
  }

  // 2. Check individual files in app/components/Assets/programs/*.json
  if (fs.existsSync(individualProgramsDir)) {
    const files = fs.readdirSync(individualProgramsDir).filter((f) => f.endsWith(".json"));
    files.forEach((file) => {
      checkedCount++;
      const filePath = path.join(individualProgramsDir, file);
      try {
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const title = data.title;
        const progId = data.id || file.replace(/\.json$/, "");

        if (title === undefined || title === null) {
          errors.push({
            source: `app/components/Assets/programs/${file}`,
            id: progId,
            title: String(title),
            issues: ["Missing 'title' field"]
          });
          return;
        }

        const issues = validateTitle(title);
        if (issues.length > 0) {
          errors.push({
            source: `app/components/Assets/programs/${file}`,
            id: progId,
            title,
            issues
          });
        }
      } catch (err) {
        errors.push({
          source: `app/components/Assets/programs/${file}`,
          id: file,
          title: "N/A",
          issues: [`Failed to parse JSON: ${err.message}`]
        });
      }
    });
  } else {
    console.warn(`⚠️ Warning: ${individualProgramsDir} not found.`);
  }

  // Reporting
  if (errors.length > 0) {
    console.error("================================================================================");
    console.error(`❌ [Title Case Check Failed] Found ${errors.length} program(s) with non-compliant titles:`);
    console.error("================================================================================\n");

    errors.forEach((err, idx) => {
      console.error(`[${idx + 1}] File: ${err.source}`);
      console.error(`    ID:    ${err.id}`);
      console.error(`    Title: "${err.title}"`);
      console.error("    Issues flagged:");
      err.issues.forEach((issue) => {
        console.error(`      ⚠️  ${issue}`);
      });
      console.error("");
    });

    console.error("--------------------------------------------------------------------------------");
    console.error("Commit blocked: Please correct the flagged titles to Title Case before committing.");
    console.error("Note: No files were changed by this check.");
    console.error("================================================================================\n");
    process.exit(1);
  } else {
    console.log(`✅ All ${checkedCount} program titles passed Title Case validation successfully!`);
    process.exit(0);
  }
}

if (require.main === module) {
  runCheck();
}

module.exports = { validateTitle, validateWord, MINOR_WORDS, runCheck };