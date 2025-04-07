import React from 'react';
import styles from './loadingSpinner.module.css';

const LoadingSpinner = ({ size = 40, color = '#FFD101', className = '' }) => {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderColor: `${color} transparent ${color} ${color}`,
  };

  return (
    <div className={`${styles.spinnerContainer} ${className}`}>
      <div className={styles.spinner} style={spinnerStyle} aria-label="Загрузка">
        <span className="sr-only">Загрузка...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;