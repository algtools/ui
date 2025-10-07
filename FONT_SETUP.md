# Font Setup Guide

This document explains how to properly set up fonts when using the `@janovix/ui` library in your host application.

## Font Stack

The UI library uses:

- **Sans-serif**: Inter (with system font fallbacks and ligatures enabled)
- **Monospace**: JetBrains Mono (with system font fallbacks and code ligatures enabled)

## Setup Options

### Option 1: CSS Import (Recommended)

Import the fonts CSS file in your main CSS file or root component:

```css
/* In your main CSS file */
@import '@janovix/ui/dist/fonts.css';
```

Or in your Next.js `globals.css`:

```css
@import '@janovix/ui/dist/fonts.css';
@import '@janovix/ui/dist/styles.css';
```

### Option 2: FontProvider Component

Wrap your app with the FontProvider for automatic font loading:

```tsx
import { FontProvider } from '@janovix/ui';

function MyApp({ children }) {
  return <FontProvider>{children}</FontProvider>;
}
```

**With custom fonts:**

```tsx
import { FontProvider } from '@janovix/ui';

function MyApp({ children }) {
  return (
    <FontProvider
      fonts={{
        sans: 'Inter, -apple-system, sans-serif',
        mono: 'Fira Code, Monaco, monospace',
      }}
    >
      {children}
    </FontProvider>
  );
}
```

**Disable automatic loading:**

```tsx
import { FontProvider } from '@janovix/ui';

function MyApp({ children }) {
  return <FontProvider loadFonts={false}>{children}</FontProvider>;
}
```

### Option 3: Manual Font Loading

If you prefer to load fonts yourself, ensure these CSS variables are available:

```css
:root {
  --font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'SF Mono', Monaco, monospace;
}
```

### Option 4: Next.js Integration

For Next.js applications, you can use `next/font/google`:

```tsx
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  variable: '--font-family-sans',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-family-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>{children}</body>
    </html>
  );
}
```

## Self-Hosting Fonts (Optional)

If you prefer to self-host fonts:

1. Download Inter fonts from [Google Fonts](https://fonts.google.com/specimen/Inter) or [GitHub](https://github.com/rsms/inter)
2. Download JetBrains Mono from [JetBrains](https://www.jetbrains.com/lp/mono/) or [Google Fonts](https://fonts.google.com/specimen/JetBrains+Mono)
3. Place font files in your `public/fonts/` directory
4. Update `fonts.css` with local font-face declarations

## Troubleshooting

### Fonts Not Loading

- Ensure CSS is imported before UI components
- Check browser network tab for failed font requests
- Verify font CSS variables are defined

### Font Flashing (FOUT)

- Use `font-display: swap` (already included)
- Consider preloading critical fonts:
  ```html
  <link rel="preload" href="path/to/font.woff2" as="font" type="font/woff2" crossorigin />
  ```

### Bundle Size Concerns

- Fonts are loaded from Google Fonts CDN by default
- For self-hosting, consider subset fonts or variable fonts
- Use font-display strategies for better performance

## CSS Variables Reference

```css
:root {
  --font-family-sans: /* Sans-serif font stack */ --font-family-mono: /* Monospace font stack */;
}

/* Font classes with ligatures enabled */
.font-sans {
  font-family: var(--font-family-sans);
  font-feature-settings:
    'liga' 1,
    'calt' 1;
}

.font-mono {
  font-family: var(--font-family-mono);
  font-feature-settings:
    'liga' 1,
    'calt' 1,
    'clig' 1;
  font-variant-ligatures: common-ligatures contextual;
}
```

## Font Features

### Ligatures

Both Inter and JetBrains Mono fonts come with ligatures enabled by default:

- **Inter**: Subtle text ligatures (fi, fl, ff, etc.) for improved readability
- **JetBrains Mono**: Programming ligatures (=>, >=, !=, etc.) for better code readability

### Disabling Ligatures

If you need to disable ligatures for specific elements:

```css
.no-ligatures {
  font-feature-settings:
    'liga' 0,
    'calt' 0;
  font-variant-ligatures: none;
}
```

## Utilities

```tsx
import { useFonts } from '@janovix/ui';

function MyComponent() {
  const fonts = useFonts();

  return <div style={{ fontFamily: fonts.sans }}>Sans-serif text</div>;
}
```
