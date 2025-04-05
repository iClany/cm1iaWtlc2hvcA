import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { auth, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">RMBike</Link>
      </div>
      <div className="navbar-links">
        {auth ? (
          <>
            <Link to="/profile">Профиль</Link>
            <button onClick={logout}>Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login">Вход</Link>
            <Link to="/signup">Регистрация</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;