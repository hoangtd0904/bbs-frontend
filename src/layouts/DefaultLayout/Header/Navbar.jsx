import classNames from 'classnames/bind';
import { Link } from "react-router-dom";
import styles from './Header.module.css'

const cx = classNames.bind(styles)

function Navbar() {
    return (
        <nav className={cx('flex-center', 'fl1')}>
            <Link className="link-none" to={'/'}>HOME</Link>
            <Link className="link-none" to={'/posts/add'}>CREATE</Link>
        </nav>
    );
}

export default Navbar;
