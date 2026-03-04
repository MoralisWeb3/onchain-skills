#!/bin/bash

# Test installation flow for skills-only layout

echo "Testing Installation Flow (Skills-Only Layout)"
echo "============================="
echo ""

# Test 1: Check skills directory exists
echo "Test 1: Skills Directory"
if [ -d "skills" ]; then
  echo "✓ Skills directory exists"
else
  echo "✗ Skills directory missing"
  exit 1
fi
echo ""

# Test 2: Count all skill directories
echo "Test 2: Skill Directories"
SKILL_COUNT=$(find skills -maxdepth 1 -type d ! -name "skills" | wc -l)
echo "Found $SKILL_COUNT skill directories"
if [ "$SKILL_COUNT" -ge 2 ]; then
  echo "✓ At least 2 skills present (found $SKILL_COUNT)"
else
  echo "✗ Expected at least 2 skills, found $SKILL_COUNT"
  exit 1
fi
echo ""

# Test 3: Sample skill validation
echo "Test 3: Sample Skill Validation"
SAMPLE_SKILL="skills/moralis-data-api"
if [ -d "$SAMPLE_SKILL" ]; then
  if [ -f "$SAMPLE_SKILL/SKILL.md" ]; then
    echo "✓ Sample skill has SKILL.md"
  else
    echo "✗ Sample skill missing SKILL.md"
    exit 1
  fi
else
  echo "✗ Sample skill directory not found"
  exit 1
fi
echo ""

# Test 4: Sensitive literal validation
echo "Test 4: Sensitive Literal Validation"
if node scripts/check-sensitive-literals.js > /dev/null; then
  echo "✓ No address/hash-like literals found"
else
  echo "✗ Sensitive address/hash-like literals detected"
  exit 1
fi
echo ""

echo "============================="
echo "Installation test complete!"
echo ""
echo "Note: Skills-only layout does not use plugin manifests or marketplace.json"
echo "Skills are located at: skills/<skill-name>/"
