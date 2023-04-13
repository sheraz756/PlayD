import axios from 'axios'
import { parseCookies } from 'nookies'
import React from 'react'
import baseUrl from '../../utils/baseUrl'
import styles from '../../components/largeWidget/large.module.css';
const IndividualVoucher = ({ voucher }) => {
    return (
        <>
            <div className='adduser'>
                <h3>{voucher._id}</h3>
                <div className='voucherIndividual'>
                    <p>Code : {voucher.code}</p>
                    <p>Type : {voucher.type}</p>
                    <p>Valid For : {voucher.validtill} days</p>
                    {!voucher.isActive && <p>Not in use</p>}
                    {voucher.isActive &&
                        <>
                            <p>ExpiryDate: {voucher.expiry.substring(0, 10)}</p>
                            <p>Used By</p>
                            <table className={styles.largeTable} id='table'>
                                <tbody>
                                    <tr className={styles.largeRow}>
                                        <th className={styles.largeHeading}>Id</th>
                                        <th className={styles.largeHeading}>Streamer</th>
                                        <th className={styles.largeHeading}>Email</th>
                                        <th className={styles.largeHeading}>PhoneNo</th>
                                        <th className={styles.largeHeading}>Country</th>
                                        <th className={styles.largeHeading}>CreatedAt</th>
                                    </tr>

                                    <tr className={styles.largeRow}>
                                        <td className={styles.largeDate}>{voucher.user._id.substring(0, 5)}....</td>
                                        <td className={styles.largeUser}>
                                            <img src={voucher.user.profilePicture} alt={voucher.user.name} className={styles.largeImg} />
                                            <span className={styles.largeUsername}>{voucher.user.name}</span>
                                        </td>
                                        <td className={styles.largeDate}>{voucher.user.email}</td>
                                        <td className={styles.largeAmmount}>{voucher.user.phoneNumber}</td>
                                        <td className={styles.largeAmmount}>{voucher.user.country}</td>
                                        <td className={styles.largeAmmount}>{voucher.user.createdAt.substring(0,10)}</td>
                                    </tr>


                                </tbody>
                            </table>
                        </>
                    }
                </div>
            </div>
        </>
    )
}



IndividualVoucher.getInitialProps = async (ctx) => {
    const { token } = parseCookies(ctx);
    try {
        const res = await axios.get(`${baseUrl}/voucher/${ctx.query.id}`, { headers: { Authorization: token } });
        return { voucher: res.data }
    } catch (error) {
        return { errorLoading: true }
    }
}
export default IndividualVoucher