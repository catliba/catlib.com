import '../css/notes.css';
import { useState, useEffect } from 'react';
import { getNotesByCategory, NoteCategory } from '../utils/notesLoader';
import NotesDropdown from './notes-dropdown';

export default function Notes() {
  const [categories, setCategories] = useState<NoteCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const categories = await getNotesByCategory();
        setCategories(categories);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load notes');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="notes">
        <div className="notes-header">
          <h1>Notes</h1>
        </div>
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading notes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notes">
        <div className="notes-header">
          <h1>Notes</h1>
        </div>
        <div>
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="notes">
      <div className="notes-header">
        <h1>Notes</h1>
      </div>
      <hr/>
      <NotesDropdown categories={categories} />

      {categories.length === 0 && (
        <div className="empty-state">
          No notes found. Add markdown files to <code>src/content/notes/</code>
        </div>
      )}
    </div>
  );
}