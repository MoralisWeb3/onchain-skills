# Skills Review Plan - Audit Results

Comprehensive audit of all skills in the `moralis-api-skills` repository. All issues have been fixed.

---

## Issues Found & Fixed

### Critical: Missing `limit` Parameter in Streams API Curl Examples (FIXED)

**Root cause:** `swagger/api-configs.json` had no `example` values for `limit` query params in GetStreams, GetLogs, GetHistory, and GetAddresses. The generator only includes params with examples in curl output.

**Fix applied:**
- Added `"example": 100` to all four endpoints' `limit` params in `api-configs.json`
- Added `applySwaggerFixes()` post-processing step in `generate-api-configs.js` so fixes survive regeneration from upstream swagger
- Regenerated all rule files - curl examples now include `?limit=100`

---

### High: Unverified Bitcoin Support Claim (FIXED)

**File:** `skills/moralis-general-knowledge/references/FAQ.md`

**Fix:** Removed "Bitcoin" from the non-EVM chain list. No Bitcoin endpoints exist in the skills.

---

### High: CLAUDE.md References Non-Existent Endpoint (FIXED)

**File:** `CLAUDE.md`

**Fix:** Changed `getWalletBalance__solana.md` to `balance__solana.md` (actual endpoint name).

---

### High: CLAUDE.md Had Non-Standard Frontmatter Spec (FIXED)

**File:** `CLAUDE.md`

**What was wrong:** Documented made-up frontmatter fields (`invocation.max-turns`, `invocation.disable-model`, nested `context.fork`, `context.agent`) that don't exist in the official [Agent Skills Specification](https://agentskills.io/specification).

**Fix:** Replaced with the correct spec - only `name` and `description` are required; `license`, `compatibility`, `metadata`, and `allowed-tools` are optional. Added a clear table of required vs optional fields.

---

### High: CLAUDE.md Architecture Tree Was Outdated (FIXED)

**File:** `CLAUDE.md`

**What was wrong:** Tree was missing the `moralis-general-knowledge` skill and incorrectly showed pattern reference files under `rules/` instead of `references/`.

**Fix:** Updated the tree to show all three skills with correct directory structure.

---

### High: `UpdateStreamStatus.md` Had Invalid Status Values and `[object Object]` (FIXED)

**Root cause:** In `api-configs.json`, the status field had `"example": {}` (empty object) and `"enum": ["active", "paused", "error", "terminated"]`.

**Fix applied:**
- Changed example to `"active"` (was `{}` which rendered as `[object Object]`)
- Reduced enum to `["active", "paused"]` (the only values users can set)
- Cleaned up description text
- All fixes also applied in `applySwaggerFixes()` in `generate-api-configs.js` so they survive regeneration
- Regenerated - now shows correct values in the rule file

---

### High: `ReplaceAddressFromStream.md` Copy-Paste Error (FIXED)

**Root cause:** `api-configs.json` had "to be removed from" instead of "to replace in".

**Fix:** Corrected in `api-configs.json` and in `applySwaggerFixes()` in `generate-api-configs.js` (so it survives regeneration). Regenerated rule files.

---

### Medium: Incomplete Frontmatter Across All Skills (FIXED)

**Fix:** Added `license`, `compatibility`, `metadata` (version, author), and `allowed-tools` to all three SKILL.md frontmatter blocks per the official Anthropic Agent Skills spec.

---

### Medium: Missing Solana Section in `SupportedApisAndChains.md` (FIXED)

**Fix:** Added a complete Solana section with network support table (Mainnet/Devnet), supported API categories, and Solana-specific limitations.

---

### Medium: PATCH Method Missing from HTTP Methods Table (FIXED)

**File:** `skills/moralis-streams-api/SKILL.md`

**Fix:** Added `| Replace addresses | PATCH | /streams/evm/{id}/address |` to the HTTP methods table.

---

### Medium: `extract-endpoints.js` Showed Incorrect Rule File Names (FIXED)

**Fix:** Rewrote the script to build a collision set and output correct filenames with `__solana` / `__evm` suffixes where applicable.

---

### Medium: Pattern Guides in Wrong Directory (FIXED)

**Fix:** Moved `MonitorMultipleAddresses.md` and `ReplayFailedWebhooks.md` from `rules/` to `references/`. Added them to the SKILL.md reference documentation section.

---

### Low: Truncated `searchTokens` Description (FIXED)

**Root cause:** Generator truncated summaries at 80 chars. "Search for tokens based on contract address, pair address, token name or token symbol." is 86 chars.

**Fix:** Increased the truncation limit from 80 to 120 chars in the generator. Regenerated catalogs.

---

### Low: Unused `camelToSnakeCase` Function (FIXED)

**File:** `scripts/utils/generate-utils.js`

**Fix:** Removed the function and its export. Was never used and was misnamed (produced kebab-case, not snake_case).

---

## Not Fixed (Deferred)

The following issues were identified but are not straightforward fixes - they require either API testing or upstream swagger changes:

### GetStreamBlockDataByNumber.md Missing Response Example

The endpoint config in `api-configs.json` has no response definition, so the generator can't produce one. Would need to test the actual API endpoint to document the response structure.

### Incomplete Parameter Types for `abi` and `advancedOptions`

These fields show `-` for type because the swagger config doesn't define their types. These are complex parameters (ABI is a JSON array, advancedOptions is an array of objects) that would need proper schema definitions in `api-configs.json`.

### Ambiguous `address` Parameter Types

The `address` field in AddAddressToStream and DeleteAddressFromStream shows `-` for type. It accepts both `string` and `string[]` but this requires a type system change in the config/generator to support union types.

### Incomplete Chain ID Reference in StreamConfiguration.md

The list may not include recently added chains. This is a living document that should be updated when Moralis adds new chain support.

---

## Summary

| Category | Found | Fixed | Deferred |
|----------|-------|-------|----------|
| Critical | 1 (4 files) | 1 | 0 |
| High | 5 | 5 | 0 |
| Medium | 6 | 6 | 0 |
| Low | 2 | 2 | 0 |
| Deferred | 4 | 0 | 4 |
| **Total** | **18** | **14** | **4** |

All critical, high, medium, and low priority issues have been resolved. The 4 deferred items require either API testing or deeper config/generator changes.
