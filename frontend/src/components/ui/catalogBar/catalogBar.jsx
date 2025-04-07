import React from 'react';
import CatalogItem from './catalogItem'; // Исправлена опечатка в имени файла
import CatalogBtn from './catalogButton';
import styles from './catalogBar.module.css';

import { bicycleCatalog, partsCatalog, protectionCatalog, accessoriesCatalog} from '../../assets/icons'


export default function CatalogBar() {
  const catalogItems = [
    {
      title: "Велосипеды",
      img: bicycleCatalog,
      alt: "Изображение велосипеда",
      link: "/catalog/bicycle"
    },
    {
      title: "Запчасти",
      img: partsCatalog,
      alt: "Изображение велосипедной рамы",
      link: "/catalog/parts"
    },
    {
      title: "Защита",
      img: protectionCatalog,
      alt: "Изображение шлема",
      link: "/catalog/protection"
    },
    {
      title: "Аксессуары",
      img: accessoriesCatalog,
      alt: "Изображение бутылки",
      link: "/catalog/accessories"
    }
  ];

  return (
    <section className={styles.container} aria-label="Каталог товаров">
      <div className={styles.itemsWrapper}>
        {catalogItems.map((item, index) => (
          <CatalogItem
            key={index}
            title={item.title}
            img={item.img}
            alt={item.alt}
            link={item.link}
          />
        ))}
      </div>
      <div className={styles.buttonWrapper}>
        <CatalogBtn />
      </div>
    </section>
  );
}