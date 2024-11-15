import React from 'react'
import '../css/header.css'

export default function Header() {
  return (
    <header>
        <div className='headerTop'>
            <a href='https://rmbike.by/'>
                <img className='logo' alt='Логотип компании RMBike.by' src='/img/logo/logo-header.svg'></img>
            </a>
                <div className='headerButtons'>
                    <a className='phoneBtn' href='tel:+375291278356'>
                        <img className='iconPhone' alt='Иконка номера телефона' src='/img/icon/phone.svg'></img>
                        +375 &#40;29&#41; 127-83-56
                    </a>
                    <a className='locationBtn' target='_blank' rel='noopener noreferrer' href='https://yandex.by/maps/-/CDhyvZ~w'>
                        <img className='iconLocation' alt='Иконка местонахождения магазина' src='/img/icon/location.svg'></img>
                        г.Гомель, ул. Катунина д. 5
                    </a>
                </div>
        </div>
        <div className='nav'>
            <nav className='headerBottom'>
                <ul className='navMenu'>
                    <a className='navbtn' href='/catalog/bycicle'>
                        <li>Велосипеды</li>
                    </a>
                    <a className='navbtn' href='/catalog/parts'>
                        <li>Запчасти</li>
                    </a>
                    <a className='navbtn' href='/catalog/protection'>
                        <li>Защита</li>
                    </a>
                    <a className='navbtn' href='/catalog/accsessories'>
                        <li>Аксессуары</li>
                    </a>
                    <a className='navbtn' href='/catalog/sale'>
                        <li>Скидки</li>
                    </a>
                </ul>
                <div className='iconsBtn'>
                    <a className='navicons' href='/search'>
                        <img alt='Иконка поиска товаров' src='/img/icon/search.svg' title='Поиск товаров'></img>
                    </a>
                    <a className='navicons' href='/cart'>
                        <img alt='Иконка корзины товара' src='/img/icon/cart.svg' title='Корзина товаров'></img>
                    </a>
                    <a className='navicons' href='/login'>
                        <img alt='Иконка входа в аккаунт' src='/img/icon/user.svg' title='Вход в аккаунт'></img>
                    </a>
                </div>
            </nav>
        </div>
    </header>
  )
}
