// src/header.js
import React from 'react';
import './header.css';

const Header = ({ onToggle, buttonText }) => {
  return (
    <header className="team-header">
      <div className="header-content">
        <h1 className="header-title">OUR TEAM</h1>
        <button className="show-secretariat-btn" onClick={onToggle}>
          {buttonText}
        </button>
      </div>
    </header>
  );
};

export default Header;