// syncNumbers.js
const fs = require("fs");
const path = require("path");

// Use process.cwd() → always resolves to repo root where package.json lives
const rootDir = process.cwd();

const srcFile = path.join(rootDir, "app/components/Assets/programs.json");
const publicNumbersFile = path.join(rootDir, "public/numbers.json");
const publicCategoriesFile = path.join(rootDir, "public/category-numbers.json");
// const categoryUrlsFile = path.join(rootDir, "app/components/Assets/category-urls.js");

console.log("Reading from:", srcFile);
console.log("Writing to:");
console.log("  1.", publicNumbersFile);
console.log("  2.", publicCategoriesFile);
// console.log("  3.", categoryUrlsFile);

// Load src JSON
let programs;
try {
  programs = JSON.parse(fs.readFileSync(srcFile, "utf-8"));
  console.log("✅ Loaded programs.json successfully");
} catch (err) {
  console.error("❌ Failed to parse programs.json:", err.message);
  process.exit(1);
}

// Ensure it's an array
if (!Array.isArray(programs)) {
  console.error("❌ Expected an array but got:", typeof programs, programs);
  process.exit(1);
}
console.log(`Found ${programs.length} programs in src JSON\n`);

// Extract only id, program_name, and contact for numbers.json
const numbersData = programs.map(({ id, program_name, contact }) => {
  const result = {
    id,
    program_name
  };

  // Only add contact if it exists
  if (contact) {
    result.contact = contact;
    console.log(`✓ ${program_name}: ${contact}`);
  } else {
    console.log(`⚠️  ${program_name}: No contact`);
  }

  return result;
});

// Count programs with/without contact
const withContact = numbersData.filter(p => p.contact).length;
const withoutContact = numbersData.length - withContact;

// Create categoriesWithContacts array (unique categories with contacts)
const categoryContactMap = new Map();

programs.forEach(program => {
  if (program.category && program.contact) {
    const category = program.category.toLowerCase();
    // Store the first contact found for each category
    if (!categoryContactMap.has(category)) {
      categoryContactMap.set(category, program.contact);
    }
  }
});

// Convert to array format for export
const categoriesWithContacts = Array.from(categoryContactMap.entries()).map(([category, contact]) => ({
  category,
  contact
}));

// Sort by category name
categoriesWithContacts.sort((a, b) => a.category.localeCompare(b.category));

// Create category numbers object for public folder
const categoryNumbers = {
  type: "categories",
  data: categoriesWithContacts
};

// Debug sample
console.log("\n" + "=".repeat(50));
console.log("Sample numbers.json output:");
console.log("=".repeat(50));
console.log(JSON.stringify(numbersData.slice(0, 2), null, 2));

console.log("\n" + "=".repeat(50));
console.log("Categories with contacts:");
console.log("=".repeat(50));
categoriesWithContacts.forEach(({ category, contact }) => {
  console.log(`  ${category}: ${contact}`);
});

// Write numbers.json to public folder
fs.writeFileSync(publicNumbersFile, JSON.stringify(numbersData, null, 2));

// Write category-numbers.json to public folder
fs.writeFileSync(publicCategoriesFile, JSON.stringify(categoryNumbers, null, 2));

// Write category-urls.js for import in code
const categoryUrlsContent = `export const categoriesWithContacts = ${JSON.stringify(categoriesWithContacts, null, 2)};
`;
// fs.writeFileSync(categoryUrlsFile, categoryUrlsContent);

console.log("\n" + "=".repeat(50));
console.log("✅ Synced all files successfully");
console.log("=".repeat(50));
console.log(`📊 Summary:`);
console.log(`   Total programs: ${numbersData.length}`);
console.log(`   📞 Programs with contact: ${withContact}`);
console.log(`   ⚠️  Programs without contact: ${withoutContact}`);
console.log(`   📂 Unique categories with contacts: ${categoriesWithContacts.length}`);
console.log("=".repeat(50));
console.log("\n✅ Created/Updated:");
console.log(`   1. ${publicNumbersFile}`);
console.log(`   2. ${publicCategoriesFile} (with "type: categories")`);
// console.log(`   3. ${categoryUrlsFile}`);
console.log("=".repeat(50));