import React, { useEffect } from 'react';
import PageFlip from './page-flip';
import '../css/about-me.css';
import { useQuery, gql } from '@apollo/client/';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
//import Slideshow from './slideshow'
import book1 from '../pngs/book.jpg'
import show1 from '../pngs/breakingbad.png'
import plane from '../pngs/paperairplane.png'
import backdrop from '../pngs/Untitled_Artwork.png'

const INTRO = gql`
query getData {
    homepage {
      data {
        attributes {
          introduction
          hobbies {
            data {
              attributes {
                url
              }
            }
          }
          caleb {
            data {
              attributes {
                url
              }
            }
          }
          contact {
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

  
    const contactImages = data?.homepage.data.attributes.contact.data.map((image:any) => image.attributes.url);
    //here is a single image so ...caleb.data is an Object
    const profile = data?.homepage.data.attributes.caleb.data.attributes.url;
    //not here though, thus [0] required
    //later on when I add my hobbies I will map it
    const hobby = data?.homepage.data.attributes.hobbies.data[0].attributes.url;
    return (
        <>
            <div>
                <h1 className='heading'>
                    About me:
                </h1>
                <p>
                    things left to do on this page: slideshow for 3rd and 4th panel <br/>
                    change descriptions <br/>
                    add captions to third and fourth panel <br/>
                    get rid of rightside scroll (view don't get rid of the scroll itself) when animated
                </p>
            </div>
            <div className='content'>
                <img src={plane} className='plane-scroller'/>
                <div className='about-me'>
                    <img src={backdrop} className='background'/>
                    <span>Hi</span>
                </div>
                <div className='caption'>
                    <img src={backdrop} className='background'/>
                    <p> 
                        {data?.homepage.data.attributes.introduction}
                    </p>
                </div>
                <div className='show'>
                    <img src={backdrop} className='background'/>
                    <div className='watching'>
                        <h1>This is me:</h1>
                        <img className='framed' src={"http://localhost:1337" + profile}/>
                    </div>
                </div>
                <div className='show'>
                    <img src={backdrop} className='background'/>
                    <div className='reading'>
                        <h1>I like to:</h1>
                        <img  className='framed' src={"http://localhost:1337" + hobby}/>
                    </div>
                </div>
            </div>
            <div className='contacts'>
                    <div className='logos'>
                        <a className='logo hidden' href="https://friend.chess.com/LQznr">
                            <img src={"http://localhost:1337" + contactImages[0]} />
                        </a>
                        <a className='logo hidden' href="https://www.linkedin.com/in/li-caleb/">
                            <img src={"http://localhost:1337" + contactImages[1]} />
                        </a>
                        <a className='logo hidden' href="https://www.instagram.com/calebl1/">
                            <img src={"http://localhost:1337" + contactImages[2]} />
                        </a>
                        <a className='logo hidden' href="https://open.spotify.com/user/1caleblili?si=01260313e24f464e">
                            <img src={"http://localhost:1337" + contactImages[3]} />
                        </a>
                        <a className='logo hidden' href="mailto:1caleblili@gmail.com">
                            <img src={"http://localhost:1337" + contactImages[4]} />
                        </a>
                        <a className='logo hidden' href="https://t.snapchat.com/VDbK9l3r">
                            <img src={"http://localhost:1337" + contactImages[5]} />
                        </a>
                    </div>
                </div>
            <PageFlip />
        </>
    )
}