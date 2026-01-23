# Migration Guide: Skills-Only Layout

This guide helps you migrate from the old plugin-based layout to the new skills-only architecture.

## Overview

The repository has been simplified to use a skills-only layout compatible with `npx skills add`. This change removes the plugin/marketplace scaffolding and uses root-level `skills/` directory.

**Key Changes:**
- Plugin system removed in favor of `npx skills add`
- Skills moved from `plugins/**/skills/*` to root-level `skills/`
- API key setup changed from `/web3-api-key` to `/moralis-api-key`
- Skill names updated from `web3-*` to `moralis-*` (except `web3-shared`)

## Migration Steps

### For Users

#### Old Installation (Plugin-Based)

If you previously installed via marketplace:

```bash
# Old method (no longer recommended)
/plugin marketplace add noviulian/moralis-skills
/plugin install web3-api-skills@moralis-skills
/web3-api-key <your_api_key>
```

#### New Installation (Skills-Based)

```bash
# New method (recommended)
npx skills add noviulian/moralis-api-skills
/moralis-api-key <your_api_key>
```

#### Manual Migration

If you want to keep your current installation:

1. **Remove old plugin installation:**
```bash
# Remove plugin marketplace entry
rm -rf ~/.claude/plugins/marketplaces/moralis-skills
```

2. **Install new skills:**
```bash
# Install via npx skills add
npx skills add noviulian/moralis-api-skills
```

3. **Update API key setup:**
```bash
# Old command
/web3-api-key <your_api_key>

# New command
/moralis-api-key <your_api_key>
```

### For Developers

#### Directory Structure Changes

**Old Structure:**
```
moralis-skills/
├── .claude-plugin/
│   ├── marketplace.json
│   └── plugin.json
├── plugins/
│   ├── web3-api-skills/
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── skills/
│   │   │   ├── web3-wallet-api/
│   │   │   ├── web3-token-api/
│   │   │   └── ...
│   │   └── commands/
│   │       └── web3-api-key.md
│   └── streams-api-skills/
│       └── ...
```

**New Structure:**
```
moralis-api-skills/
├── skills/
│   ├── moralis-wallet-api/
│   ├── moralis-token-api/
│   ├── moralis-nft-api/
│   ├── moralis-streams-api/
│   ├── web3-shared/
│   ├── moralis-api-key/
│   └── ...
├── documentation/
├── scripts/
└── README.md
```

#### Skill Name Changes

| Old Name | New Name |
|----------|----------|
| `web3-wallet-api` | `moralis-wallet-api` |
| `web3-token-api` | `moralis-token-api` |
| `web3-nft-api` | `moralis-nft-api` |
| `web3-defi-api` | `moralis-defi-api` |
| `web3-entity-api` | `moralis-entity-api` |
| `web3-price-api` | `moralis-price-api` |
| `web3-blockchain-api` | `moralis-blockchain-api` |
| `web3-utils` | `moralis-utils` |
| `web3-premium` | `moralis-premium` |
| `streams-api` | `moralis-streams-api` |
| `web3-shared` | `web3-shared` (unchanged) |

#### Query Client Updates

The query client paths have been updated to reflect the new structure:

**Old path references:**
```javascript
// Old: Plugin-based paths
~/.claude/plugins/marketplaces/moralis-skills/skills/web3-wallet-api
```

**New path references:**
```javascript
// New: Skills-based paths
~/.claude/skills/moralis-wallet-api
```

## API Key Setup Changes

### Old Method

```bash
/web3-api-key <paste_key_here>
```

This command would:
- Look for `.env` in each skill directory
- Create separate `.env` files per skill

### New Method

```bash
/moralis-api-key <paste_key_here>
```

This command:
- Creates a single shared `.env` file in the skills directory parent
- All skills read from the shared `.env`
- Simpler and more maintainable

### Manual API Key Setup

**Old (Per-Skill):**
```bash
echo "MORALIS_API_KEY=your_key" > ~/.claude/skills/web3-wallet-api/.env
echo "MORALIS_API_KEY=your_key" > ~/.claude/skills/web3-token-api/.env
# ... repeat for each skill
```

**New (Shared):**
```bash
# Option 1: Use the moralis-api-key skill
/moralis-api-key your_key

# Option 2: Manually create shared .env
echo "MORALIS_API_KEY=your_key" > ~/.claude/skills/.env
```

