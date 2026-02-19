const fetch = require('node-fetch');
const fs = require('fs');
const matter = require('gray-matter');

// Configuration
const CONFIG = {
  BLOG_BASE_URL: 'https://swiderski.tech',
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000
};

// Retry helper
async function retry(fn, retries = CONFIG.MAX_RETRIES) {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    console.log(`Retrying... ${retries} attempts left`);
    await new Promise(resolve => setTimeout(resolve, CONFIG.RETRY_DELAY));
    return retry(fn, retries - 1);
  }
}

// Dev.to publisher
async function publishToDevTo(article) {
  console.log('Publishing to Dev.to...');

  return retry(async () => {
    const response = await fetch('https://dev.to/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.DEVTO_API_KEY
      },
      body: JSON.stringify({
        article: {
          title: article.title,
          published: false, // Start as draft for review
          body_markdown: processContentForPlatform(article.content, 'dev.to'),
          canonical_url: article.canonical,
          tags: processTagsForPlatform(article.tags, 'dev.to'),
          description: article.description
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Dev.to API error: ${response.status} - ${error}`);
    }

    const result = await response.json();
    console.log(`✅ Dev.to draft created: ${result.url}`);
    return result;
  });
}

// Hashnode publisher
async function publishToHashnode(article) {
  console.log('Publishing to Hashnode...');

  return retry(async () => {
    const response = await fetch('https://gql.hashnode.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.HASHNODE_TOKEN
      },
      body: JSON.stringify({
        query: `
          mutation PublishPost($input: PublishPostInput!) {
            publishPost(input: $input) {
              post {
                id
                url
                title
              }
            }
          }
        `,
        variables: {
          input: {
            title: article.title,
            contentMarkdown: processContentForPlatform(article.content, 'hashnode'),
            tags: processTagsForPlatform(article.tags, 'hashnode'),
            publicationId: process.env.HASHNODE_PUBLICATION_ID
          }
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Hashnode API error: ${response.status} - ${error}`);
    }

    const result = await response.json();
    if (result.errors) {
      throw new Error(`Hashnode GraphQL error: ${result.errors.map(e => e.message).join(', ')}`);
    }

    console.log(`✅ Hashnode post published: ${result.data.publishPost.post.url}`);
    return result.data.publishPost.post;
  });
}

// Medium publisher
async function publishToMedium(article) {
  console.log('Publishing to Medium...');

  return retry(async () => {
    // First get user ID
    const userResponse = await fetch('https://api.medium.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${process.env.MEDIUM_TOKEN}`
      }
    });

    if (!userResponse.ok) {
      const error = await userResponse.text();
      throw new Error(`Medium user API error: ${userResponse.status} - ${error}`);
    }

    const userData = await userResponse.json();

    // Then publish
    const response = await fetch(`https://api.medium.com/v1/users/${userData.data.id}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MEDIUM_TOKEN}`
      },
      body: JSON.stringify({
        title: article.title,
        contentFormat: 'markdown',
        content: processContentForPlatform(article.content, 'medium'),
        canonicalUrl: article.canonical,
        tags: processTagsForPlatform(article.tags, 'medium'),
        publishStatus: 'draft'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Medium API error: ${response.status} - ${error}`);
    }

    const result = await response.json();
    console.log(`✅ Medium draft created: ${result.data.url}`);
    return result.data;
  });
}

// Process tags for different platforms
function processTagsForPlatform(tags, platform) {
  switch (platform.toLowerCase()) {
    case 'dev.to':
      return tags.slice(0, 4).map(tag => tag.replace(/\s+/g, ''));
    case 'medium':
      return tags.slice(0, 5).map(tag => tag.replace(/\s+/g, '-'));
    case 'hashnode':
      return tags.map(tag => ({ name: tag }));
    default:
      return tags;
  }
}

// Process content for different platforms
function processContentForPlatform(content, platform) {
  let processedContent = content;

  // Handle image URLs - convert relative to absolute
  processedContent = processedContent.replace(
    /!\[([^\]]*)\]\(\/assets\/([^)]+)\)/g,
    (match, alt, path) => `![${alt}](${CONFIG.BLOG_BASE_URL}/assets/${path})`
  );

  processedContent = processedContent.replace(
    /!\[([^\]]*)\]\(assets\/([^)]+)\)/g,
    (match, alt, path) => `![${alt}](${CONFIG.BLOG_BASE_URL}/assets/${path})`
  );

  // Handle Hugo-specific absolute_url filter
  processedContent = processedContent.replace(
    /\{\{.*["']([^"']+)["'].*\|\s*absolute_url.*\}\}/g,
    (match, path) => `${CONFIG.BLOG_BASE_URL}${path}`
  );

  // Handle local file paths (convert to absolute URLs)
  processedContent = processedContent.replace(
    /!\[([^\]]*)\]\(\/Users\/[^)]+\)/g,
    (match, alt) => `![${alt}](${CONFIG.BLOG_BASE_URL}/assets/${alt})`
  );

  // Platform-specific processing
  switch (platform.toLowerCase()) {
    case 'dev.to':
      // Dev.to doesn't support Mermaid, convert to images or fallback
      processedContent = processedContent.replace(
        /```mermaid[^`]*```/gs,
        (match) => {
          const mermaidContent = match.replace(/```mermaid\s*/, '').replace(/```\s*$/, '');
          return `**📊 Mermaid Diagram**\n\n*Note: Dev.to doesn't support interactive Mermaid diagrams. View the original post on [${CONFIG.BLOG_BASE_URL}](${CONFIG.BLOG_BASE_URL}) to see the interactive diagram.*\n\n\`\`\`mermaid\n${mermaidContent}\`\`\``;
        }
      );

      // Remove Hugo-specific markup
      processedContent = processedContent.replace(/\{:\s*\.center-image\s*}/g, '');
      processedContent = processedContent.replace(/\{\{<[^>]*>\}\}/g, '');
      break;

    case 'medium':
      // Medium has limited Mermaid support, provide fallback
      processedContent = processedContent.replace(
        /```mermaid[^`]*```/gs,
        (match) => {
          const mermaidContent = match.replace(/```mermaid[^{]*{[^}]*}?\s*/, '').replace(/```\s*$/, '');
          return `**📊 Mermaid Diagram**\n\n*Interactive diagram available in the original post: [${CONFIG.BLOG_BASE_URL}](${CONFIG.BLOG_BASE_URL})*\n\n\`\`\`mermaid\n${mermaidContent}\`\`\``;
        }
      );

      // Remove Hugo-specific markup
      processedContent = processedContent.replace(/\{:\s*\.center-image\s*}/g, '');
      processedContent = processedContent.replace(/\{\{<[^>]*>\}\}/g, '');
      break;

    case 'hashnode':
      // Hashnode has good Mermaid support, keep it but ensure URLs are absolute
      processedContent = processedContent.replace(
        /```mermaid\s*\{[^}]*\}\s*/g,
        '```mermaid\n'
      );

      // Remove Hugo-specific markup
      processedContent = processedContent.replace(/\{:\s*\.center-image\s*}/g, '');
      processedContent = processedContent.replace(/\{\{<[^>]*>\}\}/g, '');
      break;
  }

  return processedContent;
}

