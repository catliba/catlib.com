import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../css/feed.css'
import { GiReturnArrow } from 'react-icons/gi'
import { useBlogPost } from '../hooks/useBlogPosts';

export default function PostSimple() {
  const { urlSlug } = useParams();
  const { post: blogPost, loading, error } = useBlogPost(urlSlug || '');
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (error || !blogPost) {
    return <div className="error">Error: {error || 'Blog post not found'}</div>;
  }
  
  return (
    <>
      <div className="return">
        <Link to={"/life"} className='symbol'>
          <GiReturnArrow />
        </Link>
      </div>
      
      <div className="blog-post">
        <div className="post-header">
          <h1 className="post-title">{blogPost.title}</h1>
          <div className="post-date">{blogPost.date}</div>
          {blogPost.comic && (
            <div className="post-comic">
              <img src={blogPost.comic} alt="Post comic" />
            </div>
          )}
        </div>
        
        <div className="post-content">
          <ReactMarkdown>{blogPost.content}</ReactMarkdown>
        </div>
      </div>
    </>
  )
}
