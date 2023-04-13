import React from 'react';
import styles from './large.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { deletePost } from '../../utils/fundingActions';
import { useRouter } from 'next/router';


const FundingTableWidet = ({ donations, setShowToster, role }) => {
    const router = useRouter();
    return (
        <>
            {donations.map((donation) => {
                const { _id, title, description, ammount, img, createdAt } = donation;
                return (
                    <>
                        <tr className={styles.largeRow} id={_id} >
                            <td className={styles.largeDate}>{_id.substring(0, 5)}....</td>
                            <td className={styles.largeUser}>
                                <img src={img} alt={title} className={styles.largeImg} />
                                <span className={styles.largeUsername}>{title}</span>
                            </td>
                            <td className={styles.largeDate}>{description.substring(0, 50)}.....</td>
                            <td className={styles.largeAmmount}>{ammount}</td>
                            <td className={styles.largeAmmount}>{createdAt.substring(0, 10)}</td>
                            {role === 'admin' &&
                                <td className={styles.largeStatusStaff}>
                                    <button
                                        onClick={() => { if (confirm('Are you sure?')) deletePost(_id, setShowToster, router) }}
                                        className={styles.largetButtons}>
                                        <FontAwesomeIcon
                                            icon={faTrashCan}
                                            style={{ color: 'crimson' }} />
                                    </button>
                                    <Link href={`/fundingpanel/${_id}`}>
                                        <button
                                            className={styles.largetButtons}>
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                style={{ color: 'green' }} />
                                        </button>
                                    </Link>
                                </td>
                            }
                        </tr>
                    </>
                )
            })
            }
        </>
    )
}

export default FundingTableWidet