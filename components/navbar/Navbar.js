import React from 'react';
import styles from './navbar.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faGear, faCaretDown, faExternalLink, faFireExtinguisher, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from '../../utils/authUser';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = ({ user: { _id, username, profilePicture } }) => {
    return (
        <div className={styles.topbar}>
            <div className={styles.topbar__wrapper}>
                <div className='top__left'>
                    <span className={styles.logo}>
                        <img src='/logotrans.png' alt='Playeon' />
                    </span>
                </div>
                <div className={styles.top__right}>
                    <ul className={styles.dropdown__menu}>
                        <Link href={`/${_id}`}>
                            <li>
                                <img src={profilePicture} alt={username} className={styles.top__avatar} />
                            </li>
                        </Link>
                    </ul>
                    <div className={styles.topbar__icon__container}>
                        Welcome, {username}
                    </div>
                    <div className={styles.topbar__icon__container} onClick={() => logoutUser(username)}>
                        <FontAwesomeIcon icon={faRightFromBracket} style={{ color: 'white' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Navbar