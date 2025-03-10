import React from 'react'
import CatalogItem from './cataloItem.jsx'
import CatalogBtn from './catalogBtn.jsx'

import bike from './img/bike.png'
import bottle from './img/bottle.png'
import frame from './img/frame.png'
import helmet from './img/helmet.png'

export default function CatalogBar() {
  return (
    <div className=''>
        <CatalogItem 
            title="Defr"
            img={bike}
        />
        <CatalogItem 
            title=""
            img={bottle}
        />
        <CatalogItem 
            title=""
            img={frame}
        />
        <CatalogItem 
            title=""
            img={helmet}
        />
        <CatalogBtn />
    </div>
  )
}
