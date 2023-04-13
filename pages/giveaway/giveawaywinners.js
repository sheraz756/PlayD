import axios from 'axios';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { useState } from 'react'
import GridGiveaway from '../../components/giveawaycomponents/GridGiveaway';
import { DeleteToastr } from '../../components/layout/Toastr';
import baseUrl from '../../utils/baseUrl';

const GiveawayWinnsers = ({ giveaway, errorLoading, user: { role } }) => {
    const router = useRouter();
    const [showToaster, setShowToster] = useState(false);
    if (giveaway.length === 0 || errorLoading) {
        return (
            <>
                <div>
                    <h2 >Currently No Giveaway....</h2>
                </div>
            </>
        )
    }
    return (
        <>
            {showToaster && <DeleteToastr />}
            <div className='adduser'>
                <h3 className='adduserTitle'>All Giveaway</h3>
                <GridGiveaway giveaway={giveaway} router={router} setShowToster={setShowToster} role={role} />
            </div>
        </>
    )
}


export const getServerSideProps = async ctx => {
    try {
        const { token } = parseCookies(ctx);
        const res = await axios.get(`${baseUrl}/giveaway`, { headers: { Authorization: token } });
        const { giveaway } = res.data;
        return { props: { giveaway } };
    } catch (error) {
        return { props: { errorLoading: true } };
    }
};

export default GiveawayWinnsers