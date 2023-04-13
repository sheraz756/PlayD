import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import baseUrl from '../../utils/baseUrl';
import styles from './large.module.css';
import LargeWidgetTable from './LargeWidgetTable';

const LargeWidget = () => {
    const [newUsers, setNewUsers] = useState([]);
    useEffect(() => {
        const getNewUsers = async () => {
            try {
                const res = await axios.get(`${baseUrl}/users/cardnextpayment`);
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
                <div className={styles.widgetLarge}>
                    <h3 className={styles.largeTitle}>Payment Stats</h3>

                    <div className={styles.paymentDueModule}>
                        <p>Payment Due</p>
                        <h2>
                            <FontAwesomeIcon
                                icon={faUsers}
                                style={{ marginRight: '5px' }}
                            />
                            {newUsers.length}
                        </h2>
                    </div>
                </div>) : (
                <div className={styles.paymentNoModule}>
                    <p>No Payment Due</p>
                    <h2>
                        <FontAwesomeIcon
                            icon={faUsers}
                            style={{ marginRight: '5px' }}
                        />
                        0
                    </h2>
                </div>
            )}

        </>
    )
}

export default LargeWidget





