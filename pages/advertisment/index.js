import axios from 'axios'
import { parseCookies } from 'nookies'
import React, { useState, useEffect } from 'react'
import baseUrl from '../../utils/baseUrl'
import styles from '../../components/largeWidget/large.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit, faKey, faMarsDouble, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import catchErrors from '../../utils/catchErrors';
import { ErrorToastr } from '../../components/layout/Toastr';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
const Advertisment = ({ ads, user: { role } }) => {
    const router = useRouter();
    const [error, setError] = useState(null);

    useEffect(() => {
        const timming = setTimeout(() => {
            setError(null);
        }, 3000);
        return () => clearTimeout(timming);
    }, [error])



    return (
        <>
            {error && <ErrorToastr error={error} />}
            <div className={styles.widgetLarge}>
                <div className={styles.topSection}>
                    <h3 className={styles.largeTitle}>All Advertisment</h3>
                </div>
                <table className={styles.largeTable}>
                    <tbody>
                        <tr className={styles.largeRow}>
                            <th className={styles.largeHeading}>Id</th>
                            <th className={styles.largeHeading}>Name</th>
                            <th className={styles.largeHeading}>Link</th>
                            <th className={styles.largeHeading}>Validity</th>
                            <th className={styles.largeHeading}>Date</th>
                            <th className={styles.largeHeading}>Is Active</th>
                            {role === 'admin' && <th className={styles.largeHeading}>Actions</th>}
                        </tr>
                        {ads.map((ad, i) => {
                            const { _id, title, adPoster, link, createdAt, isActive, validity } = ad;
                            const timeInSeconds = validity / 1000;
                            return (
                                <>

                                    <tr className={styles.largeRow} key={i}>
                                        <td className={styles.largeDate}>{_id.substring(0, 5)}....</td>
                                        <td className={styles.largeUser}>
                                            <img src={adPoster} className={styles.largeImg} />
                                            <span className={styles.largeUsername}>{title}</span>
                                        </td>
                                        <td className={styles.largeDate}>{link}</td>
                                        <td className={styles.largeDate}>{timeInSeconds} seconds</td>
                                        <td className={styles.largeAmmount}>{createdAt.substring(0, 10)}</td>
                                        <td className={styles.largeAmmount}>
                                            {isActive ?
                                                (<form>
                                                    <button className='deactivateBtn' onClick={async (e) => {
                                                        e.preventDefault();
                                                        await axios.post(`${baseUrl}/ad/deactivate`, { _id }).then((res) => {
                                                            console.log(res.data);
                                                        }).catch((err) => {
                                                            const errorMsg = catchErrors(err);
                                                            setError(errorMsg);
                                                        }).finally(() => router.reload());
                                                    }}><FontAwesomeIcon icon={faCheckDouble} /> Deactivate</button>
                                                </form>
                                                ) :
                                                (<form>
                                                    <button className='activateBtn' onClick={async (e) => {
                                                        e.preventDefault();
                                                        await axios.post(`${baseUrl}/ad/activate`, { _id }).then((res) => {
                                                            console.log(res.data);
                                                        }).catch((err) => {
                                                            const errorMsg = catchErrors(err);
                                                            setError(errorMsg);
                                                        }).finally(() => router.reload());
                                                    }}><FontAwesomeIcon icon={faKey} /> Activate</button>
                                                </form>
                                                )}
                                        </td>
                                        {role === 'admin' &&
                                            <td className={styles.largeStatus}>
                                                <form>
                                                    <button
                                                        onClick={async (e) => {
                                                            if (confirm('Are you sure?')) {
                                                                e.preventDefault();
                                                                await axios.delete(`${baseUrl}/ad/${_id}`, { headers: { Authorization: cookie.get('token') } }).then((res) => {
                                                                    console.log(res.data);
                                                                    alert('Deleted Successfully!')
                                                                }).catch((err) => {
                                                                    const errorMsg = catchErrors(err);
                                                                    setError(errorMsg);
                                                                }).finally(() => router.reload());
                                                            }
                                                        }}
                                                        className={styles.largetButton}>
                                                        <FontAwesomeIcon
                                                            icon={faTrashCan}
                                                            style={{ color: 'crimson' }} />
                                                    </button>
                                                </form>
                                            </td>
                                        }
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

Advertisment.getInitialProps = async (ctx) => {
    try {
        const res = await axios.get(`${baseUrl}/ad/all`);
        const { ads } = res.data;
        return { ads }
    } catch (error) {
        return { errorLoading: true }
    }
}
export default Advertisment