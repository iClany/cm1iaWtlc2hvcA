import {Helmet} from 'react-helmet';
// import styles from './reset.module.css';

const ResetPasswordPage = () => {
    return(
        <main>
            <Helmet><title>Сбросить пароль | Веломагазин RMBike.by</title></Helmet>
            <div className='container'>
                <form className='resetPass'>
                    <input className='loginInput' type='mail' placeholder='Введите логин или номер телефона'></input>
                        <button className='authBtn' href='/sjd'>Сбросить пароль</button>
                </form>
            </div>
            
        </main>
    )
}

export default ResetPasswordPage;