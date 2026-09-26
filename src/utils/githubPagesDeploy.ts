/**
 * GitHub Pages Exporter & Deployment Bundle Generator
 * Creates an exportable standalone static bundle configured for GitHub Pages (gh-pages).
 */

export function generateGitHubPagesExport(customDomain: string = ''): void {
  const readmeContent = `# Frosty Timer & Unblocked Arcade

A dual-mode productivity timer and private unblocked HTML5 & Flash game archive designed to run 100% on **GitHub Pages**.

## Quick 2-Minute Deployment to GitHub Pages

1. **Create a GitHub Repository**:
   - Go to [github.com/new](https://github.com/new)
   - Name it \`frosty-timer\` (or \`<username>.github.io\` for user site)
   - Set visibility to **Public** (or **Private** with GitHub Pro)

2. **Upload Repository Files**:
   - Upload all files from this project into your repository's \`main\` branch.

3. **Enable GitHub Pages**:
   - Go to **Settings** > **Pages**
   - Under **Build and deployment** > **Branch**, select \`main\` (or \`/root\`)
   - Click **Save**

4. **Your Live URL**:
   - \`https://<your-username>.github.io/frosty-timer/\`
   - Fully protected behind the innocent "Frosty Timer" and Calculator decoy gate!

## Master Cloak Code
- The decoy gate will open only with: **\`MOBBDEEP\`**
`;

  const blob = new Blob([readmeContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'GITHUB_PAGES_DEPLOY_GUIDE.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
