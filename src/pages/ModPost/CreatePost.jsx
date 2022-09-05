import classNames from 'classnames/bind';
import styles from './ModPost.module.css';
import images from '../../assets/images';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as postServices from '../../services/postServices';
import { useEffect } from 'react';
import { createPost } from '../../services/postServices';

const cx = classNames.bind(styles);
/**
 *
 **/
function CreatePost() {
    //states
    const [count, setCount] = useState({
        title: 0,
        author: 0,
    });
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState(sessionStorage.getItem('name'));
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({
        title: null,
        content: null,
        image: null,
    });
    const [isValidated, setIsvalidated] = useState({
        title: false,
        content: false,
        image: false,
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const navigate = useNavigate();

    // request handlers
    const create = async (data) => {
        const result = await postServices.createPost(data);
        if (result !== undefined) {
            alert(result);
            setTimeout(() => {
                navigate('/');
            }, 500);
        } else {
            // error response
            setIsProcessing(false);
        }
    };

    // handle changes

    function handleChange(e) {
        switch (e.target.name) {
            case 'title':
                setTitle(e.target.value);
                setCount({
                    ...count,
                    title: e.target.value.length,
                }); // handle maxlength
                setIsvalidated({
                    ...isValidated,
                    title: false,
                });
                break;
            case 'content':
                setContent(e.target.value);
                setIsvalidated({
                    ...isValidated,
                    content: false,
                });
                break;
            default:
                break;
        }
        //set height
        e.target.style.height = 'inherit';
        e.target.style.height = `calc(${e.target.scrollHeight}px + 4px)`;
        //validate
        validate();
    }

    // file
    // TODO: fix cannot read 1 file twice

    function handleFileUpload(e) {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        // console.log(file);
        setImage(file);
        validate();
        setIsvalidated({
            ...isValidated,
            image: false,
        });
        // console.log(file);
        // const reader = new FileReader();
        // console.log(reader);
        // reader.readAsDataURL(file);
        // reader.onload = () => {
        //     setImage(reader.result);
        // };
    }

    function resetFile(e) {
        e.preventDefault();
        setImage('');
    }

    // submit

    function handleSubmit(e) {
        e.preventDefault();

        setIsProcessing(true);

        if (isValidated.content === false || isValidated.title === false || isValidated.image === false) {
            validate();
            setTimeout(() => {
                console.log('waiting for validation...');
            }, 500);
        }
        setIsvalidated({ content: true, title: true, image: true });
        console.log(`title: ${errors.title} content: ${errors.content} image: ${errors.image}`);
        setTimeout(() => {
            console.log(`title: ${errors.title} content: ${errors.content} image: ${errors.image}`);
            if (errors.title === '' && errors.content === '' && errors.image === '') {
                create({
                    title,
                    content,
                    author,
                    thumbnail: image,
                });
                // TODO: catching errors here

                // axios
                //     .post(
                //         'http://localhost:9000/posts/add',
                //         {
                //             title: title,
                //             content: content,
                //             author: author,
                //             thumbnail: image,
                //         },
                //         { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true },
                //     )
                //     .then((response) => {
                //         alert(response.data);
                //         setTimeout(() => {
                //             navigate('/');
                //         }, 500);
                //     })
                //     .catch((error) => {
                //         setIsProcessing(false);
                //         alert(error.response.data.error);
                //     });
            } else {
                console.log('something went wrong');
                setIsProcessing(false);
            }
        }, 1000);
        // setTimeout(() => {
        // },1000)
    }

    function handleCancelUpload() {
        if (window.confirm('Are you sure you want to cancel this upload?') === true) {
            setIsProcessing(true);
            setTimeout(() => {
                navigate('/');
            }, 500);
        }
    }
    //TODO: fix validation
    function validate() {
        console.log(`image: ${image === null}`);
        setErrors({
            title: title.length === 0 ? 'Title is required' : '',
            content: content.length === 0 ? 'Content is required' : '',
            image: image === null ? 'Thumbnail is required' : '',
        });
        console.log(`image error: ${errors.image}`);
    }

    useEffect(() => {
        // console.log(`Errors :\n title: ${errors.title}\n content: ${errors.content}\n image: ${errors.image}`);
        // console.log(
        //     `IsValidated :\n title: ${isValidated.title}\n content: ${isValidated.content}\n image: ${isValidated.image}`,
        // );
    }, [isValidated, isProcessing]);

    return (
        <>
            <h1 className="text-center">Create post</h1>
            <form className="" onSubmit={handleSubmit}>
                <div className={cx('input')}>
                    <textarea
                        name="title"
                        placeholder="Title*"
                        className={cx(
                            'title',
                            'p8',
                            `${errors.title !== '' && isValidated.title ? 'error-border' : ''}`,
                        )}
                        maxLength="150"
                        rows="1"
                        onChange={handleChange}
                    />
                    <span className={cx('count')}>{count.title}/150</span>
                    <div className={cx('error', 'p8', isValidated.title ? '' : 'display-none')}>{errors.title}</div>
                </div>
                {/* <div className={cx('input')}>
                    <input
                        name="author"
                        type="text"
                        placeholder="Author"
                        className={cx('author', `${error.author === null ? '' : 'error-border'}`)}
                        autoComplete="off"
                        maxLength="50"
                        onChange={handleChange}
                    />
                    <span className={cx('count')}>{count.author}/50</span>
                    <div className={cx('error', 'p8')}>{error.author}</div>
                </div> */}
                <textarea
                    name="content"
                    placeholder="What do you think?*"
                    className={cx('content', errors.content !== '' && isValidated.content ? 'error-border' : '')}
                    onChange={handleChange}
                />
                <div className={cx('error', 'p8', isValidated.content ? '' : 'display-none')}>{errors.content}</div>

                <div className={cx('thumbnail', 'flex-center')}>
                    <label
                        htmlFor="js-file"
                        className={cx(
                            'file-label',
                            'flex-center',
                            'pointer',
                            errors.image !== '' && isValidated.image ? 'error-border' : '',
                        )}
                    >
                        <img
                            src={image ? image.preview : images.image_placeholder}
                            alt="post thumbnail"
                            className={cx('p-image', '')}
                        />
                        <span
                            className={cx(
                                'file-reset',
                                'pointer',
                                'text-center',
                                'common-border',
                                image === null ? 'display-none' : '',
                            )}
                            onClick={resetFile}
                        >
                            X
                        </span>
                    </label>
                    <div className={cx('error', 'p8', isValidated.image ? '' : 'display-none')}>{errors.image}</div>
                    <input
                        type="file"
                        name="file"
                        id="js-file"
                        accept=".png,.jpg"
                        className={cx('file')}
                        onChange={(e) => handleFileUpload(e)}
                    />
                </div>
                <div className={cx('form-actions', 'flex-center')}>
                    <input
                        type="button"
                        className={cx('cancel', 'pointer')}
                        value="Cancel"
                        onClick={() => handleCancelUpload()}
                        disabled={isProcessing}
                    />
                    <input
                        type="submit"
                        name="submit"
                        className={cx('submit', 'p8', 'pointer')}
                        disabled={isProcessing}
                    />
                </div>
            </form>
        </>
    );
}

export default CreatePost;
