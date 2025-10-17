import { marked } from 'marked';

export interface Note {
  title: string;
  tags: string[];
  date: string;
  content: string;
  slug: string;
  category?: string;
}

export interface NoteCategory {
  name: string;
  notes: Note[];
  isDropdown: boolean;
}

// Function to load all notes
export async function getAllNotes(): Promise<Note[]> {
  try {
    const noteModules = import.meta.glob('../content/notes/*.md', { 
      eager: true,
      as: 'raw'
    });
    
    const notes: Note[] = [];
    
    for (const path in noteModules) {
      const content = noteModules[path];
      
      if (typeof content !== 'string') {
        console.error(`Content is not a string for ${path}:`, content);
        continue;
      }
      
      try {
        // Extract frontmatter and content
        const { frontmatter, content: markdownContent } = parseFrontmatter(content);
        
        // Generate slug from filename
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        
        notes.push({
          title: frontmatter.title,
          tags: frontmatter.tags || [],
          date: frontmatter.date,
          content: markdownContent,
          slug: slug,
          category: frontmatter.category
        });
  
      } catch (parseError) {
        console.error(`Error parsing ${path}:`, parseError);
      }
    }
    
    // Sort by date (newest first)
    notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return notes;
  } catch (error) {
    console.error('Error loading notes:', error);
    return [];
  }
}

// Function to get a single note by slug
export async function getNoteBySlug(slug: string): Promise<Note | null> {
  const notes = await getAllNotes();
  return notes.find(note => note.slug === slug) || null;
}

// Function to organize notes by categories
export async function getNotesByCategory(): Promise<NoteCategory[]> {
  const notes = await getAllNotes();
  
  // Group notes by category
  const categoryMap = new Map<string, Note[]>();
  
  notes.forEach(note => {
    const category = note.category || 'General';
    if (!categoryMap.has(category)) {
      categoryMap.set(category, []);
    }
    categoryMap.get(category)!.push(note);
  });
  
  // Convert to NoteCategory array
  const categories: NoteCategory[] = [];
  
  // Define which categories should be dropdowns vs direct links
  const dropdownCategories = ['React', 'JavaScript', 'CSS', 'TypeScript'];
  
  categoryMap.forEach((notes, categoryName) => {
    categories.push({
      name: categoryName,
      notes: notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      isDropdown: dropdownCategories.includes(categoryName) && notes.length > 1
    });
  });
  
  // Sort categories alphabetically
  categories.sort((a, b) => a.name.localeCompare(b.name));
  
  return categories;
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
      
      // Handle arrays (for tags)
      if (key.trim() === 'tags' && value.startsWith('[') && value.endsWith(']')) {
        frontmatter[key.trim()] = value.slice(1, -1).split(',').map(t => t.trim().replace(/"/g, ''));
      } else {
        frontmatter[key.trim()] = value;
      }
    }
  });
  
  return { frontmatter, content: markdownContent };
}

// Function to convert markdown to HTML
export function markdownToHtml(markdown: string): string {
  return marked(markdown);
}
