import React from 'react'
import styles from './large.module.css';

const LargeWidgetTable = ({ imgSrc, username, date, ammount, index }) => {

  return (
    <tr className={styles.largeRow} key={index}>
      <td className={styles.largeUser}>
        <img src={imgSrc} alt={username} className={styles.largeImg} />
        <span className={styles.largeUsername}>{username}</span>
      </td>
      <td className={styles.largeStatus}>
        <button className={styles.largetButton}>Pending</button>
      </td>
    </tr>
  )
}

export default LargeWidgetTable