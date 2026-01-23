# EVM Wallet API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question                        | Endpoint                           | Example                        |
| ------------------------------------ | ---------------------------------- | ------------------------------ |
| "What's the ETH/balance?"            | `/:address/balance`                | Native token (ETH, MATIC, BNB) |
| "What tokens does this wallet hold?" | `/wallets/:address/tokens`         | All tokens + USD prices        |
| "What NFTs does this wallet own?"    | `/:address/nft`                    | All NFTs                       |
| "Show transaction history"           | `/wallets/:address/history`        | Full activity (all types)      |
| "Show DeFi positions"                | `/wallets/:address/defi/positions` | Liquidity, staking, lending    |
| "What's the total net worth?"        | `/wallets/:address/net-worth`      | Across all chains              |
| "Token transfers in/out?"            | `/wallets/:address/history`        | Full activity (all types)      |
| "NFT transfers?"                     | `/wallets/:address/history`        | Full activity (all types)      |
| "Token swaps?"                       | `/wallets/:address/swaps`          | DEX swap history               |
| "Token approvals?"                   | `/wallets/:address/approvals`      | Approved spenders              |

## Key Endpoint Patterns

- **Native balance**: `/:address/balance` (NOT `/wallets/:address/balance`)
- **Wallet-level data** (tokens, DeFi, swaps): `/wallets/:address/*`
- **Wallet activity history** (native, ERC20, NFT, internal): `/wallets/:address/history`
- **NFT data**: `/:address/nft*`

---

## Get Wallet History

- **Endpoint:** `GET /wallets/:address/history`
- **Description:** Get full wallet history including all activity such as ERC20 transfers, NFT transfers, internal transactions, and native transactions. This is the unified history endpoint that provides a comprehensive view of all wallet activity.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/history
- **Use this endpoint when:** User asks for "complete history", "all activity", "wallet activity summary", "everything this wallet has done", "token transfers", "ERC20 transfers", "tokens sent/received", "token transaction history", "nft transfer history"
- **Params:** `limit`, `cursor`

---

## Get Native Transactions

- **Endpoint:** `GET /:address`
- **Description:** Get native token transactions by wallet. Retrieves all native currency transfers (ETH, BNB, MATIC, etc.) for a given address.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/:address
- **Use this endpoint when:** User asks "transactions", "tx history", "native transfers", "ETH/BNB/MATIC transfers", "sent transactions", "received transactions"
- **Auto-chain:** Yes
- **Params:** `limit`, `cursor`

---

## Get Decoded Transactions

- **Endpoint:** `GET /:address/verbose`
- **Description:** Get decoded transactions by wallet with method names and parsed parameters. Provides human-readable transaction data with ABI-decoded function calls.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/:address/verbose
- **Use this endpoint when:** User asks "decoded transactions", "what functions were called", "transaction details", "verbose transactions", "parsed transactions"
- **Auto-chain:** Yes
- **Params:** `limit`, `cursor`

---

## Get ERC20 Transfers

- **Endpoint:** `GET /:address/erc20/transfers`
- **Description:** Get ERC20 transfers by wallet. Retrieves all ERC20 token transfers to and from the specified address.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/:address/erc20/transfers
- **Use this endpoint when:** User asks specifically for "ERC20 transfers", "token transfers only", "ERC20 transaction history"
- **Auto-chain:** Yes
- **Params:** `limit`, `cursor`

---

## Get NFT Transfers

- **Endpoint:** `GET /:address/nft/transfers`
- **Description:** Get NFT transfers by wallet. Retrieves all NFT transfers to and from the specified address.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/:address/nft/transfers
- **Use this endpoint when:** User asks specifically for "NFT transfers", "NFT transaction history"
- **Auto-chain:** Yes
- **Params:** `limit`, `cursor`

---

## Get NFT Trades by Wallet

- **Endpoint:** `GET /wallets/:address/nfts/trades`
- **Description:** Get NFT trades by wallet. Retrieves NFT trades (marketplace transactions) for the specified address.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/nfts/trades
- **Use this endpoint when:** User asks "NFT trades", "NFT sales", "NFT purchases", "marketplace transactions"
- **Auto-chain:** Yes
- **Params:** `limit`, `cursor`

## Get Native Balance

