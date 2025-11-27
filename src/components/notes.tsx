import '../css/notes.css';
import { useState, useEffect } from 'react';
import { getNotesByCategory, NoteCategory } from '../utils/notesLoader';
import NotesDropdown from './notes-dropdown';
import { Link } from 'react-router-dom';
import {GiReturnArrow} from 'react-icons/gi';
// Import font so Vite processes it
import latinModernFont from '../fonts/Latin-Modern.otf';

export default function Notes() {
  const [categories, setCategories] = useState<NoteCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Inject font-face with processed URL
    const fontFace = new FontFace('Latin Modern', `url(${latinModernFont})`, {
      display: 'swap'
    });
    fontFace.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
    }).catch((err) => {
      console.error('Error loading Latin Modern font:', err);
    });
  }, []);

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
    <>
      <div className="return">
            <Link to={"/life"} className='symbol'>
              <GiReturnArrow />
            </Link>
      </div>
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
    </>
  );
}