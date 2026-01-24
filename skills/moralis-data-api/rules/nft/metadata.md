# Get NFT Metadata

Get NFT contract metadata and individual NFT data.

## Endpoint

- **Contract:** `GET /nft/:address`
- **Specific NFT:** `GET /nft/:address/:tokenId`
- **Owners:** `GET /nft/:address/owners`

## Query Examples

```bash
# Contract metadata
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address', { address: '0x...' }).then(console.log)"

# Specific NFT
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address/:tokenId', { address: '0x...', tokenId: '1' }).then(console.log)"

# NFT owners
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address/owners', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-nft-metadata
