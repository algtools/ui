#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, copyFileSync } from 'fs';
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

// Determine base path for GitHub Pages deployment
// If deployed to algtools.github.io/ui, the base path should be /ui
// This will be passed as an environment variable to be used in main.ts
if (isGitHubPages && repoName === 'ui') {
  process.env.STORYBOOK_BASE_PATH = '/ui';
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

  // Enrich stories.json with component information (props, specs, etc.)
  const enrichScriptPath = join(__dirname, 'enrich-stories-json.mjs');
  try {
    console.log('Enriching stories.json with component information...');
    execSync(`node ${enrichScriptPath}`, {
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_OPTIONS: '--max_old_space_size=4096',
      },
    });
    console.log('✅ Enriched stories.json with component props and specs');
  } catch (enrichError) {
    console.warn(
      '⚠️  Warning: Could not enrich stories.json, using basic copy:',
      enrichError.message
    );
    // Fallback to simple copy if enrichment fails
    const indexJsonPath = join(__dirname, '..', outputDir, 'index.json');
    const storiesJsonPath = join(__dirname, '..', outputDir, 'stories.json');
    try {
      copyFileSync(indexJsonPath, storiesJsonPath);
      console.log('✅ Created basic stories.json from index.json');
    } catch (copyError) {
      console.warn('⚠️  Warning: Could not create stories.json:', copyError.message);
    }
  }

  console.log('✅ Storybook build completed successfully!');
} catch (error) {
  console.error('❌ Storybook build failed:', error.message);
  process.exit(1);
}
