import '../css/paris.css';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import Sprinkles from '../pngs/weiwei1.jpg';
import Rilakkuma from '../pngs/rillakuma-chibi.gif'
import useSound from 'use-sound';
import oldLove from '../pngs/song.mp3';
import Cake from '../pngs/cake.jpg'

export default function Paris() {

  const [playSound] = useSound(oldLove, {
    volume: 0.5,
  });

  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setShowContent(true);
    playSound();
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        launchConfetti();
      }, i * 500);
    }
  };

  const launchConfetti = () => {
    const x = Math.random();
    const y = Math.random();

    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x, y }
    });
  };

  return (
      <>
        <div className="birthday">
        {!showContent ? (
          <button className='start' onClick={handleClick}>
            <img src={Cake} alt="Start Button" className='cake'/>
          </button>
        ) : (
          <>
            <div className='wishes'>
              <img src={Rilakkuma} alt="Pom Pom Kuma" className="rilakkuma" />
              <h1>Happy Birthday!</h1>
              <img src={Rilakkuma} alt="Pom Pom Kuma" className="rilakkuma" />
            </div>
            <div className='message'>
              <h1>Dear Weiwei,</h1> 
              <h3>First and foremost, happy 21 years of age! 
              We've only spent around 4% of our current living years together, but tell me why that 4% feels more like 
              40%? I can't really imagine how I went about my days before knowing you anymore...I also don't really want to.
              While I may not admit it, I do think about you A LOT. Long distance is really hard for me because I like you a lot a lot. 
              So yea, I made you a corny ass website, and yes, this was my idea of a birthday gift to you.
              Since I cannot give you anything in person, this felt like the next best option.
              If you dislike it, let me know and I'll think of something else next year. 
              Hopefully China VPN doesn't block this.
              Also, you will probably see this the day after your birthday since I'm a lazy person and procrastinated on this (along with numerous other things).
              But enough excuses and whatever. Happy Birthday! When we spend more time together, I'll add to this website, and it'll grow!  Love ya :)</h3>
              <h2>--Caleb</h2>
            </div>
            <div className='timeline'>

            </div>
            <img src={Sprinkles} className='sprinkles' />
          </>
        )}
        </div>
      </>
  );
}
