import styles from "./currentuser.module.css"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Currentuser() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await fetch('https://apiv1.playeon.com/api/v1/signup/getuser/list')
                const data = await response.json()
                setUsers(data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllUsers()
    }, [])
    const DeleteUsers = async (e, id) => {
        try {
            await axios.delete(`https://apiv1.playeon.com/api/v1/signup/delete/:${id}`)
            console.log(id)
            e.preventDefault();
        } catch (err) {
            console.log(err)
        }
    }
    const myArr = users.length;
    // console.log(myArr)
    // for (let i = myArr; i <= myArr.length; i++) {
    //     console.log([i])
    // }

    return (
        <>
            <table className={styles.table}>
                <tr className={styles.tr}>
                    <th className={styles.th}>No.</th>
                    <th className={styles.th}>Name</th>
                    <th className={styles.th}>Email</th>
                    <th className={styles.th}>Username</th>
                    <th className={styles.th}>PhoneNO</th>
                    <th className={styles.th}>City</th>
                    <th className={styles.th}>Action</th>
                </tr>

                {users.map((item) => (

                    <tr className={styles.tr} key={item.id}>
                        <td className={styles.td}>{myArr}</td>
                        <td className={styles.td}>
                            <div className={styles.name}>
                                {console.log(item._id)}
                                <div>
                                    {item.name}
                                </div>
                                <div>
                                    <img className={styles.image} src={item.imgPic} />
                                </div>
                            </div>
                        </td>
                        <td className={styles.td}>{item.email}</td>
                        <td className={styles.td}>{item.username}</td>
                        <td className={styles.td}>{item.phoneNumber}</td>
                        <td className={styles.td}>{item.country}</td>
                        <td className={styles.td}><button className={styles.btn} onClick={() => DeleteUsers(item._id)}>Delete</button></td>
                    </tr>

                ))}
            </table>
        </>
    );
}