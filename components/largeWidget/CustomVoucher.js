import React from 'react';
import { createCustomVoucher } from '../../utils/voucherActions';
import styles from '../voucherComps/voucher.module.css';

const CustomVoucher = ({ customCode,
    setCustomCode,
    customTime,
    setCustomTime, setShowToster, router }) => {



    const handleSubmit = async (e) => {
        e.preventDefault();
        const parsedTime = parseInt(customTime);
        await createCustomVoucher(customCode, parsedTime, setShowToster, router);
    }

    return (
        <div className='adduser'>
            <form onSubmit={handleSubmit}>
                <div className={styles.mainDiv}>
                    <input
                        autoComplete='off'
                        type={'text'}
                        className={styles.mainDivInput}
                        name='customCode'
                        placeholder='Enter custom code'
                        onChange={(e) => setCustomCode(e.target.value)}
                    />

                    <select
                        title='Select Duration of Voucher Codes'
                        className={styles.mainDivInput}
                        onChange={(e) => setCustomTime(e.target.value)}>
                        <option selected value={30}>1 month</option>
                        <option value={60}>2 months</option>
                        <option value={90}>3 months</option>
                        <option value={120}>4 months</option>
                        <option value={150}>5 months</option>
                        <option value={180}>6 months</option>
                        <option value={210}>7 months</option>
                        <option value={240}>8 months</option>
                        <option value={270}>9 months</option>
                        <option value={300}>10 months</option>
                        <option value={330}>11 months</option>
                        <option value={365}>12 months</option>
                    </select>

                    <button
                        disabled={customCode === ""}
                    >
                        Create Voucher
                    </button>

                </div>
            </form>
        </div>
    )
}

export default CustomVoucher