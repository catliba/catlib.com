import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import '../css/feed.css'
import {GiReturnArrow, GiPreviousButton, GiNextButton} from 'react-icons/gi'

const GET_INDIVIDUAL_POST = gql`
query ($slugUrl: String!) {
  blogPosts(filters: {urlSlug: { eq: $slugUrl }}) {
    data {
      attributes {
        title
        content
        strip {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`
console.log(GET_INDIVIDUAL_POST)

export default function Post() {
  
  const [currentSlide, setCurrentSlide] = useState<number>(-1);
  const prevSlide = () => {
    if (currentSlide > -1) {
      setCurrentSlide(currentSlide - 1)
    }
  }
  const nextSlide = () => {
    if (currentSlide < sections.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const { urlSlug } = useParams();
  const { loading, error, data } = useQuery(GET_INDIVIDUAL_POST, {
    variables: { slugUrl: urlSlug },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  const blogPost = data.blogPosts.data[0].attributes;
  const blogBody: string = blogPost.content;
  const sections: string[] = (blogBody.match(/(?:^|\n)##\s+(.*(?:\n(?!## ).+)*)/g) || []) as string[];
  console.log(sections);
  const comicStrip = blogPost.strip.data.attributes.url;

  return (
    <>
      <div className="return">
          <Link to={"/calendar"} className='symbol'>
            <GiReturnArrow />
          </Link>
      </div>
      <div className="slides">  
        <button onClick={prevSlide}><GiPreviousButton/></button>
        {currentSlide === -1 ? 
          (<div className='start-panel'>
            <div className="title">
              {blogPost.title}
            </div>
            <div className="comic-header">
              <img src={"http://localhost:1337" + comicStrip}/>
            </div>
          </div>)
          :
          (<div className='text-body'>
            <ReactMarkdown>{sections[currentSlide]}</ReactMarkdown>
          </div>)
        }
        <button onClick={nextSlide}><GiNextButton/></button>
      </div>
    </>
  )
}