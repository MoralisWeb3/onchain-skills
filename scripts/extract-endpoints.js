#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const API_CONFIGS_PATH = path.join(__dirname, "../swagger/api-configs.json");
const data = JSON.parse(fs.readFileSync(API_CONFIGS_PATH, "utf8"));

// Build collision set (endpoints that exist in both evm and solana)
const evmOps = data.evm ? new Set(Object.keys(data.evm)) : new Set();
const solanaOps = data.solana ? new Set(Object.keys(data.solana)) : new Set();
const collisions = new Set([...evmOps].filter((op) => solanaOps.has(op)));

// Extract all endpoints
for (const [source, endpoints] of Object.entries(data)) {
  console.log(
    "===" +
      source.toUpperCase() +
      " (" +
      Object.keys(endpoints).length +
      " endpoints)===\n",
  );

  const opIds = Object.keys(endpoints).sort();

  for (const opId of opIds) {
    const endpoint = endpoints[opId];
    console.log("**" + opId + "**");
    console.log("- Summary: " + (endpoint.summary || "N/A"));
    if (endpoint.description && endpoint.description !== endpoint.summary) {
      const desc =
        endpoint.description.length > 200
          ? endpoint.description.substring(0, 200) + "..."
          : endpoint.description;
      console.log("- Description: " + desc);
    }
    console.log("- Method: " + endpoint.method);
    console.log("- Path: " + endpoint.path);

    // Show correct rule file name with suffix
    let ruleName;
    if (source === "solana") {
      ruleName = opId + "__solana.md";
    } else if (source === "evm" && collisions.has(opId)) {
      ruleName = opId + "__evm.md";
    } else {
      ruleName = opId + ".md";
    }
    console.log("- Rule: " + ruleName);
    console.log();
  }
}
