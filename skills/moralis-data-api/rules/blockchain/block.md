# Get Block Data

Get block information by number or hash.

## Endpoint

- **By number/hash:** `GET /block/:blockNumberOrHash`
- **Date to block:** `GET /dateToBlock`
- **Latest:** `GET /latestBlockNumber/:chain`

## Query Examples

```bash
# Get block
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/block/:blockNumberOrHash', { blockNumberOrHash: '0x...' }).then(console.log)"

# Date to block
cd $SKILL_DIR
node -e "const { query, dateToBlock } = require('./query'); dateToBlock('2024-01-01', 'eth').then(console.log)"

# Latest block
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/latestBlockNumber/:chain', { chain: 'eth' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-block-by-date
