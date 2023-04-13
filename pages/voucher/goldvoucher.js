import React, { useState } from 'react'
import VoucherModal from '../../components/voucherComps/VoucherModal';
import voucher_codes from 'voucher-code-generator';
import styles from '../../components/voucherComps/voucher.module.css';
import { useRouter } from 'next/router';
import { SuccessToaster } from '../../components/layout/Toastr';
import VoucherTableWidget from '../../components/largeWidget/VoucherTableWidget';
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import GoldVoucherModal from '../../components/voucherComps/GoldVoucherModal';
import CustomVoucher from '../../components/largeWidget/CustomVoucher';
import InfiniteScroll from 'react-infinite-scroll-component';
import EndLoader from '../../components/common/EndLoader';
import cookie from 'js-cookie';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
const GoldVoucher = ({ voucherData, user: { role } }) => {

  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [customVoucherModal, setCustomVoucherModal] = useState(false);
  const [customCode, setCustomCode] = useState('');
  const [customTime, setCustomTime] = useState(120);

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
        const res = await axios.get(`${baseUrl}/voucher/get/gold`, {
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
            const res = await axios.get(`${baseUrl}/voucher/gold/excel`, {
                headers: { Authorization: cookie.get('token') },
                params: { pageNumber }
            });
            const rows = res.data.map(item => [item.code, item.isActive, item.validtill + " " + "days"]);
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('Sheet1');
            worksheet.addRow(['Code', 'Is_Active', 'Valid_Till']);
            worksheet.addRows(rows);
            const buffer = await workbook.xlsx.writeBuffer();
            saveAs(new Blob([buffer]), 'goldVoucher.xlsx');
            setExcelLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
      <div className='adduser'>
        <h2>Gold Voucher Panel</h2>
      </div>
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
            className={styles.mainDivInput}
            onChange={(e) => setTime(e.target.value)}>
            <option selected disabled>Duration</option>
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

          <button onClick={() => {
            setModal(true);
            generateVoucherCodes();
          }}>
            Generator Vouchers
          </button>

        </div>
      </div>
      {customVoucherModal &&
        <CustomVoucher
          customCode={customCode}
          setCustomCode={setCustomCode}
          customTime={customTime}
          setCustomTime={setCustomTime}
          setShowToster={setShowToster}
          router={router}
        />
      }
      {modal &&
        <GoldVoucherModal setModal={setModal} data={data} setShowToster={setShowToster} router={router} />}
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
            customVoucherModal={customVoucherModal}
            setCustomVoucherModal={setCustomVoucherModal}
            voucherData={codes}
            router={router}
            role={role}
            fetchDataAndSaveOnExcelFile={fetchDataAndSaveOnExcelFile}
            excelLoading={excelLoading}
             />
        </InfiniteScroll>
      </div>
    </>
  )
}



export const getServerSideProps = async ctx => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseUrl}/voucher/get/gold`, { headers: { Authorization: token }, params: { pageNumber: 1 } });
    return { props: { voucherData: res.data } };
  } catch (error) {
    return { props: { errorLoading: true } };
  }
};

export default GoldVoucher