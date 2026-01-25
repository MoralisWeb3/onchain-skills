# Get swap transactions by pair address

Fetch swap transactions (buy, sell, add/remove liquidity) for a specific token pair.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/pairs/:address/swaps`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The pair address token-transactions are to be retrieved for. | \`0xa43fe16908251ee70ef74718545e4fe6c5ccec9f\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, fantom, 0xfa, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, chiliz testnet, 0x15b32, gnosis, 0x64, gnosis testnet, 0x27d8, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, moonbase, 0x507, linea sepolia, 0xe705, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x7e5, lisk, 0x46f, lisk-sepolia, 0x106a, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |
| cursor | string | No | The cursor returned in the previous response (used for getting the next page). | - |
| limit | number | No | The desired page size of the result. | - |
| fromBlock | number | No | The minimum block number from which to get the token transactions
* Provide the param 'fromBlock' or 'fromDate'
* If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
 | - |
| toBlock | string | No | The block number to get the token transactions from | - |
| fromDate | string | No | The start date from which to get the token transactions (format in seconds or datestring accepted by momentjs)
* Provide the param 'fromBlock' or 'fromDate'
* If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
 | - |
| toDate | string | No | The end date from which to get the token transactions (format in seconds or datestring accepted by momentjs)
* Provide the param 'toBlock' or 'toDate'
* If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
 | - |
| order | string (ASC, DESC) | No | The order of the result, in ascending (ASC) or descending (DESC) | \`DESC\` |
| transactionTypes | string | No | Array of transaction types. Allowed values are 'buy', 'sell', 'addLiquidity', 'removeLiquidity'. | - |

## Cursor/Pagination

- **limit**: The desired page size of the result.
- **cursor**: The cursor returned in the previous response (used for getting the next page).

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/pairs/0xa43fe16908251ee70ef74718545e4fe6c5ccec9f/swaps?chain=eth&order=DESC" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
