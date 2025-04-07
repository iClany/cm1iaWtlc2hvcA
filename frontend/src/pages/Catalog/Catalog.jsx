import React from "react";
import ProductList from "../../components/products/ProductList/ProductList.jsx";

const CatalogPage = () => {
    return(
        <main>
            <ProductList/>
            {/* <div>
                <div className="">
                    <a className="CategoryButtons" href="/">
                        <img className='CategoryImage' src='' alt='Изображение велосипеда'></img>
                        <span className='CategoryName'>Велосипеды</span>
                    </a>
                    <div className='CategoryButtons'>
                        <img className='CategoryImage' alt='Изображение запчасти велосипеда'></img>
                        <span className='CategoryName'>Запчасти</span>
                    </div>
                    <div className='CategoryButtons'>
                        <img className='CategoryImage' src='' alt='Изображение велозащиты'></img>
                        <span className='CategoryName'>Защита</span>
                    </div>
                    <div className='CategoryButtons'>
                        <img className='CategoryImage' src='' alt='Изображение бутылки для рамы'></img>
                        <span className='CategoryName'>Аксессуары</span>
                    </div>
                </div>
            </div> */}
        </main>
    )
}

export default CatalogPage;