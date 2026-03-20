# Deploy Portfolio to GitHub Pages (Online URL)

Your site will be live at: **https://apksundar1980.github.io/portfolio/**

---

## Option 1: Deploy with gh-pages (Easiest)

```bash
cd /var/www/html/sundar.github.io
npm run deploy
```

This will:
1. Build the project
2. Push the `dist/` folder to the `gh-pages` branch
3. GitHub Pages will serve it automatically

**First time:** You may be prompted to log in to GitHub. Ensure you have:
- GitHub CLI (`gh auth login`) or
- Git credentials configured

---

## Option 2: Enable GitHub Pages in Settings

1. Go to https://github.com/apksundar1980/portfolio
2. Click **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Branch: **gh-pages** (or **main** if you deploy the root)
5. Folder: **/ (root)**
6. Click **Save**

---

## Option 3: Manual Deploy (Push dist folder)

```bash
cd /var/www/html/sundar.github.io
npm run build
git checkout -b gh-pages
git add -f dist
git mv dist/* .
git commit -m "Deploy portfolio"
git push origin gh-pages
```

---

## After Deployment

- **URL:** https://apksundar1980.github.io/portfolio/
- Changes may take 1–2 minutes to appear
- Check status: **Settings → Pages** on your repo
