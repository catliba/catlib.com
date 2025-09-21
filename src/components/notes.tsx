import '../css/notes.css';
import { useAllNotes } from '../hooks/useNotes';
import { Link } from 'react-router-dom';
import Homework from '../pngs/comics/Homework.jpg';

export default function Notes() {
  const { notes, loading, error } = useAllNotes();

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
        <div style={{ textAlign: 'center', padding: '40px', color: '#c62828' }}>
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="notes">
      <div className="notes-header">
        <h1>Notes</h1>
        <img src={Homework} alt="Calvin and Hobbes" className="schoolbell" />
      </div>

      <div className="notes-grid">
        {notes.map(note => (
          <Link key={note.slug} to={`/notes/${note.slug}`} className="note-card">
            <div className="note-header">
              <h3>{note.title}</h3>
              <div className="note-date">
                {new Date(note.date).toLocaleDateString()}
              </div>
            </div>
            <div className="note-preview">
              {note.content.split('\n').slice(0, 3).map((line, i) => (
                <p key={i}>{line || '\u00A0'}</p>
              ))}
              {note.content.split('\n').length > 3 && (
                <p className="read-more">...read more</p>
              )}
            </div>
            {note.tags.length > 0 && (
              <div className="note-tags">
                {note.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="empty-state">
          No notes found. Add markdown files to <code>src/content/notes/</code>
        </div>
      )}
    </div>
  );
}