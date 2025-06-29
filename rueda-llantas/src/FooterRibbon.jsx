import React, { useState } from 'react';
import './MainWheel.css';

const images = [
  '/021.jpg',
  '/022.jpg',
  '/023.jpg',
  // Podés agregar más URLs aquí
];

export default function FooterRibbon() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((oldIndex) => (oldIndex === 0 ? images.length - 1 : oldIndex - 1));
  };

  const nextImage = () => {
    setCurrentIndex((oldIndex) => (oldIndex === images.length - 1 ? 0 : oldIndex + 1));
  };

  return (
    <div className="ribbon-footer" style={{ zIndex: 1000, backgroundColor: '#111', padding: '20px' }}>
      <div className="ribbon-content" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span
          className="ribbon-text"
          style={{
            color: 'white',
            fontWeight: 'bold',
            minWidth: '180px',
            fontFamily: "fantasy",
            fontSize: '29px',
          }}
        >
          GALERÍA DE AVENTURAS
        </span>

        {/* Flecha izquierda */}
        <button
          onClick={prevImage}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '30px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          aria-label="Imagen anterior"
        >
          ‹
        </button>

        {/* Imagen actual */}
        <div
          style={{
            width: '270px',
            height: '180px',
            overflow: 'hidden',
            borderRadius: '10px',
            boxShadow: '0 0 8px rgba(255,255,255,0.4)',
            flexShrink: 0,
          }}
        >
          <img
            src={images[currentIndex]}
            alt={`Galería imagen ${currentIndex + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }}
            draggable={false}
          />
        </div>

        {/* Flecha derecha */}
        <button
          onClick={nextImage}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '30px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          aria-label="Imagen siguiente"
        >
          ›
        </button>

        {/* Botón Ver galería */}
        <button
          className="ribbon-reserve-button"
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '12px 18px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginLeft: 'auto',
            fontSize: '14px',
            boxShadow: '0 0 12px #e74c3c',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#c0392b';
            e.currentTarget.style.boxShadow = '0 0 20px #c0392b';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#e74c3c';
            e.currentTarget.style.boxShadow = '0 0 12px #e74c3c';
          }}
        >
          Ver galería <span style={{ fontSize: '22px', lineHeight: 0 }}>›</span>
        </button>
      </div>
    </div>
  );
}
