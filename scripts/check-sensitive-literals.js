#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const SCAN_PATHS = [
  path.join(ROOT, "README.md"),
  path.join(ROOT, "CLAUDE.md"),
  path.join(ROOT, "CONTRIBUTING.md"),
  path.join(ROOT, "skills"),
];

const FILE_EXTENSIONS = new Set([".md"]);

const RULES = [
  {
    name: "evm_address",
    regex: /\b0x[a-fA-F0-9]{40}\b/g,
  },
  {
    name: "hex_hash",
    regex: /\b0x[a-fA-F0-9]{64,}\b/g,
  },
  {
    name: "uuid",
    regex:
      /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g,
  },
];

function isLikelyBase58Address(token) {
  if (!/^[1-9A-HJ-NP-Za-km-z]{32,60}$/.test(token)) {
    return false;
  }
  // Avoid false positives from plain words by requiring both letters and digits.
  const hasDigit = /[1-9]/.test(token);
  const hasLetter = /[A-HJ-NP-Za-km-z]/.test(token);
  return hasDigit && hasLetter;
}

function shouldScanFile(filePath) {
  return FILE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function* walkFiles(targetPath) {
  if (!fs.existsSync(targetPath)) return;

  const stat = fs.statSync(targetPath);
  if (stat.isFile()) {
    if (shouldScanFile(targetPath)) {
      yield targetPath;
    }
    return;
  }

  const entries = fs.readdirSync(targetPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(targetPath, entry.name);
    if (entry.isDirectory()) {
      yield* walkFiles(fullPath);
      continue;
    }
    if (entry.isFile() && shouldScanFile(fullPath)) {
      yield fullPath;
    }
  }
}

function collectBase58Hits(line) {
  const hits = [];
  const tokens = line.match(/\b[1-9A-HJ-NP-Za-km-z]{32,60}\b/g) || [];
  for (const token of tokens) {
    if (isLikelyBase58Address(token)) {
      hits.push(token);
    }
  }
  return hits;
}

function scanFile(filePath) {
  const relPath = path.relative(ROOT, filePath);
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const issues = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    for (const rule of RULES) {
      for (const match of line.matchAll(rule.regex)) {
        issues.push({
          file: relPath,
          line: i + 1,
          rule: rule.name,
          sample: match[0],
        });
      }
    }

    for (const hit of collectBase58Hits(line)) {
      issues.push({
        file: relPath,
        line: i + 1,
        rule: "base58_address",
        sample: hit,
      });
    }
  }

  return issues;
}

function main() {
  const files = [];
  for (const scanPath of SCAN_PATHS) {
    for (const filePath of walkFiles(scanPath)) {
      files.push(filePath);
    }
  }

  const issues = [];
  for (const filePath of files) {
    issues.push(...scanFile(filePath));
  }

  if (issues.length === 0) {
    console.log("No sensitive address/hash-like literals found.");
    process.exit(0);
  }

  console.error("Sensitive address/hash-like literals detected:");
  for (const issue of issues) {
    console.error(
      `- ${issue.file}:${issue.line} [${issue.rule}] ${issue.sample}`,
    );
  }
  process.exit(1);
}

main();
