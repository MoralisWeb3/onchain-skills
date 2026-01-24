# Get NFT Traits

Get trait distribution for an NFT collection.

## Endpoint

- **Traits:** `GET /nft/:address/traits`

## Query Examples

```bash
# Get traits
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address/traits', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-nft-traits