// Extract frontmatter and content
function parseArticle(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Extract date from filename or frontmatter
    const filename = filePath.split('/').pop();
    const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
    const postDate = dateMatch ? dateMatch[1] : data.date || new Date().toISOString().split('T')[0];

    // Generate URL if not present
    const url = data.url || filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace('.md', '');

    // Extract cover image from frontmatter or content
    let coverImage = data.image;
    if (!coverImage) {
      const imageMatch = content.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (imageMatch) {
        let imagePath = imageMatch[2];
        // Convert relative paths to absolute
        if (imagePath.startsWith('/assets/')) {
          coverImage = CONFIG.BLOG_BASE_URL + imagePath;
        } else if (imagePath.startsWith('assets/')) {
          coverImage = `${CONFIG.BLOG_BASE_URL}/${imagePath}`;
        }
      }
    }

    return {
      title: data.title || 'Untitled',
      content: content,
      description: data.description || '',
      canonical: `${CONFIG.BLOG_BASE_URL}/${url}`,
      tags: data.tags || [],
      date: postDate,
      image: coverImage
    };
  } catch (error) {
    console.error(`Error parsing article ${filePath}:`, error.message);
    throw error;
  }
}

// Main execution function
async function main() {
  const filePath = process.argv[2];
  const dryRun = process.argv.includes('--dry-run');

  if (!filePath) {
    console.error('Please provide a file path');
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  console.log(`Processing article: ${filePath}`);

  try {
    const article = parseArticle(filePath);
    console.log(`Title: ${article.title}`);
    console.log(`Tags: ${article.tags.join(', ')}`);
    console.log(`Canonical: ${article.canonical}`);
    console.log('---');

    const results = [];

    if (dryRun) {
      console.log('🔍 DRY RUN MODE - No actual publishing will occur\n');
    }

    // Publish to each platform if API key is available
    if (process.env.DEVTO_API_KEY || dryRun) {
      try {
        if (dryRun) {
          console.log('✅ Dev.to: Would publish (dry run)');
          console.log(`   Title: ${article.title}`);
          console.log(`   Tags: ${processTagsForPlatform(article.tags, 'dev.to').join(', ')}`);
          console.log(`   Canonical: ${article.canonical}`);
          console.log(`   Images: ${processContentForPlatform(article.content, 'dev.to').match(/!\[.*?\]\(.*?\)/g)?.length || 0} images found`);
          console.log(`   Mermaid diagrams: ${article.content.match(/```mermaid/g)?.length || 0} found (converted to fallback)`);
          results.push({ platform: 'Dev.to', success: true, result: { dryRun: true } });
        } else {
          const devtoResult = await publishToDevTo(article);
          results.push({ platform: 'Dev.to', success: true, result: devtoResult });
        }
      } catch (error) {
        console.error(`❌ Dev.to publishing failed:`, error.message);
        results.push({ platform: 'Dev.to', success: false, error: error.message });
      }
    } else {
      console.log('⚠️  Dev.to API key not found, skipping...');
    }

    if ((process.env.HASHNODE_TOKEN && process.env.HASHNODE_PUBLICATION_ID) || dryRun) {
      try {
        if (dryRun) {
          console.log('✅ Hashnode: Would publish (dry run)');
          console.log(`   Title: ${article.title}`);
          console.log(`   Tags: ${processTagsForPlatform(article.tags, 'hashnode').map(tag => tag.name).join(', ')}`);
          console.log(`   Canonical: ${article.canonical}`);
          console.log(`   Images: ${processContentForPlatform(article.content, 'hashnode').match(/!\[.*?\]\(.*?\)/g)?.length || 0} images found`);
          console.log(`   Mermaid diagrams: ${article.content.match(/```mermaid/g)?.length || 0} found (supported)`);
          results.push({ platform: 'Hashnode', success: true, result: { dryRun: true } });
        } else {
          const hashnodeResult = await publishToHashnode(article);
          results.push({ platform: 'Hashnode', success: true, result: hashnodeResult });
        }
      } catch (error) {
        console.error(`❌ Hashnode publishing failed:`, error.message);
        results.push({ platform: 'Hashnode', success: false, error: error.message });
      }
    } else {
      console.log('⚠️  Hashnode credentials not found, skipping...');
    }

    if (process.env.MEDIUM_TOKEN || dryRun) {
      try {
        if (dryRun) {
          console.log('✅ Medium: Would publish (dry run)');
          console.log(`   Title: ${article.title}`);
          console.log(`   Tags: ${processTagsForPlatform(article.tags, 'medium').join(', ')}`);
          console.log(`   Canonical: ${article.canonical}`);
          console.log(`   Images: ${processContentForPlatform(article.content, 'medium').match(/!\[.*?\]\(.*?\)/g)?.length || 0} images found`);
          console.log(`   Mermaid diagrams: ${article.content.match(/```mermaid/g)?.length || 0} found (converted to fallback)`);
          results.push({ platform: 'Medium', success: true, result: { dryRun: true } });
        } else {
          const mediumResult = await publishToMedium(article);
          results.push({ platform: 'Medium', success: true, result: mediumResult });
        }
      } catch (error) {
        console.error(`❌ Medium publishing failed:`, error.message);
        results.push({ platform: 'Medium', success: false, error: error.message });
      }
    } else {
      console.log('⚠️  Medium API key not found, skipping...');
    }

    // Summary
    console.log('\n=== Cross-posting Summary ===');
    results.forEach(result => {
      if (result.success) {
        console.log(`✅ ${result.platform}: Success`);
      } else {
        console.log(`❌ ${result.platform}: Failed - ${result.error}`);
      }
    });

    const successCount = results.filter(r => r.success).length;
    console.log(`\nSuccessfully published to ${successCount}/${results.length} platforms`);

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main, parseArticle, publishToDevTo, publishToHashnode, publishToMedium };