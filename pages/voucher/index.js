import React, { useState } from 'react'
import VoucherModal from '../../components/voucherComps/VoucherModal';
import voucher_codes from 'voucher-code-generator';
import styles from '../../components/voucherComps/voucher.module.css';
import { useRouter } from 'next/router';
import { SuccessToaster } from '../../components/layout/Toastr';
import VoucherTableWidget from '../../components/largeWidget/VoucherTableWidget';
import baseUrl from '../../utils/baseUrl';
import { parseCookies } from 'nookies';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import cookie from 'js-cookie';
import EndLoader from '../../components/common/EndLoader';
import EndMessage from '../../components/common/EndMessage';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
const Voucher = ({ voucherData, user: { role } }) => {

    const router = useRouter();
    const [modal, setModal] = useState(false)
    const [count, setCount] = useState(0);
    const [prefix, setPrefix] = useState('');
    const [postfix, setPostfix] = useState('');
    const [time, setTime] = useState(0);
    const [data, setData] = useState({});
    const [showToaster, setShowToster] = useState(false);


    const [codes, setCodes] = useState(voucherData);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(2);

    const generateVoucherCodes = () => {
        const allCodes = voucher_codes.generate({
            length: 10,
            count: count,
            prefix: prefix,
            postfix: postfix
        });
        const parsedTime = parseInt(time);
        setData({ allCodes, parsedTime });
    }
    const fetchDataOnScroll = async () => {
        try {
            const res = await axios.get(`${baseUrl}/voucher`, {
                headers: { Authorization: cookie.get('token') },
                params: { pageNumber }
            });
            if (res.data.length === 0) setHasMore(false);
            setCodes(prev => [...prev, ...res.data]);
            setPageNumber(prev => prev + 1);
        } catch (error) {
            console.log('Error fetching movies');
        }
    }

    const [excelLoading, setExcelLoading] = useState(false);
    const fetchDataAndSaveOnExcelFile = async () => {
        try {
            setExcelLoading(true);
            const res = await axios.get(`${baseUrl}/voucher/excel`, {
                headers: { Authorization: cookie.get('token') },
                params: { pageNumber }
            });
            const rows = res.data.map(item => [item.code, item.isActive, item.validtill + " " + "days"]);
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('Sheet1');
            worksheet.addRow(['Code', 'Is_Active', 'Valid_Till']);
            worksheet.addRows(rows);
            const buffer = await workbook.xlsx.writeBuffer();
            saveAs(new Blob([buffer]), 'standardVouchers.xlsx');
            setExcelLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='adduser'>
                <h2>Voucher Panel</h2>
            </div>
            {role === 'admin' &&
                <div className='adduser'>
                    {showToaster && <SuccessToaster successMsg='Vouchers Created Successfully!' />}
                    <div className={styles.mainDiv}>
                        <input type='number'
                            className={styles.mainDivInput}
                            title='Enter amount of vouchers'
                            name='count'
                            placeholder='1-100'
                            onChange={(e) => setCount(e.target.value)}
                            min='1'
                            maxLength={100} />

                        <input type='text'
                            className={styles.mainDivInput}
                            name='prefix'
                            placeholder='prefix-XXXX'
                            onChange={(e) => setPrefix(e.target.value)} />

                        <input type='text'
                            className={styles.mainDivInput}
                            name='postfix'
                            placeholder='XXXX-postfix'
                            onChange={(e) => setPostfix(e.target.value)} />
                        <select
                            title='Select Duration of Voucher Codes'
                            className={styles.mainDivInputSelect}
                            onChange={(e) => setTime(e.target.value)}>
                            <option selected disabled>Duration</option>
                            <option value={30}>1 month</option>
                            <option value={60}>2 months</option>
                            <option value={90}>3 months</option>
                        </select>
                        <button onClick={() => {
                            setModal(true);
                            generateVoucherCodes();
                        }}>
                            Generate Vouchers
                        </button>
                    </div>
                </div>
            }
            {modal && <VoucherModal setModal={setModal} data={data} setShowToster={setShowToster} router={router} />}
            <div className='adduser'>
                <InfiniteScroll
                    style={{ overflow: 'hidden' }}
                    hasMore={hasMore}
                    next={fetchDataOnScroll}
                    loader={<EndLoader />}
                    endMessage={null}
                    dataLength={codes.length}
                >
                    <VoucherTableWidget
                        voucherData={codes}
                        router={router}
                        role={role}
                        excelLoading={excelLoading}
                        fetchDataAndSaveOnExcelFile={fetchDataAndSaveOnExcelFile} />
                </InfiniteScroll>
            </div>
        </>
    )
}

export const getServerSideProps = async ctx => {
    try {
        const { token } = parseCookies(ctx);
        const res = await axios.get(`${baseUrl}/voucher`, { headers: { Authorization: token }, params: { pageNumber: 1 } });
        return { props: { voucherData: res.data } };
    } catch (error) {
        return { props: { errorLoading: true } };
    }
};

export default Voucher