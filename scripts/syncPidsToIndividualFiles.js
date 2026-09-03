const fs = require("fs");
const path = require("path");

const PID_MAPPINGS = {
  "advanced-certificate-program-in-design-thinking-innovation-with-ai": 168,
  "iiml-chief-digital-ai-officer-programme-the-cdaio-program": 138,
  "iimt-certificate-programme-in-leadership-with-ai": 164,
  "iiml-chief-human-resource-officer-programme-the-chro-program": 163,
  "professional-certificate-program-in-strategic-project-management-and-leadership": 136,
  "advanced-certificate-program-in-strategic-project-management": 135,
  "iimr-executive-program-in-strategic-hr-leadership": 161,
  "iimr-chief-human-resource-officer-programme-the-chro-program": 162,
  "iimr-executive-program-in-strategy-leadership": 159,
  "iimr-executive-program-in-generative-ai-agentic-ai-for-leaders": 160,
  "iim-kashipur-chief-operating-officer-program": 158,
  "iim-ranchi-executive-program-in-leadership-with-ai": 157,
  "iit-jammu-advanced-certificate-in-ai-for-leaders": 155,
  "iit-jammu-advanced-certificate-in-generative-ai-for-leaders": 154,
  "iit-jammu-executive-program-in-generative-ai-and-agentic-ai-for-business-leaders": 153,
  "iit-jammu-executive-program-in-leadership-with-ai": 156,
  "professional-certificate-in-ai-for-leaders": 147,
  "sp-jain-executive-program-in-leadership-with-ai": 148,
  "iim-ranchi-senior-management-program": 146,
  "iima-senior-management-program": 142,
  "executive-development-programme-for-emerging-chief-technology-officers-the-cto-programme": 150,
  "iith-executive-program-in-design-thinking-and-innovation-for-strategic-leadership": 140,
  "iith-professional-certificate-program-in-strategic-project-management": 139,
  "iiml-executive-program-in-strategic-project-management-leadership": 137,
  "executive-development-program-in-global-senior-management": 141,
  "executive-program-in-generative-ai-for-leaders": 144,
  "professional-certificate-in-applied-generative-ai": 145,
  "chief-human-resource-officer-programme": 90,
  "post-graduate-diploma-in-management-for-working-executives": 127,
  "executive-program-in-generative-ai-for-business-leaders": 131,
  "pg-certificate-in-strategic-project-management-and-leadership": 129,
  "executive-program-in-strategy-leadership-and-innovation-in-ai-era": 125,
  "executive-development-program-strategic-hr-leadership": 104,
  "iimv-executive-program-in-leadership-with-ai": 173,
  "executive-general-management-program": 126,
  "iim-trichy-chief-technology-officer-programme": 123,
  "accelerated-senior-management-program": 121,
  "chief-executive-officer-program": 120,
  "advanced-certificate-program-in-ai-for-leaders": 118,
  "professional-certificate-program-in-leadership-with-ai": 119,
  "pg-certificate-program-in-chief-digital-and-ai-officer-program": 117,
  "chief-technology-officer-programme": 112,
  "chief-technology-officer-program": 111,
  "executive-development-program-in-digital-hr-leadership-and-people-analytics": 110,
  "global-senior-leadership-program": 172,
  "executive-program-in-business-management": 63,
  "executive-program-in-strategy-leadership": 105,
  "chief-financial-officer-programme": 170,
  "executive-program-in-general-management": 103,
  "pg-certificate-program-in-family-business-management": 171,
  "pg-certificate-program-in-investment-banking": 91,
  "senior-management-program": 69,
  "fintech-blockchain-program": 72
};

const programsDir = path.join(__dirname, "../app/components/Assets/programs");

let updatedCount = 0;
let alreadyHadCount = 0;
let missingFiles = [];

for (const [slug, targetPid] of Object.entries(PID_MAPPINGS)) {
  const filePath = path.join(programsDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(slug);
    continue;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);

  if (data.pid === targetPid) {
    alreadyHadCount++;
    continue;
  }

  // Insert pid field right after id or category
  const updatedData = {};
  for (const [k, v] of Object.entries(data)) {
    updatedData[k] = v;
    if (k === "id" && !updatedData.pid) {
      updatedData.pid = targetPid;
    }
  }
  if (!updatedData.pid) {
    updatedData.pid = targetPid;
  }

  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), "utf-8");
  updatedCount++;
  console.log(`Updated ${slug}.json -> pid: ${targetPid}`);
}

console.log("\n--- Summary ---");
console.log(`Updated files: ${updatedCount}`);
console.log(`Already had correct PID: ${alreadyHadCount}`);
console.log(`Missing individual files: ${missingFiles.length}`, missingFiles);
