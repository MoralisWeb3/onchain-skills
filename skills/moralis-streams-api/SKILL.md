---
name: moralis-streams-api
description: Real-time blockchain event monitoring with webhooks. Create streams to monitor transactions, logs, token transfers, NFT transfers, and internal transactions.
license: MIT
compatibility: Requires Node.js (built-in modules only)
metadata:
  version: "3.0.0"
  author: web3-skills
  tags: [web3, blockchain, streaming, webhooks, events, realtime]
context:
  fork: noviulian/moralis-api-skills
  agent: claude-code
allowed-tools:
  - Bash
invocation:
  max-turns: 2
  disable-model: false
---

# Moralis Streams API

Real-time blockchain event monitoring with webhook delivery. Monitor transactions, logs, token transfers, NFT transfers, and internal transactions across EVM chains.

## Setup

Run `/moralis-api-key <your_api_key>` before using this skill.

## When to Use This Skill

Use this skill when the user asks about:
- **Real-time monitoring:** Track blockchain events as they happen
- **Webhooks:** Set up event streaming to your server
- **Stream management:** Create, update, delete, pause/resume streams
- **Address monitoring:** Add/remove addresses from streams
- **Historical delivery:** Replay past blockchain events
- **Stream analytics:** Get stream statistics and history

⚠️ **NOT for:** Querying current blockchain state → Use @moralis-data-api

## Quick Reference

| Category | See Rules | Endpoints |
|----------|-----------|-----------|
| Stream Management | `rules/stream_management.md` | Create, update, delete, get, duplicate streams |
| Address Management | `rules/address_management.md` | Add/remove addresses from streams |
| Event Types | `rules/event_types.md` | Tx, logs, ERC20, NFT, internal tx |

## Stream Types

- `tx` - Native transactions
- `log` - Contract event logs
- `erc20transfer` - ERC20 token transfers
- `erc20approval` - ERC20 approvals
- `nfttransfer` - NFT transfers
- `internalTx` - Internal transactions

## Common Pitfalls

- **Different API:** Streams uses `api.moralis-streams.com`, NOT `deep-index.moralis.io`
- **Limit required:** GET `/streams/evm` requires `limit` parameter (max 100)
- **Stream IDs:** UUIDs, not hex strings
- **HTTP methods:** PUT for create, POST for update, DELETE for delete

## Query Examples

```bash
# List all streams
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm', { limit: 100 }).then(console.log)"

# Create a new stream
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm', { method: 'PUT', body: { webhookUrl: 'https://...', chainIds: ['0x1'] } }).then(console.log)"
```

## See Also

- Endpoint reference: See `rules/` for detailed endpoint documentation
- Data API: @moralis-data-api for querying current blockchain state
