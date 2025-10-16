# Cross-Posting Setup Guide

This document explains how to configure the cross-posting GitHub Actions workflow to automatically publish your Hugo blog posts to Dev.to, Medium, and Hashnode.

## Required GitHub Secrets

Navigate to your GitHub repository settings → Secrets and variables → Actions and add the following secrets:

### Dev.to
- **Secret Name**: `DEVTO_API_KEY`
- **How to get it**:
  1. Go to [dev.to/settings/account](https://dev.to/settings/account)
  2. Scroll down to "API Keys" section
  3. Generate a new API key
  4. Copy the key and add it as a GitHub secret

### Hashnode
- **Secret Name**: `HASHNODE_TOKEN`
- **How to get it**:
  1. Go to [hashnode.ai/settings](https://hashnode.ai/settings)
  2. Navigate to "Developer" or "API" section
  3. Generate a personal access token
  4. Copy the token and add it as a GitHub secret

- **Secret Name**: `HASHNODE_PUBLICATION_ID`
- **How to get it**:
  1. Go to your Hashnode publication
  2. The publication ID is in the URL: `https://hashnode.ai/[PUBLICATION_ID]`
  3. Or use GraphQL query to get your publications
  4. Copy the ID and add it as a GitHub secret

### Medium
- **Secret Name**: `MEDIUM_TOKEN`
- **How to get it**:
  1. Go to [medium.com/me/settings](https://medium.com/me/settings)
  2. Navigate to "Integration tokens" section
  3. Generate a new integration token
  4. Copy the token and add it as a GitHub secret

## How It Works

1. **Trigger**: The cross-posting job runs after your Hugo site is successfully deployed
2. **Detection**: It detects which markdown files in `content/posts/` have changed
3. **Processing**: For each changed article, it extracts frontmatter and content
4. **Publishing**: Posts to each platform as drafts (when possible) for your review
5. **Canonical Links**: Automatically sets canonical URLs to point back to your original blog

## Frontmatter Requirements

Make sure your blog posts have the following frontmatter fields:

```yaml
---
title: "Your Post Title"
description: "Brief description of the post"
tags:
  - tag1
  - tag2
  - tag3
url: post-url-slug  # Optional, will be derived from filename if not set
---
```

## Platform-Specific Notes

### Dev.to
- Maximum 4 tags per post
- Posts are created as drafts for review
- Supports canonical URLs

### Hashnode
- Supports unlimited tags
- Posts are published immediately
- Supports canonical URLs
- Requires publication ID for blog posting

### Medium
- Maximum 5 tags per post
- Posts are created as drafts for review
- Supports canonical URLs
- Requires integration token

## Testing

To test the cross-posting setup:

1. Create a new test blog post in `content/posts/`
2. Commit and push to main branch
3. Check the Actions tab in GitHub to see the workflow progress
4. Review the platform drafts/posts to ensure they look correct

## Troubleshooting

### Common Issues

1. **API Key Invalid**: Double-check that secrets are correctly copied and named
2. **Publication ID Missing**: Ensure you have the correct Hashnode publication ID
3. **Network Errors**: The script includes retry logic for temporary failures
4. **Parse Errors**: Ensure your markdown files have valid YAML frontmatter

### Debug Mode

You can test the script locally:

```bash
# Install dependencies
npm install

# Test with a specific article
DEVTO_API_KEY=your_key HASHNODE_TOKEN=your_token HASHNODE_PUBLICATION_ID=your_id MEDIUM_TOKEN=your_token node scripts/cross-post.js content/posts/your-article.md
```

## Security Notes

- All API keys are stored as GitHub secrets and never exposed in logs
- The script only uses the minimum required permissions for each platform
- You can revoke tokens at any time from the respective platform settings

## Manual Cross-Posting

If you need to cross-post an existing article manually:

```bash
# Install dependencies
npm install

# Set environment variables and run
export DEVTO_API_KEY="your_key"
export HASHNODE_TOKEN="your_token"
export HASHNODE_PUBLICATION_ID="your_id"
export MEDIUM_TOKEN="your_token"

node scripts/cross-post.js content/posts/your-article.md
```