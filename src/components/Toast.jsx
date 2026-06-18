import { useState, useEffect } from 'react';

export default function Toast({ message, onDone }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    const doneTimer = setTimeout(() => onDone(), 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`toast ${fadeOut ? 'fade-out' : ''}`}>
      {message}
    </div>
  );
}
