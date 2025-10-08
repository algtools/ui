# 🔧 GitHub Pages 404 Fix

## The Problem

Your PR preview at `https://algtools.github.io/ui/pr-1/` showed a 404 error even though the workflow succeeded.

## Root Cause

The two workflows were using **incompatible deployment methods**:

- ❌ `storybook.yml` used official GitHub Pages action (`actions/deploy-pages`)
- ❌ `pr-preview.yml` used third-party action (`peaceiris/actions-gh-pages`)

These conflicted with each other, causing the 404 error.

## The Fix ✅

Updated both workflows to use the same deployment method:

### Changed Files:

1. **`.github/workflows/storybook.yml`**
   - Now uses `peaceiris/actions-gh-pages@v4`
   - Deploys to root (`destination_dir: .`)
   - Preserves PR previews with `keep_files: true`

2. **`.github/workflows/pr-preview.yml`**
   - Updated to v4 of the action
   - Added `enable_jekyll: false` flag
   - Deploys to `pr-{number}/` subdirectory

Both workflows now cooperate instead of conflicting!

## What You Need to Do

### Step 1: Enable GitHub Pages (If Not Already)

1. Go to repository **Settings** → **Pages**
2. Set source to: **gh-pages** branch, **/ (root)** folder
3. Click **Save**

### Step 2: Initial Setup (One-Time)

You need to create the `gh-pages` branch first. Choose ONE option:

**Option A: Trigger Main Storybook Workflow**

```bash
# Go to Actions tab → "Deploy Storybook to GitHub Pages"
# Click "Run workflow" → Run workflow
```

**Option B: Manual Branch Creation**

```bash
git checkout --orphan gh-pages
git rm -rf .
echo "# GitHub Pages" > README.md
git add README.md
git commit -m "Initial gh-pages branch"
git push origin gh-pages
git checkout main
```

### Step 3: Redeploy Your PR

Since the workflow already ran with the old (broken) configuration:

```bash
# Option 1: Push a new commit to your PR branch
git commit --allow-empty -m "Trigger workflow"
git push

# Option 2: Close and reopen the PR (will trigger workflow)

# Option 3: Manually trigger the workflow (if enabled)
```

### Step 4: Wait & Verify

1. ⏱️ Wait 2-3 minutes for GitHub Pages to update
2. 🔗 Visit `https://algtools.github.io/ui/pr-1/`
3. ✅ Should now work!

## Testing the Fix

### Check Main Storybook

```
https://algtools.github.io/ui/
```

Should show your main Storybook (deployed from `main` branch).

### Check PR Preview

```
https://algtools.github.io/ui/pr-1/
```

Should show your PR Storybook (deployed from PR branch).

## Verify Deployment Structure

The `gh-pages` branch should look like:

```
gh-pages/
├── index.html              ← Main Storybook
├── assets/                 ← Main assets
├── pr-1/                   ← PR #1 preview
│   ├── index.html
│   └── assets/
├── pr-2/                   ← PR #2 preview (if exists)
└── .nojekyll
```

## Troubleshooting

### Still getting 404?

See the comprehensive guide: `.github/GITHUB_PAGES_SETUP.md`

### Quick checks:

```bash
# 1. Does gh-pages branch exist?
git ls-remote --heads origin gh-pages

# 2. Is GitHub Pages enabled?
# Settings → Pages should show "Your site is published at..."

# 3. Check the branch contents
git fetch origin gh-pages
git checkout gh-pages
ls -la pr-1/

# 4. Check workflow logs
# Actions tab → PR Preview workflow → View logs
```

## Summary

✅ **Fixed:** Both workflows now use compatible deployment methods  
✅ **Action:** Enable GitHub Pages and trigger a redeploy  
✅ **Result:** PR previews will work at `https://algtools.github.io/ui/pr-{number}/`

The infrastructure is now correct. You just need to:

1. Enable GitHub Pages (one-time setup)
2. Ensure `gh-pages` branch exists
3. Redeploy your PR

**Everything should work after that!** 🎉

---

_For detailed troubleshooting, see: `.github/GITHUB_PAGES_SETUP.md`_
