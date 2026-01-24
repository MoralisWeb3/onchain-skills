# Get NFT Floor Price

Get floor price for NFT collections.

## Endpoint

- **Floor price:** `GET /nft/:address/floor-price`
- **Historical:** `GET /nft/:address/floor-price/historical`
- **Sale prices:** `GET /nft/:address/price`

## Query Examples

```bash
# Current floor price
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address/floor-price', { address: '0x...' }).then(r => console.log(r.floor_price))"

# Historical floor price
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address/floor-price/historical', { address: '0x...', limit: 100 }).then(console.log)"

# NFT sale prices
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address/price', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-nft-floor-price
