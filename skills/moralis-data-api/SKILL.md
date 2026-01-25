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
| [getNativeBalance](rules/getNativeBalance.md) | Get native balance by wallet |
| [getNativeBalancesForAddresses](rules/getNativeBalancesForAddresses.md) | Get native balance for a set of wallets |
| [getWalletActiveChains](rules/getWalletActiveChains.md) | Get active chains by wallet address |
| [getWalletApprovals](rules/getWalletApprovals.md) | Get ERC20 approvals by wallet |
| [getWalletHistory](rules/getWalletHistory.md) | Get the complete decoded transaction history of a wallet |
| [getWalletNetWorth](rules/getWalletNetWorth.md) | Get wallet net worth |
| [getWalletNFTCollections](rules/getWalletNFTCollections.md) | Get NFT collections by wallet address |
| [getWalletNFTs](rules/getWalletNFTs.md) | Get NFTs by wallet address |
| [getWalletNFTTransfers](rules/getWalletNFTTransfers.md) | Get NFT Transfers by wallet address |
| [getWalletProfitability](rules/getWalletProfitability.md) | Get detailed profit and loss by wallet address |
| [getWalletProfitabilitySummary](rules/getWalletProfitabilitySummary.md) | Get profit and loss summary by wallet address |
| [getWalletStats](rules/getWalletStats.md) | Get summary stats by wallet address |
| [getWalletTokenBalances](rules/getWalletTokenBalances.md) | Get ERC20 token balances by wallet |
| [getWalletTokenBalancesPrice](rules/getWalletTokenBalancesPrice.md) | Get token balances with prices by wallet address |
| [getWalletTokenTransfers](rules/getWalletTokenTransfers.md) | Get ERC20 token transfers by wallet address |
| [getWalletTransactions](rules/getWalletTransactions.md) | Get native transactions by wallet |
| [getWalletTransactionsVerbose](rules/getWalletTransactionsVerbose.md) | Get decoded transactions by wallet |

### Token

Token prices, metadata, pairs, DEX swaps, analytics, security scores, and sniper detection.

| Endpoint | Description |
|----------|-------------|
| [getAggregatedTokenPairStats](rules/getAggregatedTokenPairStats__evm.md) | Get aggregated token pair statistics by address |
| [getHistoricalTokenScore](rules/getHistoricalTokenScore.md) | Get historical token score by token address |
| [getMultipleTokenAnalytics](rules/getMultipleTokenAnalytics.md) | Get token analytics for a list of token addresses |
| [getPairAddress](rules/getPairAddress.md) | Get DEX token pair address |
| [getPairReserves](rules/getPairReserves.md) | Get DEX token pair reserves |
| [getPairStats](rules/getPairStats__evm.md) | Get stats by pair address |
| [getSnipersByPairAddress](rules/getSnipersByPairAddress__evm.md) | Get snipers by pair address |
| [getSwapsByPairAddress](rules/getSwapsByPairAddress__evm.md) | Get swap transactions by pair address |
| [getSwapsByTokenAddress](rules/getSwapsByTokenAddress__evm.md) | Get swap transactions by token address |
| [getSwapsByWalletAddress](rules/getSwapsByWalletAddress__evm.md) | Get swap transactions by wallet address |
| [getTimeSeriesTokenAnalytics](rules/getTimeSeriesTokenAnalytics.md) | Retrieve timeseries trading stats by token addresses |
| [getTokenAnalytics](rules/getTokenAnalytics.md) | Get token analytics by token address |
| [getTokenBondingStatus](rules/getTokenBondingStatus__evm.md) | Get the token bonding status |
| [getTokenCategories](rules/getTokenCategories.md) | Get ERC20 token categories |
| [getTokenHolders](rules/getTokenHolders__evm.md) | Get a holders summary by token address |
| [getTokenMetadata](rules/getTokenMetadata__evm.md) | Get ERC20 token metadata by contract |
| [getTokenMetadataBySymbol](rules/getTokenMetadataBySymbol.md) | Get ERC20 token metadata by symbols |
| [getTokenOwners](rules/getTokenOwners.md) | Get ERC20 token owners by contract |
| [getTokenPairs](rules/getTokenPairs__evm.md) | Get token pairs by address |
| [getTokenScore](rules/getTokenScore.md) | Get token score by token address |
| [getTokenStats](rules/getTokenStats.md) | Get ERC20 token stats |
| [getTokenTransfers](rules/getTokenTransfers.md) | Get ERC20 token transfers by contract address |

