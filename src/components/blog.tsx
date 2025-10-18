import { useState } from 'react';
import '../css/blog.css';
import { Link } from 'react-router-dom';
import ItWasADarkAndStormyNight from '../pngs/a742803651b99a3eec9633fbaa644711.jpg';
import { GiReturnArrow } from 'react-icons/gi';
import { useAllBlogPosts } from '../hooks/useBlogPosts';
import PageFlip from './page-flip';

export default function Blog() {
  const { posts, loading, error } = useAllBlogPosts();
  const [order, setOrder] = useState(true);
  const [isActive, setIsActive] = useState(false); 

  const latestClick = () => {
    setOrder(false);
    setIsActive(true);
  };

  const earliestClick = () => {
    setOrder(true);
    setIsActive(true); 
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  let sortedPosts = [...posts];

  if (posts.length > 0) {
    sortedPosts = [...posts].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return order ? dateA - dateB : dateB - dateA;
    });
  }

  return (
    <>
      <div className="blogs">
        <div className="return">
          <Link to={"/notes"} className='symbol'>
            <GiReturnArrow />
          </Link>
        </div>
        <PageFlip dir='/poker' message='Keep flipping!'/>
        <div className='comic'>
          <img src={ItWasADarkAndStormyNight} alt="It was a dark and stormy night..." />
        </div>
        <div className='toggle'>
          <button onClick={earliestClick} className={isActive && order ? 'active' : 'toggle-button'}>FIRST</button>
          <button onClick={latestClick} className={isActive && !order ? 'active' : 'toggle-button'}>LAST</button>
        </div>
        {sortedPosts.map((val, i) => (
          <Link to={val.urlSlug} className="link" key={i}>
            <div className="card">
              <div className="card-num">
                No. {order ? i + 1 : sortedPosts.length - i}
              </div>
              <div className="card-title">
                {val.title}
              </div>
              <div className="card-date">{val.date}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}