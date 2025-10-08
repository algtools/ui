#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json to get repository info
const packageJson = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));

// Extract repository name from package.json or environment
let repoName = 'ui'; // fallback
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

if (isGitHubPages && process.env.GITHUB_REPOSITORY) {
  // Extract repo name from GITHUB_REPOSITORY (format: "owner/repo")
  repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
}

// Parse command line arguments
const args = process.argv.slice(2);
let outputDir = 'storybook-static';
let statsJson = null;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith('--output-dir=')) {
    outputDir = arg.split('=')[1];
  } else if (arg === '--output-dir' || arg === '-o') {
    outputDir = args[i + 1];
    i++;
  } else if (arg.startsWith('--stats-json=')) {
    statsJson = arg.split('=')[1];
  } else if (arg === '--stats-json') {
    statsJson = args[i + 1];
    i++;
  }
}

console.log(`Building Storybook for repository: ${repoName}`);
console.log(`GitHub Pages deployment: ${isGitHubPages}`);
console.log(`Output directory: ${outputDir}`);
if (statsJson) {
  console.log(`Stats JSON: ${statsJson}`);
}

// Build command with forwarded arguments
let buildCommand = `storybook build --output-dir ${outputDir}`;
if (statsJson) {
  buildCommand += ` --stats-json=${statsJson}`;
}

try {
  console.log(`Running: ${buildCommand}`);
  execSync(buildCommand, {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--max_old_space_size=4096',
    },
  });
  console.log('✅ Storybook build completed successfully!');
} catch (error) {
  console.error('❌ Storybook build failed:', error.message);
  process.exit(1);
}
