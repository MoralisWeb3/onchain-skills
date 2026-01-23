# Bug Report: Skills-Only Architecture Analysis

**Date:** 2025-01-23
**Team:** Analysis & Standards Verification Team
**Repository:** moralis-api-skills
**Analyzed Commit:** 74fb26e

---

## Executive Summary

During analysis of the skills-only architecture migration, **CRITICAL BUGS** were identified that will cause the skills to fail when users attempt to install them. The primary issue is that the architecture assumes all skills are installed together as siblings, but the installation method may install individual skills, breaking the relative import paths.

---

## Bugs Found

### 1. CRITICAL: Broken Import Paths for Individual Skill Installation

**Severity:** CRITICAL
**Status:** UNCONFIRMED - Depends on `npx skills add` behavior

**Location:** All skills in `/skills/moralis-*/query.js`

**Issue:**
All Web3 skills use relative imports to `web3-shared`:
```javascript
module.exports = require("../web3-shared/query");
```

**Root Cause:**
This import assumes `web3-shared` is a sibling directory to each skill. This works when:
- The entire repository is cloned
- All skills are installed together in a common parent directory

**Fails when:**
- Individual skills are installed via hypothetical `npx skills add <skill-name>`
- Skills are copied to different locations without `web3-shared`
- The installation tool doesn't preserve directory structure

**Evidence:**
```bash
# Test: Install skill individually
mkdir -p /tmp/test-install/moralis-wallet-api
cp skills/moralis-wallet-api/query.js /tmp/test-install/moralis-wallet-api/
node -e "require('/tmp/test-install/moralis-wallet-api/query.js')"

# Result: Error: Cannot find module '../web3-shared/query'
```

