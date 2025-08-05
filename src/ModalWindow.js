
import React, { useState, useCallback, useEffect } from 'react';
import './ModalWindow.css';

const ModalWindow = ({ show, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 800);
      document.removeEventListener('keydown', handleKeyDown);
      return () => clearTimeout(timer);
    }
  }, [show, handleKeyDown]);

  useEffect(() => {
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className={`modal-backdrop ${show ? 'show' : ''}`}
      style={{ display: isVisible ? 'flex' : 'none' }}
      onClick={onClose}
    >
      <div >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="modal-close-button"
          aria-label="Close modal"
        ></button>
        {children}
        <div className="buttons-grid" >  
          <a
            href="https://t.me/ivanivna15"
            target="_blank"
            className="social-button--1"
          >
            <span className="social telegram" /> Telegram
          </a>
          <a
            href="https://www.instagram.com/_niknk?igsh=ZjJ6MGd1MmV4M21n"
            target="_blank"
            className="social-button--2"
          >
            <span className="social instagram" /> Instagram
          </a>
         
          <a
            href="tel:+420774396964"
            className="social-button--1"
          >
            <span className="social phone" /> +420774396964
          </a>
          <a
            href="tel:+380973552498"
            className="social-button--2"
          >
            <span className="social phone" /> +380973552498
          </a>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
