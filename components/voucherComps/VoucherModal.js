import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { createVouchers } from '../../utils/voucherActions';
import styles from './voucher.module.css';


const VoucherModal = ({ setModal, data, setShowToster, router }) => {

    const printRefCodes = useRef(null);
    const { allCodes, parsedTime } = data;
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createVouchers(data, setShowToster, router);
    }


    return (
        <form className={styles.voucherForm} onSubmit={handleSubmit}>
            <div className={styles.voucherContent}>
                <div className={styles.voucherHeader}>
                    <div className={styles.voucherHeadingPrint}>
                        <h2>All Voucher Codes</h2>
                        <ReactToPrint
                            trigger={() =>
                                <button
                                    type='button'
                                    className='printButton'>
                                    <FontAwesomeIcon icon={faPrint} /> Print All
                                </button>}
                            content={() => printRefCodes.current}
                        />
                    </div>

                    <span onClick={() => setModal(false)} className={styles.close}>&times;</span>
                </div>
                <div
                    ref={printRefCodes}
                    className={styles.voucherBody}>
                    {allCodes.map((code) => {
                        return (
                            <>
                                <div className={styles.voucherBodyContent}>
                                    <p>{code}</p>
                             
                                </div>
                            </>)
                    })}
                </div>
                <div className={styles.voucherFooter}>
                    <button type='submit'>Save</button>
                </div>
            </div>
        </form>
    )
}

export default VoucherModal