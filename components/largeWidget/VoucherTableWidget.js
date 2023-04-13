import React, { useRef, useState } from 'react'
import styles from './large.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileEdit, faFileExcel, faMagnifyingGlass, faPrint, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteVoucher } from '../../utils/voucherActions';
import { DeleteToastr } from '../layout/Toastr';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import cookie from 'js-cookie';
import Link from 'next/link';
import ReactToPrint from 'react-to-print';
import CustomVoucher from './CustomVoucher';
import FullScreenModal from '../voucherComps/FullScreenModal';
import Loading from '../common/Loading';
let cancel;
const VoucherTableWidget = ({ customVoucherModal, setCustomVoucherModal, voucherData, router, role, fetchDataAndSaveOnExcelFile, excelLoading }) => {
    const printRef = useRef(null);
    const [showDeleteToaster, setShowDeleteToaster] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [fullModal, setFullModal] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const today = new Date();
    const now = today.toISOString();
    const handleChange = async (e) => {
        const { value } = e.target;
        if (value.trim().length === 0) return setSearchText(value);
        setSearchText(value);
        setShowSearchModal(true);
        setLoading(true);
        try {
            cancel && cancel();
            const CancelToken = axios.CancelToken;
            const token = cookie.get('token');
            const res = await axios.get(`${baseUrl}/voucher/search/${searchText}`, {
                headers: { Authorization: token },
                cancelToken: new CancelToken(canceler => {
                    cancel = canceler;
                })
            });
            setResults(res.data);
        } catch (error) {
            console.log('Error Searching');
        }
        setLoading(false);
    }

    return (
        <>
            {fullModal && <FullScreenModal voucherData={voucherData} setFullModal={setFullModal} />}
            <div className={styles.widgetLarge}>
                {showDeleteToaster && <DeleteToastr />}
                <div className={styles.topSection}>
                    <div className='printSection'>
                        <h3 className={styles.largeTitle}>All Vouchers</h3>
                        <button
                            className='printButton'
                            disabled={excelLoading}
                            onClick={fetchDataAndSaveOnExcelFile}>
                            <FontAwesomeIcon icon={faFileExcel} /> Export as Excel
                        </button>
                        {router.pathname === '/voucher/goldvoucher' &&
                            <button
                                onClick={() => setCustomVoucherModal(!customVoucherModal)}
                                className='printButton'>
                                <FontAwesomeIcon icon={faFileEdit} /> Create Custom Voucher
                            </button>
                        }
                    </div>
                    <div className='search-box'>
                        <button className="btn-search">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        <input
                            onBlur={() => {
                                setTimeout(() => {
                                    setShowSearchModal(false);
                                }, 100)
                            }}
                            autoComplete='off'
                            onChange={handleChange}
                            name='serachText'
                            type="text"
                            className="input-search"
                            placeholder="Search codes..." />
                        {showSearchModal &&
                            <div className='resultRendrer'>
                                {loading && <p>Loading..</p>}
                                {results < 1 ?
                                    <p style={{ color: 'crimson', padding: '5px' }}>No code found with {searchText}</p>
                                    : results.map((item, i) => (
                                        <Link href={`/voucher/${item._id}`}>
                                            <div className='resultsSection' key={i} onClick={() => setSearchText('')}>
                                                <p>{item.code}</p>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        }
                    </div>
                </div>
                <table className={styles.largeTable} ref={printRef} id='table' >
                    <tbody>
                        <tr className={styles.largeRow}>
                            <th className={styles.largeHeading}>Id</th>
                            <th className={styles.largeHeading}>Voucher</th>
                            <th className={styles.largeHeading}>Duration</th>
                            <th className={styles.largeHeading}>Type</th>
                            <th className={styles.largeHeading}>isActive</th>
                            <th className={styles.largeHeading}>CreatedAt</th>
                            <th className={styles.largeHeading}>ExpiryDate</th>
                            <th className={styles.largeHeading}>Status</th>
                            {role === 'admin' && <th className={styles.largeHeading}>Actions</th>}
                        </tr>
                        {voucherData.map((voucher) => {
                            const { _id, code, validtill, isActive, createdAt, type, expiry } = voucher;
                            return (
                                <>
                                    <tr className={styles.largeRow} key={_id}>
                                        <td className={styles.largeDate}>{_id.substring(0, 3)}...</td>
                                        <td className={styles.largeUser}>
                                            <span className={styles.largeUsername}>{code}</span>
                                        </td>
                                        <td className={styles.largeDate}>{validtill} Days</td>
                                        <td className={styles.largeDate}>{type}</td>
                                        <td className={isActive ? styles.largeAmmountActive : styles.largeAmmountNotActive}>{isActive ? 'Active' : 'Not Active'}</td>
                                        <td className={styles.largeAmmount}>{createdAt.substring(0, 10)}</td>
                                        <td className={styles.largeAmmount}>
                                            {expiry && expiry.substring(0, 10)}
                                            {!expiry && 'null'}
                                        </td>
                                        <td className={styles.largeAmmount}>
                                            {
                                                expiry && 'In Use'

                                            }
                                            {
                                                !expiry && 'Not Used'
                                            }
                                        </td>
                                        {role === 'admin' &&
                                            <td className={styles.largeStatus}>
                                                <button
                                                    onClick={() => { if (confirm('Are you sure?')) deleteVoucher(_id, setShowDeleteToaster, router) }}
                                                    className={styles.largetButton}>
                                                    <FontAwesomeIcon
                                                        icon={faTrashCan}
                                                        style={{ color: 'crimson' }} />
                                                </button>
                                            </td>}
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

export default VoucherTableWidget