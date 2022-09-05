import classNames from 'classnames/bind';
import styles from './TimeAuthor.module.css'

const cx = classNames.bind(styles)
//destructuring
function TimeAuthor({author,timeCreated, timeUpdated}) {
    return (
        <span className={cx('time-author')}>
            <span className={cx('author')}>
                Posted by <span className={cx('name')}>{author}</span>
            </span>
            <span className={cx('time')}> at {timeCreated}{(timeUpdated !== timeCreated) ? `, last modified: ${timeUpdated}` : ''}</span>
        </span>
    );
}

export default TimeAuthor;
