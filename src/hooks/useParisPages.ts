import { useState, useEffect } from 'react';
import { getAllParisPages, getParisPageBySlug, ParisPage } from '../utils/parisLoader';

// Hook for getting all Paris pages
export function useAllParisPages() {
  const [pages, setPages] = useState<ParisPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPages = async () => {
      try {
        setLoading(true);
        const parisPages = await getAllParisPages();
        setPages(parisPages);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load Paris pages');
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  return { pages, loading, error };
}

// Hook for getting a single Paris page
export function useParisPage(slug: string) {
  const [page, setPage] = useState<ParisPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPage = async () => {
      try {
        setLoading(true);
        const parisPage = await getParisPageBySlug(slug);
        if (parisPage) {
          setPage(parisPage);
          setError(null);
        } else {
          setError('Paris page not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load Paris page');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPage();
    }
  }, [slug]);

  return { page, loading, error };
}
