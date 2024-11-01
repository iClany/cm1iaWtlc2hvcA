import React from 'react'

export default function Header() {
  return (
    <header>
        <div className='headerTop'>
            <div>
                {/* <img className='logo'></img> */}
            </div>
                <a className='phoneBtn' href='tel:+375291278356'>
                    {/* <img className='iconPhone'></img> */}
                    <span>+375 &#40;29&#41; 127-83-56</span>
                </a>
                <a className='locationBtn' href='https://yandex.by/maps/-/CDhyvZ~w'>
                    {/* <img className='iconLocation'></img> */}
                    <span>г.Гомель, ул. Катунина д. 5</span>
                </a>
        </div>
        <nav className='headerBottom'>
            <ul className='navMenu'>
                <a href='/catalog/bycicle'>
                    <li>Велосипеды</li>
                </a>
                <a href='/catalog/parts'>
                    <li>Запчасти</li>
                </a>
                <a href='/catalog/protection'>
                    <li>Защита</li>
                </a>
                <a href='/catalog/accsessories'>
                    <li>Аксессуары</li>
                </a>
                <a href='#'>
                    <li>Скидки</li>
                </a>
            </ul>
            <div className='iconsBtn'>
                <a href='/search'>
                    {/* <img className='iconSearch'>
                        <span className='headerText'></span>
                    </img> */}
                </a>
                <a href='/cart'>
                    {/* <img className='iconCart'>
                        <span className='headerText'></span>
                    </img> */}
                </a>
                <a href='/login'>
                    {/* <img className='iconLogin'>
                        <span className='headerText'></span>
                    </img> */}
                </a>
            </div>
        </nav>
    </header>
  )
}
