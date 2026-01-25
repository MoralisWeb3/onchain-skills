#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const RULES_DIR = path.join(__dirname, "../skills/moralis-data-api/rules");
const API_CONFIGS_PATH = path.join(__dirname, "../swagger/api-configs.json");

const data = JSON.parse(fs.readFileSync(API_CONFIGS_PATH, "utf8"));

// Get all operationIds
const evmOps = new Set(Object.keys(data.evm || {}));
const solanaOps = new Set(Object.keys(data.solana || {}));

// Find Solana-only endpoints (no collision with EVM)
const solanaOnly = [];
for (const op of solanaOps) {
  if (!evmOps.has(op)) {
    solanaOnly.push(op);
  }
}

console.log("=== Solana-only endpoints (should have __solana suffix) ===");
console.log("Found " + solanaOnly.length + " Solana-only endpoints:\n");

const missingSuffix = [];
const missingFiles = [];

for (const op of solanaOnly.sort()) {
  const expectedFile = path.join(RULES_DIR, op + "__solana.md");
  const actualFile = path.join(RULES_DIR, op + ".md");
  const actualExists = fs.existsSync(actualFile);
  const expectedExists = fs.existsSync(expectedFile);

  console.log("- " + op);
  console.log("  Current: " + (actualExists ? op + ".md exists" : "NOT FOUND"));
  console.log(
    "  Expected: " +
      op +
      "__solana.md " +
      (expectedExists ? "exists" : "missing"),
  );

  if (actualExists && !expectedExists) {
    console.log("  ⚠️  HAS " + op + ".md but SHOULD be " + op + "__solana.md");
    missingSuffix.push(op);
  } else if (!actualExists && !expectedExists) {
    console.log("  ⚠️  FILE NOT FOUND AT ALL!");
    missingFiles.push(op);
  } else if (expectedExists) {
    console.log("  ✅ Already has __solana suffix");
  }
  console.log();
}

console.log("=== SUMMARY ===");
console.log(
  "Solana-only endpoints missing __solana suffix: " + missingSuffix.length,
);
if (missingSuffix.length > 0) {
  console.log(missingSuffix.join(", "));
}
if (missingFiles.length > 0) {
  console.log(
    "\nSolana-only endpoints with NO files at all: " + missingFiles.length,
  );
  console.log(missingFiles.join(", "));
}

// Exit with error if issues found
process.exit(missingSuffix.length > 0 || missingFiles.length > 0 ? 1 : 0);
