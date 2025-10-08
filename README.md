## Janovix UI

A modern React component library for building delightful interfaces in Next.js applications.

### Compatibility

- **Next.js**: v15 only
- **Tailwind CSS**: v4 only
- **Required**: `tw-animate-css`

### Installation

1. **Generate a GitHub Personal Access Token (PAT)**

- Go to GitHub → Settings → Developer settings → Personal access tokens.
- Create a token with at least **read:packages** scope.
- Copy the token (you will need it once for npm auth).

2. **Configure your global .npmrc (in your home folder)**

- Windows: `C:\Users\<you>\.npmrc`
- macOS/Linux: `~/.npmrc`

Add the following lines (replace `YOUR_GITHUB_PAT`):

```ini
@janovix:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
always-auth=true
```

3. **Install the package and required dependency**

```bash
npm i @janovix/ui tw-animate-css
# or
pnpm add @janovix/ui tw-animate-css
# or
yarn add @janovix/ui tw-animate-css
```

Ensure your project is on **Next.js v15** and **Tailwind CSS v4**.

### Tailwind and global styles setup

Your host app `globals.css` must include the following (Tailwind v4 syntax):

```css
@import '@janovix/ui/globals.css';
@source '../../node_modules/@janovix/ui/**/*.{js,ts,jsx,tsx}';
```

> **Note**: The `fonts.css` import loads the Inter font family used by the components. If you prefer to use different fonts, see the [Font Setup Guide](./FONT_SETUP.md).

### Usage

Import components directly from `@janovix/ui`:

```tsx
import { Button, ThemeSwitcher } from '@janovix/ui';

export default function Example() {
  return (
    <div className="flex items-center gap-4">
      <Button>Click me</Button>
      <ThemeSwitcher />
    </div>
  );
}
```

You can also import icons, utilities, or other components the same way:

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@janovix/ui';
```

#### Next.js v15 Client Components

When using these components in a Next.js v15 application, **always add `'use client'` to the parent component**. This ensures proper client-side rendering for interactive components:

```tsx
'use client';

import { Button, ThemeSwitcher } from '@janovix/ui';

export default function MyPage() {
  return (
    <div>
      <Button>Click me</Button>
      <ThemeSwitcher />
    </div>
  );
}
```

### Troubleshooting

- **401 Unauthorized / 404 Not Found when installing**:
  - Verify your `~/.npmrc` (or `C:\Users\<you>\.npmrc`) contains the `@janovix` scope registry and `//npm.pkg.github.com/:_authToken=...` lines.
  - Ensure the PAT has the **read:packages** scope and is not expired.
  - If you switched accounts, run `npm logout` and try again.

### Development & Contributing

#### Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd ui

# Install dependencies
pnpm install

# Run Storybook locally
pnpm storybook

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Build the library
pnpm build:lib

# Lint and format
pnpm lint
pnpm format
```

#### CI/CD & Pull Requests

This repository uses automated workflows for quality assurance:

- ✅ **Automated Testing** - All tests run on every PR
- 🎨 **Storybook Previews** - Ephemeral deployments for each PR
- 🔍 **Code Quality** - Linting and formatting checks
- 📦 **Build Verification** - Ensures no build errors

When you create a PR:
1. Automated checks will run (~5 minutes)
2. A preview deployment link will be posted in comments
3. All checks must pass before merging
4. Preview is automatically cleaned up when PR closes

**For detailed CI/CD documentation**, see [Workflows Setup Guide](.github/WORKFLOWS_SETUP.md)

### Notes

- This package targets Next.js v15 and Tailwind CSS v4 only.
- Remember to include `tw-animate-css` in your project for animations used by the components.
