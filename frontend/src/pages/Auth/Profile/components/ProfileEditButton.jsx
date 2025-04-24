import React from 'react';
import styles from './ProfileEditButton.module.css';
import { Link } from 'react-router-dom';

const ProfileEditButton = ({ title, img, link, alt}) => {
  return (
    <Link to={link} className={styles.div}>
        <img className={styles.img} src={img} alt={alt}></img>
        <span className={styles.span}>{title}</span>
    </Link>
  );
};

export default ProfileEditButton;
