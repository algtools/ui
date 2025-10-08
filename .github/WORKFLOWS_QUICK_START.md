# Workflows Quick Start 🚀

## ⚡ TL;DR Setup

### For Chromatic (Recommended):
```bash
# 1. Add GitHub Secret
#    Settings → Secrets → New: CHROMATIC_PROJECT_TOKEN
#    Value: chpt_9ea5fa1ab968f88 (or your new token)

# 2. Disable GitHub Pages preview
mv .github/workflows/pr-preview.yml .github/workflows/pr-preview.yml.disabled

# 3. Test with a PR - Done! 🎉
```

### For GitHub Pages:
```bash
# 1. Enable GitHub Pages
#    Settings → Pages → Source: gh-pages branch

# 2. Disable Chromatic
mv .github/workflows/chromatic.yml .github/workflows/chromatic.yml.disabled

# 3. Test with a PR - Done! 🎉
```

---

## 🎯 What You Get

### ✅ On Every PR:
- **Automated Tests** - Jest runs all tests
- **Linting** - ESLint checks code quality  
- **Formatting** - Prettier validates formatting
- **Build Check** - Ensures library builds successfully
- **Storybook Preview** - Live preview of your UI changes

### 🔗 Preview URLs:
- **Chromatic**: Posted in PR comments + status check
- **GitHub Pages**: `https://<org>.github.io/<repo>/pr-<number>/`

### 🧹 Automatic Cleanup:
Both options automatically remove preview deployments when PRs close!

---

## 🆚 Chromatic vs GitHub Pages

| Feature | Chromatic | GitHub Pages |
|---------|-----------|--------------|
| **Visual Testing** | ✅ Yes | ❌ No |
| **Auto Cleanup** | ✅ Yes | ✅ Yes |
| **Setup Complexity** | 🟢 Easy | 🟡 Medium |
| **Speed** | 🚀 Fast | 🐢 Slower |
| **Cost** | 💰 Free tier limits | 💚 Free unlimited |
| **Custom Domain** | ✅ Yes | ✅ Yes |
| **History** | ✅ Full history | ❌ Current only |

**Recommendation**: Use Chromatic unless you need unlimited free hosting.

---

## 🎬 What Happens on a PR

```
1. You push to PR branch
        ↓
2. PR Checks run automatically
   ⏱️ ~2-3 minutes
        ↓
3. Storybook builds and deploys  
   ⏱️ ~3-5 minutes
        ↓
4. Bot comments with preview link
   🔗 Click to view your changes
        ↓
5. Reviewer checks both code + preview
        ↓
6. Merge → Preview auto-deleted
```

---

## 🔥 Common Commands

```bash
# Run tests locally (same as CI)
pnpm test:ci

# Run linter
pnpm lint

# Check formatting
pnpm format:check

# Build library
pnpm build:lib

# Build Storybook locally
pnpm build-storybook

# Run Storybook locally
pnpm storybook
```

---

## 🎨 Testing UI Changes

### Before Submitting PR:
```bash
# 1. Run Storybook locally
pnpm storybook

# 2. Check your component
#    http://localhost:6006

# 3. Create PR
#    Wait for preview deployment

# 4. Share preview link with team
```

---

## 🚨 Troubleshooting

### ❌ Chromatic not deploying
```bash
# Check secret exists
gh secret list | grep CHROMATIC

# If missing, set it
gh secret set CHROMATIC_PROJECT_TOKEN
```

### ❌ GitHub Pages 404
```bash
# Check gh-pages branch exists
git branch -r | grep gh-pages

# Enable Pages in Settings → Pages
```

### ❌ Tests pass locally but fail in CI
```bash
# Use CI command locally
pnpm test:ci

# Check Node version
node --version  # Should be 20.x
```

---

## 🎓 For New Contributors

1. **Fork the repo**
2. **Create a feature branch**: `git checkout -b feature/my-awesome-hook`
3. **Make changes** and run tests: `pnpm test`
4. **Create PR** - Automated checks will run
5. **Check preview** - Click the link in PR comments
6. **Iterate** based on review feedback
7. **Merge** - Maintainer will merge after approval

---

## 📌 Setting Branch Protection

Make PR checks required:

```
Settings → Branches → Add rule
├─ Branch name: main
├─ ✅ Require status checks to pass
│   ├─ ✅ Lint
│   ├─ ✅ Test  
│   └─ ✅ Build
└─ ✅ Require branches to be up to date
```

---

## 🎁 Bonus Features

### Test Coverage (Optional)
Add `CODECOV_TOKEN` secret for coverage reports:
- Badge in PR comments
- Coverage trends over time
- File-by-file breakdown

### Status Badges
Add to README.md:
```markdown
![Tests](https://github.com/<org>/<repo>/actions/workflows/pr-checks.yml/badge.svg)
```

---

**Questions?** Check `WORKFLOWS_SETUP.md` for detailed docs or open an issue!
