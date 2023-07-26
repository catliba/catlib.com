import React from 'react'
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { serialize } from 'next-md'

const GET_INDIVIDUAL_POST = gql`
query ($slugUrl: String!) {
  blogPosts(filters: {urlSlug: { eq: $slugUrl }}) {
    data {
      attributes {
        title
        content
      }
    }
  }
}
`
console.log(GET_INDIVIDUAL_POST)
export default function Post() {
  const { urlSlug } = useParams();
  const { loading, error, data } = useQuery(GET_INDIVIDUAL_POST, {
    variables: { slugUrl: urlSlug },
  });
  console.log(data)
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  const blogPost = data.blogPosts.data[0].attributes;
  return (
    <div>
      <h1>{blogPost.title}</h1>
      <p>{blogPost.content}</p>
    </div>
  )
}