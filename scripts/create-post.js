/**
 * Script to create new blog posts
 * Usage: node scripts/create-post.js "Post Title" "url-slug" "2024-01-15"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createBlogPost(title, urlSlug, date, comic = '') {
  const contentDir = path.join(__dirname, '..', 'src', 'content');
  
  // Create content directory if it doesn't exist
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  
  const filename = `${urlSlug}.md`;
  const filepath = path.join(contentDir, filename);
  
  const frontmatter = `---
title: "${title}"
urlSlug: "${urlSlug}"
date: "${date}"
comic: "${comic}"
---

# ${title}

Write your blog post content here...

## Introduction

Start your post with an introduction.

## Main Content

Add your main content here.

## Conclusion

Wrap up your thoughts.

`;

  fs.writeFileSync(filepath, frontmatter);
  console.log(`✅ Created new blog post: ${filepath}`);
  console.log(`📝 Edit the file to add your content`);
  console.log(`🚀 Your post will automatically appear in the blog!`);
}

// Get command line arguments
const args = process.argv.slice(2);

if (args.length < 3) {
  console.log('Usage: node scripts/create-post.js "Post Title" "url-slug" "2024-01-15" [comic-image-path]');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/create-post.js "My First Post" "my-first-post" "2024-01-15"');
  console.log('  node scripts/create-post.js "Coding Adventures" "coding-adventures" "2024-01-20" "/src/pngs/my-image.jpg"');
  process.exit(1);
}

const [title, urlSlug, date, comic] = args;
createBlogPost(title, urlSlug, date, comic);
