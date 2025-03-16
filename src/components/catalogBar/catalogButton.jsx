import React from 'react'
import style from './css/catalogButton.module.css'
import { Link } from 'react-router-dom';


export default function catalogBtn() {
  return (
    <div className={style.button}>
      <Link className={style.a} to='/catalog/'>Перейти в каталог</Link>
    </div>
  )
}
