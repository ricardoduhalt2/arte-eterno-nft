import React from 'react';
import './SimpleCarousel.css';

const SimpleCarousel = () => {
  // Array of colors for the carousel items
  const colors = [
    '#9333ea', '#4f46e5', '#8b5cf6', '#6366f1', 
    '#a855f7', '#7c3aed', '#6d28d9', '#5b21b6'
  ];
  
  return (
    <div className="simple-carousel-container">
      <div className="simple-carousel">
        {/* First set of items */}
        {colors.map((color, index) => (
          <div 
            key={`first-${index}`} 
            className="simple-carousel-item" 
            style={{ backgroundColor: color }}
          >
            <div className="simple-item-title">NFT {index + 1}</div>
          </div>
        ))}
        
        {/* Duplicate set for continuous scrolling */}
        {colors.map((color, index) => (
          <div 
            key={`second-${index}`} 
            className="simple-carousel-item" 
            style={{ backgroundColor: color }}
          >
            <div className="simple-item-title">NFT {index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleCarousel;