import Slider from '../../components/Swiper';
import CatalogBar from '../../components/catalogBar/catalogBar.jsx'
import {Helmet} from 'react-helmet';

import '../main/main.css'

const Homepage = () => {
    return(
        <main>
            <Helmet>
                <title>Главная | Веломагазин RMBike.by</title>
            </Helmet>
                <Slider />
            <CatalogBar />
                
        </main>
    )
}

export {Homepage}