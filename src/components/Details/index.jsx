import classNames from 'classnames/bind';
import styles from './Details.module.css';
import TimeAuthor from '../TimeAuthor';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';

import * as postServices from '../../services/postServices';
import { CSVDownload } from 'react-csv';

const cx = classNames.bind(styles);

function Details({ id }) {
    const [post, setPost] = useState({});
    const [data, setData] = useState([]);
    const [csv, setCsv] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    function handleDelete() {
        if (window.confirm('Delete this post ?') === true) {
            // axios.delete(`http://localhost:9000/posts/delete?id=${id}`).then((response) => {
            //     alert(response.data);
            //     navigate('/');
            // });
        }
    }

    function handleEdit() {}

    const handleDownload = async () => {
        const result = await postServices.download(id);
        console.log(result);
        setData([result.content]);
        setCsv(true);
    };

    useEffect(() => {
        const getPost = async () => {
            const result = await postServices.getPost(id);
            setPost(result)
            setLoading(false);
        }

        getPost()
        // axios
        //     .get(`http://localhost:9000/posts/${id}`)
        //     .then((response) => {
        //         setPost(response.data);
        //         
        //     })
        //     .catch((error) => {
        //         alert('Error: Post not found!');
        //         navigate('/');
        //     });
    }, []);
    return (
        <>
            {loading ? (
                <div className="position-center">
                    <ReactLoading type="bars" color="#4dc89b" />
                </div>
            ) : (
                <div className={cx('text')}>
                    <div className={cx('post')}>
                        <h3 className={cx('title')}>{post.title}</h3>
                        <div className={cx('more')}>
                            <TimeAuthor
                                author={post.author_name}
                                timeCreated={post.created_at}
                                timeUpdated={post.updated_at}
                            />
                            {/* check authen to show authen-otp*/}
                            {/* <div className={cx('authen-opt', user ? '' : 'display-none')}>
                                <button className={cx('option', 'edit', 'link-none', 'pointer')} onClick={handleEdit}>
                                    Edit
                                </button>
                                <button
                                    className={cx('option', 'delete', 'link-none', 'pointer')}
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div> */}
                            <button
                                className={cx('option', 'download', 'link-none', 'pointer', 'common-border')}
                                onClick={handleDownload}
                            >
                                Export CSV
                            </button>
                            {csv ? <CSVDownload data={data} /> : <></>}
                        </div>
                        <div className={cx('content')}>
                            <p className={cx('mb-12')}>{post.content}</p>
                            <div className={cx('text-center')}>
                                <img src={`http://localhost:9000/assets/images/${post.thumbnail}`} alt="Post" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Details;
