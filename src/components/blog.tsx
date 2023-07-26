import React from 'react';
import PageFlip from './page-flip';
import '../css/blog.css';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_ALL_POSTS = gql`
query getPost {
    blogPosts {
      data {
        attributes {
          title
          description
          urlSlug
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
            <title>
                My blog
            </title>
            <h1>Welcome to my blog</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <br/>
            <h2>All Posts</h2>
            <br />
            {posts.map((val:any,i:any) => {
            return (
                <Link to={val.attributes.urlSlug}>
                    <div key={i} className="card">
                        <h3>
                            {val.attributes.title}
                        </h3>
                        <p>
                            {val.attributes.description}
                        </p>
                    </div>
                </Link>
                
            )})}
            <PageFlip />
        </>
    )
}