#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SCAN_ROOTS = [
  path.join(ROOT, "README.md"),
  path.join(ROOT, "CLAUDE.md"),
  path.join(ROOT, "CONTRIBUTING.md"),
  path.join(ROOT, "skills"),
];

function shouldScan(filePath) {
  return path.extname(filePath).toLowerCase() === ".md";
}

function* walk(targetPath) {
  if (!fs.existsSync(targetPath)) return;

  const stat = fs.statSync(targetPath);
  if (stat.isFile()) {
    if (shouldScan(targetPath)) yield targetPath;
    return;
  }

  const entries = fs.readdirSync(targetPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(targetPath, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
      continue;
    }
    if (entry.isFile() && shouldScan(fullPath)) {
      yield fullPath;
    }
  }
}

function findBrokenLinks(filePath) {
  const rel = path.relative(ROOT, filePath);
  const text = fs.readFileSync(filePath, "utf8");
  const issues = [];
  const linkRegex = /\[[^\]]+\]\(([^)]+)\)/g;

  for (const match of text.matchAll(linkRegex)) {
    const raw = match[1].trim();
    if (
      raw.startsWith("http://") ||
      raw.startsWith("https://") ||
      raw.startsWith("mailto:") ||
      raw.startsWith("#")
    ) {
      continue;
    }

    const local = raw.split("#")[0];
    if (!local) continue;

    const target = path.resolve(path.dirname(filePath), local);
    if (!fs.existsSync(target)) {
      issues.push(`${rel} -> ${raw}`);
    }
  }

  return issues;
}

function main() {
  const files = [];
  for (const root of SCAN_ROOTS) {
    for (const filePath of walk(root)) files.push(filePath);
  }

  const broken = [];
  for (const filePath of files) {
    broken.push(...findBrokenLinks(filePath));
  }

  if (broken.length === 0) {
    console.log("All markdown relative links resolve.");
    return;
  }

  console.error("Broken markdown links detected:");
  for (const issue of broken) {
    console.error("- " + issue);
  }
  process.exit(1);
}

main();
