import { useEffect, useState } from 'react';
import PageFlip from './page-flip';
import '../css/about-me.css';
import { useQuery, gql } from '@apollo/client/';
//import Slideshow from './slideshow'
import plane from '../pngs/paperairplane.png'
import backdrop from '../pngs/Untitled_Artwork.png'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

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
          cat {
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
    const [me, setMe] = useState<number>(0);
    const [iliketo, setiliketo] = useState<number>(0);

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

    const nextSlide = () => {
        if (me < profile.length - 1) {
            setMe(me + 1)
        }
    }
    const prevSlide = () => {
        if (me > 0) {
            setMe(me - 1)
        }
    }

    const nextHobSlide = () => {
        if (iliketo < hobby.length - 1) {
            setiliketo(iliketo + 1)
        }
    }
    const prevHobSlide = () => {
        if (iliketo > 0) {
            setiliketo(iliketo - 1)
        }
    }
    
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

  
    const contactImages = data?.homepage.data.attributes.contact.data.map((image:any) => image.attributes.url);
    const profile = data?.homepage.data.attributes.caleb.data;
    const cat = data?.homepage.data.attributes.cat.data.attributes.url;
    const hobby = data?.homepage.data.attributes.hobbies.data;
    
    return (
        <>
            <div className='homepage'>
                <PageFlip />
                <div className='content'>
                    <img src={plane} className='plane-scroller'/>
                    <div className='about-me'>
                        <img src={backdrop} className='background'/>
                        <div className="first-panel">
                            <span>Hi</span>
                            <img className='cat' src={cat}/>
                        </div>
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
                            <h1>Me:</h1>
                            <div className='left-right-buttons'>
                                <button onClick={prevSlide}><AiOutlineLeft /></button>
                                <img className='framed' src={profile[me].attributes.url}/>
                                <button onClick={nextSlide}><AiOutlineRight /></button>
                            </div>
                        </div>
                    </div>
                    <div className='show'>
                        <img src={backdrop} className='background'/>
                        <div className='reading'>
                            <h1>I like to:</h1>
                            <div className='left-right-buttons'>
                                <button onClick={prevHobSlide}><AiOutlineLeft /></button>
                                <img className='framed' src={hobby[iliketo].attributes.url}/>
                                <button onClick={nextHobSlide}><AiOutlineRight /></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='contacts'>
                    <a className='logo hidden' href="mailto:1caleblili@gmail.com">
                        <img src={contactImages[0]} />
                    </a>
                    <a className='logo hidden' href="https://www.linkedin.com/in/li-caleb/">
                        <img src={contactImages[3]} />
                    </a>
                    <a className='logo hidden' href="https://www.instagram.com/calebl1/">
                        <img src={contactImages[5]} />
                    </a>
                    <a className='logo hidden' href="https://t.snapchat.com/VDbK9l3r">
                        <img src={contactImages[4]} />
                    </a>
                    <a className='logo hidden' href="https://open.spotify.com/user/1caleblili?si=01260313e24f464e">
                        <img src={contactImages[2]} />
                    </a>
                    <a className='logo hidden' href="https://friend.chess.com/LQznr">
                        <img src={contactImages[1]} />
                    </a>
                </div>
            </div>
        </>
    )
}