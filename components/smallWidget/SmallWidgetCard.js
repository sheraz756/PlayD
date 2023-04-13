import Link from 'next/link';
import React from 'react'
import styles from './small.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const SmallWidgetCard = ({ imgSrc, userName, userEmail,index }) => {
    return (
        <li className={styles.smallListItem} key={index}>
            <img src={imgSrc} alt={userName} className={styles.smallImg} />
            <div className={styles.smallUser}>
                <span className={styles.smallUsername}>{userName}</span>
                <span className={styles.smallUserJobTitle}>{userEmail}</span>
            </div>
            <Link href={'/users'}>
                <button className={styles.smallButton}>
                    <FontAwesomeIcon icon={faEye} style={{ marginRight: '5px', fontSize: 16 }} />
                    Display All
                </button>
            </Link>
        </li>
    )
}

export default SmallWidgetCard