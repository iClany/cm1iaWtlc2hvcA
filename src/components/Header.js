import React from 'react'
import '../index.css'

export default function Header() {
  return (
    <header>
        <div className='headerTop'>
            <a className='logo' href='/'><img alt='Логотип компании RMBike.by' src='/img/logo/logo-header.svg'></img></a>
                <div className='headerButtons'>
                    <a className='phoneBtn' href='tel:+375291278356'><img className='iconPhone' alt='Иконка номера телефона' src='/img/icon/phone.svg'></img>+375 &#40;29&#41; 127-83-56</a>
                    <a className='locationBtn' target='_blank' rel='noopener noreferrer' href='https://yandex.by/maps/-/CDhyvZ~w'><img className='iconLocation' alt='Иконка местонахождения магазина' src='/img/icon/location.svg'></img>г.Гомель, ул. Катунина д. 5</a>
                </div>
                {/* Mobile hamburger menu */}
                    {/* <div className="hamburger-menu">
                    <input id="menu__toggle" type="checkbox" />
                    <label className="menu__btn" htmlFor="menu__toggle">
                    <span></span>
                    </label>
                    <ul className="menu__box">
                        <li><a className="menu__item" href="/home">Главная</a></li>
                        <li><a className="menu__item" href="/catalog/bycicle">Велосипеды</a></li>
                        <li><a className="menu__item" href="/catalog/parts">запчасти</a></li>
                        <li><a className="menu__item" href="/catalog/protection">защита</a></li>
                        <li><a className="menu__item" href="/catalog/accsessories">аксессуары</a></li>
                        <li><a className="menu__item" href="/catalog/sale">скидки</a></li>
                        <li><a className="menu__item" href="/1">позвонить нам</a></li>
                    </ul>
                </div> */}
        </div>
                
        <nav className='headerBottom'>
                <ul className='navMenu'>
                    <a className='navbtn' href='/catalog/bycicle'><li>Велосипеды</li></a>
                    <a className='navbtn' href='/catalog/parts'><li>Запчасти</li></a>
                    <a className='navbtn' href='/catalog/protection'><li>Защита</li></a>
                    <a className='navbtn' href='/catalog/accsessories'><li>Аксессуары</li></a>
                    <a className='navbtn' href='/catalog/sale'><li>Скидки</li></a>
                </ul>
                <div className='iconsBtn'>
                    <a className='navicons' href='/search'><img alt='Иконка поиска товаров' src='/img/icon/search.svg' title='Поиск товаров'></img></a>
                    <a className='navicons' href='/cart'><img alt='Иконка корзины товара' src='/img/icon/cart.svg' title='Корзина товаров'></img></a>
                    <a className='navicons' href='/login'><img alt='Иконка входа в аккаунт' src='/img/icon/user.svg' title='Вход в аккаунт'></img></a>
                </div>
        </nav>

        {/* Mobile bottom navigation */}
            <nav className='mobileBottomNav'>
                <ul className='mobile__list'>
                    <li><a className='nav__link' href='/login'><img src='/img/icon/mobile-icons/login.svg' alt='Иконка входа в аккаунт'/>Аккаунт</a></li>
                    <li><a className='nav__link' href='/cart'><img src='/img/icon/mobile-icons/cart.svg' alt='Иконка корзины'/>Корзина</a></li>
                    <li><a className='nav__link' href='/search'><img src='/img/icon/mobile-icons/search.svg' alt='Иконка поиска'/>Поиск</a></li>
                    <li><a className='nav__link' href='/catalog'><img src='/img/icon/mobile-icons/catalog.svg' alt='Иконка каталога'/>Каталог</a></li>
                </ul>
            </nav>
    </header>
  )
}