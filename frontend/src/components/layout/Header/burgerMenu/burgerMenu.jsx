import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './burgerMenu.css';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY.current && currentScrollY > 50) {
        // Скроллим вверх и проскроллили больше 50px
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Скроллим вниз и проскроллили больше 100px
        setIsHeaderVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`hamburger-menu-container ${isHeaderVisible ? 'visible' : 'hidden'}`}>
      <button className="hamburger-button" onClick={toggleMenu}>
        <svg className={`burger-icon lineRotate span ${isOpen ? 'active' : ''}`} viewBox="0 0 100 100" width={60}>
          <path className="line top" d="M30.1,33 H70 C73.72,33 77.5,36.13 77.5,41.58 C77.5,47.03 74.77,50 70,50 H50 V50" />
          <path className="line middle" d="M30,50 H70" />
          <path className="line bottom" d="M70.1,67 H30 C30,67 22.5,66.2 22.5,58.63 C22.5,51.07 30,50 30,50 H50" />
        </svg>
      </button>

      <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Главная</Link></li>
          <li><Link to="/catalog/bycicle" onClick={toggleMenu}>Велосипеды</Link></li>
          <li><Link to="/catalog/parts" onClick={toggleMenu}>Запчасти</Link></li>
          <li><Link to="/catalog/protection" onClick={toggleMenu}>Защита</Link></li>
          <li><Link to="/catalog/accessoaries" onClick={toggleMenu}>Аксессуары</Link></li>
          <li><Link to="/catalog/sale" onClick={toggleMenu}>Скидки</Link></li>
          <li><a href="tel:+375291278356">Позвонить нам</a></li>
        </ul>
      </div>
      <div className={`hamburger-overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
    </div>
  );
};

export default BurgerMenu;