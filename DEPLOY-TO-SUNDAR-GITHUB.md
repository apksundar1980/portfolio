# Deploy Portfolio to /var/www/html/sundar.github.io

The target directory has restricted permissions. Run these commands in your terminal:

## Step 1: Fix permissions (one-time)

```bash
sudo chown -R $USER:$USER /var/www/html/sundar.github.io
```

## Step 2: Copy all portfolio files

```bash
cd /home/sundar/sundar-portfolio
rsync -av --exclude='.git' --exclude='node_modules' --exclude='dist' . /var/www/html/sundar.github.io/
```

## Step 3: Install and build

```bash
cd /var/www/html/sundar.github.io
npm install
npm run build
```

## Step 4: Deploy to GitHub Pages (optional)

```bash
npm run deploy
```

Or manually: copy contents of `dist/` to your GitHub repo and push.
