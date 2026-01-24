# Get Token Prices (Price API)

Get prices for multiple tokens, OHLCV data.

## Endpoint

- **Multiple prices:** `GET /erc20/prices`
- **OHLCV:** `GET /pairs/:address/ohlcv`

## Query Examples

```bash
# Multiple tokens
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/erc20/prices', { addresses: ['0x...', '0x...'] }).then(console.log)"

# OHLCV candlesticks
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/pairs/:address/ohlcv', { address: '0x...', timeframe: '1h', limit: 100 }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-token-price
