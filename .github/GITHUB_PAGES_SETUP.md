# GitHub Pages Setup & Troubleshooting Guide

## 🔧 Initial Setup Required

Before the PR preview workflow can work, GitHub Pages must be properly configured:

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **"Source"**, select:
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
4. Click **Save**

### Step 2: Wait for First Deployment

After enabling Pages, you need to trigger the first deployment:

**Option A: Trigger Main Storybook Deployment**

```bash
# Go to Actions tab → Storybook Deployment → Run workflow
# OR merge something to main branch
```

**Option B: Create the gh-pages branch manually**

```bash
# Create an empty gh-pages branch
git checkout --orphan gh-pages
git rm -rf .
echo "# GitHub Pages" > README.md
git add README.md
git commit -m "Initial gh-pages branch"
git push origin gh-pages

# Switch back to main
git checkout main
```

### Step 3: Verify GitHub Pages is Active

Visit: `https://algtools.github.io/ui/`

You should see your main Storybook deployment (may take 2-3 minutes).

---

## 🐛 Troubleshooting 404 Errors

### Issue: `https://algtools.github.io/ui/pr-1/` shows 404

#### Check 1: Is GitHub Pages Enabled?

```
Settings → Pages
```

Should show:

- ✅ "Your site is published at https://algtools.github.io/ui/"
- ✅ Source: gh-pages branch

If not showing, go back to **Step 1** above.

#### Check 2: Does the gh-pages branch exist?

```bash
git ls-remote --heads origin gh-pages
```

If empty/no output:

- Run the main Storybook workflow once to create the branch
- OR create it manually (see Step 2, Option B above)

#### Check 3: Was the PR preview actually deployed?

1. Go to **Actions** tab
2. Find the "PR Preview (GitHub Pages)" workflow run
3. Check if it completed successfully
4. Look for the "Deploy to GitHub Pages" step - should show:

```
✅ Deploy to GitHub Pages
Published
```

#### Check 4: Check the gh-pages branch contents

```bash
# Clone and check the gh-pages branch
git fetch origin gh-pages
git checkout gh-pages

# List directories
ls -la

# Should see:
# - index.html (main Storybook)
# - pr-1/ (your PR preview)
# - pr-2/ (other PR previews)
# - .nojekyll
```

If `pr-1/` doesn't exist, the deployment didn't work.

#### Check 5: Workflow Permissions

Ensure the workflow has write permissions:

```yaml
# In .github/workflows/pr-preview.yml
permissions:
  contents: write
  pull-requests: write
  issues: write
```

#### Check 6: Repository Settings

```
Settings → Actions → General → Workflow permissions
```

Should be set to:

- ✅ "Read and write permissions"

OR use explicit permissions in workflows (which we do).

---

## 🔄 How It Works

### Main Storybook (`storybook.yml`)

```
Push to main
    ↓
Build Storybook
    ↓
Deploy to gh-pages branch (root)
    ↓
https://algtools.github.io/ui/
```

### PR Preview (`pr-preview.yml`)

```
Open/Update PR
    ↓
Build Storybook
    ↓
Deploy to gh-pages branch (pr-{number}/ subdirectory)
    ↓
https://algtools.github.io/ui/pr-{number}/
```

Both workflows use the same deployment method now (`peaceiris/actions-gh-pages@v4`), so they're compatible!

---

## 🔍 Debugging Steps

### 1. Check Workflow Logs

```
Actions → PR Preview → Click on the failed/successful run → Deploy step
```

Look for errors like:

- ❌ "Permission denied" → Check permissions
- ❌ "Branch not found" → Create gh-pages branch
- ❌ "Empty directory" → Check build step

### 2. Verify Build Output

In the workflow logs, check the "Build Storybook" step:

```bash
✅ Should show: "Build successful"
✅ Should create: storybook-static/ directory
```

### 3. Check Deployment Confirmation

The "Deploy to GitHub Pages" step should show:

```
remote: Resolving deltas: 100% (X/X), done.
To https://github.com/algtools/ui.git
   abc1234..def5678  gh-pages -> gh-pages
```

### 4. Test Manually

```bash
# Clone gh-pages branch
git clone --branch gh-pages https://github.com/algtools/ui.git ui-pages
cd ui-pages

# Check structure
ls -la
# Should see pr-1/, pr-2/, etc.

# Check PR directory
ls -la pr-1/
# Should see index.html, assets/, etc.

# Test locally
cd pr-1
python3 -m http.server 8000
# Visit http://localhost:8000
```

---

## 🚨 Common Issues & Solutions

### Issue: "This site can't be reached"

**Cause:** GitHub Pages not enabled or still processing

**Solution:**

1. Enable GitHub Pages (see Step 1)
2. Wait 2-3 minutes for DNS propagation
3. Hard refresh browser (Ctrl+Shift+R)

### Issue: "404 - File not found"

**Cause:** Deployment went to wrong location or failed

**Solution:**

```bash
# Check gh-pages branch
git checkout gh-pages
ls -la

# If pr-1/ is missing, redeploy
git checkout main
# Trigger workflow again
```