## Breaking Changes

### Installation Method

**Before:**
```bash
/plugin marketplace add noviulian/moralis-skills
/plugin install web3-api-skills@moralis-skills
```

**After:**
```bash
npx skills add noviulian/moralis-api-skills
```

### Skill Names

All skill names changed from `web3-*` to `moralis-*` prefix.

**Before:**
- `web3-wallet-api`
- `web3-token-api`
- etc.

**After:**
- `moralis-wallet-api`
- `moralis-token-api`
- etc.

### API Key Command

**Before:**
```bash
/web3-api-key <key>
```

**After:**
```bash
/moralis-api-key <key>
```

## Compatibility

### What's Preserved

- **Zero-dependency policy:** Still using only Node.js built-in modules
- **Query client API:** Same function signatures and behavior
- **Skill functionality:** All endpoints work the same way
- **Documentation structure:** SKILL.md files maintain same format

### What Changed

- Installation method (plugin marketplace → npx skills add)
- Directory structure (plugins/ → skills/)
- Skill names (web3-* → moralis-*)
- API key command (/web3-api-key → /moralis-api-key)

## Rollback

If you need to rollback to the plugin-based version:

1. Uninstall skills:
```bash
rm -rf ~/.claude/skills/moralis-*
```

2. Install old plugin version:
```bash
git clone https://github.com/noviulian/moralis-skills.git --branch v1.1.0
# Follow old installation instructions
```

## Get Help

