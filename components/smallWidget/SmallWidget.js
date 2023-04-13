import axios from 'axios';
import React, { useState, useEffect } from 'react'
import baseUrl from '../../utils/baseUrl';
import styles from './small.module.css';
import SmallWidgetCard from './SmallWidgetCard';

const SmallWidget = () => {
    const [newUsers, setNewUsers] = useState([]);
    useEffect(() => {
        const getNewUsers = async () => {
            try {
                const res = await axios.get(`${baseUrl}/auth/newusers`);
                setNewUsers([...res.data]);
            } catch (err) {
                console.log(err);
            }
        };
        getNewUsers();
    }, []);
    return (

        <>
            {newUsers.length > 0 ? (
                <div className={styles.widgetSmall}>
                    <span className={styles.smallTitle}>New Streamers</span>
                    <ul className={styles.smallList}>
                        {newUsers.map((current, index) => (
                            <SmallWidgetCard
                                imgSrc={current.profilePicture}
                                userName={current.username}
                                userEmail={current.email}
                                index={index}
                            />
                        ))}
                    </ul>
                </div>) : (
                <div className={styles.widgetSmall}>
                    <span className={styles.smallTitle}>No New Streamers...</span>
                </div>
            )}
        </>

    )
}

export default SmallWidget