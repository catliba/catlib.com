import '../css/paris.css';
import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import oldLove from '../pngs/miceonvenus.mp3';
import Cake from '../pngs/cake.jpg'
import { useAllParisPages } from '../hooks/useParisPages';
import { markdownToHtml } from '../utils/parisLoader';
import { GiPreviousButton, GiNextButton } from 'react-icons/gi';

export default function Paris() {
  const { pages, loading, error } = useAllParisPages();
  const [playSound] = useSound(oldLove, {
    volume: 2,
    preload: true,
  });

  const [showContent, setShowContent] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  // Play sound automatically when component loads
  useEffect(() => {
    if (playSound) {
      try {
        playSound();
      } catch (err) {
        console.warn('Failed to play sound:', err);
        // Fallback: try using HTML5 Audio API directly
        try {
          const audio = new Audio(oldLove);
          audio.volume = 2;
          audio.play().catch(e => console.warn('Audio fallback failed:', e));
        } catch (fallbackErr) {
          console.warn('Audio fallback also failed:', fallbackErr);
        }
      }
    }
  }, [playSound]);

  const handleClick = () => {
    setShowContent(true);
  };


  const nextCard = () => {
    if (currentCard < pages.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
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
              <button
                className="paris-nav-button paris-nav-left"
                onClick={prevCard}
                disabled={currentCard === 0}
              >
                <GiPreviousButton />
              </button>

              <div className="paris-card-wrapper">
                <div className="paris-card">
                  <div 
                    className='paris-content'
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(pages[currentCard].content) }}
                  />
                </div>
              </div>

              <button
                className="paris-nav-button paris-nav-right"
                onClick={nextCard}
                disabled={currentCard === pages.length - 1}
              >
                <GiNextButton />
              </button>
            </div>

            <div className="paris-card-indicator">
              {pages.map((_, index) => (
                <button
                  key={index}
                  className={`paris-indicator-dot ${index === currentCard ? 'active' : ''}`}
                  onClick={() => setCurrentCard(index)}
                />
              ))}
            </div>
          </div>
        )}
        </div>
      </>
  );
}
