import { useState, useEffect } from 'react';
import { loginAdmin } from '../../utils/authUser';
import ErrorMessage from '../common/ErrorMessage';
import { Loading } from '../common/Loading';
import cookie from 'js-cookie';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const { username, password } = user;
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [submitDisable, setSubmitDisable] = useState(true);

    useEffect(() => {
        const isUser = Object.values({ username, password }).every(item => Boolean(item));
        isUser ? setSubmitDisable(false) : setSubmitDisable(true);
    }, [user])

    const handleChange = e => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginAdmin(user, setErrorMsg, setFormLoading);
    }

    useEffect(() => {
        const userName = cookie.get('userName');
        if (userName) setUser(prev => ({ ...prev, username: userName }));
    }, [])

    return (
        <>

            <div className="login__page" style={{
                background: 'url(bgg.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}>
                <div className="login__page__logo">
                    <img src='/logotrans.png' alt='playeon' />
                </div>

                <div className="login__page__modal">
                    <div className="login__page__header">
                        <h3>Log In</h3>
                    </div>
                    <div className="login__page__body">
                        {errorMsg && <ErrorMessage errorMsg={errorMsg} />}
                        <form autocomplete='off' onSubmit={handleSubmit}>
                            <div className="login__page__form__control">
                                <input name='username'
                                    placeholder='Username'
                                    type='text'
                                    value={username}
                                    onChange={handleChange}
                                    autoComplete='off'
                                />
                            </div>
                            <div className="login__page__form__control">
                                <input name='password'
                                    placeholder='Password'
                                    type='password'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="login__page__form__control">
                                <Link href={'/reset'}>
                                    <p style={{ fontSize: '12px', cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={faLock} style={{marginRight:'5px'}} />
                                        Forgot password?</p>
                                </Link>
                            </div>
                            <button
                                disabled={submitDisable} type='submit'
                                className='login__page__btn'>
                                Login
                            </button>
                        </form>
                    </div>

                </div>

            </div>

        </>

    )
}

export default Login