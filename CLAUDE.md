# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Moralis API Skills** is a collection of modular skills for Moralis API integration with Claude Code. It provides 13 skills for Web3 blockchain data (EVM chains + Solana) plus real-time event monitoring.

**Skills included:**
- **moralis-wallet-api** - Wallet balances, tokens, NFTs, DeFi positions
- **moralis-token-api** - Token prices, metadata, DEX pairs, swaps
- **moralis-nft-api** - NFT metadata, transfers, traits, rarity
- **moralis-defi-api** - Protocol positions and exposure
- **moralis-entity-api** - Labeled addresses/entities
- **moralis-price-api** - Token/NFT prices, OHLCV data
- **moralis-blockchain-api** - Blocks and transactions
- **moralis-utils** - API version, endpoint weights
- **moralis-premium** - Advanced analytics endpoints
- **moralis-analytics-api** - Token analytics and volume timeseries
- **moralis-score-api** - Token security scores
- **moralis-sniper-api** - DEX snipers detection
- **moralis-streams-api** - Real-time blockchain event monitoring

**Key Design Principle: ZERO external dependencies - uses only Node.js built-in modules (https, fs, path, url, crypto).**

## Commands

### API Key Setup (Required before use)

```bash
/moralis-api-key <your_api_key_here>
```

This command sets the Moralis API key for all skills at once by updating the `.env` file in the skills directory.

Get your API key:
1. Register at https://admin.moralis.io/register (free)
2. Get your key at https://admin.moralis.com/api-keys

### Testing

```bash
# Test all skills load correctly
./scripts/test-all-skills.sh

# Test installation flow
./scripts/test-installation.sh

# Test individual skill queries (requires API key)
cd skills/moralis-wallet-api
node -e "const { query } = require('./query'); query('/:address/balance', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }).then(console.log)"
```

### Skills Installation

```bash
# Add skills from repository
npx skills add noviulian/moralis-api-skills

# List available skills
npx skills add noviulian/moralis-api-skills --list
```

Skills are installed to:
- Project level: `<project>/.claude/skills/`
- Global: `~/.claude/skills/`

## Architecture

### Skills-Only Structure

```
moralis-api-skills/
├── skills/                         # Root-level skills directory
│   ├── web3-shared/                # ⭐ Unified query client
│   │   └── query.js
│   ├── moralis-wallet-api/         # Wallet balances, tokens, NFTs
│   ├── moralis-token-api/          # Token prices, metadata, DEX
│   ├── moralis-nft-api/            # NFT metadata, transfers
│   ├── moralis-defi-api/           # Protocol positions
│   ├── moralis-entity-api/         # Labeled addresses
│   ├── moralis-price-api/          # Token/NFT prices, OHLCV
│   ├── moralis-blockchain-api/     # Blocks and transactions
│   ├── moralis-utils/              # API version, weights
│   ├── moralis-premium/            # Advanced analytics
│   ├── moralis-analytics-api/      # Token analytics
│   ├── moralis-score-api/          # Security scores
│   ├── moralis-sniper-api/         # DEX snipers
│   ├── moralis-streams-api/        # Real-time event monitoring
│   └── moralis-api-key/            # API key setup skill
│
├── documentation/                  # Anthropic docs, guides
├── scripts/                        # Testing scripts
└── swagger/                        # API swagger files
```

### Unified Query Client (`skills/web3-shared/query.js`)

All web3-api-skills share a single query client that provides:

**Key Features:**
- **Auto blockchain detection:** EVM (0x addresses) vs Solana (base58 addresses)
- **Chain name to hex conversion:** Saves API tokens by converting "eth" → "0x1", "polygon" → "0x89"
- **HTTP method support:** GET, POST, PUT, DELETE, PATCH for Streams API and future endpoints
- **Custom baseURL support:** Query cross-API endpoints (e.g., Streams API from web3 skills)
- **Path parameter replacement:** `/:address` becomes actual address in URL
- **Date/time to block conversion:** Convert timestamps to block numbers
- **Token search:** Find tokens by symbol
- **Pagination support:** Handle large result sets
- **Spam filtering:** `createSpamFilter()` helper for excluding spam/unverified tokens
- **Verified filtering:** `createVerifiedFilter()` helper for verified contracts
- **Auto-pagination:** `paginate()` helper for cursor-based pagination loops
- **Zero dependencies:** Pure Node.js built-in modules

**New Helper Functions (v1.1.0):**
```javascript
// Cursor-based pagination
const allNFTs = await paginate('/:address/nft', { address: '0x123...' });

// Spam filtering
query('/wallets/:address/tokens', {
  address: '0x123...',
  params: createSpamFilter({ excludeSpam: true, onlyVerified: true })
});

// Verified contracts only
query('/nft/:address', {
  address: '0xabc...',
  params: createVerifiedFilter({ onlyVerified: true })
});
```

**Chain Detection:**
```javascript
// EVM address (0x prefix, 42 chars)
query('/:address/balance', { address: '0x1234...' })  // → EVM API

// Solana address (base58, 32-44 chars, no 0x)
query('/:address/balance', { address: '742d35Cc66...' })  // → Solana API
```

