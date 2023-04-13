import axios from 'axios'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'
import baseUrl from '../../utils/baseUrl'
import styles from '../../components/largeWidget/large.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { deleteRequest } from '../../utils/requestActions';
import { SuccessToaster } from '../../components/layout/Toastr';
import { useRouter } from 'next/router';


const Request = ({ request }) => {
    const router = useRouter();
    const [showToaster, setShowToster] = useState(false);
    if (request.length < 1) {
        return (
            <div className='adduser'>
                <h1>No Movie Request.</h1>
            </div>
        )
    }
    return (
        <div className={styles.widgetLarge}>
            {showToaster && <SuccessToaster successMsg='Deleted Successfully!' />}
            <div className={styles.topSection}>
                <h3 className={styles.largeTitle}>Requested Movies<span className={styles.count}>({request.length})</span></h3>
            </div>
            <table className={styles.largeTable}>
                <tbody>
                    <tr className={styles.largeRow}>
                        <th className={styles.largeHeading}>Id</th>
                        <th className={styles.largeHeading}>Name</th>
                        <th className={styles.largeHeading}>Message</th>
                        <th className={styles.largeHeading}>Date</th>
                        <th className={styles.largeHeading}>Status</th>
                        <th className={styles.largeHeading}>Actions</th>
                    </tr>
                    {request.map((req, index) => {
                        const { user } = req;
                        const { message, createdAt, _id, status } = req;
                        return (
                            <>
                                <tr className={styles.largeRow} key={index}>
                                    <td className={styles.largeDate}>{user._id.substring(0, 5)}....</td>
                                    <Link href={`/request/${_id}`}>
                                        <td className={styles.largeUser}>
                                            <img src={user.profilePicture} alt={user.name} className={styles.largeImg} />
                                            <span className={styles.largeUsername}>{user.name}</span>
                                        </td>
                                    </Link>
                                    <Link href={`/request/${_id}`}>
                                        <td className={styles.largeDate}>{message}</td>
                                    </Link>

                                    <td className={styles.largeAmmount}>{createdAt.substring(0, 10)}</td>
                                    <td className={styles.largeAmmount}>
                                        {status ? <span style={{ color: 'green' }}>FULLFILLED</span> : <span style={{ color: 'blue' }}>PENDING</span>}
                                    </td>
                                    <td className={styles.largeStatus}>
                                        <button
                                            onClick={() => { if (confirm('Are you sure?')) deleteRequest(_id, setShowToster, router) }}
                                            className={styles.largetButton}>
                                            <FontAwesomeIcon
                                                icon={faTrashCan}
                                                style={{ color: 'crimson' }} />
                                        </button>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}


export const getServerSideProps = async ctx => {
    try {
        const { token } = parseCookies(ctx);
        const res = await axios.get(`${baseUrl}/request`);
        const request = res.data;
        return { props: { request } };
    } catch (error) {
        return { props: { errorLoading: true } };
    }
};

export default Request