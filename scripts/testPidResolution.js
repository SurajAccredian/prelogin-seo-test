const path = require("path");

// Dynamic import or require test of resolver logic
const { getPidBySlug, getSlugByPid, getAllProgramPids, getAllProgramMappings } = require("../app/lib/program-pid-resolver.js");

console.log("==================================================");
console.log("PROGRAM PID RESOLVER VERIFICATION TEST");
console.log("==================================================\n");

const testCases = [
  { description: "IIMV CTO", slug: "chief-technology-officer-programme", expectedPid: 112 },
  { description: "IITG CTO", slug: "chief-technology-officer-program", expectedPid: 111 },
  { description: "IIM Trichy CTO", slug: "iim-trichy-chief-technology-officer-programme", expectedPid: 123 },
  { description: "IITK Design Thinking with AI", slug: "advanced-certificate-program-in-design-thinking-innovation-with-ai", expectedPid: 168 },
  { description: "IITK Strategic Project Management", slug: "advanced-certificate-program-in-strategic-project-management", expectedPid: 135 },
  { description: "IIM Lucknow CDAIO", slug: "iiml-chief-digital-ai-officer-programme-the-cdaio-program", expectedPid: 138 },
  { description: "IIM Lucknow CHRO", slug: "iiml-chief-human-resource-officer-programme-the-chro-program", expectedPid: 163 },
  { description: "IIM Ranchi Strategy & Leadership", slug: "iimr-executive-program-in-strategy-leadership", expectedPid: 159 },
  { description: "IIM Ranchi CHRO", slug: "iimr-chief-human-resource-officer-programme-the-chro-program", expectedPid: 162 },
  { description: "IIM Amritsar Senior Management", slug: "iima-senior-management-program", expectedPid: 142 },
  { description: "IIM Kashipur COO", slug: "iim-kashipur-chief-operating-officer-program", expectedPid: 158 },
  { description: "SP Jain Leadership with AI", slug: "sp-jain-executive-program-in-leadership-with-ai", expectedPid: 148 },
  { description: "SP Jain Generative AI for Leaders", slug: "executive-program-in-generative-ai-for-leaders", expectedPid: 144 },
  { description: "XLRI Emerging CTO", slug: "executive-development-programme-for-emerging-chief-technology-officers-the-cto-programme", expectedPid: 150 },
  { description: "XLRI Strategy & Leadership", slug: "executive-program-in-strategy-leadership", expectedPid: 105 },
  { description: "XLRI General Management", slug: "executive-program-in-general-management", expectedPid: 103 },
  { description: "IIT Hyderabad Design Thinking", slug: "iith-executive-program-in-design-thinking-and-innovation-for-strategic-leadership", expectedPid: 140 },
  { description: "IIT Jammu AI for Leaders", slug: "iit-jammu-advanced-certificate-in-ai-for-leaders", expectedPid: 155 },
  { description: "IIM Visakhapatnam CFO", slug: "chief-financial-officer-programme", expectedPid: 170 },
  { description: "IIM Visakhapatnam Global Senior Leadership", slug: "global-senior-leadership-program", expectedPid: 172 },
  { description: "IIM Visakhapatnam PGDMEx", slug: "post-graduate-diploma-in-management-for-working-executives", expectedPid: 127 },
  { description: "IIM Visakhapatnam FinTech & Blockchain", slug: "fintech-blockchain-program", expectedPid: 72 }
];

let allPassed = true;

testCases.forEach(({ description, slug, expectedPid }) => {
  const actualPid = getPidBySlug(slug);
  const reverseSlug = getSlugByPid(expectedPid);
  const passed = actualPid === expectedPid;
  if (!passed) allPassed = false;
  console.log(
    `[${passed ? "PASS ✅" : "FAIL ❌"}] ${description.padEnd(45)} | Slug: "${slug}" -> PID: ${actualPid} (Expected: ${expectedPid})`
  );
});

console.log("\n--------------------------------------------------");
const totalMapped = getAllProgramPids().length;
console.log(`Total unique PIDs mapped across system: ${totalMapped}`);
console.log(`Test Result: ${allPassed ? "ALL TESTS PASSED ✅" : "SOME TESTS FAILED ❌"}`);
console.log("==================================================");
