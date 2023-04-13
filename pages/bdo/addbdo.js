import axios from "axios"
import { useState } from "react"
import styles from "./addbdo.module.css"
import baseUrl from "../../utils/baseUrl"
const addbdo = () => {
    // const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [Phonenumber, setPhonenumber] = useState('')
    const [BdoId, setBdoId] = useState('')


    const fetchAllUsers = async () => {
        try {
            const res = await axios.post(`${baseUrl}/bdo/bdo`, { name, email, username, password, Phonenumber, BdoId })
            console.log(res)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.setForm}>
            <form className={styles.form}>
                <div className={styles.formgroup}>
                    <label className={styles.label}>Name</label>
                    <input type="text" className={styles.input} onChange={(e) => setName(e.target.value)} value={name} placeholder="Your name.." />
                </div>

                <div className={styles.formgroup}>
                    <label className={styles.label} >Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} placeholder="Your email.." />
                </div>

                <div className={styles.formgroup}>
                    <label className={styles.label} >Username</label>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} className={styles.input} placeholder="Username" />
                </div>

                <div className={styles.formgroup}>
                    <label className={styles.label}>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className={styles.input} placeholder="Your Password.." />
                </div>

                <div className={styles.formgroup}>
                    <label className={styles.label} >Number</label>
                    <input type="Number" onChange={(e) => setPhonenumber(e.target.value)} value={Phonenumber} className={styles.input} placeholder="Your Phonenumber.." />
                </div>

                <div className={styles.formgroup}>
                    <label className={styles.label} >BdoId</label>
                    <input type="text" id="bdoid" name="bdoid" value={BdoId} onChange={(e) => setBdoId(e.target.value)} className={styles.input} placeholder="Your bdoid.." />
                </div>

                <div className={styles.formgroup}> <br />
                    <button onClick={fetchAllUsers} className={styles.button} >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default addbdo