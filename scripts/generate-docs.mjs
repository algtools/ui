#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectsCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const STORYBOOK_STATIC_DIR = join(__dirname, '..', 'storybook-static');
const DOCS_OUTPUT_DIR = join(__dirname, '..', 'docs');
const STORIES_JSON_PATH = join(STORYBOOK_STATIC_DIR, 'stories.json');
const INDEX_JSON_PATH = join(STORYBOOK_STATIC_DIR, 'index.json');

// R2 Configuration from environment variables
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_ENDPOINT = `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`;

// Parse command line arguments
const args = process.argv.slice(2);
let uploadToR2 = false;
let docsDir = DOCS_OUTPUT_DIR;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--upload' || arg === '-u') {
    uploadToR2 = true;
  } else if (arg.startsWith('--output-dir=')) {
    docsDir = arg.split('=')[1];
  } else if (arg === '--output-dir' || arg === '-o') {
    docsDir = args[i + 1];
    i++;
  }
}

// Helper function to sanitize filenames (kept for backward compatibility)
function sanitizeFilename(name) {
  return name
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

// Helper function to generate proper file path with folder structure and correct casing
function generateFilePath(title) {
  const parts = title.split('/');

  if (parts.length === 1) {
    // No category, just use the component name as-is
    return { folder: '', filename: `${parts[0]}.md`, relativePath: `${parts[0]}.md` };
  }

  // Extract category and component name
  const category = parts[0];
  const componentName = parts[parts.length - 1];

  // Create folder name (lowercase category)
  const folder = category.toLowerCase();

  // Use component name as-is (preserving original casing)
  const filename = `${componentName}.md`;
  const relativePath = `${folder}/${filename}`;

  return { folder, filename, relativePath };
}

// Helper to safely build regex patterns
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper function to extract component name from title and generate import statement
function generateImportStatement(title, componentPath) {
  // Extract component name from title (e.g., "UI/Button" -> "Button", "AI/Actions" -> "Actions")
  const parts = title.split('/');
  let componentName = parts[parts.length - 1];

  // Handle special cases
  // Hooks typically start with "use" (e.g., "Hooks/UseBoolean" -> "useBoolean")
  if (title.startsWith('Hooks/')) {
    // Keep the "use" prefix and make the rest camelCase
    componentName = componentName.charAt(0).toLowerCase() + componentName.slice(1);
  } else {
    // For other components, capitalize first letter
    componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  }

  // Handle special component name mappings
  const nameMappings = {
    AIImage: 'AIImage',
    AvatarEditor: 'AvatarEditor',
    ThemeSwitcher: 'ThemeSwitcher',
    PhoneInput: 'PhoneInput',
    AddressEditorMx: 'AddressEditorMx',
    InputOTP: 'InputOTP',
    AITask: 'Task', // Exported as Task but aliased as AITask
    AITool: 'Tool', // Exported as Tool but aliased as AITool
  };

  if (nameMappings[componentName]) {
    componentName = nameMappings[componentName];
  }

  // Generate import statement
  return `import { ${componentName} } from '@algtools/ui';`;
}

// Helper function to format markdown
function formatMarkdown(component) {
  const { title, description, props, stories, storybookUrl, componentPath } = component;
  const updateDate = new Date().toISOString();

  let markdown = `# ${title}\n\n`;

  // Add component description first (if available)
  if (description) {
    markdown += `${description}\n\n`;
  }

  // Add update date after description
  markdown += `**Last Updated:** ${updateDate}\n\n`;

  if (storybookUrl) {
    markdown += `**View in Storybook:** [${title}](${storybookUrl})\n\n`;
  }

  // Generate and add import statement
  const importStatement = generateImportStatement(title, componentPath);
  markdown += `## Import\n\n\`\`\`typescript\n${importStatement}\n\`\`\`\n\n`;

  // Props/ArgTypes section
  if (props && Object.keys(props).length > 0) {
    markdown += `## Props\n\n`;
    markdown += `| Prop | Type | Description | Options |\n`;
    markdown += `|------|------|-------------|---------|\n`;

    for (const [propName, propInfo] of Object.entries(props)) {
      const control = propInfo.control || 'text';
      const description = propInfo.description || '';
      const options = propInfo.options ? propInfo.options.join(', ') : '';
      markdown += `| \`${propName}\` | ${control} | ${description} | ${options} |\n`;
    }
    markdown += `\n`;
  }

  // Stories section
  if (stories && stories.length > 0) {
    markdown += `## Stories\n\n`;
    for (const story of stories) {
      markdown += `### ${story.name}\n\n`;

      // Add story description
      if (story.description) {
        markdown += `${story.description}\n\n`;
      }

      // Add story source code below description when available
      if (story.source) {
        markdown += `\`\`\`tsx\n${story.source}\n\`\`\`\n\n`;
      }

      if (storybookUrl) {
        const storyUrl = storybookUrl.replace(/\?path=\/story\/.*/, `?path=/story/${story.id}`);
        markdown += `[View story in Storybook](${storyUrl})\n\n`;
      }
    }
  }

  markdown += `---\n\n`;
  markdown += `*Generated from Storybook documentation on ${updateDate}*\n`;

  return markdown;
}

// Generate markdown files from stories
function generateMarkdownDocs() {
  console.log('📚 Generating markdown documentation from Storybook...');

  // Check if stories.json exists, otherwise try index.json
  let storiesData;
  if (existsSync(STORIES_JSON_PATH)) {
    console.log('Reading stories.json...');
    storiesData = JSON.parse(readFileSync(STORIES_JSON_PATH, 'utf8'));
  } else if (existsSync(INDEX_JSON_PATH)) {
    console.log('Reading index.json...');
    const indexData = JSON.parse(readFileSync(INDEX_JSON_PATH, 'utf8'));
    storiesData = indexData.entries || indexData;
  } else {
    throw new Error(
      `Neither stories.json nor index.json found in ${STORYBOOK_STATIC_DIR}. Please run 'npm run build-storybook' first.`
    );
  }

  // Create output directory
  if (!existsSync(docsDir)) {
    mkdirSync(docsDir, { recursive: true });
  }

  // Cache story file contents to avoid repeated disk reads
  const storyFileCache = new Map();

  function getStoryFileContent(importPath) {
    if (!importPath) return null;

    const cleaned = importPath.replace(/^\.\//, '');
    const candidates = [];

    if (importPath) candidates.push(importPath);
    candidates.push(join(__dirname, '..', importPath));
    candidates.push(join(__dirname, '..', cleaned));
    candidates.push(join(__dirname, '..', cleaned.split('/').join('\\')));

    for (const candidate of candidates) {
      if (!candidate || storyFileCache.has(candidate)) {
        const cached = storyFileCache.get(candidate);
        if (cached) return cached;
      }

      if (candidate && existsSync(candidate)) {
        try {
          const content = readFileSync(candidate, 'utf8');
          storyFileCache.set(candidate, content);
          return content;
        } catch (error) {
          // continue to next candidate
        }
      }
    }

    return null;
  }

  // Provide multiple ways a story name may appear in exports
  function getStoryNameVariations(storyName) {
    return [
      storyName.replace(/\s+/g, ''),
      storyName.replace(/\s+/g, '-'),
      storyName
        .split(/\s+/)
        .map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
        .join(''),
      storyName
        .split(/\s+/)
        .map((word, i) =>
          i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(''),
    ]
      .filter(Boolean)
      .reduce((acc, name) => {
        if (!acc.includes(name)) acc.push(name);
        return acc;
      }, []);
  }

  // Extract the full story export code block for documentation
  function extractStoryCode(importPath, storyName) {
    const storyContent = getStoryFileContent(importPath);
    if (!storyContent) return null;

    const nameVariations = getStoryNameVariations(storyName);

    for (const exportName of nameVariations) {
      const exportPattern = new RegExp(
        `export\\s+const\\s+${escapeRegExp(exportName)}\\s*(?::[^=]+)?=\\s*\\{`,
        's'
      );

      const exportMatch = storyContent.match(exportPattern);
      if (exportMatch) {
        const startBrace = storyContent.indexOf('{', exportMatch.index);
        if (startBrace === -1) continue;

        let braceCount = 1;
        let endPos = startBrace + 1;

        while (endPos < storyContent.length && braceCount > 0) {
          const char = storyContent[endPos];
          if (char === '{') braceCount++;
          if (char === '}') braceCount--;
          endPos++;
        }

        if (braceCount === 0) {
          const rawBlock = storyContent.substring(exportMatch.index, endPos);

          // Prefer explicit docs.source.code snippets (common for hooks demos)
          const sourceBlockMatches = [
            rawBlock.match(/source\s*:\s*\{\s*code\s*:\s*`([^`]+)`/s),
            rawBlock.match(/source\s*:\s*\{\s*code\s*:\s*['"]([^'"`]+)['"]/s),
          ];
          for (const match of sourceBlockMatches) {
            if (match && match[1]) {
              return match[1].trim();
            }
          }

          // Try to extract just the render function/snippet instead of the whole story object
          const renderMatch = rawBlock.match(
            /render\s*:\s*([^]*?)(?=,\s*\w+\s*:|\n\s*}\s*,?|\n\s*}\s*$)/
          );

          if (renderMatch && renderMatch[1]) {
            return renderMatch[1].trim();
          }

          // If no render is defined, return null to avoid dumping the full story object
          return null;
        }
      }
    }

    return null;
  }

  // Helper function to extract component description from story file
  function extractComponentDescription(importPath) {
    const storyContent = getStoryFileContent(importPath);
    if (!storyContent) return null;

    // Extract description from parameters.docs.description.component
    // Handle both single-line and multi-line formats
    // Pattern 1: description: { component: '...' }
    const descMatch1 = storyContent.match(
      /description:\s*\{\s*component:\s*['"`]([^'"`]+)['"`]\s*\}/s
    );
    if (descMatch1) {
      return descMatch1[1].trim();
    }

    // Pattern 2: description: { component:\n  '...' } (with newline after component:)
    const descMatch2 = storyContent.match(
      /description:\s*\{\s*component:\s*\n\s*['"`]([^'"`]+)['"`]\s*\}/s
    );
    if (descMatch2) {
      return descMatch2[1].trim();
    }

    // Pattern 3: template literal format
    const descMatch3 = storyContent.match(/description:\s*\{\s*component:\s*`([^`]+)`\s*\}/s);
    if (descMatch3) {
      return descMatch3[1].trim();
    }

    // Pattern 4: More flexible - find component: in description context
    // Look for docs: { description: { component: ... } }
    const docsBlockMatch = storyContent.match(
      /docs:\s*\{[^}]*description:\s*\{[^}]*component:\s*['"`]([^'"`]+)['"`][^}]*\}[^}]*\}/s
    );
    if (docsBlockMatch) {
      return docsBlockMatch[1].trim();
    }

    return null;
  }

  // Helper function to extract story description from story file
  function extractStoryDescription(importPath, storyName) {
    const storyContent = getStoryFileContent(importPath);
    if (!storyContent) return null;

    // Convert story name to possible export names
    // "With Icons" -> ["WithIcons", "With Icons", "withIcons", "with-icons"]
    const uniqueNames = getStoryNameVariations(storyName);

    // Try to find story by export name
    for (const exportName of uniqueNames) {
      // Find the export line
      const exportPattern = new RegExp(
        `export\\s+const\\s+${escapeRegExp(exportName)}\\s*:\\s*Story\\s*=\\s*\\{`,
        's'
      );

      const exportMatch = storyContent.match(exportPattern);
      if (exportMatch) {
        const startPos = exportMatch.index + exportMatch[0].length - 1; // Position of opening brace

        // Find matching closing brace by counting braces
        let braceCount = 1;
        let endPos = startPos + 1;
        while (endPos < storyContent.length && braceCount > 0) {
          if (storyContent[endPos] === '{') braceCount++;
          if (storyContent[endPos] === '}') braceCount--;
          endPos++;
        }

        if (braceCount === 0) {
          const storyBlock = storyContent.substring(exportMatch.index, endPos);

          // Try multiple patterns in order of specificity
          const patterns = [
            // Most specific: description: { story: '...' }
            /description:\s*\{\s*story:\s*['"`]([^'"`]+)['"`]\s*\}/s,
            // Template literal: description: { story: `...` }
            /description:\s*\{\s*story:\s*`([^`]+)`\s*\}/s,
            // Less specific but still good: story: '...' inside description object
            /story:\s*['"`]([^'"`]+)['"`]/s,
          ];

          for (const pattern of patterns) {
            const match = storyBlock.match(pattern);
            if (match) {
              return match[1].trim();
            }
          }
        }
      }
    }

    // Fallback: search for the story name in the file and look for nearby description
    const storyNameLower = storyName.toLowerCase();
    const lines = storyContent.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (
        lines[i].includes(`export const`) &&
        lines[i].toLowerCase().includes(storyNameLower.replace(/\s+/g, ''))
      ) {
        // Look ahead for description
        for (let j = i; j < Math.min(i + 30, lines.length); j++) {
          const descMatch = lines[j].match(/description:\s*\{\s*story:\s*['"`]([^'"`]+)['"`]\s*\}/);
          if (descMatch) {
            return descMatch[1].trim();
          }
          const descMatch2 = lines[j].match(/description:\s*['"`]([^'"`]+)['"`]/);
          if (descMatch2 && !lines[j].includes('component:')) {
            return descMatch2[1].trim();
          }
        }
      }
    }

    return null;
  }

  // Helper function to generate default story description
  function generateDefaultStoryDescription(storyName) {
    const name = storyName.toLowerCase();
    if (name === 'default') {
      return 'The default implementation of this component.';
    }
    if (name.includes('variant') || name.includes('variants')) {
      return 'Shows different visual variants of this component.';
    }
    if (name.includes('size') || name.includes('sizes')) {
      return 'Demonstrates different size options available.';
    }
    if (name.includes('state') || name.includes('states')) {
      return 'Shows various states of this component.';
    }
    if (name.includes('with') || name.includes('without')) {
      const rest = name.replace(/^(with|without)\s*/i, '').trim();
      if (rest) {
        return `Shows the component ${rest}.`;
      }
      return `Shows the component ${name.includes('with') ? 'with' : 'without'} additional features.`;
    }
    if (name.includes('example') || name.includes('demo')) {
      return 'An example usage of this component.';
    }
    // Generate a description based on the story name
    const words = name.split(/[\s-]+/).filter(Boolean);
    if (words.length > 0) {
      const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      const rest = words.slice(1).join(' ');
      if (rest) {
        return `Shows ${firstWord.toLowerCase()} ${rest} configuration.`;
      }
      return `Shows ${firstWord.toLowerCase()} usage.`;
    }
    return 'An example of this component.';
  }

  // Extract components from _components if available, otherwise process stories
  let components = [];
  if (storiesData._components) {
    // Process _components and enrich with story descriptions
    components = Object.values(storiesData._components).map((component) => {
      // If component description is missing, try to extract from story file
      if (!component.description && component.importPath) {
        component.description = extractComponentDescription(component.importPath);
      }
      // Enrich stories with descriptions from the full stories data
      const enrichedStories = component.stories.map((story) => {
        // Find the story in the full stories data
        let storyDescription = null;
        let storyImportPath = null;
        let storySource = null;
        for (const [storyId, storyData] of Object.entries(storiesData)) {
          if (storyData.id === story.id && storyData.name === story.name) {
            storyImportPath = storyData.importPath || null;
            storyDescription =
              storyData.parameters?.docs?.description?.story ||
              storyData.parameters?.docs?.description ||
              null;
            storySource = storyData.parameters?.docs?.source?.code || null;

            // If not found in data, try to extract from story file
            if (!storyDescription && storyData.importPath) {
              storyDescription = extractStoryDescription(storyData.importPath, story.name);
            }
            break;
          }
        }

        // If still not found, try using component's importPath
        if (!storyDescription && component.importPath) {
          storyDescription = extractStoryDescription(component.importPath, story.name);
          if (!storyImportPath) {
            storyImportPath = component.importPath;
          }
          if (!storySource) {
            storySource = extractStoryCode(component.importPath, story.name);
          }
        }

        // If still not found, generate default
        if (!storyDescription) {
          storyDescription = generateDefaultStoryDescription(story.name);
        }

        if (!storySource) {
          storySource = extractStoryCode(storyImportPath || component.importPath, story.name);
        }

        return {
          ...story,
          description: storyDescription,
          source: storySource,
        };
      });
      return {
        ...component,
        stories: enrichedStories,
      };
    });
  } else {
    // Group stories by title
    const componentMap = new Map();
    const skippedEntries = [];
    const processedTitles = new Set();

    for (const [storyId, storyData] of Object.entries(storiesData)) {
      // Process stories - ensure we include all story types, not just 'story'
      // Some entries might be 'docs' or other types but still have story data
      const isStory =
        storyData.type === 'story' ||
        (storyData.type !== undefined && storyData.title && storyData.name);

      if (isStory && storyData.title) {
        const title = storyData.title;
        processedTitles.add(title);

        if (!componentMap.has(title)) {
          let componentDescription = storyData.parameters?.docs?.description?.component || null;

          // If not found in data, try to extract from story file
          if (!componentDescription && storyData.importPath) {
            componentDescription = extractComponentDescription(storyData.importPath);
          }

          componentMap.set(title, {
            title,
            description: componentDescription,
            props: storyData.componentInfo?.props || {},
            stories: [],
            storybookUrl: storyData.id
              ? `https://algtools.github.io/ui/?path=/story/${storyData.id}`
              : null,
            componentPath: storyData.componentPath || null,
            importPath: storyData.importPath || null,
          });
        }
        const component = componentMap.get(title);
        // Try to get description from story data first
        let storyDescription =
          storyData.parameters?.docs?.description?.story ||
          storyData.parameters?.docs?.description ||
          null;
        let storySource = storyData.parameters?.docs?.source?.code || null;

        // If not found, try to extract from story file
        if (!storyDescription && storyData.importPath) {
          storyDescription = extractStoryDescription(storyData.importPath, storyData.name);
        }

        // If still not found, generate a default
        if (!storyDescription) {
          storyDescription = generateDefaultStoryDescription(storyData.name);
        }

        if (!storySource) {
          storySource = extractStoryCode(
            storyData.importPath || component.importPath,
            storyData.name
          );
        }

        component.stories.push({
          id: storyData.id,
          name: storyData.name,
          description: storyDescription,
          source: storySource,
        });
      } else if (storyData.title) {
        // Log entries that have titles but aren't being processed
        skippedEntries.push({
          id: storyId,
          type: storyData.type,
          title: storyData.title,
          name: storyData.name,
        });
      }
    }
    components = Array.from(componentMap.values());

    // Log statistics
    const hooksCount = components.filter((c) => c.title.startsWith('Hooks/')).length;
    console.log(`Found ${components.length} components (${hooksCount} hooks)`);

    if (skippedEntries.length > 0) {
      console.log(`⚠️  Skipped ${skippedEntries.length} entries that might need processing:`);
      skippedEntries.slice(0, 10).forEach((entry) => {
        console.log(`   - ${entry.title} (type: ${entry.type || 'unknown'})`);
      });
      if (skippedEntries.length > 10) {
        console.log(`   ... and ${skippedEntries.length - 10} more`);
      }
    }
  }

  // Ensure hooks are included - double check
  const hooksInComponents = components.filter((c) => c.title.startsWith('Hooks/'));
  if (hooksInComponents.length === 0) {
    console.warn(
      '⚠️  Warning: No hooks found in components. This might indicate an issue with Storybook build.'
    );
  } else {
    console.log(`✅ Verified ${hooksInComponents.length} hooks will be documented`);
  }

  // Fallback: If hooks are missing, try to find them in source files
  const existingTitles = new Set(components.map((c) => c.title));
  const hooksStoriesDir = join(__dirname, '..', 'src', 'stories');
  if (existsSync(hooksStoriesDir)) {
    const hookFiles = readdirSync(hooksStoriesDir).filter(
      (f) => f.startsWith('Use') && f.endsWith('.stories.tsx')
    );

    for (const hookFile of hookFiles) {
      const hookFilePath = join(hooksStoriesDir, hookFile);
      try {
        const hookContent = readFileSync(hookFilePath, 'utf8');
        const titleMatch = hookContent.match(/title:\s*['"`]([^'"`]+)['"`]/);
        if (titleMatch) {
          const hookTitle = titleMatch[1];
          if (hookTitle.startsWith('Hooks/') && !existingTitles.has(hookTitle)) {
            // Create relative import path
            const relativePath = hookFilePath.replace(join(__dirname, '..') + '/', './');
            const matchingEntries = Object.values(storiesData).filter(
              (entry) => entry && entry.title === hookTitle && entry.id
            );
            const storyIdByName = new Map(
              matchingEntries
                .filter((entry) => entry.name && entry.id)
                .map((entry) => [entry.name, entry.id])
            );
            const componentStorybookUrl =
              matchingEntries.length > 0
                ? `https://algtools.github.io/ui/?path=/story/${matchingEntries[0].id}`
                : null;
            // Extract basic info from the file
            const description = extractComponentDescription(relativePath);

            // Try to find all story exports in the file
            const storyExports = [];
            const storyExportMatches = [
              ...hookContent.matchAll(/export\s+const\s+(\w+)\s*:\s*Story\s*=/g),
            ];
            for (const match of storyExportMatches) {
              const storyName = match[1];
              const storyDesc =
                extractStoryDescription(relativePath, storyName) ||
                generateDefaultStoryDescription(storyName);
              const storySource = extractStoryCode(relativePath, storyName);
              const storyId = storyIdByName.get(storyName) || null;
              storyExports.push({
                id: storyId,
                name: storyName,
                description: storyDesc,
                source: storySource,
              });
            }

            // If no stories found, add a default one
            if (storyExports.length === 0) {
              storyExports.push({
                id: null,
                name: 'Default',
                description: `Default usage of ${hookTitle.replace('Hooks/', '')}`,
                source: null,
              });
            }

            components.push({
              title: hookTitle,
              description: description || `A React hook for ${hookTitle.replace('Hooks/', '')}`,
              props: {},
              stories: storyExports,
              storybookUrl: componentStorybookUrl,
              componentPath: null,
              importPath: relativePath,
            });
            existingTitles.add(hookTitle);
          }
        }
      } catch (error) {
        // Silently skip if we can't read the file
      }
    }
  }

  console.log(
    `Final count: ${components.length} components (${components.filter((c) => c.title.startsWith('Hooks/')).length} hooks)`
  );

  // Generate markdown for each component
  const generatedFiles = [];
  for (const component of components) {
    const { folder, filename, relativePath } = generateFilePath(component.title);

    // Create folder if needed
    const componentDir = folder ? join(docsDir, folder) : docsDir;
    if (folder && !existsSync(componentDir)) {
      mkdirSync(componentDir, { recursive: true });
    }

    const filepath = join(componentDir, filename);
    const markdown = formatMarkdown(component);
    writeFileSync(filepath, markdown, 'utf8');
    generatedFiles.push({ filename, filepath, relativePath, component: component.title });
    console.log(`  ✓ Generated: ${relativePath} (${component.title})`);
  }

  // Generate index file with organized categories
  const categoryMap = new Map();

  // Group components by category
  for (const component of components) {
    const parts = component.title.split('/');
    const category = parts.length > 1 ? parts[0] : 'Other';
    const componentName = parts[parts.length - 1];
    const { relativePath } = generateFilePath(component.title);

    if (!categoryMap.has(category)) {
      categoryMap.set(category, []);
    }
    categoryMap.get(category).push({
      ...component,
      componentName,
      filename: relativePath,
    });
  }

  // Sort categories
  const sortedCategories = Array.from(categoryMap.keys()).sort();

  // Generate index markdown
  const updateDate = new Date().toISOString();
  let indexMarkdown = `# @algtools/ui Component Library\n\n`;
  indexMarkdown += `**Last Updated:** ${updateDate}\n\n`;
  indexMarkdown += `Complete documentation for all components available in the \`@algtools/ui\` package.\n\n`;
  indexMarkdown += `## Quick Start\n\n`;
  indexMarkdown += `\`\`\`typescript\n`;
  indexMarkdown += `import { Button, Card, Dialog } from '@algtools/ui';\n`;
  indexMarkdown += `\`\`\`\n\n`;
  indexMarkdown += `## Components by Category\n\n`;

  // Generate sections for each category
  for (const category of sortedCategories) {
    const categoryComponents = categoryMap.get(category);
    categoryComponents.sort((a, b) => a.componentName.localeCompare(b.componentName));

    indexMarkdown += `### ${category}\n\n`;

    for (const component of categoryComponents) {
      const importStatement = generateImportStatement(component.title, component.componentPath);
      const componentName = importStatement.match(/\{ (\w+) \}/)?.[1] || component.componentName;

      indexMarkdown += `- **[${component.title}](${component.filename})**\n`;
      indexMarkdown += `  \`\`\`typescript\n`;
      indexMarkdown += `  ${importStatement}\n`;
      indexMarkdown += `  \`\`\`\n`;

      if (component.description) {
        indexMarkdown += `  ${component.description}\n`;
      }
      indexMarkdown += `\n`;
    }
  }

  // Add summary statistics
  indexMarkdown += `---\n\n`;
  indexMarkdown += `## Summary\n\n`;
  indexMarkdown += `- **Total Components:** ${components.length}\n`;
  indexMarkdown += `- **Number of Categories:** ${sortedCategories.length}\n`;
  indexMarkdown += `- **Categories:** ${sortedCategories.join(', ')}\n\n`;
  indexMarkdown += `---\n\n`;
  indexMarkdown += `*This documentation is automatically generated from Storybook stories.*\n`;
  indexMarkdown += `*Last updated: ${updateDate}*\n`;

  const indexPath = join(docsDir, 'README.md');
  writeFileSync(indexPath, indexMarkdown, 'utf8');
  console.log(`  ✓ Generated: README.md (index with ${sortedCategories.length} categories)`);

  console.log(`\n✅ Generated ${generatedFiles.length} markdown files in ${docsDir}`);
  return { generatedFiles, docsDir };
}

// R2 Upload functions
async function initializeR2Client() {
  if (!CLOUDFLARE_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
    throw new Error(
      'Missing R2 configuration. Please set CLOUDFLARE_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_BUCKET_NAME environment variables.'
    );
  }

  return new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

async function cleanR2Bucket(s3Client, prefix = '') {
  console.log(`🧹 Cleaning R2 bucket (markdown files only)...`);

  let continuationToken = undefined;
  let deletedCount = 0;

  try {
    do {
      const listCommand = new ListObjectsV2Command({
        Bucket: R2_BUCKET_NAME,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      });

      const response = await s3Client.send(listCommand);

      if (response.Contents && response.Contents.length > 0) {
        // Filter to only delete markdown files (including in subdirectories)
        const markdownFiles = response.Contents.filter((obj) => {
          const key = obj.Key;
          return key.endsWith('.md');
        });

        if (markdownFiles.length > 0) {
          const deleteCommand = new DeleteObjectsCommand({
            Bucket: R2_BUCKET_NAME,
            Delete: {
              Objects: markdownFiles.map((obj) => ({ Key: obj.Key })),
            },
          });

          const deleteResponse = await s3Client.send(deleteCommand);
          deletedCount += deleteResponse.Deleted?.length || 0;
          console.log(`  Deleted ${deleteResponse.Deleted?.length || 0} markdown files`);
        }
      }

      continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    if (deletedCount === 0) {
      console.log(`  No markdown files found to delete`);
    } else {
      console.log(`✅ Cleaned ${deletedCount} markdown files from bucket`);
    }
  } catch (error) {
    console.warn(`⚠️  Warning: Could not clean bucket: ${error.message}`);
    throw error;
  }

  return deletedCount;
}

async function uploadFilesToR2(s3Client, docsDir, prefix = '') {
  console.log(`📤 Uploading markdown files to R2 bucket...`);

  // Recursively find all markdown files
  function findMarkdownFiles(dir, baseDir = dir) {
    const files = [];
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...findMarkdownFiles(fullPath, baseDir));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const relativePath = fullPath.replace(baseDir + '/', '').replace(/\\/g, '/');
        files.push({ fullPath, relativePath });
      }
    }

    return files;
  }

  const files = findMarkdownFiles(docsDir);

  if (files.length === 0) {
    throw new Error(`No markdown files found in ${docsDir}`);
  }

  let uploadedCount = 0;

  for (const { fullPath, relativePath } of files) {
    try {
      const fileContent = readFileSync(fullPath, 'utf8');
      // Upload with folder structure preserved
      const key = prefix ? `${prefix}${relativePath}` : relativePath;

      const putCommand = new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: fileContent,
        ContentType: 'text/markdown',
      });

      await s3Client.send(putCommand);
      console.log(`  ✓ Uploaded: ${key}`);
      uploadedCount++;
    } catch (error) {
      console.error(`  ✗ Failed to upload ${relativePath}: ${error.message}`);
      throw error;
    }
  }

  console.log(`✅ Uploaded ${uploadedCount} files to R2 bucket`);
  return uploadedCount;
}

// Main execution
async function main() {
  try {
    // Generate markdown docs
    const { docsDir: outputDir } = generateMarkdownDocs();

    // Upload to R2 if requested
    if (uploadToR2) {
      const s3Client = await initializeR2Client();
      await cleanR2Bucket(s3Client);
      await uploadFilesToR2(s3Client, outputDir);

      console.log(`\n✅ Documentation uploaded successfully to R2 bucket: ${R2_BUCKET_NAME}`);
    } else {
      console.log(`\n💡 To upload to R2, run with --upload flag`);
      console.log(
        `   Make sure to set CLOUDFLARE_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_BUCKET_NAME`
      );
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();
