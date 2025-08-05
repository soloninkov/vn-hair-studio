import React, { useState } from 'react';

import ImageModalWithNavigation from './ImageModalWithNavigation';
import './ImageModalWithNavigation.css'; // твій CSS



const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('/public/images/menHaircuts', false, /\.(png|jpe?g|svg)$/));

const MenHaircuts = () => {
  const [visibleRows, setVisibleRows] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(null); // індекс зображення

  const imagesPerRow = 3;

  const showMoreImages = () => {
    setVisibleRows((prev) => prev + 2);
  };

  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setCurrentIndex(null);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const renderImages = () => {
    const visibleImages = images.slice(0, visibleRows * imagesPerRow);
    return visibleImages.map((image, index) => (
      <img
        key={index}
        src={image}
        alt=""
        className="gallery-image"
        onClick={() => handleImageClick(index)}
      />
    ));
  };

  return (
    <div className="image-gallery" style={{ padding: '0 0 30px 0' }}>
      <div className="image-grid">{renderImages()}</div>

      {visibleRows * imagesPerRow < images.length && (
        <button className="show-more-button" onClick={showMoreImages}>
          Больше работ
          <p className="more-icon"></p>
        </button>
      )}

      {/* Модальне вікно */}
      <ImageModalWithNavigation
        images={images}
        currentIndex={currentIndex}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};
export default MenHaircuts;

