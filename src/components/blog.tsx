import React from 'react';
import PageFlip from './page-flip';
import '../css/blog.css';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import ItWasADarkAndStormyNight from '../pngs/snoopy-dark-and-stormy-night.jpg'

const GET_ALL_POSTS = gql`
query getPost {
    blogPosts {
      data {
        attributes {
          title
          urlSlug
          date
        }
      }
    }
  }
`;

export default function Blog() {
    const {loading, error, data} = useQuery(GET_ALL_POSTS);
    const posts = data?.blogPosts.data;
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }
    return (
        <>
            <div className="root">
                <div className='comic'>
                    <img src={ItWasADarkAndStormyNight} alt="It was a dark and stormy night..."/>
                </div>
                {posts.map((val:any,i:any) => {
                return (
                    <Link to={val.attributes.urlSlug} className="link">
                        <div key={i} className="card">
                            <div className="card-num">
                               No. {i + 1}
                            </div>
                            <div className="card-title">
                                {val.attributes.title}
                            </div>
                            <div className="card-date">{val.attributes.date}</div>
                        </div>
                    </Link>
                    
                )})}
            </div>
            <PageFlip />
        </>
    )
}