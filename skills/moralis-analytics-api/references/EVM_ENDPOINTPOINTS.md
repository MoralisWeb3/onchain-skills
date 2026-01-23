# Web3 Analytics API EVM Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question                        | Endpoint                           | Example                        |
| ------------------------------------ | ---------------------------------- | ------------------------------ |
| "Show analytics for this token"      | `GET /tokens/:tokenAddress/analytics` | Single token analytics         |
| "Compare analytics for multiple tokens" | `POST /tokens/analytics`           | Up to 200 tokens               |
| "Get historical volume/liquidity data" | `POST /tokens/analytics/timeseries` | Time-series data               |

## Key Endpoint Patterns

- **Single token analytics**: `GET /tokens/:tokenAddress/analytics`
- **Multiple token analytics**: `POST /tokens/analytics` (body with array of tokens)
- **Time-series analytics**: `POST /tokens/analytics/timeseries` (requires timeframe parameter)
- All endpoints return buy/sell volume, liquidity, FDV, and transaction metrics

---

## Get Token Analytics

**Function:** `getTokenAnalytics`
**Method:** GET
**Path:** `/tokens/:tokenAddress/analytics`

**Description:** Retrieve detailed trading analytics for a specific token, including buy volume, sell volume, buyers, sellers, transactions, liquidity and FDV trends over time.

**API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/:tokenAddress/analytics

**Use this endpoint when:** User asks for "token analytics", "trading data", "buy/sell volume", "token performance", "liquidity data", "FDV trends"

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| tokenAddress | string | Yes | The token contract address to query |

### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| chain | string | No | The chain to query (e.g., eth, 0x1, polygon, 0x89) |

### Response
Returns `TokenAnalyticsData` with:
- `buyVolume` - Total buy volume in USD
- `sellVolume` - Total sell volume in USD
- `buyers` - Number of unique buyers
- `sellers` - Number of unique sellers
- `transactions` - Total transaction count
- `liquidity` - Current liquidity in USD
- `fdv` - Fully diluted valuation
- `priceChanges` - Price change metrics over different timeframes

### Example
```javascript
// Get analytics for a specific token
query('/tokens/:tokenAddress/analytics', {
  tokenAddress: '0x6982508145454ce325ddbe47a25d4ec3d2311933',
  chain: 'eth'
})
```

---

## Get Multiple Token Analytics

**Function:** `getMultipleTokenAnalytics`
**Method:** POST
**Path:** `/tokens/analytics`

**Description:** Fetch analytics for multiple tokens (up to 200), including buy volume, sell volume, buyers, sellers, transactions, liquidity and FDV trends over time.

**API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/analytics

**Use this endpoint when:** User asks for "multiple tokens", "compare tokens", "batch analytics", "analytics for several tokens"

### Path Parameters
None

### Query Parameters
None

### Request Body
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| tokens | array | Yes | Array of up to 200 token objects, each containing `chain` and `tokenAddress` |

### Response
Returns `MultipleTokenAnalyticsData` with an array of token analytics, one for each token in the request.

### Example
```javascript
// Get analytics for multiple tokens
query('/tokens/analytics', {
  method: 'POST',
  body: {
    tokens: [
      {
        chain: 'eth',
        tokenAddress: '0x6982508145454ce325ddbe47a25d4ec3d2311933'
      },
      {
        chain: '0x1',
        tokenAddress: '0xa0b86a33e6d81b17a9c7c2b2f2d3dd2a9e2b1c8d'
      }
    ]
  }
})
```

---

## Get Time Series Token Analytics

**Function:** `getTimeSeriesTokenAnalytics`
**Method:** POST
**Path:** `/tokens/analytics/timeseries`

**Description:** Fetch timeseries buy volume, sell volume, liquidity and FDV for multiple tokens (up to 200). Provides historical data points over the specified timeframe.

**API Reference:** https://deep-index.moralis.io/api/v2.2/tokens/analytics/timeseries

**Use this endpoint when:** User asks for "time-series data", "historical volume", "volume chart", "liquidity history", "FDV over time", "analytics trends"

### Path Parameters
None

### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| timeframe | string | Yes | The timeframe to query. Options: `1d`, `7d`, `30d` (default: `1d`) |

### Request Body
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| tokens | array | Yes | Array of up to 200 token objects, each containing `chain` and `tokenAddress` |

### Response
Returns `TimeSeriesByTokensData` with time-series data points for each token, including:
- `buyVolume` - Buy volume over time
- `sellVolume` - Sell volume over time
- `liquidity` - Liquidity over time
- `fdv` - Fully diluted valuation over time
- `timestamp` - Unix timestamp for each data point

### Example
```javascript
// Get 7-day time-series analytics for multiple tokens
query('/tokens/analytics/timeseries', {
  method: 'POST',
  timeframe: '7d',
  body: {
    tokens: [
      {
        chain: 'eth',
        tokenAddress: '0x6982508145454ce325ddbe47a25d4ec3d2311933'
      }
    ]
  }
})
```

---

## Common Pitfalls

- **Multiple token endpoints use POST**: Both `/tokens/analytics` and `/tokens/analytics/timeseries` require POST method with a request body, not GET with query parameters
- **Token limit**: You can request analytics for up to 200 tokens in a single request
- **Timeframe parameter**: For time-series analytics, the `timeframe` parameter is a query parameter, not part of the request body
- **Chain format**: Use either short names (`eth`, `polygon`) or hex IDs (`0x1`, `0x89`) for chain parameter
- **Token address format**: Must be a valid EVM token contract address (0x prefix, 42 characters)

## Related Endpoints

- `web3-score-api` - Get token security scores
- `web3-token-api` - Get token metadata and prices
- `web3-sniper-api` - Identify sniper wallets for token pairs