### NFT

NFT metadata, transfers, traits, rarity, floor prices, and trades.

| Endpoint | Description |
|----------|-------------|
| [getContractNFTs](rules/getContractNFTs.md) | Get NFTs by contract address |
| [getHottestNFTCollectionsByTradingVolume](rules/getHottestNFTCollectionsByTradingVolume.md) | Get top NFT collections by trading volume |
| [getMultipleNFTs](rules/getMultipleNFTs.md) | Get Metadata for NFTs |
| [getNFTBulkContractMetadata](rules/getNFTBulkContractMetadata.md) | Get metadata for multiple NFT contracts |
| [getNFTByContractTraits](rules/getNFTByContractTraits.md) | Get NFTs by traits |
| [getNFTCollectionStats](rules/getNFTCollectionStats.md) | Get summary stats by NFT collection |
| [getNFTContractMetadata](rules/getNFTContractMetadata.md) | Get NFT collection metadata |
| [getNFTContractSalePrices](rules/getNFTContractSalePrices.md) | Get NFT sale prices by collection |
| [getNFTContractTransfers](rules/getNFTContractTransfers.md) | Get NFT transfers by contract address |
| [getNFTFloorPriceByContract](rules/getNFTFloorPriceByContract.md) | Get NFT floor price by contract |
| [getNFTFloorPriceByToken](rules/getNFTFloorPriceByToken.md) | Get NFT floor price by token |
| [getNFTHistoricalFloorPriceByContract](rules/getNFTHistoricalFloorPriceByContract.md) | Get historical NFT floor price by contract |
| [getNFTMetadata](rules/getNFTMetadata__evm.md) | Get NFT metadata |
| [getNFTOwners](rules/getNFTOwners.md) | Get NFT owners by contract address |
| [getNFTSalePrices](rules/getNFTSalePrices.md) | Get NFT sale prices by token |
| [getNFTTokenIdOwners](rules/getNFTTokenIdOwners.md) | Get NFT owners by token ID |
| [getNFTTrades](rules/getNFTTrades.md) | Get NFT trades by collection |
| [getNFTTradesByToken](rules/getNFTTradesByToken.md) | Get NFT trades by token |
| [getNFTTradesByWallet](rules/getNFTTradesByWallet.md) | Get NFT trades by wallet address |
| [getNFTTraitsByCollection](rules/getNFTTraitsByCollection.md) | Get NFT traits by collection |
| [getNFTTraitsByCollectionPaginate](rules/getNFTTraitsByCollectionPaginate.md) | Get NFT traits by collection paginate |
| [getNFTTransfers](rules/getNFTTransfers.md) | Get NFT transfers by token ID |
| [getTopNFTCollectionsByMarketCap](rules/getTopNFTCollectionsByMarketCap.md) | Get top NFT collections by market cap |
| [resyncNFTRarity](rules/resyncNFTRarity.md) | Resync NFT Trait |
| [syncNFTContract](rules/syncNFTContract.md) | Resync NFT Contract |

### DeFi

DeFi protocol positions, liquidity, and exposure data.

| Endpoint | Description |
|----------|-------------|
| [getDefiPositionsByProtocol](rules/getDefiPositionsByProtocol.md) | Get detailed DeFi positions by protocol for a wallet |
| [getDefiPositionsSummary](rules/getDefiPositionsSummary.md) | Get DeFi positions of a wallet |
| [getDefiSummary](rules/getDefiSummary.md) | Get the DeFi summary of a wallet |

### Entity

Labeled addresses including exchanges, funds, protocols, and whales.

| Endpoint | Description |
|----------|-------------|
| [getEntity](rules/getEntity.md) | Get Entity Details By Id |
| [getEntityCategories](rules/getEntityCategories.md) | Get Entity Categories |

### Price

Token and NFT prices, OHLCV candlestick data.