**Impact:**
- All 12 Web3 API skills will fail to load if installed individually
- Users will get cryptic "Cannot find module" errors
- The /moralis-api-key command may work (it's a command-only skill)

**Affected Skills:**
1. moralis-wallet-api
2. moralis-token-api
3. moralis-nft-api
4. moralis-defi-api
5. moralis-entity-api
6. moralis-price-api
7. moralis-blockchain-api
8. moralis-utils
9. moralis-premium
10. moralis-analytics-api
11. moralis-score-api
12. moralis-sniper-api

**Not Affected:**
- moralis-streams-api (has its own query.js, no dependencies)
- moralis-api-key (command-only, no query.js)
- web3-shared (the dependency itself)

---

### 2. HIGH: Empty Plugin Directories

**Severity:** HIGH
**Status:** CONFIRMED

**Location:**
- `/plugins/web3-api-skills/skills/` (EMPTY)
- `/plugins/streams-api-skills/skills/` (EMPTY)

**Issue:**
The `plugins/` directory exists with plugin manifests (marketplace.json, plugin.json) but the actual skill directories are empty. This is leftover from the plugin-based architecture that was migrated to skills-only.

**Evidence:**
```bash
$ ls -la plugins/web3-api-skills/skills/
total 0
drwxr-xr-x@  2 iulian  staff   64 Jan 23 22:04 .
drwxr-xr-x@  6 iulian  staff  192 Jan 23 01:55 ..
```

**Impact:**
- Confusing for users who see plugin manifests but no skills
- Wastes repository space
- Suggests incomplete migration
- May cause confusion about whether to use plugins or skills

**Recommendation:**
Either:
1. Remove the `plugins/` directory entirely (cleanest)
2. Populate it with symlinks to the actual skills (if plugins are still needed)
3. Move it to an `archive/` directory (for historical reference)

---

### 3. MEDIUM: Unclear Installation Method

**Severity:** MEDIUM
**Status:** CONFIRMED

**Issue:**
Documentation instructs users to run `npx skills add noviulian/moralis-api-skills`, but:
1. The `skills` CLI tool is not installed in the system
2. It's unclear if this is a built-in Claude Code feature or an external tool
3. No documentation on what this command actually does

**Evidence:**
```bash
$ which skills
skills not found

$ npm list -g @anthropic-ai/skills
└── (empty)
```

**Conflicting Documentation:**
- README.md: `npx skills add noviulian/moralis-api-skills`
- MIGRATION_GUIDE.md: Same command
- But the tool doesn't exist in PATH or as a global npm package

**Possible Explanations:**
1. This is a built-in Claude Code feature (not a separate CLI)
2. This is a planned feature that doesn't exist yet
3. This is hypothetical documentation for a workflow that should be manual

**Impact:**
- Users cannot follow installation instructions
- Unclear how to actually install the skills
- May need manual installation (git clone + copy)

---

### 4. LOW: API Key Resolution from web3-shared Directory

**Severity:** LOW
**Status:** CONFIRMED (Works, but suboptimal)

**Location:** `/skills/web3-shared/query.js`

**Issue:**
The `getAPIKey()` function searches upward from `web3-shared/` directory, not from the requiring skill's directory:

```javascript
function getAPIKey(skillDir = __dirname) {
  const envPath = findEnvFile(skillDir);
  // ...
}
```

When called from `moralis-wallet-api/query.js`, which re-exports `web3-shared/query.js`, the `__dirname` in `getAPIKey` will be the `web3-shared/` directory, not the `moralis-wallet-api/` directory.

**Why this works:**
The function searches upward from `web3-shared/`, so it will still find `.env` in the parent `skills/` directory or project root.

**Why this is suboptimal:**
- Searches from the wrong starting point
- One extra directory level in the search
- May fail if `web3-shared` is moved or the structure changes

**Recommendation:**
Pass `skillDir` as a parameter when calling from each skill, or search from the `require()` call site.

---

## Edge Cases

### Edge Case 1: Manual Installation to Project Directory

**Scenario:** User manually copies skills to `<project>/.claude/skills/`

**Result:** ✓ WORKS
- All skills are siblings
- `web3-shared` is present
- Relative imports resolve correctly

### Edge Case 2: Global Installation to ~/.claude/skills/

**Scenario:** User installs all skills to `~/.claude/skills/`

**Result:** ✓ WORKS (if all skills copied)
- All skills are siblings
- `web3-shared` must be copied too
- Relative imports work

### Edge Case 3: Individual Skill Installation

**Scenario:** User installs only `moralis-wallet-api` without `web3-shared`

**Result:** ✗ FAILS
- Missing `../web3-shared/query` module
- Skill cannot be loaded
- Cryptic error message

### Edge Case 4: Installation via Hypothetical npx skills add

**Scenario:** User runs `npx skills add noviulian/moralis-api-skills`

**Result:** ? UNKNOWN
- Depends on whether the tool installs the entire repo or individual skills
- If it installs the entire `skills/` directory: WORKS
- If it installs individual skills: FAILS

### Edge Case 5: API Key in Project Root

**Scenario:** User creates `.env` in project root, skills in `~/.claude/skills/`

**Result:** ✓ WORKS (partially)
- `findEnvFile()` searches upward from `web3-shared/`
- Will search from `~/.claude/skills/web3-shared/` upward
- Will NOT find project root `.env` (different filesystem trees)
- User must create `.env` in `~/.claude/skills/` instead

---

## Test Results

### Test 1: Load Skill from Repository Root
```bash
$ cd /Users/iulian/Code/moralis-api-skills
$ node -e "const q = require('./skills/moralis-wallet-api/query'); console.log('OK')"
✓ PASS
```

### Test 2: Load Skill from Isolated Directory
```bash
$ mkdir -p /tmp/test/moralis-wallet-api
$ cp skills/moralis-wallet-api/query.js /tmp/test/moralis-wallet-api/
$ node -e "const q = require('/tmp/test/moralis-wallet-api/query'); console.log('OK')"
✗ FAIL: Cannot find module '../web3-shared/query'
```

### Test 3: All Skills Present
```bash
$ ls -1 skills/
moralis-analytics-api
moralis-api-key
moralis-blockchain-api
moralis-defi-api
moralis-entity-api
moralis-nft-api
moralis-premium
moralis-price-api
moralis-score-api
moralis-sniper-api
moralis-streams-api
moralis-token-api
moralis-utils
moralis-wallet-api
web3-shared
✓ PASS: All 15 directories present
```

### Test 4: Plugin Directories
```bash
$ ls -la plugins/web3-api-skills/skills/
(empty)
✗ FAIL: Plugin skills directories are empty
```

---

## Recommendations

### For CRITICAL Bug #1 (Broken Imports):

**Option A: Make Skills Self-Contained (RECOMMENDED)**
- Each skill should include its own query client code
- Use npm package or inline the query client in each skill
- Breaks dependency on sibling directories

**Option B: Change to Absolute Path Resolution**
- Use a package.json and proper Node.js module resolution
- Publish `web3-shared` as a separate npm package
- Skills depend on the package: `require('@moralis/web3-shared')`

**Option C: Bundle Everything in One Skill**
- Combine all web3 skills into a single monolithic skill
- No relative imports between skills
- Simpler installation

**Option D: Document Installation Requirements Clearly**
- If current architecture is intentional, clearly document that ALL skills must be installed together
- Warn against individual skill installation
- Provide validation script to check for `web3-shared`

### For HIGH Bug #2 (Empty Plugin Directories):

**RECOMMENDATION:** Remove the `plugins/` directory entirely. It's leftover from the old architecture and serves no purpose in the skills-only layout.

```bash
git rm -r plugins/
git commit -m "chore: remove empty plugins directory from skills-only migration"
```

### For MEDIUM Bug #3 (Unclear Installation):

**NEED MORE INFORMATION:**
1. Determine what `npx skills add` actually does
2. If it's a real tool, document how to install it
3. If it's hypothetical, change documentation to manual installation
4. If it's a Claude Code built-in, clarify that in docs

### For LOW Bug #4 (API Key Resolution):

**OPTIONAL:** Improve `getAPIKey()` to accept the caller's directory, but current implementation works adequately.

---

## Severity Summary

| Severity | Count | Bug Numbers |
|----------|-------|-------------|
| CRITICAL | 1 | #1 |
| HIGH | 1 | #2 |
| MEDIUM | 1 | #3 |
| LOW | 1 | #4 |

---

## Next Steps

1. **IMMEDIATE:** Clarify how `npx skills add` works (or should work)
2. **HIGH:** Decide on fix approach for Bug #1 (broken imports)
3. **MEDIUM:** Remove or populate empty `plugins/` directories
4. **LOW:** Improve API key resolution (optional)

---

## Questions for Product Team

1. Is `npx skills add` a real tool? If so, where is it documented?
2. Does `npx skills add` install entire repositories or individual skills?
3. Should users be able to install individual skills, or must they install all skills together?
4. Is the current relative-import architecture intentional, or should we move to self-contained skills?
5. Should we keep the `plugins/` directory for backward compatibility?
