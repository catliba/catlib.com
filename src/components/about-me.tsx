import React, { useEffect } from 'react';
import PageFlip from './page-flip';
import '../css/about-me.css';
import { useQuery, gql } from '@apollo/client/';

import frontend from '../pngs/frontend.png'
import htmlPic from '../pngs/html.png'
import cssPic from '../pngs/CSS.png'
import jsPic from '../pngs/JavaScript-Logo.png'
import java from '../pngs/java.png'
import reactPic from '../pngs/react.png'
import python from '../pngs/pthon.png'
import nodejspic from '../pngs/nodejs.png'
import docker from '../pngs/docker.webp'

//import Slideshow from './slideshow'
import book1 from '../pngs/book.jpg'
import show1 from '../pngs/breakingbad.png'
import show2 from '../pngs/demonslyaer.jpg'

const INTRO = gql`
query getImages {
    homepage {
      data {
        attributes {
          introduction
          docker
          nodejs
          java
          htmlcssjs
          react
          python
          language {
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
export default function AboutMe() {
    const {loading, error, data} = useQuery(INTRO);
    console.log(data);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                console.log(entry);
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        });
        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((el) => observer.observe(el));
    },)
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const languageImages = data?.homepage.data.attributes.language.data.map((item:any) => item.attributes.url);
    return (
        <>
            <div className='content'>
                <div className='hidden about-me'>
                    <span>Hi</span>
                    <p> 
                        {data?.homepage.data.attributes.introduction}
                    </p>
                </div>
                <div className='hidden languages'>
                    <h1>I'm familiar with...</h1>
                    <div className='grid-container'>
                        <img src={"http://localhost:1337" + languageImages[4]} alt="frontend" className='frontend'/>
                        <p>
                            {data?.homepage.data.attributes.htmlcssjs}
                        </p>
                    </div>
                    <div className='grid-container'>
                        <img src={"http://localhost:1337" + languageImages[0]} alt="Java"/>
                        <p>
                            {data?.homepage.data.attributes.java}
                        </p>
                    </div>
                    <div className='grid-container'>
                        <img src={"http://localhost:1337" + languageImages[3]} alt="React"/>
                        <p>
                            {data?.homepage.data.attributes.react}
                        </p>
                    </div>
                    <div className='grid-container'>
                        <img src={"http://localhost:1337" + languageImages[5]} alt="Python"/>
                        <p>
                            {data?.homepage.data.attributes.python}
                        </p>
                    </div>
                    <div className='grid-container'>
                        <img src={"http://localhost:1337" + languageImages[1]} alt="Node.js"/>
                        <p>
                            {data?.homepage.data.attributes.nodejs}
                        </p>
                    </div>
                    <div className='grid-container'>
                        <img src={"http://localhost:1337" + languageImages[2]} alt="Docker"/>
                        <p>
                            {data?.homepage.data.attributes.docker}
                        </p>
                    </div>
                </div>
                <div className='hidden watching'>
                    <div className='slideshow'>
                        <h1>Shows:</h1>
                        <img src={show1}/>
                    </div>
                    <div className='slideshow'>
                        <h1>Books:</h1>
                        <img  src={book1}/>
                    </div>
                </div>
                <div className='hidden contacts'>
                    <h1>Contacts:</h1>
                    <ul>
                        <li>Email</li>
                        <li>LinkedIn</li>
                        <li>Insta</li>
                        <li>Snap</li>
                        <li>Spotify</li>
                        <li>Discord</li>
                        <li>Facebook</li>
                        <li>BeReal</li>
                        <li>Chess</li>
                    </ul>
                </div>
            </div>
            <PageFlip />
        </>
    )
}