| Endpoint | Description |
|----------|-------------|
| [getMultipleTokenPrices](rules/getMultipleTokenPrices__evm.md) | Get Multiple ERC20 token prices |
| [getPairCandlesticks](rules/getPairCandlesticks.md) | Get OHLCV by pair address |
| [getPairPrice](rules/getPairPrice.md) | Get DEX token pair price |
| [getTokenPrice](rules/getTokenPrice__evm.md) | Get ERC20 token price |

### Blockchain

Blocks, transactions, date-to-block conversion, and contract functions.

| Endpoint | Description |
|----------|-------------|
| [getBlock](rules/getBlock.md) | Get block by hash |
| [getDateToBlock](rules/getDateToBlock.md) | Get block by date |
| [getLatestBlockNumber](rules/getLatestBlockNumber.md) | Get latest block number |
| [getTransaction](rules/getTransaction.md) | Get transaction by hash |
| [getTransactionVerbose](rules/getTransactionVerbose.md) | Get decoded transaction by hash |
| [reviewContracts](rules/reviewContracts.md) | Review contracts |
| [runContractFunction](rules/runContractFunction.md) | Run contract function |

### Discovery

Trending tokens, blue chips, market movers, and token discovery.

| Endpoint | Description |
|----------|-------------|
| [getBlueChipTokens](rules/getBlueChipTokens.md) | Get tokens with blue chip |
| [getBuyingPressureTokens](rules/getBuyingPressureTokens.md) | Get tokens with buying pressure |
| [getDiscoveryToken](rules/getDiscoveryToken.md) | Get token details |
| [getRisingLiquidityTokens](rules/getRisingLiquidityTokens.md) | Get tokens with rising liquidity |
| [getRiskyBetsTokens](rules/getRiskyBetsTokens.md) | Get tokens with risky bets |
| [getSolidPerformersTokens](rules/getSolidPerformersTokens.md) | Get tokens with solid performance |
| [getTimeSeriesVolume](rules/getTimeSeriesVolume.md) | Retrieve timeseries trading stats by chain |
| [getTimeSeriesVolumeByCategory](rules/getTimeSeriesVolumeByCategory.md) | Retrieve timeseries trading stats by category |
| [getTopCryptoCurrenciesByMarketCap](rules/getTopCryptoCurrenciesByMarketCap.md) | Get top crypto currencies by market cap |
| [getTopCryptoCurrenciesByTradingVolume](rules/getTopCryptoCurrenciesByTradingVolume.md) | Get top crypto currencies by trading volume |
| [getTopERC20TokensByMarketCap](rules/getTopERC20TokensByMarketCap.md) | Get top ERC20 tokens by market cap |
| [getTopERC20TokensByPriceMovers](rules/getTopERC20TokensByPriceMovers.md) | Get top ERC20 tokens by price movements (winners and losers) |
| [getTopGainersTokens](rules/getTopGainersTokens.md) | Get tokens with top gainers |
| [getTopLosersTokens](rules/getTopLosersTokens.md) | Get tokens with top losers |
| [getTopProfitableWalletPerToken](rules/getTopProfitableWalletPerToken.md) | Get top traders for a given ERC20 token |
| [getTrendingTokens](rules/getTrendingTokens.md) | Get trending tokens |
| [getTrendingTokensV2](rules/getTrendingTokensV2.md) | Get trending tokens |
| [getVolumeStatsByCategory](rules/getVolumeStatsByCategory.md) | Get trading stats by categories |
| [getVolumeStatsByChain](rules/getVolumeStatsByChain.md) | Get trading stats by chain |

### Other

Utility endpoints including API version, endpoint weights, and address resolution.