**Each skill's `query.js` simply re-exports:**
```javascript
module.exports = require("../web3-shared/query");
```

### Skill Structure

Each skill follows the Agent Skills standard:

```
moralis-wallet-api/
├── SKILL.md             # Skill metadata + usage documentation
├── query.js             # Re-exports from web3-shared
└── references/          # Detailed endpoint documentation
    ├── EVM_ENDPOINTPOINTS.md
    └── SOLANA_ENDPOINTPOINTS.md
```

**SKILL.md Frontmatter (required):**
```yaml
---
name: moralis-wallet-api
description: Query wallet data...
license: MIT
compatibility: Requires Node.js (built-in modules only)
metadata:
  version: "1.0.0"
  author: moralis-skills
  tags: [web3, blockchain, wallet, crypto]
---
```

### API Endpoint Patterns

**EVM API:**
- Base URL: `https://deep-index.moralis.io/api/v2.2/`
- Chain parameter: `?chain=eth`, `?chain=0x1`, `?chain=polygon`
- Addresses: `0x...` format (42 characters)

**Solana API:**
- Base URL: `https://solana-gateway.moralis.io/`
- Network: `/mainnet/` or `/devnet/` in path
- Addresses: Base58 encoded (32-44 characters)

**Streams API:**
- Base URL: `https://api.moralis-streams.com/`
- Uses PUT for create, POST for update, DELETE for delete
- Webhook-based event streaming

**Common Pitfalls:**
- Native balance uses `/:address/balance`, NOT `/wallets/:address/balance`
- Use hex chain IDs to save tokens: `0x1` instead of `eth`, `0x89` instead of `polygon`
- Path parameters like `:address` are automatically replaced by the query client
- Streams API requires `limit` parameter on GET endpoints (max 100)
- Stream IDs are UUIDs, not hex strings

## Available Skills

### Core Web3 Skills

- **moralis-wallet-api** - Wallet balances, tokens, NFTs, DeFi positions
  - Net worth, PnL tracking, wallet stats, chain activity, ENS domain resolution
- **moralis-token-api** - Token prices, metadata, DEX pairs, swaps
  - Token security scores, DEX snipers detection, bonding status, analytics
- **moralis-nft-api** - NFT metadata, transfers, traits, rarity
  - NFT floor price history
- **moralis-defi-api** - Protocol positions and exposure
- **moralis-entity-api** - Labeled addresses/entities
- **moralis-price-api** - Token/NFT prices, OHLCV data
  - NFT contract sale prices
- **moralis-blockchain-api** - Blocks and transactions
- **moralis-utils** - API version, endpoint weights

### Advanced Skills

- **moralis-premium** - Advanced analytics endpoints
- **moralis-analytics-api** - Token analytics and volume timeseries
- **moralis-score-api** - Token security scores
- **moralis-sniper-api** - DEX snipers detection

### Streaming

- **moralis-streams-api** - Real-time blockchain event monitoring

**Key Capabilities:**
- Create and manage streams (create, update, delete, get)
- Add/remove addresses to streams
- Update stream status (pause/resume)
- Monitor transactions, logs, token transfers, NFT transfers, internal transactions
- Get stream history and block data
- Webhook event delivery

**Stream Types:**
- `tx` - Native transactions
- `log` - Contract event logs
- `erc20transfer` - ERC20 token transfers
- `erc20approval` - ERC20 approvals
- `nfttransfer` - NFT transfers
- `internalTx` - Internal transactions

## Adding a New Skill

1. Create skill directory: `mkdir skills/moralis-your-skill`
2. Create `SKILL.md` with proper frontmatter
3. Create `query.js` that re-exports from web3-shared
4. Add reference documentation in `references/`
5. Test with real API calls

**SKILL.md guidelines:**
- Keep under 500 lines (token efficiency)
- Include "When to Use This Skill" section
- Include "Common Pitfalls" section
- Show practical query examples
- Use `$SKILL_DIR` for path references

## Zero Dependencies Policy

**CRITICAL:** This skills collection MUST NOT add external npm dependencies.

**✅ Allowed (Node.js built-in):**
- `https`, `http` - API requests
- `fs` - File system operations
- `path` - Path manipulation
- `url` - URL parsing
- `crypto` - Cryptographic operations

**❌ NOT allowed:**
- `axios`, `node-fetch` - Use `https` module instead
- `dotenv` - Use custom `.env` reading in query.js
- `express`, `commander` - Not needed for skills

## Important Files

- **`.env`** - Contains `MORALIS_API_KEY` (created by `/moralis-api-key` skill, in .gitignore)
- **`skills/web3-shared/query.js`** - Unified query client for all web3 skills
- **`skills/moralis-api-key/SKILL.md`** - API key setup skill
- **`scripts/test-all-skills.sh`** - Validates all skills load correctly
- **`CONTRIBUTING.md`** - Guidelines for contributors

## API Key Management

The `/moralis-api-key` skill updates `.env` file intelligently:
- Preserves existing environment variables
- Adds or updates `MORALIS_API_KEY` line
- Works across all installation methods (npx skills add, manual, global)

The query client searches upward from skill directory to find `.env` file, allowing flexible installation locations.
