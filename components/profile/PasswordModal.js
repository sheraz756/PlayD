import React from 'react'
import styles from './profile.module.css';
import { faCarSide, faChain, faEdit, faEye, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const PasswordModal = ({setShowModal,handleChangePassword,setCurrentPassword,showCurrentPassword,setShowCurrentPassword,showNewPassword,submitDisable,setNewPassword,setShowNewPassword}) => {
    return (
        <div className={styles.passwordModal}>
            <div className={styles.passwordContent}>
                <div className={styles.passwordHeader}>
                    <h2>Change Password</h2>
                    <span onClick={() => setShowModal(false)} className={styles.close}>&times;</span>
                </div>
                <form onSubmit={handleChangePassword} className={styles.changePassword}>
                    <div className={styles.passwordBody}>
                        <div className={styles.buttonInside}>
                            <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                name='currentPassword'
                                placeholder='Enter Current Password'
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <button type='button' onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </div>
                        <div className={styles.buttonInside}>
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                name='newPassword'
                                placeholder='Enter New Password'
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button type='button' onClick={() => setShowNewPassword(!showNewPassword)}>
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </div>

                    </div>
                    <div className={styles.passwordFooter}>
                        <button className={styles.submitButtonForm} type='submit' disabled={submitDisable}>Change password</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PasswordModal