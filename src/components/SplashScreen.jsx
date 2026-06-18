import { useState, useEffect } from 'react';

const quotes = [
  "Ada cerita seru hari ini?",
  "Apa yang bikin kamu senyum?",
  "Moment yang unforgettable?",
  "Ada yang hit banget?",
  "Cerita yang worth it?",
  "Apa highlight harimu?",
  "Ada yang bikin kamu grow?",
  "Momen yang absolute fire?",
  "Cerita yang no cap?",
  "Hari ini slay gak?",
  "Ada drama positif nih?",
  "Apa yang vibe sama kamu?",
  "Cerita yang bikin happy?",
  "Ada yang game-changing?",
  "Momen yang berkesan banget?",
  "Apa yang bikin kamu proud?",
  "Cerita yang beda dari biasanya?",
  "Ada yang totally worth sharing?",
  "Apa yang bikin hari ini special?",
  "Moment yang gak bakal lupa?",
];

export default function SplashScreen({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [quote] = useState(
    () => quotes[Math.floor(Math.random() * quotes.length)]
  );

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    const completeTimer = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-logo">DayLore</div>
      <p className="splash-quote">{quote}</p>
      <div className="splash-dots">
        <span className="splash-dot" />
        <span className="splash-dot" />
        <span className="splash-dot" />
      </div>
    </div>
  );
}
