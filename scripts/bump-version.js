#!/usr/bin/env node

/**
 * Bump the semver version in a skill's SKILL.md frontmatter.
 *
 * Usage:
 *   node scripts/bump-version.js <skill|all> <major|minor|patch>
 *
 * Examples:
 *   node scripts/bump-version.js learn-moralis patch
 *   node scripts/bump-version.js moralis-data-api minor
 *   node scripts/bump-version.js all patch
 */

const fs = require("fs");
const path = require("path");

const SKILLS_DIR = path.join(__dirname, "../skills");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSkillDirs() {
  return fs
    .readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => {
      const skillFile = path.join(SKILLS_DIR, name, "SKILL.md");
      return fs.existsSync(skillFile);
    });
}

function readVersion(skillName) {
  const filePath = path.join(SKILLS_DIR, skillName, "SKILL.md");
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(/^version:\s*(.+)$/m);
  if (!match) {
    return null;
  }
  return match[1].trim().replace(/^["']|["']$/g, "");
}

function parseSemver(version) {
  const parts = version.split(".").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    return null;
  }
  return { major: parts[0], minor: parts[1], patch: parts[2] };
}

function bump(version, type) {
  const v = parseSemver(version);
  if (!v) {
    return null;
  }
  switch (type) {
    case "major":
      return `${v.major + 1}.0.0`;
    case "minor":
      return `${v.major}.${v.minor + 1}.0`;
    case "patch":
      return `${v.major}.${v.minor}.${v.patch + 1}`;
    default:
      return null;
  }
}

function writeVersion(skillName, newVersion) {
  const filePath = path.join(SKILLS_DIR, skillName, "SKILL.md");
  const content = fs.readFileSync(filePath, "utf8");
  const updated = content.replace(
    /^version:\s*.+$/m,
    `version: ${newVersion}`,
  );
  if (updated === content) {
    return false;
  }
  fs.writeFileSync(filePath, updated, "utf8");
  return true;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);

if (args.length < 2) {
  const skills = getSkillDirs();
  console.log("Usage: node scripts/bump-version.js <skill|all> <major|minor|patch>\n");
  console.log("Available skills:");
  for (const s of skills) {
    const v = readVersion(s);
    console.log(`  ${s}  (${v || "no version"})`);
  }
  process.exit(1);
}

const [target, type] = args;

if (!["major", "minor", "patch"].includes(type)) {
  console.error(`Error: bump type must be major, minor, or patch (got "${type}")`);
  process.exit(1);
}

const skills = target === "all" ? getSkillDirs() : [target];

let hasError = false;

for (const skillName of skills) {
  const skillPath = path.join(SKILLS_DIR, skillName, "SKILL.md");
  if (!fs.existsSync(skillPath)) {
    console.error(`Error: skill "${skillName}" not found at ${skillPath}`);
    hasError = true;
    continue;
  }

  const current = readVersion(skillName);
  if (!current) {
    console.error(`Error: no version field found in ${skillName}/SKILL.md`);
    hasError = true;
    continue;
  }

  const next = bump(current, type);
  if (!next) {
    console.error(`Error: cannot parse version "${current}" in ${skillName}/SKILL.md`);
    hasError = true;
    continue;
  }

  const wrote = writeVersion(skillName, next);
  if (!wrote) {
    console.error(`Error: failed to update version in ${skillName}/SKILL.md`);
    hasError = true;
    continue;
  }

  console.log(`${skillName}: ${current} -> ${next}`);
}

process.exit(hasError ? 1 : 0);