### Issue: PR preview overwrites main Storybook

**Cause:** Conflicting deployment configurations

**Solution:** ✅ **Already Fixed!**
Both workflows now use `keep_files: true` and deploy to different locations.

### Issue: "The process '/usr/bin/git' failed with exit code 128"

**Cause:** gh-pages branch doesn't exist or is protected

**Solution:**

1. Create gh-pages branch (see Step 2)
2. Check branch protection rules:
   - Settings → Branches
   - Ensure gh-pages is not protected
   - OR add exception for github-actions bot

---

## 🎯 Quick Fix Checklist

If PR preview isn't working, run through this checklist:

- [ ] GitHub Pages is enabled (Settings → Pages)
- [ ] gh-pages branch exists (`git ls-remote --heads origin gh-pages`)
- [ ] GitHub Pages source is set to gh-pages branch
- [ ] Workflow has write permissions (check workflow file)
- [ ] Workflow ran successfully (check Actions tab)
- [ ] Deployment step completed (check logs)
- [ ] Waited 2-3 minutes for GitHub Pages to update
- [ ] Tried hard refresh (Ctrl+Shift+R)

---

## 🔄 Manual Deployment Test

Test if deployments work manually:

```bash
# 1. Build Storybook locally
pnpm install
pnpm build-storybook

# 2. Create gh-pages branch if it doesn't exist
git checkout -b gh-pages

# 3. Clear everything
git rm -rf .
git clean -fdx

# 4. Copy built Storybook
cp -r storybook-static/* .

# 5. Create test preview directory
mkdir -p pr-test
cp -r storybook-static/* pr-test/

# 6. Add .nojekyll
touch .nojekyll

# 7. Commit and push
git add .
git commit -m "Test deployment"
git push origin gh-pages

# 8. Wait 2-3 minutes, then check:
# https://algtools.github.io/ui/
# https://algtools.github.io/ui/pr-test/
```

---

## 📊 Verify Everything Works

### Main Storybook

```bash
# URL
https://algtools.github.io/ui/

# Should show
✅ Latest Storybook from main branch
✅ All components
✅ Navigation works
```

### PR Preview

```bash
# URL (replace 1 with your PR number)
https://algtools.github.io/ui/pr-1/

# Should show
✅ Storybook from PR branch
✅ All components
✅ Navigation works
✅ Shows changes from PR
```

---

## 🎓 Understanding the Fix

### What Changed

**Before:** Two workflows used incompatible deployment methods:

- `storybook.yml`: Used official `actions/deploy-pages@v4`
- `pr-preview.yml`: Used `peaceiris/actions-gh-pages@v4`

**Problem:** They conflicted, causing 404s

**After:** Both workflows now use `peaceiris/actions-gh-pages@v4`:

- `storybook.yml`: Deploys to root (`destination_dir: .`)
- `pr-preview.yml`: Deploys to subdirectory (`destination_dir: pr-{number}`)
- Both use `keep_files: true` to preserve each other's deployments

### Why This Works

The `peaceiris/actions-gh-pages` action:

1. Checks out gh-pages branch
2. Adds new files to specified directory
3. Commits and pushes changes
4. Preserves existing files when `keep_files: true`

This allows multiple deployments to coexist:

```
gh-pages branch:
├── index.html              (main Storybook)
├── assets/                 (main Storybook assets)
├── pr-1/                   (PR #1 preview)
│   ├── index.html
│   └── assets/
├── pr-2/                   (PR #2 preview)
│   ├── index.html
│   └── assets/
└── .nojekyll
```

---

## 🆘 Still Not Working?

### Check GitHub Pages Status

Visit: https://www.githubstatus.com/

GitHub Pages might be experiencing issues.

### Check Repository Visibility

```
Settings → General → Repository visibility
```

- Public repos: Pages work immediately
- Private repos: Pages require GitHub Pro/Team/Enterprise

### Enable GitHub Pages Debug Mode

Add to workflow for detailed logs:

```yaml
- name: Deploy to GitHub Pages (PR Preview)
  uses: peaceiris/actions-gh-pages@v4
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./storybook-static
    destination_dir: pr-${{ github.event.pull_request.number }}
    keep_files: true
    enable_jekyll: false
  env:
    ACTIONS_STEP_DEBUG: true
```

### Contact Support

If all else fails:

1. Check workflow logs for specific errors
2. Open an issue with:
   - Error messages
   - Workflow logs
   - Repository settings screenshots
3. Tag with `[github-pages]` or `[workflow]`

---

## 📝 Summary

**To fix your current 404 error:**

1. ✅ **Fixed workflows** - Both now use compatible deployment methods
2. ⚠️ **Enable GitHub Pages** - Settings → Pages → gh-pages branch
3. 🔄 **Trigger new deployment** - Push to main or rerun PR workflow
4. ⏱️ **Wait 2-3 minutes** - GitHub Pages needs time to update
5. 🎉 **Test** - Visit `https://algtools.github.io/ui/pr-1/`

**The workflows are now compatible and should work!**

---

_Last updated: 2025-10-08_
