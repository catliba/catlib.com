import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import '../css/feed.css'
import {GiReturnArrow, GiPreviousButton, GiNextButton} from 'react-icons/gi'
import { motion } from "framer-motion"

const GET_INDIVIDUAL_POST = gql`
query ($slugUrl: String!) {
  strips(filters: {urlSlug: { eq: $slugUrl }}) {
    data {
      attributes {
        title
        content
        comic {
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
  console.log(data.strips.data[0].attributes);
  const blogPost = data.strips.data[0].attributes;
  const blogBody: string = blogPost.content;
  const sections: string[] = (blogBody.match(/(?:^|\n)##\s+(.*(?:\n(?!## ).+)*)/g) || []) as string[];
  const comicStrip = blogPost.comic.data.attributes.url;

  return (
    <>
      <div className="return">
          <Link to={"/life"} className='symbol'>
            <GiReturnArrow />
          </Link>
      </div>
        {currentSlide === -1 ? 
          (<>
          <div className="slides">
          <motion.button
            className='button-top'
            onClick={prevSlide}
            whileTap={{scale:0.5}}><GiPreviousButton/></motion.button>
          <div className='start-panel'>
            <div className="title">
              {blogPost.title}
            </div>
            <div className="comic-header">
              <img src={comicStrip}/>
            </div>
          </div>
          <motion.button
            className='button-bot' 
            onClick={nextSlide}
            whileTap={{scale:0.5}}
            whileHover={{color: '#7d0b00'}}><GiNextButton/></motion.button>
          </div>
          </>)
          :
          (<>
            <div className='feed-interface'>
              <div className='left-button-position'>
                <motion.button
                className='content-left'
                onClick={prevSlide}
                whileTap={{scale:0.5}}
                whileHover={{color: '#7d0b00'}}><GiPreviousButton/></motion.button>
              </div>
              <div className="feed-content">
                <div className='height-setter'></div>
                <motion.div 
                className={`text-body ${direction === 'left' ? 'left-slide' : 'right-slide'}`}
                key={currentSlide}
                initial={{ opacity: 0, x: direction === 'left' ? 200 : -200 }}
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: direction === 'left' ? -200 : 200 }}
                transition={{ duration: .4, ease: 'easeInOut' }}>
                  <ReactMarkdown>{sections[currentSlide]}</ReactMarkdown>
                </motion.div>
              </div>
              <div className='right-button-position'>
                <motion.button
                  className='content-right' 
                  onClick={nextSlide}
                  whileTap={{scale:0.5}}
                  whileHover={{color: '#7d0b00'}}><GiNextButton/></motion.button>
              </div>
            </div>
          </>)
        }
    </>
  )
}