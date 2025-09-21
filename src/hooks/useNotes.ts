import { useState, useEffect } from 'react';
import { getAllNotes, getNoteBySlug, Note } from '../utils/notesLoader';

// Hook for getting all notes
export function useAllNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true);
        const notes = await getAllNotes();
        setNotes(notes);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load notes');
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  return { notes, loading, error };
}

// Hook for getting a single note
export function useNote(slug: string) {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNote = async () => {
      try {
        setLoading(true);
        const note = await getNoteBySlug(slug);
        if (note) {
          setNote(note);
          setError(null);
        } else {
          setError('Note not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load note');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadNote();
    }
  }, [slug]);

  return { note, loading, error };
}
