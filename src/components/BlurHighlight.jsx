import React, { useEffect, useState } from 'react';
import './BlurHighlight.css';

export default function BlurHighlight({ text, highlightWords = [], delay = 0.05 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay before starting the animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const words = text.split(' ');

  return (
    <p className={`blur-highlight-container ${isVisible ? 'visible' : ''}`}>
      {words.map((word, index) => {
        const cleanWord = word.replace(/[.,!:]/g, '');
        const isHighlight = highlightWords.includes(cleanWord);
        
        return (
          <span
            key={index}
            className={`blur-word ${isHighlight ? 'highlighted' : ''}`}
            style={{ animationDelay: `${index * delay}s` }}
          >
            {word}{' '}
          </span>
        );
      })}
    </p>
  );
}
