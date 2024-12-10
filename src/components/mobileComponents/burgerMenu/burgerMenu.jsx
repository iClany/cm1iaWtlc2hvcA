import React, { useState } from 'react';
import './burgerMenu.css';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu-container">
      <button className="hamburger-button" onClick={toggleMenu}>
        <svg className={`burger-icon lineRotate span ${isOpen ? 'active' : ''}`} viewBox="0 0 100 100" width={60}>
          <path className="line top" d="M30.1,33 H70 C73.72,33 77.5,36.13 77.5,41.58 C77.5,47.03 74.77,50 70,50 H50 V50" />
          <path className="line middle" d="M30,50 H70" />
          <path className="line bottom" d="M70.1,67 H30 C30,67 22.5,66.2 22.5,58.63 C22.5,51.07 30,50 30,50 H50" />
        </svg>
      </button>

      <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div className={`hamburger-overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
    </div>
  );
};

export default BurgerMenu;