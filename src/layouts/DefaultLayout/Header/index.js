import styles from'./Header.module.css';
import classNames from 'classnames/bind';
import Authen from './Authen';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

function Header({login, setLogin}) {
    // console.log(process.env);
    return (
        <div className={cx('wrapper', 'flex-center')}>
            <div className={cx('container')}>
                <div className={cx('logo')}>
                    <Link to={'/'} className={cx('link-none')}>BBS</Link>
                </div>
                <Authen login={login} setLogin={setLogin}/>
            </div>
        </div>
    );
}

export default Header;
