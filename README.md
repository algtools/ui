## @algtools/ui

A modern React component library for building delightful interfaces in Next.js applications.

Based on **shadcn/ui** with custom additions and optimizations.

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
@algtools:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
always-auth=true
```

3. **Install the package and required dependency**

```bash
npm i @algtools/ui tw-animate-css
# or
pnpm add @algtools/ui tw-animate-css
# or
yarn add @algtools/ui tw-animate-css
```

Ensure your project is on **Next.js v15** and **Tailwind CSS v4**.

### Tailwind and global styles setup

Your host app `globals.css` must include the following (Tailwind v4 syntax):

```css
@import '@algtools/ui/globals.css';
@source '../../node_modules/@algtools/ui/**/*.{js,ts,jsx,tsx}';
```

> **Note**: The `fonts.css` import loads the Inter font family used by the components. If you prefer to use different fonts, see the [Font Setup Guide](./FONT_SETUP.md).

### Usage

Import components directly from `@algtools/ui`:

```tsx
import { Button, ThemeSwitcher } from '@algtools/ui';

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
import { Card, CardHeader, CardTitle, CardContent } from '@algtools/ui';
```

#### Next.js v15 Client Components

When using these components in a Next.js v15 application, **always add `'use client'` to the parent component**. This ensures proper client-side rendering for interactive components:

```tsx
'use client';

import { Button, ThemeSwitcher } from '@algtools/ui';

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
  - Verify your `~/.npmrc` (or `C:\Users\<you>\.npmrc`) contains the `@algtools` scope registry and `//npm.pkg.github.com/:_authToken=...` lines.
  - Ensure the PAT has the **read:packages** scope and is not expired.
  - If you switched accounts, run `npm logout` and try again.

### Component Documentation

📚 **[SHADCN_COMPONENTS.md](./SHADCN_COMPONENTS.md)** - Complete list of 58 available components

- All shadcn/ui base components
- Custom additions (AvatarEditor, AddressEditorMX, PhoneInput, etc.)
- Usage examples and import patterns
- Organized by category and use case

🔍 **[MISSING_SHADCN_IO_COMPONENTS.md](./MISSING_SHADCN_IO_COMPONENTS.md)** - Analysis of shadcn.io components not yet included

- 16 AI components for chat interfaces
- 35+ React hooks (useDebounce, useLocalStorage, etc.)
- Animated button variants
- Animation components
- Recommendations for future additions

🗺️ **[ROADMAP_SHADCN_IO.md](./ROADMAP_SHADCN_IO.md)** - Strategic roadmap for shadcn.io integration

- Phase 1: Essential Hooks (High Priority)
- Phase 2: AI Components (Conditional)
- Phase 3: Remaining Hooks (Medium Priority)
- Implementation strategy and priorities

### Linear Tickets (For Cursor AI Implementation)

🎫 **[LINEAR_TICKETS_INDEX.md](./LINEAR_TICKETS_INDEX.md)** - Complete ticket index (45 tickets, 83 points)

- Quick start guide and execution strategy
- Dependency graph and progress tracking
- 3 execution options (All-In, Pragmatic, Minimal)

📋 **Phase-Specific Tickets:**

- [Phase 1: Essential Hooks](./LINEAR_TICKETS_PHASE_1_HOOKS.md) - 12 tickets, 19 points (HIGH Priority)
- [Phase 2: AI Components](./LINEAR_TICKETS_PHASE_2_AI.md) - 18 tickets, 38 points (CONDITIONAL)
- [Phase 3: Remaining Hooks](./LINEAR_TICKETS_PHASE_3_HOOKS_REMAINING.md) - 15 tickets, 26 points (MEDIUM Priority)

🤖 **[CURSOR_AI_GUIDE.md](./CURSOR_AI_GUIDE.md)** - Guide for using tickets with Cursor AI

- Workflow steps and best practices
- Sample prompts for AI agents
- Common issues and solutions
- Progress tracking templates

### Notes

- This package targets Next.js v15 and Tailwind CSS v4 only.
- Remember to include `tw-animate-css` in your project for animations used by the components.
- Components are based on shadcn/ui with custom additions.
- See documentation files above for complete component lists and missing features from shadcn.io.
