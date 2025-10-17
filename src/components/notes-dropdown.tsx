import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NoteCategory } from '../utils/notesLoader';
import '../css/notes.css';

interface NotesDropdownProps {
  categories: NoteCategory[];
}

export default function NotesDropdown({ categories }: NotesDropdownProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="notes-dropdown-container">
      <div className="notes-dropdown-list">
        {categories.map(category => (
          <div key={category.name} className="notes-category">
            {category.isDropdown ? (
              <>
                <div 
                  className="notes-category-header dropdown-header"
                  onClick={() => toggleCategory(category.name)}
                >
                  <span className="category-name">{category.name}</span>
                  <span className={`dropdown-arrow ${expandedCategories.has(category.name) ? 'expanded' : ''}`}>
                  </span>
                </div>
                {expandedCategories.has(category.name) && (
                  <div className="notes-category-content">
                    {category.notes.map(note => (
                      <Link 
                        key={note.slug} 
                        to={`/notes/${note.slug}`} 
                        className="notes-dropdown-item"
                      >
                        <span className="note-title">{note.title}</span>
                        <span className="note-date">
                          {new Date(note.date).toLocaleDateString()}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                {category.notes.length === 1 ? (
                  <Link 
                    to={`/notes/${category.notes[0].slug}`} 
                    className="notes-category-header direct-link"
                  >
                    <span className="category-name">{category.name}</span>
                  </Link>
                ) : (
                  <>
                    <div 
                      className="notes-category-header dropdown-header"
                      onClick={() => toggleCategory(category.name)}
                    >
                      <span className="category-name">{category.name}</span>
                      <span className={`dropdown-arrow ${expandedCategories.has(category.name) ? 'expanded' : ''}`}>
                        ▼
                      </span>
                    </div>
                    {expandedCategories.has(category.name) && (
                      <div className="notes-category-content">
                        {category.notes.map(note => (
                          <Link 
                            key={note.slug} 
                            to={`/notes/${note.slug}`} 
                            className="notes-dropdown-item"
                          >
                            <span className="note-title">{note.title}</span>
                            <span className="note-date">
                              {new Date(note.date).toLocaleDateString()}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
