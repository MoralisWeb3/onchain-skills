# Web3 Sniper API EVM Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question                        | Endpoint                           | Example                        |
| ------------------------------------ | ---------------------------------- | ------------------------------ |
| "Who sniped this token?"             | `GET /pairs/:address/snipers`      | Sniper wallets for a pair      |
| "Show early buyers"                  | `GET /pairs/:address/snipers`      | First purchasers after launch  |
| "Identify sniper wallets"            | `GET /pairs/:address/snipers`      | Wallets that bought early      |

## Key Endpoint Patterns

- **Single endpoint**: `GET /pairs/:address/snipers` - Get all sniper wallets for a token pair
- **Sniper definition**: Wallets that bought a token within a specified number of blocks after pair creation
- **Default timeframe**: 3 blocks after pair creation (configurable)
- **Rich data**: Each sniper includes buy/sell amounts, PnL stats, and transaction details

---

## Get Snipers by Pair Address

**Function:** `getSnipersByPairAddress`
**Method:** GET
**Path:** `/pairs/:address/snipers`

**Description:** Identify sniper wallets that bought a token within a specified timeframe (`blocksAfterCreation`). Each wallet returned includes detailed information about how much was bought, sold as well as PnL stats and more.

**API Reference:** https://deep-index.moralis.io/api/v2.2/pairs/:address/snipers

**Use this endpoint when:** User asks for "snipers", "sniper wallets", "early buyers", "who bought first", "first purchasers", "who sniped this token", "identify snipers"

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| address | string | Yes | The DEX pair address to retrieve snipers for |

### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| chain | string | No | The chain to query (e.g., eth, 0x1, polygon, 0x89) |
| blocksAfterCreation | integer | No | Number of blocks after pair creation to identify snipers (min: 0, max: 1000, default: 3) |

### Response
Returns `getSnipersResponse` with an array of sniper wallets, each containing:
- `walletAddress` - The sniper wallet address
- `buyAmount` - Total amount bought (in token or USD)
- `sellAmount` - Total amount sold (in token or USD)
- `buyValueUsd` - Total buy value in USD
- `sellValueUsd` - Total sell value in USD
- `pnl` - Profit and loss (realized and unrealized)
- `pnlPercentage` - PnL as percentage
- `transactions` - List of buy/sell transactions
- `firstBuyBlock` - Block number of first purchase
- `isSniper` - Boolean flag indicating if wallet is classified as sniper

### Example
```javascript
// Get snipers for a token pair (default: 3 blocks after creation)
query('/pairs/:address/snipers', {
  address: '0xa3c2076eb97d573cc8842f1db1ecdf7b6f77ba27',
  chain: 'eth'
})

// Get snipers within 10 blocks after pair creation
query('/pairs/:address/snipers', {
  address: '0xa3c2076eb97d573cc8842f1db1ecdf7b6f77ba27',
  chain: 'eth',
  blocksAfterCreation: 10
})
```

---

## Understanding Sniper Detection

**What is a Sniper?**
A sniper wallet is defined as a wallet that purchases tokens within a specified number of blocks after the DEX pair is created. These are often sophisticated trading bots or opportunistic traders attempting to buy early.

**Default Behavior:**
- By default, snipers are identified as wallets that bought within 3 blocks of pair creation
- You can adjust this window using the `blocksAfterCreation` parameter (0-1000 blocks)

**Sniper Metrics:**
The endpoint provides detailed metrics for each sniper:
- **Buy/Sell Activity**: Total amounts and values
- **PnL**: Both realized (closed positions) and unrealized (still holding)
- **Transaction History**: Individual buy/sell transactions
- **Timing**: Block number of first purchase

## Common Pitfalls

- **Pair address vs token address**: This endpoint requires a DEX pair address (e.g., Uniswap pair), not the token contract address
- **Block window matters**: The `blocksAfterCreation` parameter significantly affects results. Lower values (1-3) catch the earliest snipers, while higher values may include regular early buyers
- **Chain availability**: Sniper detection is available for EVM chains only (not Solana)
- **PnL calculation**: PnL includes both realized profits (from sells) and unrealized profits (from still-held tokens)
- **Pair must exist**: The pair address must be a valid, existing DEX pair on the specified chain

## Use Cases

**Identify Suspicious Trading:**
```javascript
// Find potential bot activity on new token launches
query('/pairs/:address/snipers', {
  address: '0xa3c2076eb97d573cc8842f1db1ecdf7b6f77ba27',
  chain: 'eth',
  blocksAfterCreation: 1
})
```

**Track Early Investor Performance:**
```javascript
// See how early buyers performed
query('/pairs/:address/snipers', {
  address: '0xa3c2076eb97d573cc8842f1db1ecdf7b6f77ba27',
  chain: 'eth',
  blocksAfterCreation: 5
})
```

**Analyze Token Launch:**
```javascript
// Get comprehensive sniper data for launch analysis
query('/pairs/:address/snipers', {
  address: '0xa3c2076eb97d573cc8842f1db1ecdf7b6f77ba27',
  chain: 'eth',
  blocksAfterCreation: 10
})
```

## Related Endpoints

- `web3-analytics-api` - Get detailed token analytics (volume, liquidity, FDV)
- `web3-score-api` - Get token security scores
- `web3-token-api` - Get token metadata and DEX pair information
- `web3-wallet-api` - Get detailed transaction history for specific sniper wallets

## Finding Pair Addresses

To use the sniper API, you need a DEX pair address. You can find these using:

1. **web3-token-api**: Use token endpoints to get DEX pairs
2. **DEX Explorer**: Check Uniswap, PancakeSwap, or other DEX explorers
3. **Block explorers**: Etherscan, BscScan often show pair addresses

Example workflow:
```javascript
// First, find pairs for a token
const pairs = await query('/token/:address/pairs', {
  address: '0x6982508145454ce325ddbe47a25d4ec3d2311933',
  chain: 'eth'
})

// Then, get snipers for a specific pair
const snipers = await query('/pairs/:address/snipers', {
  address: pairs[0].pairAddress,
  chain: 'eth'
})
```
