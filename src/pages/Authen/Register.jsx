import styles from './Authen.module.css';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

function Register() {
    //values TODO validate password
    const EMAIL_PATTERN = '^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+.)+[A-Za-z]+$';

    //states
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
    });
    const [isValidated, setIsvalidated] = useState({
        email: false,
        username: false,
        password: false,
        confirmPassword: false,
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //functions
    //--handleChange
    function handleChange(e) {
        switch (e.target.name) {
            case 'username':
                setForm({
                    ...form,
                    username: e.target.value,
                });
                setIsvalidated({
                    ...isValidated,
                    username: false,
                });
                break;

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

            case 'confirm-password':
                setForm({
                    ...form,
                    confirmPassword: e.target.value,
                });
                setIsvalidated({
                    ...isValidated,
                    confirmPassword: false,
                });
                break;
            default:
                break;
        }
        validate();
    }

    //--handleSubmit
    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        console.log('hehe');
        if (
            isValidated.username === false ||
            isValidated.email === false ||
            isValidated.password === false ||
            isValidated.confirmPassword === false
        ) {

            validate();
            // console.log('username: ' + errors.username + 'email: ' + errors.email + 'password: ' + errors.password + 'confirmPassword:'  + errors.confirmPassword);
        }
        
        setIsvalidated({ username: true, email: true, password: true, confirmPassword: true });
        if (errors.email === '' && errors.password === '' && errors.username === '' && errors.confirmPassword === '') {
            axios
                .post('http://localhost:9000/register', {
                    username: form.username,
                    email: form.email,
                    password: form.password,
                })
                .then((response) => {
                    alert(response.data);
                    setTimeout(() => {
                        navigate('/');
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false)
                    alert(error.response.data.error);
                });
        }else{
            setLoading(false)
        }
    }

    //--handleCancel
    function handleCancel(e) {
        e.preventDefault();
        setLoading(true)
        // if (window.confirm('Are you sure to Cancel Register and go back to the Home Page? ') === true) {
            setTimeout(() => {
                navigate('/');
            },500);
        // }
    }

    //validate
    function validate() {
        // console.log('username: ' + form.username + 'email: ' + form.email + 'password: ' + form.password + 'confirmPassword: '  + form.confirmPassword);
        // console.log(form.confirmPassword === form.password);
        setErrors({
            username: form.username.length > 0 ? '' : 'Username is required',
            email:
                form.email.length === 0
                    ? 'Email is required'
                    : form.email.match(EMAIL_PATTERN)
                    ? ''
                    : 'Email must be in format xxx@yyy.zzz',
            password: form.password.length > 0 ? '' : 'Password is required',
            confirmPassword:
                form.confirmPassword.length === 0
                    ? 'Confirm password is required'
                    : form.confirmPassword === form.password
                    ? ''
                    : 'Confirm password is not matched',
        });
    }

    //return
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'position-center')}>
                <h1 className={cx('text-center')}>Register</h1>
                <form className={cx('flex-center', 'login-form')} method="post" onSubmit={(e) => handleSubmit(e)}>
                    <span className={cx('username', 'package')}>
                        <label htmlFor="username" className={cx('label')}>
                            Username <span className={cx('error')}>*</span>
                        </label>
                        <input
                            type="text"
                            spellCheck={false}
                            className={cx('input', errors.username !== '' && isValidated.email ? 'error-border' : '')}
                            name="username"
                            id="username"
                            autoComplete="off"
                            maxLength="50"
                            autoFocus="true"
                            placeholder=" "
                            onChange={handleChange}
                        />
                        <span className={cx(isValidated.username ? '' : 'display-none', 'error', 'p8')}>
                            {errors.username}
                        </span>
                    </span>
                    <span className={cx('email', 'package')}>
                        <label htmlFor="email" className={cx('label')}>
                            Email <span className={cx('error')}>*</span>
                        </label>
                        <input
                            type="text"
                            className={cx('input', errors.email !== '' && isValidated.email ? 'error-border' : '')}
                            name="email"
                            id="email"
                            autoComplete="off"
                            placeholder=" "
                            onChange={handleChange}
                        />
                        <span className={cx(isValidated.email ? '' : 'display-none', 'error', 'p8')}>{errors.email}</span>
                    </span>
                    <span className={cx('password', 'package')}>
                        <label htmlFor="password" className={cx('label')}>
                            Password <span className={cx('error')}>*</span>
                        </label>
                        <input
                            type="password"
                            className={cx('input', errors.password !== '' && isValidated.password ? 'error-border' : '')}
                            name="password"
                            id="password"
                            minLength="8"
                            maxLength="20"
                            placeholder=" "
                            onChange={handleChange}
                        />
                        <span className={cx(isValidated.password ? '' : 'display-none', 'error', 'p8')}>
                            {errors.password}
                        </span>
                    </span>
                    <span className={cx('confirm-password', 'package')}>
                        <label htmlFor="confirm-password" className={cx('label')}>
                            Confirm password <span className={cx('error')}>*</span>
                        </label>
                        <input
                            type="password"
                            className={cx('input', errors.confirmPassword !== '' && isValidated.confirmPassword ? 'error-border' : '')}
                            name="confirm-password"
                            id="confirm-password"
                            minLength="8"
                            maxLength="20"
                            placeholder=" "
                            onChange={handleChange}
                        />
                        <span className={cx(isValidated.confirmPassword ? '' : 'display-none', 'error', 'p8')}>
                            {errors.confirmPassword}
                        </span>
                    </span>
                    <div className={cx('flex-center')}>
                        <input
                            type="button"
                            className={cx('form-action', 'pointer')}
                            value="Cancel"
                            onClick={handleCancel}
                            disabled={loading}
                        />
                        <input type="submit" className={cx('form-action', 'pointer')} disabled={loading} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
