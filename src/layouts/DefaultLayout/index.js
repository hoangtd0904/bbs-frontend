import Header from './Header';
import styles from './DefaultLayout.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function DefaultLayout({ children, login, setLogin, loading }) {
    console.log(`loading : ${loading}`);
    return (
        <div className={cx('wrapper')}>
            <Header login={login} setLogin={setLogin}/>
            <div className={cx('container', 'flex-center')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <footer className={cx('text-center p8')}>©2022 Tran Duc Hoang</footer>
        </div>
    );
}

export default DefaultLayout;
