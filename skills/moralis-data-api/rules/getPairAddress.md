# Get DEX token pair address

Get the pair address for a token0/token1 combination on a DEX, interchangeable order.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/:token0_address/:token1_address/pairAddress`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| token0_address | string | Yes | The token0 address | \`0x2b591e99afe9f32eaa6214f7b7629768c40eeb39\` |
| token1_address | string | Yes | The token1 address | \`0xdac17f958d2ee523a2206206994597c13d831ec7\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, fantom, 0xfa, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, chiliz testnet, 0x15b32, gnosis, 0x64, gnosis testnet, 0x27d8, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, moonbase, 0x507, linea sepolia, 0xe705, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x7e5, lisk, 0x46f, lisk-sepolia, 0x106a, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |
| to_block | string | No | The block number to get the reserves from | - |
| to_date | string | No | Get the reserves up to this date (format in seconds or datestring accepted by momentjs)
* Provide the param 'to_block' or 'to_date'
* If 'to_date' and 'to_block' are provided, 'to_block' will be used.
 | - |
| exchange | string | Yes | The factory name or address of the token exchange | \`uniswapv2\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/0x2b591e99afe9f32eaa6214f7b7629768c40eeb39/0xdac17f958d2ee523a2206206994597c13d831ec7/pairAddress?chain=eth&exchange=uniswapv2" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
