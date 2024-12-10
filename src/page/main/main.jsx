import Slider from '../../components/Swiper';
import {Helmet} from 'react-helmet';

const Homepage = () => {
    return(
        <main>
            <Helmet>
                <title>Главная | Веломагазин RMBike.by</title>
            </Helmet>
                <Slider />
        </main>
    )
}

export {Homepage}