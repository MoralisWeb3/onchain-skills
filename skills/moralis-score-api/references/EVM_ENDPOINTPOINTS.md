# Web3 Score API EVM Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question                        | Endpoint                           | Example                        |
| ------------------------------------ | ---------------------------------- | ------------------------------ |
| "What's the token score?"            | `GET /tokens/:tokenAddress/score`  | Current token score            |
| "Show token score history"           | `GET /tokens/:tokenAddress/score/historical` | Historical scores              |

## Key Endpoint Patterns

- **Current token score**: `GET /tokens/:tokenAddress/score`
- **Historical token score**: `GET /tokens/:tokenAddress/score/historical` (requires timeframe parameter)
- Token scores include metrics like price, volume, liquidity, and transaction counts

---

## Get Token Score

**Function:** `getTokenScore`
**Method:** GET
**Path:** `/tokens/:tokenAddress/score`

**Description:** Retrieve a score for a specific token along with detailed metrics including price, volume, liquidity, transaction counts, and supply information.

**API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/:tokenAddress/score

**Use this endpoint when:** User asks for "token score", "security score", "token metrics", "token rating", "evaluate this token"

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| tokenAddress | string | Yes | The token contract address to query |

### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| chain | string | No | The chain to query (e.g., eth, 0x1, polygon, 0x89) |

### Response
Returns `TokenScoreResponse` with:
- `score` - Overall token score
- `price` - Current token price
- `volume` - Trading volume
- `liquidity` - Liquidity metrics
- `transactions` - Transaction counts (buy, sell, total)
- `supply` - Token supply information
- `marketCap` - Market capitalization data
- `holders` - Number of token holders

### Example
```javascript
// Get score for a specific token
query('/tokens/:tokenAddress/score', {
  tokenAddress: '0x6982508145454ce325ddbe47a25d4ec3d2311933',
  chain: 'eth'
})
```

---

## Get Historical Token Score

**Function:** `getHistoricalTokenScore`
**Method:** GET
**Path:** `/tokens/:tokenAddress/score/historical`

**Description:** Retrieve historical score data for a specific token over time. Shows how the token's score has changed during the specified timeframe.

**API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/:tokenAddress/score/historical

**Use this endpoint when:** User asks for "historical score", "score history", "score over time", "how did the score change", "track token score"

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| tokenAddress | string | Yes | The token contract address to query |

### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| chain | string | No | The chain to query (e.g., eth, 0x1, polygon, 0x89) |
| timeframe | string | Yes | The timeframe to query. Options: `1d`, `7d`, `30d` (default: `1d`) |

### Response
Returns `HistoricalTokenScoreResponse` with:
- `scores` - Array of historical score data points
- `timestamp` - Unix timestamp for each score
- `metrics` - Historical metrics for each time point

### Example
```javascript
// Get 7-day historical score for a token
query('/tokens/:tokenAddress/score/historical', {
  tokenAddress: '0x6982508145454ce325ddbe47a25d4ec3d2311933',
  chain: 'eth',
  timeframe: '7d'
})
```

---

## Common Pitfalls

- **Timeframe required**: The historical endpoint requires the `timeframe` parameter (`1d`, `7d`, or `30d`)
- **Score metrics**: The token score is calculated from multiple metrics including price, volume, liquidity, and transaction data
- **Chain format**: Use either short names (`eth`, `polygon`) or hex IDs (`0x1`, `0x89`) for chain parameter
- **Token address format**: Must be a valid EVM token contract address (0x prefix, 42 characters)
- **Score calculation**: The scoring algorithm considers various factors; a higher score generally indicates better token health metrics

## Related Endpoints

- `web3-analytics-api` - Get detailed token analytics (volume, liquidity, FDV)
- `web3-token-api` - Get token metadata and prices
- `web3-sniper-api` - Identify sniper wallets for token pairs
