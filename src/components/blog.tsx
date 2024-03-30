import React, { useState } from 'react';
import '../css/blog.css';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import ItWasADarkAndStormyNight from '../pngs/a742803651b99a3eec9633fbaa644711.jpg';
import { GiReturnArrow } from 'react-icons/gi';

const GET_ALL_POSTS = gql`
  query Q {
    strips(pagination: { page: 1, pageSize: 100 }) {
      data {
        attributes {
          title
          urlSlug
          date
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`;

export default function Blog() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);
  const [order, setOrder] = useState(true);
  const [isActive, setIsActive] = useState(false); // State for active button

  const latestClick = () => {
    setOrder(false);
    setIsActive(true); // Set the button as active when clicked
  };

  const earliestClick = () => {
    setOrder(true);
    setIsActive(true); // Set the button as active when clicked
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const posts = data?.strips.data;
  let sortedPosts = [];

  if (posts) {
    sortedPosts = [...posts].sort((a, b) => {
      const dateA = new Date(a.attributes.date).getTime();
      const dateB = new Date(b.attributes.date).getTime();

      return order ? dateA - dateB : dateB - dateA;
    });
  }

  return (
    <>
      <div className="blogs">
        <div className="return">
          <Link to={"/aboutcatlib"} className='symbol'>
            <GiReturnArrow />
          </Link>
        </div>
        <div className='comic'>
          <img src={ItWasADarkAndStormyNight} alt="It was a dark and stormy night..." />
        </div>
        <div className='toggle'>
          <button onClick={earliestClick} className={isActive && order ? 'active' : 'toggle-button'}>FIRST</button>
          <button onClick={latestClick} className={isActive && !order ? 'active' : 'toggle-button'}>LAST</button>
        </div>
        {sortedPosts.map((val, i) => (
          <Link to={val.attributes.urlSlug} className="link" key={i}>
            <div className="card">
              <div className="card-num">
                No. {order ? i + 1 : sortedPosts.length - i}
              </div>
              <div className="card-title">
                {val.attributes.title}
              </div>
              <div className="card-date">{val.attributes.date}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}