If you encounter issues during migration:
- Check the [GitHub Issues](https://github.com/noviulian/moralis-api-skills/issues)
- Review [CLAUDE.md](../CLAUDE.md) for detailed documentation
- Check individual skill SKILL.md files for usage examples

---

# Legacy: v1.0.1 → v1.1.0 Migration Guide

This section is preserved for historical reference.

## What's New in v1.1.0

### New Features

**Wallet API Enhancements:**
- ✨ Net worth tracking (`/wallets/:address/net-worth`)
- ✨ PnL/profitability tracking (`/wallets/:address/profitability`, `/wallets/:address/profitability/summary`)
- ✨ Wallet statistics (`/wallets/:address/stats`)
- ✨ Active chains detection (`/wallets/:address/chains`)
- ✨ ENS domain resolution (`/resolve/:domain`, `/resolve/:address/domain`)

**Token API Enhancements:**
- ✨ Token security scores (`/tokens/:tokenAddress/score`)
- ✨ DEX snipers detection (`/pairs/:address/snipers`)
- ✨ Token bonding status (`/erc20/:address/bondingStatus`)
- ✨ Token analytics (`/tokens/:address/analytics`, `/tokens/analytics/timeseries`)
- ✨ Volume timeseries (`/volume/timeseries`)
- ✨ Historical holder stats (`/erc20/:token_address/holders/historical`)
- ✨ Top profitable wallets (`/tokens/:tokenAddress/top-profitable-wallets`)

**NFT API Enhancements:**
- ✨ NFT floor price history (`/nft/:address/floor-price/historical`)

**Query Client Enhancements:**
- ✨ HTTP method support (POST, PUT, DELETE, PATCH) for Streams API
- ✨ Custom baseURL support for cross-API queries
- ✨ Auto-pagination helper (`paginate()`)
- ✨ Spam filtering helper (`createSpamFilter()`)
- ✨ Verified contract filtering (`createVerifiedFilter()`)

**New Chain Support (2025):**
- ✨ Flow (`0x54`)
- ✨ Ronin (`0x7e`)
- ✨ Lisk (`0x94`)
- ✨ Sei (`0x82`)
- ✨ Monad (`0x8f`)

**Streams API Enhancements:**
- ✨ Native balance streaming (`/streams/evm/{id}/balances`)
- ✨ Enhanced history replay capabilities

### Deprecated Endpoints (Dec 6, 2024)

The following endpoints are now deprecated:

**All Chains:**
- ❌ `/{address}/logs` - Use RPC nodes instead
- ❌ `/{address}/events` - Use RPC nodes instead
- ❌ `/block/{block_number_or_hash}/stats` - Use Streams API
- ❌ `/nft/{address}/{token_id}/stats` - Use Streams API
- ❌ `/transaction/{transaction_hash}/internal-transactions` - Use `include=internal_transactions` parameter

**Gnosis Chain Only:**
- ❌ All NFT API endpoints removed due to spam issues

## Breaking Changes

### None (Backward Compatible)

v1.1.0 is fully backward compatible with v1.0.x. All existing code will continue to work.

## Upgrading Your Code

### Update to Skills-Only Layout

If you previously installed via marketplace, migrate to the new skills-based layout:

```bash
# Install the latest version using npx skills add
npx skills add noviulian/moralis-api-skills
/moralis-api-key <your_api_key>
```

See the [Migration Guide](#migration-guide-skills-only-layout) above for detailed migration steps.

### Using New Features

#### Wallet Net Worth

```javascript
const { q } = require('./query');

// Get total portfolio value across all chains
q('/wallets/:address/net-worth', { address: '0x123...' })
  .then(r => console.log('Net Worth:', r.total_net_worth_usd, 'USD'));
```

#### Wallet PnL Tracking

```javascript
// Detailed PnL data
q('/wallets/:address/profitability', { address: '0x123...' })
  .then(r => console.log('PnL:', r.results));

// PnL summary
q('/wallets/:address/profitability/summary', { address: '0x123...' })
  .then(r => console.log('Total PnL:', r.total_profit_loss));
```

#### Token Security Score

```javascript
q('/tokens/:tokenAddress/score', { address: '0xabc...' })
  .then(r => console.log('Token Score:', r));
```

#### DEX Snipers Detection

```javascript
q('/pairs/:address/snipers', { address: '0xpair...' })
  .then(r => console.log('Snipers:', r.result));
```

#### Auto-Pagination Helper

```javascript
const { paginate } = require('./query');

// Get all NFTs automatically
const allNFTs = await paginate('/:address/nft', { address: '0x123...' });
```

#### Spam Filtering

```javascript
const { createSpamFilter } = require('./query');

q('/wallets/:address/tokens', {
  address: '0x123...',
  params: createSpamFilter({ excludeSpam: true, onlyVerified: true })
});
```

## New Chain Usage

```javascript
// Flow
q('/:address/balance', { address: '0x123...', chain: 'flow' })

// Ronin
q('/:address/balance', { address: '0x123...', chain: 'ronin' })

// Lisk
q('/:address/balance', { address: '0x123...', chain: 'lisk' })

// Sei
q('/:address/balance', { address: '0x123...', chain: 'sei' })

// Monad
q('/:address/balance', { address: '0x123...', chain: 'monad' })
```

## Deprecated Endpoint Replacements

### `/transaction/{hash}/internal-transactions` → `include=internal_transactions`

**Before (deprecated):**
```javascript
q('/transaction/:hash/internal-transactions', { address: '0xabc...' })
```

**After:**
```javascript
q('/transaction/:hash', {
  address: '0xabc...',
  params: { include: 'internal_transactions' }
})
```

### `/block/{block}/stats` → Use Streams API

**Before (deprecated):**
```javascript
q('/block/:block_number_or_hash/stats', { params: { chain: 'eth' } })
```

**After (create stream for real-time monitoring):**
```javascript
// Use Streams API instead
streamsApi.query('/streams/evm', {
  method: 'PUT',
  body: {
    webhookUrl: 'https://your-webhook.com',
    chainIds: ['0x1'],
    includeNativeTxs: true
  }
})
```

## Testing Your Upgrade

After upgrading, verify your installation:

```bash
# Test all skills load
./scripts/test-all-skills.sh

# Test query client with new features
cd plugins/web3-api-skills/skills/web3-wallet-api
node -e "const { paginate, createSpamFilter } = require('./query'); console.log('v1.1.0 features loaded:', typeof paginate, typeof createSpamFilter)"
```

## Rollback

If you need to rollback to v1.0.1:

```bash
# Install previous version
/plugin install web3-api-skills@moralis-skills@1.0.1
/plugin install streams-api-skills@moralis-skills@1.0.0
```

## Get Help

If you encounter issues during migration:
- Check the [GitHub Issues](https://github.com/noviulian/moralis-skills/issues)
- Review [CLAUDE.md](../CLAUDE.md) for detailed documentation
- Check individual skill SKILL.md files for usage examples

## Summary

v1.1.0 is a feature-rich update that adds powerful analytics, security features, and chain support while maintaining full backward compatibility. No code changes are required for existing functionality.
