import React from 'react';
import PageFlip from './page-flip';
import '../css/about-me.css';

export default function AboutMe() {
    return (
        <>
            <div className='about-me'>
            Hi. Before you look around my site, I would like to tell you a little bit about myself. 
            My name is Caleb but some of my friends call me catlib (it's a long story). I like cats.
            </div>
            <PageFlip />
        </>
    )
}