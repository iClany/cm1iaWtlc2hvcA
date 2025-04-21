import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../../../index.css';
import BurgerMenu from './burgerMenu/burgerMenu.jsx';
import BottomMenu from './bottomMenu/bottomMenu.jsx';
import headerStyles from './Header.module.css';

import logo from '../../../assets/images/logo/logo-header.svg';
import { phoneIcon, locationIcon, searchIcon, cartIcon, loginIcon } from '../../assets/icons';

export default function Header() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldShowHeader, setShouldShowHeader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 100) {
        // Показываем хедер если вверху страницы или меньше 100px
        setShouldShowHeader(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Скролл вниз и больше 100px - скрываем
        setShouldShowHeader(false);
      } else if (currentScrollY < lastScrollY && currentScrollY > 100) {
        // Скролл вверх и больше 100px - показываем
        setShouldShowHeader(true);
      }

      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const header = document.querySelector(`.${headerStyles.header}`);
    if (window.scrollY > 0) {
      header.classList.add(headerStyles.scrolled);
    } else {
      header.classList.remove(headerStyles.scrolled);
    }
  }, []);

  return (
    <Fragment>
      <header className={`${headerStyles.header} ${!shouldShowHeader ? headerStyles.hidden : ''}`}>
        <div className={headerStyles.headerTop}>
          <Link className={headerStyles.logo} to="/">
            <img alt='Логотип компании RMBike.by' src={logo} />
          </Link>
          <div className={headerStyles.headerButtons}>
            <a className={headerStyles.phoneBtn} href='tel:+375291278356'>
              <img className={headerStyles.iconPhone} alt='Иконка номера телефона' src={phoneIcon} />
              +375 (29) 127-83-56
            </a>
            <a 
              className={headerStyles.locationBtn} 
              target='_blank' 
              rel='noopener noreferrer' 
              href='https://yandex.by/maps/-/CDhyvZ~w'
            >
              <img className={headerStyles.iconLocation} alt='Иконка местонахождения магазина' src={locationIcon} />
              г.Гомель, ул. Катунина д. 5
            </a>
          </div>
          <BurgerMenu />
        </div>
        <div className={`${headerStyles.headerBottom} ${isScrolled ? headerStyles.scrolled : ''}`}>
          <ul className={headerStyles.navMenu}>
            <li>
              <Link className={headerStyles.navbtn} to='/catalog/bycicle'>Велосипеды</Link>
            </li>
            <li>
              <Link className={headerStyles.navbtn} to='/catalog/parts'>Запчасти</Link>
            </li>
            <li>
              <Link className={headerStyles.navbtn} to='/catalog/protection'>Защита</Link>
            </li>
            <li>
              <Link className={headerStyles.navbtn} to='/catalog/accessories'>Аксессуары</Link>
            </li>
            <li>
              <Link className={headerStyles.navbtn} to='/catalog/sale'>Скидки</Link>
            </li>
          </ul>
          <div className={headerStyles.iconsBtn}>
            <Link className={headerStyles.navicons} to='/search'>
              <img alt='Иконка поиска товаров' src={searchIcon} title='Поиск товаров' />
            </Link>
            <Link className={headerStyles.navicons} to='/cart'>
              <img alt='Иконка корзины товара' src={cartIcon} title='Корзина товаров' />
            </Link>
            <Link className={headerStyles.navicons} to='/login'>
              <img alt='Иконка входа в аккаунт' src={loginIcon} title='Вход в аккаунт' />
            </Link>
          </div>
        </div>
      </header>
      <main>
        <BottomMenu />
      </main>
    </Fragment>
  );
}