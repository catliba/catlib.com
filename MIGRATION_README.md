# Blog Migration: Strapi to Markdown

This document explains how to migrate your blog content from Strapi to Markdown files while keeping your frontend exactly the same.

## What Changed

✅ **Frontend remains identical** - Your React components, styling, and user experience stay exactly the same
✅ **No more Heroku/PostgreSQL dependency** - Blog content is now stored as Markdown files in your repo
✅ **Simplified deployment** - No backend needed, just static files
✅ **Better performance** - No API calls, content loads instantly

## Migration Steps

### 1. Export Your Existing Content

Run the migration script to export your blog posts from Strapi:

```bash
node scripts/migrate-to-markdown.js
```

This script will:
- Connect to your Strapi backend
- Fetch all blog posts
- Convert them to Markdown files with frontmatter
- Save them in `src/content/`

### 2. Review Generated Files

Check the generated Markdown files in `src/content/`. Each file should have:

```markdown
---
title: "Your Blog Post Title"
urlSlug: "your-url-slug"
date: "2024-01-15"
comic: "/path/to/comic/image.jpg"
---

# Your Blog Post Content

Your markdown content here...
```

### 3. Update Image Paths (if needed)

If your comic images are hosted on Strapi, you may need to:
1. Download the images to your `src/pngs/` directory
2. Update the `comic` path in the frontmatter to point to local files

### 4. Test Your Blog

```bash
npm run dev
```

Visit your blog at `/life` to see the posts listed, and click on individual posts to view them.

### 5. Clean Up (Optional)

Once you're satisfied with the migration, you can remove Apollo Client dependencies:

```bash
npm uninstall @apollo/client graphql
```

## File Structure

```
src/
├── content/           # Your blog posts as Markdown files
│   ├── post-1.md
│   ├── post-2.md
│   └── ...
├── components/
│   ├── blog.tsx      # Blog listing (updated to use Markdown)
│   └── feed.tsx      # Individual post view (updated to use Markdown)
├── hooks/
│   └── useBlogPosts.ts  # Custom hooks for loading posts
└── utils/
    └── markdownLoader.ts # Markdown file loading utilities
```

## Adding New Blog Posts

To add a new blog post:

1. Create a new `.md` file in `src/content/`
2. Add frontmatter with required fields:
   ```markdown
   ---
   title: "Your Post Title"
   urlSlug: "your-url-slug"
   date: "2024-01-15"
   comic: "/src/pngs/your-image.jpg"
   ---
   ```
3. Write your content in Markdown below the frontmatter
4. Save the file - it will automatically appear in your blog

## Benefits of This Approach

- **No backend required** - Deploy anywhere (Vercel, Netlify, GitHub Pages)
- **Version control** - Track content changes in Git
- **Faster loading** - No API calls needed
- **Easier editing** - Edit content directly in your code editor
- **Better SEO** - Content is available at build time
- **Cost effective** - No database hosting costs

## Troubleshooting

### Posts not showing up?
- Check that your Markdown files have proper frontmatter
- Ensure the `urlSlug` matches your routing expectations
- Check the browser console for errors

### Images not loading?
- Make sure image paths in frontmatter are correct
- Images should be relative to your `src/pngs/` directory
- Use paths like `/src/pngs/image.jpg`

### Build errors?
- Ensure all required fields are present in frontmatter
- Check that Markdown syntax is valid
- Verify file paths are correct

## Support

If you encounter any issues during migration, check:
1. The browser console for JavaScript errors
2. The terminal for build errors
3. That your Strapi backend is accessible when running the migration script
