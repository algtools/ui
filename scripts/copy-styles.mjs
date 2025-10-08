import {
  mkdirSync,
  copyFileSync,
  existsSync,
  writeFileSync,
  readdirSync,
  readFileSync,
} from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(process.cwd());
const source = resolve(projectRoot, 'src', 'app', 'globals.css');
const distDir = resolve(projectRoot, 'dist');
const globalsOut = resolve(distDir, 'globals.css');
const stylesOut = resolve(distDir, 'styles.css');

if (!existsSync(source)) {
  console.error(`[copy-styles] Source not found: ${source}`);
  process.exit(0);
}

mkdirSync(distDir, { recursive: true });

// Read source CSS and fix fonts and scrollbar import paths for distribution
const css = readFileSync(source, 'utf8');
// Ensure the imports point to dist files instead of relative source paths
let fixed = css.replace("@import '../styles/fonts.css';", "@import './fonts.css';");
fixed = fixed.replace("@import '../styles/scrollbar.css';", "@import './scrollbar.css';");
writeFileSync(globalsOut, fixed);
writeFileSync(stylesOut, fixed);

// Copy fonts.css to dist
const fontsSource = resolve(projectRoot, 'src', 'styles', 'fonts.css');
const fontsOut = resolve(distDir, 'fonts.css');

if (existsSync(fontsSource)) {
  copyFileSync(fontsSource, fontsOut);
  console.log('[copy-styles] Copied fonts.css to dist/fonts.css');
}

// Copy scrollbar.css to dist
const scrollbarSource = resolve(projectRoot, 'src', 'styles', 'scrollbar.css');
const scrollbarOut = resolve(distDir, 'scrollbar.css');

if (existsSync(scrollbarSource)) {
  copyFileSync(scrollbarSource, scrollbarOut);
  console.log('[copy-styles] Copied scrollbar.css to dist/scrollbar.css');
}

// Copy ai-components.css to dist
const aiComponentsSource = resolve(projectRoot, 'src', 'styles', 'ai-components.css');
const aiComponentsOut = resolve(distDir, 'ai-components.css');

if (existsSync(aiComponentsSource)) {
  copyFileSync(aiComponentsSource, aiComponentsOut);
  console.log('[copy-styles] Copied ai-components.css to dist/ai-components.css');
}

console.log('[copy-styles] Copied globals.css to dist/globals.css and dist/styles.css');

// Generate a client entry that uses NAMED re-exports (no `export *`) so Next.js accepts it
const clientEsm = resolve(distDir, 'index.client.mjs');
const clientCjs = resolve(distDir, 'index.client.js');

function extractNamedExportsFromSource(tsxFile) {
  const src = readFileSync(tsxFile, 'utf8');
  // Collect all `export { ... }` blocks (may be multiple, multi-line)
  const blocks = [...src.matchAll(/export\s*\{([\s\S]*?)\}\s*;?/g)];
  if (!blocks.length) return [];
  const names = new Set();
  for (const m of blocks) {
    const inner = m[1];
    inner
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      // Ignore TS type-only re-exports like `type Foo`
      .filter((s) => !/^type\s+/i.test(s))
      // Remove aliasing (e.g., `Foo as Bar` -> `Foo`)
      .map((s) => s.replace(/\s+as\s+.*$/i, ''))
      // Drop `default` if present
      .filter((s) => s !== 'default')
      .forEach((n) => names.add(n));
  }
  // Also capture declaration exports: `export const Foo`, `export function Bar`, `export class Baz`
  const decls = src.matchAll(
    /export\s+(?:const|let|var|function|class)\s+([A-Za-z_][A-Za-z0-9_]*)/g
  );
  for (const d of decls) {
    const n = d[1];
    if (n && n !== 'default') names.add(n);
  }
  return Array.from(names);
}

try {
  const uiSrcDir = resolve(projectRoot, 'src', 'components', 'ui');
  const files = readdirSync(uiSrcDir).filter((f) => f.endsWith('.tsx'));

  const lines = ['"use client";'];

  for (const file of files) {
    const abs = resolve(uiSrcDir, file);
    const names = extractNamedExportsFromSource(abs);
    if (names.length === 0) continue;
    const base = file.replace(/\.tsx$/, '');
    // Point to built ESM chunk
    lines.push(`export { ${names.join(', ')} } from "./components/ui/${base}.mjs";`);
  }

  // Ensure ThemeSwitcher named exports are present even if detection fails
  if (!lines.some((l) => l.includes('/theme-switcher.mjs'))) {
    lines.push(
      'export { ThemeSwitcher, useThemeTransition } from "./components/ui/theme-switcher.mjs";'
    );
  }

  // Re-export utilities (cn)
  try {
    const utilsSrc = resolve(projectRoot, 'src', 'lib', 'utils.ts');
    const utilsSrcCode = readFileSync(utilsSrc, 'utf8');
    if (
      /export\s+function\s+cn\s*\(/.test(utilsSrcCode) ||
      /export\s*\{\s*cn\s*\}/.test(utilsSrcCode)
    ) {
      lines.push('export { cn } from "./lib/utils.mjs";');
    }
  } catch {}

  writeFileSync(clientEsm, lines.join('\n') + '\n');
  // CJS wrapper delegates to built CJS. This is safe for tools that require() the package.
  writeFileSync(clientCjs, '"use client";\nmodule.exports = require("./index.js");\n');
  console.log('[copy-styles] Wrote client wrapper with named exports: index.client.mjs');
} catch (e) {
  console.warn('[copy-styles] Failed generating client wrapper', e);
}
