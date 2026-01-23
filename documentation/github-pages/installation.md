---
layout: default
title: Installation Guide
---

# Installation Guide

Follow these steps to install Moralis API Skills for Claude Code.

## Prerequisites

- **Node.js** installed (for running queries)
- **Moralis API key:**
  1. Register at [admin.moralis.io/register](https://admin.moralis.io/register) (free, no credit card required)
  2. Get your API key at [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)

## Installation

### Quick Install (Recommended)

The easiest way to install all Moralis API skills:

```bash
npx skills add noviulian/moralis-api-skills
```

Optional: List all available skills before installing
```bash
npx skills add noviulian/moralis-api-skills --list
```

### Set Your API Key

After installation, set your Moralis API key:

```bash
/moralis-api-key <paste your API key here>
```

**Example:**
```bash
/moralis-api-key eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

This configures your API key for all Moralis skills at once.

**That's it!** All skills are installed and ready to use.

---

## Installation Paths

Skills can be installed in different locations depending on your setup:

| Environment | Skills Directory |
|-------------|-----------------|
| Global (default) | `~/.claude/skills/` |
| Project-specific | `<project>/.claude/skills/` |

The query clients automatically discover the `.env` file from the skill directory or its parent directories.

---

## Manual Installation (Advanced)

If you prefer manual installation or want to install individual skills:

```bash
# Clone to Claude skills directory
cd ~/.claude/skills
git clone https://github.com/noviulian/moralis-api-skills.git moralis-api-skills-temp

# Copy individual skills you need
cp -r moralis-api-skills-temp/skills/moralis-wallet-api ~/.claude/skills/
cp -r moralis-api-skills-temp/skills/moralis-token-api ~/.claude/skills/
# ... add more skills as needed

# Clean up
rm -rf moralis-api-skills-temp
```

Then set your API key (see below).

---

### Manual Installation: Individual Skills

1. Download the skill directory you want from [GitHub](https://github.com/noviulian/moralis-api-skills)
2. Copy it to `~/.claude/skills/` or `<project>/.claude/skills/`
3. Ensure the directory contains `SKILL.md` and `query.js`
4. Set your API key (see below)

---

## Setting Your API Key (Manual Installation)

### For Individual Skills

```bash
# Replace YOUR_API_KEY from https://admin.moralis.io/register
echo "MORALIS_API_KEY=YOUR_API_KEY" > ~/.claude/skills/moralis-wallet-api/.env
echo "MORALIS_API_KEY=YOUR_API_KEY" > ~/.claude/skills/moralis-streams-api/.env
```

### For All Skills at Once

```bash
# Set API key for all Moralis skills
API_KEY="YOUR_API_KEY"
cd ~/.claude/skills
for dir in moralis-*; do
  [ -d "$dir" ] && echo "MORALIS_API_KEY=$API_KEY" > "$dir/.env"
done
echo "✅ API key set for all skills"
```

## Verification

Test that a skill is working:

```bash
cd ~/.claude/skills/moralis-wallet-api
node -e "const { query } = require('./query'); query('/:address/balance', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }).then(console.log).catch(console.error)"
```

Expected response:
```json
{
  "balance": "1000000000000000000"
}
```

Optional Streams check:
```bash
cd ~/.claude/skills/moralis-streams-api
node -e "const { query } = require('./query'); query('/streams/evm', { params: { limit: 1 } }).then(console.log).catch(console.error)"
```

## Supported Environments

| Environment | Skills Directory |
|-------------|-----------------|
| Claude Code (Desktop) | `~/.claude/skills/` |
| Claude Code (CLI) | `~/.claude/skills/` |
| Project-specific | `<project>/.claude/skills/` |

## Troubleshooting

### "API key not found" error

The `.env` file is missing. Create it:

```bash
echo "MORALIS_API_KEY=YOUR_KEY" > ~/.claude/skills/SKILL_NAME/.env
```

**To get your key:**
1. Register at [admin.moralis.io/register](https://admin.moralis.io/register) (free)
2. Get your key at [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)

### "SKILL.md not found" error

Make sure you copied the entire skill directory, including the `SKILL.md` file.

### Query returns errors

1. Verify your API key is valid at [admin.moralis.io](https://admin.moralis.io/register)
2. Check the address format is correct
3. Ensure you have network access

## Uninstallation

```bash
# Remove individual skill
rm -rf ~/.claude/skills/moralis-wallet-api

# Remove all Moralis skills
rm -rf ~/.claude/skills/moralis-*
```

## Next Steps

- See [Usage Examples]({{ "/examples" | relative_url }}) for common queries
- Check [API Reference]({{ "/api-reference" | relative_url }}) for endpoint details
