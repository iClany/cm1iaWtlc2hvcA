import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccordionItem from './AccordionItem.jsx';
import styles from './Accordion.module.css';

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "О компании",
      items: [
        { path: '/worktime', label: 'Время работы' },
        { path: '/shopaddress', label: 'Адрес магазина' },
        { path: '/service', label: 'Услуги мастерской' },
        { path: '/publicoffer', label: 'Договор публичной оферты' },
        { path: '/privacy', label: 'Конфиденциальность' }
      ]
    },
    {
      title: "Для покупателей",
      items: [
        { path: '/shipping', label: 'Условия доставки' },
        { path: '/payments', label: 'Оплата и рассрочка' },
        { path: '/terms', label: 'Пользовательское соглашение' },
        { path: '/warranty', label: 'Обслуживание и гарантия' },
        { path: '/return', label: 'Возврат и обмен' }
      ]
    },
    {
      title: "Каталог",
      items: [
        { path: '/catalog/bicycle', label: 'Велосипеды' },
        { path: '/catalog/parts', label: 'Запчасти' },
        { path: '/catalog/protection', label: 'Защита' },
        { path: '/catalog/accessories', label: 'Аксессуары' }
      ]
    }
  ];

  return (
    <div className={styles.accordion}>
      {accordionData.map((section, index) => (
        <AccordionItem
          key={index}
          title={section.title}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        >
          <ul className={styles.accordionList}>
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex} className={styles.accordionItem}>
                <Link 
                  to={item.path} 
                  className={styles.accordionLink}
                  onClick={() => setOpenIndex(null)} // Закрываем аккордеон при клике
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;