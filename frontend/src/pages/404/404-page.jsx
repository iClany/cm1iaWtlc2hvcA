import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import './404-page.module.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

export function Error404Page() {
  const navigate = useNavigate();

  return (
    <main className="error-page">
      <Helmet>
        <title>Страница не найдена | Веломагазин – RMBike.by</title>
        <meta name="description" content="Страница не найдена. Вернитесь на главную страницу веломагазина RMBike.by" />
      </Helmet>
      
      <div className="error-container">
        <div className="error-code">
          <span className="error-digit">4</span>
          <span className="error-digit accent">0</span>
          <span className="error-digit">4</span>
        </div>
        
        <h1 className="error-title">Страница не найдена</h1>
        <p className="error-message">Мы не смогли найти то, что вы искали.</p>
        
        <button 
          className="error-button" 
          onClick={() => navigate('/')}
          aria-label="Вернуться на главную страницу"
        >
          Вернуться на главную
        </button>
      </div>
    </main>
  );
}

export default Error404Page;