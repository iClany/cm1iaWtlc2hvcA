import React, { useState } from 'react';
import AccordionItem from './AccordionItem.jsx';
import './Accordion.css';

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const content1 = (
    <div>
      <ul>
        <li className='accordeonBtn'><a href='/worktime'>Время работы</a></li>
        <li className='accordeonBtn'><a href='/shopaddress'>Адрес магазина</a></li>
        <li className='accordeonBtn'><a href='/service'>Услуги мастерской</a></li>
        <li className='accordeonBtn'><a href='/publicoffer'>Договор публичной оферты</a></li>
        <li className='accordeonBtn'><a href='/privacy'>Конфиденциальность</a></li>
      </ul>
    </div>
  );

  const content2 = (
    <div>
      <ul>
        <li className='accordeonBtn'><a href='/shipping'>Условия доставки</a></li>
        <li className='accordeonBtn'><a href='/payments'>Оплата и рассрочка</a></li>
        <li className='accordeonBtn'><a href='/terms'>Пользовательское соглашение</a></li>
        <li className='accordeonBtn'><a href='/warranty'>Обслуживание и гарантия</a></li>
        <li className='accordeonBtn'><a href='/return'>Возврат и обмен</a></li>      </ul>
    </div>
  );

  const content3 = (
    <div>
      <ul>
        <li className='columnBtn'><a href='/catalog/bycicle'>Велосипеды</a></li>
        <li className='columnBtn'><a href='/catalog/parts'>Запчасти</a></li>
        <li className='columnBtn'><a href='/catalog/protection'>Защита</a></li>
        <li className='columnBtn'><a href='/catalog/accessories'>Аксессуары</a></li>
      </ul>
    </div>
  );

  return (
    <div className="accordion">
      <AccordionItem
        title="О компании"
        content={content1}
        isOpen={openIndex === 0}
        onToggle={() => handleToggle(0)}
      />
      <AccordionItem
        title="Для покупателей"
        content={content2}
        isOpen={openIndex === 1}
        onToggle={() => handleToggle(1)}
      />
      <AccordionItem
        title="Каталог"
        content={content3}
        isOpen={openIndex === 2}
        onToggle={() => handleToggle(2)}
      />
    </div>
  );
};
export default Accordion;
