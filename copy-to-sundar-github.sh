#!/bin/bash
# Copy portfolio to /var/www/html/sundar.github.io
# Run: sudo bash copy-to-sundar-github.sh

SOURCE="$(dirname "$0")"
DEST="/var/www/html/sundar.github.io"

echo "Copying from $SOURCE to $DEST ..."

# Fix ownership first
sudo chown -R $USER:$USER "$DEST"

# Remove existing files (except .git)
cd "$DEST"
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

# Copy files
cp -r "$SOURCE"/package.json "$SOURCE"/package-lock.json "$SOURCE"/vite.config.js "$SOURCE"/index.html "$SOURCE"/.gitignore "$SOURCE"/README.md "$DEST/"
cp -r "$SOURCE"/src "$SOURCE"/public "$DEST/"
cp -r "$SOURCE"/node_modules "$DEST/" 2>/dev/null || true

echo "Done! Run: cd $DEST && npm install && npm run build"
