import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../../../index.css';
import BurgerMenu from './burgerMenu/burgerMenu.jsx';
import BottomMenu from './bottomMenu/bottomMenu.jsx';
import header from './Header.module.css';

import logo from '../../../assets/images/logo/logo-header.svg';
import { phoneIcon, locationIcon, searchIcon, cartIcon, loginIcon } from '../../assets/icons';

export default function Header() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldShowHeader, setShouldShowHeader] = useState(true);

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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <Fragment>
      <header className={`${header.header} ${!shouldShowHeader ? header.hidden : ''}`}>
        <div className={header.headerTop}>
          <Link className={header.logo} to="/">
            <img alt='Логотип компании RMBike.by' src={logo} />
          </Link>
          <div className={header.headerButtons}>
            <a className={header.phoneBtn} href='tel:+375291278356'>
              <img className={header.iconPhone} alt='Иконка номера телефона' src={phoneIcon} />
              +375 (29) 127-83-56
            </a>
            <a 
              className={header.locationBtn} 
              target='_blank' 
              rel='noopener noreferrer' 
              href='https://yandex.by/maps/-/CDhyvZ~w'
            >
              <img className={header.iconLocation} alt='Иконка местонахождения магазина' src={locationIcon} />
              г.Гомель, ул. Катунина д. 5
            </a>
          </div>
          <BurgerMenu />
        </div>
        <nav className={header.headerBottom}>
          <ul className={header.navMenu}>
            <li>
              <Link className={header.navbtn} to='/catalog/bycicle'>Велосипеды</Link>
            </li>
            <li>
              <Link className={header.navbtn} to='/catalog/parts'>Запчасти</Link>
            </li>
            <li>
              <Link className={header.navbtn} to='/catalog/protection'>Защита</Link>
            </li>
            <li>
              <Link className={header.navbtn} to='/catalog/accessories'>Аксессуары</Link>
            </li>
            <li>
              <Link className={header.navbtn} to='/catalog/sale'>Скидки</Link>
            </li>
          </ul>
          <div className={header.iconsBtn}>
            <Link className={header.navicons} to='/search'>
              <img alt='Иконка поиска товаров' src={searchIcon} title='Поиск товаров' />
            </Link>
            <Link className={header.navicons} to='/cart'>
              <img alt='Иконка корзины товара' src={cartIcon} title='Корзина товаров' />
            </Link>
            <Link className={header.navicons} to='/login'>
              <img alt='Иконка входа в аккаунт' src={loginIcon} title='Вход в аккаунт' />
            </Link>
          </div>
        </nav>
      </header>
      <main>
        <BottomMenu />
      </main>
    </Fragment>
  );
}