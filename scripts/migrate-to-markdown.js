#!/usr/bin/env node

/**
 * Migration script to export blog posts from Strapi to Markdown files
 * 
 * Usage:
 * 1. Make sure your Strapi backend is running
 * 2. Update the STRAPI_URL below to point to your Strapi instance
 * 3. Run: node scripts/migrate-to-markdown.js
 */

const fs = require('fs');
const path = require('path');

// Update this URL to point to your Strapi backend
const STRAPI_URL = 'https://catlieb-df347bf0623e.herokuapp.com';

// GraphQL query to fetch all blog posts
const GET_ALL_POSTS = `
  query {
    strips(pagination: { page: 1, pageSize: 100 }) {
      data {
        attributes {
          title
          urlSlug
          date
          content
          comic {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

async function fetchFromStrapi() {
  try {
    const response = await fetch(`${STRAPI_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_ALL_POSTS
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.strips.data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    return [];
  }
}

function createMarkdownFile(post) {
  const { title, urlSlug, date, content, comic } = post.attributes;
  
  // Create frontmatter
  const frontmatter = `---
title: "${title}"
urlSlug: "${urlSlug}"
date: "${date}"
comic: "${comic?.data?.attributes?.url || ''}"
---

`;

  // Combine frontmatter with content
  const markdownContent = frontmatter + content;
  
  // Create filename from slug
  const filename = `${urlSlug}.md`;
  const filepath = path.join(__dirname, '..', 'src', 'content', filename);
  
  return { filename, filepath, content: markdownContent };
}

async function migrateToMarkdown() {
  console.log('🚀 Starting migration from Strapi to Markdown...');
  
  // Create content directory if it doesn't exist
  const contentDir = path.join(__dirname, '..', 'src', 'content');
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
    console.log('📁 Created content directory');
  }
  
  // Fetch posts from Strapi
  console.log('📡 Fetching posts from Strapi...');
  const posts = await fetchFromStrapi();
  
  if (posts.length === 0) {
    console.log('❌ No posts found or error occurred');
    return;
  }
  
  console.log(`📝 Found ${posts.length} posts to migrate`);
  
  // Convert each post to markdown
  for (const post of posts) {
    const { filename, filepath, content } = createMarkdownFile(post);
    
    try {
      fs.writeFileSync(filepath, content, 'utf8');
      console.log(`✅ Created: ${filename}`);
    } catch (error) {
      console.error(`❌ Error creating ${filename}:`, error.message);
    }
  }
  
  console.log('\n🎉 Migration completed!');
  console.log(`📁 Markdown files created in: ${contentDir}`);
  console.log('\nNext steps:');
  console.log('1. Review the generated markdown files');
  console.log('2. Update image paths if needed');
  console.log('3. Test your blog by running: npm run dev');
  console.log('4. Once satisfied, you can remove Apollo Client dependencies');
}

// Run the migration
migrateToMarkdown().catch(console.error);
