import axios from 'axios';
import React, { useEffect, useState } from 'react';
import baseUrl from '../../utils/baseUrl';
import styles from '../voucherComps/voucher.module.css'
import { Loading } from '../common/Loading';
import { deleteGiveaway } from '../../utils/giveawayActions';

const GIveawayModal = ({ setShowModal, id, loading, setLoading, router, setShowToster }) => {
    const [winners, setWinners] = useState([]);
    const getWinners = async () => {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/giveaway/getwinners/${id}`);
        setWinners([...res.data]);
        setLoading(false);
    }
    useEffect(() => {
        getWinners();
    }, [])


    return (
        <>
            <form className={styles.voucherForm}>
                <div className={styles.voucherContent}>
                    <div className={styles.voucherHeader}>
                        <h2>Three Lucky Winners</h2>
                        <span onClick={() => setShowModal(false)} className={styles.close}>&times;</span>
                    </div>
                    <div className={styles.voucherBody} id='printalbeArea'>
                        {loading ? (
                            <div className={styles.loadingWinners}>
                                <Loading w={50} h={50} />
                                <p>Please Wait Getting Random Winners...</p>
                            </div>
                        ) :
                            (winners.map((curr, index) => (
                                <div className={styles.voucherBodyContent} key={index}>
                                    <div className={styles.voucherBodyImgContent}>
                                        <img src={curr.user.profilePicture} alt={curr.user.name} />
                                        <p>{curr.user.name}</p>
                                    </div>
                                    <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${curr.user.email}&su=Playeon Giveaway&body=Congratulation Mr.${curr.user.name}`} target='_blank' rel='noreferrer'>Mail to {curr.user.name}</a>
                                </div>
                            )))


                        }
                    </div>
                    <div className={styles.voucherFooter}>
                        <button onClick={() => 
                        { 
                            deleteGiveaway(id, setShowToster, router);
                            router.push('/giveaway/giveawaywinners'); 
                        }}>Delete</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default GIveawayModal