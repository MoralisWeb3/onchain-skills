#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const API_CONFIGS_PATH = path.join(__dirname, "../swagger/api-configs.json");
const data = JSON.parse(fs.readFileSync(API_CONFIGS_PATH, "utf8"));

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
    console.log(
      "- Rule: " + opId + ".md" + (source === "solana" ? " (Solana)" : ""),
    );
    console.log();
  }
}
