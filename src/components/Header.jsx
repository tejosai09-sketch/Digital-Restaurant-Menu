import React from 'react';
import '../styles/HomePage.css';

const Header = () => {
  return (
    <header className="brand-header">
      <div className="header-top-row">
        <div className="logo-section">
          {/* Replace src string with your local logo path if needed */}
          <div style={{
            background: '#ffc20e', 
            width: '45px', 
            height: '45px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>🍳</div>
          <h1 className="brand-name">The Masala House</h1>
        </div>
        
        <div className="contact-info">
          <span className="phone-icon">📞</span>
          <div className="phone-numbers">
            <span>7799331554</span>
            <span>7075108940</span>
          </div>
        </div>
      </div>

      <div className="tagline-container">
        <div className="stars">★★★</div>
        <div className="tagline-text">Good Food • Good Mood</div>
      </div>
    </header>
  );
};

export default Header;