- **Endpoint:** `GET /:address/balance`
- **Description:** Get native balance by wallet. Retrieves the native token balance (ETH, MATIC, BNB, etc.) for a given address.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/:address/balance
- **Use this endpoint when:** User asks "how much ETH/BNB/MATIC", "what's the balance", "native token balance", "how much [chain token]"
- **⚠️ IMPORTANT:** This endpoint is `/:address/balance`, NOT `/wallets/:address/balance`
- **Auto-chain:** Yes (from ?chain parameter)

---

## Get ERC20 Token Balances

- **Endpoint:** `GET /:address/erc20`
- **Description:** Get ERC20 token balance by wallet. Retrieves all ERC20 token balances for a given address without USD pricing.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/:address/erc20
- **Use this endpoint when:** User asks "ERC20 balances", "token balances without prices", "what ERC20 tokens"
- **Auto-chain:** Yes
- **Params:** `limit`, `cursor`

---

## Get Token Balances with Prices

- **Endpoint:** `GET /wallets/:address/tokens`
- **Description:** Get Native & ERC20 token balances & prices by wallet. Retrieves all tokens held by the wallet with their USD prices and metadata.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/tokens
- **Use this endpoint when:** User asks "what tokens", "token holdings", "ERC20 tokens", "what coins does this wallet have", "show me the tokens", "tokens with prices"
- **Auto-chain:** Yes
- **Params:** `limit`, `cursor`

---

## Get Native Balances for Multiple Addresses

- **Endpoint:** `POST /wallets/balances`
- **Description:** Get native balance for multiple wallets. Retrieves native token balances for up to 25 addresses in a single request.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/balances
- **Use this endpoint when:** User asks "multiple addresses", "balances for several wallets", "check multiple addresses"
- **Auto-chain:** Yes
- **Method:** POST with body `{"wallet_addresses": ["0x...", "0x..."]}`

## Get NFTs

- **Endpoint:** `GET /:address/nft`
- **Description:** Get NFTs by wallet. Retrieves all NFTs owned by the specified address including metadata.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/:address/nft
- **Use this endpoint when:** User asks "what NFTs", "NFT collection", "what NFTs does this wallet own", "show NFTs"
- **Auto-chain:** Yes
- **Params:** `format` (decimal), `limit`, `cursor`
- **Spam Detection:** ✅

---

## Get NFT Collections

- **Endpoint:** `GET /:address/nft/collections`
- **Description:** Get NFT collections by wallet. Provides a summary of NFT collections owned by the address.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/:address/nft/collections
- **Use this endpoint when:** User asks "what NFT collections", "NFT portfolio summary", "group by collection"
- **Auto-chain:** Yes
- **Spam Detection:** ✅

## Get DeFi Summary

- **Endpoint:** `GET /wallets/:address/defi/summary`
- **Description:** Get DeFi protocols by wallet. Retrieves a summary of DeFi protocols the wallet has interacted with.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/defi/summary
- **Use this endpoint when:** User asks "DeFi summary", "what protocols", "DeFi overview", "protocol exposure"
- **Auto-chain:** Yes

---

## Get DeFi Positions

- **Endpoint:** `GET /wallets/:address/defi/positions`
- **Description:** Get DeFi positions by wallet. Retrieves detailed DeFi positions across all protocols.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/defi/positions
- **Use this endpoint when:** User asks "DeFi positions", "liquidity positions", "staking", "lending positions", "yield farming", "where is the liquidity"
- **Auto-chain:** Yes

---

## Get DeFi Positions by Protocol

- **Endpoint:** `GET /wallets/:address/defi/:protocol/positions`
- **Description:** Get detailed DeFi positions by wallet and protocol. Retrieves detailed DeFi positions for a specific protocol.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/defi/:protocol/positions
- **Use this endpoint when:** User asks "DeFi positions for specific protocol", "positions in Uniswap", "Aave positions"
- **Auto-chain:** Yes
- **Params:** `:protocol` (e.g., "uniswap-v3", "aave-v3")

---

## Get Net Worth

- **Endpoint:** `GET /wallets/:address/net-worth`
- **Description:** Get wallet net-worth. Calculates the total net worth across all chains.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/net-worth
- **Use this endpoint when:** User asks "net worth", "total value", "what's it worth", "total portfolio value", "across all chains"
- **Auto-chain:** No (aggregated)

