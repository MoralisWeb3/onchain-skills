# EVM Utils Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "API version?" | `/web3/version` | Version info |
| "Endpoint weights?" | `/info/endpointWeights` | API costs |

## Key Endpoint Patterns

- **API metadata:** Endpoints return API configuration, not blockchain data
- **Rate limit info:** Use endpoint weights to understand API quota consumption
- **Debugging:** Use these endpoints to verify API status and configuration

---

## Get API Version

- **Endpoint:** `GET /web3/version`
- **Description:** Get API version. Retrieves the current API version information.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/web3/version
- **Use this endpoint when:** User asks "API version", "what version", "API info", "system version"
- **Params:** None

---

## Get Endpoint Weights

- **Endpoint:** `GET /info/endpointWeights`
- **Description:** Get weights of endpoints. Retrieves the API quota cost (weight) for each endpoint to help manage rate limits.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/info/endpointWeights
- **Use this endpoint when:** User asks "endpoint weights", "API costs", "rate limits", "query costs", "quota usage"
- **Params:** None
