import React, { useState } from 'react';
import styles from './large.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router';
import { deleteUser } from '../../utils/userActions';
const UserTableWidget = ({ users, setShowToster, loading, errorLoading }) => {
    const router = useRouter();
    if (users.length === 0 || errorLoading) {
        return (
            <>
                <div className={styles.widgetLarge}>
                    <h2 className={styles.largeTitle}>No Users Found!</h2>
                </div>
            </>
        )
    }
    return (
        <>
            {loading ?
                <div className={styles.loadingSearchUsers}>
                </div>
                :
                users.map((user) => {
                    const { _id, profilePicture, name, email, phoneNumber, country, createdAt, paymentMethod, username } = user;
                    return (
                        <>
                            <tr className={styles.largeRow} key={_id}>
                                <td className={styles.largeUser}>
                                    <img src={profilePicture} alt={name} className={styles.largeImg} />
                                    <span className={styles.largeUsername}>{name}</span>
                                </td>
                                <td className={styles.largeDate}>{email}</td>
                                <td className={styles.largeAmmount}>{username}</td>
                                <td className={styles.largeAmmount}>{phoneNumber}</td>
                                <td className={styles.largeAmmount}>{country}</td>

                                <td className={styles.largeStatus}>
                                    <button
                                        onClick={() => { if (confirm('Are you sure?')) deleteUser(_id, setShowToster, router) }}
                                        className={styles.largetButton}>
                                        <FontAwesomeIcon
                                            icon={faTrashCan}
                                            style={{ color: 'crimson' }} />
                                    </button>
                                </td>
                            </tr>
                        </>
                    )
                })

            }

        </>

    )
}

export const Modal = () => {
    return (
        <>

            <p id='name'>name</p>
            <p id='email'>email</p>
            <p id='phoneNumber'>phoneNumber</p>
            <p id='country'>country</p>
        </>
    )
}



export default UserTableWidget


// id={user._id}
// imgSrc={user.profilePicture}
// username={user.name}
// email={user.email}
// phoneNo={user.phoneNumber}
// country={user.country}
// accountCreated={user.createdAt}
// del={<FontAwesomeIcon icon={faTrashCan} style={{ color: 'crimson' }} />}