
import React, { useState, useEffect } from 'react';
import './Students.css'; // або './ModalShared.css' якщо витягнеш стилі в окремий файл

const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('/public/images/womenHaircuts', false, /\.(png|jpe?g|svg)$/));

const WomenHaircuts = () => {
  const [visibleRows, setVisibleRows] = useState(2);
  const [selectedIndex, setSelectedIndex] = useState(null); // index для навігації
  const imagesPerRow = 3;

  const showMoreImages = () => {
    setVisibleRows((prev) => prev + 2);
  };

  const openModal = (index) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % images.length));
  };

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === null ? images.length - 1 : (prev - 1 + images.length) % images.length
    );
  };

  // клавіатурні дії: Esc закрити, ← → навігація
  useEffect(() => {
    const onKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIndex]);

  const renderImages = () => {
    const visibleImages = images.slice(0, visibleRows * imagesPerRow);
    return visibleImages.map((image, index) => (
      <img
        key={index}
        src={image}
        alt=""
        className="gallery-image"
        onClick={() => openModal(index)}
      />
    ));
  };

  return (
    <div className="image-gallery" style={{ padding: '0 0 30px 0' }}>
      <div className="image-grid">{renderImages()}</div>

      {visibleRows * imagesPerRow < images.length && (
        <button className="show-more-button" onClick={showMoreImages}>
          Більше робіт
          <p className="more-icon" />
        </button>
      )}

      {selectedIndex !== null && (
        <div className="modal-window-image" onClick={closeModal}>
          <div className="modal-image-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-arrow left" onClick={prevImage} aria-label="Попереднє">
              ‹
            </button>

            <img
              src={images[selectedIndex]}
              alt=""
              className="modal-image"
              style={{ width: '300px' }}
            />

            <button className="modal-arrow right" onClick={nextImage} aria-label="Наступне">
              ›
            </button>

            <button
              className="modal-close-unique"
              onClick={closeModal}
              aria-label="Закрити"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WomenHaircuts;


