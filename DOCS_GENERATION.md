# Storybook Documentation Generation

This document explains how to generate markdown documentation from Storybook stories and upload them to Cloudflare R2.

## Overview

The documentation generation script reads Storybook's `stories.json` or `index.json` file and generates individual markdown files for each component, topic, or view. These files can then be uploaded to a Cloudflare R2 bucket.

## Prerequisites

1. **Build Storybook first**: The script requires the built Storybook static files to exist.

   ```bash
   pnpm run build-storybook
   ```

2. **R2 Configuration** (for upload): If you want to upload to R2, set these environment variables:
   - `R2_ACCOUNT_ID`: Your Cloudflare account ID
   - `R2_ACCESS_KEY_ID`: Your R2 access key ID
   - `R2_SECRET_ACCESS_KEY`: Your R2 secret access key
   - `R2_BUCKET_NAME`: The name of your R2 bucket
   - `R2_PUBLIC_URL` (optional): Public URL for accessing the documentation

## Usage

### Generate Markdown Files Only

Generate markdown documentation files locally without uploading:

```bash
pnpm run docs:generate
```

This will:

- Read Storybook's stories data
- Generate one markdown file per component/topic/view
- Save files to the `docs/` directory
- Create a `README.md` index file

### Generate and Upload to R2

Generate markdown files and upload them to R2 (with bucket cleanup):

```bash
pnpm run docs:upload
```

This will:

- Generate markdown files (same as above)
- Clean the R2 bucket (delete existing docs with the `docs/` prefix)
- Upload all generated markdown files to R2

### Custom Output Directory

You can specify a custom output directory:

```bash
node scripts/generate-docs.mjs --output-dir ./custom-docs
# or
node scripts/generate-docs.mjs -o ./custom-docs
```

## Output Structure

The generated documentation includes:

- **Component Title**: The name of the component
- **Description**: Component description from Storybook
- **Storybook Link**: Direct link to view in Storybook (if deployed)
- **Component Path**: File path to the component source
- **Props Table**: Table of all component props with types, descriptions, and options
- **Stories Section**: List of all stories for the component with links

## File Naming

Component names are sanitized to create valid filenames:

- Special characters are replaced with hyphens
- Multiple hyphens are collapsed
- Converted to lowercase

Example: `UI/Button` → `ui-button.md`

## R2 Bucket Cleanup

When uploading to R2, the script will:

1. List all objects with the `docs/` prefix
2. Delete all existing objects
3. Upload the new markdown files

This ensures the bucket only contains the latest documentation.

## Environment Variables

For R2 upload, you can set these in your environment or use a `.env` file:

```bash
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=your_bucket_name
R2_PUBLIC_URL=https://your-public-url.com/docs
```

## Troubleshooting

### Error: "Neither stories.json nor index.json found"

**Solution**: Run `pnpm run build-storybook` first to generate the Storybook static files.

### Error: "Missing R2 configuration"

**Solution**: Make sure all required R2 environment variables are set before running with `--upload`.

### No components found

**Solution**: Ensure your Storybook stories are properly configured with titles and metadata. Check that `stories.json` or `index.json` contains valid story data.

## Integration with CI/CD

You can integrate this into your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Build Storybook
  run: pnpm run build-storybook

- name: Generate and Upload Docs
  env:
    R2_ACCOUNT_ID: ${{ secrets.R2_ACCOUNT_ID }}
    R2_ACCESS_KEY_ID: ${{ secrets.R2_ACCESS_KEY_ID }}
    R2_SECRET_ACCESS_KEY: ${{ secrets.R2_SECRET_ACCESS_KEY }}
    R2_BUCKET_NAME: ${{ secrets.R2_BUCKET_NAME }}
    R2_PUBLIC_URL: ${{ secrets.R2_PUBLIC_URL }}
  run: pnpm run docs:upload
```
