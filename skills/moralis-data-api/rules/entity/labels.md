# Get Entity Labels

Get labeled entities (exchanges, funds, protocols, whales).

## Endpoint

- **Search:** `GET /entities/search`
- **Categories:** `GET /entities/categories`
- **By category:** `GET /entities/categories/:categoryId`
- **By ID:** `GET /entities/:entityId`

## Query Examples

```bash
# Search entities
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/entities/search', { query: 'binance' }).then(console.log)"

# Get categories
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/entities/categories').then(console.log)"

# Get entity by ID
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/entities/:entityId', { entityId: '...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-entity-labels
