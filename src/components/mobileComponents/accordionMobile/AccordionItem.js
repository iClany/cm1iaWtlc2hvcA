import React from 'react';
import PropTypes from 'prop-types';

// Компонент для одного элемента аккордеона
const AccordionItem = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={onToggle}>
        <h3>{title}</h3>
      </div>
      {isOpen && (
        <div className="accordion-body">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

// PropTypes для AccordionItem
AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default AccordionItem;
