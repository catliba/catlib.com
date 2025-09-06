import { marked } from 'marked';

export interface BlogPost {
  title: string;
  urlSlug: string;
  date: string;
  content: string;
  comic?: string;
}

// Function to load all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const postModules = import.meta.glob('../content/*.md', { 
      eager: true,
      as: 'raw'
    });
    
    const posts: BlogPost[] = [];
    
    for (const path in postModules) {
      const content = postModules[path];
      
      console.log(`🔍 Processing ${path}:`, typeof content, content?.substring(0, 100) + '...');
      
      if (typeof content !== 'string') {
        console.error(`Content is not a string for ${path}:`, content);
        continue;
      }
      
      try {
        // Extract frontmatter and content
        const { frontmatter, content: markdownContent } = parseFrontmatter(content);
        
        posts.push({
          title: frontmatter.title,
          urlSlug: frontmatter.urlSlug,
          date: frontmatter.date,
          content: markdownContent,
          comic: frontmatter.comic
        });
  
      } catch (parseError) {
        console.error(`Error parsing ${path}:`, parseError);
      }
    }
    
    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    
    return posts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return getSamplePosts();
  }
}

// Function to get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find(post => post.urlSlug === slug) || null;
}

// Function to parse frontmatter from markdown content
function parseFrontmatter(content: string): { frontmatter: any; content: string } {
  // More flexible regex that handles different line endings and spacing
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  console.log('Content to parse:', content.substring(0, 200) + '...');
  console.log('Frontmatter regex match:', match);
  
  if (!match) {
    throw new Error('No frontmatter found in markdown file');
  }
  
  const frontmatterText = match[1];
  const markdownContent = match[2];
  
  console.log('Frontmatter text:', frontmatterText);
  console.log('Markdown content length:', markdownContent.length);
  
  // Parse frontmatter (simple key-value parsing)
  const frontmatter: any = {};
  frontmatterText.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim();
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontmatter[key.trim()] = value;
    }
  });
  
  console.log('Parsed frontmatter:', frontmatter);
  
  return { frontmatter, content: markdownContent };
}

// Function to convert markdown to HTML
export function markdownToHtml(markdown: string): string {
  return marked(markdown);
}

// Sample blog posts as fallback
function getSamplePosts(): BlogPost[] {
  return [
    {
      title: "Sample Blog Post",
      urlSlug: "sample-post",
      date: "2024-01-15",
      content: `# Sample Blog Post

This is a sample blog post to demonstrate the Markdown migration.

## Section 1
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Section 2
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Subsection
- Point 1
- Point 2
- Point 3

## Section 3
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      comic: "/src/pngs/a742803651b99a3eec9633fbaa644711.jpg"
    },
    {
      title: "Another Sample Post",
      urlSlug: "another-post",
      date: "2024-01-20",
      content: `# Another Sample Post

This is another sample blog post.

## Introduction
Welcome to another post!

## Main Content
Here's some more content for you to read.

## Conclusion
Thanks for reading!`,
      comic: "/src/pngs/a742803651b99a3eec9633fbaa644711.jpg"
    }
  ];
}