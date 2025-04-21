import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from './Accordion/Accordion.jsx';
import styles from './Footer.module.css';

import paynmentImage from '../../../assets/images/paynaments-info.svg';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { path: '/worktime', text: 'Время работы' },
      { path: '/shopaddress', text: 'Адрес магазина' },
      { path: '/service', text: 'Услуги мастерской' },
      { path: '/publicoffer', text: 'Договор публичной оферты' },
      { path: '/privacy', text: 'Конфиденциальность' }
    ],
    customers: [
      { path: '/shipping', text: 'Условия доставки' },
      { path: '/payments', text: 'Оплата и рассрочка' },
      { path: '/terms', text: 'Пользовательское соглашение' },
      { path: '/warranty', text: 'Обслуживание и гарантия' },
      { path: '/return', text: 'Возврат и обмен' }
    ],
    catalog: [
      { path: '/catalog/bicycle', text: 'Велосипеды' },
      { path: '/catalog/parts', text: 'Запчасти' },
      { path: '/catalog/protection', text: 'Защита' },
      { path: '/catalog/accessories', text: 'Аксессуары' }
    ]
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mobileAccordion}>
          <Accordion links={footerLinks} />
        </div>
        
        <div className={styles.footerColumns}>
          <div className={styles.footerColumn}>
            <p className={styles.columnLabel}>Компания</p>
            <ul>
              {footerLinks.company.map((link, index) => (
                <li key={index} className={styles.columnItem}>
                  <Link to={link.path} className={styles.columnLink}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.footerColumn}>
            <p className={styles.columnLabel}>Для покупателей</p>
            <ul>
              {footerLinks.customers.map((link, index) => (
                <li key={index} className={styles.columnItem}>
                  <Link to={link.path} className={styles.columnLink}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.footerColumn}>
            <p className={styles.columnLabel}>Каталог</p>
            <ul>
              {footerLinks.catalog.map((link, index) => (
                <li key={index} className={styles.columnItem}>
                  <Link to={link.path} className={styles.columnLink}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className={styles.bottomFooter}>
        <div className={styles.footerText}>
          <p>
            {currentYear} &copy; RMBike.by - Веломагазин. Все права защищены.
          </p>
          <p>
            ИП Малахов Роман Вячеславович, УНП 491644446<br/>
            Регистрация - Республика Беларусь от 19 февраля 2024 года.
            Администрация Центрального района г.Гомеля
          </p>
        </div>
        <img 
          className={styles.paymentsImage} 
          alt='Платежная информация' 
          src={paynmentImage}
        />
      </div>
    </footer>
  );
}