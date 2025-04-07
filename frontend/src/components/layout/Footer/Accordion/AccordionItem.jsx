import React from 'react';
import PropTypes from 'prop-types';
import { accordionOpen, accordionClose } from '../../../ui/icons/icons';
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
          {isOpen ? accordionClose : accordionOpen}
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