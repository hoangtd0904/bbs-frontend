import { Link, useNavigate } from 'react-router-dom';
import userImage from '../../../assets/images/user.png';
import styles from './Header.module.css';
import classNames from 'classnames/bind';
import axios from 'axios';

const cx = classNames.bind(styles);

function Authen({login, setLogin}) {
    console.log(`login status: ${login}`);
    const navigate = useNavigate();

    function handleLogout(e) {
        if (window.confirm('Are you sure you want to log out?')) {
            axios
                .get('http://localhost:9000/logout', { withCredentials: true })
                .then((response) => {
                    sessionStorage.removeItem('name');
                    alert(response.data.message);
                    setLogin(false)
                    navigate('/')
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <div className={cx('authen')}>
            {login ? (
                <>
                    {/* <Navbar /> */}
                    <div className={cx('authen-user')}>
                        <img src={userImage} className={cx('position-center', 'pointer', 'user-btn', 'common-border')} alt="USER" />
                        <div className={cx('info')}>
                            <p className="p8">{sessionStorage.getItem('name')}</p>
                            <div className={cx('authen-actions')}>
                                <Link to={'/posts/add'} className='link-none p8'>Create</Link>
                            </div>
                            <hr />
                            <button className={cx('pointer', 'logout-btn', 'link-none', 'p8')} onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <span className={cx('fl1')}></span>
                    <div className={cx('authen-none', 'flex-center')}>
                        <Link className={cx('link-none', 'signup-btn')} to={'/register'}>
                            SIGN UP
                        </Link>
                        <Link className={cx('link-none', 'login-btn')} to={'/login'}>
                            LOGIN
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default Authen;
