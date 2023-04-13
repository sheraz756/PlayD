import styles from "./Card.module.css"
import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
const Card = ({ items }) => {
    const BdoId = items
    const [userapi1, setUserApi1] = useState([]);
    const getUser1 = async () => {
        const res = await axios.post(`${baseUrl}/signup/getBdo/Id`, { BdoId })
        setUserApi1(res.data.users);
    }

    useEffect(() => {
        getUser1();
    }, [])
   
    return (
        <table className={styles.table}>
            <thead>
                <tr className={styles.tr}>
                    <th className={styles.th} >BdoId</th>
                    <th className={styles.th}>ClientName</th>
                    <th className={styles.th}>Number</th>
                    <th className={styles.th} >Email</th>
                </tr>
            </thead>
            <tbody>
                
                {
                    
                    userapi1.map((items) => (
                        <tr key={items.id}>
                            <td className={styles.td}>{BdoId}</td>
                            <td className={styles.td}>{items.name}</td>
                            <td className={styles.td}>{items.phoneNumber}</td>
                            <td className={styles.td}>{items.email}</td>
                        </tr>
                    ))

                }
            </tbody>
        </table>

    );
};

export default Card;