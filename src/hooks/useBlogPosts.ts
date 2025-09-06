import { useState, useEffect } from 'react';
import { getAllBlogPosts, getBlogPostBySlug, BlogPost } from '../utils/markdownLoader';

// Hook for getting all blog posts
export function useAllBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const blogPosts = await getAllBlogPosts();
        setPosts(blogPosts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return { posts, loading, error };
}

// Hook for getting a single blog post
export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const blogPost = await getBlogPostBySlug(slug);
        if (blogPost) {
          setPost(blogPost);
          setError(null);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  return { post, loading, error };
}
