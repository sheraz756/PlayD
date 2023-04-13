import axios from 'axios';
import { parseCookies } from 'nookies';
import React from 'react'
import baseUrl from '../../utils/baseUrl';
import styles from '../../components/voucherComps/voucher.module.css'
const ResquestMessage = ({ request }) => {
    const { user, message, createdAt } = request;
    return (
        <div className='adduser'>
            <h1>Request Message</h1>
            <div style={{
                padding: '20px',
                margin: '10px auto',
            }}>
                <img style={{
                    width: '150px',
                    height: '150px',
                    border: '2px solid green'
                }} src={user.profilePicture} alt={user.name} />
                <p>Request At : {createdAt.substring(0, 10)}</p>
                <div className={styles.requestMessages}>Requested Movies: <span>{message}</span></div>
                <a className={styles.replyButton} href={`https://mail.google.com/mail/?view=cm&fs=1&to=${user.email}&su=Playeon Movie Request&body=Hello Mr.${user.name}`} target='_blank' rel='noreferrer'>Reply to {user.name}</a>
            </div>
        </div>
    )
}



export const getServerSideProps = async ctx => {
    try {
        const { token } = parseCookies(ctx);
        const res = await axios.get(`${baseUrl}/request/${ctx.query.id}`, { headers: { Authorization: token } });
        const request = res.data;
        return { props: { request } };
    } catch (error) {
        return { props: { errorLoading: true } };
    }
};

export default ResquestMessage