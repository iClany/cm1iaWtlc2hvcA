import React from 'react';
import PropTypes from 'prop-types';




const CatalogItem = ({ title, isOpen, onToggle }) => {
  return (
    <div className="catalog-item">
        <span className="catalog-title">{title}</span>
        <span className="catalog-img">
          <img src={.object} />
        </span>
    </div>
  );
};

CatalogItem.propTypes = {
    title: PropTypes.string.isRequired,
};
CatalogItem.propName = {img: PropName.object.isRequired,}

export default CatalogItem;
