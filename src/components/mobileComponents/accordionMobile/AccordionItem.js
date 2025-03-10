import React from 'react';
import PropTypes from 'prop-types';

import openedIcon from './icons/accordion-opened.svg';
import closedIcon from './icons/accordion-closed.svg';

const AccordionItem = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={onToggle}>
        <span className="accordion-title">{title}</span>
        <span className="accordion-icon">
          <img
            src={isOpen ? openedIcon : closedIcon}
            alt={isOpen ? 'open' : 'close'}
            className="accordion-icon-img"
          />
        </span>
      </div>
      {isOpen && (
        <div className="accordion-content">
          {content}
        </div>
      )}
    </div>
  );
};

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default AccordionItem;
