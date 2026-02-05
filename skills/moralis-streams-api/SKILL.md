---
name: moralis-streams-api
description: Real-time blockchain event monitoring with webhooks. Use when user asks about setting up webhooks, real-time event streaming, monitoring wallet addresses, tracking token transfers in real-time, creating/updating/deleting streams, adding/removing addresses from streams, or receiving blockchain events as they happen. Supports all EVM chains. NOT for querying historical or current blockchain state - use moralis-data-api instead.
---

## CRITICAL: Read Rule Files Before Implementing

**The #1 cause of bugs is using wrong HTTP methods or stream configurations.**

For EVERY endpoint:
1. Read `rules/{EndpointName}.md`
2. Check HTTP method (PUT for create, POST for update, DELETE for delete)
3. Verify stream ID format (UUID, not hex)
4. Use hex chain IDs (0x1, 0x89), not names (eth, polygon)

**Reading Order:**
1. This SKILL.md (core patterns)
2. Endpoint rule file in `rules/`
3. Pattern references in `references/` (for edge cases only)

---

## Setup

Provide your Moralis API key:
- "Set this as the Moralis API key: `<your_key>`"
- "Use this API key: `<your_key>`"

The key is stored in memory for the session only. Never written to disk.

**Note:** Key is shared with @moralis-data-api within the same session.

### Verify Your Key

```bash
curl "https://api.moralis-streams.com/streams/evm?limit=10" \
  -H "X-API-Key: YOUR_API_KEY"
```

---

## Base URL

```
https://api.moralis-streams.com
```

**Important:** Different from Data API (`deep-index.moralis.io`).

## Authentication

All requests require: `X-API-Key: <your_api_key>`

---

## HTTP Methods (CRITICAL)

| Action | Method | Endpoint |
|--------|--------|----------|
| Create stream | `PUT` | `/streams/evm` |
| Update stream | `POST` | `/streams/evm/{id}` |
| Delete stream | `DELETE` | `/streams/evm/{id}` |
| Get streams | `GET` | `/streams/evm` |

**Common mistake:** Using POST to create streams. Use PUT instead.

---

## Stream Types

| Type | Description |
|------|-------------|
| `tx` | Native transactions |
| `log` | Contract event logs |
| `erc20transfer` | ERC20 token transfers |
| `erc20approval` | ERC20 approvals |
| `nfttransfer` | NFT transfers |
| `internalTx` | Internal transactions |

---

## Quick Reference: Most Common Patterns

### Stream ID Format (ALWAYS UUID)

```typescript
// WRONG - Hex format
"0x1234567890abcdef"

// CORRECT - UUID format
"a1b2c3d4-e5f6-7890-abcd-ef1234567890"
```

### Chain IDs (ALWAYS hex)

```typescript
"0x1"     // Ethereum
"0x89"    // Polygon
"0x38"    // BSC
"0xa4b1"  // Arbitrum
"0xa"     // Optimism
"0x2105"  // Base
```

### Event Signatures (topic0)

```typescript
"Transfer(address,address,uint256)"   // ERC20/NFT Transfer
"Approval(address,address,uint256)"   // ERC20 Approval
```

### Status Values (lowercase only)

```typescript
"active"   // CORRECT
"paused"   // CORRECT
"ACTIVE"   // WRONG
```

---

## Common Pitfalls (Top 5)

1. **Using POST to create streams** - Use `PUT` instead
2. **Wrong base URL** - Use `api.moralis-streams.com`, NOT `deep-index.moralis.io`
3. **Hex stream ID** - Must be UUID format, not hex
4. **String chain names** - Use hex (0x1), not names (eth)
5. **Uppercase status** - Use lowercase ("active", "paused")

See [references/CommonPitfalls.md](references/CommonPitfalls.md) for complete reference.

---

## Webhook Security

Webhooks are signed with your streams secret (different from API key).

- **Header:** `x-signature`
- **Algorithm:** `sha3(JSON.stringify(body) + secret)`

```javascript
const verifySignature = (req, secret) => {
  const provided = req.headers["x-signature"];
  const generated = web3.utils.sha3(JSON.stringify(req.body) + secret);
  if (generated !== provided) throw new Error("Invalid Signature");
};
```

See [references/WebhookSecurity.md](references/WebhookSecurity.md) for complete examples.

---

## Testing Endpoints

