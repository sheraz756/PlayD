import React, { useState } from 'react'
import styles from './profile.module.css';
import { faCarSide, faChain, faEdit, faEye, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';
const ChangePassword = ({ setChangePassword, staff, setShowPasswordToaster }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChangePassword = async e => {
        e.preventDefault();
        const token = cookie.get('token');
        await axios.post(`${baseUrl}/staff/update`, { password, staff: staff._id }, { headers: { Authorization: token } });
        setShowPasswordToaster(true);
        setChangePassword(false);
    }

    return (
        <div className={styles.passwordModal}>
            <div className={styles.passwordContent}>
                <div className={styles.passwordHeader}>
                    <h2>Change Password</h2>
                    <span onClick={() => setChangePassword(false)} className={styles.close}>&times;</span>
                </div>
                <form onSubmit={handleChangePassword} className={styles.changePassword}>
                    <div className={styles.passwordBody}>
                        <div className={styles.buttonInside}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='Enter New Password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type='button' onClick={() => setShowPassword(!showPassword)}>
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </div>

                    </div>
                    <div className={styles.passwordFooter}>
                        <button className={styles.submitButtonForm}
                            type='submit'
                            disabled={password === '' || password.length < 4}>
                            Change password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword