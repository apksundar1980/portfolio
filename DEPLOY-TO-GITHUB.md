# Deploy Portfolio to GitHub Pages (Fix Blank Page)

**Your site:** https://apksundar1980.github.io/portfolio/

The blank page was caused by wrong asset paths (`/assets/` instead of `./assets/`). Fixed with `base: './'`.

---

## Quick Deploy (Recommended)

```bash
cd /var/www/html/sundar.github.io
sudo chown -R $USER:$USER .   # Fix permissions if needed
bash deploy-manual.sh
```

---

## Manual Steps

### 1. Fix permissions

```bash
sudo chown -R $USER:$USER /var/www/html/sundar.github.io
```

### 2. Build and deploy

```bash
cd /var/www/html/sundar.github.io
npm run build
bash deploy-manual.sh
```

### 3. Enable GitHub Pages (if not already)

1. https://github.com/apksundar1980/portfolio/settings/pages
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** → **/ (root)**
4. Save

---

## Verify

Visit https://apksundar1980.github.io/portfolio/ — portfolio should load with light yellow theme.
