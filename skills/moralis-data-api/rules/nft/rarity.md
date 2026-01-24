# Get NFT Rarity

Get rarity data for NFTs in a collection.

## Endpoint

- **Trades:** `GET /nft/:address/trades`

## Query Examples

```bash
# Get trades (for rarity calculation)
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address/trades', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-nft-trades
