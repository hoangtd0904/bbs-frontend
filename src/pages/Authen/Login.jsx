import styles from './Authen.module.css';
import classNames from 'classnames/bind';
import { useState } from 'react';

import * as authServices from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Login({ setLogin }) {
    // values
    const EMAIL_PATTERN = '^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+.)+[A-Za-z]+$';

    // states
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: null, password: null });
    const [isValidated, setIsvalidated] = useState({
        email: false,
        password: false,
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('logging in...');
    }, [loading]);

    //  request handlers
    const login = async () => {
        const result = await authServices.login({
            email: form.email,
            password: form.password,
        });
        if (result !== undefined) {
            alert(result.message);
            setLogin(true);
            navigate('/');
        } else {
            setLoading(false)
        }
    };

    //--handle change

    function handleChange(e) {
        switch (e.target.id) {
            case 'email':
                setForm({
                    ...form,
                    email: e.target.value,
                });
                setIsvalidated({
                    ...isValidated,
                    email: false,
                });
                break;
            case 'password':
                setForm({
                    ...form,
                    password: e.target.value,
                });
                setIsvalidated({
                    ...isValidated,
                    password: false,
                });
                break;
            default:
                break;
        }
        validate();
    }

    //--handleCancel
    function handleCancel(e) {
        e.preventDefault();
        if (window.confirm('Are you sure to Cancel Register and go back to the Home Page? ') === true) {
            setTimeout(() => {
                navigate('/');
            });
        }
    }

    // TODO: fix error PASSWORD
    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (isValidated.email === false || isValidated.password === false) {
            validate();
        }
        setIsvalidated({ email: true, password: true });
        if (errors.email === '' && errors.password === '') {
            login();
            setLoading(false);
            // axios
            //     .post(
            //         'http://localhost:9000/login',
            //         {
            //             email: form.email,
            //             password: form.password,
            //         },
            //         { withCredentials: true },
            //     )
            //     .then((response) => {
            //         alert(response.data.message);
            //         setLogin(true)
            //         navigate('/');
            //     })
            //     .catch((error) => {
            //         setLoading(false);
            //         alert(error.response.data.error);
            //     });
        } else {
            setLoading(false);
            console.log('error');
        }
    }

    function validate() {
        setErrors({
            email:
                form.email.length === 0
                    ? 'Email is required'
                    : form.email.match(EMAIL_PATTERN)
                    ? ''
                    : 'Email must be in format xxx@yyy.zzz',
            password: form.password.length > 0 ? '' : 'Password is required',
        });
    }

    //return

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'position-center')}>
                <h1 className={cx('text-center')}>Login</h1>
                <form className={cx('flex-center', 'login-form')} onSubmit={handleSubmit}>
                    <span className={cx('email', 'package')}>
                        <label htmlFor="email" className={cx('label')}>
                            Email
                        </label>
                        <input
                            type="text"
                            spellCheck={false}
                            autoComplete="off"
                            className={cx('input', errors.email !== '' && isValidated.email ? 'error-border' : '')}
                            name="email"
                            id="email"
                            onChange={handleChange}
                            autoFocus={true}
                        />
                        <div id="status" className={cx('error', 'p8', isValidated.email ? '' : 'display-none')}>
                            {errors.email}
                        </div>
                    </span>
                    <span className={cx('password', 'package')}>
                        <label htmlFor="password" className={cx('label')}>
                            Password
                        </label>
                        <input
                            type="password"
                            autoComplete="off"
                            className={cx(
                                'input',
                                errors.password !== '' && isValidated.password ? 'error-border' : '',
                            )}
                            name="password"
                            id="password"
                            onChange={handleChange}
                        />
                        <div id="status" className={cx('error', 'p8', isValidated.password ? '' : 'display-none')}>
                            {errors.password}
                        </div>
                    </span>
                    <div className={cx('flex-center')}>
                        <input
                            type="button"
                            className={cx('form-action', 'pointer')}
                            value="Cancel"
                            onClick={handleCancel}
                            disabled={loading}
                        />
                        <input
                            type="submit"
                            className={cx('form-action', 'pointer')}
                            // onClick={validate}
                            value="Submit"
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
