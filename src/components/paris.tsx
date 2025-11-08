import '../css/paris.css';
import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import oldLove from '../pngs/yungkaiblue.mp3';
import Cake from '../pngs/cake.jpg'
import { useAllParisPages } from '../hooks/useParisPages';
import { markdownToHtml } from '../utils/parisLoader';
import { motion, AnimatePresence } from 'framer-motion';
import { GiPreviousButton, GiNextButton } from 'react-icons/gi';

export default function Paris() {
  const { pages, loading, error } = useAllParisPages();
  const [playSound] = useSound(oldLove, {
    volume: 0.5,
  });

  const [showContent, setShowContent] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update mobile state on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    setShowContent(true);
    playSound();
  };


  const nextCard = () => {
    if (currentCard < pages.length - 1) {
      setDirection('left');
      setCurrentCard(currentCard + 1);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setDirection('right');
      setCurrentCard(currentCard - 1);
    }
  };

  if (loading) {
    return (
      <div className="birthday">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="birthday">
        <div>Error: {error}</div>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="birthday">
        <div>No letters found.</div>
      </div>
    );
  }

  return (
      <>
        <div className="birthday">
        {!showContent ? (
          <button className='start' onClick={handleClick}>
            <img src={Cake} alt="Start Button" className='cake'/>
          </button>
        ) : (
          <div className="paris-carousel">
            <div className="paris-carousel-container">
              <motion.button
                className="paris-nav-button paris-nav-left"
                onClick={prevCard}
                disabled={currentCard === 0}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <GiPreviousButton />
              </motion.button>

              <div className="paris-card-wrapper">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentCard}
                    className="paris-card"
                    custom={direction}
                    initial={{ opacity: 0, x: direction === 'left' ? (isMobile ? 100 : 300) : (isMobile ? -100 : -300) }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction === 'right' ? (isMobile ? -100 : -300) : (isMobile ? 100 : 300) }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div 
                      className='paris-content'
                      dangerouslySetInnerHTML={{ __html: markdownToHtml(pages[currentCard].content) }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.button
                className="paris-nav-button paris-nav-right"
                onClick={nextCard}
                disabled={currentCard === pages.length - 1}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <GiNextButton />
              </motion.button>
            </div>

            <div className="paris-card-indicator">
              {pages.map((_, index) => (
                <button
                  key={index}
                  className={`paris-indicator-dot ${index === currentCard ? 'active' : ''}`}
                  onClick={() => {
                    setDirection(index > currentCard ? 'right' : 'left');
                    setCurrentCard(index);
                  }}
                />
              ))}
            </div>
          </div>
        )}
        </div>
      </>
  );
}
