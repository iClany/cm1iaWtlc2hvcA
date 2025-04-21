import React from 'react';
import PropTypes from 'prop-types';
import accordionOpen from '../../../../assets/images/icons/accordion-closed.svg';
import accordionClose from '../../../../assets/images/icons/accordion-opened.svg';
import styles from './AccordionItem.module.css';

const AccordionItem = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className={styles.accordionItem}>
      <button 
        className={styles.accordionHeader} 
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {title}
        <span className={styles.accordionIcon}>
          <img src={isOpen ? accordionClose : accordionOpen} alt='Иконка открытия и закрытия'></img>
        </span>
      </button>
      {isOpen && (
        <div className={styles.accordionContent}>
          {children} {/* Используем children вместо content */}
        </div>
      )}
    </div>
  );
};

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node // Дочерние элементы теперь здесь
};

export default AccordionItem; 