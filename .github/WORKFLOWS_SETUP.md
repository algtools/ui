# GitHub Workflows Setup Guide

This repository includes several GitHub Actions workflows for automated testing, building, and deployment.

## 📋 Workflows Overview

### 1. PR Checks (`pr-checks.yml`)
**Purpose:** Runs automated checks on every pull request

**What it does:**
- ✅ Lints code with ESLint
- ✅ Checks code formatting with Prettier
- ✅ Runs Jest test suite
- ✅ Builds the library to ensure no build errors
- ✅ Uploads test coverage to Codecov (optional)

**Triggers:** On PR creation, updates, and reopens
**Status:** ✅ Required check before merging

### 2. Chromatic Deployment (`chromatic.yml`)
**Purpose:** Deploys ephemeral Storybook previews using Chromatic

**What it does:**
- 🎨 Builds and publishes Storybook to Chromatic
- 📸 Runs visual regression testing
- 🔗 Posts preview link in PR comments
- 🧹 Auto-cleans up when PR is closed
- ✅ Auto-accepts changes on main branch

**Triggers:** On PR creation/updates and pushes to main
**Setup Required:** Yes (see setup instructions below)

### 3. PR Preview - GitHub Pages (`pr-preview.yml`) 
**Purpose:** Alternative to Chromatic - deploys previews to GitHub Pages

**What it does:**
- 📚 Builds Storybook for the PR
- 🌐 Deploys to `<username>.github.io/<repo>/pr-<number>/`
- 🔗 Posts preview link in PR comments
- 🧹 Auto-cleans up preview when PR closes

**Triggers:** On PR creation/updates, and cleanup on PR close
**Setup Required:** Yes (see setup instructions below)
**Note:** Choose either Chromatic OR GitHub Pages, not both

### 4. Storybook Deployment (`storybook.yml`)
**Purpose:** Deploys production Storybook to GitHub Pages

**What it does:**
- 📚 Builds Storybook from main branch
- 🌐 Deploys to GitHub Pages (production site)

**Triggers:** On pushes to main, or manual trigger
**Status:** ✅ Already configured

### 5. Release and Publish (`release.yml`)
**Purpose:** Publishes package on GitHub releases

**What it does:**
- 🧪 Runs tests
- 📦 Builds library
- 🚀 Publishes to GitHub Packages
- 📎 Attaches tarball to release

**Triggers:** When a GitHub release is published
**Status:** ✅ Already configured

---

## 🚀 Setup Instructions

### Option A: Using Chromatic (Recommended)

Chromatic provides the best experience with visual regression testing and automatic cleanup.

