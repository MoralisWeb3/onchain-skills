---
name: moralis-data-api
description: Query Web3 blockchain data from Moralis API. Use when user asks about wallet data (balances, tokens, NFTs, transaction history, profitability, net worth), token data (prices, metadata, DEX pairs, analytics, security scores), NFT data (metadata, transfers, traits, rarity, floor prices), DeFi positions, entity/label data for exchanges and funds, or block and transaction data. Supports EVM chains (Ethereum, Polygon, BSC, Arbitrum, Base, Optimism, Avalanche, etc.) and Solana. NOT for real-time streaming - use moralis-streams-api instead.
---

## CRITICAL: Read Rule Files Before Implementing

**The #1 cause of bugs is not reading the endpoint rule file before writing code.**

For EVERY endpoint:

1. Read `rules/{EndpointName}.md`
2. Find "Example Response" section
3. Copy the EXACT JSON structure
4. Note field names (snake_case), data types, HTTP method, path, wrapper structure

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

**Note:** Key is shared with @moralis-streams-api within the same session.

### Verify Your Key

```bash
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/balance?chain=0x1" \
  -H "X-API-Key: YOUR_API_KEY"
```

---

## Base URLs

| API    | Base URL                                 |
| ------ | ---------------------------------------- |
| EVM    | `https://deep-index.moralis.io/api/v2.2` |
| Solana | `https://solana-gateway.moralis.io`      |

## Authentication

All requests require: `X-API-Key: <your_api_key>`

---

## Quick Reference: Most Common Patterns

### Data Type Rules

| Field          | Reality                          | NOT               |
| -------------- | -------------------------------- | ----------------- |
| `block_number` | Decimal `12386788`               | Hex `0xf2b5a4`    |
| `timestamp`    | ISO `"2021-05-07T11:08:35.000Z"` | Unix `1620394115` |
| `balance`      | String `"1000000000000000000"`   | Number            |
| `decimals`     | String or number                 | Always number     |

### Block Numbers (always decimal)

```typescript
block_number: 12386788; // number - use directly
block_number: "12386788"; // string - parseInt(block_number, 10)
```

### Timestamps (usually ISO strings)

```typescript
"2021-05-07T11:08:35.000Z"; // → new Date(timestamp).getTime()
```

### Balances (always strings unless its a property named "formatted" eg. balanceFormatted, BigInt)

```typescript
balance: "1000000000000000000";
// → (Number(BigInt(balance)) / 1e18).toFixed(6)
```

### Response Patterns

| Pattern                              | Example Endpoints                             |
| ------------------------------------ | --------------------------------------------- |
| Direct array `[...]`                 | getWalletTokenBalancesPrice, getTokenMetadata |
| Wrapped `{ result: [] }`             | getWalletNFTs, getWalletTransactions          |
| Paginated `{ page, cursor, result }` | getWalletHistory, getNFTTransfers             |

```typescript
// Safe extraction
const data = Array.isArray(response) ? response : response.result || [];
```

### Common Field Mappings

```typescript
token_address → tokenAddress
from_address_label → fromAddressLabel
block_number → blockNumber
receipt_status: "1" → success, "0" → failed
possible_spam: "true"/"false" → boolean check
```

---

## Common Pitfalls (Top 5)

1. **Block numbers are decimal, not hex** - Use `parseInt(x, 10)`, not `parseInt(x, 16)`
2. **Timestamps are ISO strings** - Use `new Date(timestamp).getTime()`
3. **Balances are strings** - Use `BigInt(balance)` for math
4. **Response may be wrapped** - Check for `.result` before `.map()`
5. **Path inconsistencies** - Some use `/wallets/{address}/...`, others `/{address}/...`

See [references/CommonPitfalls.md](references/CommonPitfalls.md) for complete reference.

---

## Pagination

Many endpoints use cursor-based pagination:

```bash
# First request
curl "...?limit=100" -H "X-API-Key: $KEY"

# Next page
curl "...?limit=100&cursor=<cursor_from_response>" -H "X-API-Key: $KEY"
```

See [references/Pagination.md](references/Pagination.md) for details.

---

## Testing Endpoints

```bash
API_KEY="your_key"
ADDRESS="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
CHAIN="0x1"

# Wallet Balance
curl "https://deep-index.moralis.io/api/v2.2/${ADDRESS}/balance?chain=${CHAIN}" \
  -H "X-API-Key: ${API_KEY}"

# Token Price
curl "https://deep-index.moralis.io/api/v2.2/erc20/0x6B175474E89094C44Da98b954EedeAC495271d0F/price?chain=${CHAIN}" \
  -H "X-API-Key: ${API_KEY}"

# Wallet Transactions (note result wrapper)
curl "https://deep-index.moralis.io/api/v2.2/${ADDRESS}?chain=${CHAIN}&limit=5" \
  -H "X-API-Key: ${API_KEY}" | jq '.result'
```

---

## Quick Troubleshooting

| Issue                     | Cause                  | Solution                            |
| ------------------------- | ---------------------- | ----------------------------------- |
| "Property does not exist" | Field name mismatch    | Check snake_case in rule file       |
| "Cannot read undefined"   | Missing optional field | Use `?.` optional chaining          |
| "blockNumber is NaN"      | Parsing decimal as hex | Use radix 10: `parseInt(x, 10)`     |
| "Wrong timestamp"         | Parsing ISO as number  | Use `new Date(timestamp).getTime()` |
| "404 Not Found"           | Wrong endpoint path    | Verify path in rule file            |

