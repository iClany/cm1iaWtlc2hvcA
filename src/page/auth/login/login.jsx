import {Helmet} from 'react-helmet';
import '../login/login.css';

const LoginPage = () => {
    return(
        <main>
            <Helmet><title>Войти | Веломагазин RMBike.by</title></Helmet>
            <div className='login'>
                <div className='containerForm'>
                    <lable for='loginInput' className='loginLable'>Логин или E-mail</lable>
                    <input id='loginInput' className='loginInput' type='login' placeholder='Введите логин или E-mail'></input>
                </div>
                <div className='containerForm'>
                    <lable for='passwordInput' className='loginLable'>Пароль</lable>
                    <input id='passwordInput' className='passwordInput' type='password' placeholder='Введите пароль'></input>
                </div>
                <div className='signInBtns' >
                    <a className='resetBtn' id href='/reset'>Забыли пароль?</a>
                    <a className='authBtn' href='/auth'>Войти</a>
                </div>
            </div>
            
        </main>
    )
}

export default LoginPage