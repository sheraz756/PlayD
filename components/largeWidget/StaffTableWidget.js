import React from 'react';
import styles from './large.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import { deleteUser } from '../../utils/userActions';
import { useRouter } from 'next/router';
import Link from 'next/link';

const StaffTableWidget = ({ staff, setShowToster }) => {
  const router = useRouter();
  return (
    <>
      {staff.map((staffs) => {
        const { _id, name, createdAt, role, phoneNumber, email, profilePicture } = staffs;
        return (
          <>

            <tr className={styles.largeRow} id={_id}>
              <td className={styles.largeDate}>{_id.substring(0, 5)}....</td>
              <td className={styles.largeUser}>
                <img src={profilePicture} alt={name} className={styles.largeImg} />
                <span className={styles.largeUsername}>{name}</span>
              </td>
              <td className={styles.largeDate}>{email}</td>
              <td className={styles.largeAmmount}>{phoneNumber}</td>
              <td className={styles.largeAmmount}>{role}</td>
              <td className={styles.largeAmmount}>{createdAt.substring(0, 10)}</td>
              <td className={styles.largeStatusStaff}>
                <button
                  onClick={() => { if (confirm('Are you sure?')) deleteUser(_id, setShowToster, router) }}
                  className={styles.largetButtons}>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    style={{ color: 'crimson' }} />
                </button>
                <Link href={`/staff/${_id}`}>
                  <button
                    className={styles.largetButtons}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{ color: 'green' }} />
                  </button>
                </Link>
              </td>
            </tr>

          </>
        )
      })}
    </>
  )
}

export default StaffTableWidget