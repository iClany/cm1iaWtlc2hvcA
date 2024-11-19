import React from 'react'
import '../css/mobileHeader.css'

export default function MobileHeader() {
  return (
    
    <nav className='mobileBottomUI'>
        <a className='mobileBtn' href='/login'><img className='iconLogin' src='/img/icon/mobile-icons/login.svg' alt='Иконка входа в аккаунт'><span>Аккаунт</span></img></a>
        <a className='mobileBtn' href='/cart'><img className='iconCart' src='/img/icon/mobile-icons/cart.svg' alt='Иконка корзины'><span>Корзина</span></img></a>
        <a className='mobileBtn' href='/search'><img className='iconSearch' src='/img/icon/mobile-icons/search.svg' alt='Иконка поиска'><span>Поиск</span></img></a>
        <a className='mobileBtn' href='/catalog'><img className='iconСatalog' src='/img/icon/mobile-icons/catalog.svg' alt='Иконка каталога'><span>Каталог</span></img></a>
    </nav>
  )
}
