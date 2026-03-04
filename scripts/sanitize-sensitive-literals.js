#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const TARGETS = [
  path.join(ROOT, "README.md"),
  path.join(ROOT, "CLAUDE.md"),
  path.join(ROOT, "CONTRIBUTING.md"),
  path.join(ROOT, "skills"),
];

const FILE_EXTENSIONS = new Set([".md"]);

const EVM_ADDRESS_RE = /\b0x[a-fA-F0-9]{40}\b/g;
const HEX_HASH_RE = /\b0x[a-fA-F0-9]{64,}\b/g;
const UUID_RE =
  /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g;
const BASE58_RE = /\b[1-9A-HJ-NP-Za-km-z]{32,60}\b/g;

function isLikelyBase58Address(token) {
  if (!/^[1-9A-HJ-NP-Za-km-z]{32,60}$/.test(token)) {
    return false;
  }
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

function sanitizeContent(content) {
  let output = content;

  output = output.replace(EVM_ADDRESS_RE, "YOUR_EVM_ADDRESS");
  output = output.replace(HEX_HASH_RE, "YOUR_HEX_HASH");
  output = output.replace(UUID_RE, "YOUR_STREAM_ID");
  output = output.replace(BASE58_RE, (token) => {
    if (isLikelyBase58Address(token)) {
      return "YOUR_SOLANA_ADDRESS";
    }
    return token;
  });

  return output;
}

function main() {
  const files = [];
  for (const target of TARGETS) {
    for (const filePath of walkFiles(target)) {
      files.push(filePath);
    }
  }

  let changedCount = 0;
  for (const filePath of files) {
    const current = fs.readFileSync(filePath, "utf8");
    const sanitized = sanitizeContent(current);
    if (sanitized !== current) {
      fs.writeFileSync(filePath, sanitized, "utf8");
      changedCount++;
      console.log(`Sanitized: ${path.relative(ROOT, filePath)}`);
    }
  }

  console.log(`Done. Updated ${changedCount} file(s).`);
}

main();