```bash
API_KEY="your_key"
WEBHOOK_URL="https://your-server.com/webhook"

# List streams (requires limit)
curl "https://api.moralis-streams.com/streams/evm?limit=100" \
  -H "X-API-Key: ${API_KEY}"

# Create stream (PUT, not POST)
curl -X PUT "https://api.moralis-streams.com/streams/evm" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "'${WEBHOOK_URL}'",
    "description": "Test stream",
    "tag": "test",
    "topic0": ["Transfer(address,address,uint256)"],
    "allAddresses": false,
    "chainIds": ["0x1"]
  }'

# Pause stream (POST to status)
curl -X POST "https://api.moralis-streams.com/streams/evm/<stream_id>/status" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"status": "paused"}'
```

---

## Quick Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| "400 Bad Request" | Invalid config | Check webhookUrl, topic0 format, chainIds |
| "404 Not Found" | Wrong stream ID | Verify UUID format |
| "Method Not Allowed" | Wrong HTTP method | PUT for create, POST for update |
| "Missing limit" | GET /streams/evm | Add `?limit=100` |
| "No webhooks" | Stream paused | Check status is "active" |

---

## Endpoint Categories

### Stream Management

| Endpoint | Description |
|----------|-------------|
| [CreateStream](rules/CreateStream.md) | Create new stream (PUT) |
| [GetStreams](rules/GetStreams.md) | List all streams |
| [GetStream](rules/GetStream.md) | Get stream details |
| [UpdateStream](rules/UpdateStream.md) | Update stream (POST) |
| [DeleteStream](rules/DeleteStream.md) | Delete stream |
| [UpdateStreamStatus](rules/UpdateStreamStatus.md) | Pause/resume stream |

### Address Management

| Endpoint | Description |
|----------|-------------|
| [AddAddressToStream](rules/AddAddressToStream.md) | Add addresses |
| [DeleteAddressFromStream](rules/DeleteAddressFromStream.md) | Remove address |
| [GetAddresses](rules/GetAddresses.md) | List monitored addresses |
| [ReplaceAddressFromStream](rules/ReplaceAddressFromStream.md) | Replace address |

### History & Analytics

| Endpoint | Description |
|----------|-------------|
| [GetHistory](rules/GetHistory.md) | Get webhook history |
| [GetStats](rules/GetStats.md) | Get project stats |
| [GetStatsByStreamId](rules/GetStatsByStreamId.md) | Get stream stats |
| [ReplayHistory](rules/ReplayHistory.md) | Replay past events |

### Settings

| Endpoint | Description |
|----------|-------------|
| [GetSettings](rules/GetSettings.md) | Get project settings |
| [SetSettings](rules/SetSettings.md) | Update settings |

---

## Example: Create ERC20 Transfer Monitor

```bash
curl -X PUT "https://api.moralis-streams.com/streams/evm" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "https://your-server.com/webhook",
    "description": "Monitor ERC20 transfers",
    "tag": "erc20-monitor",
    "topic0": ["Transfer(address,address,uint256)"],
    "allAddresses": true,
    "chainIds": ["0x1", "0x89"],
    "advancedOptions": [{
      "topic0": "Transfer(address,address,uint256)",
      "includeNativeHash": true
    }]
  }'
```

---

## Pagination

List endpoints use cursor-based pagination:

```bash
# First page
curl "...?limit=100" -H "X-API-Key: $KEY"

# Next page
curl "...?limit=100&cursor=<cursor>" -H "X-API-Key: $KEY"
```

---

## Supported Chains

All major EVM chains: Ethereum (0x1), Polygon (0x89), BSC (0x38), Arbitrum (0xa4b1), Optimism (0xa), Base (0x2105), Avalanche (0xa86a), and more.

See [references/StreamConfiguration.md](references/StreamConfiguration.md) for complete chain ID list.

---

## Reference Documentation

- [references/CommonPitfalls.md](references/CommonPitfalls.md) - Complete pitfalls reference
- [references/StreamConfiguration.md](references/StreamConfiguration.md) - Stream config reference
- [references/WebhookSecurity.md](references/WebhookSecurity.md) - Signature verification
- [references/WebhookResponseBody.md](references/WebhookResponseBody.md) - Webhook payload structure

---

## See Also

- Endpoint rules: `rules/*.md` files
- Data API: @moralis-data-api for querying blockchain state
