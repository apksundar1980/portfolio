#!/bin/bash
# Deploy portfolio to GitHub Pages - fixes blank page
# Run: cd /var/www/html/sundar.github.io && bash deploy-manual.sh

set -e
cd "$(dirname "$0")"

echo "Building..."
npm run build

echo "Preparing deploy..."
TMP=$(mktemp -d)
cp -r dist-build/* "$TMP/"
cp dist-build/.gitignore "$TMP/" 2>/dev/null || true

CURRENT_BRANCH=$(git branch --show-current)
git checkout gh-pages 2>/dev/null || git checkout -b gh-pages

# Replace all with dist-build contents
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -r "$TMP"/* .
rm -rf "$TMP"

git add .
git status
git commit -m "Deploy portfolio (fixed asset paths)" || echo "Nothing to commit"
git push origin gh-pages

git checkout "$CURRENT_BRANCH"
echo "Done! Visit https://apksundar1980.github.io/portfolio/"