---

## Default Chain Behavior

**EVM addresses (`0x...`):** Default to Ethereum (`chain=0x1`) unless specified.

**Solana addresses (base58):** Auto-detected and routed to Solana API.

---

## Supported Chains

**EVM (40+ chains):** Ethereum (0x1), Polygon (0x89), BSC (0x38), Arbitrum (0xa4b1), Optimism (0xa), Base (0x2105), Avalanche (0xa86a), and more.

**Solana:** Mainnet, Devnet

See [references/SupportedApisAndChains.md](references/SupportedApisAndChains.md) for full list.

---

## Endpoint Categories

### Wallet Endpoints

Get balances, tokens, NFTs, transaction history, profitability, net worth.

| Endpoint                                                            | Description                     |
| ------------------------------------------------------------------- | ------------------------------- |
| [getNativeBalance](rules/getNativeBalance.md)                       | Get native balance              |
| [getWalletTokenBalancesPrice](rules/getWalletTokenBalancesPrice.md) | Get tokens with prices          |
| [getWalletNFTs](rules/getWalletNFTs.md)                             | Get NFTs                        |
| [getWalletHistory](rules/getWalletHistory.md)                       | Get decoded transaction history |
| [getWalletTransactions](rules/getWalletTransactions.md)             | Get native transactions         |
| [getWalletProfitability](rules/getWalletProfitability.md)           | Get profit/loss data            |
| [getWalletNetWorth](rules/getWalletNetWorth.md)                     | Get total net worth             |
| [getWalletStats](rules/getWalletStats.md)                           | Get summary stats               |

### Token Endpoints

Get prices, metadata, pairs, analytics, security scores.

| Endpoint                                                  | Description        |
| --------------------------------------------------------- | ------------------ |
| [getTokenPrice\_\_evm](rules/getTokenPrice__evm.md)       | Get token price    |
| [getTokenMetadata\_\_evm](rules/getTokenMetadata__evm.md) | Get token metadata |
| [getTokenPairs\_\_evm](rules/getTokenPairs__evm.md)       | Get DEX pairs      |
| [getTokenAnalytics](rules/getTokenAnalytics.md)           | Get analytics      |
| [getTokenScore](rules/getTokenScore.md)                   | Get security score |

### NFT Endpoints

Get metadata, transfers, traits, rarity, floor prices.

| Endpoint                                                          | Description          |
| ----------------------------------------------------------------- | -------------------- |
| [getNFTMetadata\_\_evm](rules/getNFTMetadata__evm.md)             | Get NFT metadata     |
| [getNFTTransfers](rules/getNFTTransfers.md)                       | Get transfers        |
| [getNFTCollectionStats](rules/getNFTCollectionStats.md)           | Get collection stats |
| [getNFTFloorPriceByContract](rules/getNFTFloorPriceByContract.md) | Get floor price      |

### DeFi Endpoints

Get protocol positions, liquidity, exposure.

| Endpoint                                                          | Description      |
| ----------------------------------------------------------------- | ---------------- |
| [getDefiSummary](rules/getDefiSummary.md)                         | Get DeFi summary |
| [getDefiPositionsSummary](rules/getDefiPositionsSummary.md)       | Get positions    |
| [getDefiPositionsByProtocol](rules/getDefiPositionsByProtocol.md) | Get by protocol  |

### Blockchain Endpoints

Get blocks, transactions, date conversion.

| Endpoint                                              | Description              |
| ----------------------------------------------------- | ------------------------ |
| [getBlock](rules/getBlock.md)                         | Get block by hash/number |
| [getTransaction](rules/getTransaction.md)             | Get transaction          |
| [getLatestBlockNumber](rules/getLatestBlockNumber.md) | Get latest block         |
| [getDateToBlock](rules/getDateToBlock.md)             | Convert date to block    |

### Discovery Endpoints

Get trending tokens, market movers, top tokens.

| Endpoint                                            | Description         |
| --------------------------------------------------- | ------------------- |
| [getTrendingTokens](rules/getTrendingTokens.md)     | Get trending tokens |
| [getTopGainersTokens](rules/getTopGainersTokens.md) | Get top gainers     |
| [getTopLosersTokens](rules/getTopLosersTokens.md)   | Get top losers      |

### Solana Endpoints

All Solana endpoints have `__solana` suffix.

| Endpoint                                                  | Description     |
| --------------------------------------------------------- | --------------- |
| [balance\_\_solana](rules/balance__solana.md)             | Get SOL balance |
| [getSPL\_\_solana](rules/getSPL__solana.md)               | Get SPL tokens  |
| [getNFTs\_\_solana](rules/getNFTs__solana.md)             | Get NFTs        |
| [getTokenPrice\_\_solana](rules/getTokenPrice__solana.md) | Get token price |
| [getPortfolio\_\_solana](rules/getPortfolio__solana.md)   | Get portfolio   |

---

## Reference Documentation

- [references/CommonPitfalls.md](references/CommonPitfalls.md) - Complete pitfalls reference
- [references/DataTransformations.md](references/DataTransformations.md) - Type conversion reference
- [references/ResponsePatterns.md](references/ResponsePatterns.md) - Pagination patterns
- [references/SupportedApisAndChains.md](references/SupportedApisAndChains.md) - Chains and APIs

---

## See Also

- Endpoint rules: `rules/*.md` files
- Streams API: @moralis-streams-api for real-time events
