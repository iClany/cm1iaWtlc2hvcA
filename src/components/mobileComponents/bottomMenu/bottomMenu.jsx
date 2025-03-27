
import './bottomMenu.css'
const BottomMenu = () =>{
    return(        
        <nav className='mobileBottomNav'>
            <ul className='mobile__list'>
                <li><a className='nav__link' href='/login'><img className='mobileNavIcons' src='/img/icon/mobile-icons/login.svg' alt='Иконка входа в аккаунт'/>Аккаунт</a></li>
                <li><a className='nav__link' href='/cart'><img className='mobileNavIcons'  src='/img/icon/mobile-icons/cart.svg' alt='Иконка корзины'/>Корзина</a></li>
                <li><a className='nav__link' href='/search'><img className='mobileNavIcons' src='/img/icon/mobile-icons/search.svg' alt='Иконка поиска'/>Поиск</a></li>
                <li><a className='nav__link' href='/catalog'><img className='mobileNavIcons' src='/img/icon/mobile-icons/catalog.svg' alt='Иконка каталога'/>Каталог</a></li>
            </ul>
        </nav>
    )
}
export {BottomMenu}