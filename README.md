# Onchain Skills

Onchain skills built on the [Moralis API](https://admin.moralis.com/register). Query blockchain data from EVM chains and Solana, plus real-time event streaming.

Works with any agent that supports the [Agent Skills](https://skills.sh/) standard — Claude Code, Cursor, Windsurf, GitHub Copilot, Cline, Codex, Gemini, and more.

## Quick Start

### Install the skills

**Via [skills.sh](https://skills.sh/):**

```bash
npx skills add MoralisWeb3/onchain-skills
```

**Via [ClawHub](https://clawhub.ai/):**

```bash
clawhub install moralis-data-api
clawhub install moralis-streams-api
clawhub install learn-moralis
```

**Via your OpenClaw agent:** If you have an [OpenClaw](https://openclaw.ai/) agent running, just ask it to search for and install the Moralis API skills from ClawHub — it knows how to find and set them up for you.

### Set your API key

Get your key from [admin.moralis.com](https://admin.moralis.com/register), then configure it for your agent:

**For most agents** (Claude Code, Cursor, Windsurf, Cline, etc.) — add to a `.env` file in your project root:

```bash
echo "MORALIS_API_KEY=your_key_here" >> .env
```

**For OpenClaw** — add to the `env` section in `~/.openclaw/openclaw.json`:

```json
{
  "env": {
    "MORALIS_API_KEY": "your_key_here"
  }
}
```

Without the key, the skills can't call the Moralis API on your behalf.

## Skills

| Skill | Description |
|-------|-------------|
| **moralis-data-api** | EVM + Solana blockchain data (136 endpoints) |
| **moralis-streams-api** | Real-time event monitoring with webhooks (20 endpoints) |
| **learn-moralis** | Routing, FAQ, pricing, and capability guidance |

## moralis-data-api

Unified skill for all blockchain data queries. Auto-detects EVM vs Solana from address format.

**Default Chain:** For EVM addresses without a specified chain, defaults to Ethereum (`0x1`).

**136 endpoints** (102 EVM + 34 Solana) across these categories:

- **Wallet** (17) — balances, tokens, NFTs, history, profitability, net worth
- **Token** (22) — prices, metadata, pairs, DEX swaps, analytics, security scores, snipers
- **NFT** (22) — metadata, transfers, traits, rarity, floor prices, trades
- **DeFi** (3) — protocol positions, liquidity, exposure
- **Entity** (2) — labeled addresses (exchanges, funds, whales)
- **Price** (4) — OHLCV, token prices, pair prices
- **Blockchain** (5) — blocks, transactions, date-to-block
- **Discovery** (13) — trending tokens, market movers, top gainers/losers
- **Other** (14) — address resolution, token search, bonding, candlesticks, graduated tokens
- **Solana** (34) — native Solana endpoints + EVM endpoints with Solana support

```
/moralis-data-api Get the balance of 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045

/moralis-data-api Get the balance of 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 on Polygon

/moralis-data-api Get the balance of Solana wallet 742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

> **Tip:** Prefix your prompt with the skill name (e.g. `/moralis-data-api`) to load it directly. Some agents auto-detect skills, but tagging ensures it works across all agents.

## moralis-streams-api

Real-time blockchain event monitoring with webhooks. **20 endpoints** for creating, managing, and monitoring streams.

**Stream types:** tx, log, erc20transfer, erc20approval, nfttransfer, internalTx

```
/moralis-streams-api Create a stream to monitor all ERC20 transfers on Ethereum

/moralis-streams-api Pause the stream with ID a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

## learn-moralis

Knowledge-only skill for answering general questions about Moralis. Routes users to the correct technical skill after answering.

```
/learn-moralis What is Moralis?

/learn-moralis Which Moralis API should I use for tracking wallet activity?
```

## Supported Chains

**EVM (40+):** eth, polygon, bsc, arbitrum, optimism, avalanche, fantom, base, sei, monad, and more

**Solana:** mainnet, devnet

## Architecture

- **Zero dependencies** — all API calls use curl
- **Works with 18+ agents** — any agent supporting the [Agent Skills](https://skills.sh/) standard
- **Auto-generated endpoint docs** — `swagger/api-configs.json` → `scripts/generate-endpoint-rules.js` → `rules/*.md`
- **Manually maintained references** — pattern files in each skill's `references/` directory

## Documentation

- Get API key: [admin.moralis.com/register](https://admin.moralis.com/register)
- [EVM API Docs](https://deep-index.moralis.io/api-docs-2.2/)
- [Solana API Docs](https://solana-gateway.moralis.io/api/)
- [Streams API Docs](https://docs.moralis.io/streams)

## License

MIT
