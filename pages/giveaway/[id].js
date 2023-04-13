import axios from 'axios';
import { parseCookies } from 'nookies';
import React, { useState } from 'react'
import baseUrl from '../../utils/baseUrl';
import styles from '../../components/giveawaycomponents/giveaway.module.css';
import { CapitilizeFirstLetter } from '../../utils/utilityFunctions';
import { useRouter } from 'next/router';
import GIveawayModal from '../../components/voucherComps/GIveawayModal';
import { DeleteToastr } from '../../components/layout/Toastr';


const MainGiveAway = ({ giveaway }) => {
    const router = useRouter();
    const { _id, createdAt, poster, title, participants } = giveaway;
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showToaster, setShowToster] = useState(false);
    const [winners, setWinners] = useState([]);
    let count = 1;
    const { id } = router.query;
    
    return (
        <>
            {showModal && <GIveawayModal
                loading={loading}
                setLoading={setLoading}
                setShowModal={setShowModal}
                setShowToster={setShowToster}
                router={router}
                id={id} />}
            {showToaster && <DeleteToastr />}
            <div className='adduser' key={_id}>
                <div className={styles.posterContainer}>
                    <img src={poster} alt={title} />
                </div>
                <div className={styles.giveawayContent}>
                    <h3>{CapitilizeFirstLetter(title)}</h3>
                    <span><b>Participants: {participants.length}</b></span>
                    <span><b>CreatedAt: {createdAt.substring(0, 10)}</b></span>
                </div>

                {participants.length > 0 &&
                    <div className={styles.giveawayForm}>
                        <button onClick={() => setShowModal(true)}>Get Winners</button>
                    </div>
                }

                {participants.length < 1 ?
                    <div className={styles.noParticipants}>
                        <h3>No Participants till now!</h3>
                    </div> :
                    <>
                        <div className={styles.participants}>
                            <h3>All Participants ...</h3>
                        </div>
                        {participants.map((cur) => {
                            return (
                                <>
                                    <div className={styles.giveawayParticipants}>
                                        <p>{count++}.</p>
                                        <img src={cur.user.profilePicture} />
                                        <p>{cur.user.name}</p>
                                    </div>
                                </>
                            )
                        })}

                    </>
                }

            </div>
        </>
    )
}



export const getServerSideProps = async ctx => {
    try {
        const { token } = parseCookies(ctx);
        const res = await axios.get(`${baseUrl}/giveaway/${ctx.query.id}`, { headers: { Authorization: token } });
        const { giveaway } = res.data;
        return { props: { giveaway } };
    } catch (error) {
        return { props: { errorLoading: true } };
    }
};
export default MainGiveAway