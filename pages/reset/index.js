import axios from 'axios';
import { useState, useEffect } from 'react'
import ErrorMessage from '../../components/common/ErrorMessage';
import baseUrl from '../../utils/baseUrl';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faGears } from "@fortawesome/free-solid-svg-icons";
import catchErrors from '../../utils/catchErrors';
import { Loading } from '../../components/common/Loading';

const Reset = () => {
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false);

    useEffect(() => {
        errorMsg && setTimeout(() => {
            setErrorMsg(null);
        }, 3000);
    }, [errorMsg])

    useEffect(() => {
        emailChecked && setTimeout(() => {
            setEmailChecked(false);
        }, 5000);
    }, [emailChecked]);

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            await axios.post(`${baseUrl}/reset`, { email });
            setEmailChecked(true);
        } catch (err) {
            const error = catchErrors(err);
            setErrorMsg(error);
        }
        setFormLoading(false)
    }
    return (
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
                    {emailChecked ?
                        (<p style={{ backgroundColor: 'blue' }}><FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px', marginLeft: '5px', fontWeight: 'bold' }} />
                            Check your email for instructions</p>) :
                        (<h3><FontAwesomeIcon icon={faGears} style={{ marginRight: '5px' }} />
                            Reset Password</h3>)}

                </div>
                <div className="alogin__page__body">
                    {errorMsg && <ErrorMessage errorMsg={errorMsg} />}
                    <form autocomplete='off' onSubmit={handleSubmit}>
                        <div className="alogin__page__form__control">
                            <input name='email'
                                placeholder='Enter email address'
                                type='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                autoComplete='off'
                            />
                        </div>
                        <button type='submit'
                            className='login__page__btn'>
                            {formLoading ? <Loading h={25} w={25} /> : 'Reset'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Reset