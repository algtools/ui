# Storybook Deployment to GitHub Pages

This repository is configured to automatically deploy Storybook to GitHub Pages whenever code is pushed to the `main` branch.

## 🚀 Automatic Deployment

The deployment is handled by a GitHub Actions workflow located at `.github/workflows/storybook.yml`.

### Workflow Triggers

- **Push to main branch**: Automatically deploys when changes are pushed to main
- **Manual dispatch**: Can be triggered manually from the GitHub Actions tab

### Deployment Process

1. **Build**: The workflow installs dependencies and builds the Storybook using `npm run build-storybook`
2. **Configure**: Sets up GitHub Pages configuration
3. **Deploy**: Deploys the built Storybook to GitHub Pages

## 📖 Accessing Your Storybook

Once deployed, your Storybook will be available at:

```
https://<username>.github.io/<repository-name>/
```

For this repository: `https://<your-username>.github.io/janovix-ui/`

## ⚙️ Configuration Files

### GitHub Actions Workflow

- **File**: `.github/workflows/storybook.yml`
- **Purpose**: Handles the build and deployment process
- **Node Version**: 20
- **Memory**: Configured with 4GB memory limit for large builds

### Build Script

- **File**: `scripts/build-storybook.mjs`
- **Purpose**: Custom build script that handles GitHub Pages configuration
- **Features**:
  - Detects GitHub Actions environment
  - Sets appropriate output directory
  - Handles memory optimization

### Storybook Configuration

- **File**: `.storybook/main.ts`
- **Additions**:
  - `disableTelemetry: true` for CI environments
  - `staticDirs: ['../public']` for static assets
  - Custom webpack configuration for CSS processing

### Static Files

- **File**: `public/.nojekyll`
- **Purpose**: Tells GitHub Pages not to use Jekyll processing
- **Note**: Automatically copied during build process

## 🛠️ Manual Deployment

You can also build and test the Storybook locally:

```bash
# Build Storybook for production
npm run build-storybook

# The built files will be in ./storybook-static/
```

## 🔧 Repository Settings

To enable GitHub Pages deployment, ensure your repository has:

1. **GitHub Actions enabled**
2. **GitHub Pages configured**:
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"
   - Branch: No specific branch needed (handled by Actions)

## 📝 Notes

- The deployment includes all your stories, documentation, and components
- Tailwind CSS styles are properly processed and included
- The build process is optimized for GitHub Pages with proper base paths
- Static assets from the `public` directory are included

## 🐛 Troubleshooting

If deployment fails:

1. **Check GitHub Actions logs** in the repository's Actions tab
2. **Verify Node version** compatibility (using Node 20)
3. **Check memory usage** - large builds may need memory optimization
4. **Ensure all dependencies** are properly listed in package.json

For build issues locally:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building locally
npm run build-storybook
```
