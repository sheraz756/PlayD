import axios from 'axios';
import { useEffect, useState } from 'react';
import baseUrl from '../../utils/baseUrl';
import styles from '../../components/largeWidget/large.module.css'

const Freetrailuser = () => {
  const [freetrail, setfreetrail] = useState([]);

  useEffect(() => {
    const freeUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/users/category/free`);
        setfreetrail(res.data);
        console.log(res.data)
      }
      catch (error) {
        console.log(error);
      }
    }
    freeUsers()
  }, [])

  return (
    <table className={styles.largeTable} id='sortMe'>
      <tbody>
        <tr className={styles.largeRow}>
          <th className={styles.largeHeading}>Streamer</th>
          <th className={styles.largeHeading}>Email</th>
          <th className={styles.largeHeading}>Username</th>
          <th className={styles.largeHeading}>PhoneNo</th>
          <th className={styles.largeHeading}>City</th>
          <th className={styles.largeHeading}>Actions</th>
        </tr>
        {freetrail.map((item) => (

          <tr className={styles.tr} key={item.id}>

            <td className={styles.td}>
              <div className={styles.name}> {item.name} </div>
                
            </td>
            <td className={styles.td}>{item.email}</td>
            <td className={styles.td}>{item.username}</td>
            <td className={styles.td}>{item.phoneNumber}</td>
            <td className={styles.td}>{item.country}</td>
            <td className={styles.td}><button className={styles.btn} onClick={() => DeleteUsers(item._id)}>Delete</button></td>
          </tr>

        ))}
      </tbody>
    </table>
  )
}

export default Freetrailuser