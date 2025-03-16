import React from 'react'
import CatalogItem from './cataloItem.jsx'
import CatalogBtn from './catalogButton.jsx'

import bike from './img/bike.png'
import bottle from './img/bottle.png'
import frame from './img/frame.png'
import helmet from './img/helmet.png'

import styles from './css/catalogBar.module.css'

export default function CatalogBar() {
  return (
    <div className={styles.div_container}>
        <div className={styles.bar_items}>
            <CatalogItem 
            title="Велосипеды"
            img={bike}
            alt="Изображение велосипеда"
            link="/catalog/bicycle/"
            />
            <CatalogItem 
                title="Аксессуары"
                img={bottle}
                alt="Изображение бутылки"
                link="/catalog/accessoaries/"
            />
            <CatalogItem 
                title="Запчасти"
                img={frame}
                alt="Изображение велоспедной рамы"
                link="/catalog/parts/"
            />
            <CatalogItem 
                title="Защита"
                img={helmet}
                alt="Изображение шлема"
                link="/catalog/protection/"
            />
        </div>
            <div className={styles.div_button}>
                <CatalogBtn />
            </div>  
    </div>
  )
}
