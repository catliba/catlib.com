import React, { useEffect } from 'react';
import PageFlip from './page-flip';
import '../css/about-me.css';

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

    const bookImages = [
        book1
    ]
    const showImages = [
        show1,
        show2
    ]
    return (
        <>
            <div className='content'>
                <div className='hidden about-me'>
                    <span>Hi</span>
                    <p> 
                        My name is Caleb but some friends call me catlib hence the name of this website. <br/>
                        Inspired by himetsai.com, I wanted to make a blog documenting my life. <br/>
                        But before we do that, let me tell you a little bit about myself and my technical background.
                    </p>
                </div>
                <div className='hidden languages'>
                    <h1>I'm familiar with...</h1>
                    <div className='grid-container'>
                        <img src={frontend} alt="frontend" className='frontend'/>
                        <p>
                            I remember making my first rudimentary website back in 2018 with the help of Khan Academy. It's still up on my Github. 
                            I've learned a lot and became a lot more comfortable with web development since then, yet there's still so much to learn.
                        </p>
                    </div>
                    <div className='grid-container'>
                        <img src={java} alt="Java"/>
                        <p>
                            From sitting in AP CS in 11th grade learning classes, methods, loops, arrays to learning data structures
                            algorithms in college, I built many projects using java and use it to solve very tough questions (Leetcode easy questions aren't easy).
                        </p>
                    </div>
                    <div className='grid-container'>
                        <img src={reactPic} alt="React"/>
                        <p>
                            Who doesn't love React? I gained familiarity with React at my San Diego Supercomputer Center 
                            internship where I worked on front end development, I and continue to use it for my projects today. 
                            Rest In Peace: CRA.
                        </p>
                    </div>
                    <div className='grid-container'>
                        <img src={python} alt="Python"/>
                        <p>
                            I took DSC 10 (Principles of Data Science) during my freshmen year of college and in that class, I learned the ways
                            of Python and more specifically its (baby) Pandas DataFrames. Using the Jupyter Notebooks to write Python code, I
                            learned how to manipulate data using this powerful yet clean language. 
                        </p>
                    </div>
                    <div className='grid-container'>
                        <img src={nodejspic} alt="Node.js"/>
                        <p>
                            I learned Node.js recently this year (2023) for two projects: RaccTracc and MovieReviewer. Through these projects, I gained experience with 
                            server side programming. I learned the MERN stack along the way and utlized REST APIs to communicate with the front end.
                            With this knowledge, I am more confident in building more complicated and user-based websites.
                        </p>
                    </div>
                    <div className='grid-container'>
                        <img src={docker} alt="Docker"/>
                        <p>
                            My first exposure to Docker was from my Boeing internship during the summer of my junior year of high school. Being a highschooler without a clue about
                            deployment, I was confused with the purpose of learning Docker. Nevertheless, I built a java todo app, made a Docker image, and pushed it 
                            onto Docker hub. Today, I am more interested in delving deeper into learning more about DevOps.
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