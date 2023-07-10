import React, { useEffect } from 'react';
import PageFlip from './page-flip';
import '../css/about-me.css';

import frontend from '../pngs/frontend.png'
import java from '../pngs/java.png'
import reactPic from '../pngs/react.png'
import python from '../pngs/pthon.png'
import nodejspic from '../pngs/nodejs.png'
import docker from '../pngs/docker.webp'

export default function AboutMe() {
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

    return (
        <>
            <div className='content'>
                <div className='hidden about-me'>
                    <span>Hi</span>
                    <p> 
                        My name is Caleb but some of my friends call me catlib. <br/>
                        I had a lot of fun making this website come to life, and I hope to share a little bit about myself on here. <br/>
                        You should also check out my blog! 
                    </p>
                </div>
                <div className='hidden languages'>
                    <h1>I'm familiar with...</h1>
                    <img src={frontend} alt="HTML,CSS,JavaScript" className='bigger-image'/>
                    <img src={java} alt="Java"/>
                    <img src={reactPic} alt="React"/>
                    <img src={python} alt="Python"/>
                    <img src={nodejspic} alt="Node.js"/>
                    <img src={docker} alt="Docker"/>
                </div>
                <div className='hidden achievements'>
                    <h1>Accomplishments</h1>
                    <ul>
                        <li>

                        </li>
                    </ul>
                    <h1>What I'm Interested In</h1>
                    <p>
                        I'm interested in things that move on a screen. Whether that's from 2D animations or from a 3D video game, 
                        seeing a flat screen come to life so seamlessly is fascinating to me. I hope to delve deeper in computer
                        graphics animation.
                    </p>
                </div>
                <div className='hidden watching'>
                    <div className='shows'>
                        <h1>Shows:</h1>
                    </div>
                    <div className='books'>
                        <h1>Books:</h1>
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