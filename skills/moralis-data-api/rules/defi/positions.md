# Get DeFi Protocol Positions

Get detailed positions for specific DeFi protocols.

## Endpoint

- **Summary:** `GET /wallets/:address/defi/summary`
- **Positions:** `GET /wallets/:address/defi/positions`
- **Protocol-specific:** `GET /wallets/:address/defi/:protocol/positions`

## Query Examples

```bash
# All positions
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/defi/positions', { address: '0x...' }).then(console.log)"

# Protocol-specific
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/defi/:protocol/positions', { address: '0x...', protocol: 'uniswap_v3' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-defi-positions
