# Solana Premium Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "Token pair stats?" | `/token/:network/:address/pairs/stats` | DEX pair stats |
| "Pair stats?" | `/token/:network/pairs/:pairAddress/stats` | Specific pair |

## Key Endpoint Patterns

- **Pair stats:** `/token/:network/*pairs*/stats` (DEX pair analytics)
- **Network parameter:** `mainnet` or `devnet`
- **Premium endpoints:** Higher API cost, advanced analytics

**⚠️ IMPORTANT Limitations:**
- The Solana API has **very limited** premium endpoints compared to EVM
- No volume/timeseries endpoints for Solana
- No token discovery endpoints for Solana
- No market data endpoints for Solana

---

## Get Token Pairs Stats
- **Endpoint:** `GET /token/:network/:address/pairs/stats`
- **Description:** Get stats for all DEX pairs of a token
- **Use this endpoint when:** User asks "token pairs stats", "DEX pairs for this token", "pair analytics"
- **Networks:** mainnet, devnet

## Get Pair Stats
- **Endpoint:** `GET /token/:network/pairs/:pairAddress/stats`
- **Description:** Get stats for a specific DEX pair
- **Use this endpoint when:** User asks "pair stats", "DEX pair statistics", "liquidity pool stats"
- **Networks:** mainnet, devnet

## Solana API Limitations

The Solana API has **very limited** premium endpoints compared to EVM:

**❌ Not Available:**
- `/volume/chains` (EVM only)
- `/volume/timeseries` (EVM only)
- `/volume/timeseries/solana` (doesn't exist)
- `/tokens/search` (EVM only)
- `/tokens/analytics` (EVM only)
- `/discovery/tokens` (EVM only)
- `/token/:network/:address/stats` (doesn't exist)
- `/tokens/analytics/solana` (doesn't exist)
- `/market/data/solana` (doesn't exist)
- `/tokens/top/solana` (doesn't exist)

**✅ Available:**
- Token pair stats (`/token/:network/:address/pairs/stats`)
- Specific pair stats (`/token/:network/pairs/:pairAddress/stats`)

For advanced Solana analytics (volume, timeseries, discovery), consider using:
- Solana-specific APIs (Jupiter, Raydium, Orca)
- External analytics platforms (CoinGecko, Messari)
