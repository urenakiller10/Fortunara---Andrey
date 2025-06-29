import React from 'react';
import './MainWheel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons';

export default function TopBar() {
  return (
    <header className="top-bar" style={{
      padding: '15px 20px',
      borderBottom: '1px solid #333',
      display: 'flex',
      justifyContent: 'flex-start',

      alignItems: 'center',
      backgroundColor: '#222',
      color: 'white',
    }}>

      {/* Título a la derecha */}
      <div className="top-bar-left" style={{ display: 'flex', alignItems: 'center', marginLeft: '250px' }}>
        <h1 className="logo-text" style={{ margin: 0, fontSize: '28px', fontFamily: 'fantasy', color: 'red' }}>
          SUPER QUADS
        </h1>
      </div>

      {/* Botones centrales */}
      <div className="options" style={{
        display: 'flex',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'transparent',
      }}>
        {['Tour', 'Galería de aventuras', 'Acerca de'].map((text, index) => (
          <div
            key={text}
            className="option-button"
            style={{
              padding: '8px 15px',
              backgroundColor: '#222',
              color: 'white',
              cursor: 'pointer',
              borderLeft: index !== 0 ? '1px solid white' : 'none',
              fontWeight: 'bold',
            }}
          >
            {text}
          </div>
        ))}
      </div>

      {/* Redes + Botón Reservar */}
      <div className="top-bar-right" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginLeft: '800px', 
      
      }}>
        {/* Íconos */}
        <div className="social-icons" style={{ display: 'flex', gap: '10px' }}>
          {[faFacebookF, faInstagram, faWhatsapp, faTiktok].map((icon, i) => (
            <div key={i} className="social-icon-circle">
              <FontAwesomeIcon icon={icon} className="social-icon-img" />
            </div>
          ))}
        </div>

        {/* Botón Reservar */}
        <button style={{
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          textTransform: 'uppercase',
          
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c0392b'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e74c3c'}
        >
          Reservar
        </button>
      </div>

    </header>
  );
}
