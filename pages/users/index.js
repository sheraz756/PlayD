import React, { useState, useEffect } from 'react'
import styles from '../../components/largeWidget/large.module.css'
import UserTableWidget, { Modal } from '../../components/largeWidget/UserTableWidget'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHouse, faCaretDown, faUsers, faUserPlus, faPersonCane, faRulerVertical, faClipboardQuestion, faClapperboard, faPlus, faBarsStaggered, faSolarPanel, faCodeCommit, faCreditCard, faGifts, faTrophy, faRectangleAd, faDeleteLeft, faTrashCan, faCalendarDays, faSearch } from "@fortawesome/free-solid-svg-icons";
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { DeleteToastr } from '../../components/layout/Toastr';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
const Users = ({ users, errorLoading }) => {

    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])
    const [options, setOptions] = useState('all');
    const [text, setText] = useState('');
    const [showDate, setShowDate] = useState(false);
    const [userData, setUserData] = useState(users);
    const [showToaster, setShowToster] = useState(false);
    const [modal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        showToaster && setTimeout(() => {
            setShowToster(false);
        }, 3000);
    }, [showToaster])



    const filterSearch = async (type) => {
        setLoading(true);
        try {
            const res = await axios.get(`${baseUrl}/users/category/${type}`);
            setUserData(res.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const filterUserByName = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${baseUrl}/users/${text}`);
            setUserData(res.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    const transactionid = '0dda010f-4d17-a322-3xb3-178d08def5b9'
    const filterOld = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${baseUrl}/users/old`, { transactionid });
            setUserData(res.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const getUsersBetweenDates = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${baseUrl}/users/date`,
                { date: date[0], options });
            setUserData(res.data);
            setShowDate(false);
            // setUserData(res.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const len = users.length
    console.log(len)
    return (
        <>
            {modal && <Modal />}
            {showToaster && <DeleteToastr />}
            <div className={styles.widgetLarge}>
                <div className={styles.categoriesSearch}>
                    <h3>Search Filter</h3>
                    <div className={styles.categoriesSearchButtons}>
                        <button onClick={() => filterSearch('voucher')}>
                            <FontAwesomeIcon icon={faGifts} /> Voucher Users</button>
                        <button onClick={() => filterSearch('card')}>
                            <FontAwesomeIcon icon={faCreditCard} /> Card Users</button>
                        <button onClick={() => filterSearch('free')}>
                            <FontAwesomeIcon icon={faCreditCard} /> Free Trail Users</button>
                        <button onClick={() => filterOld()}>
                            <FontAwesomeIcon icon={faGifts} /> Old Users</button>
                        <button onClick={() => filterSearch('all')}>

                            <FontAwesomeIcon icon={faUsers} /> All Users</button>
                        <input
                            type="text"
                            placeholder='Search by username or email'
                            name='text'
                            onChange={e => setText(e.target.value)}
                        />
                        <button
                            onClick={() => filterUserByName()}
                            disabled={text === ''}
                        ><FontAwesomeIcon icon={faSearch} /> Search</button>
                    </div>
                    <div className={styles.headerSearchItem}>
                        <select
                            className={styles.selectHeaderSearchItem}
                            onChange={e => setOptions(e.target.value)}
                        >
                            <option disabled selected>Select user type</option>
                            <option value='all'>All Users</option>
                            <option value='card'>Card Users</option>
                            <option value='card'>Free Users</option>
                            <option value='voucher'>Voucher Users</option>
                        </select>
                        <FontAwesomeIcon
                            icon={faCalendarDays}
                            style={{ color: 'grey' }}
                        />
                        <span
                            onClick={() => setShowDate(!showDate)}
                            className={styles.headerSearchText}>
                            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
                        </span>
                        {showDate &&
                            <DateRange
                                editableDateInputs={true}
                                onChange={item => setDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={date}
                                className={styles.date}
                            />}
                        <button
                            className={styles.searchByDatesButton}
                            onClick={() => getUsersBetweenDates()}>
                            <FontAwesomeIcon icon={faSearch} /> Search</button>
                    </div>
                </div>
                <div className={styles.topSection}>
                    <h3 className={styles.largeTitle}>All Streamers</h3>
                </div>
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
                        <UserTableWidget
                            users={userData}
                            setShowToster={setShowToster}
                            loading={loading}
                            errorLoading={errorLoading}
                        />
                    </tbody>
                </table>
            </div>
        </>
    )
}


export const getServerSideProps = async ctx => {
    try {
        const { token } = parseCookies(ctx);
        const res = await axios.get(`${baseUrl}/users`, { headers: { Authorization: token } });
        const { users } = res.data;
        return { props: { users } };
    } catch (error) {
        return { props: { errorLoading: true } };
    }
};

export default Users;

