import React, { useEffect, useState } from 'react';
import styles from './sidebar.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHouse, faCaretDown, faUsers, faUserPlus, faPersonCane, faRulerVertical, faClipboardQuestion, faClapperboard, faPlus, faBarsStaggered, faSolarPanel, faCodeCommit, faCreditCard, faGifts, faTrophy, faRectangleAd, faFeed, faFileMedicalAlt, faTv, faT, fas, faS, faVideo, faChair } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { useRouter } from 'next/router';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';


const Sidebar = ({ user: { role, email } }) => {
    const router = useRouter();
    const [feedback, setFeedback] = useState(0);
    const [request, setRequest] = useState(0);

    useEffect(() => {
        const getFeedback = async () => {
            const res = await axios.get(`${baseUrl}/feedback`);
            setFeedback(res.data.length);
        }
        getFeedback();
    }, []);

    useEffect(() => {
        const getRequestMessages = async () => {
            const res = await axios.get(`${baseUrl}/request`);
            setRequest(res.data.length);
        }
        getRequestMessages();
    }, []);

    const isActive = route => router.pathname === route;
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar__wrapper}>

                <div className={styles.sidebar__menu}>
                    <h3 className={styles.sidebar__title}>Dashboard</h3>
                    <ul className={styles.sidebar__list}>
                        <Link href={'/'}>
                            <li className={isActive('/') ? styles.active : styles.sidebar__list__item}>
                                <FontAwesomeIcon icon={faHouse} style={{ marginRight: 5, fontSize: 20 }} />
                                Home
                            </li>
                        </Link>
                    </ul>
                </div>
                {role === 'admin' &&
                    <>
                        <div className={styles.sidebar__menu}>
                            <h3 className={styles.sidebar__title}>User</h3>
                            <ul className={styles.sidebar__list}>
                                <Link href={'/users'}>
                                    <li className={isActive('/users') ? styles.active : styles.sidebar__list__item}>
                                        <FontAwesomeIcon icon={faUsers} style={{ marginRight: 5, fontSize: 20 }} />
                                        Users
                                    </li>
                                </Link>
                            </ul>
                            <ul className={styles.sidebar__list}>
                                <Link href={'/users/adduser'}>
                                    <li className={isActive('/users/adduser') ? styles.active : styles.sidebar__list__item}>
                                        <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: 5, fontSize: 20 }} />
                                        Add User
                                    </li>
                                </Link>
                            </ul>
                        </div>

                        <div className={styles.sidebar__menu}>
                            <h3 className={styles.sidebar__title}>Staff</h3>
                            <ul className={styles.sidebar__list}>
                                <Link href={'/staff'}>
                                    <li className={isActive('/staff') ? styles.active : styles.sidebar__list__item}>
                                        <FontAwesomeIcon icon={faPersonCane} style={{ marginRight: 5, fontSize: 20 }} />
                                        Staff
                                    </li>
                                </Link>
                            </ul>
                            <ul className={styles.sidebar__list}>
                                <Link href={'/staff/addstaff'}>
                                    <li className={isActive('/staff/addstaff') ? styles.active : styles.sidebar__list__item}>
                                        <FontAwesomeIcon icon={faClipboardQuestion} style={{ marginRight: 5, fontSize: 20 }} />
                                        Add Staff
                                    </li>
                                </Link>
                            </ul>
                        </div>
                        <div className={styles.sidebar__menu}>
                            <h3 className={styles.sidebar__title}>Messages</h3>
                            <ul className={styles.sidebar__list}>
                                <Link href={'/feedback'}>
                                    <li className={isActive('/feedback') ? styles.active : styles.sidebar__list__item}>
                                        <FontAwesomeIcon icon={faFeed} style={{ marginRight: 5, fontSize: 20 }} />
                                        Feedback{
                                            feedback < 1 ? (<span style={{
                                                marginLeft: '3px'
                                            }}>(0)</span>) : (<span style={{
                                                color: 'crimson',
                                                fontWeight: 'bolder',
                                                marginLeft: '3px'
                                            }}>({feedback})</span>)
                                        }
                                    </li>
                                </Link>
                            </ul>
                            <ul className={styles.sidebar__list}>
                                <Link href={'/request'}>
                                    <li className={isActive('/request') ? styles.active : styles.sidebar__list__item}>
                                        <FontAwesomeIcon icon={faFileMedicalAlt} style={{ marginRight: 5, fontSize: 20 }} />
                                        Movie Request{
                                            request < 1 ? (<span style={{
                                                marginLeft: '3px'
                                            }}>(0)</span>) : (<span style={{
                                                color: 'crimson',
                                                fontWeight: 'bolder',
                                                marginLeft: '3px'
                                            }}>({request})</span>)
                                        }
                                    </li>
                                </Link>
                            </ul>
                        </div>

                    </>}

                    <div className={styles.sidebar__menu}>
                    <h3 className={styles.sidebar__title}>BDO</h3>
                    <ul className={styles.sidebar__list}>
                        <Link href={'/bdo'}>
                            <li className={isActive('/bdo') ? styles.active : styles.sidebar__list__item}>
                                <FontAwesomeIcon icon={faChair} style={{ marginRight: 5, fontSize: 20 }} />
                              BDO
                            </li>
                        </Link>
                    </ul>
                    <ul className={styles.sidebar__list}>
                        <Link href={'/bdo/addbdo'}>
                            <li className={isActive('/bdo/addbdo') ? styles.active : styles.sidebar__list__item}>
                                <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5, fontSize: 20 }} />
                                Add Bdo
                            </li>
                        </Link>
                    </ul>
                </div>

                <div className={styles.sidebar__menu}>
                    <h3 className={styles.sidebar__title}>Movies</h3>
                    <ul className={styles.sidebar__list}>
                        <Link href={'/movies'}>
                            <li className={isActive('/movies') ? styles.active : styles.sidebar__list__item}>
                                <FontAwesomeIcon icon={faClapperboard} style={{ marginRight: 5, fontSize: 20 }} />
                                Movies
                            </li>
                        </Link>
                    </ul>
                    <ul className={styles.sidebar__list}>
                        <Link href={'/movies/addmovie'}>
                            <li className={isActive('/movies/addmovie') ? styles.active : styles.sidebar__list__item}>
                                <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5, fontSize: 20 }} />
                                Add Movie
                            </li>
                        </Link>
                    </ul>
                </div>

                <div className={styles.sidebar__menu}>
                    <h3 className={styles.sidebar__title}>Series</h3>
                    <ul className={styles.sidebar__list}>
                        <Link href={'/series'}>
                            <li className={isActive('/series') ? styles.active : styles.sidebar__list__item}>
                                <FontAwesomeIcon icon={faTv} style={{ marginRight: 5, fontSize: 20 }} />
                                Series
                            </li>
                        </Link>
                    </ul>
                    <ul className={styles.sidebar__list}>
                        <Link href={'/series/addSeries'}>
                            <li className={isActive('/series/addSeries') ? styles.active : styles.sidebar__list__item}>
                                <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5, fontSize: 20 }} />
                                Add Series
                            </li>
                        </Link>
                    </ul>
                </div>

                <div className={styles.sidebar__menu}>
                    <h3 className={styles.sidebar__title}>Shorts</h3>
                    <ul className={styles.sidebar__list}>
                        <Link href={'/explore'}>
                            <li className={isActive('/explore') ? styles.active : styles.sidebar__list__item}>
                                <FontAwesomeIcon icon={faS} style={{ marginRight: 5, fontSize: 20 }} />
                                Short Videos
                            </li>
                        </Link>
                    </ul>
                    <ul className={styles.sidebar__list}>
                        <Link href={'/explore/addExplore'}>
                            <li className={isActive('/explore/addExplore') ? styles.active : styles.sidebar__list__item}>
                                <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5, fontSize: 20 }} />
                                Add Short Video
                            </li>
                        </Link>
                    </ul>
                </div>

                <div className={styles.sidebar__menu}>
                    <h3 className={styles.sidebar__title}>Funding</h3>
                    <ul className={styles.sidebar__list}>
                        <Link href={'/fundingpanel'}>
                            <li className={isActive('/fundingpanel') ? styles.active : styles.sidebar__list__item}>
                                <FontAwesomeIcon icon={faSolarPanel} style={{ marginRight: 5, fontSize: 20 }} />
                                Funding Panel
                            </li>
                        </Link>
                    </ul>
                    {role === 'admin' &&
                        <ul className={styles.sidebar__list}>
                            <Link href={'/fundingpanel/donation'}>
                                <li className={isActive('/fundingpanel/donation') ? styles.active : styles.sidebar__list__item}>
                                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5, fontSize: 20 }} />
                                    Create Donation Post
                                </li>
                            </Link>
                        </ul>}
                </div>

                <div className={styles.sidebar__menu}>
                    <h3 className={styles.sidebar__title}>Advertisment</h3>
                    <ul className={styles.sidebar__list}>
                        <Link href={'/advertisment'}>
                            <li className={isActive('/advertisment') ? styles.active : styles.sidebar__list__item}>
                                <FontAwesomeIcon icon={faRectangleAd} style={{ marginRight: 5, fontSize: 20 }} />
                                All Advertisment
                            </li>
                        </Link>
                    </ul>
                    {role === 'admin' &&
                        <ul className={styles.sidebar__list}>
                            <Link href={'/advertisment/createAd'}>
                                <li className={isActive('/advertisment/createAd') ? styles.active : styles.sidebar__list__item}>
                                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5, fontSize: 20 }} />
                                    Create an Ad
                                </li>
                            </Link>
                        </ul>}
                </div>

                <div className={styles.sidebar__menu}>
                    <h3 className={styles.sidebar__title}>Giveaway</h3>
                    {role === 'admin' &&
                        <ul className={styles.sidebar__list}>
                            <Link href={'/giveaway'}>
                                <li className={isActive('/giveaway') ? styles.active : styles.sidebar__list__item}>
                                    <FontAwesomeIcon icon={faGifts} style={{ marginRight: 5, fontSize: 20 }} />
                                    Create Giveaway
                                </li>
                            </Link>
                        </ul>}
                    <ul className={styles.sidebar__list}>
                        <Link href={'/giveaway/giveawaywinners'}>
                            <li className={isActive('/giveaway/giveawaywinners') ? styles.active : styles.sidebar__list__item}>
                                <FontAwesomeIcon icon={faTrophy} style={{ marginRight: 5, fontSize: 20 }} />
                                Get Giveway Winners
                            </li>
                        </Link>
                    </ul>
                </div>

                <div className={styles.sidebar__menu}>
                    <h3 className={styles.sidebar__title}>Voucher</h3>
                    <ul className={styles.sidebar__list}>
                        <Link href={'/voucher'}>
                            <li className={isActive('/voucher') ? styles.active : styles.sidebar__list__item}>
                                <FontAwesomeIcon icon={faCodeCommit} style={{ marginRight: 5, fontSize: 20 }} />
                                Generate Voucher
                            </li>
                        </Link>
                    </ul>
                    {role === 'admin' &&
                        <ul className={styles.sidebar__list}>
                            <Link href={'/voucher/goldvoucher'}>
                                <li className={isActive('/voucher/goldvoucher') ? styles.active : styles.sidebar__list__item}>
                                    <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: 5, fontSize: 20 }} />
                                    Create Gold Voucher
                                </li>
                            </Link>
                        </ul>
                    }
                </div>



            </div>
        </div>
    )
}

export default Sidebar