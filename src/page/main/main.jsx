import Slider from '../../components/Swiper';
import CatalogBar from '../../components/catalogBar/catalogBar.jsx'
import {Helmet} from 'react-helmet';

const HomePage = () => {
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

export default HomePage;