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
if [ "$SKILL_COUNT" -ge 3 ]; then
  echo "✓ At least 3 skills present (found $SKILL_COUNT)"
else
  echo "✗ Expected at least 3 skills, found $SKILL_COUNT"
fi
echo ""

# Test 3: Check API key command
echo "Test 3: API Key Command"
if [ -f "skills/moralis-api-key/SKILL.md" ]; then
  echo "✓ API key command skill exists"
else
  echo "✗ API key command skill missing"
fi
echo ""

# Test 4: Sample skill validation
echo "Test 4: Sample Skill Validation"
SAMPLE_SKILL="skills/moralis-data-api"
if [ -d "$SAMPLE_SKILL" ]; then
  if [ -f "$SAMPLE_SKILL/SKILL.md" ]; then
    echo "✓ Sample skill has SKILL.md"
  else
    echo "✗ Sample skill missing SKILL.md"
  fi
else
  echo "✗ Sample skill directory not found"
fi
echo ""

echo "============================="
echo "Installation test complete!"
echo ""
echo "Note: Skills-only layout does not use plugin manifests or marketplace.json"
echo "Skills are located at: skills/<skill-name>/"