---

## Get Wallet Profitability Summary

- **Endpoint:** `GET /wallets/:address/profitability/summary`
- **Description:** Get Wallet PnL Summary. Retrieves a summary of profit and loss metrics.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/profitability/summary
- **Use this endpoint when:** User asks "profitability summary", "PnL overview", "total profit and loss"
- **Auto-chain:** Yes

---

## Get Wallet Profitability

- **Endpoint:** `GET /wallets/:address/profitability`
- **Description:** Get Wallet PnL Breakdown. Retrieves detailed profit and loss breakdown by token and transaction.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/profitability
- **Use this endpoint when:** User asks "profitability", "PnL", "profit and loss", "gains", "performance", "detailed PnL"
- **Auto-chain:** Yes

## Get Wallet Stats

- **Endpoint:** `GET /wallets/:address/stats`
- **Description:** Get wallet stats. Retrieves comprehensive statistics about wallet activity.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/stats
- **Use this endpoint when:** User asks "wallet stats", "statistics", "wallet metrics", "activity stats"
- **Auto-chain:** Yes

---

## Get Active Chains

- **Endpoint:** `GET /wallets/:address/chains`
- **Description:** Get chain activity by wallet. Retrieves the list of chains where the wallet has activity.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/chains
- **Use this endpoint when:** User asks "what chains", "which networks", "active chains", "where does this wallet have activity"
- **Auto-chain:** No

---

## Get Token Swaps

- **Endpoint:** `GET /wallets/:address/swaps`
- **Description:** Get swaps by wallet address. Retrieves all DEX token swaps performed by the wallet.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/swaps
- **Use this endpoint when:** User asks "swaps", "token swaps", "DEX trades", "trading history", "swap history"
- **Auto-chain:** Yes
- **Params:** `limit`, `from`, `to`

---

## Get Token Approvals

- **Endpoint:** `GET /wallets/:address/approvals`
- **Description:** Get ERC20 approvals by wallet. Retrieves all token approval transactions for the wallet.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/wallets/:address/approvals
- **Use this endpoint when:** User asks "approvals", "token approvals", "what contracts are approved", "allowances", "permissions"
- **Auto-chain:** Yes

---

## Resolve Address (ENS Reverse Lookup)

- **Endpoint:** `GET /resolve/:address/reverse`
- **Description:** ENS Lookup by Address. Retrieves the ENS domain associated with an address.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/resolve/:address/reverse
- **Use this endpoint when:** User asks "ENS name", "ENS domain", "what's the ENS", "reverse resolve"
- **Auto-chain:** No

---

## Resolve ENS Domain

- **Endpoint:** `GET /resolve/ens/:domain`
- **Description:** ENS Lookup by Domain. Retrieves the address associated with an ENS domain.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/resolve/ens/:domain
- **Use this endpoint when:** User asks "resolve ENS", "ENS to address", "what address is this ENS"
- **Auto-chain:** No
- **Example:** `/resolve/ens/vitalik.eth`

---

## Resolve Address to Domain (Unstoppable)

- **Endpoint:** `GET /resolve/:address/domain`
- **Description:** Unstoppable Lookup by Address. Retrieves the Unstoppable Domain associated with an address.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/resolve/:address/domain
- **Use this endpoint when:** User asks "Unstoppable domain", "UD domain", "what's the unstoppable domain"
- **Auto-chain:** No

---

## Resolve Domain (Unstoppable)

- **Endpoint:** `GET /resolve/:domain`
- **Description:** Unstoppable Lookup by Domain. Retrieves the address associated with an Unstoppable Domain.
- **API Reference:** https://deep-index.moralis.io/api/v2.2/resolve/:domain
- **Use this endpoint when:** User asks "resolve unstoppable domain", "UD to address", "what address is this domain"
- **Auto-chain:** No
- **Example:** `/resolve/brad.crypto`

---

## Note on History Endpoint

For comprehensive wallet activity including ERC20 transfers, NFT transfers, internal transactions, and native transfers, use the unified history endpoint:

**`GET /wallets/:address/history`**

This single endpoint provides a complete view of all wallet activity.
