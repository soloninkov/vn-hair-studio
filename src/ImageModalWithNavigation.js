import React from 'react';
import './ImageModalWithNavigation.css';

const ImageModalWithNavigation = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  if (currentIndex === null) return null;

  return (
    <div className="modal-window-image" onClick={onClose}>
      <div className="modal-image-wrapper" onClick={(e) => e.stopPropagation()}>
        <button className="modal-arrow left" onClick={onPrev}>‹</button>

        <img
          src={images[currentIndex]}
          alt=""
          className="modal-image"
        />

        <button className="modal-arrow right" onClick={onNext}>›</button>

        <button className="modal-close-button-unique" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default ImageModalWithNavigation;
