# Frosty Timer

Precision focus timer, productivity stopwatch, and stealth portal designed for GitHub Pages.

## Deployment to GitHub Pages

1. In your GitHub repository (`timeres`), navigate to **Settings** -> **Pages**.
2. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: Select `/docs` (**not** `/ (root)`)
3. Click **Save**.
4. Your application will be live at `https://<username>.github.io/<repo>/`!

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```
This builds the production static assets directly into the `/docs` directory ready for GitHub Pages hosting.
