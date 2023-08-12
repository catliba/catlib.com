import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import '../css/feed.css'
import {GiReturnArrow, GiPreviousButton, GiNextButton} from 'react-icons/gi'
import { motion } from "framer-motion"

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
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const prevSlide = () => {
    if (currentSlide > -1) {
      setCurrentSlide(currentSlide - 1)
      setDirection('right')
    }
  }
  const nextSlide = () => {
    if (currentSlide < sections.length - 1) {
      setCurrentSlide(currentSlide + 1)
      setDirection('left');
      window.scrollTo({
        top: 0
      })
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
  const comicStrip = blogPost.strip.data.attributes.url;

  return (
    <>
      <div className="return">
          <Link to={"/calendar"} className='symbol'>
            <GiReturnArrow />
          </Link>
      </div>
      <div className="slides">  
      <motion.button 
          onClick={prevSlide}
          whileTap={{scale:0.5}}><GiPreviousButton/></motion.button>
        {currentSlide === -1 ? 
          (<div className='start-panel'>
            <div className="title">
              {blogPost.title}
            </div>
            <div className="comic-header">
              <img src={comicStrip}/>
            </div>
          </div>)
          :
          (<motion.div 
            className={`text-body ${direction === 'left' ? 'left-slide' : 'right-slide'}`}
            key={currentSlide}
            initial={{ opacity: 0, x: direction === 'left' ? 200 : -200 }}
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: direction === 'left' ? -200 : 200 }}
            transition={{ duration: .5, ease: 'easeInOut' }}>
              <ReactMarkdown>{sections[currentSlide]}</ReactMarkdown>
          </motion.div>)
        }
        <motion.button 
          onClick={nextSlide}
          whileTap={{scale:0.5}}><GiNextButton/></motion.button>
      </div>
    </>
  )
}