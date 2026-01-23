---
layout: default
title: Moralis API Skills for Claude Code
---

# Moralis API Skills for Claude Code

Comprehensive skills collection for Claude Code with Moralis API integration:

- **Web3 API Skills** (15 skills) - EVM & Solana blockchain data APIs
- **Streams API Skills** (1 skill) - Real-time blockchain event monitoring with webhooks

## Features

- **Zero Dependencies** - Pure Node.js built-in modules only
- **Dual Blockchain Support** - EVM and Solana with auto-detection
- **15 Modular Skills** - Wallet, Token, NFT, DeFi, Entity, Price, Blockchain, Utils, Premium, Analytics, Score, Sniper
- **Real-time Event Streaming** - Webhook-based monitoring
- **Skills-Based Architecture** - Install via `npx skills add`

## Quick Start

### Install Skills (Recommended)

Install all Moralis API skills:

**Step 1:** Install the skills
```bash
npx skills add noviulian/moralis-api-skills
```

Optional: List all available skills
```bash
npx skills add noviulian/moralis-api-skills --list
```

**Step 2:** Set your API key
```bash
/moralis-api-key <paste your API key here>
```

That's it! All skills are installed and ready to use.

---

### Manual Installation (Advanced)

If you prefer to install individual skills or want more control:

#### 1. Get API Key

1. Register at **[admin.moralis.io/register](https://admin.moralis.io/register)** (free, no credit card required)
2. Get your API key at **[admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)**

#### 2. Install Skills

```bash
# Add to Claude Code skills directory
cd ~/.claude/skills
git clone https://github.com/noviulian/moralis-api-skills.git moralis-api-skills-temp

# Install individual skills
cp -r moralis-api-skills-temp/skills/moralis-wallet-api ~/.claude/skills/
cp -r moralis-api-skills-temp/skills/moralis-token-api ~/.claude/skills/
# ... etc for other skills

# Streams skill
cp -r moralis-api-skills-temp/skills/moralis-streams-api ~/.claude/skills/

# Clean up
rm -rf moralis-api-skills-temp
```

#### 3. Set API Key

```bash
# Set API key for a skill
echo "MORALIS_API_KEY=your_actual_key_here" > ~/.claude/skills/moralis-wallet-api/.env
echo "MORALIS_API_KEY=your_actual_key_here" > ~/.claude/skills/moralis-streams-api/.env

# Or set for all skills
cd ~/.claude/skills
for dir in moralis-*; do
  [ -d "$dir" ] && echo "MORALIS_API_KEY=your_actual_key_here" > "$dir/.env"
done
```

---

### Use

Simply ask Claude about Web3 data:

```
"What tokens does 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 hold?"
"Get the price of ETH"
"What NFTs does this wallet own?"

Or manage Streams:
```
"Create a stream to monitor all ERC20 transfers on Ethereum"
```
```

## Skills

| Skill | EVM | Solana | Description |
|-------|-----|--------|-------------|
| **moralis-wallet-api** | ✅ | ✅ | Balances, tokens, NFTs, history, DeFi positions |
| **moralis-token-api** | ✅ | ✅ | Prices, metadata, swaps, pairs, Pump.fun |
| **moralis-nft-api** | ✅ | ✅ | Metadata, traits, transfers, trades |
| **moralis-price-api** | ✅ | ✅ | Token/NFT prices, OHLCV data |
| **moralis-defi-api** | ✅ | ❌ | Protocol positions (EVM only) |
| **moralis-entity-api** | ✅ | ❌ | Labeled addresses (EVM only) |
| **moralis-blockchain-api** | ✅ | ❌ | Blocks and transactions (EVM only) |
| **moralis-utils** | ✅ | ❌ | API utilities (EVM only) |
| **moralis-premium** | ✅ | ✅ | Advanced analytics |
| **moralis-analytics-api** | ✅ | ✅ | Token analytics and timeseries |
| **moralis-score-api** | ✅ | ✅ | Token security scores |
| **moralis-sniper-api** | ✅ | ❌ | DEX snipers detection |
| **moralis-streams-api** | ✅ | ✅ | Real-time event streaming |

## Supported Chains

**EVM:** eth, polygon, bsc, arbitrum, optimism, avalanche, fantom, and more

**Solana:** mainnet, devnet

## Documentation

- [Installation Guide]({{ "/installation" | relative_url }})
- [Usage Examples]({{ "/examples" | relative_url }})
- [API Reference]({{ "/api-reference" | relative_url }})
- [Contributing]({{ "/contributing" | relative_url }})

## Requirements

- Node.js (built-in modules only, no npm install needed)
- Moralis API key

## License

MIT License - see [LICENSE](https://github.com/noviulian/moralis-skills/blob/main/LICENSE) for details.
