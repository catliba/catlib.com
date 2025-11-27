import { GiReturnArrow } from 'react-icons/gi';
import '../css/notes.css';
import { useNote } from '../hooks/useNotes';
import { markdownToHtml } from '../utils/notesLoader';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
// Import font so Vite processes it
import latinModernFont from '../fonts/Latin-Modern.otf';

export default function NoteDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { note, loading, error } = useNote(slug || '');

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

  if (loading) {
    return (
      <div className="note-detail">
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading note...</div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="note-detail">
        <div style={{ textAlign: 'center', padding: '40px', color: '#c62828' }}>
          Error: {error || 'Note not found'}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="return">
            <Link to={"/notes"} className='symbol'>
              <GiReturnArrow />
            </Link>
      </div>
      <div className="note-detail">
        <div className="note-header">
          <h1>{note.title}</h1>
          <div className="note-meta">
            {note.date && !isNaN(new Date(note.date).getTime()) && (
              <span className="note-date">{new Date(note.date).toLocaleDateString()}</span>
            )}
            {note.tags.length > 0 && (
              <div className="note-tags">
                {note.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="note-content">
          <div dangerouslySetInnerHTML={{ __html: markdownToHtml(note.content) }} />
        </div>
      </div>
    </>
  );
}
