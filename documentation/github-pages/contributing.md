---
layout: default
title: Contributing
---

# Contributing to Moralis API Skills

Thank you for your interest in contributing!

## Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/novnski/moralis-api-skills.git`
3. Create a branch: `git checkout -b feature/your-feature`

## Project Structure

```
skills/
├── moralis-general-knowledge/  # General Moralis knowledge, routing, FAQ
│   ├── references/             # FAQ, ProductComparison, UseCaseGuide
│   └── SKILL.md
├── moralis-data-api/           # Unified EVM + Solana data API (135 endpoints)
│   ├── rules/                  # Auto-generated endpoint docs (one per endpoint)
│   ├── references/             # Manually maintained pattern references
│   └── SKILL.md
└── moralis-streams-api/        # Real-time blockchain event streaming (20 endpoints)
    ├── rules/                  # Auto-generated endpoint docs (one per endpoint)
    ├── references/             # Manually maintained pattern references
    └── SKILL.md
```

## Development

### Adding a New Skill

1. Create directory: `skills/your-skill-name/`
2. Create `SKILL.md` following the [Agent Skills Specification](https://agentskills.io/specification)
3. Add reference documentation in `references/` (optional)
4. Test with a real API key using REST (curl or native HTTP)

### SKILL.md Frontmatter

Required and optional fields per the [Agent Skills Specification](https://agentskills.io/specification):

```yaml
---
name: your-skill-name
description: What this skill does and when to use it (max 1024 chars)
license: MIT
compatibility: Requires Node.js (built-in modules only)
metadata:
  version: "1.0.0"
  author: web3-skills
allowed-tools: Bash Read Grep Glob
---
```

| Field | Required | Notes |
|-------|----------|-------|
| `name` | Yes | Max 64 chars, lowercase + hyphens, must match directory name |
| `description` | Yes | Max 1024 chars, describes what + when to use |
| `license` | No | License identifier |
| `compatibility` | No | Max 500 chars, environment requirements |
| `metadata` | No | Arbitrary key-value pairs (string keys to string values) |
| `allowed-tools` | No | Space-delimited list of pre-approved tools |

### Endpoint Generation Pipeline

Endpoint rule files in `rules/` directories are **auto-generated** - never edit them directly.

The full pipeline:

1. `node scripts/generate-api-configs.js` - Fetches Moralis swagger docs and generates `swagger/api-configs.json`
2. `node scripts/generate-endpoint-rules.js` - Reads `api-configs.json` and generates per-endpoint markdown files + updates SKILL.md catalogs

To add or fix an endpoint:

1. If the fix is in the swagger data, update `applySwaggerFixes()` in `scripts/generate-api-configs.js`
2. Run `node scripts/generate-api-configs.js` to regenerate `swagger/api-configs.json`
3. Run `node scripts/generate-endpoint-rules.js` to regenerate rule files and catalogs
4. Verify the generated files

### Pattern Reference Files

Files in `references/` directories are **manually maintained** and not overwritten by the generator. These contain implementation patterns, pitfalls, and guides.

### Available Scripts

```bash
# Full pipeline: fetch swagger → generate configs → generate rules
node scripts/generate-api-configs.js
node scripts/generate-endpoint-rules.js

# Utility scripts
node scripts/extract-endpoints.js          # Extract endpoints from swagger
node scripts/check-collisions.js           # Check for naming collisions
node scripts/check-solana-suffix.js        # Validate Solana suffix naming
```

### Endpoint Naming Convention

- **Solana endpoints:** Always suffixed with `__solana` (e.g., `balance__solana.md`)
- **EVM endpoints:** No suffix unless collision exists (then `__evm`)
- This convention is strictly enforced by the generator script

### Testing

```bash
# Set your API key
export MORALIS_API_KEY="your_key"

# Test a Data API query
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/balance?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"

# Test a Streams API query
curl "https://api.moralis-streams.com/streams/evm?limit=1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

## Commit Guidelines

- Use clear commit messages
- One feature per commit
- Reference issues: `Fixes #123`

## Pull Requests

1. Update documentation if needed
2. Test on both EVM and Solana (if applicable)
3. Ensure no new dependencies added
4. Run generation scripts if endpoint data changed
5. Submit PR with clear description

## Zero Dependencies Policy

This project MUST NOT add external npm dependencies. All code must use Node.js built-in modules only:

- ✅ `https`, `http`, `fs`, `path`, `url`, `crypto`
- ❌ `axios`, `node-fetch`, `dotenv`, `express`, etc.
