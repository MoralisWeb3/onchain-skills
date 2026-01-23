#!/bin/bash

# Bug Reproduction Script for moralis-api-skills
# This script tests for the bugs identified in the bug report

echo "=== moralis-api-skills Bug Testing Script ==="
echo ""
echo "This script tests for bugs identified during architecture analysis"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASS=0
FAIL=0
WARN=0

# Helper functions
pass() {
    echo -e "${GREEN}✓ PASS${NC}: $1"
    ((PASS++))
}

fail() {
    echo -e "${RED}✗ FAIL${NC}: $1"
    ((FAIL++))
}

warn() {
    echo -e "${YELLOW}⚠ WARN${NC}: $1"
    ((WARN++))
}

echo "=== Test 1: Check if plugins/ directory is empty ==="
if [ -d "plugins/web3-api-skills/skills" ]; then
    PLUGIN_SKILLS_COUNT=$(find plugins/web3-api-skills/skills -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' ')
    if [ "$PLUGIN_SKILLS_COUNT" -eq 0 ]; then
        fail "Plugin skills directories are empty (HIGH bug #2)"
    else
        pass "Plugin skills directories populated ($PLUGIN_SKILLS_COUNT skills found)"
    fi
else
    pass "plugins/ directory does not exist (migration complete)"
fi

echo ""
echo "=== Test 2: Check if all skills have query.js ==="
SKILLS_DIR="skills"
MISSING_QUERY=0

for skill_dir in "$SKILLS_DIR"/moralis-*; do
    if [ -d "$skill_dir" ]; then
        skill_name=$(basename "$skill_dir")
        if [ "$skill_name" = "moralis-api-key" ]; then
            # This is a command-only skill, no query.js expected
            continue
        fi
        if [ ! -f "$skill_dir/query.js" ]; then
            fail "$skill_name missing query.js"
            ((MISSING_QUERY++))
        fi
    fi
done

if [ $MISSING_QUERY -eq 0 ]; then
    pass "All skills have query.js files"
fi

echo ""
echo "=== Test 3: Test individual skill installation ==="
TEST_DIR="/tmp/moralis-skill-test-$$"
mkdir -p "$TEST_DIR"

# Copy one skill in isolation
cp -r skills/moralis-wallet-api "$TEST_DIR/"

# Try to load it
cd "$TEST_DIR/moralis-wallet-api"
if node -e "require('./query.js')" 2>/dev/null; then
    pass "Skill loads individually (no CRITICAL bug #1)"
else
    fail "Skill fails to load individually - CRITICAL bug #1 confirmed"
    fail "Missing module: ../web3-shared/query"
fi

cd - > /dev/null
rm -rf "$TEST_DIR"

echo ""
echo "=== Test 4: Test all skills installed together ==="
TEST_DIR="/tmp/moralis-all-skills-test-$$"
mkdir -p "$TEST_DIR"

# Copy all skills
cp -r skills/* "$TEST_DIR/"

# Try to load a skill
cd "$TEST_DIR/moralis-wallet-api"
if node -e "const q = require('./query.js'); console.log('query function:', typeof q.query === 'function')" 2>/dev/null | grep -q "true"; then
    pass "Skill loads when all skills are present together"
else
    fail "Skill fails even with all skills present"
fi

cd - > /dev/null
rm -rf "$TEST_DIR"

echo ""
echo "=== Test 5: Check if skills CLI exists ==="
if command -v skills &> /dev/null; then
    pass "skills CLI is installed"
else
    warn "skills CLI not found in PATH - MEDIUM bug #3"
    warn "Documentation mentions 'npx skills add' but tool is not available"
fi

echo ""
echo "=== Test 6: Verify import paths in query.js files ==="
WRONG_IMPORTS=0

for query_file in skills/moralis-*/query.js; do
    if [ -f "$query_file" ]; then
        # Check if file uses ../web3-shared/query import
        if grep -q 'require("\.\./web3-shared/query")' "$query_file" || \
           grep -q "require('\.\./web3-shared/query')" "$query_file"; then
            : # Correct import
        else
            skill=$(echo "$query_file" | cut -d'/' -f2)
            # Skip moralis-streams-api (has its own query.js)
            if [ "$skill" != "moralis-streams-api" ]; then
                warn "$skill has unexpected import path"
                ((WRONG_IMPORTS++))
            fi
        fi
    fi
done

if [ $WRONG_IMPORTS -eq 0 ]; then
    pass "All skills use correct relative imports"
    warn "However, these imports require web3-shared to be a sibling directory"
fi

echo ""
echo "=== Summary ==="
echo -e "${GREEN}Passed:${NC} $PASS"
echo -e "${RED}Failed:${NC} $FAIL"
echo -e "${YELLOW}Warnings:${NC} $WARN"

echo ""
if [ $FAIL -gt 0 ]; then
    echo -e "${RED}CRITICAL BUGS FOUND${NC}"
    echo "Please review docs/bug-report-2025-01-23.md for details"
    exit 1
else
    echo -e "${GREEN}No critical bugs found${NC}"
    exit 0
fi
