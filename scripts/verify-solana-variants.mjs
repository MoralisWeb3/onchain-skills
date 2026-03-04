import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RULES_DIR = path.join(__dirname, '../skills/moralis-data-api/rules');
const API_CONFIGS_PATH = path.join(__dirname, '../swagger/api-configs.json');

const files = fs.readdirSync(RULES_DIR).filter((f) => f.endsWith('.md'));
const data = JSON.parse(fs.readFileSync(API_CONFIGS_PATH, 'utf8'));

const solanaNative = [];
const solanaVariants = [];
const evmCollisions = [];
const evmOnly = [];
const unknownSolana = [];

for (const file of files) {
  if (file.endsWith('__solana.md')) {
    // Check if it's a native Solana endpoint or an EVM variant
    const opId = file.replace('__solana.md', '');

    if (data.solana && data.solana[opId]) {
      solanaNative.push(opId);
    } else if (data.evm && data.evm[opId]) {
      solanaVariants.push(opId);
    } else {
      unknownSolana.push(opId);
    }
  } else if (file.endsWith('__evm.md')) {
    evmCollisions.push(file.replace('__evm.md', ''));
  } else if (!file.includes('__')) {
    const opId = file.replace('.md', '');
    evmOnly.push(opId);
  }
}

console.log('=== Solana File Breakdown ===\n');
console.log('Native Solana endpoints: ' + solanaNative.length);
console.log(
  'EVM endpoints with Solana chain support (variants): ' +
    solanaVariants.length,
);
console.log(
  'Total __solana files: ' + (solanaNative.length + solanaVariants.length) +
    '\n',
);

console.log('=== EVM File Breakdown ===\n');
console.log('EVM endpoints with Solana collisions (__evm): ' + evmCollisions.length);
console.log('EVM-only endpoints (no suffix): ' + evmOnly.length + '\n');

if (unknownSolana.length > 0) {
  console.log('=== UNKNOWN __solana FILES ===\n');
  for (const op of unknownSolana.sort()) {
    console.log('  - ' + op);
  }
}

if (solanaVariants.length > 0) {
  console.log('=== EVM Endpoints with Solana Chain Support ===\n');
  for (const op of solanaVariants.sort()) {
    console.log('  - ' + op);
  }
}

process.exit(unknownSolana.length > 0 ? 1 : 0);
