import classNames from 'classnames/bind';
import styles from './Post.module.css';
import images from '../../assets/images';
import TimeAuthor from '../TimeAuthor';

const cx = classNames.bind(styles);

function Post({ post, css }) {
    return (
        <div className={cx(css === 'Classic' ? 'wrapper-classic' : 'wrapper-card', 'common-border', 'mb-12')}>
            <div className={cx(css === 'Classic' ? 'image-classic' : 'image-card', 'flex-center')}>
                <img
                    src={
                        post.thumbnail
                            ? `http://localhost:9000/assets/images/${post.thumbnail}`
                            : images.image_placeholder
                    }
                    alt="Post"
                />
            </div>
            <div className={cx(css === 'Classic' ? 'text-classic' : 'text-card')}>
                <p className={cx(css === 'Classic' ? 'title-classic' : 'title-card')}>{post.title}</p>
                <div className={cx('fl1')}>
                    <p className={cx(css === 'Classic' ? 'content-classic' : 'content-card')}>{post.content}</p>
                </div>
                <div className={cx(css === 'Classic' ? 'time-classic' : 'time-card')}>
                    <TimeAuthor author={post.author_name} timeCreated={post.created_at} timeUpdated={post.updated_at} />
                </div>
            </div>
        </div>
    );
}

export default Post;
