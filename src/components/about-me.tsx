import React, { useEffect, useState, useRef } from 'react';
import PageFlip from './page-flip';
import '../css/about-me.css';

export default function AboutMe() {
    const containerRef = useRef(null);
    const [ isVisible, setIsVisible ] = useState(false);

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
    }, )

    return (
        <>
            <div className='content'>
                <div className='hidden about-me'>
                    <p> 
                        <span>Hi</span>My name is Caleb but some of my friends call me catlib.
                    </p>
                </div>
                <div className='hidden languages'>
                    <h1>My Technical Background</h1>
                    <dl>
                        <dt>HTML,CSS,JavaScript (add image later)</dt>
                        <dd>How else would I make this website?</dd>

                        <dt>Java</dt>
                        <dd>My first language</dd>

                        <dt>C</dt>
                        <dd>Talk about what I did in CSE30</dd>

                        <dt>React</dt>
                        <dd>Who doesn't love React?</dd>

                        <dt>Node.js (MongoDB)</dt>
                        <dd>Backend for projects: (link project)</dd>

                        <dt>Docker</dt>
                    </dl>
                    <h1>What I'm Interested In</h1>
                    <p></p>
                </div>
                <div className='hidden achievements'>
                    <h1>Accomplishments</h1>
                    <ul>
                        <li>

                        </li>
                    </ul>
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