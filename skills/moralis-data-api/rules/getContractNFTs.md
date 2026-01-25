# Get NFTs by contract address

Fetch all NFTs for a given collection. Each NFT returned includes on-chain metadata as well as off-chain metadata, floor prices, rarity and more where available.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/nft/:address`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address of the NFT contract | \`0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, fantom, 0xfa, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, chiliz testnet, 0x15b32, gnosis, 0x64, gnosis testnet, 0x27d8, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, moonbase, 0x507, linea sepolia, 0xe705, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x7e5, lisk, 0x46f, lisk-sepolia, 0x106a, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |
| format | string | No | The format of the token ID | \`decimal\` |
| limit | number | No | The desired page size of the result. | - |
| totalRanges | number | No | The number of subranges to split the results into | - |
| range | number | No | The desired subrange to query | - |
| cursor | string | No | The cursor returned in the previous response (used for getting the next page). | - |
| normalizeMetadata | boolean | No | Should normalized metadata be returned? | - |
| media_items | boolean | No | Should preview media data be returned? | - |
| include_prices | boolean | No | Should NFT last sale prices be included in the result? | - |

## Cursor/Pagination

- **limit**: The desired page size of the result.
- **cursor**: The cursor returned in the previous response (used for getting the next page).

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/nft/0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949?chain=eth&format=decimal" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
