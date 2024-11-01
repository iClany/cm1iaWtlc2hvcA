import React from 'react'

export default function Footer() {
  return (
    <footer>
      <div className='topFooter'>
        <div className='ulFooter'>
          <ul className='firstColumn'>
            <label className='columnLable'>Компания</label>
            <li className='columnBtn'>
              <a href='/worktime'>Время работы</a>
            </li>
            <li className='columnBtn'>
              <a href='/shopaddress'>Адрес магазина</a>
            </li>
            <li className='columnBtn'>
              <a href='/service'>Услуги мастерской</a>
            </li>
            <li className='columnBtn'>
              <a href='/publicoffer'>Договор публичной оферты</a>
            </li>
            <li className='columnBtn'>
              <a href='/privacy'>Конфиденциальность</a>
            </li>
          </ul>
          <ul className='twoColumn'>
            <label className='columnLable'>Для покупателей</label>
            <li className='columnBtn'>
              <a href='/shipping'>Доставка</a>
            </li>
            <li className='columnBtn'>
              <a href='/payments'>Оплата и рассрочка</a>
            </li>
            <li className='columnBtn'>
              <a href='/useragreement'>Пользовательское соглашение</a>
            </li>
            <li className='columnBtn'>
              <a href='/warranty'>Обслуживание и гарантия</a>
            </li>
            <li className='columnBtn'>
              <a href='/return'>Возврат и обмен</a>
            </li>
          </ul>
          <ul className='thridColumn'>
            <label className='columnLable'>Каталог</label>
            <li className='columnBtn'>
              <a href='/catalog/bycicle'>Велосипеды</a>
            </li>
            <li className='columnBtn'>
              <a href='/catalog/parts'>Запчасти</a>
            </li>
            <li className='columnBtn'>
              <a href='/catalog/protection'>Защита</a>
            </li>
            <li className='columnBtn'>
              <a href='/catalog/accessories'>Аксессуары</a>
            </li>
          </ul>
        </div>
        <div className='bottomFooter'>
          <span className='textFooter'>
            &copy; 2024 RMBike.by - Веломагазин. Все права защищены. <br/><br/>
          </span>
          <span className='textFooter'>
          Индивидуальный предприниматель Малахов Роман Вячеславович, УНП 491644446<br/>
          Регистрация - Республика Беларусь от 19 февраля 2024 г. Администрация Центрального района г.Гомеля
          </span>
          {/* <img className='paymentsInfo'></img> */}
        </div>
      </div>
    </footer>
  )
}
