import { Link } from 'react-router-dom';
import styles from './bottomMenu.module.css';

import { loginIcon, cartIcon, searchIcon, catalogIcon } from '../../../assets/icons';


const BottomMenu = () => {
  const menuItems = [
    { 
      path: '/login', 
      icon: loginIcon, 
      label: 'Аккаунт', 
      alt: 'Иконка входа в аккаунт' 
    },
    { 
      path: '/cart', 
      icon: cartIcon, 
      label: 'Корзина', 
      alt: 'Иконка корзины' 
    },
    { 
      path: '/search', 
      icon: searchIcon, 
      label: 'Поиск', 
      alt: 'Иконка поиска' 
    },
    { 
      path: '/catalog', 
      icon: catalogIcon, 
      label: 'Каталог', 
      alt: 'Иконка каталога' 
    }
  ];

  return (        
    <div className={styles.mobileOnlyContainer}>
      <nav className={styles.bottomNavigation} aria-label="Мобильное меню">
        <ul className={styles.navigationList}>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className={styles.navigationItem}>
                <img 
                  className={styles.navigationIcon} 
                  src={item.icon} 
                  alt={item.alt}
                  width="24"
                  height="24"
                  loading="lazy"
                />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default BottomMenu;