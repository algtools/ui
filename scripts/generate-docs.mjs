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

// Helper function to sanitize filenames
function sanitizeFilename(name) {
  return name
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
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

  let markdown = `# ${title}\n\n`;

  if (description) {
    markdown += `${description}\n\n`;
  }

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
      if (storybookUrl) {
        const storyUrl = storybookUrl.replace(/\?path=\/story\/.*/, `?path=/story/${story.id}`);
        markdown += `[View story in Storybook](${storyUrl})\n\n`;
      }
    }
  }

  markdown += `---\n\n`;
  markdown += `*Generated from Storybook documentation*\n`;

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

  // Extract components from _components if available, otherwise process stories
  let components = [];
  if (storiesData._components) {
    components = Object.values(storiesData._components);
  } else {
    // Group stories by title
    const componentMap = new Map();
    for (const [storyId, storyData] of Object.entries(storiesData)) {
      if (storyData.type === 'story' && storyData.title) {
        const title = storyData.title;
        if (!componentMap.has(title)) {
          componentMap.set(title, {
            title,
            description: storyData.parameters?.docs?.description?.component || null,
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
        component.stories.push({
          id: storyData.id,
          name: storyData.name,
        });
      }
    }
    components = Array.from(componentMap.values());
  }

  console.log(`Found ${components.length} components`);

  // Generate markdown for each component
  const generatedFiles = [];
  for (const component of components) {
    const filename = `${sanitizeFilename(component.title)}.md`;
    const filepath = join(docsDir, filename);
    const markdown = formatMarkdown(component);
    writeFileSync(filepath, markdown, 'utf8');
    generatedFiles.push({ filename, filepath, component: component.title });
    console.log(`  ✓ Generated: ${filename} (${component.title})`);
  }

  // Generate index file with organized categories
  const categoryMap = new Map();

  // Group components by category
  for (const component of components) {
    const parts = component.title.split('/');
    const category = parts.length > 1 ? parts[0] : 'Other';
    const componentName = parts[parts.length - 1];

    if (!categoryMap.has(category)) {
      categoryMap.set(category, []);
    }
    categoryMap.get(category).push({
      ...component,
      componentName,
      filename: `${sanitizeFilename(component.title)}.md`,
    });
  }

  // Sort categories
  const sortedCategories = Array.from(categoryMap.keys()).sort();

  // Generate index markdown
  let indexMarkdown = `# @algtools/ui Component Library\n\n`;
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
  indexMarkdown += `*Generated on ${new Date().toISOString()}*\n`;
  indexMarkdown += `*This documentation is automatically generated from Storybook stories.*\n`;

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

async function cleanR2Bucket(s3Client, prefix = 'docs/') {
  console.log(`🧹 Cleaning R2 bucket (prefix: ${prefix})...`);

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
        const deleteCommand = new DeleteObjectsCommand({
          Bucket: R2_BUCKET_NAME,
          Delete: {
            Objects: response.Contents.map((obj) => ({ Key: obj.Key })),
          },
        });

        const deleteResponse = await s3Client.send(deleteCommand);
        deletedCount += deleteResponse.Deleted?.length || 0;
        console.log(`  Deleted ${deleteResponse.Deleted?.length || 0} objects`);
      }

      continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    if (deletedCount === 0) {
      console.log(`  No objects found to delete`);
    } else {
      console.log(`✅ Cleaned ${deletedCount} objects from bucket`);
    }
  } catch (error) {
    console.warn(`⚠️  Warning: Could not clean bucket: ${error.message}`);
    throw error;
  }

  return deletedCount;
}

async function uploadFilesToR2(s3Client, docsDir, prefix = 'docs/') {
  console.log(`📤 Uploading markdown files to R2 bucket...`);

  const files = readdirSync(docsDir).filter((file) => file.endsWith('.md'));

  if (files.length === 0) {
    throw new Error(`No markdown files found in ${docsDir}`);
  }

  let uploadedCount = 0;

  for (const file of files) {
    try {
      const filePath = join(docsDir, file);
      const fileContent = readFileSync(filePath, 'utf8');
      const key = `${prefix}${file}`;

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
      console.error(`  ✗ Failed to upload ${file}: ${error.message}`);
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
