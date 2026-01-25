---
name: moralis-api-key
description: Remember Moralis API key during session. Use when user provides an API key or asks to configure credentials.
license: MIT
compatibility: Requires Node.js (built-in modules only)
metadata:
    version: "2.0.0"
    author: moralis-skills
    tags: [moralis, api-key, configuration, setup, session]
allowed-tools: Bash Read Write
---

# Moralis API Key Manager

Remember the Moralis API key during the current session. The key is stored only in memory and never written to disk.

## When to Use This Skill

Use this skill when the user says things like:

- "Set this as the Moralis API key: `<key>`"
- "Use this API key: `<key>`"
- "Update the Moralis API key to: `<key>`"
- "Configure the API key"
- "Set up the credentials"
- "Here's my API key: `<key>`"

## How It Works

1. Accept the API key from user input
2. Store it in memory for the current session only
3. All other Moralis skills (@moralis-data-api, @moralis-streams-api) will use this key
4. The key is never written to any file (prevents accidental git commits)

**Important:** The key persists only during the current Claude Code session. When the session ends, the key is forgotten.

## For Project Development

If the user is building a project (dashboard, wallet, dApp, etc.) and needs persistent API key storage:

> "If you're building a project that needs persistent API key storage, I recommend creating a `.env` file in your project root with:
>
> ```bash
> MORALIS_API_KEY=your_key_here
> ```
>
> Make sure to add `.env` to your `.gitignore` file to prevent accidentally committing your key."

## Session Memory Pattern

Claude should remember the key throughout the session:

```javascript
// When user provides the key
const MORALIS_API_KEY = "user_provided_key";

// Use in all curl commands
curl "https://deep-index.moralis.io/api/v2.2/..." \
  -H "X-API-Key: ${MORALIS_API_KEY}"
```

## Key Extraction Pattern

When user provides an API key, extract it using these patterns:

- After phrases like: "key:", "API key:", "use this key:", "set key:"
- From formats like: `"Set this as the key: eyJhbGc..."` → extract `eyJhbGc...`
- From direct input: `"eyJhbGc..."` (when context makes it clear it's an API key)

## Verification

After setting the key, suggest a simple verification query:

```bash
# Verify the key works
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/balance?chain=0x1" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Security Notes

- Key is stored in memory only
- Never written to disk
- Never included in git commits
- Session-isolated (different sessions have separate keys)
- No risk of accidentally committing secrets to version control

## Example Conversation

**User:** "Set this as the Moralis API key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

**Agent:**

```
I've stored your Moralis API key in memory for this session.

The key will be used for all Moralis API requests during this session and will be forgotten when the session ends.

You can now run any query. For example:
"Get the balance of wallet 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
```

## Get Your API Key

1. Register at [admin.moralis.io/register](https://admin.moralis.io/register) (free)
2. Get your key at [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)

## See Also

- [moralis-data-api](../moralis-data-api/SKILL.md) - Queries blockchain data using the session key
- [moralis-streams-api](../moralis-streams-api/SKILL.md) - Real-time event streaming using the session key
