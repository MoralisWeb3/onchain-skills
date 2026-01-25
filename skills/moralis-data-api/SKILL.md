---
name: moralis-data-api
description: Query Web3 blockchain data from Moralis API (wallet, token, NFT, DeFi, entity, price, blockchain endpoints). REST API with curl examples.
license: MIT
compatibility: Requires Node.js (built-in modules only)
metadata:
  version: "3.0.0"
  author: web3-skills
  tags: [web3, blockchain, evm, solana, wallet, token, nft, defi]
context:
  fork: noviulian/moralis-api-skills
  agent: claude-code
allowed-tools:
  - Bash
invocation:
  max-turns: 2
  disable-model: false
---

# Moralis Data API

Query Web3 blockchain data via REST API. Auto-detects EVM vs Solana addresses and routes to appropriate API.

## Setup

Run `/moralis-api-key <your_api_key>` before using this skill.

## Authentication

All requests require the API key header:

```bash
X-API-Key: $MORALIS_API_KEY
```

## Base URLs

| API | Base URL |
|-----|----------|
| **EVM** | `https://deep-index.moralis.io/api/v2.2` |
| **Solana** | `https://solana-gateway.moralis.io` |

## Pagination

Many endpoints support cursor-based pagination:

- **limit**: Number of results per page
- **cursor**: Use the cursor from the previous response to get the next page

Example pagination pattern:
```bash
# First request
curl "https://deep-index.moralis.io/api/v2.2/0x.../nft?limit=100" \
  -H "X-API-Key: $MORALIS_API_KEY"

# Next page (use cursor from response)
curl "https://deep-index.moralis.io/api/v2.2/0x.../nft?limit=100&cursor=<cursor_from_response>" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

## When to Use This Skill

Use this skill when the user asks about:
- **Wallet data:** balances, tokens, NFTs, transaction history, DeFi positions, profitability
- **Token data:** prices, metadata, pairs, DEX trades, analytics, security scores, sniper detection
- **NFT data:** metadata, transfers, traits, rarity, floor prices
- **DeFi data:** protocol positions, liquidity, exposure
- **Entity data:** labeled addresses (exchanges, funds, protocols, whales)
- **Price data:** token/NFT prices, OHLCV candlesticks
- **Blockchain data:** blocks, transactions, decoded data

⚠️ **NOT for:** Real-time event streaming → Use @moralis-streams-api

## Endpoint Rules

Each endpoint has its own rule file with full documentation:

```bash
# EVM endpoints (116 rules)
rules/getWalletNFTs.md
rules/getTokenPrice.md
rules/getWalletTokenBalances.md
# ... and 113 more

