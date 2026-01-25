# Release Notes

## Version 3.0.0 (Consolidated Skills, REST-First)

### Highlights

- ✅ **2 consolidated skills** - `moralis-data-api` and `moralis-streams-api`
- ✅ **REST-first usage** - Use curl/native HTTP clients; no bundled `query.js`
- ✅ **Rules-based docs** - All endpoints documented under `skills/*/rules/`
- ✅ **API key manager** - `/moralis-api-key` configures shared `.env`

### Migration Notes

- Replace any `query.js` usage with REST calls from the `rules/` docs
- Use `/moralis-api-key` or shared `.env` in the skills parent directory

---

## Version 2.0.0 (Breaking Change - Skills-Only Architecture)

### Breaking Changes

**⚠️ Installation method has changed from plugin marketplace to skills-only.**

If you're upgrading from v1.x, see [Migration Guide](documentation/MIGRATION_GUIDE.md) for detailed instructions.

**Old Installation (v1.x) - NO LONGER SUPPORTED:**

```bash
/plugin marketplace add noviulian/moralis-skills
/plugin install web3-api-skills@moralis-skills
/web3-api-key <your_api_key>
```

**New Installation (v2.0.0) - USE THIS:**

```bash
npx skills add noviulian/moralis-api-skills
/moralis-api-key <your_api_key>
```

### What Changed

- ✅ **Simplified installation** - Single `npx skills add` command
- ✅ **Skills-only architecture** - No plugin marketplace dependency
- ✅ **Root-level skills directory** - Direct access to all skills
- ✅ **Updated command** - `/moralis-api-key` replaces `/web3-api-key`
- ✅ **Better compatibility** - Aligns with Claude Code skills ecosystem

### Migration Steps for Existing Users

1. **Remove old plugin installation:**

```bash
rm -rf ~/.claude/plugins/marketplaces/moralis-skills
rm -rf ~/.claude/plugins/cache/moralis-skills
```

2. **Install new skills:**

```bash
npx skills add noviulian/moralis-api-skills
```

3. **Set your API key with new command:**

```bash
/moralis-api-key <your_api_key>
```

### Features Unchanged

All 15 skills and API functionality remain the same:

- ✅ 9 Web3 API skills (EVM + Solana)
- ✅ 3 Premium skills (Analytics, Score, Sniper)
- ✅ 1 Streams API skill
- ✅ 1 API key manager skill
- ✅ Shared utilities (web3-shared)
- ✅ Zero external dependencies
- ✅ Auto blockchain detection
- ✅ Chain name to hex conversion

### Documentation

- [Migration Guide](documentation/MIGRATION_GUIDE.md) - Detailed migration instructions
- [README.md](README.md) - Updated installation instructions
- [Installation Guide](documentation/github-pages/installation.md) - Step-by-step setup

---

## Version 1.0.1

### Fixes

- ✅ **Fixed API key setup** - Now sets the API key in both plugin source directory and cache directory to ensure skills work correctly after installation
- ✅ **Updated documentation** - Separated installation commands into 3 easy-to-copy steps with clear restart instruction

### Installation (Updated)

**Step 1:** Add the marketplace

```bash
/plugin marketplace add noviulian/moralis-skills
```

**Step 2:** Install the plugin

```bash
/plugin install web3-api-skills@moralis-skills
```

**Step 3:** Restart Claude Code, then set your API key

```bash
/web3-api-key <paste your API key here>
```

---

## Version 1.0.0 (Initial Release)

### Features

- ✅ **9 Skills** for comprehensive Web3 data access
- ✅ **Dual Blockchain Support** - EVM and Solana
- ✅ **Zero Dependencies** - Pure Node.js built-in modules
- ✅ **Plug and Play** - Install and use in under 30 seconds

### Skills Included

1. **Web3 Wallet API** - Balances, history, NFTs, DeFi positions
2. **Web3 Token API** - Prices, metadata, swaps, Pump.fun support
3. **Web3 NFT API** - Metadata, traits, rarity, transfers
4. **Web3 Price API** - Token and NFT pricing, OHLCV
5. **Web3 DeFi API** - Protocol positions (EVM only)
6. **Web3 Entity API** - Labeled addresses (EVM only)
7. **Web3 Blockchain API** - Blocks and transactions (EVM only)
8. **Web3 Utils** - API utilities (EVM only)
9. **Web3 Premium** - Advanced analytics (EVM + Solana)

### Supported Chains

**EVM:** Ethereum, Polygon, BSC, Arbitrum, Optimism, Avalanche, Fantom, and more

**Solana:** Mainnet, Devnet

### Installation

```bash
/plugin marketplace add noviulian/moralis-skills
/plugin install web3-api-skills@moralis-skills
/web3-api-key
```

### Documentation

- [README.md](README.md)
- [Implementation Plan](IMPLEMENTATION_PLAN.md)
- **Get API Key:** Register at [admin.moralis.io/register](https://admin.moralis.io/register), then get your key at [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)
- [Moralis EVM API Docs](https://deep-index.moralis.io/api-docs-2.2/)
- [Moralis Solana API Docs](https://solana-gateway.moralis.io/api/)

### Requirements

- Node.js (built-in modules only)
- **Moralis API key:** Register at [admin.moralis.io/register](https://admin.moralis.io/register), then get your key at [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)

### Known Limitations

- DeFi API: EVM chains only
- Entity API: EVM chains only
- Blockchain API: EVM chains only
- Utils: EVM chains only

### License

MIT License - see [LICENSE](LICENSE)
