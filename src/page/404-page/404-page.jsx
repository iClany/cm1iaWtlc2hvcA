import { Helmet } from 'react-helmet';
import './404-page.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

export default function Error404Page() {
  return (
    <main>
        <Helmet>
            <title>Страница не найдена | Веломагазин – RMBike.by</title>
        </Helmet>
        <div className='cont' style={{marginTop:"20%"}}>
            {/* <img className='icon' src='/img/icon/error-sing.svg' alt='Иконка с надписью ошибка'/> */}
            <div className='d-inline-flex align-items-center error__charge'>
                <h2 className='error__black'>4</h2>
                <h2 className='error__color'>0</h2>
                <h2 className='error__black'>4</h2>
            </div>
            <h2 className='text-center h2'>Страница не найдена.</h2>
            <p className="text-center error-p-text">Мы не смогли найти то, что вы искали.</p>
            <a className="btn-redirect" href='/'>Вернуться на главную</a>
        </div>
    </main>
  )
}
export {Error404Page}