# Get Transaction Data

Get transaction details, decoded transactions.

## Endpoint

- **Transaction:** `GET /transaction/:transactionHash`
- **Decoded:** `GET /transaction/:transactionHash/verbose`

## Query Examples

```bash
# Get transaction
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/transaction/:transactionHash', { transactionHash: '0x...' }).then(console.log)"

# Decoded transaction
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/transaction/:transactionHash/verbose', { transactionHash: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-transaction-by-hash
