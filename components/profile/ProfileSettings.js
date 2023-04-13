import { faCalendar, faCarSide, faChain, faCircleCheck, faCircleInfo, faCircleXmark, faEdit, faEye, faGears, faKey, faLocationDot, faMessage, faPhone, faUser, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';
import { ErrorToastr, SuccessToaster } from '../../components/layout/Toastr';
import catchErrors from '../../utils/catchErrors';
import styles from './profile.module.css';
import ImagePlaceholder from './ImagePlaceholder';
import PasswordModal from './PasswordModal';
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
let cancel;

const ProfileSettings = ({ user, router }) => {


    const [showUsername, setShowUsername] = useState(false);
    const [username, setUserName] = useState('');
    const [usernameAvailable, setUsernameAvailable] = useState(false);
    const [usernameLoading, setUsernameLoading] = useState(false);

    const [error, setError] = useState(null);
    const [showToaster, setShowToaster] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [submitDisable, setSubmitDisable] = useState(true);
    const inputRef = useRef();
    useEffect(() => {
        showToaster && setTimeout(() => {
            setShowToaster(false);
        }, 3000);
    }, [showToaster])
    useEffect(() => {
        error && setTimeout(() => {
            setError(null);
        }, 3000);
    }, [error])
    useEffect(() => {
        message && setTimeout(() => {
            setMessage('');
        }, 3000);
    }, [message])
    useEffect(() => {
        const isPassword = Object.values({ currentPassword, newPassword }).every(item => Boolean(item));
        isPassword ? setSubmitDisable(false) : setSubmitDisable(true);
    }, [newPassword, currentPassword]);

    const handleChange = e => {
        const { name, files } = e.target;
        if (name === 'media') {
            setMedia(files[0]);
            setMediaPreview(URL.createObjectURL(files[0]));
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('id', user._id);
        data.append('media', media);
        await axios.post(`${baseUrl}/profile/setProfilePicture`, data).then((res) => {
            setMessage(res.data);
        }).catch(err => console.log(err));
        setShowToaster(true);
        router.reload();
    }
    const handleChangePassword = async (event) => {
        event.preventDefault();
        await axios.post(`${baseUrl}/auth/settings/password`,
            { currentPassword, newPassword },
            { headers: { Authorization: cookie.get('token') } }).then((res) => {
                setMessage(res.data);
                setShowToaster(true);
                router.reload();
            }).catch((err) => {
                const errorMsg = catchErrors(err);
                setError(errorMsg);
            });

    }



    // Checking Username
    const checkUsername = async () => {
        setUsernameLoading(true);
        try {
            cancel && cancel();
            const CancelToken = axios.CancelToken;
            const res = await axios.get(`${baseUrl}/signup/${username}`, {
                cancelToken: new CancelToken(canceler => {
                    cancel = canceler;
                })
            });
            if (res.data === "Available") {
                setUsernameAvailable(true);
            }
        } catch (error) {
            console.log('Username not available')
            setUsernameAvailable(false);
        }
        setUsernameLoading(false);
    }

    useEffect(() => {
        username === "" ? setUsernameAvailable(false) : checkUsername();
    }, [username])

    const handleChangeUsername = async (e) => {
        e.preventDefault();
        await axios.post(`${baseUrl}/auth/settings/username`,
            { username },
            { headers: { Authorization: cookie.get('token') } });
        setMessage('Username Changed Successfully!');
        setShowToaster(true);
        router.reload();
    }





    return (
        <>
            {showToaster && <SuccessToaster successMsg={message} />}
            {error && <ErrorToastr error={error} />}
            <div className={styles.main__container}>
                <div className={styles.heading__profile}>
                    <h2>Account details</h2>
                    <span className={styles.heading__right}>
                        <FontAwesomeIcon
                            icon={faMessage}
                            style={{ color: 'crimson', fontSize: '12px' }}
                        />
                        <p>Member Since {user.createdAt.substring(0, 10)}</p>
                    </span>
                </div>
                <hr className={styles.seperator} />
                <div className={styles.profile__container}>
                    <div className={styles.coverImg}>
                        <img src='../../coverimg.jpg' alt='coverImg' />
                        <form onSubmit={handleSubmit}>
                            <div>
                                <ImagePlaceholder
                                    user={user}
                                    inputRef={inputRef}
                                    handleChange={handleChange}
                                    mediaPreview={mediaPreview}
                                    setMediaPreview={setMediaPreview}
                                    setMedia={setMedia}
                                />
                                <FontAwesomeIcon icon={faEdit} className={styles.editButton} onClick={() => inputRef.current.click()} />

                                {mediaPreview !== null && <button className={styles.updateButton} type='sumbit'>Upload Profile Picture</button>}
                            </div>
                            <div className={styles.userInfo}>
                                <h2>{user.name}</h2>
                                <p>{user.email}</p>
                            </div>
                        </form>
                    </div>

                    <div className={styles.profileInfoContainer}>

                        <div className={styles.userInformation}>
                            <h3>
                                <FontAwesomeIcon
                                    icon={faCircleInfo}
                                    style={{ marginRight: '5px' }}
                                />
                                Info
                            </h3>
                            <div className={styles.InfoBox}>
                                <p>
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        style={{ marginRight: '12px' }}
                                    />
                                    {user.username}
                                </p>
                                <p>
                                    <FontAwesomeIcon
                                        icon={faPhone}
                                        style={{ marginRight: '12px' }}
                                    />Contact {user.phoneNumber}
                                </p>
                                <p>
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        style={{ marginRight: '12px' }}
                                    />
                                    from {user.country}
                                </p>
                                <p>
                                    <FontAwesomeIcon
                                        icon={faCalendar}
                                        style={{ marginRight: '12px' }}
                                    />
                                    Joined {user.createdAt.substring(0, 10)}
                                </p>

                            </div>
                        </div>

                        <div className={styles.userSettings}>
                            <h3>
                                <FontAwesomeIcon
                                    icon={faGears}
                                    style={{ marginRight: '5px' }}
                                />
                                Settings
                            </h3>
                            <div className={styles.InfoBoxSettings}>
                                <button
                                    className={styles.settingsButton}
                                    onClick={() => {
                                        setShowUsername(false);
                                        setShowPassword(!showPassword);
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faKey}
                                        style={{ marginRight: '15px' }}
                                    />
                                    Change Password
                                </button>
                                <button
                                    className={styles.settingsButton}
                                    onClick={() => {
                                        setShowPassword(false);
                                        setShowUsername(!showUsername)
                                    }}>
                                    <FontAwesomeIcon
                                        icon={faUserSecret}
                                        style={{ marginRight: '15px' }}
                                    />
                                    Change Username
                                </button>

                                {showUsername &&
                                    <form
                                        onSubmit={handleChangeUsername}
                                        className={styles.changeUsername}
                                    >
                                        <div className={styles.customDiv}>
                                            <input
                                                type='text'
                                                placeholder='Username'
                                                value={username}
                                                name='username'
                                                autoComplete='off'
                                                onChange={e => {
                                                    setUserName(e.target.value);
                                                    if (regexUserName.test(e.target.value)) {
                                                        setUsernameAvailable(true)
                                                    } else {
                                                        setUsernameAvailable(false)
                                                    }
                                                }} />
                                            <div className={styles.customDivIcon}>
                                                {usernameAvailable ?
                                                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: '13b164' }} />
                                                    :
                                                    <FontAwesomeIcon icon={faCircleXmark} style={username === "" ? { color: 'transparent', fontSize: '25px' } : { color: 'crimson' }} />
                                                }
                                            </div>
                                        </div>
                                        <button
                                            disabled={!usernameAvailable}
                                            className={styles.submitButtonForm}
                                            type='submit'>Update username</button>
                                    </form>}
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {showPassword &&
                <PasswordModal
                    setShowModal={setShowPassword}
                    handleChangePassword={handleChangePassword}
                    setCurrentPassword={setCurrentPassword}
                    showCurrentPassword={showCurrentPassword}
                    setShowCurrentPassword={setShowCurrentPassword}
                    showNewPassword={showNewPassword}
                    submitDisable={submitDisable}
                    setNewPassword={setNewPassword}
                    setShowNewPassword={setShowNewPassword}
                />}


        </>
    )
}

export default ProfileSettings