# Solana endpoints (24 rules)
rules/getNFTMetadata__solana.md
rules/getTokenPrice__solana.md
rules/balance.md
# ... and 21 more
```

**Note:** `__solana` suffix indicates a Solana-specific endpoint when the same operationId exists in EVM.

## Endpoint Catalog

Complete list of all 140 endpoints (116 EVM + 24 Solana) organized by category.

### Wallet

Balances, tokens, NFTs, transaction history, profitability, and net worth data.

| Endpoint | Description |
|----------|-------------|
| [getWalletNFTs](rules/getWalletNFTs.md) | Fetch all NFTs held by a specified wallet address |
| [getWalletNFTTransfers](rules/getWalletNFTTransfers.md) | Get NFT transfers of a wallet |
| [getWalletNFTCollections](rules/getWalletNFTCollections.md) | Get all NFT collections that a wallet owns |
| [getWalletTokenBalances](rules/getWalletTokenBalances.md) | Get the token balances of a wallet |
| [getWalletTokenTransfers](rules/getWalletTokenTransfers.md) | Get the token transfers of a wallet |
| [getNativeBalance](rules/getNativeBalance.md) | Get the native balance of an address |
| [getNativeBalancesForAddresses](rules/getNativeBalancesForAddresses.md) | Get the native balances of multiple addresses |
| [getWalletApprovals](rules/getWalletApprovals.md) | Get the approvals of a wallet |
| [getWalletHistory](rules/getWalletHistory.md) | Get the history of a wallet |
| [getWalletTokenBalancesPrice](rules/getWalletTokenBalancesPrice.md) | Get the token balances of a wallet with prices |
| [getWalletNetWorth](rules/getWalletNetWorth.md) | Get the net worth of a wallet |
| [getWalletTransactions](rules/getWalletTransactions.md) | Get the transactions of a wallet |
| [getWalletTransactionsVerbose](rules/getWalletTransactionsVerbose.md) | Get the transactions of a wallet with verbose output |
| [getWalletActiveChains](rules/getWalletActiveChains.md) | Get the active chains for a wallet |
| [getWalletStats](rules/getWalletStats.md) | Get statistics for a wallet |
| [getWalletProfitabilitySummary](rules/getWalletProfitabilitySummary.md) | Get a summary of wallet profitability |
| [getWalletProfitability](rules/getWalletProfitability.md) | Get the profitability of a wallet |

### Token

Token prices, metadata, pairs, DEX swaps, analytics, security scores, and sniper detection.

| Endpoint | Description |
|----------|-------------|
| [getTokenPrice](rules/getTokenPrice.md) | Get the price of a token |
| [getSwapsByTokenAddress](rules/getSwapsByTokenAddress.md) | Get swaps for a specific token |
| [getTokenHolders](rules/getTokenHolders.md) | Get the holders of a token |
| [getHistoricalTokenHolders](rules/getHistoricalTokenHolders.md) | Get the historical holders of a token |
| [getMultipleTokenPrices](rules/getMultipleTokenPrices.md) | Get the prices of multiple tokens |
| [getTokenOwners](rules/getTokenOwners.md) | Get the owners of a token |
| [getTokenMetadata](rules/getTokenMetadata.md) | Get the metadata of a token |
| [getTokenCategories](rules/getTokenCategories.md) | Get the categories of tokens |
| [getTokenMetadataBySymbol](rules/getTokenMetadataBySymbol.md) | Get the metadata of a token by symbol |
| [getTokenTransfers](rules/getTokenTransfers.md) | Get token transfers |
| [getPairPrice](rules/getPairPrice.md) | Get the price of a token pair |
| [getPairReserves](rules/getPairReserves.md) | Get the reserves of a token pair |
| [getPairAddress](rules/getPairAddress.md) | Get the address of a token pair |
| [getTokenStats](rules/getTokenStats.md) | Get statistics for a token |
| [getFilteredTokens](rules/getFilteredTokens.md) | Get tokens that match certain filters |
| [searchTokens](rules/searchTokens.md) | Search for tokens |
| [getPairCandlesticks](rules/getPairCandlesticks.md) | Get candlestick data for a token pair |
| [getPairStats](rules/getPairStats.md) | Get statistics for a token pair |
| [getTokenPairs](rules/getTokenPairs.md) | Get the pairs for a token |
| [getAggregatedTokenPairStats](rules/getAggregatedTokenPairStats.md) | Summarize statistics across all pairs for a token |
| [getSwapsByWalletAddress](rules/getSwapsByWalletAddress.md) | Get swaps for a specific wallet |
| [getSwapsByPairAddress](rules/getSwapsByPairAddress.md) | Get swaps for a specific pair |
| [getTokenAnalytics](rules/getTokenAnalytics.md) | Get analytics for a token |
| [getMultipleTokenAnalytics](rules/getMultipleTokenAnalytics.md) | Get analytics for multiple tokens |
| [getTokenScore](rules/getTokenScore.md) | Get the score of a token |
| [getHistoricalTokenScore](rules/getHistoricalTokenScore.md) | Get the historical score of a token |

### NFT

NFT metadata, transfers, traits, rarity, floor prices, and trades.

| Endpoint | Description |
|----------|-------------|
| [getMultipleNFTs](rules/getMultipleNFTs.md) | Get multiple NFTs from different contracts and tokens |
| [getContractNFTs](rules/getContractNFTs.md) | Fetch all NFTs for a given collection |
| [getUniqueOwnersByCollection](rules/getUniqueOwnersByCollection.md) | Get the unique owners of an NFT collection |
| [getNFTOwners](rules/getNFTOwners.md) | Get the owners of a specific NFT |
| [getNFTContractTransfers](rules/getNFTContractTransfers.md) | Get NFT transfers of a contract |
| [getNFTByContractTraits](rules/getNFTByContractTraits.md) | Get NFTs that match certain traits |
| [getNFTTraitsByCollection](rules/getNFTTraitsByCollection.md) | Get the traits of an NFT collection |
| [getNFTTraitsByCollectionPaginate](rules/getNFTTraitsByCollectionPaginate.md) | Get the traits of an NFT collection with pagination |
| [resyncNFTRarity](rules/resyncNFTRarity.md) | Resync the rarity of an NFT collection |
| [getNFTTrades](rules/getNFTTrades.md) | Get NFT trades |
| [getNFTTradesByToken](rules/getNFTTradesByToken.md) | Get NFT trades for a specific token |
| [getNFTTradesByWallet](rules/getNFTTradesByWallet.md) | Get NFT trades for a specific wallet |
| [getNFTContractMetadata](rules/getNFTContractMetadata.md) | Get the metadata of an NFT contract |
| [getNFTBulkContractMetadata](rules/getNFTBulkContractMetadata.md) | Get the metadata of multiple NFT contracts |
| [getNFTMetadata](rules/getNFTMetadata.md) | Get the metadata of a specific NFT |
| [getNFTTransfers](rules/getNFTTransfers.md) | Get NFT transfers |
| [getNFTTokenIdOwners](rules/getNFTTokenIdOwners.md) | Get the owners of a specific NFT token ID |
| [syncNFTContract](rules/syncNFTContract.md) | Sync an NFT contract |
| [reSyncMetadata](rules/reSyncMetadata.md) | Resync the metadata of an NFT |
| [getNFTContractSalePrices](rules/getNFTContractSalePrices.md) | Get the sale prices of an NFT contract |
| [getNFTSalePrices](rules/getNFTSalePrices.md) | Get the sale prices of NFTs |
| [getNFTCollectionStats](rules/getNFTCollectionStats.md) | Get statistics for an NFT collection |

### DeFi

DeFi protocol positions, liquidity, and exposure data.

| Endpoint | Description |
|----------|-------------|
| [getDefiSummary](rules/getDefiSummary.md) | Get a summary of DeFi positions |
| [getDefiPositionsByProtocol](rules/getDefiPositionsByProtocol.md) | Get the DeFi positions for a specific protocol |
| [getDefiPositionsSummary](rules/getDefiPositionsSummary.md) | Get a summary of DeFi positions |

### Entity

Labeled addresses including exchanges, funds, protocols, and whales.

| Endpoint | Description |
|----------|-------------|
| [searchEntities](rules/searchEntities.md) | Search for entities |
| [getEntity](rules/getEntity.md) | Get an entity |
| [getEntityCategories](rules/getEntityCategories.md) | Get the categories of entities |
| [getEntitiesByCategory](rules/getEntitiesByCategory.md) | Get entities in a specific category |

### Price

Token and NFT prices, OHLCV candlestick data.

| Endpoint | Description |
|----------|-------------|
| [getNFTFloorPriceByContract](rules/getNFTFloorPriceByContract.md) | Get the floor price of an NFT collection |
| [getNFTFloorPriceByToken](rules/getNFTFloorPriceByToken.md) | Get the floor price of a specific NFT |
| [getNFTHistoricalFloorPriceByContract](rules/getNFTHistoricalFloorPriceByContract.md) | Get the historical floor price of an NFT collection |

### Blockchain

Blocks, transactions, date-to-block conversion, and contract functions.

| Endpoint | Description |
|----------|-------------|
| [getTransaction](rules/getTransaction.md) | Get a transaction |
| [getTransactionVerbose](rules/getTransactionVerbose.md) | Get a transaction with verbose output |
| [getBlock](rules/getBlock.md) | Get the contents of a block |
| [getLatestBlockNumber](rules/getLatestBlockNumber.md) | Get the latest block number |
| [getDateToBlock](rules/getDateToBlock.md) | Find the closest block to a specific date |
| [runContractFunction](rules/runContractFunction.md) | Run a function on a smart contract |

### Discovery

Trending tokens, blue chips, market movers, and token discovery.

| Endpoint | Description |
|----------|-------------|
| [getTopERC20TokensByMarketCap](rules/getTopERC20TokensByMarketCap.md) | Get the top ERC20 tokens by market cap |
| [getTopERC20TokensByPriceMovers](rules/getTopERC20TokensByPriceMovers.md) | Get the top ERC20 tokens by price movement |
| [getTopNFTCollectionsByMarketCap](rules/getTopNFTCollectionsByMarketCap.md) | Get the top NFT collections by market cap |
| [getHottestNFTCollectionsByTradingVolume](rules/getHottestNFTCollectionsByTradingVolume.md) | Get the NFT collections with the highest trading volume |
| [getTopCryptoCurrenciesByMarketCap](rules/getTopCryptoCurrenciesByMarketCap.md) | Get the top crypto currencies by market cap |
| [getTopCryptoCurrenciesByTradingVolume](rules/getTopCryptoCurrenciesByTradingVolume.md) | Get the top crypto currencies by trading volume |
| [getRisingLiquidityTokens](rules/getRisingLiquidityTokens.md) | Get tokens with increasing liquidity |
| [getBuyingPressureTokens](rules/getBuyingPressureTokens.md) | List tokens showing strong buying activity |
| [getSolidPerformersTokens](rules/getSolidPerformersTokens.md) | Get tokens that are performing well |
| [getExperiencedBuyersTokens](rules/getExperiencedBuyersTokens.md) | Get tokens that experienced buyers are purchasing |
| [getRiskyBetsTokens](rules/getRiskyBetsTokens.md) | Get tokens that are risky investments |
| [getBlueChipTokens](rules/getBlueChipTokens.md) | Fetch established, high-value tokens |
| [getTopGainersTokens](rules/getTopGainersTokens.md) | Get the tokens with the highest gains |
| [getTopLosersTokens](rules/getTopLosersTokens.md) | Get the tokens with the highest losses |
| [getTrendingTokens](rules/getTrendingTokens.md) | Get trending tokens |
| [getDiscoveryToken](rules/getDiscoveryToken.md) | Get a discovery token |
| [getTopProfitableWalletPerToken](rules/getTopProfitableWalletPerToken.md) | Get the most profitable wallet for a token |
| [getNewTokensByExchange](rules/getNewTokensByExchange.md) | Get new tokens on an exchange |
| [getBondingTokensByExchange](rules/getBondingTokensByExchange.md) | Identify tokens in the bonding phase |
| [getGraduatedTokensByExchange](rules/getGraduatedTokensByExchange.md) | Get graduated tokens on an exchange |
| [getTokenBondingStatus](rules/getTokenBondingStatus.md) | Check if a token is in bonding phase |
| [getSnipersByPairAddress](rules/getSnipersByPairAddress.md) | Get snipers for a specific pair |
| [getVolumeStatsByChain](rules/getVolumeStatsByChain.md) | Get volume statistics by chain |
| [getVolumeStatsByCategory](rules/getVolumeStatsByCategory.md) | Get volume statistics by category |
| [getTimeSeriesVolume](rules/getTimeSeriesVolume.md) | Get time series volume data |
| [getTimeSeriesVolumeByCategory](rules/getTimeSeriesVolumeByCategory.md) | Get time series volume by category |
| [getTimeSeriesTokenAnalytics](rules/getTimeSeriesTokenAnalytics.md) | Get time series token analytics |
| [getTrendingTokensV2](rules/getTrendingTokensV2.md) | Get trending tokens (v2) |

### Security

Contract security review and analysis.

| Endpoint | Description |
|----------|-------------|
| [reviewContracts](rules/reviewContracts.md) | Review smart contracts |

### Other

Utility endpoints including API version, endpoint weights, and address resolution.

| Endpoint | Description |
|----------|-------------|
| [endpointWeights](rules/endpointWeights.md) | View the cost and rate limits for each Moralis API endpoint |
| [web3ApiVersion](rules/web3ApiVersion.md) | Get the version of the Web3 API |
| [resolveAddress](rules/resolveAddress.md) | Resolve an address |
| [resolveDomain](rules/resolveDomain.md) | Resolve a domain |
| [resolveAddressToDomain](rules/resolveAddressToDomain.md) | Resolve an address to a domain |
| [resolveENSDomain](rules/resolveENSDomain.md) | Resolve an ENS domain |

### Solana Endpoints

Solana-specific endpoints (24 total).

| Endpoint | Description |
|----------|-------------|
| [getAggregatedTokenPairStats](rules/getAggregatedTokenPairStats__solana.md) | Summarize statistics for Solana tokens |
| [getCandleSticks](rules/getCandleSticks__solana.md) | Get candlestick data for Solana |
| [getNFTMetadata](rules/getNFTMetadata__solana.md) | Get NFT metadata on Solana |
| [getNFTs](rules/getNFTs__solana.md) | Get NFTs on Solana |
| [getPairStats](rules/getPairStats__solana.md) | Get statistics for a Solana token pair |
| [getPortfolio](rules/getPortfolio__solana.md) | Get a Solana portfolio |
| [getSnipersByPairAddress](rules/getSnipersByPairAddress__solana.md) | Get snipers for a Solana pair |
| [getSPL](rules/getSPL__solana.md) | Get SPL tokens on Solana |
| [getSwapsByPairAddress](rules/getSwapsByPairAddress__solana.md) | Get swaps for a Solana pair |
| [getSwapsByTokenAddress](rules/getSwapsByTokenAddress__solana.md) | Get swaps for a Solana token |
| [getSwapsByWalletAddress](rules/getSwapsByWalletAddress__solana.md) | Get swaps for a Solana wallet |
| [getTokenMetadata](rules/getTokenMetadata__solana.md) | Get token metadata on Solana |
| [getMultipleTokenMetadata](rules/getMultipleTokenMetadata__solana.md) | Get metadata for multiple Solana tokens |
| [getTokenPairs](rules/getTokenPairs__solana.md) | Get the pairs for a Solana token |
| [getTokenPrice](rules/getTokenPrice__solana.md) | Get the price of a Solana token |
| [getMultipleTokenPrices](rules/getMultipleTokenPrices__solana.md) | Get prices of multiple Solana tokens |
| [balance](rules/balance.md) | Get the balance of a Solana address |
| [getNewTokensByExchange](rules/getNewTokensByExchange__solana.md) | Get new Solana tokens |
| [getBondingTokensByExchange](rules/getBondingTokensByExchange__solana.md) | Get bonding Solana tokens |
| [getGraduatedTokensByExchange](rules/getGraduatedTokensByExchange__solana.md) | Get graduated Solana tokens |
| [getHistoricalTokenHolders](rules/getHistoricalTokenHolders__solana.md) | Get historical holders on Solana |
| [getTokenBondingStatus](rules/getTokenBondingStatus__solana.md) | Check bonding status on Solana |
| [getTokenHolders](rules/getTokenHolders__solana.md) | Get holders of a Solana token |
| [getTopHolders](rules/getTopHolders__solana.md) | Get top holders on Solana |

## Common Pitfalls

- **Chain IDs:** Use hex (0x1, 0x89) to save API tokens, not names (eth, polygon)
- **Address format:** EVM addresses start with `0x`, Solana addresses are base58
- **Path parameters:** Replace `:address`, `:token_address` etc. with actual values
- **Streams API:** Streams uses `api.moralis-streams.com`, a different base URL

## Example Requests

```bash
# Get NFTs for an EVM wallet
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/nft?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"

# Get token price
curl "https://deep-index.moralis.io/api/v2.2/erc20/0x6B175474E89094C44Da98b954EedeAC495271d0F/price?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"

# Get wallet token balances
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/erc20?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

## Supported Chains

**EVM (40+ chains):** Ethereum (0x1), Polygon (0x89), BSC (0x38), Arbitrum (0xa4b1), Optimism (0xa), Base (0x2105), Avalanche (0xa86a), and more

**Solana:** Mainnet, Devnet

## See Also

- Endpoint reference: See individual `rules/*.md` files for detailed documentation
- Streams API: @moralis-streams-api for real-time events
