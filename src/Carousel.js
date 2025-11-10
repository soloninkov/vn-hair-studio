import React, { useState, useRef, useEffect } from 'react';
import './Carousel.css';

// Функція для імпорту всіх зображень із папки
const importAll = (r) => r.keys().map(r);

// Імпорт із різних директорій
const allImages = importAll(require.context('/public/images/all', false, /\.(png|jpe?g|svg)$/));
const menImages = importAll(require.context('/public/images/menHaircuts', false, /\.(png|jpe?g|svg)$/));
const womenImages = importAll(require.context('/public/images/womenHaircuts', false, /\.(png|jpe?g|svg)$/));
const studentsImages = importAll(require.context('/public/images/students', false, /\.(png|jpe?g|svg)$/));
const hairstylesImages = importAll(require.context('/public/images/hairstyles', false, /\.(png|jpe?g|svg)$/));

// Об’єднуємо всі масиви в один
const images = [
  ...allImages,
  ...menImages,
  ...womenImages,
  ...studentsImages,
  ...hairstylesImages,
];

const Carousel = ({ direction = 'right' }) => {
  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const positionRef = useRef(0);
  const velocity = 0.07; // швидкість руху — трохи повільніша для плавності
  const frameRef = useRef(null);

  const closeModal = () => setSelectedIndex(null);
  const nextImage = () => setSelectedIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);

  // Закриття по Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex !== null && e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  // Плавна анімація прокрутки
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let lastTime = performance.now();

    const animate = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      if (!isHovered && carousel.scrollWidth > carousel.clientWidth) {
        const scrollAmount = velocity * delta * (direction === 'left' ? -1 : 1);
        positionRef.current += scrollAmount;

        // безшовна прокрутка
        if (positionRef.current >= carousel.scrollWidth / 2) {
          positionRef.current = 0;
        } else if (positionRef.current <= 0) {
          positionRef.current = carousel.scrollWidth / 2;
        }

        carousel.scrollLeft = positionRef.current;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [direction, isHovered]);

  return (
    <div
      className="carousel-container"
      ref={carouselRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-content">
        {/* Подвоюємо список для плавного циклу */}
        {[...images, ...images].map((image, index) => (
          <img
            key={index}
            src={image}
            className="carousel-image"
            onClick={() => setSelectedIndex(index % images.length)}
            alt=""
            loading="lazy"
          />
        ))}
      </div>

      {/* Модальне вікно */}
      {selectedIndex !== null && (
        <div className="modal-window-image" onClick={closeModal}>
          <div
            className="modal-image-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-arrow left" onClick={prevImage}>‹</button>
            <img
              src={images[selectedIndex]}
              alt=""
              className="modal-image"
              style={{ width: '300px' }}
            />
            <button className="modal-arrow right" onClick={nextImage}>›</button>
            <button
              className="modal-close-unique"
              onClick={closeModal}
              aria-label="Закрити"
            ></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
