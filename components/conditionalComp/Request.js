import axios from 'axios';
import { parseCookies } from 'nookies';
import React, { useState, useEffect } from 'react';
import baseUrl from '../../utils/baseUrl';
import styles from '../../components/largeWidget/large.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { SuccessToaster } from '../layout/Toastr';
import { useRouter } from 'next/router';
import { requestFullFilled } from '../../utils/requestActions';


const Request = () => {
    const [request, setRequest] = useState([]);
    const router = useRouter();
    const [showToaster, setShowToster] = useState(false);
    useEffect(() => {
        const getRequestMessages = async () => {
            const res = await axios.get(`${baseUrl}/request`);
            setRequest(res.data);
        }
        getRequestMessages();
    }, [])
    if (request.length === 0) {
        return <h1>No Movie Request.</h1>
    }


    return (
        <>
            <div className={styles.widgetLarge}>
                {showToaster && <SuccessToaster successMsg='Updated Successfully!' />}
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
                                        <td className={styles.largeStatus}>
                                            {status ?
                                                <span style={{ color: 'green' }}>FULLFILLED</span> :
                                                <button
                                                    onClick={() => { if (confirm('Are you sure movie request is resolved?')) requestFullFilled(_id, setShowToster, router) }}
                                                    className={styles.largetButton}>
                                                    Resolved?
                                                </button>}
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

Request.getInitialProps = async (ctx) => {
    const { token } = parseCookies(ctx);
    try {
        const res = await axios.get(`${baseUrl}/request`, { headers: { Authorization: token } });
        const { request } = res.data;
        return { request }
    } catch (error) {
        return { errorLoading: true }
    }
}
export default Request