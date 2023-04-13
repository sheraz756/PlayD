import axios from 'axios';
import { parseCookies } from 'nookies';
import React, { useState } from 'react'
import styles from '../../components/largeWidget/large.module.css';
import { DeleteToastr } from '../../components/layout/Toastr';
import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';
import InfiniteScroll from 'react-infinite-scroll-component';
import EndLoader from '../../components/common/EndLoader';
import EndMessage from '../../components/common/EndMessage';
import CardComponent from '../../components/cardcomponenets/CardComponent';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ShortCardComponent from '../../components/cardcomponenets/ShortCardComponent';

const Explore = ({ exploreData, errorLoading, user: { role } }) => {
    const router = useRouter();
    const [showToaster, setShowToster] = useState(false);
    const [data, setData] = useState(exploreData);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(2);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const fetchDataOnScroll = async () => {
        try {
            const res = await axios.get(`${baseUrl}/explore`, {
                headers: { Authorization: cookie.get('token') },
                params: { pageNumber }
            });
            if (res.data.length === 0) setHasMore(false);
            setData(prev => [...prev, ...res.data]);
            setPageNumber(prev => prev + 1);
        } catch (error) {
            console.log('Error fetching movies');
        }
    }
    if (data.length === 0 || errorLoading) {
        return (
            <>
                <div className={styles.widgetLarge}>
                    <h2 className={styles.largeTitle}>Currently No Shorts....</h2>
                </div>
            </>
        )
    }
    return (
        <>
            <div className='adduser'>
                {showToaster && <DeleteToastr />}
                <div className={styles.widgetLarge}>
                    <div className={styles.topSection}>
                        <h3 className={styles.largeTitle}>Shorts</h3>
                    </div>
                    <InfiniteScroll
                        style={{ overflow: 'hidden' }}
                        hasMore={hasMore}
                        next={fetchDataOnScroll}
                        loader={<EndLoader />}
                        endMessage={<EndMessage message={'No More Shorts'} />}
                        dataLength={data.length}
                    >
                        <ShortCardComponent data={data} setShowToster={setShowToster} role={role} router={router} />
                    </InfiniteScroll>
                </div>
            </div>
        </>
    )
}


export const getServerSideProps = async ctx => {
    try {
        const { token } = parseCookies(ctx);
        const res = await axios.get(`${baseUrl}/explore`, { headers: { Authorization: token }, params: { pageNumber: 1 } });
        return { props: { exploreData: res.data } };
    } catch (error) {
        return { props: { errorLoading: true } };
    }
};


export default Explore