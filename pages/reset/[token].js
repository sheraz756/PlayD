import axios from 'axios';
import { useState, useEffect } from 'react'
import ErrorMessage from '../../components/common/ErrorMessage';
import baseUrl from '../../utils/baseUrl';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faEyeSlash, faGears } from "@fortawesome/free-solid-svg-icons";
import catchErrors from '../../utils/catchErrors';
import { Loading } from '../../components/common/Loading';
import { useRouter } from 'next/router';

const Token = () => {
    const router = useRouter();
    const { token } = router.query;
    const [newPassword, setNewPassword] = useState({ field1: "", field2: "" });
    const { field1, field2 } = newPassword;

    const [formLoading, setFormLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    useEffect(() => {
        errorMsg && setTimeout(() => {
            setErrorMsg(null);
        }, 3000);
    }, [errorMsg])



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (field1 !== field2) {
            return setErrorMsg('Password do not match!');
        }
        setFormLoading(true);
        try {
            await axios.post(`${baseUrl}/reset/token`, { password: field1, token });
            setSuccess(true);
        } catch (err) {
            const error = catchErrors(err);
            setErrorMsg(error);
        }
        setFormLoading(false)
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setNewPassword(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div className="login__page" style={{
            background: 'url(../bgg.jpg)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}>
            <div className="login__page__logo">
                <img src='/logotrans.png' alt='playeon' />
            </div>
            <div className="login__page__modal">
                <div className="login__page__header">
                    {success ?
                        (<p
                            onClick={() => router.push('/login')}
                            style={{ backgroundColor: 'blue', cursor: 'pointer',padding:'25px' }}><FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px', marginLeft: '5px', fontWeight: 'bold' }} />
                            Password changed successfully!</p>) :
                        (<h3><FontAwesomeIcon icon={faGears} style={{ marginRight: '5px' }} />
                            Reset Password</h3>)}

                </div>
                {!success && (
                    <div className="alogin__page__body">
                        {errorMsg && <ErrorMessage errorMsg={errorMsg} />}
                        <form autocomplete='off' onSubmit={handleSubmit}>
                            <div className="customDiv">
                                <input name='field1'
                                    placeholder='Enter new password'
                                    type={showPassword ? 'text' : 'password'}
                                    value={field1}
                                    onChange={handleChange}
                                    autoComplete='off'
                                />
                                <div className='customDivIcon'>
                                    {field1.length > 0 &&
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEye : faEyeSlash}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setShowPassword(!showPassword)} />
                                    }
                                </div>
                            </div>
                            <div className="customDiv">
                                <input name='field2'
                                    placeholder='Confirm new password'
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={field2}
                                    onChange={handleChange}
                                    autoComplete='off'
                                />
                                <div className='customDivIcon'>
                                    {field2.length > 0 &&
                                        <FontAwesomeIcon
                                            icon={showConfirmPassword ? faEye : faEyeSlash}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                                    }
                                </div>
                            </div>
                            <button
                                disabled={field1 === "" || field2 === "" || formLoading}
                                type='submit'
                                className='slogin__page__btn'>
                                {formLoading ? <Loading h={25} w={25} /> : 'Reset'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Token