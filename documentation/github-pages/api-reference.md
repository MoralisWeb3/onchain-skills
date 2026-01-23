---
layout: default
title: API Reference
---

# API Reference

The Moralis API Skills wrap the Moralis Data APIs. Each skill corresponds to a specific domain of the API.

## EVM & Solana API Skills

These skills provide comprehensive blockchain data access for EVM chains and Solana.

| Skill | EVM Support | Solana Support | Documentation |
|-------|-------------|----------------|---------------|
| **Wallet API** | ✅ | ✅ | [Endpoints](https://github.com/noviulian/moralis-api-skills/tree/main/skills/moralis-wallet-api/references) |
| **Token API** | ✅ | ✅ | [Endpoints](https://github.com/noviulian/moralis-api-skills/tree/main/skills/moralis-token-api/references) |
| **NFT API** | ✅ | ✅ | [Endpoints](https://github.com/noviulian/moralis-api-skills/tree/main/skills/moralis-nft-api/references) |
| **Price API** | ✅ | ✅ | [Endpoints](https://github.com/noviulian/moralis-api-skills/tree/main/skills/moralis-price-api/references) |
| **DeFi API** | ✅ | ❌ | [Endpoints](https://github.com/noviulian/moralis-api-skills/tree/main/skills/moralis-defi-api/references) |
| **Blockchain API** | ✅ | ❌ | [Endpoints](https://github.com/noviulian/moralis-api-skills/tree/main/skills/moralis-blockchain-api/references) |
| **Entity API** | ✅ | ❌ | [Endpoints](https://github.com/noviulian/moralis-api-skills/tree/main/skills/moralis-entity-api/references) |
| **Utils** | ✅ | ❌ | [Endpoints](https://github.com/noviulian/moralis-api-skills/tree/main/skills/moralis-utils/references) |
| **Premium** | ✅ | ✅ | [Endpoints](https://github.com/noviulian/moralis-api-skills/tree/main/skills/moralis-premium/references) |

## Streams API Skills

Real-time blockchain event monitoring with webhooks.

| Skill | Description | Documentation |
|-------|-------------|---------------|
| **Streams API** | Real-time blockchain event monitoring | [Endpoints](https://github.com/noviulian/moralis-api-skills/tree/main/skills/moralis-streams-api/references) |

## Common Parameters

### Chain

For EVM endpoints, the `chain` parameter accepts both hex strings and common names:

- `0x1` or `eth` (Ethereum Mainnet)
- `0x89` or `polygon` (Polygon Mainnet)
- `0x38` or `bsc` (BNB Smart Chain)
- ... and many more.

> **Tip:** Using hex values (e.g., `0x1`) saves tokens as the skill doesn't need to normalize the chain name.

### Address

- **EVM:** `0x` prefixed hexadecimal string (42 characters).
- **Solana:** Base58 encoded string (32-44 characters).

The Unified Query Client automatically detects the chain type based on the address format.
