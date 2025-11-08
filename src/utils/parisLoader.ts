import { marked } from 'marked';

export interface ParisPage {
  title: string;
  slug: string;
  date: string;
  content: string;
  image?: string;
  audio?: string;
}

// Function to load all Paris pages
export async function getAllParisPages(): Promise<ParisPage[]> {
  try {
    const pageModules = import.meta.glob('../content/paris/*.md', { 
      eager: true,
      as: 'raw'
    });
    
    const pages: ParisPage[] = [];
    
    for (const path in pageModules) {
      const content = pageModules[path];
      
      if (typeof content !== 'string') {
        console.error(`Content is not a string for ${path}:`, content);
        continue;
      }
      
      try {
        // Extract frontmatter and content
        const { frontmatter, content: markdownContent } = parseFrontmatter(content);
        
        // Generate slug from filename
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        
        pages.push({
          title: frontmatter.title || 'Untitled',
          slug: frontmatter.slug || slug,
          date: frontmatter.date || '',
          content: markdownContent,
          image: frontmatter.image,
          audio: frontmatter.audio
        });
  
      } catch (parseError) {
        console.error(`Error parsing ${path}:`, parseError);
      }
    }
    
    // Sort by date (newest first)
    pages.sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    return pages;
  } catch (error) {
    console.error('Error loading Paris pages:', error);
    return [];
  }
}

// Function to get a single Paris page by slug
export async function getParisPageBySlug(slug: string): Promise<ParisPage | null> {
  const pages = await getAllParisPages();
  return pages.find(page => page.slug === slug) || null;
}

// Function to parse frontmatter from markdown content
function parseFrontmatter(content: string): { frontmatter: any; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('No frontmatter found in markdown file');
  }
  
  const frontmatterText = match[1];
  const markdownContent = match[2];
  
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
  
  return { frontmatter, content: markdownContent };
}

// Function to convert markdown to HTML
export function markdownToHtml(markdown: string): string {
  return marked(markdown);
}
