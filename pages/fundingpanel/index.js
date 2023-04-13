import axios from 'axios';
import { parseCookies } from 'nookies';
import React, { useState } from 'react'
import FundingTableWidet from '../../components/largeWidget/FundingTableWidet'
import styles from '../../components/largeWidget/large.module.css';
import { DeleteToastr } from '../../components/layout/Toastr';
import baseUrl from '../../utils/baseUrl';

const FundingPanel = ({ donations, errorLoading, user: { role } }) => {
    const [showToaster, setShowToster] = useState(false);

    if (donations.length === 0 || errorLoading) {
        return (
            <>
                <div className={styles.widgetLarge}>
                    <h2 className={styles.largeTitle}>Currently No Donation Post Available....</h2>
                </div>
            </>
        )
    }

    return (
        <div className='adduser'>
            {showToaster && <DeleteToastr />}
            <div className={styles.widgetLarge}>
                <div className={styles.topSection}>
                    <h3 className={styles.largeTitle}>Funding Panel</h3>

                </div>
                <table className={styles.largeTable} id='table'>
                    <tbody>
                        <tr className={styles.largeRow}>
                            <th className={styles.largeHeading}>Id</th>
                            <th className={styles.largeHeading}>Title</th>
                            <th className={styles.largeHeading}>Description</th>
                            <th className={styles.largeHeading}>Ammount</th>
                            <th className={styles.largeHeading}>CreatedAt</th>
                            {role === 'admin' && <th className={styles.largeHeading}>Actions</th>}
                        </tr>
                        <FundingTableWidet donations={donations} setShowToster={setShowToster} role={role} />
                    </tbody>
                </table>
            </div>
        </div>
    )
}

FundingPanel.getInitialProps = async (ctx) => {
    const { token } = parseCookies(ctx);
    try {
        const res = await axios.get(`${baseUrl}/funding`, { headers: { Authorization: token } });
        const { donations } = res.data;
        return { donations }
    } catch (error) {
        return { errorLoading: true }
    }
}

export default FundingPanel