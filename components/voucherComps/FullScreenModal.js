import React, { useState, useEffect, useRef } from 'react'
import styles from '../voucherComps/voucher.module.css'
import ReactToPrint from 'react-to-print'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose, faFileEdit, faMagnifyingGlass, faNotEqual, faPrint, faShield, faTrashCan } from "@fortawesome/free-solid-svg-icons";
const FullScreenModal = ({ voucherData, setFullModal }) => {
    const printableRef = useRef(null);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
        active: false,
        notActive: false
    });

    const activeVouchers = () => {
        setFilter(i => {
            return {
                ...i,
                active: true,
                notActive: false
            }
        })
    }
    const notActiveVouchers = () => {
        setFilter(i => {
            return {
                ...i,
                active: false,
                notActive: true
            }
        })
    }


    useEffect(() => {
        if (filter.active) {
            const newData = voucherData.filter((val) => val.isActive);
            setData([...newData])
        } else if (filter.notActive) {
            const newData = voucherData.filter((val) => !val.isActive);
            setData([...newData])
        } else {
            setData([...voucherData]);
        }
    }, [filter.active, filter.notActive, filter, voucherData])
    
    return (
        <div className={styles.fullModal}>
            <div className={styles.fullModalContent}>
                <button
                    className='printButton'
                    onClick={activeVouchers}>
                    <FontAwesomeIcon icon={faCheck} /> Active Vouchers
                </button>
                <button
                    className='printButton'
                    onClick={notActiveVouchers}>
                    <FontAwesomeIcon icon={faNotEqual} /> Not Active Vouchers
                </button>
                <ReactToPrint
                    trigger={() =>
                        <button className='printButton'>
                            <FontAwesomeIcon icon={faPrint} /> Print
                        </button>}
                    content={() => printableRef.current}
                />
                <button
                    className='printButton'
                    onClick={() => setFullModal(false)}>
                    <FontAwesomeIcon icon={faClose} /> Close
                </button>
                <div
                    className={styles.fullModalBody}
                    ref={printableRef}>
                    {data && data.map((v) => {
                        return (
                            <div
                                className={styles.fullModalBodyVoucher}>
                                <p>{v.code}</p>
                                <p>{v.validtill} Days</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FullScreenModal