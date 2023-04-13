import React, { useState } from 'react'
import styles from '../../components/largeWidget/large.module.css';
import StaffTableWidget from '../../components/largeWidget/StaffTableWidget';
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { DeleteToastr } from '../../components/layout/Toastr';
const Staff = ({ staff, errorLoading }) => {
  const [showToaster, setShowToster] = useState(false);

  if (staff.length === 0 || errorLoading) {
    return (
      <>
        <div className={styles.widgetLarge}>
          <h2 className={styles.largeTitle}>Currently No Staff Members....</h2>
        </div>
      </>
    )
  }
  return (
    <>
      {showToaster && <DeleteToastr />}
      <div className={styles.widgetLarge}>
        <div className={styles.topSection}>
          <h3 className={styles.largeTitle}>Staff Members</h3>
        </div>
        <table className={styles.largeTable}>
          <tbody>
            <tr className={styles.largeRow}>
              <th className={styles.largeHeading}>Id</th>
              <th className={styles.largeHeading}>Name</th>
              <th className={styles.largeHeading}>Email</th>
              <th className={styles.largeHeading}>PhoneNo</th>
              <th className={styles.largeHeading}>Role</th>
              <th className={styles.largeHeading}>CreatedAt</th>
              <th className={styles.largeHeading}>Actions</th>
            </tr>
            <StaffTableWidget staff={staff} setShowToster={setShowToster} />
          </tbody>
        </table>
      </div>
    </>
  )
}

export const getServerSideProps = async ctx => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseUrl}/staff`, { headers: { Authorization: token } });
    const { staff } = res.data;
    return { props: { staff } };
  } catch (error) {
    return { props: { errorLoading: true } };
  }
};

export default Staff;