| Endpoint | Description |
|----------|-------------|
| [endpointWeights](rules/endpointWeights.md) | Get weights of endpoints |
| [getBondingTokensByExchange](rules/getBondingTokensByExchange__evm.md) | Get bonding tokens by exchange |
| [getEntitiesByCategory](rules/getEntitiesByCategory.md) | Get Entities By Category |
| [getExperiencedBuyersTokens](rules/getExperiencedBuyersTokens.md) | Get tokens with experienced buyers |
| [getFilteredTokens](rules/getFilteredTokens.md) | Returns a list of tokens that match the specified filters and criteria |
| [getGraduatedTokensByExchange](rules/getGraduatedTokensByExchange__evm.md) | Get graduated tokens by exchange |
| [getHistoricalTokenHolders](rules/getHistoricalTokenHolders__evm.md) | Get timeseries holders data |
| [getNewTokensByExchange](rules/getNewTokensByExchange__evm.md) | Get new tokens by exchange |
| [getUniqueOwnersByCollection](rules/getUniqueOwnersByCollection.md) | Get unique wallet addresses owning NFTs from a contract. |
| [resolveAddress](rules/resolveAddress.md) | ENS lookup by address |
| [resolveAddressToDomain](rules/resolveAddressToDomain.md) | Resolve Address to Unstoppable domain |
| [resolveDomain](rules/resolveDomain.md) | Resolve Unstoppable domain |
| [resolveENSDomain](rules/resolveENSDomain.md) | ENS lookup by domain |
| [reSyncMetadata](rules/reSyncMetadata.md) | Resync NFT metadata |
| [searchEntities](rules/searchEntities.md) | Search Entities, Organizations or Wallets |
| [searchTokens](rules/searchTokens.md) | Search for tokens based on contract address, pair address, token name or token s |
| [web3ApiVersion](rules/web3ApiVersion.md) | Get API version |

### Solana Endpoints

Solana-specific endpoints (24 total).

| Endpoint | Description |
|----------|-------------|
| [balance](rules/balance__solana.md) | Gets native balance owned by the given address |
| [getAggregatedTokenPairStats](rules/getAggregatedTokenPairStats__solana.md) | Get aggregated token pair statistics by address |
| [getBondingTokensByExchange](rules/getBondingTokensByExchange__solana.md) | Get bonding tokens by exchange |
| [getCandleSticks](rules/getCandleSticks__solana.md) | Get candlesticks for a pair address |
| [getGraduatedTokensByExchange](rules/getGraduatedTokensByExchange__solana.md) | Get graduated tokens by exchange |
| [getHistoricalTokenHolders](rules/getHistoricalTokenHolders__solana.md) | Get token holders overtime for a given tokens |
| [getMultipleTokenMetadata](rules/getMultipleTokenMetadata__solana.md) | Get multiple token metadata |
| [getMultipleTokenPrices](rules/getMultipleTokenPrices__solana.md) | Get token price |
| [getNFTMetadata](rules/getNFTMetadata__solana.md) | Get the global metadata for a given contract |
| [getNFTs](rules/getNFTs__solana.md) | Gets NFTs owned by the given address |
| [getNewTokensByExchange](rules/getNewTokensByExchange__solana.md) | Get new tokens by exchange |
| [getPairStats](rules/getPairStats__solana.md) | Get stats for a pair address |
| [getPortfolio](rules/getPortfolio__solana.md) | Gets the portfolio of the given address |
| [getSPL](rules/getSPL__solana.md) | Gets token balances owned by the given address |
| [getSnipersByPairAddress](rules/getSnipersByPairAddress__solana.md) | Get snipers by pair address. |
| [getSwapsByPairAddress](rules/getSwapsByPairAddress__solana.md) | Get all swap related transactions (buy, sell, add liquidity & remove liquidity) |
| [getSwapsByTokenAddress](rules/getSwapsByTokenAddress__solana.md) | Get all swap related transactions (buy, sell) |
| [getSwapsByWalletAddress](rules/getSwapsByWalletAddress__solana.md) | Get all swap related transactions (buy, sell) for a specific wallet address. |
| [getTokenBondingStatus](rules/getTokenBondingStatus__solana.md) | Get Token Bonding Status |
| [getTokenHolders](rules/getTokenHolders__solana.md) | Get the summary of holders for a given token token. |
| [getTokenMetadata](rules/getTokenMetadata__solana.md) | Get Token metadata |
| [getTokenPairs](rules/getTokenPairs__solana.md) | Get token pairs by address |
| [getTokenPrice](rules/getTokenPrice__solana.md) | Get token price |
| [getTopHolders](rules/getTopHolders__solana.md) | Get paginated top holders for a given token. |

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
