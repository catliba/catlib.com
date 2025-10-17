import { useEffect, useState } from 'react';
import PageFlip from './page-flip';
import '../css/about-me.css';
import { homepageImages } from '../config/images';
import plane from '../pngs/paperairplane.png'
import backdrop from '../pngs/Untitled_Artwork.png'
import { AiOutlineLeft, AiOutlineRight,AiOutlineArrowRight } from 'react-icons/ai'

export default function AboutMe() {
    const [me, setMe] = useState<number>(0);
    const [projIndex, setProjIndex] = useState<number>(0);
    const [projImageIndex, setProjImageIndex] = useState<number>(0);
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

    const nextProjSlide = () => {
        if (projIndex < homepageImages.projects.length - 1) {
            setProjIndex(projIndex + 1)
            setProjImageIndex(0) // Reset image index when changing projects
        }
    }
    const prevProjSlide = () => {
        if (projIndex > 0) {
            setProjIndex(projIndex - 1)
            setProjImageIndex(0) // Reset image index when changing projects
        }
    }
    
    const nextProjImage = () => {
        const currentProject = homepageImages.projects[projIndex];
        if (projImageIndex < currentProject.images.length - 1) {
            setProjImageIndex(projImageIndex + 1)
        }
    }
    const prevProjImage = () => {
        if (projImageIndex > 0) {
            setProjImageIndex(projImageIndex - 1)
        }
    }
    const nextSlide = () => {
        if (me < homepageImages.caleb.length - 1) {
            setMe(me + 1)
        }
    }
    const prevSlide = () => {
        if (me > 0) {
            setMe(me - 1)
        }
    }

    const nextHobSlide = () => {
        if (iliketo < homepageImages.hobbies.length - 1) {
            setiliketo(iliketo + 1)
        }
    }
    const prevHobSlide = () => {
        if (iliketo > 0) {
            setiliketo(iliketo - 1)
        }
    }

    const contactImages = [
        homepageImages.contact.email,
        homepageImages.contact.spotify,
        homepageImages.contact.linkedin,
        homepageImages.contact.snapchat,
        homepageImages.contact.instagram,
        homepageImages.contact.github
    ];

    return (
        <>
            <div className='homepage'>
                <PageFlip dir='/notes' message='Flip me!'/>
                <div className='content'>
                    <img src={plane} className='plane-scroller'/>
                    {(/Android|iPhone/i.test(navigator.userAgent)) ? (
                        <div>Scroll right! <AiOutlineArrowRight/></div>
                    ):(<div></div>)}
                    <div className='about-me'>
                        <img src={backdrop} className='background'/>
                        <div className="first-panel">
                            <span>Hi</span>
                            <img className='cat' src={homepageImages.cat} alt='Cat Image' />
                        </div>
                    </div>
                    <div className='caption'>
                        <img src={backdrop} className='background'/>
                        <p> 
                            {homepageImages.introduction}
                        </p>
                    </div>
                    <div className='about-me'>
                        <img src={backdrop} className='background'/>
                        <div className='reading'>
                            <h1>Projects:</h1>
                            <div className='left-right-buttons'>
                                <button onClick={prevProjSlide}><AiOutlineLeft /></button>
                                <div className='project-content'>
                                    <h2 className='project-title'>{homepageImages.projects[projIndex].title}</h2>
                                    <p className='project-description'>{homepageImages.projects[projIndex].description}</p>
                                    {homepageImages.projects[projIndex].link && (
                                        <a href={homepageImages.projects[projIndex].link} target="_blank" rel="noopener noreferrer" className='project-link'>
                                            View Project →
                                        </a>
                                    )}
                                </div>
                                <button onClick={nextProjSlide}><AiOutlineRight /></button>
                            </div>
                            {homepageImages.projects[projIndex].images.length > 0 && (
                                <div className='project-images'>
                                    <div className='left-right-buttons'>
                                        <button onClick={prevProjImage}><AiOutlineLeft /></button>
                                        <div className='image-container'>
                                            <img className='project-image' src={homepageImages.projects[projIndex].images[projImageIndex].url} alt={homepageImages.projects[projIndex].images[projImageIndex].caption}/>
                                            {homepageImages.projects[projIndex].images[projImageIndex].caption && (
                                                <p className='image-caption'>{homepageImages.projects[projIndex].images[projImageIndex].caption}</p>
                                            )}
                                        </div>
                                        <button onClick={nextProjImage}><AiOutlineRight /></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='show'>
                        <img src={backdrop} className='background'/>
                        <div className='reading'>
                            <h1>Me:</h1>
                            <div className='left-right-buttons'>
                                <button onClick={prevSlide}><AiOutlineLeft /></button>
                                <img className='normal-framed' src={homepageImages.caleb[me].url}/>
                                <button onClick={nextSlide}><AiOutlineRight /></button>
                            </div>
                            <h1 className='capt'>{homepageImages.caleb[me].caption}</h1>
                        </div>
                    </div>
                    <div className='show'>
                        <img src={backdrop} className='background'/>
                        <div className='reading'>
                            <h1 className='pic-title'>I like:</h1>
                            <div className='left-right-buttons'>
                                <button onClick={prevHobSlide}><AiOutlineLeft /></button>
                                <img className='framed' src={homepageImages.hobbies[iliketo].url}/>
                                <button onClick={nextHobSlide}><AiOutlineRight /></button>
                            </div>
                            <h1 className='capt'>{homepageImages.hobbies[iliketo].caption}</h1>
                        </div>
                    </div>
                </div>
                <div className='contacts'>
                    <a className='logo hidden' href="mailto:1caleblili@gmail.com">
                        <img src={contactImages[0]} />
                    </a>
                    <a className='logo hidden' href="https://www.linkedin.com/in/li-caleb/">
                        <img src={contactImages[2]} />
                    </a>
                    <a className='logo hidden' href="https://www.instagram.com/calebl1/">
                        <img src={contactImages[4]} />
                    </a>
                    <a className='logo hidden' href="https://t.snapchat.com/VDbK9l3r">
                        <img src={contactImages[3]} />
                    </a>
                    <a className='logo hidden' href="https://open.spotify.com/user/1caleblili?si=01260313e24f464e">
                        <img src={contactImages[1]} />
                    </a>
                    <a className='logo hidden' href="https://github.com/catliba">
                        <img className='github' src={contactImages[5]} />
                    </a>
                </div>
            </div>
        </>
    )
}
