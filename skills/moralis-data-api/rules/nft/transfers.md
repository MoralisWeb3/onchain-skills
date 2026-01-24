# Get NFT Transfers

Get NFT transfer events.

## Endpoint

- **Contract transfers:** `GET /nft/:address/transfers`
- **Wallet NFT transfers:** Use wallet history endpoint

## Query Examples

```bash
# Contract transfers
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address/transfers', { address: '0x...' }).then(console.log)"

# With pagination
cd $SKILL_DIR
node -e "const { query, paginate } = require('./query'); paginate('/nft/:address/transfers', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-nft-transfers