#### Step 1: Get Chromatic Token
1. Go to [chromatic.com](https://www.chromatic.com/)
2. Sign in with your GitHub account
3. Create a new project or use existing: `chpt_9ea5fa1ab968f88`
4. Copy your project token

#### Step 2: Add GitHub Secret
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `CHROMATIC_PROJECT_TOKEN`
5. Value: Your Chromatic project token
6. Click **Add secret**

#### Step 3: Disable PR Preview Workflow (Optional)
If using Chromatic, you might want to disable the GitHub Pages preview:
```bash
# Rename to disable
mv .github/workflows/pr-preview.yml .github/workflows/pr-preview.yml.disabled
```

#### Step 4: Test It!
Create a test PR and watch the Chromatic workflow run. You'll see:
- A status check appears in the PR
- A link to the Chromatic preview
- Visual regression test results

---

### Option B: Using GitHub Pages

If you prefer to use GitHub Pages for PR previews instead of Chromatic.

#### Step 1: Enable GitHub Pages
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select branch: **gh-pages**
5. Select folder: **/ (root)**
6. Click **Save**

#### Step 2: Update Main Storybook Deployment
The main `storybook.yml` workflow needs a small adjustment to avoid conflicts:

```yaml
# In storybook.yml, add destination_dir to deploy to root
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: ./storybook-static
```

#### Step 3: Disable Chromatic Workflow
```bash
# Rename to disable
mv .github/workflows/chromatic.yml .github/workflows/chromatic.yml.disabled
```

#### Step 4: Test It!
Create a test PR and watch the preview deploy. You'll see:
- A comment with the preview URL: `https://<org>.github.io/<repo>/pr-<number>/`
- The preview updates automatically on new commits
- The preview is removed when PR closes

---

## 🔧 Configuration Options

### PR Checks Workflow

#### Optional: Setup Codecov
For test coverage reporting:
1. Go to [codecov.io](https://codecov.io/)
2. Add your repository
3. Get your Codecov token
4. Add it as a GitHub secret: `CODECOV_TOKEN`

If you don't want Codecov, the workflow will continue without it (it's set to `continue-on-error: true`).

#### Customize Lint Behavior
By default, lint errors don't fail the build:
```yaml
- name: Run linter
  run: pnpm run lint
  continue-on-error: true # Remove this line to make linting required
```

### Chromatic Workflow

#### Visual Testing Options
```yaml
# Only test changed stories (faster)
onlyChanged: true

# Run full visual tests every time
onlyChanged: false

# Auto-accept changes on main
autoAcceptChanges: ${{ github.ref == 'refs/heads/main' }}
```

#### Build Performance
```yaml
env:
  NODE_OPTIONS: "--max_old_space_size=4096" # Adjust if needed
```

---

## 📊 Status Badges

Add these to your `README.md`:

```markdown
![PR Checks](https://github.com/<org>/<repo>/actions/workflows/pr-checks.yml/badge.svg)
![Chromatic](https://github.com/<org>/<repo>/actions/workflows/chromatic.yml/badge.svg)
![Storybook](https://github.com/<org>/<repo>/actions/workflows/storybook.yml/badge.svg)
```

---

## 🐛 Troubleshooting

### Chromatic: "Project token is invalid"
- Make sure the secret is named exactly `CHROMATIC_PROJECT_TOKEN`
- Verify the token is correct in repository secrets
- Try regenerating the token in Chromatic dashboard

### GitHub Pages: "404 on preview URL"
- Check that GitHub Pages is enabled
- Verify the `gh-pages` branch exists
- Wait a few minutes after first deployment
- Check Actions logs for deployment errors

### Tests failing on CI but pass locally
- Ensure you're using `pnpm test:ci` which runs with `--ci --maxWorkers=1`
- Check Node.js version matches (20.x)
- Verify all dependencies are in `package.json`, not just installed locally

### Build failing with memory issues
- Increase `NODE_OPTIONS: "--max_old_space_size=4096"` to higher value
- Consider splitting large builds into chunks

---

## 🎯 Best Practices

### For Contributors
1. Always create PRs from feature branches
2. Wait for PR checks to pass before requesting review
3. Check the Storybook preview to verify UI changes
4. Address any visual regression failures in Chromatic

### For Maintainers
1. Set PR checks as required status checks:
   - Settings → Branches → Branch protection rules
   - Add rules for `main` branch
   - Require status checks: `Lint`, `Test`, `Build`
2. Review Chromatic visual changes before merging
3. Keep workflows up to date with dependency updates

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Chromatic Documentation](https://www.chromatic.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [pnpm CI Documentation](https://pnpm.io/continuous-integration)

---

## 🔄 Workflow Diagram

```
Pull Request Created
        ↓
    PR Checks
    ├── Lint ✓
    ├── Test ✓
    └── Build ✓
        ↓
   Chromatic / Preview
   ├── Build Storybook ✓
   ├── Deploy Preview 🌐
   └── Comment on PR 💬
        ↓
    Review Process
        ↓
    Merge to Main
        ↓
    ├── Deploy Storybook (Pages) 📚
    ├── Chromatic (auto-accept) ✓
    └── Cleanup PR Preview 🧹
        ↓
    Create Release
        ↓
    Release Workflow
    ├── Run Tests ✓
    ├── Build Library 📦
    └── Publish to GitHub Packages 🚀
```

---

**Need help?** Open an issue or check the workflow logs in the Actions tab.
