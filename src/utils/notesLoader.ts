import { marked } from 'marked';

// Pre-import all images from src/pngs/ for use in markdown
// This allows images to be referenced in markdown files
const imageModules = import.meta.glob('../pngs/**/*.{jpg,jpeg,png,gif,webp}', { 
  eager: true 
});

// Create a map of image filenames to their imported URLs
const imageMap = new Map<string, string>();
for (const path in imageModules) {
  const image = imageModules[path] as { default?: string };
  const imageUrl = image?.default;
  if (imageUrl) {
    // Get the filename from the path
    const pathParts = path.replace('../pngs/', '').replace(/\\/g, '/');
    const filename = pathParts.split('/').pop() || '';
    
    // Store variations of the filename and path
    const variations: string[] = [
      filename, // Original filename
      encodeURIComponent(filename), // URL encoded
      decodeURIComponent(filename), // URL decoded (in case it was encoded)
      pathParts, // Full path
      encodeURIComponent(pathParts), // Full path encoded
      decodeURIComponent(pathParts), // Full path decoded
    ];
    
    // Add variations with spaces replaced
    if (filename.includes(' ')) {
      variations.push(filename.replace(/ /g, '%20'));
      variations.push(filename.replace(/ /g, '_'));
    }
    
    // Store all variations pointing to the same image URL
    variations.forEach(variation => {
      if (variation && variation.length > 0 && !imageMap.has(variation)) {
        imageMap.set(variation, imageUrl);
      }
    });
  }
}

export interface Note {
  title: string;
  tags: string[];
  date: string;
  content: string;
  slug: string;
  category?: string;
  folderPath?: string; // Path relative to notes folder (e.g., "react-notes" or "poker")
}

export interface NoteCategory {
  name: string;
  notes: Note[];
  isDropdown: boolean;
}

// Function to load all notes
export async function getAllNotes(): Promise<Note[]> {
  try {
    const noteModules = import.meta.glob('../content/notes/**/*.md', { 
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
        
        // Generate slug from full path, preserving directory structure
        // e.g., '../content/notes/react-notes/jsx-components.md' -> 'react-notes-jsx-components'
        const pathParts = path.replace('../content/notes/', '').replace('.md', '').split('/');
        const slug = pathParts.join('-');
        
        // Extract folder path (everything except the filename)
        const folderPath = pathParts.length > 1 ? pathParts.slice(0, -1).join('/') : '';
        
        notes.push({
          title: frontmatter.title,
          tags: frontmatter.tags || [],
          date: frontmatter.date,
          content: markdownContent,
          slug: slug,
          category: frontmatter.category,
          folderPath: folderPath
        });
  
      } catch (parseError) {
        console.error(`Error parsing ${path}:`, parseError);
      }
    }
    
    // Sort by folder structure first, then by filename
    notes.sort((a, b) => {
      // First sort by folder path
      if (a.folderPath && b.folderPath) {
        const folderCompare = a.folderPath.localeCompare(b.folderPath);
        if (folderCompare !== 0) return folderCompare;
      } else if (a.folderPath) return 1; // Notes with folders come after root notes
      else if (b.folderPath) return -1;
      
      // If same folder, sort by slug (filename)
      return a.slug.localeCompare(b.slug);
    });
    
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
    // Sort notes within category by folder structure, then by filename
    const sortedNotes = notes.sort((a, b) => {
      // First sort by folder path
      if (a.folderPath && b.folderPath) {
        const folderCompare = a.folderPath.localeCompare(b.folderPath);
        if (folderCompare !== 0) return folderCompare;
      } else if (a.folderPath) return 1;
      else if (b.folderPath) return -1;
      
      // If same folder, sort by slug (filename)
      return a.slug.localeCompare(b.slug);
    });
    
    categories.push({
      name: categoryName,
      notes: sortedNotes,
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
  // Configure marked with custom image renderer to handle image paths
  marked.setOptions({
    breaks: true,
    gfm: true,
  });
  
  // Use a custom renderer for images to handle paths correctly
  const renderer = new marked.Renderer();
  const originalImage = renderer.image.bind(renderer);
  
  renderer.image = (href: string | null, title: string | null, text: string) => {
    if (!href) return '';
    
    // Handle external URLs
    if (href.startsWith('http://') || href.startsWith('https://')) {
      return originalImage(href, title, text);
    }
    
    // Try to resolve local image paths using the image map
    // Users can reference images by filename or relative path
    let resolvedPath = href;
    
    // Normalize the path - remove leading relative path indicators
    let cleanPath = href.replace(/^(\.\.?\/)+/, '').replace(/^pngs\//, '');
    
    // Decode URL encoding (e.g., %20 -> space)
    const decodedPath = decodeURIComponent(cleanPath);
    const filename = cleanPath.split('/').pop() || '';
    const decodedFilename = decodedPath.split('/').pop() || '';
    
    // Try multiple lookup strategies
    if (imageMap.has(cleanPath)) {
      resolvedPath = imageMap.get(cleanPath)!;
    } else if (imageMap.has(decodedPath)) {
      resolvedPath = imageMap.get(decodedPath)!;
    } else if (imageMap.has(filename)) {
      resolvedPath = imageMap.get(filename)!;
    } else if (imageMap.has(decodedFilename)) {
      resolvedPath = imageMap.get(decodedFilename)!;
    } else {
      // If still not found, try with original href (might work if it's a valid path)
      // Log a warning for debugging
      console.warn(`Image not found: ${href}. Available keys:`, Array.from(imageMap.keys()).slice(0, 10));
    }
    
    return originalImage(resolvedPath, title, text);
  };
  
  return marked(markdown, { renderer });
}
