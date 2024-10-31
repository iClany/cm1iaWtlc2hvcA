import React from 'react'

export default function Header() {
  return (
    <header>
        <div className='headerTop'>
            <div>
                <img className='logo'></img>
            </div>
                <a className='phoneBtn' href='tel:+375291278356'>
                    <img className='iconPhone'></img>
                    <span>+375 &#40;29&#41; 127-83-56</span>
                </a>
                <a className='locationBtn' href='https://yandex.by/maps/-/CDhyvZ~w'>
                    <img className='iconLocation'></img>
                    <span>г.Гомель, ул. Катунина д. 5</span>
                </a>
        </div>
        <nav className='headerBottom'>
            <ul className='navMenu'>
                <a href='#'>
                    <li>Велосипеды</li>
                </a>
                <a href='#'>
                    <li>Запчасти</li>
                </a>
                <a href='#'>
                    <li>Защита</li>
                </a>
                <a href='#'>
                    <li>Аксессуары</li>
                </a>
                <a href='#'>
                    <li>Скидки</li>
                </a>
            </ul>
            <div className='iconsBtn'>
                <a href='https://rmbike.by/search/'>
                    <img className='iconSearch'>
                        <span className='headerText'></span>
                    </img>
                </a>
                <a href='https://rmbike.by/cart/'>
                    <img className='iconCart'>
                        <span className='headerText'></span>
                    </img>
                </a>
                <a href='https://rmbike.by/signin'>
                    <img className='iconLogin'>
                        <span className='headerText'></span>
                    </img>
                </a>
            </div>
        </nav>
    </header>
  )
}
