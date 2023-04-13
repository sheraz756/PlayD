import styles from "./bdo.module.css"
import { useState, useEffect } from "react";
import Card from "./Card";
import axios from 'axios';
import baseUrl from "../../utils/baseUrl";
import Test from "./Test";
import { useRouter } from 'next/router';
const BdoSales = () => {   

    const [showModal, setShowModal] = useState(false);
    const [userapi2, setUserApi2] = useState([]);

    const deleteBdo = async (id) => {
        await axios.delete(`${baseUrl}/bdo/${id}`)
    }
    const getUser2 = async () => {
        const res = await axios.get(`${baseUrl}/bdo/getBdo`);
        setUserApi2(res.data);
        console.log(res.data);
    }
    useEffect(() => {
        getUser2();
    }, [])

    const handleOpenModel = async (BdoId) => {
        await axios.post(`${baseUrl}/signup/getBdo/Id`, { BdoId })
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <table className={styles.table}>
                <tr className={styles.tr}>
                    <th className={styles.th}>Bdo Name</th>
                    <th className={styles.th}>Bdo Id</th>
                    <th className={styles.th} >No Of Downloads</th>
                    <th className={styles.th} >Action</th>
                </tr>

                {userapi2.map((user, id ) => (
                    <tr className={styles.tr} key={user.id}>
                        <td className={styles.td}>{user.name}</td>
                        <td className={styles.td}>{user.BdoId}</td>
                        <td className={styles.td}>
                            <button className={styles.successoutlinebutton} onClick={() => handleOpenModel(user.BdoId)}  > <Test item={user.BdoId} /></button>
                        </td>
                        <td><button className={styles.successoutlinebutton} onClick={() => deleteBdo(user._id)}>Delete</button></td>
                    </tr>
                ))}


            </table>
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalcontent}>
                        <span className={styles.close} onClick={handleCloseModal}>
                            &times;
                        </span>
                        {
                            userapi2.map((items) => (
                                <Card items={items.BdoId} key={items.BdoId} />
                            ))
                        }
                    </div>
                </div>
            )}
        </>
    )
}

export default BdoSales