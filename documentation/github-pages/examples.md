---
layout: default
title: Usage Examples
---

# Usage Examples

Common queries and patterns for using Moralis REST APIs with Claude Code.

## Quick Start

First, set your API key:

```bash
/moralis-api-key <paste your API key here>
```

Then ask Claude naturally - no need to write curl commands yourself.

## Wallet Queries

### Get Wallet Balance

**EVM:**

```bash
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/balance?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

**Solana:**

```bash
curl "https://solana-gateway.moralis.io/account/mainnet/kXB7FfzdrfZpAZEW3TZcp8a8CwQbsowa6BdfAHZ4gVs/balance" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Get Token Holdings (EVM ERC20)

```bash
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/erc20?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Get NFTs by Wallet

```bash
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/nft?chain=0x1&limit=10" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Get Wallet Profitability

```bash
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/profitability?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Get DeFi Positions

```bash
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/defi/positions" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

## Token Queries

### Get Token Price

```bash
curl "https://deep-index.moralis.io/api/v2.2/erc20/0x6B175474E89094C44Da98b954EedeAC495271d0F/price?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Get Token Metadata

```bash
curl "https://deep-index.moralis.io/api/v2.2/erc20/metadata?token_addresses=0x6B175474E89094C44Da98b954EedeAC495271d0F&chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Get DEX Pair Price

```bash
curl "https://deep-index.moralis.io/api/v2.2/erc20/0x6B175474E89094C44Da98b954EedeAC495271d0F/price?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Search Tokens

```bash
curl "https://deep-index.moralis.io/api/v2.2/tokens/search?query=pepe&sortBy=volume1hDesc" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Get Token Pairs

```bash
curl "https://deep-index.moralis.io/api/v2.2/erc20/0x6B175474E89094C44Da98b954EedeAC495271d0F/pairs?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Get DEX Swaps by Token

```bash
curl "https://deep-index.moralis.io/api/v2.2/erc20/0x6B175474E89094C44Da98b954EedeAC495271d0F/swaps?chain=0x1&limit=10" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

## NFT Queries

### Get NFT Metadata

```bash
curl "https://deep-index.moralis.io/api/v2.2/nft/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d?chain=0x1&format=decimal" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Get NFT Owners

```bash
curl "https://deep-index.moralis.io/api/v2.2/nft/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/owners?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Get NFT Transfers

```bash
curl "https://deep-index.moralis.io/api/v2.2/nft/transfers?chain=0x1&limit=10" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Get NFT Floor Price

```bash
curl "https://deep-index.moralis.io/api/v2.2/nft/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/floorprice?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Get NFT Collection Stats

```bash
curl "https://deep-index.moralis.io/api/v2.2/nft/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/stats?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

## Discovery & Analytics

### Get Trending Tokens

```bash
curl "https://deep-index.moralis.io/api/v2.2/tokens/trending" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Get Token Analytics

```bash
curl "https://deep-index.moralis.io/api/v2.2/token/0x6B175474E89094C44Da98b954EedeAC495271d0F/analytics?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Get Token Holders

```bash
curl "https://deep-index.moralis.io/api/v2.2/erc20/0x6B175474E89094C44Da98b954EedeAC495271d0F/holders?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Get Blue Chip Tokens

```bash
curl "https://deep-index.moralis.io/api/v2.2/tokens/bluechip" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

## Blockchain Queries

### Get Transaction

```bash
curl "https://deep-index.moralis.io/api/v2.2/transaction/0x..." \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Get Block

```bash
curl "https://deep-index.moralis.io/api/v2.2/block/0x..." \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Get Latest Block Number

```bash
curl "https://deep-index.moralis.io/api/v2.2/block/latest?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

## Streams API Examples

### List All Streams

```bash
curl "https://api.moralis-streams.com/streams/evm?limit=100" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Create a New Stream

```bash
curl -X PUT "https://api.moralis-streams.com/streams/evm" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "https://your-server.com/webhook",
    "description": "Monitor ERC20 transfers",
    "tag": "erc20-monitors",
    "topic0": ["Transfer(address,address,uint256)"],
    "allAddresses": true,
    "chainIds": ["0x1", "0x89"]
  }'
```

### Get Stream Details

```bash
curl "https://api.moralis-streams.com/streams/evm/<stream_id>" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Update Stream Status (Pause/Resume)

```bash
# Pause a stream
curl -X POST "https://api.moralis-streams.com/streams/evm/<stream_id>/status" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": "paused"}'

# Resume a stream
curl -X POST "https://api.moralis-streams.com/streams/evm/<stream_id>/status" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'
```

### Add Address to Stream

```bash
curl -X POST "https://api.moralis-streams.com/streams/evm/<stream_id>/address" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "addressToAdd": ["0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"]
  }'
```

### Delete a Stream

```bash
curl -X DELETE "https://api.moralis-streams.com/streams/evm/<stream_id>" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

## Pagination

Many endpoints return paginated results. Use the `cursor` to fetch more:

```bash
# First page
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/nft?chain=0x1&limit=100" \
  -H "X-API-Key: $MORALIS_API_KEY"

# Next page (use cursor from response)
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/nft?chain=0x1&limit=100&cursor=<cursor_from_response>" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

## Chain-Specific Queries

### Polygon

```bash
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/balance?chain=0x89" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Arbitrum

```bash
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/erc20?chain=0xa4b1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Base

```bash
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/nft?chain=0x2105" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

## Error Handling

Use HTTP status codes to diagnose issues:

```bash
curl -i "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/balance?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

## Claude Conversation Examples

Just ask Claude naturally:

### Wallet Data

- "What tokens does 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 hold on Ethereum?"
- "Get the balance of Solana wallet 742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
- "Show me the NFTs in this Polygon wallet"
- "Get DeFi positions for 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
- "What's the profitability of this wallet?"

### Token Data

- "What's the price of ETH?"
- "Get metadata for token 0x6B175474E89094C44Da98b954EedeAC495271d0F"
- "Show me the top gainers today"
- "Get trending tokens"
- "Find token pairs for USDC"

### NFT Data

- "Get NFTs for this wallet"
- "What's the floor price of Bored Apes?"
- "Show NFT transfers for this collection"
- "Get NFT owners for contract 0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"

### Streams

- "Create a stream to monitor all ERC20 transfers on Ethereum"
- "Pause the stream with ID a1b2c3d4-e5f6-7890-abcd-ef1234567890"
- "Add address 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 to stream"
- "List all my streams"
- "Delete stream xyz"

Claude will automatically detect the blockchain and use the appropriate skill.
